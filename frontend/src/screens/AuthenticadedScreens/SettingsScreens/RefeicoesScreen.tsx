import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { getResponsiveSizeWidth } from '../../../utils/utils';
import { useRefeicoesUsuario } from '../../../api/hooks/httpState/usuarioData';
import { adicionarRefeicaoService, removerRefeicaoService, reativarRefeicaoService, atualizarRefeicaoService } from '../../../api/services/refeicaoService';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

interface Refeicao {
   numero_refeicao: number;
   nome_refeicao: string;
   ativa: boolean;
}

const modalNomeRefeicao = (
   setShowModalRefeicao: Function,
   titleModal: string,
   valorRefeicao: string, setValoRefeicao: React.Dispatch<React.SetStateAction<string>>,
   onPressFunction: Function) => {

   return (
      <Modal
         animationType="fade"
         transparent={true}
         onRequestClose={() => setShowModalRefeicao()}
      >
         <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
               <Text style={styles.modalTitle}>{titleModal}</Text>
               <TextInput
                  style={styles.textInput}
                  placeholder="Nome da Refeição"
                  value={valorRefeicao}
                  onChangeText={setValoRefeicao}
                  maxLength={25}
               />
               <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <TouchableOpacity style={styles.buttonModal} onPress={() => onPressFunction()}>
                     <Text style={styles.buttonModalText}>Salvar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonModalClose} onPress={() => setShowModalRefeicao()}>
                     <Text style={styles.buttonModalCloseText}>Fechar</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   )
}


