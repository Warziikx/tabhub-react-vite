import { Collection } from '@/utils/interfaces/Collection';
import { useState, useEffect } from 'react';
import * as collectionService from '@/lib/services/collectionService'

export function useCollection() {
    const [collectionList, setCollectionList] = useState<Collection[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const getCollectionList = () => {
        setIsLoading(true)
        collectionService.getCollectionList()
            .then((collections) => setCollectionList(collections))
            .catch((_error) => { })
            .finally(() => setIsLoading(false));
    }

    const deleteCollection = (collectionId: number) => {
        setIsLoading(true)
        collectionService.deleteCollection(collectionId)
            .then((collections) => setCollectionList(collectionList.filter((collection: Collection) => collection.id !== collectionId)))
            .catch((_error) => { })
            .finally(() => setIsLoading(false));
    }



    return { collectionList, isLoading, getCollectionList, deleteCollection };
}
