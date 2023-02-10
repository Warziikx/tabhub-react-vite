// import { closeModalCollectionForm, currentContextCollection, isModalCollectionFormOpen } from "@/stores/app";
import { Modal, Form } from "antd";
// import { useStore } from '@nanostores/react';
// import { CollectionForm } from "@components/collection/CollectionForm";
import useCollectionContext from "@/lib/context/CollectionContext";

import { useEffect } from "react";

export const CollectionModalForm: React.FC = () => {
    const { currentContextCollection, setCurrentContextCollection, isModalCollectionFormOpen, setIsModalCollectionFormOpen } = useCollectionContext()
    // const _isModalCollectionFormOpen = useStore(isModalCollectionFormOpen)
    // const _currentContextCollection = useStore(currentContextCollection)
    const [form] = Form.useForm();

    useEffect(() => {
        currentContextCollection != null &&
            form.setFieldsValue(currentContextCollection)
    }, [form, currentContextCollection]);

    const handleCancel = () => {
        //TODO: Loading Effect on Button
        form.resetFields();
        setIsModalCollectionFormOpen(false);
    }
    return (<Modal
        title={currentContextCollection ? "Modifier une collection" : "Créer une collection"}
        open={isModalCollectionFormOpen}
        onOk={form.submit}
        onCancel={handleCancel}
    >
        {/* <CollectionForm form={form} submitCallback={currentContextCollection} /> */}
    </Modal >)
}