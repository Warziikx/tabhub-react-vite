import { Bookmark } from "@/utils/interfaces/Bookmark";

export interface Collection {
	id: number;
	name: string;

	bookmarks: Array<Bookmark>
}
