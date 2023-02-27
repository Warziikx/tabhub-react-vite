import useTabhubContext from "@/lib/context/TabhubContext";
import { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { Link } from "react-router-dom";

export const RegisterForm: React.FC = () => {
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
            style={{ maxWidth: 400 }}
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
                <Input size="large" />
            </Form.Item>

            <Form.Item
                label="Mot de passe"
                name="password"
                rules={[{ required: true, message: 'Veuillez saisir votre mot de passe' }]}
            >
                <Input.Password size="large" />
            </Form.Item>

            <Form.Item
                label="Confirmation Mot de passe"
                name="password_confirm"
                rules={[{
                    required: true,
                    message: 'Veuillez confirmer votre mot de passe ',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Les mots de passe que vous avez saisis ne correspondent pas '));
                    },
                }),]}
            >
                <Input.Password size="large" />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" block loading={isLoading} disabled={isLoading} size="large">
                    Inscription
                </Button>
            </Form.Item>
            <div style={{ textAlign: "center" }}>
                <Typography.Text>
                    Déjà un compte ?&nbsp;
                    <Link to={"/auth/login"}>Connexion</Link>
                </Typography.Text>
            </div>
        </Form>
    )
}
