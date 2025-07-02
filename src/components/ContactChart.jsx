import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function getMonthYear(dateStr) {
  const date = new Date(dateStr);
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
}

export default function ContactChart({ contacts }) {
  // Agrupa por mes/año
  const months = {};
  contacts.forEach(c => {
    const key = getMonthYear(c.createdAt || new Date());
    months[key] = (months[key] || 0) + 1;
  });
  const labels = Object.keys(months);
  const dataArr = Object.values(months);

  const data = {
    labels,
    datasets: [{
      label: 'Contactos por mes',
      data: dataArr,
      backgroundColor: 'rgba(123,47,242,0.7)',
      borderRadius: 8,
    }]
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
}