import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useThemeMode } from "../contexts/ThemeModeContext";
import { useTranslation } from "react-i18next";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const { t, i18n } = useTranslation();

  const isAdmin = user?.role === "ADMIN";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "text.primary",
              cursor: "pointer",
            }}
            onClick={() => navigate(isAdmin ? "/admin" : "/")}
          >
            {t("layout.brand")}
          </Typography>

          <Stack direction="row" spacing={1.2} alignItems="center">
            {!user && (
              <>
                <Button onClick={() => navigate("/")}>{t("layout.home")}</Button>
                <Button onClick={() => navigate("/catalog")}>
                  {t("layout.catalog")}
                </Button>
                <Button onClick={() => navigate("/login")}>
                  {t("layout.login")}
                </Button>
                <Button onClick={() => navigate("/register")}>
                  {t("layout.register")}
                </Button>
              </>
            )}

            {user && !isAdmin && (
              <>
                <Button onClick={() => navigate("/catalog")}>
                  {t("layout.catalog")}
                </Button>
                <Button onClick={() => navigate("/my-rentals")}>
                  {t("layout.myRentals")}
                </Button>
              </>
            )}

            {user && isAdmin && (
              <>
                <Button onClick={() => navigate("/admin?tab=add")}>
                  {t("layout.addBook")}
                </Button>
                <Button onClick={() => navigate("/admin?tab=rentals")}>
                  {t("layout.activeRentals")}
                </Button>
                {!isAdminPage && (
                  <Button onClick={() => navigate("/admin")}>
                    {t("layout.admin")}
                  </Button>
                )}
              </>
            )}

            <Button onClick={toggleMode}>
              {mode === "light" ? "🌙" : "☀️"}
            </Button>

            <Button onClick={() => i18n.changeLanguage("it")}>IT</Button>
            <Button onClick={() => i18n.changeLanguage("en")}>EN</Button>
            <Button onClick={() => i18n.changeLanguage("fr")}>FR</Button>

            {user && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderWidth: 1.2 }}
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              >
                {t("layout.logout")}
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Box>
  );
}

export default Layout;