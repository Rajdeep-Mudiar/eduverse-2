
import { useState } from "react";
import { CheckIcon, HelpCircleIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";

const PlanFeature = ({ feature, included = true, tooltip }: { feature: string; included?: boolean; tooltip?: string }) => (
  <div className="flex items-center mb-2">
    {included ? (
      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
    ) : (
      <div className="h-5 w-5 border border-gray-300 rounded-full mr-2 flex-shrink-0" />
    )}
    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
    {tooltip && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircleIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="w-64 text-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </div>
);

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const discount = 20; // 20% discount for annual billing

  const plans = [
    {
      name: "Free",
      description: "Basic learning essentials for beginners",
      monthlyPrice: 0,
      features: [
        "Access to basic courses",
        "Quiz challenges (limited)",
        "Community forum access",
        "AI Tutor (3 questions/day)",
        "Smart Notes (basic)",
      ],
      tooltips: [
        "",
        "",
        "",
        "Limited to 3 questions per day",
        "Basic functionality without audio transcription"
      ],
      cta: "Get Started",
      popular: false,
      badge: null,
    },
    {
      name: "Plus",
      description: "Enhanced learning experience for dedicated students",
      monthlyPrice: 9.99,
      features: [
        "Everything in Free",
        "Full access to all courses",
        "Unlimited quiz challenges",
        "AI Tutor (unlimited)",
        "Audio learning features",
        "Smart Notes with transcription",
      ],
      tooltips: [
        "",
        "Access our entire catalog of courses",
        "",
        "No daily limit on AI tutor interactions",
        "Text-to-speech functionality",
        "Audio transcription included"
      ],
      cta: "Subscribe",
      popular: true,
      badge: "Popular",
    },
    {
      name: "Premium",
      description: "Complete learning toolkit for serious students",
      monthlyPrice: 19.99,
      features: [
        "Everything in Plus",
        "Live webinar access",
        "1-on-1 tutoring sessions",
        "Career development tools",
        "Coding labs (advanced)",
        "Certificate of completion",
      ],
      tooltips: [
        "",
        "Join interactive webinars with industry experts",
        "30 minutes per month with a professional tutor",
        "Resume builder, interview prep",
        "Advanced coding exercises with feedback",
        "Shareable certificates for completed courses"
      ],
      cta: "Subscribe",
      popular: false,
      badge: null,
    },
    {
      name: "Gold",
      description: "Ultimate learning experience with exclusive benefits",
      monthlyPrice: 49.99,
      features: [
        "Everything in Premium",
        "Priority support",
        "Group tutoring sessions",
        "Custom learning path",
        "White-labeled certificates",
        "Early access to new courses",
      ],
      tooltips: [
        "",
        "24/7 priority customer support",
        "Weekly group sessions with experts",
        "Personalized learning roadmap",
        "Certificates with your branding",
        "Get access to new courses before anyone else"
      ],
      cta: "Subscribe",
      popular: false,
      badge: "Best Value",
    },
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Invest in your education with our flexible subscription plans
          </p>
          
          <div className="flex items-center justify-center mt-8 mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <div className="flex items-center">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annually")}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "annually"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Annually
                  <span className="ml-1 py-0.5 px-1.5 text-xs bg-green-100 text-green-700 rounded-full">
                    Save {discount}%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            // Calculate price based on billing cycle
            const price =
              billingCycle === "annually"
                ? (plan.monthlyPrice * (100 - discount)) / 100
                : plan.monthlyPrice;
            
            // Format price for display
            const formattedPrice = price === 0 ? "Free" : `$${price.toFixed(2)}`;
            
            return (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all hover:shadow-lg ${
                  plan.popular
                    ? "border-eduverse-purple shadow-md dark:border-purple-700"
                    : ""
                }`}
              >
                {plan.badge && (
                  <Badge
                    className={`absolute top-4 right-4 ${
                      plan.badge === "Popular"
                        ? "bg-eduverse-purple hover:bg-purple-700"
                        : "bg-amber-500 hover:bg-amber-600"
                    }`}
                  >
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="h-12">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{formattedPrice}</span>
                    {price > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <PlanFeature
                        key={feature}
                        feature={feature}
                        tooltip={plan.tooltips[index] || undefined}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-eduverse-purple hover:bg-purple-700"
                        : price === 0
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        : ""
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "Is there a student discount?",
                a: "Yes, students with a valid .edu email address receive an additional 15% off any paid plan."
              },
              {
                q: "How do refunds work?",
                a: "We offer a 14-day money-back guarantee if you're not satisfied with your subscription."
              },
              {
                q: "Can I share my account?",
                a: "No, our subscriptions are for individual use only. We offer special team and family plans for multiple users."
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Pricing;
