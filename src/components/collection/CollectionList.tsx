import { APP_ROUTES } from "@/utils/constant";
import { Collection } from "@/utils/interfaces/Collection";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

interface CollectionListPros {
	collectionList: Array<Collection>;
}

export const CollectionList: React.FC<CollectionListPros> = ({ collectionList }) => {
	const navigate = useNavigate();
	return (
		<Space size={[8, 16]} wrap>
			{collectionList.map((collection: Collection) => {
				return (
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
				);
			})}
		</Space>
	);
};
