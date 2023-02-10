import { API_ROUTES } from "@/utils/constant";
import { AuthToken, LoginProps } from "@/utils/interfaces/Auth";
import axios from 'axios';


export async function login(objCredential: LoginProps): Promise<AuthToken> {
    const reponse = await axios.post(`${API_ROUTES.LOG_IN}`, objCredential)
    return reponse.data.data;
}