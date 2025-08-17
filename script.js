function calculateEMI(principal, rate, tenure) {
  let monthlyRate = rate / (12 * 100);
  let months = tenure * 12;
  if (monthlyRate === 0) {
    return (principal / months).toFixed(2);
  }
  let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
  return emi.toFixed(2);
}

const loanType = document.getElementById('loanType');
const tenure = document.getElementById('tenure');

// Helper to populate tenure options
function populateTenureOptions(type) {
  tenure.innerHTML = '';
  if (type === 'Home Loan') {
    for (let y = 1; y <= 30; y++) {
      const opt = document.createElement('option');
      opt.value = (y * 12).toString();
      opt.textContent = `${y} Year${y > 1 ? 's' : ''}`;
      tenure.appendChild(opt);
    }
  } else {
    const months = [3, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60];
    months.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.toString();
      opt.textContent = `${m} Month${m > 1 ? 's' : ''}`;
      tenure.appendChild(opt);
    });
  }
}

// Initial population
populateTenureOptions(loanType.value);

// Update on loan type change
loanType.addEventListener('change', e => {
  populateTenureOptions(e.target.value);
});

// Update interest rate input to allow decimals
document.getElementById('rate').setAttribute('step', '0.01');
document.getElementById('rate').setAttribute('min', '0');

// Calculation logic (unchanged, but tenure is now always in months)
document.getElementById('loanForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const n = parseInt(tenure.value);

  const monthlyRate = rate / 12 / 100;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
              (Math.pow(1 + monthlyRate, n) - 1);

  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  document.getElementById('result').innerHTML = `
    <strong>EMI:</strong> ₹${emi.toFixed(2)}<br>
    <strong>Total Interest:</strong> ₹${totalInterest.toFixed(2)}<br>
    <strong>Total Payment:</strong> ₹${totalPayment.toFixed(2)}
  `;
});
