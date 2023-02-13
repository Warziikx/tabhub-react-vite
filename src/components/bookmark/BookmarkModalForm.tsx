import { useEffect } from "react";
import { Form, Modal } from "antd";

import useCollectionContext from "@/lib/context/CollectionContext";
import { BookmarkForm } from "./BookmarkForm";


export const BookmarkModalForm: React.FC = () => {
	const { isModalBookmarkFormOpen, setIsModalBookmarkFormOpen, currentCollection } = useCollectionContext();
	const [form] = Form.useForm();


	useEffect(() => {
		//currentCollection != null && form.setFieldsValue(currentCollection);
		currentCollection != null && form.setFieldValue('collectionId', currentCollection.id)
	}, [form, currentCollection]);

	const onSubmit = () => {
		form.resetFields();
		setIsModalBookmarkFormOpen(false);
	};

	const handleCancel = () => {
		//TODO: Loading Effect on Button
		form.resetFields();
		setIsModalBookmarkFormOpen(false);
	};

	return (
		<Modal title={"Ajouter un bookmark"} open={isModalBookmarkFormOpen} onCancel={handleCancel} onOk={form.submit}>
			<BookmarkForm form={form} submitCallback={onSubmit} />
		</Modal>
	);
};
