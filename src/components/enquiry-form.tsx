"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  ship: z.string().min(3, "Please enter a valid ship name."),
  departureDates: z.string().min(1, "Please enter your desired departure dates."),
  destination: z.string().min(3, "Please enter your desired destination."),
});

export type EnquiryFormValues = z.infer<typeof formSchema>;

interface EnquiryFormProps {
  onSubmit: (data: EnquiryFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
  initialData?: Partial<EnquiryFormValues>;
}

export function EnquiryForm({ onSubmit, isLoading, serverError, initialData }: EnquiryFormProps) {
  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      ship: initialData?.ship || "",
      departureDates: initialData?.departureDates || "",
      destination: initialData?.destination || "",
    },
  });

  return (
    <Card className="w-full border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Request a Quote</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you with a personalized cruise quote.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="ship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cruise Ship</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Symphony of the Seas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Caribbean, Alaska, Mediterranean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departureDates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Dates</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Summer 2025, December 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {serverError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Submission Failed</AlertTitle>
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground text-base font-bold hover:bg-accent/90" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting..." : "Get My Quote"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
