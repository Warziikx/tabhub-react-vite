import { API_ROUTES } from "@/utils/constant";
import { AuthToken, LoginProps, RegisterProps } from "@/utils/interfaces/Auth";
import axios from 'axios';


export async function login(objCredential: LoginProps): Promise<AuthToken> {
    const reponse = await axios.post(`${API_ROUTES.LOG_IN}`, objCredential)
    return reponse.data.data;
}

export async function register(objCredential: RegisterProps): Promise<void> {
    const reponse = await axios.post(`${API_ROUTES.REGISTER}`, objCredential);
    return reponse.data.data;
}