import { useEffect, useState } from "react";
import { Breadcrumb, Divider, List, Typography } from "antd";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Collection } from "@/utils/interfaces/Collection";

import { useCollection } from "@/lib/hooks/collectionHook";
import { APP_ROUTES } from "@/utils/constant";
import { BookmarkList } from "@/components/bookmark/BookmarkList";
import { BookmarkDrawerForm } from "@/components/bookmark/form/BookmarkDrawerForm";

import useCollectionContext from "@/lib/context/CollectionContext";
import { CollectionList } from "@/components/collection/CollectionList";

export const CollectionPage: React.FC = () => {
	const navigate = useNavigate();
	const { getCollection } = useCollection();
	const { collection } = useCollectionContext();

	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [localCollectionId, setLocalCollectionId] = useState<number | null>(null);

	let { collectionId } = useParams();

	useEffect(() => {
		if (collectionId != null) {
			let numberCollectionId = parseInt(collectionId);
			if (numberCollectionId != localCollectionId) {
				getCollection(numberCollectionId);
				setLocalCollectionId(numberCollectionId);
			}
		}
	}, [getCollection, collectionId]);

	useEffect(() => {
		if (!isMounted) {
			if (collectionId != null) {
				let numberCollectionId = parseInt(collectionId);
				getCollection(numberCollectionId);
				setLocalCollectionId(numberCollectionId);
			} else {
				navigate(APP_ROUTES.HOME);
			}
			setIsMounted(true);
		}
	}, [isMounted, setIsMounted, getCollection, collectionId]);

	useEffect(() => {
		if (!isMounted) {
			if (collectionId != null) {
				let numberCollectionId = parseInt(collectionId);
				getCollection(numberCollectionId);
				setLocalCollectionId(numberCollectionId);
			} else {
				navigate(APP_ROUTES.HOME);
			}
			setIsMounted(true);
		}
	}, [isMounted, setIsMounted, getCollection, collectionId]);

	const buildBreadcrumbItems = (collection: Collection, level: number): any => {
		return <>
			{collection.parent && buildBreadcrumbItems(collection.parent, level + 1)}
			{level > 0 ? (
				<Breadcrumb.Item href="#" onClick={() => { navigate(`${APP_ROUTES.COLLECTION}${collection?.id}`) }}>
					{collection.icon}
					<span style={{ marginLeft: 4 }}>{collection.name}</span>
				</Breadcrumb.Item>) :
				(<Breadcrumb.Item>
					<span style={{ marginLeft: 4 }}>{collection.name}</span>
				</Breadcrumb.Item>)
			}
		</>
	}

	return (
		<div>
			{collection && collection.parent && (
				<div style={{ marginBottom: "30px" }}>
					<Breadcrumb separator=">">
						{buildBreadcrumbItems(collection, 0)}
						{/* <Breadcrumb.Item href="#" onClick={() => { navigate(`${APP_ROUTES.COLLECTION}${collection.parent?.id}`) }}>
							{collection.parent.icon}
							<span style={{ marginLeft: 4 }}>{collection.parent.name}</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<span style={{ marginLeft: 4 }}>{collection.name}</span></Breadcrumb.Item> */}
					</Breadcrumb>
				</div>
			)}
			{collection && collection.children && collection.children?.length > 0 && (
				<div style={{ marginBottom: "30px" }}>
					<Typography.Title level={4}>Sous-Collection</Typography.Title>
					<Divider style={{ marginBottom: "20px", marginTop: "0" }} />
					<CollectionList collectionList={collection.children} />
				</div>
			)}
			{collection && <BookmarkList collection={collection} bookmarks={collection.bookmarks} />}
			<BookmarkDrawerForm />
		</div>
	);
};
