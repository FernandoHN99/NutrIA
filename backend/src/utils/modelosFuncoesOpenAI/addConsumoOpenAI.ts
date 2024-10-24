export const addConsumoOpenAI = {
   "type": "function",
   "function": {
      "name": "add_consumo_alimento",
      "description": "Adiciona individualmente os alimentos consumidos por um usuário SOMENTE quando solicitado.",
      "strict": true,
      "parameters": {
         "type": "object",
         "description": "Um objeto que contém de forma separada cada alimento consumido pelo usuario em uma refeição e uma data específica",
         "required": [
            "alimentos"
         ],
         "properties": {
            "alimentos": {
               "type": "array",
               "description": "Lista de alimentos consumidos na refeição",
               "items": {
                  "type": "object",
                  "required": [
                     "nome_consumo",
                     "id_alimento",
                     "numero_refeicao",
                     "dt_dia",
                     "unidade_medida",
                     "porcao_padrao",
                     "qtde_utilizada",
                     "qtde_proteina",
                     "qtde_carboidrato",
                     "qtde_gordura",
                     "qtde_alcool",
                     "kcal",
                     "id_prato"
                  ],
                  "properties": {
                     "nome_consumo": {
                        "type": "string",
                        "description": "Nome do alimento q caracteriza o consumo em questão"
                     },
                     "id_alimento": {
                        "type": "null",
                        "description": "Id do alimento sempre será nulo, pois o alimento é informado pelo nome"
                     },
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
                     "qtde_alcool": {
                        "type": "number",
                        "description": "Quantidade de alcool em gramas consumidas no total"
                     },
                     "qtde_gordura": {
                        "type": "number",
                        "description": "Quantidade de gorduras em gramas consumidas no total"
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
                           "UNIDADE"
                        ],
                        "type": "string",
                        "description": "Unidade de medida do alimento consumido"
                     },
                     "numero_refeicao": {
                        "min": 1,
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
            }
         },
         "additionalProperties": false
      }
   }
}