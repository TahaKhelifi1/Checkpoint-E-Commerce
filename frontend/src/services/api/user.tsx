import axios from "axios";

const API : any = axios.create({baseURL : "http://localhost:5000/api/user"})


export const login = (username : string, password: string) => API.post('/login', {username, password})
