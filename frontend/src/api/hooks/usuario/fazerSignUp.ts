import { criarUsuarioService } from '../../services/usuarioService';
import { criarPerfilService } from '../../services/perfilService';
import criaUsuarioJSON from '../../../utils/criaUsuarioJSON';
import criaPerfilJSON from '../../../utils/criaPerfilJSON';

const fazerSignUp = async (input: any, saveToken: (token: string) => void) => {
   await new Promise((resolve) => setTimeout(resolve, 2000));
   try {
      const dataUsuario = criaUsuarioJSON(input);
      const criarUsuarioResponse = await criarUsuarioService(dataUsuario);
      saveToken(criarUsuarioResponse?.data?.data?.access_token)
      const dataPerfil = criaPerfilJSON({ ...input, ...dataUsuario });
      const criarPerfilResponse = await criarPerfilService(dataPerfil);
      return { data: { dataUsuario, dataPerfil }, err: null}
   } catch (err) {
      return { data: null, err: (err as any)?.response.data}
   }

};


export default fazerSignUp;
