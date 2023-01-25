window.addEventListener('DOMContentLoaded', function() {    // This seems to listen for when the page has been loaded. When it loads, the function is executed.
    const form = document.getElementById("calc-form"); // creates the variable form which will be the calc-form when it is called. 
    if (form) { 
      setupIntialValues(); 
      form.addEventListener("submit", function(e) { 
        e.preventDefault(); 
      });
    }
  });
  
  function getCurrentUIValues() { // This function gathers the values for amount, years, and rates.
    return {
      amount: +(document.getElementById("loan-amount").value),
      years: +(document.getElementById("loan-years").value),
      rate: +(document.getElementById("loan-rate").value),
    }
  }
  
  function setupIntialValues() {
    const values  = { amount: 10000, years: 10, rate: 4.5 };
    const amountUI = document.getElementById("loan-amount");
    amountUI.value = values.amount; // takes the values from amountUI and sets it equal to values in the amount variable
    const yearsUI = document.getElementById("loan-years"); 
    yearsUI.value = values.years; // does the same for the years
    const rateUI = document.getElementById("loan-rate");
    rateUI.value = values.rate; // does the same for the rate
    update();
  }
  
  function update() {
    const currentUIValues = getCurrentUIValues();
    updateMonthly(calculateMonthlyPayment(currentUIValues));
  }
  
  function calculateMonthlyPayment(values) {
    const monthlyRate = (values.rate / 100) / 12;
    const n = Math.floor(values.years * 12);
    return (
      (monthlyRate * values.amount) /
      (1 - Math.pow((1 + monthlyRate), -n)) // .pow returns the base to the exponent power, as in base^exponent.
    ).toFixed(2); // .toFixed method converts a number to a string and also rounds the string to a specified number of decimals.
  }
  
  function updateMonthly(monthly) {
    const monthlyUI = document.getElementById("monthly-payment");
    monthlyUI.innerText = "$" + monthly;
  }