import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/fr.json";
i18n.search_no_results_1 = "Aucun emoji";

import { Button, Col, Form, FormInstance, Input, Popover, Row, TreeSelect } from "antd";

import { useCollection } from "@/lib/hooks/collectionHook";
import { APP_ROUTES } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Collection } from "@/utils/interfaces/Collection";
import useCollectionContext from "@/lib/context/CollectionContext";
import { useEffect, useState } from "react";

interface CollectionFormProps {
	form: FormInstance;
	submitCallback: Function;
}

interface MyTreeSelectDataProps {
	value: number;
	title: string;
	children?: Array<MyTreeSelectDataProps> | undefined
}


export const CollectionForm: React.FC<CollectionFormProps> = ({ form, submitCallback }) => {
	const navigate = useNavigate();
	const iconValue = Form.useWatch("icon", form);

	const { createCollection, updateCollection, getCollectionList } = useCollection();
	const { collectionList } = useCollectionContext();


	const [isMounted, setIsMounted] = useState(false);

	const onSubmit = async (data: any) => {
		let collection: Collection | undefined;
		if (data.id === undefined) {
			collection = await createCollection(data);
		} else { collection = await updateCollection(data); }
		form.resetFields();
		submitCallback();
		if (collection && collection.id)
			navigate(`${APP_ROUTES.COLLECTION}${collection.id}`);
	};

	useEffect(() => {
		if (!isMounted) {
			getCollectionList();
			setIsMounted(true);
		}
	}, [isMounted, setIsMounted]);


	const buildTreeData = (collections: Array<Collection>): Array<MyTreeSelectDataProps> => {
		return collections.map(collection => {
			let data: MyTreeSelectDataProps = { value: collection.id, title: `${collection.icon}  ${collection.name}` }
			if (collection?.children && collection.children.length > 0)
				data.children = buildTreeData(collection.children);
			return data
		})
	}

	return (
		<Form
			form={form}
			name="basic"
			layout="vertical"
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onSubmit}
			requiredMark={false}
			onFinishFailed={(errorInfo) => console.log(errorInfo)}
			autoComplete="off"
		>
			<Form.Item hidden={true} name="id"></Form.Item>
			<Row gutter={4}>
				<Col span={2}>
					<Form.Item label="Icon" name="icon" rules={[{ required: true, message: "Veuillez choisir une icone pour votre collection" }]}>
						<Popover content={<Picker data={data} i18n={i18n} onEmojiSelect={(value: any) => form.setFieldValue("icon", `${value.native}`)} />}>
							<Button icon={iconValue} />
						</Popover>
					</Form.Item>
				</Col>
				<Col span={22}>
					<Form.Item label="Nom de la collection" name="name" rules={[{ required: true, message: "Veuillez saisir un nom pour votre collection" }]}>
						<Input />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item label="Collection Parente" name="parentId">
						<TreeSelect
							showSearch
							style={{ width: '100%' }}
							//value={value}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							placeholder="Aucune"
							allowClear
							treeDefaultExpandAll
							//onChange={onChange}
							treeData={buildTreeData(collectionList)}
						/>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};
