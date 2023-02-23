// import { closeModalCollectionForm, currentContextCollection, isModalCollectionFormOpen } from "@/stores/app";
import { Modal, Form } from "antd";
// import { useStore } from '@nanostores/react';
import { CollectionForm } from "@/components/collection/CollectionForm";
import useCollectionContext from "@/lib/context/CollectionContext";

import { useEffect } from "react";

export const CollectionModalForm: React.FC = () => {
	const { currentContextCollection, setCurrentContextCollection, isModalCollectionFormOpen, setIsModalCollectionFormOpen } = useCollectionContext();
	const [form] = Form.useForm();

	useEffect(() => {
		currentContextCollection != null && form.setFieldsValue(currentContextCollection);
		currentContextCollection == null && form.setFieldValue("icon", "📁");
	}, [form, currentContextCollection, isModalCollectionFormOpen]);

	const onSubmit = () => {
		form.resetFields();
		setCurrentContextCollection(null);
		setIsModalCollectionFormOpen(false);
	};

	const handleCancel = () => {
		form.resetFields();
		setIsModalCollectionFormOpen(false);
	};
	return (
		<Modal title={currentContextCollection ? "Modifier une collection" : "Créer une collection"} open={isModalCollectionFormOpen} onOk={form.submit} onCancel={handleCancel}>
			<CollectionForm form={form} submitCallback={onSubmit} />
		</Modal>
	);
};
