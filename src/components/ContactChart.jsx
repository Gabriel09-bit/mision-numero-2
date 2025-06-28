import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ContactChart({ contacts }) {
  const total = contacts.length;
  const withEmail = contacts.filter(c => c.email).length;
  const withPhone = contacts.filter(c => c.phone).length;

  const data = {
    labels: ['Total', 'Con Email', 'Con Teléfono'],
    datasets: [
      {
        label: 'Contactos',
        data: [total, withEmail, withPhone],
        backgroundColor: [
          'rgba(123,47,242,0.7)',
          'rgba(79,140,255,0.7)',
          'rgba(0,201,167,0.7)'
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2em auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}