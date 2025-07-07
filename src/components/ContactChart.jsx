import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ContactChart = ({ contacts }) => {
  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  };

  const data = {
    labels: contacts.map((contact) => getMonthYear(contact.createdAt)),
    datasets: [
      {
        label: 'Contactos por mes',
        data: contacts.map((contact) => 1),
        backgroundColor: [
          'rgba(123,47,242,0.7)',
          'rgba(79,140,255,0.7)',
          'rgba(0,201,167,0.7)',
          'rgba(243,87,168,0.7)',
        ],
        borderRadius: 10,
        maxBarThickness: 48,
      },
    ],
  };

  return (
    <div id="contact-chart">
      <Bar data={data} />
    </div>
  );
};

export default ContactChart;