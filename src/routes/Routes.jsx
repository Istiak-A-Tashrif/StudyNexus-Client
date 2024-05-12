import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";
import CreateAssignmentForm from "../pages/CreateAssignmentForm/CreateAssignmentForm";
import AllAssignments from "../pages/AllAssignments/AllAssignments";
import AssignmentDetails from "../pages/AssignmentDetails/AssignmentDetails";

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
        ]
    }
])

export default Routes;