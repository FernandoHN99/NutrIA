# 🍎 NutrIA - Contabilizador de Calorias Inteligente

NutrIA é um aplicativo inteligente para contabilização de calorias e acompanhamento nutricional. Ele conta com um chatbot integrado ao diário do usuário, que utiliza inteligência para compreender o perfil individual e ajudar a atingir metas diárias de forma eficiente.

## ⚙️ Funcionalidades

- **Diário Nutricional**: Registro de alimentos consumidos e controle de macros (proteínas, carboidratos e gorduras).
- **Diário de Evolução**: Registro diário para fotos e informações físicas (circunferência abdominal e peso).
- **Chatbot Inteligente**: Um assistente virtual que o ajuda a monitorar e preencher seu consumo diário.
- **Acompanhamento Personalizado**: O app permite configurar seu perfil e o entende, fornecendo respostas especializadas para atingir suas metas diárias.
- **Integração Simples**: Seu diário, informações e chatbot estão integrados em tempo real.

## 🧑🏻‍💻 Tecnologias Utilizadas

### Backend
- **[🔗 Node.js](https://nodejs.org/en)** com **[🔗 TypeScript](https://www.typescriptlang.org/)**
- **[🔗 TypeORM](https://typeorm.io/)** para o Mapeamento de Objetos Relacionais (ORM)
- **[🔗 Zod](https://zod.dev/)** para Validação de Schemas
- **[🔗 Supabase](https://supabase.com/)** como Banco de Dados
- **[🔗 OpenAI](https://openai.com/api/)** como Inteligência Artificial

### Frontend
- **[🔗 React Native](https://reactnative.dev/)** com **[🔗 TypeScript](https://www.typescriptlang.org/)**
- **[🔗 Expo](https://docs.expo.dev/)** para Desenvolvimento Ágil e Multiplataforma


## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js
- NPM
- Expo (não é necessário instalar globalmente, o projeto usa npx expo)
- Conta no Supabase
- Conta na OpenAI

### Passos

#### 1. Clone o repositório:
   ```bash
   git clone https://github.com/FernandoHN99/NutrIA.git
   ```
   ```bash
   cd nutria
   ```

#### 2. Backend
1. Acesse o diretório do backend:
   ```bash
   cd backend
   ```
2. Preencha o arquivo .env com as credenciais necessárias. Um arquivo de exemplo (.env) está disponível no projeto para referência. Atualize as informações de acordo com suas credenciais do Supabase e da OpenAI.

3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

#### 3. Frontend
1. Em outro terminal acesse o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Atualize o arquivo .env com as informações apontadas ao Backend. Um arquivo de exemplo (.env) está disponível no projeto para referência.
   > **Observação:** Para utilizar o Expo em múltiplos dispositivos de forma simultânea subistituir o localhost pelo IP da máquina que hospeda o servidor backend.

3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o aplicativo com o Expo:
   ```bash
   npx expo start
   ```

## ✒️ Autores
* Fernando Henriques Neto &nbsp;18.00931-0 
* Guilherme Sanches Rossi &nbsp;&nbsp;19.02404-5 
* Matheus Coelho Rocha  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20.00391-9 
* Pedro Henrique S.Hein &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20.00134-7 


## 🎁 Expressões de Gratidão
Agradecimento ao professor [🔗 Rodrigo Bossini](https://www.linkedin.com/in/rodrigobossini/?originalSubdomain=br) por todo suporte para a conclusão do Projeto.
