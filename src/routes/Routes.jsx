import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";
import CreateAssignmentForm from "../pages/CreateAssignmentForm/CreateAssignmentForm";
import AllAssignments from "../pages/AllAssignments/AllAssignments";
import AssignmentDetails from "../pages/AssignmentDetails/AssignmentDetails";
import AddedAssignments from "../pages/AddedAssignments/AddedAssignments";
import SubmittedAssignments from "../pages/SubmittedAssignments/SubmittedAssignments";
import CheckPage from "../pages/CheckPage/CheckPage";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserProfile from "../pages/UserProfile/UserProfile";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/createAssignment",
                element:<PrivateRoute>
                    <CreateAssignmentForm></CreateAssignmentForm>
                    </PrivateRoute>,
            },
            {
                path: "/allAssignments",
                element:<AllAssignments></AllAssignments>
            },
            {
                path: "/details/:id",
                element:<PrivateRoute><AssignmentDetails></AssignmentDetails></PrivateRoute>
            },
            {
                path: "/added",
                element:<PrivateRoute><AddedAssignments></AddedAssignments></PrivateRoute>
            },
            {
                path: "/submitted",
                element:<PrivateRoute><SubmittedAssignments></SubmittedAssignments></PrivateRoute>
            },
            {
                path: "/check",
                element:<PrivateRoute><CheckPage></CheckPage></PrivateRoute>,
            },
            {
                path: "/update/:id",
                element:<PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>
            },
            {
                path: "/login",
                element:<Login></Login>
            },
            {
                path: "/register",
                element:<Register></Register>
            },
            {
                path: "/profile",
                element:<PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
        ]
    }
])

export default Routes;