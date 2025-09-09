'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting alternative cruise options based on an initial enquiry.
 *
 * The flow takes the initial cruise enquiry details as input and uses a language model to suggest alternative
 * destinations or dates that are similar to the initial request. This allows users to explore more options and
 * potentially increases the chances of converting their interest into a booking.
 *
 * @fileExport suggestAlternativeCruises - A function that takes cruise enquiry details as input and returns
 * a list of suggested alternative cruise options.
 * @fileExport SuggestAlternativeCruisesInput - The input type for the suggestAlternativeCruises function.
 * @fileExport SuggestAlternativeCruisesOutput - The return type for the suggestAlternativeCruises function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeCruisesInputSchema = z.object({
  name: z.string().describe('The name of the person making the enquiry.'),
  email: z.string().describe('The email address of the person making the enquiry.'),
  ship: z.string().describe('The name of the cruise ship.'),
  departureDates: z.string().describe('The desired departure dates for the cruise.'),
  destination: z.string().describe('The desired destination for the cruise.'),
});
export type SuggestAlternativeCruisesInput = z.infer<typeof SuggestAlternativeCruisesInputSchema>;

const SuggestAlternativeCruisesOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of suggested alternative cruise options.'),
});
export type SuggestAlternativeCruisesOutput = z.infer<typeof SuggestAlternativeCruisesOutputSchema>;

export async function suggestAlternativeCruises(
  input: SuggestAlternativeCruisesInput
): Promise<SuggestAlternativeCruisesOutput> {
  return suggestAlternativeCruisesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeCruisesPrompt',
  input: {schema: SuggestAlternativeCruisesInputSchema},
  output: {schema: SuggestAlternativeCruisesOutputSchema},
  prompt: `You are a cruise expert. A customer has submitted an enquiry for a cruise. Suggest three alternative cruise options (destinations, dates, or ships) that are similar to the customer's enquiry, to help them explore more options.

Enquiry Details:
Name: {{{name}}}
Email: {{{email}}}
Ship: {{{ship}}}
Departure Dates: {{{departureDates}}}
Destination: {{{destination}}}

Alternative Cruise Options:
`,
});

const suggestAlternativeCruisesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeCruisesFlow',
    inputSchema: SuggestAlternativeCruisesInputSchema,
    outputSchema: SuggestAlternativeCruisesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
