export const addConsumoOpenAI = {
   "type": "function",
   "function": {
      "name": "add_consumo_alimento",
      "description": `Acionar uma ÚNICA VEZ em UMA ÚNICA lista TODOS os alimentos que o usuário solicitou, se atente em diferenciar alimentos ja consumidos e aqueles q precisam ser adicionados! Conforme o schema - Ex: {"role":"assistant","content":null,"tool_calls":[{"id":"call_jHXkxBk1KGl1exSG3g5zwdv9","type":"function","function":{"name":"add_consumo_alimento","arguments":"{\"alimentos\":[{\"nome_consumo\":\"arroz\",\"id_alimento\":null,\"kcal\":130,\"dt_dia\":\"2024-11-08\",\"id_prato\":null,\"qtde_alcool\":0,\"qtde_gordura\":0.3,\"porcao_padrao\":1,\"qtde_proteina\":2.7,\"qtde_utilizada\":100,\"unidade_medida\":\"GRAMA\",\"numero_refeicao\":1,\"qtde_carboidrato\":28},{\"nome_consumo\":\"feijao\",\"id_alimento\":null,\"kcal\":95,\"dt_dia\":\"2024-11-08\",\"id_prato\":null,\"qtde_alcool\":0,\"qtde_gordura\":0.5,\"porcao_padrao\":1,\"qtde_proteina\":6.6,\"qtde_utilizada\":100,\"unidade_medida\":\"GRAMA\",\"numero_refeicao\":1,\"qtde_carboidrato\":17}]}\n"}}],"refusal":null}`,
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
               "description": "TODOS os alimentos consumidos DEVEM estar ÚNICA e EXCLUSIVAMENTE contidos NESTA lista de alimentos consumidos.",
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
                        "description": "Nome do alimento que caracteriza o consumo em questão com a primeira letra em maiúscula"
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
                        "max": 1,
                        "type": "number",
                        "description": "Porcao padrao do alimento consumido sempre será 1."
                     },
                     "qtde_proteina": {
                        "type": "number",
                        "description": "Quantidade de proteínas em gramas consumidas no total"
                     },
                     "qtde_utilizada": {
                        "type": "number",
                        "description": "Quantidade informada pelo usuário do alimento consumido. Ex: 25, 50, 100"
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
                        "description": "Quantidade de carboidratos em  consumidas no total"
                     }
                  },
                  "additionalProperties": false
               }
            }
         },
         "additionalProperties": false
      }
   }
}