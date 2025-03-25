import React, { useContext, useState } from "react";
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

const ExpenseMainApp = () => {
  const {
    budget,
    expense,
    transactions,
    setTransaction,
    handleBudgetPopupClick,
    handleExpensePopupClick,
    activeButton,
    setActiveButton,

    openExpensePopup,
  } = useContext(AppContext);

  const [searchInput, setSearchInput] = useState("");
  const [filteredTransaction, setFilteredTransaction] = useState(transactions);

  const handleAllExpense = (buttonname, index) => {
    setActiveButton(index);
    setFilteredTransaction(transactions);
  };

  const handleCategoryChange = (buttonname, index) => {
    setActiveButton(index);
    const expensesData = [...transactions];
    const sortedExpenses = expensesData.filter((item) => {
      return item.category === buttonname;
    });
    setFilteredTransactions(sortedExpenses);
  };

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
              onChange={() => setSearchInput()}
            />
          </div>

          <CategoryCards
            buttonname={"All Expense"}
            icon={
              <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                className="text-2xl"
              />
            }
            index={0}
            handleCategoryChange={handleAllExpense}
          />
          <CategoryCards
            buttonname={"Food and drinks"}
            icon={<CiPizza className="text-2xl" />}
            handleCategoryChange={handleCategoryChange}
            index={1}
          />
          <CategoryCards
            buttonname={"Groceries"}
            icon={<HiOutlineShoppingBag className="text-2xl" />}
            index={2}
            handleCategoryChange={handleCategoryChange}
          />
          <CategoryCards
            buttonname={"Travel"}
            icon={<BsSuitcase className="text-2xl" />}
            index={3}
            handleCategoryChange={handleCategoryChange}
          />
          <CategoryCards
            buttonname={"Health"}
            icon={<MdHealthAndSafety className="text-2xl" />}
            index={4}
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
        <AddBudget />
        <AddExpence/>
        {/* render AddExpence only when popup state is true */}
      </div>
    </>
  );
};

export default ExpenseMainApp;
