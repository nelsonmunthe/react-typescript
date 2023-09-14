import { Form, json, redirect, useActionData, Await } from "react-router-dom";
import logo from '../images/satria.jpg'
import axios from "axios";
import { setToken } from "../component/helpers/token";

const { REACT_APP_API_URL } = process.env
const Login:React.FC = () => {

    const errors: any = useActionData();
    
    return(
        <div className="flex h-screen justify-center items-center lg:pb-40 ">
            <div className="mx-auto w-11/12 shadow-sm shadow-slate-500 border-dotted border-4 p-2 md:p-20 md:shadow-xl md:w-8/12 xl:w-4/12">
                <Form method="POST">
                    <div className="flex flex-col w-full gap-2 md:gap-4">
                        <div className="flex justify-center items-center">
                            <img src={logo} alt="logo" height={80}/>
                        </div>
                        <Await resolve={errors} errorElement={<p className="text-red-500">Error</p>}>
                            {(action) => <span className="text-red-500 font-semibold">{action?.errorMessage}</span> }
                        </Await>
                        {errors?.username ?  <span className="text-red-500">{errors.username}</span> : <label htmlFor="username" className="block">Username</label>}
                        <input
                            className="block w-full bg-gray-100 h-10 pl-2 rounded-md" 
                            placeholder="username" 
                            type="text"
                            id="username" 
                            name="username"
                            required
                            defaultValue={''}
                            >

                        </input>
                        {errors?.username ? <span className="text-red-500">{errors.username}</span> : <label htmlFor="password" className="block">Password</label>}
                        <input
                            className="block w-full bg-gray-100 h-10 pl-2 rounded-md" 
                            placeholder="password" 
                            type="password"
                            id="password" 
                            name="password"
                            required 
                            defaultValue={''}
                            >
                        </input>
                        <div className="flex justify-end gap-4 w-full">
                            <button className="bg-amber-400 h-10 w-24 rounded-md  hover:bg-amber-200">Cancel</button>
                            <button 
                                type="submit" 
                                className="bg-amber-400 h-10 w-24 rounded-md hover:bg-amber-200"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        
    )
};

export default Login;


export const action = async ({ request }: { request: Request }) => {
    const errors:any = {};
    try {
        const data = await request.formData();

        const body = {
            username: data.get('username'),
            password: data.get('password')
        };

        // validate the fields
        if (body.username === '' ) errors.username = "Invalid Username";
        if (body.password === '') errors.password = "Invalid Password";
        
        if (Object.keys(errors).length) return errors;

        const response = await axios.post(`${REACT_APP_API_URL}/v1/api/user-header/login`, body);
        if(response.status === 200){
            console.log(response.data.data)
            setToken(response.data.data)
            return redirect('/');
        } else {
            throw json({ message: 'Could not authenticate user.' }, { status: 404 });
        }
        
    } catch (error: any) {
        return {
            errorMessage: error.response.data.message
        }
    }
}