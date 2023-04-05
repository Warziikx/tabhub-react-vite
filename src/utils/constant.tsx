const API_URL = import.meta.env.VITE_API_URL;


export const HOME_PAGE_KEY = 'HOME'
export const API_ROUTES = {
	LOG_IN: `${API_URL}/auth/login`,
	REGISTER: `${API_URL}/auth/register`,
	SIGN_IN: `${API_URL}/auth/signin`,
	GET_ME: `${API_URL}/user/me`,
	COLLECTION_LIST: `${API_URL}/collection`,
	COLLECTION_SINGLE: `${API_URL}/collection`,
	COLLECTION_SINGLE_BY_TYPE: `${API_URL}/collection/type`,
	COLLECTION_CREATE: `${API_URL}/collection`,
	COLLECTION_UPDATE: `${API_URL}/collection`,
	COLLECTION_DELETE: `${API_URL}/collection`,

	BOOKMARK_CREATE: `${API_URL}/bookmark`,
	BOOKMARK_UPDATE: `${API_URL}/bookmark`,
	BOOKMARK_DELETE: `${API_URL}/bookmark`,
};

export const APP_ROUTES = {
	LOG_IN: "/auth/login",
	REGISTER: "/auth/register",
	HOME: "/",
	COLLECTION: "/collection/"
};
