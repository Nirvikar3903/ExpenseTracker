import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";

const AddBudget = ({openBudgetPopup, handleBudgetPopupClick ,closeBudgetPopup}) => {
  const { budget  , setBudget} = useContext(AppContext);

  const [inputBudget, setInputBudget] = useState();
  const [errors, setErrors] = useState({});

  if (!openBudgetPopup) return null;

  const validate = () => {
    const error = {};
    if (!inputBudget) {
      errors.inputBudget = "Please enter amount and then submit!!";
    }
    setErrors(error);

    return Object.keys(errors).length === 0; // Return true if no errors
  };
  




  const handleChangeBudget = (newBudget) => {
    setBudget(newBudget);
    localStorage.setItem("budget", JSON.stringify(newBudget));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(); // Run validation

    
    console.log("New Budget:", inputBudget);
    handleChangeBudget(inputBudget);
    setInputBudget(""); // Reset input field
    closeBudgetPopup(); // Close the popup
  };


  return (
    <>
    {openBudgetPopup &&(
      <>
        <div
        className="opacity fixed w-full h-full top-0 left-0 "
        onClick={closeBudgetPopup}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>
      <div className="add-budget-container fixed top-1/4 left-2/5 bg-white flex flex-col gap-2 rounded-xl">
        <span
          className="close-button absolute right-0 top-0 w-10 h-10 text-center cursor-pointer text-2xl rounded-tl-lg"
          onClick={closeBudgetPopup}
        >
          &times;
        </span>
        <div className="add-budget-header-container border-b border-black p-4 ">
          <h2 className="add-budget-heading text-2xl md:font-bold">
            Add Budget
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-5 md:p-6"
        >
          <div className="add-budget-div flex flex-col gap-3">
            <label htmlFor="amount" className="text-2xl">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Amount"
              min={0}
              onChange={(e) => setInputBudget(e.target.value)}
              className="text-2xl p-3 border border-black w-full rounded-lg"
            />{" "}
            {/* .add-budget-container input */}
            {errors.inputBudget && (
              <span className="text-red-500">{errors.inputBudget}</span>
            )}
          </div>
          <button className="primary-btn bg-[#5C6AFF] p-3 px-6 rounded-lg text-white flex justify-center items-center gap-2 text-lg font-semibold cursor-pointer hover:shadow-md">
            Submit Budget
          </button>
        </form>
      </div>
      </>
    )}
      
    </>
  );
};

export default AddBudget;
