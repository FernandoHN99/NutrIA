import { z } from 'zod';

const chatMessagesSchema = z.object({
   role: z.string(),
   content: z.string()
});

type chatMessagesObject = z.infer<typeof chatMessagesSchema>;

export { chatMessagesSchema, chatMessagesObject };