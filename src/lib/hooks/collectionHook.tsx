import { Collection } from "@/utils/interfaces/Collection";
import { useState, useEffect } from "react";
import * as collectionService from "@/lib/services/collectionService";

export function useCollection() {
	const [collectionList, setCollectionList] = useState<Collection[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getCollectionList = () => {
		setIsLoading(true);
		collectionService
			.getCollectionList()
			.then((collections) => setCollectionList(collections))
			.catch((_error) => {})
			.finally(() => setIsLoading(false));
	};

	const createCollection = (collectionData: Collection) => {
		setIsLoading(true);
		collectionService
			.createCollection(collectionData)
			.then((collection) => setCollectionList([...collectionList, collectionData]))
			.catch((_error) => {})
			.finally(() => setIsLoading(false));
	};

	const updateCollection = (collectionData: Collection) => {
		setIsLoading(true);
		const collectionId = collectionData.id;
		collectionService
			.updateCollection(collectionId, collectionData)
			.then((collection) => {
				let updatedCollection = collectionList.map((collection: Collection) => {
					if (collection.id == collectionData.id) return collectionData;
					else return collection;
				});
				setCollectionList(updatedCollection);
				return;
			})
			.catch((_error) => {})
			.finally(() => setIsLoading(true));
	};

	const deleteCollection = (collectionId: number) => {
		setIsLoading(true);
		collectionService
			.deleteCollection(collectionId)
			.then((collections) => setCollectionList(collectionList.filter((collection: Collection) => collection.id !== collectionId)))
			.catch((_error) => {})
			.finally(() => setIsLoading(false));
	};

	return { collectionList, getCollectionList, deleteCollection, createCollection, updateCollection, isLoading };
}
