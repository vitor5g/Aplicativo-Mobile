import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'
import { TouchableOpacity, RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
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
    };
}




const CadastroCesta: React.FC<NavigationProps> = ({ navigation }) => {


    const { navigate } = useNavigation();


    //Variaveis que armazenam os inputs para poder passar para o proximo input
    let descricaoInput: TextInput;


    //Variaveis que armazenam os estados dos inputs
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            return setDataCadastro(Util.getDataHoraAtual());
        });

    });

    function handleLinkToCesta() {
        navigate('Cesta');
    }


    function alertValInputs() {

        let cesta: CestaModel = new CestaModel();

        cesta.nome = nome
        cesta.descricao = descricao
        cesta.created_at = dataCadastro
        cesta.updated_at = dataCadastro
        cesta.total = 0;

        const insertId = CestaService.addData(cesta);


        console.log(
            "Nome: " + nome +
            "\nDescrição: " + descricao +
            "\nData de Cadastro: " + dataCadastro
        );



        setNome('');
        setDescricao('');
        setDataCadastro('');
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
                    <Text style={styles.title}>Cadastro de Cesta</Text>

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


                    <View style={styles.inputGroup}>
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
export default CadastroCesta;