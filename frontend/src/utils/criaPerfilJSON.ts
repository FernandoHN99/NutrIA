import { mapPerfisAlimentares, mapNiveisDeAtividade, mapObjetivos, mapSexosBiologicos, mapMultNiveisDeAtividade } from '../config/variaveis';
import { calcularTMB, calcularTMT, calcularTMF, calcularPesoCarboidrato, calcularIdade, arredondarValores } from './utils';

const criaPerfilJSON = (input: any): any => {
   const output: any = {};

   for (const key in input) {
      switch (key) {

         case 'altura':
            output[key] = Number(input[key].split(' ')[0]);
            break;

         case 'peso_inicial':
            output[key] = Number(input[key].split(' ')[0]);
            break;

         case 'peso_final':
            output[key] = Number(input[key].split(' ')[0]);
            break;

         case 'nivel_atividade':
            output[key] = mapNiveisDeAtividade[input[key]];
            break;

         case 'objetivo':
            output[key] = mapObjetivos[input[key]];
            break;

      }
   }

   const idade: number = calcularIdade(input['dt_nascimento']);
   const ajusteCalorico: number = output['objetivo'] == 'GANHO' ? 300 : 0.8;
   output['proteina_peso'] = output['objetivo'] == 'GANHO' ? 2.1 : 2.5;
   output['gordura_peso'] = input['sexo'] == 'H' ? 0.6 : 0.9;
   output['tmb'] = arredondarValores(calcularTMB(idade, output['peso_inicial'], output['altura'], input['sexo']));
   output['tmt'] = arredondarValores(calcularTMT(output['tmb'], mapMultNiveisDeAtividade[output['nivel_atividade']]));
   output['tmf'] = arredondarValores(calcularTMF(output['tmt'], output['objetivo'], ajusteCalorico));
   output['carboidrato_peso'] = arredondarValores(
      calcularPesoCarboidrato(output['tmf'],  output['peso_inicial'], output['proteina_peso'], output['gordura_peso']), 1
   );
   output['meta_carboidrato'] = arredondarValores(output['carboidrato_peso'] * output['peso_inicial']);
   output['meta_proteina'] = arredondarValores(output['proteina_peso'] * output['peso_inicial']);
   output['meta_gordura'] = arredondarValores(output['gordura_peso'] * output['peso_inicial']);
   
   return output;
};

export default criaPerfilJSON;
