import { API_ROUTES } from "@/utils/constant";
import { Collection } from "@/utils/interfaces/Collection";
import axios from "axios";

export async function getCollectionList(): Promise<Collection[]> {
	const reponse = await axios.get(`${API_ROUTES.COLLECTION_LIST}`);
	return reponse.data.data;
}

export async function getCollection(collectionId: number): Promise<Collection> {
	const reponse = await axios.get(`${API_ROUTES.COLLECTION_SINGLE}/${collectionId}`);
	return reponse.data.data;
}

export async function createCollection(collectionData: Collection): Promise<Collection> {
	const reponse = await axios.post(`${API_ROUTES.COLLECTION_CREATE}`, collectionData);
	return reponse.data.data;
}

export async function updateCollection(collectionId: number, collectionData: Collection): Promise<Collection> {
	/* On remove l'ID */
	const reponse = await axios.put(`${API_ROUTES.COLLECTION_UPDATE}/${collectionId}`, { name: collectionData.name });
	return reponse.data.data;
}

export async function deleteCollection(collectionId: number): Promise<Collection> {
	const reponse = await axios.delete(`${API_ROUTES.COLLECTION_DELETE}/${collectionId}`);
	return reponse.data.data;
}
