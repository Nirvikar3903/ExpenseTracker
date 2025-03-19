import React, { useContext } from 'react'
import BudgetCards from './utilisComponents/BudgetCards'
import budgetImage from '../assets/budget.svg'
import expenseImage from '../assets/expense.svg'
import coinstack from "../assets/coin-stack.svg";
import { AppContext } from '../context/AppProvider';


//cattegory imports
import { MdDelete } from 'react-icons/md';
import { MdHealthAndSafety } from "react-icons/md";
import { BsSuitcase } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import CategoryCards from '../component/utilisComponents/CategoryCards';
// import ButtonCards from './utilisComponents/ButtonCards';




const ExpenseMainApp = () => {
  const {budget , expense  } = useContext(AppContext)

  return (
    <>
    <div className="main-container">
        <h1 className="user text-gray-900 font-bold text-5xl px-5 py-8" >Hello Nirvikar here</h1>
        <div className="budget-container  flex flex-row gap-5 px-10">

          <BudgetCards
            title={"Total Budget"}
            // budget = {budget}
            image={budgetImage}
          />
          <BudgetCards
            title={"Total Expense"}
            // budget = {budget}
            image={expenseImage}
          />
          <BudgetCards
            title={"Remaining Budget"}
            // budget = {budget}
            image={coinstack}
          />
        </div>

        {/* expense table */}
        <div className="expenseTable">
          <CategoryCards
          
          />
        </div>


    </div>
    </>
  )
}

export default ExpenseMainApp