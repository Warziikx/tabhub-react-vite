import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { Collection } from "@/utils/interfaces/Collection";

interface CollectionContextType {
	currentCollection: Collection | null;
	currentContextCollection?: Collection | null;
	isModalCollectionFormOpen: boolean;
	isModalBookmarkFormOpen: boolean;
	setIsModalCollectionFormOpen: (value: boolean) => void;
	setIsModalBookmarkFormOpen: (value: boolean) => void;
	setCurrentContextCollection: (collection: Collection | null) => void;
	setCurrentCollection: (collection: Collection | null) => void;
}

const CollectionContext = createContext<CollectionContextType>({} as CollectionContextType);

// Export the provider as we need to wrap the entire app with it
export function CollectionProvider({ children }: { children: ReactNode }): JSX.Element {
	const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
	const [currentContextCollection, setCurrentContextCollection] = useState<Collection | null>(null);
	const [isModalCollectionFormOpen, setIsModalCollectionFormOpen] = useState<boolean>(false);
	const [isModalBookmarkFormOpen, setIsModalBookmarkFormOpen] = useState<boolean>(false);

	const memoedValue = useMemo(
		() => ({
			currentCollection,
			currentContextCollection,
			isModalCollectionFormOpen,
			isModalBookmarkFormOpen,
			setCurrentCollection,
			setCurrentContextCollection,
			setIsModalCollectionFormOpen,
			setIsModalBookmarkFormOpen,
		}),
		[isModalCollectionFormOpen, currentContextCollection, isModalBookmarkFormOpen]
	);

	return <CollectionContext.Provider value={memoedValue}>{children}</CollectionContext.Provider>;
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useTabhubContext() {
	return useContext(CollectionContext);
}
