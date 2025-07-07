import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ContactChart = ({ contacts = [] }) => {
  if (!contacts.length) {
    return <div id="contact-chart" style={{ textAlign: 'center', color: '#888', margin: '2em 0' }}>No hay datos para graficar.</div>;
  }
  const getMonthYear = (dateStr) => {
    if (!dateStr) return 'Sin fecha';
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  };

  const grouped = contacts.reduce((acc, contact) => {
    const key = getMonthYear(contact.createdAt);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: 'Contactos por mes',
        data: Object.values(grouped),
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

ContactChart.propTypes = {
  contacts: PropTypes.array
};

export default ContactChart;