import { Line } from 'react-chartjs-2';

export default function LineChart() {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Crecimiento de Usuarios',
        data: [50, 200, 100, 400, 300, 500],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Crecimiento de Usuarios</h2>
      <Line data={data} />
    </div>
  );
};
