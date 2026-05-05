const form = document.getElementById('calcForm');
if (form) {
  const results = document.getElementById('results');
  const error = document.getElementById('error');
  const fmt = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);

  document.getElementById('calcBtn').addEventListener('click', () => {
    const data = Object.fromEntries(new FormData(form).entries());
    const vals = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, Number(v)]));
    if (Object.values(vals).some((v) => Number.isNaN(v) || v <= 0)) {
      error.textContent = 'Preencha todos os campos com valores maiores que zero.';
      results.innerHTML = '';
      return;
    }
    error.textContent = '';
    const totalCost = vals.fuel + vals.maint + vals.wash + vals.food + vals.park + vals.ins + vals.ipva + vals.car;
    const profit = vals.gross - totalCost;
    const costKm = totalCost / vals.km;
    const profitKm = profit / vals.km;
    const profitDay = profit / vals.days;
    const profitHour = profit / vals.hours;
    const pct = (totalCost / vals.gross) * 100;
    const nextGoal = Math.max(vals.gross * 1.05, totalCost * 1.3) / vals.days;
    const alert = pct > 70 ? 'Alerta: seus custos estão muito altos. Revise combustível, alimentação e corridas pouco lucrativas.' : 'Custos sob controle. Continue acompanhando para proteger seu lucro.';

    const items = [
      ['Lucro líquido do mês', fmt(profit)], ['Custo total do mês', fmt(totalCost)],
      ['Custo por km', fmt(costKm)], ['Lucro por km', fmt(profitKm)],
      ['Lucro por dia', fmt(profitDay)], ['Lucro por hora', fmt(profitHour)],
      ['% do faturamento consumido', `${pct.toFixed(1)}%`], ['Meta diária sugerida (próximo mês)', fmt(nextGoal)], ['Diagnóstico', alert]
    ];
    results.innerHTML = items.map(([k, v]) => `<div class='result-card'><strong>${k}</strong><p>${v}</p></div>`).join('');
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    form.reset();
    results.innerHTML = '';
    error.textContent = '';
  });
}
