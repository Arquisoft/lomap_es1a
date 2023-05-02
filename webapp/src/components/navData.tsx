import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EmojiPeople from '@mui/icons-material/EmojiPeople';
import InfoIcon from '@mui/icons-material/Info';
import { AccountCircle } from '@mui/icons-material';

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