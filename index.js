const fs = require('fs');

const dataFile = require('./data.json');
console.log(dataFile);

const records = dataFile.data;

const calculateRevenue = (data) => {
  const revenue = data
    .filter(item => item.account_category === 'revenue')
    .reduce((sum, item) => sum + item.total_value, 0);
  console.log("Revenue: ", revenue)  
}

calculateRevenue(records)