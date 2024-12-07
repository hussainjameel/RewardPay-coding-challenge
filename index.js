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
  return expenses;  
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

const calculateNetProfitMargin = (revenue, expenses) => {
    const npm = (((revenue - expenses) / revenue) * 100).toFixed(1);
    console.log("Net Profit Margin:" , npm)
}
  
  const calculateWorkingCapitalRatio = (data) => {
    const assets = data
        .filter(item =>
            item.account_category === 'assets' &&
            ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type) &&
             item.value_type === 'debit'
        )
        .reduce((sum, item) => sum + item.total_value, 0);
  
    const liabilities = data
      .filter(item =>
        item.account_category === 'liability' &&
        ['current', 'current_accounts_payable'].includes(item.account_type) &&
        item.value_type === 'credit'
      )
      .reduce((sum, item) => sum + item.total_value, 0);
  
    const wcr = ((assets / liabilities) * 100).toFixed(1);
    console.log("Working Ratio Capital:", wcr)
  };

calculateRevenue(records)
calculateExpenses(records)

const revenue = calculateRevenue(records) 
const expenses = calculateExpenses(records)
calculateGrossProfitMargin(records, revenue) 
calculateNetProfitMargin(revenue, expenses)
calculateWorkingCapitalRatio(records);