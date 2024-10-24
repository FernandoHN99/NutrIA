import { z } from 'zod';

const chatMessagesSchema = z.object({
   role: z.string(),
   content: z.array(z.any())
});

type chatMessagesObject = z.infer<typeof chatMessagesSchema>;

export { chatMessagesSchema, chatMessagesObject };