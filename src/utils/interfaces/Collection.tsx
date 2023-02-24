import { Bookmark } from "@/utils/interfaces/Bookmark";

export interface Collection {
	id: number;
	name: string;
	icon: string;
	parentId?: number | undefined;
	bookmarks: Array<Bookmark>
	children?: Array<Collection>
	parent?: Collection
}
