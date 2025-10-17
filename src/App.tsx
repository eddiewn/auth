import Login from "./Components/Login";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
