import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

type AdminRouteProps = {
  children: React.ReactNode;
};

function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;