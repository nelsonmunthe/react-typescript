import React, { useEffect } from "react"
import { Outlet, redirect, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../component/MainNavigation";
import { getToken, getTokenDuration } from "../component/helpers/token";

const RootLayout:React.FC = () => {
    const token = useLoaderData();
    const submit = useSubmit()
    useEffect(() => {
        if (!token) {
            return;
          }
      
          if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post' });
            return;
          }
      
          const tokenDuration = getTokenDuration();
          console.log(tokenDuration);
      
          setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' });
          }, tokenDuration);
    }, [token, submit])

    return(
        <div>
            <MainNavigation />
            <div className="w-full px-4 lg:px-20">
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout;


export const  action = () => {
 const token = getToken('accessToken');
 if(!token) return null;
 return token;
}