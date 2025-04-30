import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { ResponseData } from '@/types/analytics';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ResponseTrendsProps {
  data: ResponseData[];
}

export function ResponseTrends({ data }: ResponseTrendsProps) {
  return (
    <ChartContainer
      config={{
        area: { theme: { light: '#8B5CF6', dark: '#8B5CF6' } },
      }}
    >
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip />
        <Area
          type="monotone"
          dataKey="responses"
          stroke="var(--color-area)"
          fill="var(--color-area)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
