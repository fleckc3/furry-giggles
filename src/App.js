import ThemeProvider from "./theme";
import Dashboard from "src/layouts/dashboard/Dashboard";
import { AuthProvider } from "src/context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./views/auth/SignIn";
import Register from "./views/auth/Register";
import Home from "./views/home/Home";
import LandingPage from "./views/landing-page/LandingPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            {/* <AppRoutes /> */}
            <Dashboard>
              <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </Dashboard>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
