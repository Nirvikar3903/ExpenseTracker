import React, { useContext } from 'react'
import exclamation from '../../src/assets/exclamation.png'

const DeleteBudget = () => {
    const { transactions , setTransactions,selectedTransaction , setSelectedTransaction} = useContext
   const [openDeletePopup , setOpenDeletePopup] =  useState(true);

   const handleDeletePopupClick = (expense) =>{
    setSelectedTransaction(expense)
    setOpenDeletePopup(true);
   }
   const closeDeletePopup = () =>{
    setOpenDeletePopup(false)   
   }

   const handleConfirmDelete = () =>{
    const deletedTransaction = transactions.filter((expense)=> expense.id !== selectedTransaction.id)
    setTransactions(deletedTransaction) ;
    localStorage.setItem("transactions" , JSON.stringify(deletedTransaction));
    setOpenDeletePopup(false);
    // set the selected button to 0

   }

   

  return (
    <>
        <div className="opacity" onClick={closeDeletePopup}></div>
        <div className="delete-popup-container">
          <img src={exclamation} alt=""  className='w-24 h-24'/>

        </div>


    {/* {closeDeletePopup &&(
      <>

      </>
    )} */}
    </>
  )
}

export default DeleteBudget