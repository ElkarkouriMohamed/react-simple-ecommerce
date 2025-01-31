import { logout } from "../../firebase/firebase"

export default function Logout() {
    const handleLogout = async () => {
        try {
            await logout();
            console.log('logout with success!');
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <button onClick={handleLogout} >
            Sign out
        </button>
    )
}