import { Bookmark } from "@/utils/interfaces/Bookmark";
import { useState, useEffect, useMemo } from "react";
import * as bookmarkService from "@/lib/services/bookmarkService";

export function useBookmark() {
	const [bookmarkList, setBookmarkList] = useState<Bookmark[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [mustReloadCollection, setMustReloadCollection] = useState<boolean>(false);

	// const getBookmarkList = () => {
	// 	setIsLoading(true);
	// 	bookmarkService
	// 		.getBookmarkList()
	// 		.then((bookmarks) => setBookmarkList(bookmarks))
	// 		.catch((_error) => {})
	// 		.finally(() => setIsLoading(false));
	// };

	const createBookmark = (bookmarkData: Bookmark) => {
		setIsLoading(true);
		console.log(bookmarkData)
		bookmarkService
			.createBookmark(bookmarkData)
			.then((bookmark) => setMustReloadCollection(true))
			.catch((_error) => { })
			.finally(() => setIsLoading(false));
	};

	const updateBookmark = (bookmarkData: Bookmark) => {
		setIsLoading(true);
		const bookmarkId = bookmarkData.id;
		bookmarkService
			.updateBookmark(bookmarkId, bookmarkData)
			.then((bookmark) => setMustReloadCollection(true))
			.catch((_error) => { })
			.finally(() => setIsLoading(true));
	};

	// const deleteBookmark = (bookmarkId: number) => {
	// 	setIsLoading(true);
	// 	bookmarkService
	// 		.deleteBookmark(bookmarkId)
	// 		.then((bookmarks) => setBookmarkList(bookmarkList.filter((bookmark: Bookmark) => bookmark.id !== bookmarkId)))
	// 		.catch((_error) => {})
	// 		.finally(() => setIsLoading(false));
	// };


	const memoedValue = useMemo(
		() => ({
			mustReloadCollection,
			createBookmark,
			updateBookmark,
			isLoading
		}),
		[mustReloadCollection, isLoading]
	);

	return memoedValue

	//return { bookmarkList, createBookmark, updateBookmark, isLoading };
}
