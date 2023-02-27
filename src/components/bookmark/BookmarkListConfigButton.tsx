import { BookmarkViewMode, BookmarkViewModeDisplay } from "@/utils/interfaces/Bookmark";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons"
import { Button, Dropdown, Radio, RadioChangeEvent, Space, theme } from "antd"
const { useToken } = theme;


interface Props {
    viewMode: BookmarkViewMode
    setViewMode: (viewMode: number) => void;
}

export const BookmarkListConfigButton: React.FC<Props> = ({ viewMode, setViewMode }) => {

    const { token } = useToken();

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        padding: token.paddingSM,
    };

    const onViewModeChange = (e: RadioChangeEvent) => {
        setViewMode(e.target.value)
    }

    const getIcon = () => {
        if (viewMode === BookmarkViewMode.LISTE) {
            return <UnorderedListOutlined />
        } else if (viewMode === BookmarkViewMode.CARD) {
            return <AppstoreOutlined />
        }
    }


    return (<Dropdown
        menu={{}}
        dropdownRender={(menu) => (
            <div style={contentStyle}>
                <p>Vue</p>
                <Radio.Group value={viewMode} onChange={onViewModeChange}>
                    <Space direction="vertical">
                        <Radio value={BookmarkViewMode.LISTE}><UnorderedListOutlined />&nbsp;Liste</Radio>
                        <Radio value={BookmarkViewMode.CARD}><AppstoreOutlined />&nbsp;Card</Radio>
                    </Space>
                </Radio.Group>
            </div>
        )}
    >
        <Button onClick={(e) => e.preventDefault()}>
            <Space>
                {getIcon()}
                {BookmarkViewModeDisplay[viewMode]}
            </Space>
        </Button>
    </Dropdown>)
}