const { calculateRevenue, calculateExpenses, calculateGrossProfitMargin, calculateNetProfitMargin, calculateWorkingCapitalRatio } = require('../index');

describe('Financial Calculations', () => {
  // Test for calculateRevenue
  test('calculateRevenue should return the correct sum', () => {
    const mockData = [
      { account_category: 'revenue', total_value: 1000 },
      { account_category: 'revenue', total_value: 500 },
      { account_category: 'revenue', total_value: 1500 }
    ];
    expect(calculateRevenue(mockData)).toBe(3000);
  });

  // Test for calculateExpenses
  test('calculateExpenses should return the correct sum', () => {
    const mockData = [
      { account_category: 'expense', total_value: 500 },
      { account_category: 'expense', total_value: 1000 },
      { account_category: 'expense', total_value: 1500 }
    ];
    expect(calculateExpenses(mockData)).toBe(3000);
  });

  // Test for calculateGrossProfitMargin
  test('calculateGrossProfitMargin should return correct percentage', () => {
    const mockData = [
      { account_type: 'sales', value_type: 'debit', total_value: 2000 },
      { account_type: 'sales', value_type: 'debit', total_value: 1000 }
    ];
    const revenue = 5000;
    expect(calculateGrossProfitMargin(mockData, revenue)).toBe('60.0');
  });

  // Test for calculateNetProfitMargin
  test('calculateNetProfitMargin should return correct percentage', () => {
    const revenue = 5000;
    const expenses = 3000;
    expect(calculateNetProfitMargin(revenue, expenses)).toBe('40.0');
  });

  // Test for calculateWorkingCapitalRatio
  test('calculateWorkingCapitalRatio should return correct percentage', () => {
    const mockData = [
      { account_category: 'assets', account_type: 'current', value_type: 'debit', total_value: 4000 },
      { account_category: 'assets', account_type: 'bank', value_type: 'debit', total_value: 2000 },
      { account_category: 'liability', account_type: 'current', value_type: 'credit', total_value: 3000 }
    ];
    expect(calculateWorkingCapitalRatio(mockData)).toBe('200.0');
  });
});
