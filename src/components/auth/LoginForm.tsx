import useTabhubContext from "@/lib/context/TabhubContext";
import { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { Link } from "react-router-dom";

export const LoginForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useTabhubContext()
    const onSubmit = async (data: any) => {
        setIsLoading(true)
        await login(data)
        setIsLoading(false)
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={(errorInfo) => { console.log(errorInfo) }}
            autoComplete="off"
        >
            <Form.Item
                label="Adresse Email"
                name="email"
                rules={[{ required: true, message: 'Adresse email invalide', type: "email" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mot de passe"
                name="password"
                rules={[{ required: true, message: 'Veuillez saisir votre mot de passe' }]}
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked" >
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item >
                <Button type="primary" htmlType="submit" block loading={isLoading} disabled={isLoading} size="large">
                    Connexion
                </Button>
            </Form.Item>
            <div style={{ textAlign: "center" }}>
                <Typography.Text>
                    Pas encore de compte ?&nbsp;
                    <Link to={"/auth/register"}>Inscription</Link>
                </Typography.Text>
            </div>
        </Form>
    )
}
