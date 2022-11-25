import { Box, Button, Typography } from "@mui/material";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userInfo/slice";

export const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector(state => state.userInfo);

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('userInfo');
    navigate('/');
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          boxShadow: '0px 0 16px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          component="nav"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
            height: '60px',
            maxWidth: '1500px',
            px: '20px',
            mx: 'auto',
            fontSize: '24px',
            lineHeight: '28px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Button
              component={NavLink}
              to="/"
              sx={{
                textDecoration: 'none',
              }}
            >
              Home
            </Button>
            {user.id && (
              <Button
                component={NavLink}
                to="/create"
                sx={{
                  textDecoration: 'none',
                }}
              >
                Create Post
              </Button>
            )}
            {user.roles.includes('admin') && (
              <Button
                component={NavLink}
                to="/users"
                sx={{
                  textDecoration: 'none',
                }}
              >
                Users
              </Button>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {user.id ? (
              <>
                <Typography sx={{ textAlign: 'center' }}>
                  Hello,
                  <br />
                  {user.userName}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) :
              pathname !== '/login' &&
              pathname !== '/sign-in' && (
                <>
                  <Button
                    component={NavLink}
                    variant="outlined"
                    to="/sign-in"
                    sx={{ textDecoration: 'none' }}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={NavLink}
                    variant="outlined"
                    to="/login"
                    sx={{ textDecoration: 'none' }}
                  >
                    Login
                  </Button>
                </>
              )}
          </Box>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{ height: '100%' }}
      >
        <Outlet />
      </Box>
    </>
  );
};
