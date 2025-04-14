import { useState } from "react";
import Input from "../components/common/ui/Input";
import Button from "../components/common/ui/Button";

interface LoginDetails {
    email: string;
    password: string;
}

const Login = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        email: '',
        password: ''
    })

    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <div className='flex flex-col gap-4 border rounded-xl shadow-md p-8 w-[400px] h-[400px]'>
                <p className='text-3xl font-bold text-black'>Mealsly</p>

                <div className='flex flex-col gap-2 w-full p-4 border-b'>
                    <Input type="text" value={loginDetails.email} onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value})} />
                    <Input type="password" value={loginDetails.password} onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})} />

                    <Button className='min-w-[200px]' variant="info">
                        <p>Login</p>
                    </Button>
                </div>

                <div className='flex flex-col gap-4'>
                    <Button>
                        <p>Sign in with Google</p>
                    </Button>

                    <Button >
                        <p>Sign in with Facebook</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login;