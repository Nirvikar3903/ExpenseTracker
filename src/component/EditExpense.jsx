import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { GiAmputation } from 'react-icons/gi';

const EditExpense = ({openEditExpensePopup , closeEditPopup}) => {
  const{transactions , setTransactions,selectedTransaction , setSelectedTransaction}=useContext(AppContext) ;

  // const [editExpenseTitle,setEditedExpenseTitle] = useState(selectedTransaction.description)
  // const [editDate,setEditedDate] = useState(selectedTransaction.date)
  // const [editCategory,setEditedCategory] = useState(selectedTransaction.category)
  // const [editAmount,setEditedAmount] = useState(selectedTransaction.amount)
  // const [editErrors,setEditedErrors] = useState({});

  const [editExpenseTitle, setEditedExpenseTitle] = useState(selectedTransaction?.description || "");
  const [editDate, setEditedDate] = useState(selectedTransaction?.date || "");
  const [editCategory, setEditedCategory] = useState(selectedTransaction?.category || "");
  const [editAmount, setEditedAmount] = useState(selectedTransaction?.amount || "");
  const [errors, setErrors] = useState({});
  

  const [initialdate, setInitialdate] = useState("");

  const getTodayDate = () =>{
    const d = new Date();
    const date = d.getDate() < 9 ? "0" + d.getDate() : d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    setInitialdate(`${year}-${month}+${date}`)
  }

  useEffect(()=> getTodayDate() , [])
  useEffect(()=>{
    if(selectedTransaction){
      setEditedExpenseTitle(selectedTransaction.description)
      setEditedCategory(selectedTransaction.category)
      setEditedDate(selectedTransaction.date)
      setEditedAmount(selectedTransaction.amount)
    }
  },[selectedTransaction])

  const validate = () => {
    const errors = {};
    if (!editExpenseTitle) {
      errors.newExpense = "Please Enter Expense.";
    }
    if (!editCategory) {
      errors.category = "Please Select Category";
    }
    if (!editDate) {
      errors.date = "Please Select Date";
    }
    if (!editAmount) {
      errors.newExpenseAmount = "Please Enter Amount";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const hanldeEditTransaction = (expense) =>{

    let editedTransaction = transactions.map((transaction)=>{
      if(transaction.id === selectedTransaction.id){
        return {...transaction ,...expense}
      }
      return transaction;
    })
    setTransactions(editedTransaction);
    console.log({editedTransaction})
    localStorage.setItem('transactions' , JSON.stringify(editedTransaction))
    

  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(validate()){
      hanldeEditTransaction({
        id : selectedTransaction.id ,
        category:editCategory, 
        date: editDate,
        amount:Number(editAmount) ,
        description:editExpenseTitle ,

      })

      setEditedExpenseTitle("")
      setEditedCategory("")
      setEditedDate("")
      setEditedAmount("")

      closeEditPopup();
      
      

    }
  }




  return (
    <>
    {openEditExpensePopup&&(
      <>
      <div
        className="opacity fixed w-full h-full top-0 left-0 "
        onClick={closeEditPopup}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>
      <div className="add-expense-container fixed top-1/5 left-2/5 bg-white flex flex-col gap-2 rounded-xl z-1">
        <span
          className="close-button absolute right-0 top-0 w-10 h-10 text-center cursor-pointer text-2xl rounded-lg"
          onClick={closeEditPopup}
        >
          &times;
        </span>
        <div className="add-budget-header-container border-b border-black p-4 ">
          <h2 className="add-budget-heading text-2xl md:font-bold">
            Edit Expense
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4  px-10"
        >
          <div className="add-expense  ">
            <label htmlFor="expense-name" className="text-2xl">
              Expense Name
            </label>
            <input
              type="text"
              name="Expense Name"
              id="expense-name"
              placeholder="Expense Name.."
              value={editExpenseTitle}
              onChange={(e) => setEditedExpenseTitle(e.target.value)}
              className="text-xl p-2 border border-black w-full rounded-lg"
            />{" "}
            {/* .add-budget-container input */}
            {errors.newExpenseTitle && (
              <span className="text-red-500">{errors.newExpenseTitle}</span>
            )}
          </div>
          <div className="add-expense ">
            <label htmlFor="date" className="text-2xl">
              Date
            </label>
            <input
              type="date"
              id="date"
              max={initialdate}
              value={editDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="text-xl  p-2 border border-black w-full rounded-lg"
            />
            {errors.date && (
              <span className="text-red-500">{errors.date}</span>
            )}
          </div>
          <div className="add-expense ">
            <label htmlFor="options" className="text-2xl">
              Category
            </label>
            <select
              name="options"
              id="options"
              value={editCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="text-xl p-2  border border-black w-full rounded-lg"
            >
              <option value="">Choose a category</option>
              <option value="Food and Drinks">Food and Drinks</option>
              <option value="Groceries">Groceries</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category}</span>
            )}
            <div className="add-expense py-2">
              <label htmlFor="amount" className="text-2xl">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                placeholder="Enter Amount ..."
                value={editAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                className="text-xl p-2  border border-black w-full rounded-lg"
              />
              {errors.newExpenseAmount && (
                <span className="text-red-500">
                  {errors.newExpenseAmount}
                </span>
              )}
            </div>
          </div>
          <button className="primary-btn bg-[#5C6AFF] p-3 px-6 mb-4 rounded-lg text-white flex justify-center items-center gap-2 text-lg font-semibold cursor-pointer hover:shadow-md">
            Edit  Expense
          </button>
        </form>
      </div>
    </>
    )}
    </>
  )
}

export default EditExpense