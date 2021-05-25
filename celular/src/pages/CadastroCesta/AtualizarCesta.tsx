import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'
import { TouchableOpacity, RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import * as Util from '../../Util/Util'

import styles from './styles';
import CestaService from '../../services/Cesta.service'
import { Cesta as CestaModel } from '../../schemas/Cesta.model'

import backIcon from '../../assets/icons/back.png'


export type NavigationDrawerState = NavigationState & {
    isDrawerOpen: boolean;
};

interface NavigationProps {
    navigation: NavigationScreenProp<NavigationDrawerState> & {
        openDrawer: () => void;
        closeDrawer: () => void;
        toggleDrawer: () => void;
        jumpTo: (routeName: string, key?: string) => void;
    },
    route: any;
}




const AtualizarCesta: React.FC<NavigationProps> = ({ route, navigation }) => {

    const { id } = route.params;

    const { navigate } = useNavigation();


    //Variaveis que armazenam os inputs para poder passar para o proximo input
    let descricaoInput: TextInput;


    //Variaveis que armazenam os estados dos inputs
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [dataAtualizacao, setDataAtualizacao] = useState('');
    const [total, setTotal] = useState('');

    const loadCesta = async () => {
        CestaService.findById(id)
            .then((response: any) => {
                let data = response._array[0];
                setNome(data.nome);
                setDescricao(data.descricao);
                setDataCadastro(data.created_at)
                setTotal(data.total);
                
                console.log(data)
            }), (error: unknown) => {
                console.log('error ao buscar: ' + error);
            }
    };

    useEffect(() => {
        setDataAtualizacao(Util.getDataHoraAtual())
        loadCesta();
        return () => {};
    }, [route]);

    function handleLinkToCesta() {
        navigate('Cesta');
    }

    // async function loadCesta() {


    //     CestaService.findById(id)
    //         .then((response: any) => {
    //             let data = response._array[0];
    //             setNome(data.nome);
    //             setDescricao(data.descricao);
    //             setDataCadastro(data.created_at)
                
    //             console.log(data)
    //         }), (error: unknown) => {
    //             console.log('error ao buscar: ' + error);
    //         }

    // }


    function alertValInputs() {

        let cesta: CestaModel = new CestaModel();

        cesta.nome = nome
        cesta.descricao = descricao
        cesta.created_at = dataCadastro
        cesta.updated_at = dataAtualizacao
        cesta.id = id
        cesta.total = total

        const insertId = CestaService.updateById(cesta);


         console.log(
             "Nome: " + nome +
             "\nDescrição: " + descricao +
             "\Data de Atualização: " + dataAtualizacao +
             "\nData de Cadastro: " + dataCadastro
         );




        setNome('');
        setDescricao('');
        setDataCadastro('');
        setDataAtualizacao('');
        handleLinkToCesta();
    }
    

    return (
        <KeyboardAvoidingView
            behavior={'height'}
            style={{ flex: 1, backgroundColor: 'red' }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.container}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={handleLinkToCesta} style={styles.backIcon}>
                            <Image source={backIcon} style={{ tintColor: 'black', width: 40, height: 45 }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Atualizar Cesta</Text>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput
                                value={nome}
                                placeholder="Compra Centro Sul"
                                onChangeText={(text) => setNome(text)}
                                style={styles.input}
                                autoCapitalize="words"
                                autoCorrect={true}
                                returnKeyType={'next'}
                                onSubmitEditing={() => descricaoInput.focus()}
                            />
                        </View>

                    </View>





                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={[styles.label]}>Descrição</Text>
                            <TextInput
                                value={descricao}
                                onChangeText={(text) => setDescricao(text)}
                                style={styles.inputDescription}
                                autoCapitalize="sentences"
                                autoCorrect={true}
                                multiline
                                numberOfLines={6}
                                returnKeyType={'send'}
                                ref={(input) => { descricaoInput = input; }}
                            />
                        </View>


                    </View>


                    <View style={[styles.inputGroup, {marginBottom: -20, marginTop: -20}]}>
                        <View style={styles.inputBlock}>

                            <Text style={[styles.label]}>Data de Atualização</Text>
                            <TextInput
                                editable={false}
                                value={dataAtualizacao}
                                onChangeText={text => setDataAtualizacao(text)}
                                style={[styles.input, { backgroundColor: '#d3d3d3', width: 170 }]}
                            />
                        </View>


                    </View>
                    <View style={[styles.inputGroup, {marginBottom: -38}]}>
                        <View style={styles.inputBlock}>

                            <Text style={[styles.label]}>Data de Cadastro</Text>
                            <TextInput
                                editable={false}
                                value={dataCadastro}
                                onChangeText={text => setDataCadastro(text)}
                                style={[styles.input, { backgroundColor: '#d3d3d3', width: 170 }]}
                            />
                        </View>


                    </View>

                    <TouchableOpacity style={styles.loadButton} onPress={alertValInputs}>
                        <Text style={styles.textBtn}>Salvar</Text>
                    </TouchableOpacity>




                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}
export default AtualizarCesta;