type Props = {
    setFormState: (formState: boolean) => void;
    formState: boolean;
}

const LoginForm = ({setFormState, formState}: Props) => {
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
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                        onClick={() => {
                            setFormState(!formState)
                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
    )
}

export default LoginForm;