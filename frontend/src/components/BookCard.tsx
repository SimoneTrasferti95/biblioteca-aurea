import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import type { Book } from "../types/book";
import { useTranslation } from "react-i18next";

type BookCardProps = {
  book: Book;
  onRent: (bookId: number) => void;
};

function BookCard({ book, onRent }: BookCardProps) {
  const { t } = useTranslation();
  const isAvailable = book.availableCopies > 0;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Stack spacing={2} flex={1}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: "1.25rem",
                color: "text.primary",
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              {book.title}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {book.author}
            </Typography>
          </Box>

          {book.genre && (
            <Chip
              label={book.genre}
              size="small"
              sx={{
                alignSelf: "flex-start",
              }}
            />
          )}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flex: 1,
              minHeight: 72,
            }}
          >
            {book.description || t("catalog.noDescription")}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="body2" color="text.secondary">
              {t("catalog.available")}: <strong>{book.availableCopies}</strong> /{" "}
              {book.totalCopies}
            </Typography>

            <Chip
              label={
                isAvailable
                  ? t("catalog.availableChip")
                  : t("catalog.unavailableChip")
              }
              size="small"
              color={isAvailable ? "success" : "default"}
              variant={isAvailable ? "filled" : "outlined"}
            />
          </Stack>
        </Stack>

        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 3, borderWidth: 1.3 }}
          disabled={!isAvailable}
          onClick={() => onRent(book.id)}
        >
          {t("catalog.rent")}
        </Button>
      </CardContent>
    </Card>
  );
}

export default BookCard;