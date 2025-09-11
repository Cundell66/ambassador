"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { SuggestAlternativeCruisesOutput } from "@/ai/flows/suggest-alternative-cruises";
import { EnquiryForm } from "@/components/enquiry-form";
import { CruiseSuggestions } from "@/components/cruise-suggestions";
import { submitEnquiry } from "@/app/actions";
import { Anchor, Ship } from "lucide-react";
import type { EnquiryFormValues } from "@/components/enquiry-form";
import { OfferCard, type CruiseOffer } from "@/components/offer-card";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { InclusionsSection } from "./inclusions-section";

interface LandingPageClientProps {
    cruiseOffers: CruiseOffer[];
    faqItems: FaqItem[];
}

export function LandingPageClient({ cruiseOffers, faqItems }: LandingPageClientProps) {
  const [submissionState, setSubmissionState] = useState<SuggestAlternativeCruisesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Partial<EnquiryFormValues> | undefined>(undefined);
  
  const formRef = useRef<HTMLDivElement>(null);

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

  const handleRequestQuote = (offer: CruiseOffer) => {
    setSelectedOffer({
      ship: offer.ship,
      destination: offer.destination,
      departureDates: offer.departureDates,
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-background text-foreground">
      <main className="w-full max-w-7xl mx-auto p-4 md:p-8 flex-grow">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
            <div className="relative w-full h-56 md:h-96 rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
                <iframe 
                    src="https://iframe.mediadelivery.net/embed/58732/3c61795a-5d9d-42f0-8e69-bb760aa53c0b?autoplay=true&loop=true&muted=true&preload=true&responsive=true" 
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allow="autoplay; fullscreen" 
                    referrerPolicy="no-referrer"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="relative w-full h-56 md:h-96 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 hidden lg:block">
                <Image
                    src="/Cruise.png"
                    alt="Luxury cruise ship"
                    fill
                    sizes="(max-width: 1024px) 0vw, 50vw"
                    className="object-cover"
                    data-ai-hint="cruise ship"
                />
            </div>
        </div>

        <section id="offers" className="mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary/90 mb-8">Featured Cruises</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cruiseOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} onRequestQuote={handleRequestQuote} />
              ))}
            </div>
        </section>

        <div ref={formRef} className="w-full max-w-2xl mx-auto scroll-mt-20 mb-16">
          {submissionState ? (
            <CruiseSuggestions suggestions={submissionState.suggestions} />
          ) : (
            <EnquiryForm 
              key={selectedOffer ? `${selectedOffer.ship}-${selectedOffer.destination}` : 'default'}
              onSubmit={handleFormSubmit} 
              isLoading={isLoading} 
              serverError={error}
              initialData={selectedOffer}
            />
          )}
        </div>

        <InclusionsSection />
        <FaqSection items={faqItems} />

      </main>
      <footer className="w-full text-center p-4 mt-8 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Get That Cruise. All Rights Reserved.</p>
        <p> All cruises shown are subject to availability. Prices are per person based on double occupancy, they are subject to change and may vary without notice. </p>
        <p> These offers are valid on new bookings only, on selected sailings and subject to availability by MSC Cruises.</p>
        <p> It is not combinable with any other offer and can be withdrawn at any time without notice.</p>
        <p> Get That Cruise acts as retail agents for ATOL protected tour operators.</p>
        <p> Get That Cruise is an affiliate for Not Just Travel, who are a trading division of Hays Travel Limited. </p>
        <p> Registered address: Gilbridge House, Keel Square, Sunderland, SR1 3HA.</p>
        <p> Registered Company Number: 1990682. ABTA no. K9413.</p>
      </footer>
    </div>
  );
}
