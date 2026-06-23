import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import CreatePortfolioPage from "./pages/CreatePortfolioPage";
import PreviewPage from "./pages/PreviewPage";
import PublicPortfolioPage from "./pages/PublicPortfolioPage";
import EditPortfolioPage from "./pages/EditPortfolioPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155" },
          success: { iconTheme: { primary: "#10b981", secondary: "#f1f5f9" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" } },
        }}
      />
      <Routes>
        {/* Public portfolio - no navbar */}
        <Route path="/portfolio/:username" element={<PublicPortfolioPage />} />
        {/* App routes - with navbar */}
        <Route
          path="/*"
          element={
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/create" element={<CreatePortfolioPage />} />
                  <Route path="/preview" element={<PreviewPage />} />
                  <Route path="/edit/:username" element={<EditPortfolioPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
