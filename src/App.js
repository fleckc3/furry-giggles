import AppRoutes from "./Routes";
import ThemeProvider from "./theme";
import Dashboard from "src/layouts/dashboard/Dashboard";
// import Chat from "src/components/chat";
import Home from "src/views/home/Home";
import { AuthProvider } from "src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Dashboard>
            <AppRoutes />
          </Dashboard>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
