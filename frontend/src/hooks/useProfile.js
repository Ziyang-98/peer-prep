import { useState } from "react";
import { deleteUser, changePassword } from 'api/index';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import SelectInput from "@mui/material/Select/SelectInput";

const useProfile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [isInvalidPasswordChange, setIsInvalidPasswordChange] = useState(false);
    const [isInvalidDeleteUser, setIsInvalidDeleteUser] = useState(false);
    const [isSuccessPasswordChange, setIsSuccessPasswordChange] = useState(false);

    const navigate = useNavigate();

    const handleDeleteUser = async (event) => {
        await deleteUser()
            .then((res) => {
                console.log(res);
                removeCookie("token");
                navigate("/login");
            })
            .catch((error) => {
                setIsInvalidDeleteUser(true);
                console.log(error);
            });   
        
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        await changePassword(data.get("password"))
            .then((res) => {
                setIsSuccessPasswordChange(true);
                console.log(res);
            })
            .catch((error) => {
                setIsInvalidPasswordChange(true);
                console.log(error);
                
            });
    }

    return {
        handleDeleteUser,
        handleChangePassword,
        isInvalidPasswordChange,
        isInvalidDeleteUser,
        isSuccessPasswordChange
    };
}

export default useProfile;