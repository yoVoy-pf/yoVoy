import axios from "axios";

let url = `http://localhost:3001/api/auth/user/login`;

const login =  async (user: any) => {
    const { name, password } = user;
    const {data}  = await axios.post(url, { name, password })
    return data
} 

export default { login }