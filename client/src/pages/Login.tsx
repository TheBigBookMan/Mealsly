import { useState } from "react";
import Input from "../components/common/ui/Input";
import Button from "../components/common/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useUser } from "../contexts/UserContext";

const Login = () => {
    const {loginWithEmail, loginFacebook, loginGoogle} = useUser();

    const [loginDetails, setLoginDetails] = useState<LoginWithEmailDetails>({
        email: "",
        password: "",
    });

    const submitLoginEmailDetails = () => {
        console.log("submit login");
        console.log(loginDetails);
        const {email, password} = loginDetails;

        loginWithEmail({email, password});
    }

    return (
        <div className="flex flex-col h-fit w-full items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-900">Mealsly</h1>

                <div className="space-y-4">
                    <Input
                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submitLoginEmailDetails()}
                        type="email"
                        label="Email"
                        value={loginDetails.email}
                        onChange={(e) =>
                        setLoginDetails({ ...loginDetails, email: e.target.value })
                        }
                    />
                    <Input
                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submitLoginEmailDetails()}
                        type="password"
                        label="Password"
                        value={loginDetails.password}
                        onChange={(e) =>
                        setLoginDetails({ ...loginDetails, password: e.target.value })
                        }
                    />

                    <Button onClick={submitLoginEmailDetails} className="w-full py-3 rounded-xl font-semibold" variant="info">
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
                    <button onClick={loginGoogle} className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition font-medium text-gray-800">
                        <FcGoogle size={20} />
                        Sign in with Google
                    </button>

                    <button onClick={loginFacebook} className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium text-white">
                        <FaFacebook size={20} />
                        Sign in with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;