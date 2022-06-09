import axios from "axios";

export const createUser = async (user: any) => {
    const { name, password } = user
    let url = `http://localhost:3001/api/auth/user/register`;
    return await axios.post(url, { name, password})
}