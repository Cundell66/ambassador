import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Compass, Sailboat } from "lucide-react";

interface CruiseSuggestionsProps {
  suggestions: string[];
}

export function CruiseSuggestions({ suggestions }: CruiseSuggestionsProps) {
  return (
    <div className="text-center animate-in fade-in-0 zoom-in-95 duration-500">
      <Card className="w-full border-green-500/30 shadow-lg">
        <CardHeader className="items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <CardTitle className="font-headline text-3xl">Enquiry Sent!</CardTitle>
          <CardDescription className="max-w-md">
            Thank you for your enquiry. We'll be in touch shortly with your personalized quote. For urgent queries, please contact admin@getthatcruise.co.uk.
          </CardDescription>
        </CardHeader>
        {suggestions && suggestions.length > 0 && (
          <CardContent className="pt-0">
            <div className="border-t pt-6 mt-2">
              <h3 className="font-headline text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Compass className="w-6 h-6 text-primary" />
                In the meantime, how about these?
              </h3>
              <ul className="space-y-3 text-left max-w-lg mx-auto">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start p-4 rounded-lg bg-secondary transition-colors hover:bg-secondary/80">
                    <Sailboat className="w-5 h-5 text-primary mr-4 mt-1 shrink-0" />
                    <p className="font-body text-secondary-foreground">{suggestion}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Let us know if any of these catch your eye when we contact you!
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
