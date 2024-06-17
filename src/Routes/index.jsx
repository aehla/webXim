import LoginPage from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Main from "../Pages/Main";
import Users from "../Pages/Users";
import ConfirmationPage from "../Pages/Confirm";
import ForgotPasswordPage from "../Pages/ForgotPass";
import SchedulePage from "../Pages/Schedule";
import UserTabs from '../Pages/Users';
import AddStaffForm from '../Pages/AddStaff';  // Import the AddStaffForm component
import AddSupplierDialog from "../Pages/AddSupplierDialog";

const routes = [
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Main />
            },
            {
                path: "users/:id",
                element: <Users />
            },
            {
                path: "reports",
                element: <div>Reports</div>
            },
            {
                path: "settings",
                element: <div>Settings</div>
            },
            {
                path: "add-staff",  // Add this route for AddStaffForm
                element: <AddStaffForm />
            },
            {
                path: "add-supplier",
                element: <AddSupplierDialog/>
            }
        ]
    },
    {
        path: "confirm",
        element: <ConfirmationPage/>
    },
    {
        path: "forgot-password",
        element: <ForgotPasswordPage/>
    }
];

export default routes;
