import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

  const isAuthenticated = !!user;

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 760,
            mx: "auto",
            mb: 10,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              letterSpacing: "0.16em",
              fontWeight: 700,
            }}
          >
            {t("home.overline")}
          </Typography>

          <Typography
            variant="h1"
            sx={{
              mt: 2,
              mb: 2,
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            {t("home.title1")}
            <br />
            {t("home.title2")}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
          >
            {t("home.subtitle")}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{ borderWidth: 1.5 }}
              onClick={() => navigate("/catalog")}
            >
              {t("home.browse")}
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() =>
                navigate(isAuthenticated ? "/my-rentals" : "/login")
              }
              sx={{
                backgroundColor: "#111111",
                "&:hover": {
                  backgroundColor: "#222222",
                },
              }}
            >
              {isAuthenticated ? t("home.goToRentals") : t("home.loginProfile")}
            </Button>
          </Stack>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="stretch"
        >
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" color="text.primary" gutterBottom>
                {t("home.card1Title")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t("home.card1Text")}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" color="text.primary" gutterBottom>
                {t("home.card2Title")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t("home.card2Text")}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" color="text.primary" gutterBottom>
                {t("home.card3Title")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t("home.card3Text")}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;