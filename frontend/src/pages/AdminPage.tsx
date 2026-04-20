import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createBookRequest } from "../api/books";
import { getAdminRentalsRequest, getAdminStatsRequest } from "../api/admin";
import { useTranslation } from "react-i18next";

function AdminPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = useMemo(
    () => searchParams.get("tab") || "add",
    [searchParams]
  );

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    totalCopies: 1,
  });

  const [stats, setStats] = useState<any>(null);
  const [activeRentals, setActiveRentals] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      const data = await getAdminStatsRequest();
      setStats(data);
    } catch {}
  };

  const fetchRentals = async () => {
    try {
      const data = await getAdminRentalsRequest("ACTIVE");
      setActiveRentals(data);
    } catch {}
  };

  useEffect(() => {
    fetchStats();
    fetchRentals();
  }, []);

  const handleChange =
    (field: "title" | "author" | "genre" | "description" | "totalCopies") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]:
          field === "totalCopies"
            ? Number(event.target.value)
            : event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await createBookRequest({
        title: form.title,
        author: form.author,
        genre: form.genre,
        description: form.description,
        totalCopies: form.totalCopies,
      });

      setSuccess(t("adminPage.bookCreated"));

      setForm({
        title: "",
        author: "",
        genre: "",
        description: "",
        totalCopies: 1,
      });

      fetchStats();
    } catch (err: any) {
      setError(err?.response?.data?.message || t("adminPage.createError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                letterSpacing: "0.16em",
                fontWeight: 700,
              }}
            >
              {t("adminPage.overline")}
            </Typography>

            <Typography variant="h2" sx={{ mt: 1, fontWeight: 600 }}>
              {t("adminPage.title")}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {t("adminPage.subtitle")}
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant={currentTab === "add" ? "contained" : "outlined"}
              onClick={() => setSearchParams({ tab: "add" })}
            >
              {t("adminPage.sectionAdd")}
            </Button>

            <Button
              variant={currentTab === "rentals" ? "contained" : "outlined"}
              onClick={() => setSearchParams({ tab: "rentals" })}
            >
              {t("adminPage.sectionRentals")}
            </Button>

            <Button
              variant={currentTab === "stats" ? "contained" : "outlined"}
              onClick={() => setSearchParams({ tab: "stats" })}
            >
              {t("adminPage.sectionStats")}
            </Button>
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          {currentTab === "add" && (
            <Card>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2.5}>
                    <TextField
                      label={t("adminPage.bookTitle")}
                      fullWidth
                      value={form.title}
                      onChange={handleChange("title")}
                    />

                    <TextField
                      label={t("adminPage.author")}
                      fullWidth
                      value={form.author}
                      onChange={handleChange("author")}
                    />

                    <TextField
                      label={t("adminPage.genre")}
                      fullWidth
                      value={form.genre}
                      onChange={handleChange("genre")}
                    />

                    <TextField
                      label={t("adminPage.description")}
                      fullWidth
                      multiline
                      minRows={4}
                      value={form.description}
                      onChange={handleChange("description")}
                    />

                    <TextField
                      label={t("adminPage.totalCopies")}
                      type="number"
                      fullWidth
                      value={form.totalCopies}
                      onChange={handleChange("totalCopies")}
                      inputProps={{ min: 1 }}
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
                      {loading
                        ? t("adminPage.creating")
                        : t("adminPage.createBook")}
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          )}

          {currentTab === "rentals" && (
            <Stack spacing={2}>
              {activeRentals.length === 0 && (
                <Alert severity="info">{t("adminPage.noActiveRentals")}</Alert>
              )}

              {activeRentals.map((rental) => (
                <Card key={rental.id}>
                  <CardContent>
                    <Typography variant="h4">{rental.book.title}</Typography>
                    <Typography color="text.secondary">
                      {rental.book.author}
                    </Typography>

                    <Stack spacing={0.7} mt={2}>
                      <Typography variant="body2">
                        Utente: {rental.user.fullName} — {rental.user.email}
                      </Typography>
                      <Typography variant="body2">
                        Inizio noleggio:{" "}
                        {new Date(rental.rentDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Scadenza:{" "}
                        {new Date(rental.dueDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Stato: {rental.status}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          {currentTab === "stats" && stats && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {t("adminPage.statsBooks")}
                    </Typography>
                    <Typography variant="h3">{stats.totalBooks}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {t("adminPage.statsRentals")}
                    </Typography>
                    <Typography variant="h3">{stats.totalRentals}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {t("adminPage.statsActive")}
                    </Typography>
                    <Typography variant="h3">{stats.activeRentals}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {t("adminPage.statsReturned")}
                    </Typography>
                    <Typography variant="h3">{stats.returnedRentals}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default AdminPage;