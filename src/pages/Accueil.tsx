import { Col, Input, Row } from "antd"
import { useEffect, useState } from "react";

import { useCollection } from "@/lib/hooks/collectionHook";
import useCollectionContext from "@/lib/context/CollectionContext";
import { BookmarkList } from "@/components/bookmark/BookmarkList";

export const Accueil: React.FC = () => {
    const { collection } = useCollectionContext();
    const { getCollectionByType } = useCollection();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        if (!isMounted) {
            getCollectionByType("HOME");
            setIsMounted(true);
        }
    }, [isMounted, setIsMounted, getCollectionByType]);




    return (
        <Row>
            <Col xs={{ span: 18, offset: 3 }} md={{ span: 14, offset: 5 }} lg={{ span: 10, offset: 7 }} xl={{ span: 6, offset: 9 }}>
                <Input.Search placeholder="Rechercher sur le web"
                    size='large' onSearch={(input) => {
                        let searchValue = input.replace(/\s/g, '+');
                        window.open(`https://www.google.fr/search?q=${searchValue}`, '_self')
                    }}
                    style={{ width: 400 }} />
            </Col>
            <Col span={24}>
                {collection && <BookmarkList collection={collection} bookmarks={collection.bookmarks} />}
            </Col>
        </Row>
    )
}