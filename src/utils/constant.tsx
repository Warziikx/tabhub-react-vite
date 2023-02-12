const API_URL = import.meta.env.VITE_API_URL;
export const API_ROUTES = {
	LOG_IN: `${API_URL}/auth/login`,
	SIGN_IN: `${API_URL}/auth/signin`,
	GET_ME: `${API_URL}/user/me`,
	COLLECTION_LIST: `${API_URL}/collection`,
	COLLECTION_CREATE: `${API_URL}/collection`,
	COLLECTION_DELETE: `${API_URL}/collection`,

	BOOKMARK_CREATE: `${API_URL}/bookmark`,
};

export const APP_ROUTES = {
	LOG_IN: "/auth/login",
	REGISTER: "/auth/register",
	HOME: "/",
};
