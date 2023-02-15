import { Dropdown, Menu, Skeleton } from "antd";
import { useEffect, useState } from "react";

import { WindowsOutlined, HomeOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Collection } from "@/utils/interfaces/Collection";
import { useCollection } from "@/lib/hooks/collectionHook";
import useCollectionContext from "@/lib/context/CollectionContext";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES, HOME_PAGE_KEY } from "@/utils/constant";

export const CollectionListMenu: React.FC = ({ }) => {
	const navigate = useNavigate();
	let { collectionId } = useParams();
	const [isMounted, setIsMounted] = useState(false);
	const { isLoading, getCollectionList, deleteCollection } = useCollection();
	const { collectionList, currentContextCollection, setCurrentContextCollection, setIsModalCollectionFormOpen } = useCollectionContext();

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: "Modifier",
			onClick: () => {
				setIsModalCollectionFormOpen(true);
			},
		},
		{
			key: "4",
			danger: true,
			label: "Supprimer",
			onClick: () => {
				if (currentContextCollection) deleteCollection(currentContextCollection.id);
			},
		},
	];

	useEffect(() => {
		if (!isMounted) {
			getCollectionList();
			setIsMounted(true);
		}
	}, [isMounted, setIsMounted, getCollectionList]);

	const buildMenuItem = () => {
		return [
			{
				key: HOME_PAGE_KEY, label: "Accueil", icon: <HomeOutlined />, onClick: () => {
					navigate(APP_ROUTES.HOME)
				}
			},
			{
				key: "Collection",
				label: "Collection",
				type: "group",
				icon: <WindowsOutlined />,
				children: isLoading ?
					[1, 2, 3, 4].map((index) => ({
						key: index,
						label: <Skeleton.Input size="large" block={true} active />,
					})) :
					[...formatCollectionToMenuItems(collectionList), { key: "Create", label: "Ajouter une collecton", icon: <PlusOutlined />, onClick: () => { setIsModalCollectionFormOpen(true); } }]
			},
		];
	};
	const formatCollectionToMenuItems = (collections: Array<Collection>): MenuProps["items"] => {
		return collections.map((collection: Collection, index: number) => ({
			key: `${collection.id}`,
			icon: <div>{collection.icon}</div>,
			onClick: () => { navigate(`${APP_ROUTES.COLLECTION}${collection.id}`) },
			label: (
				<Dropdown
					menu={{ items }}
					trigger={["contextMenu"]}
					onOpenChange={(isOpen) => {
						if (isOpen) setCurrentContextCollection(collection);
						else setCurrentContextCollection(null);
					}}
				>
					<div>{collection.name}</div>
				</Dropdown>
			),
			children: collection.children ? formatCollectionToMenuItems(collection.children) : undefined,
		}))
	}

	return <Menu
		style={{ padding: 8 }}
		mode="inline"
		defaultSelectedKeys={[HOME_PAGE_KEY]}
		selectedKeys={[collectionId != null ? `${collectionId}` : HOME_PAGE_KEY]}
		items={buildMenuItem()} />;
};
