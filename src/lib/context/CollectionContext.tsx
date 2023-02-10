import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { Collection } from "@/utils/interfaces/Collection";

interface CollectionContextType {
    currentContextCollection?: Collection
    isModalCollectionFormOpen: boolean
}


const CollectionContext = createContext<CollectionContextType>({} as CollectionContextType);

// Export the provider as we need to wrap the entire app with it
export function CollectionProvider({ children, }: { children: ReactNode; }): JSX.Element {
    const [currentContextCollection, setCurrentContextCollection] = useState<Collection | undefined>(undefined);
    const [isModalCollectionFormOpen, setIsModalCollectionFormOpen] = useState<boolean>(false)


    const memoedValue = useMemo(
        () => ({ currentContextCollection, setCurrentContextCollection, isModalCollectionFormOpen, setIsModalCollectionFormOpen }),
        [isModalCollectionFormOpen, currentContextCollection]
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <CollectionContext.Provider value={memoedValue}>
            {children}
        </CollectionContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useTabhubContext() {
    return useContext(CollectionContext);
}