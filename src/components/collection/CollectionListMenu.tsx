
import { useEffect, useState } from "react";

/* DESIGN ELEMENT */
import { Dropdown, Menu, Skeleton } from "antd";
import type { MenuProps } from "antd";
import { HomeAlt, Plus, Trash } from 'iconoir-react';

import { Collection } from "@/utils/interfaces/Collection";
import { useCollection } from "@/lib/hooks/collectionHook";
import useCollectionContext from "@/lib/context/CollectionContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { APP_ROUTES, HOME_PAGE_KEY, TRASH_PAGE_KEY } from "@/utils/constant";
import { ItemType } from "antd/es/menu/hooks/useItems";

export const CollectionListMenu: React.FC = ({ }) => {
	const navigate = useNavigate();
	const location = useLocation();
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

	const createCollection = () => {
		setCurrentContextCollection(null)
		setIsModalCollectionFormOpen(true)
	}
	const getCurrentKey = (): string => {
		let key = HOME_PAGE_KEY;
		if (collectionId != null) return collectionId
		else {
			if (location.pathname == APP_ROUTES.HOME) key = HOME_PAGE_KEY;
			else if (location.pathname == APP_ROUTES.TRASH) key = TRASH_PAGE_KEY;
		}
		return key;
	}

	const formatuseCollectionToMenuItems = (): ItemType[] => {
		return [
			{
				key: HOME_PAGE_KEY, label: "Accueil", icon: <HomeAlt width="16" style={{ verticalAlign: "middle" }} />, onClick: () => {
					navigate(APP_ROUTES.HOME)
				}
			},
			{ type: 'divider', style: { marginTop: "14px", marginBottom: "14px" } },
			{
				key: "Collection",
				label: "Collection",
				type: "group",
				children: isLoading ?
					[1, 2, 3, 4].map((index) => ({
						key: index,
						label: <Skeleton.Input size="large" block={true} active />,
					})) :
					[...collectionList.map((collection: Collection, index: number) => ({
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
					})), { key: "Create", label: "Ajouter une collecton", icon: <Plus />, onClick: createCollection }]
			},
			{ type: 'divider', style: { marginTop: "14px", marginBottom: "14px" } },
			{
				key: TRASH_PAGE_KEY, label: "Corbeille", icon: <Trash width="16" style={{ verticalAlign: "middle", textAlign: "center" }} />, onClick: () => {
					navigate(APP_ROUTES.TRASH)
				}
			},
		];
	};
	return <Menu
		style={{ padding: 8 }}
		mode="inline"
		defaultSelectedKeys={[HOME_PAGE_KEY]}
		selectedKeys={[getCurrentKey()]}
		items={formatuseCollectionToMenuItems()} />;
};
