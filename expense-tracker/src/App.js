import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import GlobalContext from "./contexts/GlobalContext";
import useGlobalValueService from "./services/globalValueService";

function App() {
  const globalValues = useGlobalValueService();

  return (
    <GlobalContext.Provider value={globalValues}>
      <Dashboard />
    </GlobalContext.Provider>
  );
}

export default App;
