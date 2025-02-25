import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; 

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnLogOut = () => {
    logout();
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white", p: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Logo */}
        <Link to="/">
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 40, width: "auto" }}
          />
        </Link>

        {/* Right Side - Buttons */}
        <Box>
          {!token ? (
            <>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  mx: 1,
                  bgcolor: isActive("/signup") ? "#33cccc" : "white",
                  color: isActive("/signup") ? "white" : "#33cccc",
                  "&:hover": { bgcolor: "#339ea4", color: "white" },
                }}>
                Signup
              </Button>
              <Button
                component={Link}
                to="/signin"
                variant="contained"
                sx={{
                  mx: 1,
                  bgcolor: isActive("/signin") ? "#33cccc" : "white",
                  color: isActive("/signin") ? "white" : "#33cccc",
                  "&:hover": { bgcolor: "#339ea4", color: "white" },
                }}>
                Signin
              </Button>
            </>
          ) : (
            <Button
              onClick={handleOnLogOut}
              variant="contained"
              sx={{
                mx: 1,
                bgcolor: "white",
                color: "#33cccc",
                "&:hover": { bgcolor: "#33cccc", color: "white" },
              }}>
              Signout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;