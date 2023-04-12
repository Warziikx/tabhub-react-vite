import { useEffect, useState } from "react";
import { Button, Drawer, Form, Space } from "antd";

import { BookmarkForm } from "@/components/bookmark/form/BookmarkForm";
import useCollectionContext from "@/lib/context/CollectionContext";

export const BookmarkDrawerForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { isDrawerBookmarkFormOpen, setIsDrawerBookmarkFormOpen, currentContextBookmark } = useCollectionContext();
	const [form] = Form.useForm();

	useEffect(() => {
		if (currentContextBookmark != null) {
			form.setFieldsValue(currentContextBookmark);
			form.setFieldValue("imagePath", [
				{ uid: currentContextBookmark.imagePath, name: currentContextBookmark.imagePath, percent: 100, thumbUrl: currentContextBookmark.imageLink, type: "image/jpeg" },
			]);
		}
	}, [form, currentContextBookmark]);

	const onButtonClick = () => {
		setIsLoading(true);
		form.submit();
	};

	const submitCallback = () => {
		setIsLoading(false);
		form.resetFields();
		setIsDrawerBookmarkFormOpen(false);
	};

	const handleCancel = () => {
		//TODO: Loading Effect on Button
		form.resetFields();
		setIsDrawerBookmarkFormOpen(false);
	};

	return (
		<Drawer
			title={"Editer"}
			open={isDrawerBookmarkFormOpen}
			onClose={handleCancel}
			extra={
				<Space>
					<Button onClick={handleCancel}>Annuler</Button>
					<Button onClick={onButtonClick} type="primary" loading={isLoading} disabled={isLoading}>
						Modifier
					</Button>
				</Space>
			}
		>
			<BookmarkForm form={form} submitCallback={submitCallback} />
		</Drawer>
	);
};
