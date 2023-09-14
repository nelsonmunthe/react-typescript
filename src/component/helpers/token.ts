import { redirect } from "react-router-dom";

const setToken = (auth: any) => {
    localStorage.setItem('accessToken', JSON.stringify(auth.accessToken))
    localStorage.setItem('refreshToken', JSON.stringify(auth.refreshToken))
    localStorage.setItem('controllers', JSON.stringify(auth.controllers))
    localStorage.setItem('role', JSON.stringify(auth.role))
    localStorage.setItem('role_id', JSON.stringify(auth.role_id))
    localStorage.setItem('subsidiarys', JSON.stringify(auth.subsidiarys))
    localStorage.setItem('user_id', JSON.stringify(auth.user_id))
    localStorage.setItem('username', JSON.stringify(auth.username))
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiresIn', JSON.stringify(expiration.toISOString()) );
};

const getTokenDuration = () => {
    const expiresIn: any = localStorage.getItem('expiresIn');
    const tokenDuration = JSON.parse(expiresIn)
    const expirationDate = new Date(tokenDuration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

const getToken = (authName: string) => {
    const auth:any = localStorage.getItem(authName);

    // const tokenDuration = getTokenDuration()
    // console.log('tokenDuration', tokenDuration)
    
    // if (tokenDuration <= 0) {
    //   return 'EXPIRED';
    // }

    return JSON.parse(auth);
};

const removeToken = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('controllers')
    localStorage.removeItem('role')
    localStorage.removeItem('role_id')
    localStorage.removeItem('subsidiarys')
    localStorage.removeItem('user_id')
    localStorage.removeItem('username')
    localStorage.removeItem('expiresIn')
};

const actionLogout = () => {
    removeToken();
    return redirect('/login')
}

export {
    setToken,
    getToken,
    removeToken,
    actionLogout,
    getTokenDuration
}