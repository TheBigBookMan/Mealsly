import { useState } from "react";
import Input from "../components/common/ui/Input";
import Button from "../components/common/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface LoginDetails {
    email: string;
    password: string;
}

const Login = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        email: "",
        password: "",
    });

    return (
        <div className="flex flex-col h-fit w-full items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-900">Mealsly</h1>

                <div className="space-y-4">
                    <Input
                        type="email"
                        label="Email"
                        value={loginDetails.email}
                        onChange={(e) =>
                        setLoginDetails({ ...loginDetails, email: e.target.value })
                        }
                    />
                    <Input
                        type="password"
                        label="Password"
                        value={loginDetails.password}
                        onChange={(e) =>
                        setLoginDetails({ ...loginDetails, password: e.target.value })
                        }
                    />

                    <Button className="w-full py-3 rounded-xl font-semibold" variant="info">
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
                    <button className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition font-medium text-gray-800">
                        <FcGoogle size={20} />
                        Sign in with Google
                    </button>

                    <button className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium text-white">
                        <FaFacebook size={20} />
                        Sign in with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;