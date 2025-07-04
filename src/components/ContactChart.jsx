import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function getMonthYear(dateStr) {
  if (!dateStr) return "Sin fecha";
  const date = new Date(dateStr);
  if (isNaN(date)) return "Sin fecha";
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
}

export default function ContactChart({ contacts = [] }) {
  // Agrupa por mes/año
  const months = {};
  contacts.forEach(c => {
    const key = getMonthYear(c.createdAt);
    months[key] = (months[key] || 0) + 1;
  });
  const labels = Object.keys(months);
  const dataArr = Object.values(months);

  const data = {
    labels,
    datasets: [{
      label: 'Contactos por mes',
      data: dataArr,
      backgroundColor: [
        'rgba(123,47,242,0.7)',
        'rgba(79,140,255,0.7)',
        'rgba(0,201,167,0.7)',
        'rgba(243,87,168,0.7)'
      ],
      borderRadius: 10,
      maxBarThickness: 48,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.parsed.y} contacto${ctx.parsed.y === 1 ? '' : 's'}`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: "#e0e7ff" } }
    }
  };

  const exportContacts = () => {
    const headers = ['Número', 'Tipo', 'País'];
    const rows = contacts.map(c => [c.numero, c.tipo, c.pais]);
    let csvContent = "data:text/csv;charset=utf-8,"
      + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contactos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="chart-container" style={{
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 24px #7b2ff222",
      padding: "2em 1.5em",
      margin: "2em auto",
      maxWidth: 600
    }}>
      <h3 style={{
        textAlign: "center",
        color: "#7b2ff2",
        fontWeight: 800,
        marginBottom: "1.2em"
      }}>Estadísticas de Contactos</h3>
      <Bar data={data} options={options} />
      <button
        className="button button-gradient"
        style={{
          margin: "2em auto 0 auto",
          display: "block",
          fontWeight: 700,
          fontSize: "1.1em"
        }}
        onClick={exportContacts}
      >
        Exportar contactos a CSV
      </button>
    </div>
  );
}