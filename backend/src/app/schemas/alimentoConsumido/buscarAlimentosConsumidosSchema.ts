import { z } from 'zod';
import Util from '../../../utils/util';

const buscarAlimentosConsumidosSchema = z.object({

   dataInicio: z.string()
      .refine(Util.validarData, { message: 'Formato Inválido: dataInicio' })
      .optional(),

   dataFim: z.string()
      .refine(Util.validarData, { message: 'Formato Inválido: dataFim' })
      .optional()

}).transform(
      obj => {
         if(obj.dataInicio == undefined && obj.dataFim != undefined){
            obj.dataInicio = Util.criarStrData(0, -2, 0, new Date(obj.dataFim))
         }
         else if(obj.dataInicio != undefined && obj.dataFim == undefined){
            obj.dataFim = Util.criarStrData(0, 2, 0, new Date(obj.dataInicio))
         }
         else if(obj.dataInicio == undefined && obj.dataFim == undefined){
            obj.dataInicio = Util.criarStrData(0, -1, 0)
            obj.dataFim = Util.criarStrData(0, 1, 0)
         }
         return obj
      });

type buscarAlimentosConsumidosObject = z.infer<typeof buscarAlimentosConsumidosSchema>

export { buscarAlimentosConsumidosSchema, buscarAlimentosConsumidosObject };
