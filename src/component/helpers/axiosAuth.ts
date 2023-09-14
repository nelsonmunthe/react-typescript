import axios from "axios";
import { getToken, removeToken } from "./token";
import { redirect } from "react-router-dom";
const { REACT_APP_API_URL } = process.env

axios.interceptors.request.use(
  async (config: any) => {
    const accessToken = getToken('accessToken');
    
    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }
    console.log('interceptors', config)
    return config;
  },
  (error) => {
    Promise.reject(error)
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    
    if (error?.response?.status === 401 && !config?.sent) {
      localStorage.removeItem('accessToken')
      config.sent = true;

      try {
        const response = await axios(`${REACT_APP_API_URL}/v1/api/user-header/refresh-token`, {
          headers: {
            Authorization: `Bearer ${getToken('refreshToken')}`
          }
        });
        
        if(response.status === 200){
          localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken))
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${response.data.data.accessToken}`,
          };
      } else {
        // console.log('else error response interceptors')
        // // window.location.href = '/login';
        // removeToken()
        // redirect('/login')
      }
      } catch (error: any) {
        // console.log('error response interceptors')
        // // window.location.href = '/login'
        // removeToken()
        // return redirect('/login')
      }
      return axios(config);
    }
    return Promise.reject(error);
  }
);



export const axiosPrivate = axios;