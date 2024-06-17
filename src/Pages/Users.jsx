import { Paper } from "@mui/material";
import UserTabs from "../Components/UserTabs";
import { useParams } from "react-router-dom";

export default function Users() {

    const { id } = useParams(); 

    return (
        <Paper>
            <UserTabs view={() => parseInt(id)} />
        </Paper>
    )
}