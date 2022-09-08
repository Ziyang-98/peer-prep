import { deleteUser, changePassword } from 'api/index';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const useProfile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    
    const navigate = useNavigate();

    const handleDeleteUser = async (event) => {
        await deleteUser()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });

        removeCookie("token");
        navigate("/login");
        
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        await changePassword(data.get("password"))
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        handleDeleteUser,
        handleChangePassword,
    };
}

export default useProfile;