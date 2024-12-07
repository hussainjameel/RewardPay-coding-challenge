const fs = require('fs');

const dataFile = require('./data.json');
// console.log(dataFile);

const records = dataFile.data;

const calculateRevenue = (data) => {
  const revenue = data
    .filter(item => item.account_category === 'revenue')
    .reduce((sum, item) => sum + item.total_value, 0);
  console.log("Revenue: ", revenue) 
  return revenue; 
}

const calculateExpenses = (data) => {
  const expenses = data
    .filter(item => item.account_category === 'expense')
    .reduce((sum, item) => sum + item.total_value, 0);
  console.log("Expenses", expenses)  
}

const calculateGrossProfitMargin = (data, revenue) => {
    const sales = data
      .filter(item => item.account_type === 'sales' && item.value_type === 'debit')
      .reduce((sum, item) => sum + item.total_value, 0); 
    // console.log("Inside calculateGrossProfitMargin() Sales:", sales) ;
    // console.log("Inside calculateGrossProfitMargin() revenue:", revenue); 
    const gpm = ((sales / revenue) * 100).toFixed(1);
    console.log("Gross Profit Margin:" , gpm)
  };


calculateRevenue(records)
calculateExpenses(records)

const revenue = calculateRevenue(records) 
calculateGrossProfitMargin(records, revenue) 
