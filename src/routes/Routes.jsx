import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                index: true,
                element: <Home></Home>
            }
        ]
    }
])

export default Routes;