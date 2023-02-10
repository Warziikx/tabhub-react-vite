import { API_ROUTES } from "@/utils/constant";
import { User } from "@/utils/interfaces/User";
import axios from 'axios';


export async function getMe(): Promise<User> {
    const reponse = await axios.get(`${API_ROUTES.GET_ME}`)
    return reponse.data.data;
}