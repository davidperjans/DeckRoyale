import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DeckBuilder from "./pages/DeckBuilder";
import DeckReviewer from "./pages/DeckReviewer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deck-builder" element={<DeckBuilder />} />
          <Route path="/deck-reviewer" element={<DeckReviewer />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
