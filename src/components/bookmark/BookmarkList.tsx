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
	const { setIsModalBookmarkFormOpen } = useCollectionContext();
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
						<Button onClick={() => setIsModalBookmarkFormOpen(true)} icon={<PlusOutlined />} />
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
									<List.Item.Meta avatar={<img style={{ width: 82, height: 52 }} src={item.imagePath} />} title={item.title} description={item.description} />
									<Typography.Text>{dayjs(item.createdAt).format("DD MMMM YY")}</Typography.Text>
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
										cover={<img src={item.imagePath} />}
									>
										<Card.Meta title={item.title} description={item.description} />
									</Card>
								</BookmarkContextDropdrown>
							</List.Item>
						)}
					/>
				)}
			</Col>
		</Row>

		// bookmarks.length > 0 ?
		//     <List
		//         header={
		//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
		//                 <Typography.Title level={4}>{collection.icon} {collection.name}</Typography.Title>
		//                 <Space>
		//                     <BookmarkListConfigButton viewMode={viewMode} setViewMode={setViewMode} />
		//                     <Button onClick={() => setIsModalBookmarkFormOpen(true)} icon={<PlusOutlined />} />
		//                 </Space>
		//             </div>
		//         }
		//         grid={
		//             viewMode == BookmarkViewMode.CARD ?
		//                 { gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, } : undefined
		//         }
		//         dataSource={bookmarks}
		//         renderItem={(item: Bookmark) => (
		//             <Dropdown
		//                 menu={{ items }}
		//                 trigger={["contextMenu"]}
		//                 onOpenChange={(isOpen) => {
		//                     if (isOpen) setCurrentContextBookmark(item);
		//                     else setCurrentContextBookmark(null);
		//                 }}
		//             >
		//                 {
		//                     viewMode == BookmarkViewMode.CARD ?
		//                         (<List.Item>
		//                             <Card title={item.title}><Typography.Paragraph >{item.description}</Typography.Paragraph></Card>
		//                         </List.Item>) :
		//                         (<StyledListItem
		//                             onClick={() => { window.open(item.link, '_self') }}
		//                             onMouseDown={(event: any) => { if (event.button === 1) { window.open(item.link, '_blank') } }}
		//                             style={{ cursor: "pointer", }}
		//                         >
		//                             <List.Item.Meta title={item.title} description={item.description} />
		//                             <Typography.Text>{dayjs(item.createdAt).format('DD MMMM YY')}</Typography.Text>
		//                         </StyledListItem>)
		//                 }
		//             </Dropdown>
		//         )}
		//     /> : <Empty
		//         description={< span > Pas encore de bookmark ?</span >}
		//     >
		//         <Button type="primary" onClick={() => setIsModalBookmarkFormOpen(true)}>Creer maintenant</Button>
		//     </Empty >
	);
};
