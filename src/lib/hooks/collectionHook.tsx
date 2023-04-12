import { Collection } from "@/utils/interfaces/Collection";
import { useState, useEffect } from "react";
import * as collectionService from "@/lib/services/collectionService";

import useCollectionContext from "@/lib/context/CollectionContext";
import useTabhubContext from "@/lib/context/TabhubContext";

export function useCollection() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { collectionList, setCollectionList, collection, setCollection } =
		useCollectionContext();
	const { setError } = useTabhubContext();

	const getCollectionList = () => {
		setIsLoading(true);
		collectionService
			.getCollectionList()
			.then((collections) => setCollectionList(collections))
			.catch((_error) => { })
			.finally(() => { setIsLoading(false) });
	};

	const getCollection = (collectionId: number) => {
		setIsLoading(true);
		collectionService
			.getCollection(collectionId)
			.then((collections) => setCollection(collections))
			.catch((_error) => {
				setError(_error);
			})
			.finally(() => { setIsLoading(false) });
	};

	const getCollectionByType = (collectionType: string) => {
		setIsLoading(true);
		collectionService
			.getCollectionByType(collectionType)
			.then((collections) => setCollection(collections))
			.catch((_error) => { })
			.finally(() => setIsLoading(false));
	};

	const createCollection = async (
		collectionData: Collection
	): Promise<Collection | undefined> => {
		try {
			setIsLoading(true);
			let collection = await collectionService.createCollection(collectionData);
			if (!collectionData.parentId)
				setCollectionList([...collectionList, collection]);
			setIsLoading(false);
			return collection;
		} catch (err) {
			setIsLoading(false);
			console.log(err);
		}
	};

	const updateCollection = async (
		collectionData: Collection
	): Promise<Collection | undefined> => {
		try {
			setIsLoading(true);
			const collectionId = collectionData.id;
			let newCollection = await collectionService.updateCollection(
				collectionId,
				collectionData
			);
			let updatedCollection = collectionList.map((collection: Collection) => {
				if (collection.id == newCollection.id) return newCollection;
				else return collection;
			});
			setCollectionList(updatedCollection);
			setIsLoading(false);
			return newCollection;
		} catch (err) {
			setIsLoading(false);
			console.log(err);
		}
	};

	const deleteCollection = (collectionId: number) => {
		setIsLoading(true);
		collectionService
			.deleteCollection(collectionId)
			.then((collections) =>
				setCollectionList(
					collectionList.filter(
						(collection: Collection) => collection.id !== collectionId
					)
				)
			)
			.catch((_error) => { })
			.finally(() => setIsLoading(false));
	};

	return {
		collectionList,
		getCollectionList,
		collection,
		getCollection,
		getCollectionByType,
		deleteCollection,
		createCollection,
		updateCollection,
		isLoading,
	};
}
