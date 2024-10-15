export interface chatBotMessagesSchema {
   role: string
   content: string
}

export interface perguntarChatBotSchema {
   mensagensChat: Array<chatBotMessagesSchema>
}