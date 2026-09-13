function yen(n){return new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(n)}
function calc(){const m=+document.querySelector('#cMonthly').value||0,s=+document.querySelector('#cSetup').value||0,p=+document.querySelector('#cPost').value||0;document.querySelector('#cResult').textContent=yen(m*12+s+p*12)}
