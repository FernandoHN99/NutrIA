import React from 'react';
import ChatInput from './ChatBot/ChatInput';
import GenderSelection from './ChatBot/GenderSelection';
import DateSelector from './ChatBot/DateSelector';
import PicklistSelector from './ChatBot/PicklistSelector';
import NumberInput from './ChatBot/NumberInput';
import EmailInput from './ChatBot/EmailInput';
import PasswordInput from './ChatBot/PasswordInput';

type FlowSignUpResponse = {
   [key: number]: {
      question: string;
      component: JSX.Element;
   };
};

const FlowSignUp = (nextQuestion: (userAnswer: any) => void, answers: any): FlowSignUpResponse => {
   return {
      0: {
         question: "Qual seu nome?",
         component: <ChatInput onSubmit={nextQuestion} />,
      },
      1: {
         question: "Qual seu sobrenome?",
         component: <ChatInput onSubmit={nextQuestion} />,
      },
      2: {
         question: "Qual é sua data de nascimento?",
         component: <DateSelector onSelect={nextQuestion} />,
      },
      3: {
         question: "Qual é o seu sexo biológico?",
         component: <GenderSelection onSelect={nextQuestion} />,
      },
      4: {
         question: "Sua alimentação se enquadra em qual categoria?",
         component: <PicklistSelector onSelect={nextQuestion} picklistOptions={['Onívora', 'Vegetariana', 'Vegana']} />,
      },
      5: {
         question: "Qual é o seu peso atual?",
         component: <NumberInput onSubmit={nextQuestion} maxValue={500} maxLength={6} allowDecimal={true} unidadeMedida='kg' />,
      },
      6: {
         question: "Qual é sua altura?",
         component: <NumberInput onSubmit={nextQuestion} maxValue={300} maxLength={3} allowDecimal={false} unidadeMedida='cm' />,
      },
      7: {
         question: "Qual é seu nível de atividade?",
         component:
            <PicklistSelector
               onSelect={nextQuestion}
               picklistOptions={['Sedentário', 'Leve', 'Moderado', 'Intenso', 'Muito Intenso']}
               helperTitle='Sobre nível de atividade física'
               helperText={`Sedentário: Exercício mínimo \n Leve: 1-3 dias por semana \n Moderado: 3-5 dias por semana \n Intenso: 6-7 dias por semana \n Muito Intenso: Atleta, 2x por dia`}
            />,
      },
      8: {
         question: "Qual é seu objetivo?",
         component:
            <PicklistSelector
               onSelect={nextQuestion}
               picklistOptions={['Perda de Peso', 'Manutenção', 'Ganho de Peso']}
            />,
      },
      9: {
         question: "Qual é a sua meta de peso?",
         component: <NumberInput onSubmit={nextQuestion} maxValue={500} maxLength={6} allowDecimal={true} unidadeMedida='kg' />,
      },
      10: {
         question: "Qual o seu email?",
         component: <EmailInput onSubmit={nextQuestion} />,
      },
      11: {
         question: "Digite uma senha.",
         component: <PasswordInput onSubmit={nextQuestion} />,
      },
      12: {
         question: "Digite a senha novamente.",
         component: <PasswordInput onSubmit={nextQuestion} passwordCheck={answers[11]} />,
      },
   };
}
   export default FlowSignUp;
