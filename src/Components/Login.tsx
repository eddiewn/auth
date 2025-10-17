import {useState} from "react";

import LoginForm from "./AuthForms/LoginForm";
import RegisterForm from "./AuthForms/RegisterForm";

const Login = () => {
    const [formState, setFormState] = useState<boolean>(true);
    if (formState) {
        return <LoginForm setFormState={setFormState} formState={formState}/>;
    } else {
        return <RegisterForm setFormState={setFormState} formState={formState}/>;
    }
};

export default Login;
