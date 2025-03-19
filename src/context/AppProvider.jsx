import React, { Children, createContext, useState } from 'react'

export const AppContext = createContext()

// const AppProvider = (props) => {
const AppProvider = ({children}) => {

    const [budget , setBudget] = useState(0);
    const [expense,setExpense] = useState(null);
    const [transactions,setTransactions] = useState([]);
    const [selectedTransaction,setSelectedTransaction] = useState(null);

    
  return (
    <AppContext.Provider
        value={{
            budget,
            expense,
            transactions,
            selectedTransaction
        }}
    >
        {children}
    </AppContext.Provider>

  )
}

export default AppProvider