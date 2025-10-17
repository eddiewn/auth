import { Link } from "react-router-dom";

const Home = () => {
    return(
    <>
        <h1>Hello im home.</h1>
        <Link to="/login" className="mr-4">Login</Link>    </>
    )
}

export default Home;