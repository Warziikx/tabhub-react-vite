import { Bookmark } from "@/utils/interfaces/Bookmark";

export interface Collection {
	id: number;
	name: string;
	icon: string;
	bookmarks: Array<Bookmark>
	children?: Array<Collection>
}
