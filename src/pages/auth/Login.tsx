import { LoginForm } from "@/components/auth/LoginForm"
import { Row, Col, Card, Typography } from "antd"

export const Login: React.FC = () => {
    return (
        <Row style={{
            background:
                "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('https://picsum.photos/1920/1080?blur')",
            backgroundSize: "cover", minHeight: '100vh'
        }}>
            <Col
                xs={{ span: 18, offset: 3 }}
                md={{ span: 14, offset: 5 }}
                lg={{ span: 10, offset: 7 }}
                xl={{ span: 6, offset: 9 }}
            >
                <Card
                    bordered={false}
                    style={{ marginTop: "300px", marginBottom: "auto" }}
                >
                    <Typography.Title
                        level={2}
                        style={{ textAlign: "center", marginTop: 0 }}
                    >
                        Connexion
                    </Typography.Title>
                    <LoginForm />
                </Card>
            </Col>
        </Row>

    )
}