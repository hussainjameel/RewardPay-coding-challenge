const fs = require('fs');

const dataFile = require('./data.json');
// console.log(dataFile);

const records = dataFile.data;

const calculateRevenue = (data) => {
    return data
        .filter(item => item.account_category === 'revenue')
        .reduce((sum, item) => sum + item.total_value, 0); 
}

const calculateExpenses = (data) => {
    return data
        .filter(item => item.account_category === 'expense')
        .reduce((sum, item) => sum + item.total_value, 0); 
}

const calculateGrossProfitMargin = (data, revenue) => {
    const sales = data
      .filter(item => item.account_type === 'sales' && item.value_type === 'debit')
      .reduce((sum, item) => sum + item.total_value, 0); 
    return ((sales / revenue) * 100).toFixed(1);
  };

const calculateNetProfitMargin = (revenue, expenses) => {
    return (((revenue - expenses) / revenue) * 100).toFixed(1);
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
  
    return ((assets / liabilities) * 100).toFixed(1);
  };

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-AU', { 
        style: 'currency', 
        currency: 'AUD', 
        maximumFractionDigits: 0 
    }).format(value);
};
  
const revenue = calculateRevenue(records);
const expenses = calculateExpenses(records);
const grossProfitMargin = calculateGrossProfitMargin(records, revenue);
const netProfitMargin = calculateNetProfitMargin(revenue, expenses);
const workingCapitalRatio = calculateWorkingCapitalRatio(records);

console.log(`Revenue: ${formatCurrency(revenue)}`);
console.log(`Expenses: ${formatCurrency(expenses)}`);
console.log(`Gross Profit Margin: ${grossProfitMargin}%`);
console.log(`Net Profit Margin: ${netProfitMargin}%`);
console.log(`Working Capital Ratio: ${workingCapitalRatio}%`);

module.exports = {
    calculateRevenue,
    calculateExpenses,
    calculateGrossProfitMargin,
    calculateNetProfitMargin,
    calculateWorkingCapitalRatio
  };