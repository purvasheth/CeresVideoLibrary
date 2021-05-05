import { createContext, useContext, useReducer } from "react";
import { historyReducer } from "./history-reducer";

const HistoryContext = createContext({});

export const HistoryProvider = ({ children }) => {
  const [{ history }, historyDispatch] = useReducer(historyReducer, {
    history: [],
  });
  return (
    <HistoryContext.Provider value={{ history, historyDispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
