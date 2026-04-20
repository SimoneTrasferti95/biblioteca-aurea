import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { registerRequest } from "../api/auth";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: "fullName" | "email" | "password") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerRequest(form);
      setSuccess("Registrazione completata con successo");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Errore durante la registrazione"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center">
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack spacing={3}>
              <Box textAlign="center">
                <Typography
                  variant="overline"
                  sx={{
                    color: "secondary.main",
                    letterSpacing: "0.16em",
                    fontWeight: 700,
                  }}
                >
                  Registrazione
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    mt: 1,
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                >
                  Crea il tuo profilo
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1.5 }}
                >
                  Registrati per noleggiare libri, consultare i tuoi prestiti e
                  accumulare punti fedeltà.
                </Typography>
              </Box>

              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    label="Nome completo"
                    fullWidth
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                  />

                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={form.email}
                    onChange={handleChange("email")}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={form.password}
                    onChange={handleChange("password")}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{
                      backgroundColor: "#111111",
                      "&:hover": {
                        backgroundColor: "#222222",
                      },
                    }}
                  >
                    {loading ? "Registrazione in corso..." : "Registrati"}
                  </Button>

                  <Button
                    type="button"
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/login")}
                  >
                    Hai già un account? Accedi
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default RegisterPage;