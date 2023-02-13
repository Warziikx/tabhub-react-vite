import { useEffect } from "react";
import { Button, Drawer, Form, Space } from "antd";

import { BookmarkForm } from "@/components/bookmark/BookmarkForm";
import useCollectionContext from "@/lib/context/CollectionContext";

export const BookmarkDrawerForm: React.FC = () => {
    const { isDrawerBookmarkFormOpen, setIsDrawerBookmarkFormOpen, currentContextBookmark } = useCollectionContext();
    const [form] = Form.useForm();

    useEffect(() => {
        currentContextBookmark != null && form.setFieldsValue(currentContextBookmark);
    }, [form, currentContextBookmark]);

    const onSubmit = () => {
        form.resetFields();
        setIsDrawerBookmarkFormOpen(false);
    };

    const handleCancel = () => {
        //TODO: Loading Effect on Button
        form.resetFields();
        setIsDrawerBookmarkFormOpen(false);
    };

    return (
        <Drawer title={"Editer"} open={isDrawerBookmarkFormOpen} onClose={handleCancel} extra={
            <Space>
                <Button onClick={handleCancel}>Annuler</Button>
                <Button onClick={form.submit} type="primary">
                    Modifier
                </Button>
            </Space>
        }>
            <BookmarkForm form={form} submitCallback={onSubmit} />
        </Drawer>
    );
}