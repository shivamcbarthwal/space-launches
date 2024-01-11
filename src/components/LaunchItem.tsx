import { Card, ListItem, ListItemText, Typography } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Launch } from "../interfaces/Launch";
import { useNavigate } from "react-router-dom";

type LaunchItemProps = {
    launch: Launch;
    previous: string;
};

const LaunchItem = ({ launch, previous }: LaunchItemProps) => {
    const navigate = useNavigate();
    return (
        <ListItem button onClick={() => navigate(`/launch/${launch.id}`, { state: { previous } })}>
            <Card variant="outlined" style={{ display: 'flex', alignItems: 'center', padding: '1rem', width: '550px' }}>
                <RocketLaunchIcon style={{ marginRight: '1rem' }} />
                <ListItemText
                    primary={<Typography variant="h6">{launch.name}</Typography>}
                    secondary={
                        <>
                            <Typography variant="body2">Launch Time: {launch.net}</Typography>
                            <Typography variant="body2">Service Provider: {launch.launch_service_provider.name}</Typography>
                            <Typography variant="body2">Country: {launch.pad.country_code}</Typography>
                        </>
                    }
                />
            </Card>
        </ListItem>
    );
};

export default LaunchItem;