import { Button, Dropdown, MenuProps, Space } from "antd";
import { useNavigate } from "react-router-dom";

import useCollectionContext from "@/lib/context/CollectionContext";
import { useCollection } from "@/lib/hooks/collectionHook";
import { APP_ROUTES } from "@/utils/constant";
import { Collection } from "@/utils/interfaces/Collection";

interface CollectionListPros {
	collectionList: Array<Collection>;
}

export const CollectionList: React.FC<CollectionListPros> = ({ collectionList }) => {
	const navigate = useNavigate();
	const { deleteCollection } = useCollection();
	const { currentContextCollection, setCurrentContextCollection, setIsModalCollectionFormOpen } = useCollectionContext();

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

	return (
		<Space size={[8, 16]} wrap>
			{collectionList.map((collection: Collection) => {
				return (
					<Dropdown
						key={collection.id}
						menu={{ items }}
						trigger={["contextMenu"]}
						onOpenChange={(isOpen) => {
							if (isOpen) setCurrentContextCollection(collection);
							else setCurrentContextCollection(null);
						}}
					>
						<Button
							key={collection.id}
							size="large"
							type="default"
							icon={collection.icon}
							onClick={() => {
								navigate(`${APP_ROUTES.COLLECTION}${collection.id}`);
							}}
						>
							&nbsp;&nbsp;{collection.name}
						</Button>
					</Dropdown>

				);
			})}
		</Space>
	);
};
