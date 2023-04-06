import { User } from "@/utils/interfaces/User";
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as authService from "@/lib/services/authService";
import * as userService from "@/lib/services/userService";
import { APP_ROUTES } from "@/utils/constant";
import { LoginProps, AuthToken, RegisterProps } from "@/utils/interfaces/Auth";

import { notification } from "antd";
import type { NotificationPlacement } from 'antd/es/notification/interface';

interface AuthContextType {
	user?: User;
	tokens?: AuthToken;
	loading: boolean;
	_error?: Error;
	login: (objCredential: LoginProps) => void;
	// signUp: (email: string, name: string, password: string) => void;
	logout: () => void;
	setError: (error: Error) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
	let localStorageToken = localStorage.getItem("tokens");
	let token = localStorageToken != null && JSON.parse(localStorageToken);
	const [user, setUser] = useState<User | undefined>();
	const [tokens, setTokens] = useState<AuthToken | undefined>(token);
	const [_error, _setError] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingInitial, setLoadingInitial] = useState<boolean>(false);

	const [api, contextHolder] = notification.useNotification();

	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (_error) _setError(null);
	}, [location.pathname]);

	useEffect(() => {
		userService
			.getMe()
			.then((user) => setUser(user))
			.catch((_error) => { })
			.finally(() => setLoadingInitial(false));
	}, []);

	function getMe() {
		userService
			.getMe()
			.then((user) => setUser(user))
			.catch((_error) => { })
			.finally(() => setLoading(false));
	}

	async function login(objCredential: LoginProps) {
		setLoading(true);
		await authService
			.login(objCredential)
			.then((tokens: AuthToken) => {
				setTokens(tokens);
				localStorage.setItem("tokens", JSON.stringify(tokens));
			})
			.catch((error: Error) => setError(error))
			.finally(() => setLoading(false));

		await getMe();
		navigate(APP_ROUTES.HOME);
	}

	async function register(objCredential: RegisterProps) {
		setLoading(true);
		await authService.register(objCredential)
			.then(data => { })
			.catch((error: Error) => setError(error))
			.finally(() => setLoading(false));
		navigate(APP_ROUTES.LOG_IN)
	}

	function logout() {
		localStorage.removeItem("tokens");
		setTokens(undefined);
		setUser(undefined);
		navigate(APP_ROUTES.LOG_IN);
	}

	function setError(_error: Error) {
		api.error({
			message: `Une erreur s'est produite`,
			description: <AuthContext.Consumer>{() => `${_error.message}`}</AuthContext.Consumer>,
			placement: "bottomRight"
		});
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
			user,
			tokens,
			loading,
			_error,
			login,
			register,
			logout,
			setError
		}),
		[user, loading, _error]
	);

	// We only want to render the underlying app after we
	// assert for the presence of a current user.
	return <AuthContext.Provider value={memoedValue}>{contextHolder}{!loadingInitial && children}</AuthContext.Provider>;
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useTabhubContext() {
	return useContext(AuthContext);
}
