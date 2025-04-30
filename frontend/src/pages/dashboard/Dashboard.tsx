import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { PopularSurveysList } from '@/components/dashboard/PopularSurveysList';
import { RecentResponsesList } from '@/components/dashboard/RecentResponsesList';
import { ResponseTrends } from '@/components/dashboard/ResponseTrends';
import { CompletionRatesChart } from '@/components/dashboard/CompletionRatesChart';
import { DeviceDistribution } from '@/components/dashboard/DeviceDistribution';
import {
  FileBarChart,
  Users,
  CheckSquare,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/services/api';

interface DashboardData {
  totalSurveys: number;
  activeSurveys: number;
  totalResponses: number;
  responseRate: number;
  recentResponses: {
    id: number;
    surveyName: string;
    date: string;
  }[];
  popularSurveys: {
    id: number;
    name: string;
    responses: number;
    completionRate: number;
  }[];
  monthlyResponses: {
    date: string;
    responses: number;
  }[];
  completionRates: {
    name: string;
    rate: number;
  }[];
  deviceDistribution: {
    device: string;
    count: number;
  }[];
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard/main-dashboard');
        console.log('response => ', response);
        setDashboardData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-4 w-[150px] mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your surveys and responses.</p>
        </div>

        {activeTab === 'analytics' && (
          <div className="flex space-x-2">
            <Button
              variant={dateRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('week')}
            >
              Weekly
            </Button>
            <Button
              variant={dateRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('month')}
            >
              Monthly
            </Button>
            <Button
              variant={dateRange === 'year' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('year')}
            >
              Yearly
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-1 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
          {/* <TabsTrigger value="responses">Responses</TabsTrigger> */}
          {/* <TabsTrigger value="surveys">Surveys</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Surveys"
              value={dashboardData.totalSurveys}
              description={`${dashboardData.activeSurveys} active`}
              icon={FileBarChart}
            />
            <StatCard
              title="Total Responses"
              value={dashboardData.totalResponses}
              description="Total responses from all surveys"
              icon={Users}
            />
            <StatCard
              title="Average Response Rate"
              value={`${dashboardData.responseRate}%`}
              description="Average response rate from all surveys"
              icon={TrendingUp}
            />
            <StatCard
              title="Completion Rate"
              value="N/A"
              description="Average completion rate from all surveys"
              icon={CheckSquare}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <PopularSurveysList surveys={dashboardData.popularSurveys} />
            <RecentResponsesList responses={dashboardData.recentResponses} />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-3 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-survey-purple" />
                      Response Trends
                    </CardTitle>
                    <CardDescription>Monthly survey response volume</CardDescription>
                  </div>
                  <div className="px-1.5 py-0.5 rounded bg-survey-purple/10 text-survey-purple text-xs font-medium">
                    {dateRange === 'week'
                      ? 'Last 7 days'
                      : dateRange === 'month'
                        ? 'Last 30 days'
                        : 'Last 12 months'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[320px]">
                  <ResponseTrends data={dashboardData.monthlyResponses} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-survey-purple" />
                  Completion Rates
                </CardTitle>
                <CardDescription>By survey type</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[300px]">
                  <CompletionRatesChart data={dashboardData.completionRates} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-survey-purple" />
                  Device Distribution
                </CardTitle>
                <CardDescription>Responses by device type</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[300px]">
                  <DeviceDistribution data={dashboardData.deviceDistribution} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Response Analytics</CardTitle>
              <CardDescription>Detailed response data will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                Response charts and analytics will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surveys" className="space-y-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Survey Overview</CardTitle>
              <CardDescription>A summary of all your surveys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                Survey metrics and comparison charts will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
