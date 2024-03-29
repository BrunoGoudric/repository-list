import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/repositorio/:repositorio" element={<Repositorio />} />
      </Switch>
    </BrowserRouter>
  );
}
