import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import PublicPage from "./pages/PublicPage/PublicPage";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/public/:taskId" element={<PublicPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
