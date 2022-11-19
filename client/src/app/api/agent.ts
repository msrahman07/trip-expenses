import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { toast } from "react-toastify";
import { ITrip } from "../models/trip";
import { IUser } from "../models/user";
import { userToken } from "../stores/userStore";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if(userToken) {
        config.headers!.Authorization = `Bearer ${userToken}`;
    }
    return config;
});

axios.interceptors.response.use(async (response) => {
    return response;
}, (error: AxiosError) => {
    const {data, status, config}:{data:any, status:any, config:any} = error.response!;
    switch(status) {
        case 400:
            if(typeof data === 'string') {
                toast.error(data)
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                    throw modalStateErrors.flat();
                }
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            toast.error('not found');
            break;
        case 500:
            // store.commonStore.setServerError(data)
            // history.push('server-error');
            // break;
    }
    return Promise.reject(error);
})

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
    logout: () => requests.post('/account/logout', {}),
};

const agent = {
    Trips, 
    Users
};
export default agent