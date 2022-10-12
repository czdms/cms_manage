import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from "../App";
import List from "../pages/List";
import Means from "../pages/Means";
import Edit from "../pages/Edit";
import Login from "../pages/Login";
import Register from "../pages/Register";

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/list" element={<List />}></Route>
                <Route path="/means" element={<Means />}></Route>
                <Route path="/edit" element={<Edit />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    </Router>
)

export default BaseRouter