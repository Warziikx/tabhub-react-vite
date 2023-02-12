//import { tryCreate, tryUpdate } from '@/stores/bookmark';
import { useBookmark } from "@/lib/hooks/bookmarkHook";
import { Form, FormInstance, Input } from "antd";

interface BookmarkFormProps {
	form: FormInstance;
	submitCallback: Function;
}

export const BookmarkForm: React.FC<BookmarkFormProps> = ({ form, submitCallback }) => {
	const { createBookmark, updateBookmark } = useBookmark();
	const onSubmit = async (data: any) => {
		console.log(data);
		if (data.id === undefined) await createBookmark(data);
		// else await updateBookmark(data);
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
			onFinishFailed={(errorInfo) => {
				console.log(errorInfo);
			}}
			autoComplete="off"
		>
			<Form.Item hidden={true} name="id"></Form.Item>
			<Form.Item label="Lien" name="link" rules={[{ required: true, message: "Veuillez saisir un lien pour votre bookmark" }]}>
				<Input placeholder="https://" />
			</Form.Item>
		</Form>
	);
};
