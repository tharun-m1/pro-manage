import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import PublicPage from "./pages/PublicPage/PublicPage";
import NotFound from "./pages/NotFound/NotFound";
import useScreenSize from "./customHooks/useScreenSize";
function App() {
  const screenSize = useScreenSize();
  if (screenSize < 1024) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Use this site on bigger Screen (min: 1024px)
      </div>
    );
  }
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
