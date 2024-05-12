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
                element:<CreateAssignmentForm></CreateAssignmentForm>
            },
            {
                path: "/allAssignments",
                element:<AllAssignments></AllAssignments>
            },
            {
                path: "/details",
                element:<AssignmentDetails></AssignmentDetails>
            },
            {
                path: "/added",
                element:<AddedAssignments></AddedAssignments>
            },
            {
                path: "/submitted",
                element:<SubmittedAssignments></SubmittedAssignments>
            },
            {
                path: "/check",
                element:<CheckPage></CheckPage>,
            },
            {
                path: "/update",
                element:<UpdateAssignment></UpdateAssignment>
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
                element:<UserProfile></UserProfile>
            },
        ]
    }
])

export default Routes;