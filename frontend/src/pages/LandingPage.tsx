import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Create Beautiful Surveys with Ease
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          SurveyCraft helps you create, manage, and analyze surveys with a simple and intuitive
          interface.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SurveyCraft?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Create surveys in minutes with our intuitive builder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Easy interface makes survey creation a breeze. No technical skills required.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Powerful Analytics</CardTitle>
              <CardDescription>Get insights from your survey responses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Visualize your data with beautiful charts and export results in multiple formats.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customizable</CardTitle>
              <CardDescription>Make your surveys look exactly how you want</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Choose from multiple themes and customize every aspect of your survey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your First Survey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who trust SurveyCraft for their survey needs.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Start Creating Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
