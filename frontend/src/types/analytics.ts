export interface ResponseData {
  date: string;
  responses: number;
}

export interface CompletionData {
  name: string;
  rate: number;
}

export interface ResponsesByDeviceData {
  device: string;
  count: number;
}

// Sample data (in production this would come from your backend)
export const analyticsData = {
  monthlyResponses: [
    { date: '2025-01', responses: 65 },
    { date: '2025-02', responses: 85 },
    { date: '2025-03', responses: 120 },
    { date: '2025-04', responses: 145 },
  ] as ResponseData[],

  completionRates: [
    { name: 'Customer Feedback', rate: 75 },
    { name: 'Employee Survey', rate: 82 },
    { name: 'Market Research', rate: 68 },
    { name: 'Product Survey', rate: 90 },
  ] as CompletionData[],

  deviceDistribution: [
    { device: 'Desktop', count: 245 },
    { device: 'Mobile', count: 156 },
    { device: 'Tablet', count: 26 },
  ] as ResponsesByDeviceData[],
};
