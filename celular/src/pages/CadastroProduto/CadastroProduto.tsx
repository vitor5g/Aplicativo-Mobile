import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'
import { TouchableOpacity, RectButton, BaseButton } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Formik } from 'formik';
import * as Yup from "yup"
import { setLocale } from 'yup'
import { Picker } from '@react-native-picker/picker';



import styles from './styles';
import backIcon from '../../assets/icons/back.png'

import ProdutoService from '../../services/Produto.service'
import { Produto as ProdutoModel } from '../../schemas/Produto.model'

import * as Util from '../../Util/Util'


// setLocale({
//     mixed: {
//         default: 'Não é válido',
//     },
//     number: {
//         min: 'Deve ser maior que ${min}',
//         integer: 'Não é um numero'
//     },
// });

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
    route: any;
}


const CadastroProduto: React.FC<NavigationProps> = ({ route, navigation }) => {

    const { idCesta } = route.params;

    const { barcode } = route.params;


    const productSchema = Yup.object().shape({

        descricao: Yup
            .string()
            .required("descricao"),
        price: Yup
            .string()
            .required("preco"),
        quantidade: Yup
            .string()
            .required("quantidade"),
        nome: Yup
            .string()
            .required("nome"),
        codBarras: Yup
            .string()
            .required("codbarras")
            .min(13, "codbarrasT")
            .max(13, "codbarrasT"),
    });


    const { navigate } = useNavigation();


    //Variaveis que armazenam os inputs para poder passar para o proximo input
    let nomeInput: any, quantidadeInput: any, unidadeMedidaInput: any, descricaoInput: any, precoInput: any;


    //Variaveis que armazenam os estados dos inputs
    const [price, setPrice] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const [codBarras, setCodBarras] = useState('');
    const [selectedUnidadeMedida, setSelectedUnidadeMedida] = useState();
    const [selectedCategoria, setSelectedCategoria] = useState();

    //Variaveis que armazenam os estados dos erros dos inputs
    const [erroPrice, setErroPrice] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [erroDescricao, setErroDescricao] = useState('');
    const [erroquantidade, setErroQuantidade] = useState('');
    const [errounidadeMedida, setErroUnidadeMedida] = useState('');
    const [errocodBarras, setErroCodBarras] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            return setCodBarras(barcode);
        });
    });

    function handleLinkToProduto() {
        navigate('Produto');
        setPrice('');
        setNome('');
        setDescricao('');
        setQuantidade('');
        setUnidadeMedida('');
        setCodBarras('');

        setErroPrice('');
        setErroNome('');
        setErroDescricao('');
        setErroQuantidade('');
        setErroUnidadeMedida('');
        setErroCodBarras('');
    }

    function alertValInputs() {
        let produtoFormData = { nome, codBarras, quantidade, unidadeMedida, price, descricao };

        console.log(
            "Nome: " + nome +
            "\nQuantidade: " + quantidade +
            "\nPreço: " + price +
            "\nDescrição: " + descricao +
            "\nCesta: " + idCesta +
            "\nCodBarras: " + codBarras
        );

        productSchema.validate(produtoFormData).then(valid => {

            //Pega o preco formatado para salvar no banco 
            const newprice = Util.convertPriceInFloat(price)

            let produto: ProdutoModel = new ProdutoModel();

            produto.nome = nome
            produto.quantidade = quantidade
            produto.preco = newprice
            produto.codBarras = codBarras
            produto.descricao = descricao
            produto.cesta_id = idCesta


            const insertId = ProdutoService.addData(produto);

            console.log(
                "Nome: " + nome +
                "\nQuantidade: " + quantidade +
                "\nPreço: " + newprice +
                "\nDescrição: " + descricao +
                "\nCesta: " + idCesta
            );


            setCodBarras('');
            setPrice('');
            setNome('');
            setDescricao('');
            setQuantidade('');
            setUnidadeMedida('');

            setErroPrice('');
            setErroNome('');
            setErroDescricao('');
            setErroQuantidade('');
            setErroUnidadeMedida('');
            setErroCodBarras('');

            navigate('Produto', {
                barcode: null,
            });

        }).catch(function (e) {
            const error = e.toString().split(":")[1].trim();
            if (error === "nome") {
                setErroNome("*Preencha este campo");
                setErroCodBarras("");
                setErroPrice("");
                setErroQuantidade("");
                setErroDescricao("");
                if (nomeInput) {
                    setTimeout(() => nomeInput.focus(), 250);
                }
            }
            if (error === "codbarras") {
                setErroCodBarras("*Preencha este campo");
                setErroNome("");
                setErroPrice("");
                setErroQuantidade("");
                setErroDescricao("");
            }
            if (error === "codbarrasT") {
                setErroCodBarras("*Digite um código de barras válido");
                setErroNome("");
                setErroPrice("");
                setErroQuantidade("");
                setErroDescricao("");
            }
            if (error === "preco") {
                setErroPrice("*Preencha este campo");
                setErroCodBarras("");
                setErroNome("");
                setErroQuantidade("");
                setErroDescricao("");
                if (precoInput) {
                    setTimeout(() => precoInput.focus(), 250);
                }
            }
            if (error === "quantidade") {
                setErroQuantidade("*Preencha este campo");
                setErroCodBarras("");
                setErroPrice("");
                setErroNome("");
                setErroDescricao("");
                if (quantidadeInput) {
                    setTimeout(() => quantidadeInput.focus(), 250);
                }
            }
            if (error === "descricao") {
                setErroDescricao("*Preencha este campo");
                setErroCodBarras("");
                setErroPrice("");
                setErroQuantidade("");
                setErroNome("");
                if (descricaoInput) {
                    setTimeout(() => descricaoInput.focus(), 250);
                }
            }
            console.log("error: " + e);
        });
    }

    function scanBarcode() {
        navigate('BarCodeScanner', {
            rota: 'CadastroProduto'
        });
    }

    function capturePicture() {
        navigate('Camera');
    }

    return (
        <KeyboardAvoidingView
            // behavior={Platform.select({
            //     ios: 'padding',
            //     android: null,
            // })}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.container}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={handleLinkToProduto} style={styles.backIcon}>
                            <Image source={backIcon} style={{ tintColor: 'black', width: 40, height: 45 }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Cadastro de Produto</Text>

                    {/* <View style={styles.viewScanButton}>
                        <TouchableOpacity style={styles.scanButton} onPress={capturePicture}>
                            <Ionicons name="ios-camera" size={34} color="#8e4dff" />
                        </TouchableOpacity>
                    </View> */}


                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={[styles.label, { width: 122, marginLeft: 15 }]}>Codigo de Barras</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    maxLength={13}
                                    style={[styles.input, { width: 180, marginLeft: -15, textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }]}
                                    value={codBarras}
                                    onChangeText={(text) => setCodBarras(text)}
                                    keyboardType='numeric'
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => { nomeInput.focus(); }}
                                />
                                <TouchableOpacity style={styles.barcodeBtn} onPress={scanBarcode}>
                                    <Ionicons name="ios-barcode" size={34} color="#8e4dff" />
                                </TouchableOpacity>

                            </View>
                            <TextInput
                                style={{ color: '#ff3333', left: 15, fontFamily: 'Poppins_600SemiBold', fontSize: 13, width: 200 }}
                                value={errocodBarras}
                                onChangeText={(text) => setErroCodBarras(text)}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput
                                autoFocus={true}
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                                style={styles.input}
                                autoCapitalize="words"
                                autoCorrect={true}
                                ref={(input) => { nomeInput = input; }}
                                returnKeyType={'next'}
                                onSubmitEditing={() => { quantidadeInput.focus(); }}
                            />
                            <TextInput
                                style={{ color: '#ff3333', left: 15, fontFamily: 'Poppins_600SemiBold', fontSize: 13, }}
                                value={erroNome}
                                onChangeText={(text) => setErroNome(text)}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={[styles.inputGroup, { marginTop: -35, marginBottom: 25 }]}>
                        <View style={styles.inputBlock}>
                            <Text style={{
                                color: 'black',
                                fontSize: 16,
                                width: 165,
                                textAlign: 'center',
                                flexDirection: 'row',
                                fontFamily: 'Poppins_600SemiBold',
                                marginTop: 20,
                                marginLeft: -10,

                            }}>Categoria</Text>
                            <View style={{
                                backgroundColor: '#ffffff',
                                borderRadius: 25,
                                paddingHorizontal: 8,
                                shadowColor: '#000',
                                shadowOpacity: 0.2,
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                elevation: 2,
                                width: 150,
                                height: 38,
                            }}>
                                <Picker
                                    style={{ color: 'black', width: 150, height: 40 }}
                                    selectedValue={selectedCategoria}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedCategoria(itemValue)
                                    }>
                                    <Picker.Item label="Selecione" value="java" />
                                    <Picker.Item label="Alimentos" value="js" />
                                    <Picker.Item label="Bebidas" value="js" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={{
                                color: 'black',
                                fontSize: 16,
                                width: 165,
                                textAlign: 'center',
                                flexDirection: 'row',
                                fontFamily: 'Poppins_600SemiBold',
                                marginTop: 20,
                                marginLeft: -10,

                            }}>Unidade de Medida</Text>
                            <View style={{
                                backgroundColor: '#ffffff',
                                borderRadius: 25,
                                paddingHorizontal: 8,
                                shadowColor: '#000',
                                shadowOpacity: 0.2,
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                elevation: 2,
                                width: 150,
                                height: 38,
                                
                            }}>
                                <Picker
                                    style={{ color: 'black', width: 150, height: 40 }}
                                    selectedValue={selectedUnidadeMedida}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedUnidadeMedida(itemValue)
                                    }>
                                    <Picker.Item label="Selecione" value="java" />
                                    <Picker.Item label="Litro" value="js" />
                                    <Picker.Item label="Balde" value="js" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Quantidade</Text>
                            <TextInput
                                value={quantidade}
                                onChangeText={(text) => setQuantidade(text)}
                                ref={(input) => { quantidadeInput = input; }}
                                style={styles.input}
                                keyboardType='numeric'
                                returnKeyType={'next'}
                                onSubmitEditing={() => { precoInput.focus(); }}
                            />
                            <TextInput
                                style={{ color: '#ff3333', left: 15, fontFamily: 'Poppins_600SemiBold', fontSize: 13, }}
                                value={erroquantidade}
                                onChangeText={(text) => setErroQuantidade(text)}
                                editable={false}
                            />
                        </View>



                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Preço (R$)</Text>
                            <TextInputMask
                                value={price}
                                onChangeText={text => setPrice(text)}
                                style={[styles.input, { marginBottom: 20 }]}
                                refInput={(input) => { precoInput = input; }}
                                type={'money'}
                                returnKeyType={'next'}
                                onSubmitEditing={() => { descricaoInput.focus(); }}
                            />
                            <TextInput
                                style={{ color: '#ff3333', left: 15, fontFamily: 'Poppins_600SemiBold', fontSize: 13, }}
                                value={erroPrice}
                                onChangeText={(text) => setErroPrice(text)}
                                editable={false}
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
                            <TextInput
                                style={{ color: '#ff3333', left: 15, fontFamily: 'Poppins_600SemiBold', fontSize: 13, marginTop: -18, marginBottom: 18 }}
                                value={erroDescricao}
                                onChangeText={(text) => setErroDescricao(text)}
                                editable={false}
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
export default CadastroProduto;