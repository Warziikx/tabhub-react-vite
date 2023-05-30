import { Col, Input, Row } from "antd"
import { useEffect, useState } from "react";

import { useCollection } from "@/lib/hooks/collectionHook";
import useCollectionContext from "@/lib/context/CollectionContext";
import { BookmarkList } from "@/components/bookmark/BookmarkList";
import { BookmarkDrawerForm } from "@/components/bookmark/form/BookmarkDrawerForm";

export const Trash: React.FC = () => {
    const { collection } = useCollectionContext();
    const { getCollectionByType, isLoading } = useCollection();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        if (!isMounted) {
            getCollectionByType("TRASH");
            setIsMounted(true);
        }
    }, [isMounted, setIsMounted, getCollectionByType]);




    return (
        <Row>
            <Col span={24}>
                {collection && <BookmarkList collection={collection} bookmarks={collection.bookmarks} isLoading={isLoading} />}
            </Col>
            <BookmarkDrawerForm />
        </Row>
    )
}