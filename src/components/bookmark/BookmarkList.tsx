import { Button, Card, Col, Divider, Dropdown, Empty, List, MenuProps, Radio, Row, Skeleton, Space, Typography } from "antd";
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
	isLoading: boolean
}

const StyledListItem = styled(List.Item)`
	transition: background-color 0.5s ease;
	:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}
`;

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, collection, isLoading }) => {
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
						{isLoading ? <Space><Skeleton.Avatar active shape={"circle"} /> <Skeleton.Input active /></Space> :
							(collection?.icon ?? "") + ' ' + collection.name
						}
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
				{isLoading && [1, 2, 3, 4, 5, 6].map((el, i) =>
					<>
						<div style={{ display: "flex", flexDirection: "row", marginTop: "12px", marginBottom: "12px" }}>
							<Skeleton.Image active style={{ height: 52, width: 82 }} />
							<div style={{ marginLeft: "24px", display: "flex", flexDirection: "column", width: "100%" }}>
								<Skeleton.Input active size={"small"} style={{ height: "14px", width: `${getRandomInt(20, 100)}%` }} />
								<Skeleton.Input active block size={"small"} style={{ marginTop: "4px", height: "12px" }} />
								<Skeleton.Input active size={"small"} style={{ marginTop: "2px", height: "12px", width: `${getRandomInt(20, 87)}%` }} />
							</div>
						</div>
						{i < 5 && <Divider />}
					</>
				)}
				{/* EMPTY BOOKMARK */}
				{!isLoading && bookmarks && bookmarks.length == 0 && (
					<Empty style={{ marginTop: 100 }} description={<span> Pas encore de bookmark ?</span>}>
						<Button type="primary" onClick={() => setIsModalBookmarkFormOpen(true)}>
							Creer maintenant
						</Button>
					</Empty>
				)}
				{/* LIST VIEW */}
				{!isLoading && bookmarks && bookmarks.length > 0 && viewMode === BookmarkViewMode.LISTE && (
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
									<List.Item.Meta avatar={<img style={{ width: 82, height: 52, objectFit: "contain" }} src={item.imageLink} />} title={item.title} description={item.description} />
									<Typography.Text>{dayjs(item.createdAt).format("DD MMMM YYYY")}</Typography.Text>
								</StyledListItem>
							</BookmarkContextDropdrown>
						)}
					/>
				)}
				{/* CARD VIEW */}
				{!isLoading && bookmarks && bookmarks.length > 0 && viewMode === BookmarkViewMode.CARD && (
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
										cover={<img src={item.imageLink} style={{ objectFit: "cover" }} />}
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
