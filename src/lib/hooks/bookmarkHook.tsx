import { Bookmark } from "@/utils/interfaces/Bookmark";
import { useState, useEffect } from "react";
import * as bookmarkService from "@/lib/services/bookmarkService";

export function useBookmark() {
	const [bookmarkList, setBookmarkList] = useState<Bookmark[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
		bookmarkService
			.createBookmark(bookmarkData)
			.then((bookmark) => setBookmarkList([...bookmarkList, bookmarkData]))
			.catch((_error) => {})
			.finally(() => setIsLoading(false));
	};

	// const updateBookmark = (bookmarkData: Bookmark) => {
	// 	setIsLoading(true);
	// 	const bookmarkId = bookmarkData.id;
	// 	bookmarkService
	// 		.updateBookmark(bookmarkId, bookmarkData)
	// 		.then((bookmark) => {
	// 			let updatedBookmark = bookmarkList.map((bookmark: Bookmark) => {
	// 				if (bookmark.id == bookmarkData.id) return bookmarkData;
	// 				else return bookmark;
	// 			});
	// 			setBookmarkList(updatedBookmark);
	// 			return;
	// 		})
	// 		.catch((_error) => {})
	// 		.finally(() => setIsLoading(true));
	// };

	// const deleteBookmark = (bookmarkId: number) => {
	// 	setIsLoading(true);
	// 	bookmarkService
	// 		.deleteBookmark(bookmarkId)
	// 		.then((bookmarks) => setBookmarkList(bookmarkList.filter((bookmark: Bookmark) => bookmark.id !== bookmarkId)))
	// 		.catch((_error) => {})
	// 		.finally(() => setIsLoading(false));
	// };

	return { bookmarkList, createBookmark, isLoading };
}
