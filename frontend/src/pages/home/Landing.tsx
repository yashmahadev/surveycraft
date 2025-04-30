import { Hero } from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Landing() {
  return (
    <div>
      <Hero
        title="Create Engaging Surveys with SurveyCraft"
        subtitle="Survey Platform"
        description="The modern way to build, share, and analyze surveys. Get real-time insights from your audience and make data-driven decisions."
        primaryAction={{
          text: 'Get Started Free',
          href: '/register',
        }}
        secondaryAction={{
          text: 'View Templates',
          href: '/templates',
        }}
      />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Create Amazing Surveys
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Powerful features designed to help you build and distribute surveys with ease.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="card-hover">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-survey-purple/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-survey-purple"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <line x1="12" x2="12" y1="2" y2="6" />
                    <line x1="12" x2="12" y1="18" y2="22" />
                    <line x1="6" x2="6" y1="12" y2="12" />
                    <line x1="8" x2="8" y1="12" y2="12" />
                    <line x1="10" x2="10" y1="12" y2="12" />
                    <line x1="14" x2="14" y1="12" y2="12" />
                    <line x1="16" x2="16" y1="12" y2="12" />
                    <line x1="18" x2="18" y1="12" y2="12" />
                  </svg>
                </div>
                <CardTitle>Easy to Builder</CardTitle>
                <CardDescription>
                  Create professional surveys in minutes with our intuitive builder.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our easy-to-use interface lets you customize questions, add logic flows, and
                  design the perfect survey without any technical knowledge.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="card-hover">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-survey-purple/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-survey-purple"
                  >
                    <path d="M12 2v4" />
                    <path d="m16.24 7.76-2.12 2.12" />
                    <path d="m18 12 4 0" />
                    <path d="m16.24 16.24-2.12-2.12" />
                    <path d="m12 18-4 4" />
                    <path d="M8 18v-4" />
                    <path d="m7.76 7.76 2.12 2.12" />
                    <path d="m6 12 0 0" />
                    <path d="m7.76 16.24 2.12-2.12" />
                    <path d="m12 12 0 0" />
                  </svg>
                </div>
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>Get real-time insights from your responses.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualize data with automatic charts and graphs, track completion rates, and
                  export results in multiple formats.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="card-hover">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-survey-purple/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-survey-purple"
                  >
                    <path d="M13 20a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1H6v16h7z" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v8" />
                    <path d="M22 17v-1a2 2 0 0 0-2-2h-1" />
                    <path d="M20 17h-4c0 1.5 1.5 3 3 3s3-1.5 3-3v0" />
                  </svg>
                </div>
                <CardTitle>Multiple Question Types</CardTitle>
                <CardDescription>Choose from a variety of question formats.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create engaging surveys with multiple choice, rating scales, open-ended questions,
                  and more specialized formats.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-survey-purple/10 to-survey-blue/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start collecting valuable feedback?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of businesses using SurveyCraft to make better decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-medium">
                Start for Free
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                View Plans
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
