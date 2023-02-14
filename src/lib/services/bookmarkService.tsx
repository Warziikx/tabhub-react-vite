import { API_ROUTES } from "@/utils/constant";
import { Bookmark } from "@/utils/interfaces/Bookmark";
import axios from "axios";

// export async function getBookmarkList(): Promise<Bookmark[]> {
// 	const reponse = await axios.get(`${API_ROUTES.COLLECTION_LIST}`);
// 	return reponse.data.data;
// }

export async function createBookmark(bookmarkData: Bookmark): Promise<Bookmark> {
	const reponse = await axios.post(`${API_ROUTES.BOOKMARK_CREATE}`, bookmarkData);
	return reponse.data.data;
}

export async function updateBookmark(bookmarkId: number, bookmarkData: Bookmark): Promise<Bookmark> {
	/* On remove l'ID */
	const reponse = await axios.put(`${API_ROUTES.BOOKMARK_UPDATE}/${bookmarkId}`, { title: bookmarkData.title, link: bookmarkData.link });
	return reponse.data.data;
}

export async function deleteBookmark(bookmarkId: number): Promise<Bookmark> {
	const reponse = await axios.delete(`${API_ROUTES.BOOKMARK_DELETE}/${bookmarkId}`);
	return reponse.data.data;
}
