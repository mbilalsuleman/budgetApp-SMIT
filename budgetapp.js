// BUDGET VARIABLES
let budgetAmount = document.getElementById("budget-amount");
const budgetButton = document.getElementById("budget-button");
const budgetError = document.getElementById("budget-error");


// RESULT VARIABLES
let totalBudget = document.getElementById("total-budget");
let totalExpenses = document.getElementById("expenses");
const totalBalance = document.getElementById("balance");



// EXPENSE VARIABLES
let expenseAmount = document.getElementById("expense-amount");
let expenseDescription = document.getElementById("expense-description");
const expenseAmountError = document.getElementById("expense-amount-error");
let expenseCategory = document.getElementById("expense-category");
const expenseCategoryError = document.getElementById("category-error");
let paymentDate = document.getElementById("payment-date");
const paymentDateError = document.getElementById("payment-date-error");
const expenseButton = document.getElementById("expense-button");
let expenseContainer = document.getElementById("expense-list-container");

budgetButton.addEventListener("click", function () {
 if (budgetAmount.value === "" || budgetAmount.value < 0) {
   budgetError.classList.remove("hide");
 } else {
     budgetError.classList.add("hide");
     totalBudget.innerHTML = budgetAmount.value;
     totalBalance.innerHTML = totalBudget.innerHTML - totalExpenses.innerHTML;
     budgetAmount.value = "";
   }
 })
 
 
 let expenseValues = [];
 let expense1 = [];
 let expensesArray = [];

 const expenseForm = document.getElementById("add-expense-form");
 expenseForm.addEventListener("submit", addExpense);

 function addExpense(event) {
   event.preventDefault();

   const date = paymentDate.value;
   const title = expenseCategory.value;
   const description = expenseDescription.value;
   const amount = parseFloat(expenseAmount.value);

   if (amount <= 0 || amount > parseFloat(totalBudget.innerHTML)) {
    expenseAmountError.classList.remove("hide");
    return;
  }

   const expenseListing = {
     date,
     title,
     description,
     amount
   };
   
   expenseValues.push(expenseListing.amount);
   let total = expenseValues.reduce(function (p, c){return Number(p)+Number(c)}, 0);
   totalExpenses.innerText = total;
   let bal = Number(totalBudget.innerText) - Number(total);
   totalBalance.innerText = bal;
   
   expenseForm.reset();
   updateExpenseList();
   

   function editExpense(index) {
    const expenseListing = expensesArray[index];
 
    document.getElementById("payment-date").value = expenseListing.date;
    document.getElementById("expense-category").value = expenseListing.title;
    document.getElementById("expense-description").value = expenseListing.description;
    document.getElementById("expense-amount").value = expenseListing.amount;
    
    expenseValues.splice(index, 1);
    expensesArray.splice(index, 1);
 
    updateExpenseList();
  }
 

   expensesArray.push(expenseListing);
   expenseForm.reset();
   updateExpenseList();
 }

 function updateExpenseList() {
   expenseContainer.innerHTML = "";

   expensesArray.forEach(function(expenseListing, index) {
     const expenseItem = document.createElement("div");
     expenseItem.classList.add("expense-item");

     const expenseDetails = document.createElement("span");
     expenseDetails.innerHTML = `<strong>${expenseListing.date}</strong> - ${expenseListing.title} - ${expenseListing.description} - Rs.${expenseListing.amount}`;

     expenseDetails.classList.add("expense-details")
     
     let buttonWrapper = document.createElement("div");
     buttonWrapper.classList.add("buttonWrapper");
     const editButton = document.createElement("button");
     editButton.innerHTML = `<i class="fa-sharp fa-solid fa-pen-to-square"></i>`;
     editButton.classList.add("edit-button");
     editButton.addEventListener("click", function (){ editExpense(index);});

     const deleteButton = document.createElement("button");
     deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
     deleteButton.classList.add("delete-button");
     deleteButton.addEventListener('click', function () {deleteExpense(index)});

     let list = document.createElement("div");
     list.classList.add("list");
     list.appendChild(expenseDetails);
     list.appendChild(buttonWrapper);


     buttonWrapper.appendChild(editButton);
     buttonWrapper.appendChild(deleteButton);
     expenseItem.appendChild(expenseDetails);
     expenseItem.appendChild(buttonWrapper);
     expenseContainer.appendChild(expenseItem);
     expenseContainer.appendChild(list);
   });
 }

 function editExpense(index) {
   const expenseListing = expensesArray[index];

   document.getElementById("payment-date").value = expenseListing.date;
   document.getElementById("expense-category").value = expenseListing.title;
   document.getElementById("expense-description").value = expenseListing.description;
   document.getElementById("expense-amount").value = expenseListing.amount;
   
   expenseValues.splice(index, 1);
   expensesArray.splice(index, 1);

   updateExpenseList();
 }

 function deleteExpense(index) {
  const deletedExpense = expensesArray[index];
  const deletedAmount = deletedExpense.amount;
  expensesArray.splice(index, 1);

  let total = expenseValues.reduce(function (p, c) {
    return Number(p) + Number(c);
  }, 0);
  total -= deletedAmount;
  totalExpenses.innerText = total;

  updateExpenseList();
}

