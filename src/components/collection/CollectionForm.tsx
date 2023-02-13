//import { tryCreate, tryUpdate } from '@/stores/collection';

import { Form, FormInstance, Input } from "antd";

import useCollectionContext from "@/lib/context/CollectionContext";
import { useCollection } from "@/lib/hooks/collectionHook";

interface CollectionFormProps {
	form: FormInstance;
	submitCallback: Function;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({ form, submitCallback }) => {
	const { createCollection, updateCollection } = useCollection();

	const onSubmit = async (data: any) => {
		console.log(data);
		if (data.id === undefined) await createCollection(data);
		else await updateCollection(data);
		form.resetFields();
		submitCallback();
	};

	return (
		<Form
			form={form}
			name="basic"
			layout="vertical"
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onSubmit}
			onFinishFailed={(errorInfo) => console.log(errorInfo)}
			autoComplete="off"
		>
			<Form.Item hidden={true} name="id"></Form.Item>
			<Form.Item label="Nom de la collection" name="name" rules={[{ required: true, message: "Veuillez saisir un nom pour votre collection" }]}>
				<Input />
			</Form.Item>
		</Form >
	);
};
