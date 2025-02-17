import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/b2cV.jpg"; 

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
                  bgcolor: isActive("/signup") ? "primary.main" : "gray",
                  color: isActive("/signup") ? "white" : "black",
                  "&:hover": { bgcolor: "gray" },
                }}>
                Signup
              </Button>
              <Button
                component={Link}
                to="/signin"
                variant="contained"
                sx={{
                  mx: 1,
                  bgcolor: isActive("/signin") ? "primary.main" : "gray",
                  color: isActive("/signin") ? "white" : "black",
                  "&:hover": { bgcolor: "gray" },
                }}>
                Login
              </Button>
            </>
          ) : (
            <Button
              onClick={handleOnLogOut}
              variant="contained"
              sx={{
                mx: 1,
                bgcolor: "primary.main",
                color: "black",
                "&:hover": { bgcolor: "gray" },
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