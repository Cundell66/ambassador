"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface CruiseOffer {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  details: string[];
  originalPrice?: number;
  discountedPrice: number;
  ship: string;
  destination: string;
  departureDates: string;
}

interface OfferCardProps {
  offer: CruiseOffer;
  onRequestQuote: (offer: CruiseOffer) => void;
}

export function OfferCard({ offer, onRequestQuote }: OfferCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
      <div className="bg-primary text-primary-foreground text-center p-3">
        <h3 className="font-headline font-bold text-lg">{offer.title}</h3>
      </div>
      <CardContent className="p-0 flex-grow flex flex-col">
        <div className="p-4 text-center">
            <p className="font-headline font-semibold text-muted-foreground">{offer.date}</p>
        </div>
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={offer.imageUrl}
            alt={offer.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint="cruise map"
          />
        </div>
        <div className="p-6 flex-grow">
          <ul className="space-y-2 text-sm">
            {offer.details.map((detail, index) => (
              <li key={index} className="flex items-center">
                <span className="text-primary mr-2">◆</span>
                <p dangerouslySetInnerHTML={{ __html: detail.replace(/£(\d+)/g, '<span class="font-bold text-blue-600">£$1</span>').replace(/From: <del>.*<\/del>/, `From: <del class="text-muted-foreground">${offer.originalPrice ? `£${offer.originalPrice}` : ''}</del>`) }} />
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 pt-0 mt-auto">
          <Button onClick={() => onRequestQuote(offer)} size="lg" className="w-full bg-pink-600 text-white font-bold hover:bg-pink-700">
            Request A Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
