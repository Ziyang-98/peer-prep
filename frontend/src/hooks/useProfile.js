import { deleteUser, changePassword } from 'api/index';

const useProfile = () => {

    const handleDeleteUser = async (event) => {
        await deleteUser()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
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