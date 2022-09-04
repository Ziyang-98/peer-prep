import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useNavbarMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRedirectToPofile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return {
    handleOpenUserMenu,
    menuProps: {
      anchorEl: anchorElUser,
      open: Boolean(anchorElUser),
      onClose: handleCloseUserMenu,
    },
    handleRedirectToPofile,
    handleLogout,
  };
};

export default useNavbarMenu;