const RefeicoesScreen = () => {
   const navigation = useNavigation();
   const queryClient = useQueryClient()
   const { data: refeicoesCached } = useRefeicoesUsuario({ enabled: false });
   const refeicoesAtivas: Refeicao[] = refeicoesCached.filter((refeicao: Refeicao) => refeicao.ativa);
   const [textNovaRefeicao, setTextNovaRefeicao] = useState('');
   const [showModalNovaRefeicao, setShowModalNovaRefeicao] = useState(false);
   const [textEditaRefeicao, setTextEditaRefeicao] = useState('');
   const [numeroRefeicaoEditada, setNumeroRefeicaoEditada] = useState<number | null>(null);

   const { mutateAsync: adicionarRefeicaoServiceFn } = useMutation({
      mutationFn: adicionarRefeicaoService,
      onSuccess(retorno) {
         queryClient.setQueryData(['authUserToken'], (data: any[]) => {
            return {token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImNWMEZYOU1HOWVOV0VLemwiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2t2dW9sc2FmZ2VtZGVzb3NxYWppLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkZjk0M2NkNi05OWRhLTQzMmItYWQyNi02Y2M2YmFmMTAyZWYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI4MzQ1Nzc1LCJpYXQiOjE3MjgzNDM5NzUsImVtYWlsIjoic2FmYWRvQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzI4MzQzOTc1fV0sInNlc3Npb25faWQiOiJjNWZmZDRjMy05ODliLTQ4ZWMtOTY1OS0wMTIyNTZmMDc5YjUiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.9wY2tmSluxnQOIMvup7TqBPmcMLuqP0lBKpfaB5Kr5A', refreshToken: 'XOCxBq7f-YXjmthTDPy5Zw'};
         });
      },
      onError(error) {
         Alert.alert('Erro', 'Não foi possível adicionar a refeição');
      }
   });

   const { mutateAsync: atualizarRefeicaoServiceFn } = useMutation({
      mutationFn: atualizarRefeicaoService,
      onSuccess(retorno) {
        queryClient.setQueryData(['refeicoesUsuario'], (data: any[]) => {
          return data.map((refeicao: Refeicao) =>
            refeicao.numero_refeicao === retorno.numero_refeicao ? retorno : refeicao
          );
        });
      },
      onError(error) {
        Alert.alert('Erro', 'Não foi possível adicionar a refeição');
      }
    });
    

   const { mutateAsync: reativarRefeicaoServiceFn } = useMutation({
      mutationFn: reativarRefeicaoService,
      onSuccess(retorno) {
         queryClient.setQueryData(['refeicoesUsuario'], (data: any[]) => {
            data = data.filter((refeicao: Refeicao) => refeicao.numero_refeicao != retorno.numero_refeicao);
            return [...data, retorno];
         });
      },
      onError(error) {
         Alert.alert('Erro', 'Não foi possível adicionar a refeição');
      }
   });

   const { mutateAsync: removerRefeicaoServiceFn } = useMutation({
      mutationFn: removerRefeicaoService,
      onSuccess(retorno) {
         queryClient.setQueryData(['refeicoesUsuario'], (data: any[]) => {
            return data.filter((refeicao: Refeicao) => refeicao.numero_refeicao != retorno.numero_refeicao);
         });
      },
      onError(error) {
         Alert.alert('Erro', 'Não foi possível remover a refeição');
      }
   });

   const handlerAdicionarRefeicao = async () => {
      if (textNovaRefeicao.trim() === '') return;
      if (refeicoesAtivas.length < refeicoesCached.length) {
         await reativarRefeicaoServiceFn({
            nome_refeicao: textNovaRefeicao,
            numero_refeicao: (refeicoesAtivas.length + 1)
         });
      }
      else {
         await adicionarRefeicaoServiceFn({
            nome_refeicao: textNovaRefeicao
         });
      }
      setTextNovaRefeicao('');
      setShowModalNovaRefeicao(false);
   };

   const handlerRemoverRefeicao = async (numeroRefeicao: number) => {
      if (numeroRefeicao == 1) return;
      await removerRefeicaoServiceFn({
         numero_refeicao: numeroRefeicao
      });
   };

   const handlerAtualizarRefeicao = async () => {
      if (numeroRefeicaoEditada == null || 
         textEditaRefeicao.trim() === '' || 
         refeicoesAtivas[numeroRefeicaoEditada-1].nome_refeicao == textEditaRefeicao.trim()
      ) return;
      await atualizarRefeicaoServiceFn({
         nome_refeicao: textEditaRefeicao,
         numero_refeicao: numeroRefeicaoEditada
      });
      setTextEditaRefeicao('');
      setNumeroRefeicaoEditada(null);
   };

   const renderRefeicaoAtiva = (item: Refeicao, indice: number) => (
      <View style={styles.refeicaoContainer}>
         <View style={styles.refeicaoInfoLeft}>
            <Text style={styles.textRefeicaoNumero}>Refeição {item.numero_refeicao}</Text>
            <View style={{ marginLeft: 15, backgroundColor: theme.colors.color05, borderRadius: 100, padding: 4 }}>
               <Icon2 name="pencil" size={17} color={theme.colors.color01} onPress={() => {
                  setTextEditaRefeicao(item.nome_refeicao);
                  setNumeroRefeicaoEditada(item.numero_refeicao);
               }} />
            </View>
            {refeicoesAtivas.length != 1 && refeicoesAtivas.length == (indice + 1) ?
               <TouchableOpacity onPress={() => handlerRemoverRefeicao(item.numero_refeicao)} style={{ marginLeft: 15, backgroundColor: theme.colors.color05, borderRadius: 100, padding: 5 }}>
                  <Icon name="trash" size={17} color={theme.colors.color01} />
               </TouchableOpacity>
               :
               null
            }
         </View>
         <View style={styles.refeicaoInfoRight}>
            <Text style={styles.textRefeicaoNome}>{item.nome_refeicao}</Text>
         </View>
      </View>
   );

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon name="arrow-back" size={30} color={theme.colors.color05} />
            </TouchableOpacity>
            <Text style={styles.title}>Configuração de Refeições</Text>
         </View>
         <ScrollView showsVerticalScrollIndicator={false} bounces={false} >
            {
               refeicoesAtivas.map((refeicao: Refeicao, index: number) => (
                  <View key={refeicao.numero_refeicao}>
                     {renderRefeicaoAtiva(refeicao, index)}
                  </View>
               ))
            }
            <TouchableOpacity style={styles.buttonOpenModal} onPress={() => setShowModalNovaRefeicao(true)}>
               <Icon name="add-circle" size={40} color={theme.colors.color05} />
            </TouchableOpacity>
         </ScrollView>
         {
         showModalNovaRefeicao ? 
            modalNomeRefeicao(()=>setShowModalNovaRefeicao(false), 'Adicionar Refeição', textNovaRefeicao, setTextNovaRefeicao, handlerAdicionarRefeicao) 
            : 
               null}
         {
            numeroRefeicaoEditada ?
               modalNomeRefeicao(()=>setNumeroRefeicaoEditada(null), 'Editar Refeição', textEditaRefeicao, setTextEditaRefeicao, handlerAtualizarRefeicao)
            : 
               null
         }
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: theme.colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '95%',
      marginTop: 15,
      marginBottom: 15,
   },
   title: {
      flex: 0.95,
      fontSize: getResponsiveSizeWidth(5),
      fontWeight: 'bold',
      color: theme.colors.color05,
      textAlign: 'center',
   },
   refeicaoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      borderBottomWidth: 2,
      borderColor: theme.colors.color05,
      padding: getResponsiveSizeWidth(4),
   },
   refeicaoInfoLeft: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 0.5,
   },
   refeicaoInfoRight: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 0.5,
   },
   textRefeicaoNumero: {
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.black,
   },
   textRefeicaoNome: {
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.black,
      fontFamily: 'NotoSans-SemiBoldItalic',
      textAlign: 'right',
   },
   buttonOpenModal: {
      marginTop: 10,
      marginBottom: 100,
      marginHorizontal: 'auto',
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContent: {
      width: '80%',
      backgroundColor: theme.colors.backgroundColor,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
   },
   modalTitle: {
      fontSize: getResponsiveSizeWidth(4.5),
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.color05,
   },
   textInput: {
      fontSize: 13,
      height: 45,
      width: '80%',
      borderColor: theme.colors.color05,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      backgroundColor: '#fff',
   },
   buttonModal: {
      backgroundColor: theme.colors.color05,
      paddingVertical: 7,
      paddingHorizontal: 13,
      borderRadius: 5,
      marginRight: 20,
      borderWidth: 2,
      borderColor: theme.colors.color05,
   },
   buttonModalClose: {
      paddingVertical: 7,
      paddingHorizontal: 13,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: theme.colors.color05,
   },
   buttonModalText: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(3),
      color: theme.colors.color01,
   },
   buttonModalCloseText: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(3),
      color: theme.colors.color05,
   },
});

export default RefeicoesScreen;
