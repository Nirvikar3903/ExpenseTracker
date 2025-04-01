import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'

const EditExpense = ({}) => {
  const{transactions , setTransactions,selectedTransaction , setSelectedTransaction}=useContext(AppContext)
  return (
    <>
      {}
    </>
  )
}

export default EditExpense