import { mapPerfisAlimentares, mapNiveisDeAtividade, mapObjetivos, mapSexosBiologicos } from '../config/variaveis';
import { capitalize } from './utils';
import { formatarDataStrISO } from './utils';
import { criarUsuarioSchema } from '../api/schemas/usuarioSchemas';

const criaUsuarioJSON = (input: any): criarUsuarioSchema => {
   const output: any = {};

   for (const key in input) {
      switch (key) {
         case 'nome':
            output[key] = capitalize(input[key]);
            break;

         case 'sobrenome':
            output[key] = capitalize(input[key]);
            break;

         case 'sexo':
            const sexoCapitalized = capitalize(input[key])
            output[key] = mapSexosBiologicos[sexoCapitalized];
            break;
            
         case 'perfil_alimentar':
            const perfilCapitalized = capitalize(input[key]);
            output[key] = mapPerfisAlimentares[perfilCapitalized];
            break;

         case 'dt_nascimento':
            output[key] = formatarDataStrISO(input[key]);
            break;
            
         case 'email':
            output[key] = input[key]
            break;

         case 'password':
            output[key] = input[key]
            break;

      }
   }

   output['sistema_metrico'] = 'METRICO'
   output['pais'] = 'Brasil'
   
   return output;
};

export default criaUsuarioJSON;
