import fs from 'fs';
import path from 'path';
import { type CruiseOffer } from "@/components/offer-card";
import { LandingPageClient } from '@/components/landing-page-client';

export default function LandingPage() {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'cruise-offers.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const cruiseOffers: CruiseOffer[] = JSON.parse(jsonData);

  return <LandingPageClient cruiseOffers={cruiseOffers} />;
}
