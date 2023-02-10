import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    PlusOutlined,
    BlockOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import {
    Layout,
    Menu,
    theme,
    Typography,
    Avatar,
    Dropdown,
    FloatButton,
    MenuProps
} from "antd";
// import { openModalCollectionForm } from '@store/app';

import { CollectionListMenu } from "../collection/CollectionListMenu";
import useTabhubContext from "@/lib/context/TabhubContext";
import useCollectionContext from '@/lib/context/CollectionContext'
import { CollectionModalForm } from "../collection/CollectionModalForm";
import { CollectionProvider } from "@/lib/context/CollectionContext";

const { Header, Content, Sider } = Layout;

export const TabHubLayout: React.FC = () => {
    const { currentContextCollection, setCurrentContextCollection, isModalCollectionFormOpen, setIsModalCollectionFormOpen } = useCollectionContext()
    const { user, logout } = useTabhubContext();
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer } } = theme.useToken();

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "Mon Compte",
        },
        {
            key: "4",
            danger: true,
            label: "Déconnexion",
            icon: <LogoutOutlined />,
            onClick: logout,
        },
    ];

    return (
        <CollectionProvider>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    width={260}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{ background: colorBgContainer }}
                >
                    <Typography.Title
                        level={2}
                        style={{ textAlign: "center", height: "64", verticalAlign: "middle" }}
                    >
                        TabHub
                    </Typography.Title>
                    <CollectionListMenu />
                </Sider>
                <Layout className="site-layout">
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <div style={{ float: "left", paddingLeft: 20 }}>
                            {React.createElement(
                                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                {
                                    className: "trigger",
                                    onClick: () => setCollapsed(!collapsed),
                                }
                            )}
                        </div>
                        <div style={{ float: "right", paddingRight: 20 }}>
                            <Typography.Text style={{ marginRight: 20 }} >Bienvenue {user?.email}</Typography.Text>
                            <Dropdown menu={{ items }}>
                                <Avatar icon={<UserOutlined />} />
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: "16px",
                            padding: 24,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
                <FloatButton.Group
                    trigger="hover"
                    type="primary"
                    icon={<PlusOutlined />}
                >
                    <FloatButton
                        icon={<LinkOutlined />}
                        tooltip={<div>Ajouter un lien</div>}
                    />
                    <FloatButton
                        icon={<BlockOutlined />}
                        onClick={() => setIsModalCollectionFormOpen(true)}
                        tooltip={<div>Ajouter une collection</div>}
                    />
                </FloatButton.Group>
                <CollectionModalForm />
            </Layout>
        </CollectionProvider>
    );
};
