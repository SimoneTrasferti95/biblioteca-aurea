import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { getBooksRequest } from "../api/books";
import { createRentalRequest } from "../api/rentals";
import type { Book } from "../types/book";
import BookCard from "../components/BookCard";
import { useTranslation } from "react-i18next";

function CatalogPage() {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchBooks = async () => {
    try {
      const data = await getBooksRequest();
      setBooks(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Errore nel caricamento del catalogo"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleRent = async (bookId: number) => {
    try {
      setError("");
      setSuccess("");
      await createRentalRequest(bookId);
      setSuccess(t("catalog.rentSuccess"));
      fetchBooks();
    } catch (err: any) {
      setError(err?.response?.data?.message || t("catalog.rentError"));
    }
  };

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Stack spacing={2} mb={5}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              letterSpacing: "0.16em",
              fontWeight: 700,
            }}
          >
            {t("catalog.overline")}
          </Typography>

          <Typography variant="h2" color="text.primary" sx={{ fontWeight: 600 }}>
            {t("catalog.title")}
          </Typography>

          <Typography variant="body1" color="text.secondary" maxWidth={760}>
            {t("catalog.subtitle")}
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {!loading && !error && books.length === 0 && (
          <Alert severity="info">{t("catalog.empty")}</Alert>
        )}

        {!loading && books.length > 0 && (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <BookCard book={book} onRent={handleRent} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default CatalogPage;