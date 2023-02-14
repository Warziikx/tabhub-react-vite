import { Collection } from "@/utils/interfaces/Collection";
import { useState, useEffect } from "react";
import * as collectionService from "@/lib/services/collectionService";


import useCollectionContext from "@/lib/context/CollectionContext";


export function useCollection() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { collectionList, setCollectionList, collection, setCollection } = useCollectionContext();

	const getCollectionList = () => {
		setIsLoading(true);
		collectionService
			.getCollectionList()
			.then((collections) => setCollectionList(collections))
			.catch((_error) => { })
			.finally(() => setIsLoading(false));
	};


	const getCollection = (collectionId: number) => {
		setIsLoading(true);
		collectionService
			.getCollection(collectionId)
			.then((collections) => setCollection(collections))
			.catch((_error) => { })
			.finally(() => setIsLoading(false));
	};

	const getCollectionByType = (collectionType: string) => {
		setIsLoading(true);
		collectionService
			.getCollectionByType(collectionType)
			.then((collections) => setCollection(collections))
			.catch((_error) => { })
			.finally(() => setIsLoading(false));
	};

	const createCollection = (collectionData: Collection) => {
		setIsLoading(true);
		collectionService
			.createCollection(collectionData)
			.then((collection) => setCollectionList([...collectionList, collection]))
			.catch((_error) => { })
			.finally(() => setIsLoading(false));
	};

	const updateCollection = (collectionData: Collection) => {
		setIsLoading(true);
		const collectionId = collectionData.id;
		collectionService
			.updateCollection(collectionId, collectionData)
			.then((newCollection) => {
				let updatedCollection = collectionList.map((collection: Collection) => {
					if (collection.id == newCollection.id) return newCollection;
					else return collection;
				});
				setCollectionList(updatedCollection);
				return;
			})
			.catch((_error) => { })
			.finally(() => setIsLoading(true));
	};

	const deleteCollection = (collectionId: number) => {
		setIsLoading(true);
		collectionService
			.deleteCollection(collectionId)
			.then((collections) => setCollectionList(collectionList.filter((collection: Collection) => collection.id !== collectionId)))
			.catch((_error) => { })
			.finally(() => setIsLoading(false));
	};

	return { collectionList, getCollectionList, collection, getCollection, getCollectionByType, deleteCollection, createCollection, updateCollection, isLoading };
}
