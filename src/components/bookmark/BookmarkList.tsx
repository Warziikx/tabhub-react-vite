import { Dropdown, List, MenuProps, Typography } from "antd"
import styled from 'styled-components';
import { blue } from '@ant-design/colors';

import { Bookmark } from "@/utils/interfaces/Bookmark"
import { Collection } from "@/utils/interfaces/Collection";

import useCollectionContext from "@/lib/context/CollectionContext";

/* DAYJS */
import dayjs from "dayjs";
import 'dayjs/locale/fr'
dayjs.locale('fr')

interface BookmarkListProps {
    collection: Collection;
    bookmarks: Bookmark[]
}



const StyledListItem = styled(List.Item)`
    transition: background-color 0.5s ease;
    :hover{
        background-color: rgba(0, 0, 0, 0.06);
    }

`


export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, collection }) => {
    const { currentContextBookmark, setCurrentContextBookmark, setIsDrawerBookmarkFormOpen } = useCollectionContext();
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "Ouvrir dans un nouvel onglet",
            onClick: () => {
                currentContextBookmark && window.open(currentContextBookmark.link, "_blank")
            },
        },
        {
            key: "2",
            label: "Modifier",
            onClick: () => {
                setIsDrawerBookmarkFormOpen(true);
            },
        },
        {
            key: "4",
            danger: true,
            label: "Supprimer",
            onClick: () => {
                //if (currentContextCollection) deleteCollection(currentContextCollection.id);
            },
        },
    ];

    return (<List
        header={<div><Typography.Title level={1}>{collection.name}</Typography.Title></div>}
        dataSource={bookmarks}
        renderItem={(item) => (
            <Dropdown
                menu={{ items }}
                trigger={["contextMenu"]}
                onOpenChange={(isOpen) => {
                    if (isOpen) setCurrentContextBookmark(item);
                    else setCurrentContextBookmark(null);
                }}
            >
                <StyledListItem onClick={() => { window.open(item.link, '_self') }} style={{ cursor: "pointer", }}>
                    <Typography.Title level={4}>{item.title}</Typography.Title>
                    <Typography.Text>{dayjs(item.createdAt).format('DD MMMM YY')}</Typography.Text>
                </StyledListItem>
            </Dropdown>
        )}
    />)
}