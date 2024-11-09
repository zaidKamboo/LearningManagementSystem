import { useMemo } from 'react';
import LandingPage from "./landing_page";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
const AllRoutes = () => {
    const routes = useMemo(() => [
        { path: "/", element: <LandingPage /> },
        { path: "/home", element: <LandingPage /> },
        { path: "/login", element: <Login /> },
    ], []);
    return (
        <Router>
            <Routes>
                {routes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)}
            </Routes>
        </Router>
    )
}

export default AllRoutes;