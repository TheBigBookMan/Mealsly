import { useState } from "react";
import Input from "../components/common/ui/Input";
import Button from "../components/common/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useUser } from "../contexts/userContext/useUser";

interface LoginInterface {
    setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({setLoginModal}: LoginInterface) => {
    const {loginWithEmail, loginFacebook, loginGoogle} = useUser();

    const [isError, setIsError] = useState<string | null>(null);
    const [loginDetails, setLoginDetails] = useState<LoginWithEmailDetails>({
        email: "",
        password: "",
    });

    const loginFunc = async (type: string): Promise<void> => {
        try {
            if (type === 'email') {
                const { email, password } = loginDetails;

                if(email === '' || password === '') {
                    setIsError('Please add in your credentials.');
                    return;
                }

                await loginWithEmail({ email, password });
            } else if (type === 'google') {
                await loginGoogle();
            } else if (type === 'facebook') {
                await loginFacebook();
            }
    
            setLoginModal(false);
    
        } catch (err: any) {
            console.error("Login error:", err.message);
            setIsError('Could not login.');
        }
    }

    return (
        <div className="flex flex-col h-fit w-full items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2">
                <div className='flex flex-col items-center gap-2'>
                    <h1 className="text-3xl font-bold text-center text-gray-900">Mealsly</h1>

                    {isError && <p className="bg-red-600 text-white text-sm px-4 py-2 rounded-xl shadow-md animate-shake">{isError}</p>}
                    
                </div>

                <div className="space-y-4">
                    <Input
                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && loginFunc('email')}
                        type="email"
                        label="Email"
                        value={loginDetails.email}
                        onChange={(e) =>
                        setLoginDetails({ ...loginDetails, email: e.target.value })
                        }
                    />
                    <Input
                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && loginFunc('email')}
                        type="password"
                        label="Password"
                        value={loginDetails.password}
                        onChange={(e) =>
                        setLoginDetails({ ...loginDetails, password: e.target.value })
                        }
                    />

                    <Button onClick={() => loginFunc('email')} className="w-full py-3 rounded-xl font-semibold" variant="info">
                        Login
                    </Button>
                </div>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">or continue with</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button onClick={() => loginFunc('google')} className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition font-medium text-gray-800">
                        <FcGoogle size={20} />
                        Sign in with Google
                    </button>

                    <button onClick={() => loginFunc('facebook')} className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium text-white">
                        <FaFacebook size={20} />
                        Sign in with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;