import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const {userSignOut} = useAuth()
    const navigate = useNavigate()
    axiosSecure.interceptors.response.use( res  => {
        return res
    },
    async error => {
        console.error('interceptor error', error.response);
        if (error.response.status === 401 || error.response.status === 403) {
            userSignOut()
            navigate("/login")
        }
        
        return Promise.reject(error)
    }
    )
    
    
    
    return axiosSecure
}