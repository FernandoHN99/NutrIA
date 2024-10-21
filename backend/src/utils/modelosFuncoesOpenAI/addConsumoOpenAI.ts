export const addConsumoOpenAI = {
   "type": "function",
   "function": {
     "name": "add_consumo_alimento",
     "description": "Adiciona alimentos consumidos por um usuário, somente quando ele disser a palavra adicionar.",
     "strict": true,
     "parameters": {
       "type": "object",
       "description": "Um objeto que contem todos os alimentos consumidos pelo usuario em uma refeição e uma data específica",
       "required": [
         "alimentos"
       ],
       "properties": {
         "alimentos": {
           "type": "array",
           "items": {
             "type": "object",
             "required": [
               "numero_refeicao",
               "id_alimento",
               "nome_consumo",
               "id_prato",
               "dt_dia",
               "unidade_medida",
               "porcao_padrao",
               "qtde_utilizada",
               "qtde_proteina",
               "qtde_carboidrato",
               "qtde_gordura",
               "qtde_alcool",
               "kcal"
             ],
             "properties": {
               "kcal": {
                 "type": "number",
                 "description": "Quantidade de calorias consumidas no total"
               },
               "dt_dia": {
                 "type": "string",
                 "description": "Data do consumo no formato YYYY-MM-DD, se não for informado assumir data de hoje"
               },
               "id_prato": {
                 "type": "null",
                 "description": "Id do prato sempre será nulo"
               },
               "id_alimento": {
                 "type": "null",
                 "description": "Id do alimento sempre será nulo, pois o alimento é informado pelo nome"
               },
               "qtde_alcool": {
                 "type": "number",
                 "description": "Quantidade de alcool em gramas consumidas no total"
               },
               "qtde_gordura": {
                 "type": "number",
                 "description": "Quantidade de gorduras em gramas consumidas no total"
               },
               "nome_consumo": {
                 "type": "string",
                 "description": "Nome do alimento q caracteriza o consumo em questão"
               },
               "porcao_padrao": {
                 "type": "number",
                 "description": "Porcao padrao do alimento consumido de acordo com a unidade de medida"
               },
               "qtde_proteina": {
                 "type": "number",
                 "description": "Quantidade de proteínas em gramas consumidas no total"
               },
               "qtde_utilizada": {
                 "type": "number",
                 "description": "Quantidade de porcoes consumidas"
               },
               "unidade_medida": {
                 "enum": [
                   "GRAMA",
                   "MILILITRO",
                   "COLHER SOPA",
                   "COLHER CHA",
                   "XICARA PADRAO",
                   "XICARA CHA",
                   "ICARA CAFE",
                   "UNIDADE"
                 ],
                 "type": "string",
                 "description": "Unidade de medida do alimento consumido"
               },
               "numero_refeicao": {
                 "type": "number",
                 "description": "Numero da refeição, deve ser obrigatoriamente ser informado pelo usuário"
               },
               "qtde_carboidrato": {
                 "type": "number",
                 "description": "Quantidade de carboidratos em gramas consumidas no total"
               }
             },
             "additionalProperties": false
           },
           "description": "Lista de alimentos consumidos na refeição"
         }
       },
       "additionalProperties": false
     }
   }
 }