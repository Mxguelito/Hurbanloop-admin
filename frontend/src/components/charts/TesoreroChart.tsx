import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  data: { nombre: string; valor: number }[];
};

export default function TesoreroChart({ data }: Props) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
      <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Comparativo mensual
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="nombre" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="valor" fill="#a855f7" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
