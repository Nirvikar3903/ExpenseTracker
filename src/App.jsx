import React from 'react'
import Header from './component/Header'
import ExpenseMainApp from './component/ExpenseMainApp'
import AppProvider from './context/AppProvider'


const App = () => {
  return (
    <>
      <Header/>
      <AppProvider>
        <ExpenseMainApp/>
      </AppProvider>
    </>
  )
}

export default App


