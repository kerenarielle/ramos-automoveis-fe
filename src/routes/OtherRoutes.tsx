import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Listings from "../pages/Listings";
import Adding from "../pages/Adding";
import Editing from "../pages/Editing";

const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listagem" element={<Listings />} />
        <Route path="/adicionar" element={<Adding />} />
        <Route path="/editar/:id" element={<Editing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OtherRoutes;
