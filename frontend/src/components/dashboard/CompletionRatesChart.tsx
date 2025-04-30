import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { CompletionData } from '@/types/analytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface CompletionRatesProps {
  data: CompletionData[];
}

export function CompletionRatesChart({ data }: CompletionRatesProps) {
  return (
    <ChartContainer
      config={{
        bar: { theme: { light: '#D946EF', dark: '#D946EF' } },
      }}
    >
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis unit="%" />
        <ChartTooltip />
        <Bar dataKey="rate" fill="var(--color-bar)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
