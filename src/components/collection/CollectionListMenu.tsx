import { Dropdown, Menu, Skeleton } from "antd"
import { useEffect, useState } from "react";

import {
    WindowsOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from 'antd'
import { Collection } from "@/utils/interfaces/Collection";
import { useCollection } from '@/lib/hooks/collectionHook'
import useCollectionContext from "@/lib/context/CollectionContext";

export const CollectionListMenu: React.FC = ({ }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { collectionList, isLoading, getCollectionList, deleteCollection } = useCollection();
    const { currentContextCollection, setCurrentContextCollection } = useCollectionContext()


    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "Modifier",
            // onClick: () => {
            //     console.log(_currentContextCollection)
            //     openModalCollectionForm();
            // }
        },
        {
            key: "4",
            danger: true,
            label: "Supprimer",
            onClick: () => {
                if (currentContextCollection)
                    deleteCollection(currentContextCollection.id)
            }
        },
    ];

    useEffect(() => {
        if (!isMounted) {
            getCollectionList();
            setIsMounted(true);
        }
    }, [isMounted, setIsMounted]);

    const formatuseCollectionToMenuItems = () => {
        return [{ key: "Accueil", label: "Accueil", icon: <HomeOutlined /> }, {
            key: "Collection",
            label: "Collection",
            type: "group",
            icon: <WindowsOutlined />,
            children: isLoading ? [1, 2, 3, 4].map((index) => ({
                key: index,
                label: <Skeleton.Input size="large" block={true} active />,
            })) : collectionList.map((collection: Collection, index: number) => ({
                key: index,
                label: <Dropdown
                    menu={{ items }}
                    trigger={['contextMenu']}
                    onOpenChange={(isOpen) => {
                        if (isOpen) setCurrentContextCollection(collection)
                        else setCurrentContextCollection(null)
                    }}>
                    <div>{collection.name}</div>
                </Dropdown>,
            }))
        }]
    };

    return (<Menu
        style={{ padding: 8 }}
        mode="inline"
        defaultSelectedKeys={["-1"]}
        items={formatuseCollectionToMenuItems()}
    />)
}