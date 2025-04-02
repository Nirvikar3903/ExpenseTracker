import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { v4 as uuidv4, validate } from "uuid";

const AddExpence = ({
  openExpensePopup,
  closeAddExpensePopup,
}) => {
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [errors, setErrors] = useState({});
  const { transactions, setTransactions  , 
    setActiveButton } = useContext(AppContext);

  const handleExpenseDataChange = (newExpense) => {
    const newExpenseData = [...transactions, newExpense];
    setTransactions(newExpenseData);
    setActiveButton(0);
    localStorage.setItem("transactions", JSON.stringify(newExpenseData));
  };

  const getTodayDate = () => {
    const a = new Date();
    const date = a.getDate() < 9 ? "0" + a.getDate() : a.getDate();
    const month = a.getMonth() + 1;
    const year = a.getYear();
    setInitialdate(`${year}-${month}-${date}`);
  };

  const validate = () => {
    const errors = {};
    if (!newExpenseTitle) {
      errors.newExpenseTitle = "Please enter Expense title";
    }
    if (!date) {
      errors.date = "Please enter date";
    }
    if (!category) {
      errors.category = "Please enter category";
    }
    if (!newExpenseAmount) {
      errors.newExpenseAmount = "Please enter Amount ";
    }
    setErrors(errors);
    console.log(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submit clicked");
    if (validate()) {
      // console.log("Validation passed");
      handleExpenseDataChange({
        id: uuidv4(),
        description: newExpenseTitle,
        category: category,
        date: date,
        amount: newExpenseAmount,
      });

      //clearing inputs
      setNewExpenseTitle("");
      setDate("");
      setCategory("");
      setNewExpenseAmount("");
      closeAddExpensePopup();
    } else {
      console.log("Validation failed"); // Debug statement
    }  
  };

  return (
    <>
      {openExpensePopup && (
        <>
          <div
            className="opacity fixed w-full h-full top-0 left-0 "
            onClick={closeAddExpensePopup}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          ></div>
          <div className="add-expense-container fixed top-1/5 left-2/5 bg-white flex flex-col gap-2 rounded-xl z-1">
            <span
              className="close-button absolute right-0 top-0 w-10 h-10 text-center cursor-pointer text-2xl rounded-lg"
              onClick={closeAddExpensePopup}
            >
              &times;
            </span>
            <div className="add-budget-header-container border-b border-black p-4 ">
              <h2 className="add-budget-heading text-2xl md:font-bold">
                Add Expense
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
                  value={newExpenseTitle}
                  onChange={(e) => setNewExpenseTitle(e.target.value)}
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
                  max={initialDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
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
                Add Expense
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddExpence;
