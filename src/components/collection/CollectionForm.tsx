import { tryCreate, tryUpdate } from '@/stores/collection';
import { Form, FormInstance, Input } from 'antd';

interface CollectionFormProps {
    form: FormInstance
    submitCallback: Function
}

export const CollectionForm: React.FC<CollectionFormProps> = ({ form, submitCallback }) => {
    const onSubmit = async (data: any) => {
        console.log(data)
        if (data.id === undefined) await tryCreate(data)
        else await tryUpdate(data)
        form.resetFields();
        submitCallback()
    }

    return (
        <Form
            form={form}
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={(errorInfo) => { console.log(errorInfo) }}
            autoComplete="off"
        >
            <Form.Item hidden={true} name="id">

            </Form.Item>
            <Form.Item
                label="Nom de la collection"
                name="name"
                rules={[{ required: true, message: 'Veuillez saisir un nom pour votre collection' }]}
            >
                <Input />
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked" >
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            {/* <Form.Item >
                <Button type="primary" htmlType="submit" block loading={isLoading} disabled={isLoading}>
                    Connexion
                </Button>
            </Form.Item> */}
        </Form>
    )
}