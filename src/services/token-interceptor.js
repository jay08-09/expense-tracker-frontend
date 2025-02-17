import axios from "axios";
import { environment } from './../environment/environment'

const instance = axios.create({
    baseURL: environment.baseurl,
    timeout: 10000 // Set a timeout of 10 seconds
})

const pendingRequests = new Map();

instance.interceptors.request.use(
    async config => {
        const authToken = localStorage.getItem("authToken");
        if (authToken && authToken !== undefined) {
            config.params = config.params || {};
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        const controller = new AbortController()
        config.signal = controller.signal
        if (pendingRequests.has(config.url)) {
            pendingRequests.get(config.url).abort()
        }
        pendingRequests.set(config.url, controller);

        return config;
    },
    error => Promise.reject(error)
)

let isRefreshing = false;
let requestsQueue = [];

const processQueue = (error, token = null) => {
    requestsQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    requestsQueue = [];
}

instance.interceptors.response.use(
    response => {
        pendingRequests.delete(response.config.url); // Remove completed request from the map
        return response;
    },

    async error => {
        const originalRequest = error.config;
        pendingRequests.delete(originalRequest.url); // Remove completed request from the

        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                const refreshToken = localStorage.getItem('refreshToken')
            } else {
                return new Promise((resolve, reject) => {
                    requestsQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`
                        return instance(originalRequest)
                    })
                    .catch(err => {
                        Promise.reject(err)
                    })
            }
        } else if (error.response?.status === 403 && environment.production) {
            // window.location.href = '/unauthorized';
        } else if (error?.message === 'Network Error' && environment.production) {
            // window.location.href = '/network-error';
        }

        return Promise.reject(error);
    }
)

export default instance;