import { useState } from "react"

type Props = {
    setFormState: (formState: boolean) => void;
    formState: boolean;
}

const RegisterForm = ({setFormState, formState}: Props) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const validateUser = async () => {
        try {
            const url = "http://localhost:4000/users"
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, password: password })
            });
        } catch (error) {
            console.log("Error validating user:", error)
        }
    }

    return(
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Login
                    </h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your username"
                            required
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <label 
                            className="block text-gray-700 mb-2"
                            >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => {
                            setFormState(!formState);
                        }}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                        onClick={() => {
                            if(password !== confirmPassword) return

                            validateUser();

                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
    )
}

export default RegisterForm;