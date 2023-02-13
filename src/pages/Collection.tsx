import { useEffect, useState } from "react";
import { List, Typography } from "antd";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";


import { useCollection } from "@/lib/hooks/collectionHook";
import { useBookmark } from "@/lib/hooks/bookmarkHook";
import { APP_ROUTES } from "@/utils/constant";
import { BookmarkList } from "@/components/bookmark/BookmarkList";
import { BookmarkDrawerForm } from "@/components/bookmark/BookmarkDrawerForm";


export const Collection: React.FC = () => {
    const navigate = useNavigate();
    const { collection, getCollection } = useCollection();
    const { mustReloadCollection } = useBookmark();

    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [localCollectionId, setLocalCollectionId] = useState<number | null>(null);


    let { collectionId } = useParams();


    useEffect(() => {
        if (collectionId != null) {
            let numberCollectionId = parseInt(collectionId);
            if (numberCollectionId != localCollectionId) {
                getCollection(numberCollectionId);
                setLocalCollectionId(numberCollectionId)
            }
        }
    }, [getCollection, collectionId]);

    useEffect(() => {
        if (mustReloadCollection && collectionId != null) {
            let numberCollectionId = parseInt(collectionId);
            if (numberCollectionId != localCollectionId) {
                getCollection(numberCollectionId);
                setLocalCollectionId(numberCollectionId)
            }
        }
    }, [mustReloadCollection])



    useEffect(() => {
        if (!isMounted) {
            if (collectionId != null) {
                let numberCollectionId = parseInt(collectionId);
                getCollection(numberCollectionId);
                setLocalCollectionId(numberCollectionId)
            } else {
                navigate(APP_ROUTES.HOME)
            }
            setIsMounted(true);
        }
    }, [isMounted, setIsMounted, getCollection, collectionId]);

    return (
        <div>
            {collection && <BookmarkList collection={collection} bookmarks={collection.bookmarks} />}
            <BookmarkDrawerForm />
        </div>
    )
}