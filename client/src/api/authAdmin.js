import axios from './axios'

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/loginadmin`, user)

export const logoutRequest = () => axios.post(`/logoutadmin`)

export const verifyTokenRequest = () => axios.get('/verifyadmin')