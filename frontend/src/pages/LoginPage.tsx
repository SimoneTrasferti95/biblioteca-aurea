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
import { loginRequest } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: "email" | "password") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginRequest(form);
      await refreshUser();
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Errore durante il login");
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
                  Accesso
                </Typography>

                <Typography variant="h2" sx={{ mt: 1, fontWeight: 600 }}>
                  Entra nella tua biblioteca
                </Typography>
              </Box>

              {error && <Alert severity="error">{error}</Alert>}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
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
                    size="large"
                    disabled={loading}
                    sx={{
                      backgroundColor: "#111111",
                      "&:hover": {
                        backgroundColor: "#222222",
                      },
                    }}
                  >
                    {loading ? "Accesso in corso..." : "Accedi"}
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

export default LoginPage;