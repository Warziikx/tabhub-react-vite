export interface Bookmark {
	title: string;
	description: string;
	id: number;
	link: string;
	createdAt: Date;
}



export enum BookmarkViewMode {
	"LISTE",
	"CARD"
}

export const BookmarkViewModeDisplay: { [index: number]: string } = {};
BookmarkViewModeDisplay[BookmarkViewMode.LISTE] = "Liste";
BookmarkViewModeDisplay[BookmarkViewMode.CARD] = "Card";