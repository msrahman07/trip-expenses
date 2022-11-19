import { AxiosRequestConfig } from "axios";

const onRequest = (config: AxiosRequestConfig) : AxiosRequestConfig => {
    return config;
}