import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [user, setUser] = useState<string>("");

    useEffect(() => {
        (async () => {
            const URL = `http://localhost:4000/me`
            const response = await fetch(URL, {
                method: "GET",
                credentials: "include",
            });
            
            const data = await response.json();
            console.log(data.loggedIn, data.user.username)
            setUser(data.user.username)
        })()
    },[])

    return(
    <>
        <h1>Hello im home.</h1>
        <Link to="/login" 
        className="mr-4"
        onClick={async () => {
            if(!user) return;

            
        }}
        >{user ? "Logout" : "Login"}</Link> 
        <p>Welcome {user}</p>
    </>
    )
}

export default Home;