import { Navigate, Route, Routes } from "react-router-dom";
import GraduationPage from "../pages/GraduationPage";
import GuidePage from "../pages/GuidePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GraduationPage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
