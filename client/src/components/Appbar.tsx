import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import IconButton from "@mui/material/IconButton";

export default function Appbar() {
  const navigate = useNavigate();
  if (!localStorage.getItem("userName")) {
    return;
  }

  const logOut = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="appBar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountBalanceWalletIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit" onClick={logOut}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
