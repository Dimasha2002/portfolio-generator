import React, { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [draftPortfolio, setDraftPortfolio] = useState(null);

  const saveDraft = (data) => setDraftPortfolio(data);
  const clearDraft = () => setDraftPortfolio(null);

  return (
    <PortfolioContext.Provider value={{ draftPortfolio, saveDraft, clearDraft }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () => useContext(PortfolioContext);
