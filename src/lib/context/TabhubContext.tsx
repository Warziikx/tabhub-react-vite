import { User } from "@/utils/interfaces/User";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as authService from '@/lib/services/authService'
import * as userService from '@/lib/services/userService'
import { APP_ROUTES } from "@/utils/constant";
import { LoginProps, AuthToken } from "@/utils/interfaces/Auth";
import { Collection } from "@/utils/interfaces/Collection";
// import * as usersApi from "./api/users";

interface AuthContextType {
    user?: User;
    tokens?: AuthToken;
    currentContextCollection?: Collection
    loading: boolean;
    error?: any;
    login: (objCredential: LoginProps) => void;
    // signUp: (email: string, name: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    let localStorageToken = localStorage.getItem('tokens');
    let token = localStorageToken != null && JSON.parse(localStorageToken)
    const [user, setUser] = useState<User | undefined>();
    const [tokens, setTokens] = useState<AuthToken | undefined>(token);
    const [currentContextCollection, setCurrentContextCollection] = useState<Collection | undefined>(undefined);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    // If we change page, reset the error state.
    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    // Check if there is a currently active session
    // when the provider is mounted for the first time.
    //
    // If there is an error, it means there is no session.
    //
    // Finally, just signal the component that the initial load
    // is over.

    useEffect(() => {
        userService.getMe()
            .then((user) => setUser(user))
            .catch((_error) => { })
            .finally(() => setLoadingInitial(false));
    }, []);

    function getMe() {
        userService.getMe()
            .then((user) => setUser(user))
            .catch((_error) => { })
            .finally(() => setLoading(false));
    }


    // Flags the component loading state and posts the login
    // data to the server.
    //
    // An error means that the email/password combination is
    // not valid.
    //
    // Finally, just signal the component that loading the
    // loading state is over.
    function login(objCredential: LoginProps) {
        setLoading(true);

        authService.login(objCredential)
            .then((tokens: AuthToken) => {
                setTokens(tokens);
                localStorage.setItem('tokens', JSON.stringify(tokens))
                navigate(APP_ROUTES.HOME);
            })
            .catch((error: Error) => setError(error))
            .finally(() => setLoading(false));

        getMe()
    }

    // Sends sign up details to the server. On success we just apply
    // the created user to the state.
    // function signUp(email: string, name: string, password: string) {
    //     setLoading(true);

    //     usersApi.signUp({ email, name, password })
    //         .then((user) => {
    //             setUser(user);
    //             navigate("/");
    //         })
    //         .catch((error) => setError(error))
    //         .finally(() => setLoading(false));
    // }

    // Call the logout endpoint and then remove the user
    // from the state.
    function logout() {
        localStorage.removeItem('tokens');
        setTokens(undefined)
        setUser(undefined)
    }

    // Make the provider update only when it should.
    // We only want to force re-renders if the user,
    // loading or error states change.
    //
    // Whenever the `value` passed into a provider changes,
    // the whole tree under the provider re-renders, and
    // that can be very costly! Even in this case, where
    // you only get re-renders when logging in and out
    // we want to keep things very performant.
    const memoedValue = useMemo(
        () => ({
            user, tokens,
            loading,
            error,
            login,
            // signUp,
            logout,
            currentContextCollection,
            setCurrentContextCollection
        }),
        [user, loading, error]
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useTabhubContext() {
    return useContext(AuthContext);
}