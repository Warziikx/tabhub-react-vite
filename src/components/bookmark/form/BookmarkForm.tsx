//import { tryCreate, tryUpdate } from '@/stores/bookmark';

import { Form, FormInstance, Input } from "antd";
import { useEffect } from "react";

import { useBookmark } from "@/lib/hooks/bookmarkHook";
import useCollectionContext from "@/lib/context/CollectionContext";

interface BookmarkFormProps {
	form: FormInstance;
	submitCallback: Function;
}

export const BookmarkForm: React.FC<BookmarkFormProps> = ({ form, submitCallback }) => {
	const { currentContextBookmark } = useCollectionContext();
	const { createBookmark, updateBookmark } = useBookmark();
	const linkValue = Form.useWatch('link', form);

	const onSubmit = async (data: any) => {
		if (data.id === undefined) await createBookmark(data);
		else await updateBookmark(data);
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
			onFinishFailed={(errorInfo) => { console.log(errorInfo); }}
			autoComplete="off"
		>
			<Form.Item hidden={true} name="id"></Form.Item>
			<Form.Item hidden={true} name="collectionId"></Form.Item>
			<Form.Item label="Lien" name="link" rules={[{ required: true, type: "url", message: "Veuillez saisir un lien pour votre bookmark" }]}>
				<Input placeholder="https://" />
			</Form.Item>
			{
				currentContextBookmark != null &&
				<>
					<Form.Item label="Title" name="title" rules={[{ required: true, message: "Veuillez saisir un titre pour votre bookmark" }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input.TextArea autoSize={true} />
					</Form.Item>
				</>
			}
		</Form>
	);
};
