import { useSelector } from "react-redux";


const UserProfile = () => {
    const userInfo = useSelector(state => state.user.userInfo);

    console.log('userInfo', userInfo)
}

export default UserProfile;