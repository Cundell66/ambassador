
'use server';

import { z } from 'zod';
import { suggestAlternativeCruises, SuggestAlternativeCruisesInput } from '@/ai/flows/suggest-alternative-cruises';

const EnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  ship: z.string().min(3, 'Please enter a valid ship name.'),
  departureDates: z.string().min(1, 'Please enter your desired departure dates.'),
  destination: z.string().min(3, 'Please enter your desired destination.'),
});

export async function submitEnquiry(formData: unknown): Promise<{ success: boolean; suggestions?: string[]; error?: string }> {
  const parsed = EnquirySchema.safeParse(formData);

  if (!parsed.success) {
    // This server-side validation is a fallback.
    // The client-side form should prevent this from being reached with valid use.
    return { success: false, error: 'Invalid form data. Please check your entries and try again.' };
  }
    
  try {
    // The user request is to forward this to admin@getthatcruise.co.uk.
    // In a real-world application, you would integrate an email service here.
    // For example, using Resend:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@getthatcruise.com',
    //   to: 'admin@getthatcruise.co.uk',
    //   subject: 'New Cruise Enquiry',
    //   html: `<p>Name: ${parsed.data.name}</p><p>Email: ${parsed.data.email}</p><p>Ship: ${parsed.data.ship}</p><p>Dates: ${parsed.data.departureDates}</p><p>Destination: ${parsed.data.destination}</p>`,
    // });
    //
    // For this demonstration, we'll simulate a successful email dispatch and proceed to the AI suggestion step.

    const aiSuggestions = await suggestAlternativeCruises(parsed.data as SuggestAlternativeCruisesInput);

    return { success: true, suggestions: aiSuggestions.suggestions };
  } catch (error) {
    console.error('Enquiry submission failed:', error);
    return { success: false, error: 'We could not process your enquiry at this time. Please try again later.' };
  }
}
