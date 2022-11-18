import axios, { AxiosResponse } from "axios"
import { ITrip } from "../models/trip";
import { IUser } from "../models/user";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete(url).then(responseBody),
};

const Trips = {
    list: () => requests.get<ITrip[]>('/trips'),
    details: (id: number) => requests.get<ITrip>(`/trips/${id}`),
    create: (trip: ITrip) => requests.post<ITrip>(`/trips`, trip),
    delete: (id: number) => requests.delete<void>(`/trips/${id}`),
};
const Users = {
    current: () => requests.get<IUser>('/account'),
    login: (user: IUser) => requests.post<IUser>(`/account/login`, user),
    register: (user: IUser) => requests.post<IUser>(`/account/register`, user),
};

const agent = {
    Trips, 
    Users
};
export default agent