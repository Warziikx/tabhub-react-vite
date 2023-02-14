import { Button, Card, Dropdown, Empty, List, MenuProps, Radio, Space, Typography } from "antd"
import styled from 'styled-components';

import { Bookmark, BookmarkViewMode } from "@/utils/interfaces/Bookmark"
import { Collection } from "@/utils/interfaces/Collection";

import useCollectionContext from "@/lib/context/CollectionContext";

/* DAYJS */
import dayjs from "dayjs";
import 'dayjs/locale/fr'
import { useBookmark } from "@/lib/hooks/bookmarkHook";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { BookmarkListConfigButton } from "./BookmarkListConfigButton";
import { useState } from "react";
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
    const { currentContextBookmark, setCurrentContextBookmark, setIsDrawerBookmarkFormOpen, setIsModalBookmarkFormOpen } = useCollectionContext();
    const [viewMode, setViewMode] = useState<BookmarkViewMode>(BookmarkViewMode.LISTE);

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
                currentContextBookmark && deleteBookmark(currentContextBookmark.id);
            },
        },
    ];

    return (
        bookmarks.length > 0 ?
            <List
                header={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography.Title level={4}>{collection.icon} {collection.name}</Typography.Title>
                        <Space>
                            <BookmarkListConfigButton viewMode={viewMode} setViewMode={setViewMode} />
                            <Button onClick={() => setIsModalBookmarkFormOpen(true)} icon={<PlusOutlined />} />
                        </Space>
                    </div >
                }
                grid={
                    viewMode == BookmarkViewMode.CARD ?
                        { gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, } : undefined
                }
                dataSource={bookmarks}
                renderItem={(item: Bookmark) => (
                    <Dropdown
                        menu={{ items }}
                        trigger={["contextMenu"]}
                        onOpenChange={(isOpen) => {
                            if (isOpen) setCurrentContextBookmark(item);
                            else setCurrentContextBookmark(null);
                        }}
                    >
                        {
                            viewMode == BookmarkViewMode.CARD ?
                                <List.Item><Card title={item.title}><Typography.Paragraph >{item.description}</Typography.Paragraph></Card></List.Item> :
                                <StyledListItem
                                    onClick={() => { window.open(item.link, '_self') }}
                                    onMouseDown={(event: any) => { if (event.button === 1) { window.open(item.link, '_blank') } }}
                                    style={{ cursor: "pointer", }}
                                >
                                    <List.Item.Meta title={item.title} description={item.description} />
                                    <Typography.Text>{dayjs(item.createdAt).format('DD MMMM YY')}</Typography.Text>
                                </StyledListItem>
                        }
                    </Dropdown>
                )}
            /> : <Empty
                description={< span > Pas encore de bookmark ?</span >}
            >
                <Button type="primary" onClick={() => setIsModalBookmarkFormOpen(true)}>Creer maintenant</Button>
            </Empty >
    )
}