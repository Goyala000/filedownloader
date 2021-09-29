import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddDownload from "./layouts/AddDownload";
import AvailableDownloads from "./layouts/AvailableDownloads";

const App = () => {
  return (
    <Router>
      <Route path="/" component={AddDownload} exact />
      <Route path="/all" component={AvailableDownloads} exact />
    </Router>
  );
};

export default App;
