import { closeModalCollectionForm, currentContextCollection, isModalCollectionFormOpen } from "@/stores/app";
import { Modal, Form } from "antd";
import { useStore } from '@nanostores/react';
import { CollectionForm } from "@components/collection/CollectionForm";
import { useEffect } from "react";

export const CollectionModalForm: React.FC = () => {
    const _isModalCollectionFormOpen = useStore(isModalCollectionFormOpen)
    const _currentContextCollection = useStore(currentContextCollection)
    const [form] = Form.useForm();

    useEffect(() => {
        _currentContextCollection != null &&
            form.setFieldsValue(_currentContextCollection)
    }, [form, _currentContextCollection]);

    const handleCancel = () => {
        //TODO: Loading Effect on Button
        form.resetFields();
        closeModalCollectionForm();
    }
    return (<Modal
        title={_currentContextCollection ? "Modifier une collection" : "Créer une collection"}
        open={_isModalCollectionFormOpen}
        onOk={form.submit}
        onCancel={handleCancel}
    >
        <CollectionForm form={form} submitCallback={closeModalCollectionForm} />
    </Modal >)
}