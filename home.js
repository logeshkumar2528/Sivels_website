const tabs = [...document.querySelectorAll('.h-finder-tabs [role="tab"]')];

const selectTab = (tab, focus) => {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab, false));
  tab.addEventListener('keydown', event => {
    const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (event.key in moves) {
      event.preventDefault();
      selectTab(tabs[(index + moves[event.key] + tabs.length) % tabs.length], true);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      selectTab(tabs[event.key === 'Home' ? 0 : tabs.length - 1], true);
    }
  });
});

const calc = document.getElementById('emi-calc');
if (calc) {
  const amount = document.getElementById('emi-amount');
  const rate = document.getElementById('emi-rate');
  const years = document.getElementById('emi-years');
  const inr = value => '₹' + Math.round(value).toLocaleString('en-IN');
  const setText = (id, text) => { document.getElementById(id).textContent = text; };
  const paintTrack = input => {
    const fill = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--fill', `${fill}%`);
  };

  const update = () => {
    const principal = Number(amount.value);
    const monthlyRate = Number(rate.value) / 12 / 100;
    const months = Number(years.value) * 12;
    const growth = Math.pow(1 + monthlyRate, months);
    const emi = monthlyRate ? (principal * monthlyRate * growth) / (growth - 1) : principal / months;
    const total = emi * months;

    setText('emi-amount-out', inr(principal));
    setText('emi-rate-out', `${Number(rate.value)}%`);
    setText('emi-years-out', `${years.value} ${years.value === '1' ? 'year' : 'years'}`);
    setText('emi-value', inr(emi));
    setText('emi-principal', inr(principal));
    setText('emi-interest', inr(total - principal));
    setText('emi-total', inr(total));
    document.getElementById('emi-donut').style.setProperty('--principal', `${(principal / total) * 100}%`);
    [amount, rate, years].forEach(paintTrack);
  };

  calc.addEventListener('input', update);
  calc.addEventListener('submit', event => event.preventDefault());
  update();
}
