import { Dropdown, Menu, Skeleton } from "antd";
import { useEffect, useState } from "react";

import { WindowsOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Collection } from "@/utils/interfaces/Collection";
import { useCollection } from "@/lib/hooks/collectionHook";
import useCollectionContext from "@/lib/context/CollectionContext";

export const CollectionListMenu: React.FC = ({}) => {
	const [isMounted, setIsMounted] = useState(false);
	const { collectionList, isLoading, getCollectionList, deleteCollection, updateCollection } = useCollection();
	const { currentContextCollection, setCurrentContextCollection, setIsModalCollectionFormOpen, setCurrentCollection } = useCollectionContext();

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

	const formatuseCollectionToMenuItems = () => {
		return [
			{ key: "Accueil", label: "Accueil", icon: <HomeOutlined /> },
			{
				key: "Collection",
				label: "Collection",
				type: "group",
				icon: <WindowsOutlined />,
				children: isLoading
					? [1, 2, 3, 4].map((index) => ({
							key: index,
							label: <Skeleton.Input size="large" block={true} active />,
					  }))
					: collectionList.map((collection: Collection, index: number) => ({
							key: index,
							onclick: () => setCurrentCollection(collection),
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
					  })),
			},
		];
	};

	return <Menu style={{ padding: 8 }} mode="inline" defaultSelectedKeys={["Accueil"]} items={formatuseCollectionToMenuItems()} />;
};
