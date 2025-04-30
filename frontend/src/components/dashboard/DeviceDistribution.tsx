import { ChartContainer, ChartTooltip, ChartLegend } from '@/components/ui/chart';
import { ResponsesByDeviceData } from '@/types/analytics';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DeviceDistributionProps {
  data: ResponsesByDeviceData[];
}

const COLORS = ['#8B5CF6', '#D946EF', '#F97316'];

export function DeviceDistribution({ data }: DeviceDistributionProps) {
  return (
    <ChartContainer config={{}}>
      <PieChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <ChartTooltip />
        <Pie
          data={data}
          dataKey="count"
          nameKey="device"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          paddingAngle={2}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartLegend verticalAlign="bottom" />
      </PieChart>
    </ChartContainer>
  );
}
