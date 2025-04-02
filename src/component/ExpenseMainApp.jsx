import React, { useContext, useEffect, useState } from "react";
import BudgetCards from "./utilisComponents/BudgetCards";
import budgetImage from "../assets/budget.svg";
import expenseImage from "../assets/expense.svg";
import coinstack from "../assets/coin-stack.svg";
import { AppContext } from "../context/AppProvider";

//cattegory imports
import { CiEdit, CiPizza, CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { BsSuitcase } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { IoMdAdd } from "react-icons/io";

import CategoryCards from "../component/utilisComponents/CategoryCards";
import ButtonCards from "../component/utilisComponents/ButtonCards";
import AddBudget from "./AddBudget";
import AddExpence from "./AddExpence";
import ExpenseTable from "./ExpenseTable";
import Footer from "./Footer";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

// import EditExpense from './EditExpense'

const ExpenseMainApp = () => {
  const {
    budget,
    expense,
    transactions,
    activeButton,
    setActiveButton,
  } = useContext(AppContext);


  const [openBudgetPopup, setOpenBudgetPopup] = useState(false);
  const [openExpensePopup, setOpenExpensePopup] = useState(false);


  const [searchInput,   setSearchInput] = useState("");
  const [filteredTransaction, setFilteredTransaction] = useState(transactions);

  //handle budget popup
  const handleBudgetPopupClick = () => {
    console.log("Add Budget button clicked!");
    setOpenBudgetPopup(true);
  };

  const closeBudgetPopup = () => {
    setOpenBudgetPopup(false);
  };

  //handle Expense popup
  const handleExpensePopupClick = () => {
    setOpenExpensePopup(true);
  };
  const closeAddExpensePopup = () => {
    console.log("Clicked close expense popup");
    setOpenExpensePopup(false);
  };


  // All expense
  const handleAllExpense = (category, index) => {
    setActiveButton(0);
    setFilteredTransaction(transactions);
  };
  //change category
  const handleCategoryChange = (category , index)=>{
    setActiveButton(index);
    const filteredData = transactions.filter((item)=>item.category === category)
    applySearchFilter(filteredData)// Apply search on filtered category data

  }
  const applySearchFilter = (data)=>{
    console.log({data})
     if(!searchInput.trim()){
      setFilteredTransaction(data) //show all
      return;
     }

     const filteredData = data.filter((transactions)=>
      transactions.description.toLowerCase().includes(searchInput.toLowerCase().trim()) 
    );
    setFilteredTransaction(filteredData)
  }

  useEffect(()=>{
    applySearchFilter(transactions)
  },[transactions]);


  useEffect(()=>{
    applySearchFilter(transactions)
  },[searchInput]);




  return (
    <>
      <div className="main-container">
        <h1 className="user text-gray-900 font-bold text-5xl px-5 py-8">
          Hello Nirvikar here
        </h1>
        <div className="budget-container  flex flex-row gap-5 px-10">
          <BudgetCards
            title={"Total Budget"}
            budget={budget}
            image={budgetImage}
          />
          <BudgetCards
            title={"Total Expense"}
            budget={expense}
            image={expenseImage}
          />
          <BudgetCards
            title={"Remaining Budget"}
            budget={budget - expense}
            image={coinstack}
          />
        </div>
        <div className="category-container flex flex-row gap-2.5 flex-wrap">
          <div
            className="search-container flex p-2.5 px-5 mx-12 mt-8 gap-2 bg-gray-100 cursor-pointer rounded-full "
            icon={<CiSearch />}
          >
            <input
              className="border-0 outline-0 bg-gray-100 text-base "
              type="text"
              placeholder="Search..."
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <CategoryCards
            category={"All Expense"}
            icon={
              <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                className="text-2xl"
              />
            }
            index={0}
            activeButton={activeButton}
            handleCategoryChange={handleAllExpense}
          />
          <CategoryCards
            category={"Food and Drinks"}
            icon={<CiPizza className="text-2xl" />}
            handleCategoryChange={handleCategoryChange}
            index={1}
            activeButton={activeButton}
          />
          <CategoryCards
            category={"Groceries"}
            icon={<HiOutlineShoppingBag className="text-2xl" />}
            index={2}
            activeButton={activeButton}
            handleCategoryChange={handleCategoryChange}
          />
          <CategoryCards
            category={"Travel"}
            icon={<BsSuitcase className="text-2xl" />}
            index={3}
            activeButton={activeButton}
            handleCategoryChange={handleCategoryChange}
          />
          <CategoryCards
            category={"Health"}
            icon={<MdHealthAndSafety className="text-2xl" />}
            index={4}
            activeButton={activeButton}
            handleCategoryChange={handleCategoryChange}
          />
          <ButtonCards
            icon={<IoMdAdd />}
            buttonname={"Add Budget"}
            handleModalChange={handleBudgetPopupClick}
          />
          <ButtonCards
            icon={<IoMdAdd />}
            buttonname={"Add Expense"}
            handleModalChange={handleExpensePopupClick}
          />
        </div>
        <AddBudget handleBudgetPopupClick={handleBudgetPopupClick} openBudgetPopup={openBudgetPopup} closeBudgetPopup={closeBudgetPopup}/>
        <AddExpence handleExpensePopupClick={handleExpensePopupClick} openExpensePopup={openExpensePopup} closeAddExpensePopup={closeAddExpensePopup}  />
        <ExpenseTable filteredTransaction={filteredTransaction} setFilteredTransaction={setFilteredTransaction} />
        <Footer/>
      </div>
    </>
  );
};

export default ExpenseMainApp;
