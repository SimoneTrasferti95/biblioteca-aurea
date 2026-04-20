import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  getMyRentalsRequest,
  returnRentalRequest,
} from "../api/rentals";
import { getMyLoyaltyRequest } from "../api/loyalty";
import { useTranslation } from "react-i18next";

function MyRentalsPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [rentals, setRentals] = useState<any[]>([]);
  const [loyalty, setLoyalty] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchRentals = async () => {
    try {
      const data = await getMyRentalsRequest();
      setRentals(data);
    } catch {
      setError(t("rentals.loadRentalsError"));
    }
  };

  const fetchLoyalty = async () => {
    try {
      const data = await getMyLoyaltyRequest();
      setLoyalty(data);
    } catch {
      setError(t("rentals.loadLoyaltyError"));
    }
  };

  useEffect(() => {
    fetchRentals();
    fetchLoyalty();
  }, []);

  const handleReturn = async (id: number) => {
    try {
      await returnRentalRequest(id);
      fetchRentals();
      fetchLoyalty();
    } catch {
      setError(t("rentals.returnError"));
    }
  };

  const getStatusLabel = (status: string) => {
    if (status === "ACTIVE") return t("rentals.active");
    if (status === "RETURNED") return t("rentals.returned");
    if (status === "EXPIRED") return t("rentals.expired");
    return status;
  };

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2" mb={4}>
          {t("rentals.title")}
        </Typography>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 4 }}>
          <Tab label={t("rentals.tabRentals")} />
          <Tab label={t("rentals.tabLoyalty")} />
        </Tabs>

        {error && <Alert severity="error">{error}</Alert>}

        {tab === 0 && (
          <Stack spacing={2}>
            {rentals.map((r) => (
              <Card key={r.id}>
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="h4">{r.book.title}</Typography>
                      <Typography color="text.secondary">
                        {r.book.author}
                      </Typography>

                      <Stack spacing={0.8} mt={2}>
                        <Typography variant="body2">
                          {t("rentals.status")}:{" "}
                          <Chip
                            size="small"
                            label={getStatusLabel(r.status)}
                            color={
                              r.status === "ACTIVE"
                                ? "primary"
                                : r.status === "RETURNED"
                                ? "success"
                                : "default"
                            }
                          />
                        </Typography>

                        <Typography variant="body2">
                          {t("rentals.startDate")}:{" "}
                          {new Date(r.rentDate).toLocaleDateString()}
                        </Typography>

                        <Typography variant="body2">
                          {t("rentals.dueDate")}:{" "}
                          {new Date(r.dueDate).toLocaleDateString()}
                        </Typography>

                        <Typography variant="body2">
                          {t("rentals.returnDate")}:{" "}
                          {r.returnDate
                            ? new Date(r.returnDate).toLocaleDateString()
                            : t("rentals.noReturnDate")}
                        </Typography>
                      </Stack>
                    </Box>

                    {r.status === "ACTIVE" && (
                      <Button
                        variant="outlined"
                        onClick={() => handleReturn(r.id)}
                      >
                        {t("rentals.returnButton")}
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {tab === 1 && loyalty && (
          <Stack spacing={2}>
            <Typography variant="h3">
              {t("rentals.points")}: {loyalty.points}
            </Typography>

            {loyalty.transactions.map((tItem: any) => (
              <Card key={tItem.id}>
                <CardContent>
                  <Typography>{tItem.reason}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    +{tItem.points} —{" "}
                    {new Date(tItem.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default MyRentalsPage;