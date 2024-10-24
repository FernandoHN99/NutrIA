export interface chatBotMessagesSchema {
   role: 'assistant' | 'user'
   content: [contentTextSchema | contentImgSchema]
}

interface contentTextSchema {
   type: 'text'
   text: string
}

interface contentImgSchema {
   type: 'image_url'
   image_url: {
      url: string
   } 
}

export interface perguntarChatBotSchema {
   mensagensChat: Array<chatBotMessagesSchema>
}