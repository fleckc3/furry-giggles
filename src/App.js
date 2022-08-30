import AppRoutes from "./Routes";
import ThemeProvider from "./theme";
import Dashboard from "src/layouts/dashboard/Dashboard";
import { AuthProvider } from "src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Dashboard>
              <AppRoutes />
            </Dashboard>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
