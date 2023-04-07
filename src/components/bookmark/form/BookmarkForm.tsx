//import { tryCreate, tryUpdate } from '@/stores/bookmark';

import { Form, FormInstance, Input, UploadFile } from "antd";
import { useEffect, useState } from "react";

import { useBookmark } from "@/lib/hooks/bookmarkHook";
import useCollectionContext from "@/lib/context/CollectionContext";
import { ThImageUpload } from "@/components/form/ThImageUpload";

interface BookmarkFormProps {
	form: FormInstance;
	submitCallback: Function;
}

export const BookmarkForm: React.FC<BookmarkFormProps> = ({ form, submitCallback }) => {
	const { currentContextBookmark } = useCollectionContext();
	const { createBookmark, updateBookmark } = useBookmark();


	const onSubmit = async (data: any) => {
		if (data.imagePath) {
			let uniqueImage = data.imagePath.filter((d: any, i: number) => i === 0)[0]
			data.imagePath = uniqueImage.response ? uniqueImage.response.filePath : uniqueImage.name
		}
		if (data.id === undefined) await createBookmark(data);
		else await updateBookmark(data);
		form.resetFields();
		submitCallback();
	};

	const fileUpload = (e: any) => {
		//console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
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
					<Form.Item label="Image" name="imagePath" getValueFromEvent={fileUpload}>
						<ThImageUpload maxCount={1} multiple={false} />
					</Form.Item>
					<Form.Item hidden={true} name="imageLink">
						<Input />
					</Form.Item>
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
