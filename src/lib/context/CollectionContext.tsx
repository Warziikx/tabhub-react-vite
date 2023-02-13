import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { Collection } from "@/utils/interfaces/Collection";
import { Bookmark } from "@/utils/interfaces/Bookmark";

interface CollectionContextType {
	/* COLLECTION RELATED */
	currentCollection: Collection | null;
	currentContextCollection?: Collection | null;
	isModalCollectionFormOpen: boolean;
	setCurrentContextCollection: (collection: Collection | null) => void;
	setCurrentCollection: (collection: Collection | null) => void;
	setIsModalCollectionFormOpen: (value: boolean) => void;

	/* BOOKMARK RELATED */
	currentContextBookmark?: Bookmark | null;
	isModalBookmarkFormOpen: boolean;
	isDrawerBookmarkFormOpen: boolean;
	setCurrentContextBookmark: (collection: Bookmark | null) => void;
	setIsModalBookmarkFormOpen: (value: boolean) => void;
	setIsDrawerBookmarkFormOpen: (value: boolean) => void;


}

const CollectionContext = createContext<CollectionContextType>({} as CollectionContextType);

// Export the provider as we need to wrap the entire app with it
export function CollectionProvider({ children }: { children: ReactNode }): JSX.Element {
	/* COLLECTION RELATED */
	const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
	const [currentContextCollection, setCurrentContextCollection] = useState<Collection | null>(null);
	const [isModalCollectionFormOpen, setIsModalCollectionFormOpen] = useState<boolean>(false);

	/* BOOKMARK RELATED */
	const [currentContextBookmark, setCurrentContextBookmark] = useState<Bookmark | null>(null);
	const [isModalBookmarkFormOpen, setIsModalBookmarkFormOpen] = useState<boolean>(false);
	const [isDrawerBookmarkFormOpen, setIsDrawerBookmarkFormOpen] = useState<boolean>(false);

	const memoedValue = useMemo(
		() => ({
			currentCollection,
			currentContextCollection,
			currentContextBookmark,
			isModalCollectionFormOpen,
			isModalBookmarkFormOpen,
			isDrawerBookmarkFormOpen,
			setCurrentCollection,
			setCurrentContextBookmark,
			setCurrentContextCollection,
			setIsModalCollectionFormOpen,
			setIsModalBookmarkFormOpen,
			setIsDrawerBookmarkFormOpen
		}),
		[
			isModalCollectionFormOpen,
			currentContextCollection,
			isModalBookmarkFormOpen,
			isDrawerBookmarkFormOpen,
			currentContextBookmark
		]
	);

	return <CollectionContext.Provider value={memoedValue}>{children}</CollectionContext.Provider>;
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useTabhubContext() {
	return useContext(CollectionContext);
}
