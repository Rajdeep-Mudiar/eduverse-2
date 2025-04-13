
import { CheckIcon, HelpCircleIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PlanFeatureProps {
  feature: string;
  included?: boolean;
  tooltip?: string;
}

export const PlanFeature = ({ feature, included = true, tooltip }: PlanFeatureProps) => (
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

interface PricingCardProps {
  name: string;
  description: string;
  price: string | number;
  cycle?: string;
  features: string[];
  tooltips?: (string | undefined)[];
  ctaText: string;
  popular?: boolean;
  badge?: string | null;
  onSubscribe?: () => void;
}

const PricingCard = ({
  name,
  description,
  price,
  cycle,
  features,
  tooltips = [],
  ctaText,
  popular = false,
  badge = null,
  onSubscribe
}: PricingCardProps) => {
  return (
    <Card
      className={`relative overflow-hidden transition-all hover:shadow-lg ${
        popular ? "border-eduverse-purple shadow-md dark:border-purple-700" : ""
      }`}
    >
      {badge && (
        <Badge
          className={`absolute top-4 right-4 ${
            badge === "Popular"
              ? "bg-eduverse-purple hover:bg-purple-700"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {badge}
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="h-12">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className="text-4xl font-bold">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</span>
          {price !== 'Free' && cycle && (
            <span className="text-gray-500 dark:text-gray-400 ml-1">/{cycle}</span>
          )}
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <PlanFeature
              key={feature}
              feature={feature}
              tooltip={tooltips[index] || undefined}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSubscribe}
          className={`w-full ${
            popular
              ? "bg-eduverse-purple hover:bg-purple-700"
              : price === 'Free'
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              : ""
          }`}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
