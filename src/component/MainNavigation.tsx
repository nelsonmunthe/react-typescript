import { Form, NavLink, redirect, useNavigate } from "react-router-dom";
import { getToken } from "./helpers/token";

const MainNavigation:React.FC = () => {
    const auth:any = getToken('accessToken');

    return(
        <nav className="flex justify-evenly text-sm mb-4 bg-amber-400 h-14 rounded-md  md:justify-end items-center md:text-lg md:p-10 xl:px-20 xl:text-lg">
            <NavLink 
                className="rounded-lg px-3 text-slate-700 text-sm md:font-medium xl:text-lg" 
                key={'home'} 
                to={'/'}
                style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                    };
                }}
                end
            >
                Home
            </NavLink>
            <NavLink 
                className="rounded-lg px-3 text-slate-700 text-sm md:font-medium xl:text-lg" 
                key={'journal-entry'} 
                to={'/journal-entry'}
                style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                    };
                }}
            >
                    Journal Entry
            </NavLink>
            <NavLink 
                className="rounded-lg px-3 text-slate-700 text-sm md:font-medium xl:text-lg" 
                key={'bon-sementara'} 
                to={'/bon-sementara'}
                style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                    };
                }}
            >
                    Bon Sementara
            </NavLink>
            <NavLink 
                className="rounded-lg px-3 text-slate-700 text-sm md:font-medium xl:text-lg" 
                key={'realisasi'} 
                to={'/realisasi'}
                style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                    };
                }}
            >
                    Realisasi
            </NavLink>
            {
                auth && <Form method="post" action="/logout">
                    <button>Logout</button>
                 </Form>
            }
            {
                !auth && <NavLink 
                    className="rounded-lg px-3 text-slate-700 text-sm md:font-medium xl:text-lg" 
                    key={'login'} 
                    to={'/login'}
                >
                        Login
                </NavLink>
            }
    </nav>
    )
};

export default MainNavigation;


