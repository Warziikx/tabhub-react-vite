import { Button, Card, Col, Divider, Dropdown, Empty, List, MenuProps, Radio, Row, Space, Typography } from "antd";
import styled from "styled-components";

import { Bookmark, BookmarkViewMode } from "@/utils/interfaces/Bookmark";
import { Collection } from "@/utils/interfaces/Collection";

import useCollectionContext from "@/lib/context/CollectionContext";

/* DAYJS */
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useBookmark } from "@/lib/hooks/bookmarkHook";
import { PlusOutlined } from "@ant-design/icons";
import { BookmarkListConfigButton } from "./BookmarkListConfigButton";
import { useState } from "react";
import { BookmarkContextDropdrown } from "./BookmarkContextDropdown";
dayjs.locale("fr");

interface BookmarkListProps {
	collection: Collection;
	bookmarks: Bookmark[];
}

const StyledListItem = styled(List.Item)`
	transition: background-color 0.5s ease;
	:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}
`;

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, collection }) => {
	const { setIsModalBookmarkFormOpen, setCurrentContextBookmark } = useCollectionContext();
	const [viewMode, setViewMode] = useState<BookmarkViewMode>(BookmarkViewMode.LISTE);

	const openLinkOnCurrentPage = (link: string) => {
		window.open(link, "_self");
	};
	const openLinkMiddleClick = (event: any, link: string) => {
		if (event.button === 1) {
			window.open(link, "_blank");
		}
	};

	return (
		<Row>
			<Col span={24}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Typography.Title level={4} style={{ marginBottom: 0 }}>
						{collection.icon} {collection.name}
					</Typography.Title>
					<Space>
						<BookmarkListConfigButton viewMode={viewMode} setViewMode={setViewMode} />
						<Button
							onClick={() => {
								setCurrentContextBookmark(null)
								setIsModalBookmarkFormOpen(true)
							}}
							icon={<PlusOutlined />} />
					</Space>
				</div>
				<Divider style={{ marginTop: 8 }} />
				{/* EMPTY BOOKMARK */}
				{bookmarks && bookmarks.length == 0 && (
					<Empty style={{ marginTop: 100 }} description={<span> Pas encore de bookmark ?</span>}>
						<Button type="primary" onClick={() => setIsModalBookmarkFormOpen(true)}>
							Creer maintenant
						</Button>
					</Empty>
				)}
				{/* LIST VIEW */}
				{bookmarks && bookmarks.length > 0 && viewMode === BookmarkViewMode.LISTE && (
					<List
						dataSource={bookmarks}
						renderItem={(item: Bookmark) => (
							<BookmarkContextDropdrown bookmark={item}>
								<StyledListItem
									onClick={() => {
										openLinkOnCurrentPage(item.link);
									}}
									onMouseDown={(event: any) => {
										openLinkMiddleClick(event, item.link);
									}}
									style={{ cursor: "pointer" }}
								>
									<List.Item.Meta avatar={<img style={{ width: 82, height: 52 }} src={item.imageLink} />} title={item.title} description={item.description} />
									<Typography.Text>{dayjs(item.createdAt).format("DD MMMM YYYY")}</Typography.Text>
								</StyledListItem>
							</BookmarkContextDropdrown>
						)}
					/>
				)}
				{/* CARD VIEW */}
				{bookmarks && bookmarks.length > 0 && viewMode === BookmarkViewMode.CARD && (
					<List
						grid={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
						dataSource={bookmarks}
						renderItem={(item: Bookmark) => (
							<List.Item>
								<BookmarkContextDropdrown bookmark={item}>
									<Card
										hoverable
										onClick={() => {
											openLinkOnCurrentPage(item.link);
										}}
										onMouseDown={(event: any) => {
											openLinkMiddleClick(event, item.link);
										}}
										cover={<img src={item.imageLink} />}
									>
										<Card.Meta
											title={item.title}
											description={item.description} />
									</Card>
								</BookmarkContextDropdrown>
							</List.Item>
						)}
					/>
				)}
			</Col>
		</Row>
	);
};
