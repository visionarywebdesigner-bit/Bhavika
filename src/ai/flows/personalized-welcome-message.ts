'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized welcome messages.
 *
 * - generatePersonalizedWelcomeMessage - A function that generates a personalized welcome message.
 * - PersonalizedWelcomeMessageInput - The input type for the generatePersonalizedWelcomeMessage function.
 * - PersonalizedWelcomeMessageOutput - The return type for the generatePersonalizedWelcomeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedWelcomeMessageInputSchema = z.object({
  userName: z.string().describe('The name of the user to personalize the welcome message for.'),
  sentiment: z
    .string()
    .optional()
    .describe('The desired sentiment of the welcome message (e.g., joyful, romantic).'),
  length: z
    .string()
    .optional()
    .describe('The desired length of the welcome message (e.g., short, medium, long).'),
});
export type PersonalizedWelcomeMessageInput = z.infer<
  typeof PersonalizedWelcomeMessageInputSchema
>;

const PersonalizedWelcomeMessageOutputSchema = z.object({
  welcomeMessage: z.string().describe('The personalized welcome message.'),
});
export type PersonalizedWelcomeMessageOutput = z.infer<
  typeof PersonalizedWelcomeMessageOutputSchema
>;

export async function generatePersonalizedWelcomeMessage(
  input: PersonalizedWelcomeMessageInput
): Promise<PersonalizedWelcomeMessageOutput> {
  return personalizedWelcomeMessageFlow(input);
}

const personalizedWelcomeMessagePrompt = ai.definePrompt({
  name: 'personalizedWelcomeMessagePrompt',
  input: {schema: PersonalizedWelcomeMessageInputSchema},
  output: {schema: PersonalizedWelcomeMessageOutputSchema},
  prompt: `Generate a personalized welcome message for {{userName}}.\n\n{% if sentiment %}The message should have a {{sentiment}} sentiment.{% endif %}\n{% if length %}The message should be {{length}}.{% endif %}`,
});

const personalizedWelcomeMessageFlow = ai.defineFlow(
  {
    name: 'personalizedWelcomeMessageFlow',
    inputSchema: PersonalizedWelcomeMessageInputSchema,
    outputSchema: PersonalizedWelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await personalizedWelcomeMessagePrompt(input);
    return output!;
  }
);
