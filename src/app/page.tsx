"use client";

import { useState } from "react";
import type { SuggestAlternativeCruisesOutput } from "@/ai/flows/suggest-alternative-cruises";
import { EnquiryForm } from "@/components/enquiry-form";
import { CruiseSuggestions } from "@/components/cruise-suggestions";
import { submitEnquiry } from "@/app/actions";
import { Anchor, Ship } from "lucide-react";
import Image from "next/image";
import { type z } from "zod";
import type { EnquiryFormValues } from "@/components/enquiry-form";

export default function LandingPage() {
  const [submissionState, setSubmissionState] = useState<SuggestAlternativeCruisesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: EnquiryFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await submitEnquiry(data);
      if (result.success && result.suggestions) {
        setSubmissionState({ suggestions: result.suggestions });
      } else {
        setError(result.error || "An unexpected error occurred. Please try again.");
      }
    } catch (e) {
      setError("A server error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-background text-foreground">
      <main className="w-full max-w-4xl mx-auto p-4 md:p-8 flex-grow">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-2">
            <Anchor className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary/90">
              Get That Cruise
            </h1>
            <Ship className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <p className="font-body text-lg text-muted-foreground">
            Your dream voyage is just an enquiry away.
          </p>
        </header>

        <div className="relative w-full h-56 md:h-80 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 mb-8">
            <Image
                src="/Cruise.png"
                alt="Beautiful cruise ship on the ocean"
                data-ai-hint="cruise ship ocean"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="w-full max-w-2xl mx-auto">
          {submissionState ? (
            <CruiseSuggestions suggestions={submissionState.suggestions} />
          ) : (
            <EnquiryForm onSubmit={handleFormSubmit} isLoading={isLoading} serverError={error} />
          )}
        </div>
      </main>
      <footer className="w-full text-center p-4">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Get That Cruise. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
