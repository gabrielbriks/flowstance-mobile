import axios from 'axios'

export const api = axios.create({
 baseURL: 'https://flowstance-production.up.railway.app/'
 //'http://10.0.2.2:3333' //'http://localhost:3333'
})