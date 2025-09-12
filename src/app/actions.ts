
'use server';

import { z } from 'zod';
import { suggestAlternativeCruises, SuggestAlternativeCruisesInput } from '@/ai/flows/suggest-alternative-cruises';
import nodemailer from 'nodemailer';

const EnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  ship: z.string().min(3, 'Please enter a valid ship name.'),
  departureDates: z.string().min(1, 'Please enter your desired departure dates.'),
  destination: z.string().min(3, 'Please enter your desired destination.'),
  adults: z.string().min(1, "Please select the number of adults."),
  children: z.string().min(1, "Please select the number of children."),
});

async function sendEnquiryEmail(data: z.infer<typeof EnquirySchema>) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.ENQUIRY_RECIPIENT_EMAIL) {
    console.warn("SMTP environment variables not set. Skipping email dispatch. Please configure them in your .env file.");
    // In a production scenario, you might want to throw an error here.
    // For this demo, we'll allow it to proceed to show the AI suggestions.
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: (process.env.SMTP_PORT || "587") === "465", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Get That Cruise Enquiry" <${process.env.SMTP_USER}>`,
    to: process.env.ENQUIRY_RECIPIENT_EMAIL,
    subject: `New Cruise Enquiry from ${data.name}`,
    html: `
      <h1>New Cruise Enquiry</h1>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Ship:</strong> ${data.ship}</p>
      <p><strong>Desired Dates:</strong> ${data.departureDates}</p>
      <p><strong>Destination:</strong> ${data.destination}</p>
      <p><strong>Adults:</strong> ${data.adults}</p>
      <p><strong>Children:</strong> ${data.children}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}


export async function submitEnquiry(formData: unknown): Promise<{ success: boolean; suggestions?: string[]; error?: string }> {
  const parsed = EnquirySchema.safeParse(formData);

  if (!parsed.success) {
    // This server-side validation is a fallback.
    // The client-side form should prevent this from being reached with valid use.
    return { success: false, error: 'Invalid form data. Please check your entries and try again.' };
  }
    
  try {
    // Send the enquiry details via email
    await sendEnquiryEmail(parsed.data);

    // After sending the email, proceed to the AI suggestion step.
    const aiSuggestions = await suggestAlternativeCruises(parsed.data as SuggestAlternativeCruisesInput);

    return { success: true, suggestions: aiSuggestions.suggestions };
  } catch (error) {
    console.error('Enquiry submission failed:', error);
    // Differentiate between email failure and AI failure if needed
    if (error instanceof Error && error.message.includes('SMTP')) {
       return { success: false, error: 'There was an issue sending your enquiry. Please try again later.' };
    }
    return { success: false, error: 'We could not process your enquiry at this time. Please try again later.' };
  }
}
