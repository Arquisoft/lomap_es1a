import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccoutCircle from '@mui/icons-material/AccountCircle';
import EmojiPeople from '@mui/icons-material/EmojiPeople';
import InfoIcon from '@mui/icons-material/Info';
import { AccountCircle } from '@mui/icons-material';
import { CombinedDataProvider, useSession, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";

export const navData = [
        {
            id: 0,
            icon: <TravelExploreIcon/>,
            text: "Map",
            link: "/"
        },
        {
            id: 1,
            icon: <AccountCircle/>,
            text: "Account",
            link: "account"
        },
        {
            id: 2,
            icon: <EmojiPeople/>,
            text: "Friends",
            link: "friends"
        },
        {
            id: 3,
            icon: <InfoIcon/>,
            text: "About",
            link: "about"
        }
    ]