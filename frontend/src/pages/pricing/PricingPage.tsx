import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Create up to 3 surveys',
      '100 responses per survey',
      'Basic analytics',
      'Email support',
    ],
    buttonText: 'Get Started',
    href: '/register',
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'Ideal for growing businesses',
    popular: true,
    features: [
      'Unlimited surveys',
      'Unlimited responses',
      'Advanced analytics',
      'Custom branding',
      'Priority support',
      'Export to Excel/CSV',
    ],
    buttonText: 'Start Free Trial',
    href: '/register',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'Team collaboration',
      'Custom analytics',
    ],
    buttonText: 'Contact Sales',
    href: '/contact',
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">Choose the plan that's right for you</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingPlans.map(plan => (
          <Card
            key={plan.name}
            className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
                {plan.popular && <Badge className="bg-primary hover:bg-primary">Popular</Badge>}
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                <a href={plan.href}>{plan.buttonText}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
