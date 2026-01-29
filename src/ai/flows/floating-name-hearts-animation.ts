'use server';

/**
 * @fileOverview Generates the name to be used in the floating hearts animation.
 *
 * - generateNameForHearts - A function that generates the name.
 * - FloatingNameHeartsInput - The input type for the generateNameForHearts function.
 * - FloatingNameHeartsOutput - The return type for the generateNameForHearts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FloatingNameHeartsInputSchema = z.object({
  userName: z.string().describe('The name of the user for personalization.'),
});
export type FloatingNameHeartsInput = z.infer<typeof FloatingNameHeartsInputSchema>;

const FloatingNameHeartsOutputSchema = z.object({
  personalizedName: z.string().describe('The personalized name to display in the hearts animation.'),
});
export type FloatingNameHeartsOutput = z.infer<typeof FloatingNameHeartsOutputSchema>;

export async function generateNameForHearts(input: FloatingNameHeartsInput): Promise<FloatingNameHeartsOutput> {
  return floatingNameHeartsFlow(input);
}

const floatingNameHeartsPrompt = ai.definePrompt({
  name: 'floatingNameHeartsPrompt',
  input: {schema: FloatingNameHeartsInputSchema},
  output: {schema: FloatingNameHeartsOutputSchema},
  prompt: `Generate the name to be used in the floating hearts animation. Personalize it for the user: {{{userName}}}.\n\nThe name to display should be: {{{userName}}}`,
});

const floatingNameHeartsFlow = ai.defineFlow(
  {
    name: 'floatingNameHeartsFlow',
    inputSchema: FloatingNameHeartsInputSchema,
    outputSchema: FloatingNameHeartsOutputSchema,
  },
  async input => {
    const {output} = await floatingNameHeartsPrompt(input);
    return output!;
  }
);
