import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccoutCircle from '@mui/icons-material/AccountCircle';
import EmojiPeople from '@mui/icons-material/EmojiPeople';
import { AccountCircle } from '@mui/icons-material';

export const navData = [
        {
            id: 0,
            icon: <HomeIcon/>,
            text: "Home",
            link: "/"
        },
        {
            id: 1,
            icon: <TravelExploreIcon/>,
            text: "Explore",
            link: "explore"
        },
        {
            id: 2,
            icon: <AccountCircle/>,
            text: "Account",
            link: "account"
        },
        {
            id: 3,
            icon: <SettingsIcon/>,
            text: "Settings",
            link: "settings"
        }
    ]