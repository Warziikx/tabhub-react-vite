import { Bookmark } from "@/utils/interfaces/Bookmark";
import { useState, useEffect, useMemo } from "react";
import * as bookmarkService from "@/lib/services/bookmarkService";

import useCollectionContext from "@/lib/context/CollectionContext";

export function useBookmark() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { collection, setCollection } = useCollectionContext();


	// const getBookmarkList = () => {
	// 	setIsLoading(true);
	// 	bookmarkService
	// 		.getBookmarkList()
	// 		.then((bookmarks) => setBookmarkList(bookmarks))
	// 		.catch((_error) => {})
	// 		.finally(() => setIsLoading(false));
	// };

	const createBookmark = async (bookmarkData: Bookmark) => {
		try {
			setIsLoading(true);
			let newBookmark = await bookmarkService.createBookmark(bookmarkData)
			collection!.bookmarks = [...collection?.bookmarks ?? [], newBookmark];
			setCollection(collection)
		} catch (err) { console.log(err) }
		setIsLoading(true)
	};

	const updateBookmark = async (bookmarkData: Bookmark) => {
		try {
			setIsLoading(true);
			const bookmarkId = bookmarkData.id;
			let updatedBookmark = await bookmarkService.updateBookmark(bookmarkId, bookmarkData)
			let newBookmarksList = collection!.bookmarks.map(bookmark => {
				if (bookmark.id === bookmarkId) return updatedBookmark;
				return bookmark;
			})
			collection!.bookmarks = newBookmarksList;
			setCollection(collection)
		} catch (err) { console.log(err) }
		setIsLoading(true)
	};

	const deleteBookmark = async (bookmarkId: number) => {
		try {
			await bookmarkService.deleteBookmark(bookmarkId)
			let newBookmarksList = collection!.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
			collection!.bookmarks = newBookmarksList;
			setCollection(collection)


		} catch (err) { console.log(err) }
		setIsLoading(true);
	};


	const memoedValue = useMemo(
		() => ({
			createBookmark,
			updateBookmark,
			deleteBookmark,
			isLoading
		}),
		[isLoading]
	);

	return memoedValue

	//return { bookmarkList, createBookmark, updateBookmark, isLoading };
}
