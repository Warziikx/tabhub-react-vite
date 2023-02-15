import { Dropdown, MenuProps } from "antd"
import { ReactNode } from "react"

import { Bookmark } from "@/utils/interfaces/Bookmark"
import { useBookmark } from "@/lib/hooks/bookmarkHook";
import useCollectionContext from "@/lib/context/CollectionContext";

interface Props {
    bookmark: Bookmark
    children: ReactNode
}


export const BookmarkContextDropdrown: React.FC<Props> = ({ bookmark, children }) => {
    const { currentContextBookmark, setCurrentContextBookmark, setIsDrawerBookmarkFormOpen } = useCollectionContext();
    const { deleteBookmark } = useBookmark()
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "Ouvrir dans un nouvel onglet",
            onClick: () => {
                if (currentContextBookmark) {
                    const handle = window.open(currentContextBookmark.link);
                    handle!.blur();
                    window.focus();
                }
            },
        },
        {
            key: "2",
            label: "Copier le lien dans le presse papier",
            onClick: () => {
                currentContextBookmark && navigator.clipboard.writeText(currentContextBookmark?.link)
            },
        },
        {
            type: 'divider',
        },
        {
            key: "3",
            label: "Editer",
            onClick: () => {
                setIsDrawerBookmarkFormOpen(true);
            },
        },
        {
            key: "4",
            danger: true,
            label: "Supprimer",
            onClick: () => {
                currentContextBookmark && deleteBookmark(currentContextBookmark.id);
            },
        },
    ];


    return (<Dropdown
        menu={{ items }}
        trigger={["contextMenu"]}
        onOpenChange={(isOpen) => {
            if (isOpen) setCurrentContextBookmark(bookmark);
            else setCurrentContextBookmark(null);
        }}
    >
        {children}
    </Dropdown>)
}