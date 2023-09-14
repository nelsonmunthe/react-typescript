import axios from "axios";
import { getToken, removeToken } from "./token";
import { redirect } from "react-router-dom";
const { REACT_APP_API_URL } = process.env
// import { memoizedRefreshToken } from "./refreshToken";
const memoizedRefreshToken = ''

// axios.defaults.baseURL = "http://localhost:3333/api";

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
    console.log('response interceptors')
    if (error?.response?.status === 401 && !config?.sent) {
      localStorage.removeItem('accessToken')
      config.sent = true;

      try {
        const response = await axios(`${REACT_APP_API_URL}/v1/api/user-header/refresh-token`, {
          headers: {
            Authorization: `Bearer ${getToken('refreshToken')}`
          }
        });
        console.log('response', response)
        if(response.status === 200){
          localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken))
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${response.data.data.accessToken}`,
          };
      } else {
         
      }
      } catch (error: any) {
        removeToken()
        return redirect('/login')
      }

      // const result = {
      //   accessToken : ''
      // }
      
      // if (result?.accessToken) {
      //   localStorage.setItem('accessToken', JSON.stringify(result.accessToken))
      //   console.log(result.accessToken)
      //   config.headers = {
      //     ...config.headers,
      //     authorization: `Bearer ${result?.accessToken}`,
      //   };
      // }

      return axios(config);
    }
    return Promise.reject(error);
  }
);



export const axiosPrivate = axios;