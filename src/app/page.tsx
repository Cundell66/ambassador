import fs from 'fs';
import path from 'path';
import { type CruiseOffer } from "@/components/offer-card";
import { LandingPageClient } from '@/components/landing-page-client';
import { FaqItem } from '@/components/faq-section';

export default function LandingPage() {
  const offersFilePath = path.join(process.cwd(), 'src', 'lib', 'cruise-offers.json');
  const offersJsonData = fs.readFileSync(offersFilePath, 'utf-8');
  const cruiseOffers: CruiseOffer[] = JSON.parse(offersJsonData);

  const faqFilePath = path.join(process.cwd(), 'src', 'lib', 'faq-data.json');
  const faqJsonData = fs.readFileSync(faqFilePath, 'utf-8');
  const faqItems: FaqItem[] = JSON.parse(faqJsonData);


  return <LandingPageClient cruiseOffers={cruiseOffers} faqItems={faqItems} />;
}
