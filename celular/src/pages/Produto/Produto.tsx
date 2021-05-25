import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, RefreshControl, Alert, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import SvgUri from 'react-native-svg-uri';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

import MenuOptions from '../../components/MenuOptions/MenuOptions'

import CestaService from '../../services/Cesta.service'
import { Cesta as CestaModel } from '../../schemas/Cesta.model'

import ProdutoService from '../../services/Produto.service'
import { Produto as ProdutoModel } from '../../schemas/Produto.model'

import backIcon from '../../assets/icons/back.png'
import compareIcon from '../../assets/icons/git-compare-outline.png'


import api from '../../services/api';
import ProdutoNotaService from '../../services/ProdutoNota.service'
import { ProdutoNota as ProdutoNotaModel } from '../../schemas/ProdutoNota.model'
import { replace } from 'formik';

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




const ComparacaoProduto: React.FC<NavigationProps> = ({ route, navigation }) => {

    const { idCesta } = route.params;

    const { barcode } = route.params;

    const { navigate } = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    //Variaveis que armazenam os estados dos inputs
    const [cestaNome, setCestaNome] = useState('');
    const [cestaTotal, setCestaTotal] = useState('');
    const [cestaId, setCestaId] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [chaveAcesso, setChaveAcesso] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            if (barcode !== null) {
                setModalVisible(true);
            }
            return setChaveAcesso(barcode);
        });
    });

    const wait = (timeout: any) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadCesta()
        loadProdutos()
        wait(2000).then(() => setRefreshing(false));


    }, []);

    async function loadCesta() {
        CestaService.findById(idCesta)
            .then((response: any) => {
                let data = response._array;
                data.map((cesta: CestaModel) => {
                    setCestaNome(cesta.nome);
                    setCestaId(cesta.id.toString())
                    setCestaTotal(cesta.total ? cesta.total.toFixed(2).toString().replace(".", ",") : "0,00");
                })
            }), (error: unknown) => {
                console.log('error ao buscar: ' + error);
            }

    }

    async function loadProdutos() {
        ProdutoService.findByCestaId(idCesta)
            .then((response: any) => {
                let data = response._array;
                setProdutos(data);
            }), (error: unknown) => {
                console.log('error ao buscar: ' + error);
            }

    }

    useFocusEffect(() => {
        loadCesta();
        loadProdutos();
        //   ProdutoService.findAll()
        //       .then((response: any) => {
        //           let data = response._array;
        //           console.log(data)

        //       }), (error: unknown) => {
        //           console.log('error ao buscar: ' + error);
        //       }
    });

    function handleLinkToCesta() {
        navigate('Cesta');
    }


    function closeModal() {
        setModalVisible(!modalVisible);
        setChaveAcesso('');
    }

    function handleToCadastroProduto() {
        navigate('CadastroProduto', {
            barcode: 0,
            idCesta: idCesta
        });
    }

    function scanQrcode() {
        closeModal();
        navigate('BarCodeScanner', {
            rota: 'Produto'
        });
    }

    function confirmDialog() {
        Alert.alert(
            "Excluir",
            "Deseja realmente deletar todos os produtos?",
            [
                {
                    text: "Cancel",
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        ProdutoService.deleteAll();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    //pega os produtos da nota no backend e salva no banco local
    function getProductsNota() {

        let produtosAPI = [];

        api.post('/' + cestaId, {

            produtosApp: JSON.stringify(produtos),
            acessKey: 3555,

        }).then(function (response) {
            produtosAPI = response.data;

            console.log(produtosAPI)

            for (let key = 0; key < Object.keys(produtosAPI).length; key++) {
                let produtoNota: ProdutoNotaModel = new ProdutoNotaModel();
                produtoNota.nome = produtosAPI[key].nome;
                produtoNota.codigo = produtosAPI[key].codigo;
                produtoNota.quantidade = parseFloat(produtosAPI[key].quantidade).toFixed(2);
                produtoNota.preco = parseFloat(produtosAPI[key].preco).toFixed(2);
                produtoNota.total = parseFloat(produtosAPI[key].total).toFixed(2);
                produtoNota.cesta_id = Number(produtosAPI[key].cesta);

                // console.log(produtosAPI[key].id)

                //const insertId = ProdutoNotaService.addData(produtoNota);
            }
        }).catch(function (error) {
            console.log('error: ' + error)
        })


    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <MenuButton navigation={navigation} /> */}
            <View style={styles.menuIcon}>
                <View style={{ alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={handleLinkToCesta} style={styles.backIcon}>
                        <Image source={backIcon} style={{ tintColor: 'black', width: 40, height: 45, marginTop: 38 }} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Lista de Produtos</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ marginTop: 40, width: 80, height: 40, alignItems: 'center', justifyContent: 'center', }} onPress={handleToCadastroProduto}>
                        <Ionicons
                            name="md-add"
                            color="#000000"
                            size={35}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            <Text style={styles.nomeCesta}>{cestaNome}</Text>

            <ScrollView
                style={styles.cestaList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                    alignContent: 'center'
                }}

                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }

            >

                {produtos.map((produto: ProdutoModel) => {
                    return (
                        <View style={{ marginTop: 0, backgroundColor: 'white', width: 310 }}>
                            <MenuOptions id={produto.id} headerRight={"produto"} isUpdate={true} pageNavigateName={"AtualizarProduto"} />

                            <TouchableOpacity style={styles.inputBlock} key={produto.id} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 15, }}>
                                    <Text style={styles.name}>
                                        <FontAwesome5
                                            name="bookmark"
                                            color="#000"
                                            size={18}

                                        />
                                        {'  '}
                                        {produto.nome}
                                    </Text>
                                    <Text style={styles.quantidade}><Text style={{ color: '#6a6180' }}>Qtd:</Text> {produto.quantidade} UN</Text>
                                </View>

                                <View style={styles.information}>
                                    <Text style={styles.description}>{produto.descricao}</Text>
                                    <Text style={styles.price}> <Text style={{ color: '#6a6180', fontSize: 10, fontFamily: 'Poppins_400Regular', }}>UN</Text> R$ {produto.preco.toFixed(2).toString().replace(".", ",")} </Text>
                                    <Text style={[styles.price, { textAlign: 'right', flexDirection: 'row', color: '#d3040e' }]}>  R$ {(produto.quantidade * produto.preco).toFixed(2).toString().replace(".", ",")} <Text style={{ color: '#6a6180', fontSize: 10, fontFamily: 'Poppins_400Regular', }}> TOTAL </Text> </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}

                >
                    <View style={[styles.containerModal, ]}>
                        <TouchableWithoutFeedback onPress={closeModal} accessible={false}>

                            <View style={styles.modalView}>
                                <View style={styles.menuIcon}>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <TouchableOpacity style={{
                                            marginLeft: 75, left: 70, top: -30, paddingLeft: 40, backgroundColor: 'white', width: 80, height: 40, alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                            onPress={closeModal}>
                                            <Ionicons
                                                name="ios-close"
                                                color="#000000"
                                                size={50}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.label}>Chave de Acesso:</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                                    <TextInput
                                        style={[styles.input, { width: 200, marginLeft: -15, textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }]}
                                        value={chaveAcesso}
                                        onChangeText={(text) => setChaveAcesso(text)}
                                        keyboardType='numeric'
                                        returnKeyType={'next'}
                                    />
                                    <Pressable style={{ marginLeft: 10 }} onPress={scanQrcode}>
                                        <Ionicons name="ios-camera" size={34} color="#8e4dff" />
                                    </Pressable>

                                </View>
                                <Pressable style={{
                                    borderRadius: 40, padding: 10, elevation: 2, backgroundColor: "#8e4dff", width: 160, height: 40, justifyContent: 'center', alignItems: 'center',
                                    marginBottom: 30, marginTop: -15,
                                }} onPress={() => alert('apertou')} >
                                    <Text style={{ color: 'white', fontFamily: 'Archivo_700Bold', fontSize: 20, }}>
                                        Comparar {" "}
                                        <Ionicons
                                            name="ios-git-compare"
                                            color="white"
                                            size={22}

                                        />
                                    </Text>
                                </Pressable>
                                <Pressable style={{
                                    borderRadius: 40, padding: 10, elevation: 2, backgroundColor: "black", width: 110, height: 40, justifyContent: 'center', alignItems: 'center'
                                }} onPress={closeModal} >
                                    <Text style={{ color: '#ffff', fontFamily: 'Archivo_700Bold', fontSize: 18, }}>Fechar</Text>
                                </Pressable>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </Modal>

            </ScrollView>

            <View style={{
                // height: 60, 
                // width: 60, 
                left: 260,
                bottom: 108,
                flexDirection: 'row',
                // marginBottom: -40, 
            }}>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#666666', fontSize: 20 }} >Total:</Text><Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#666666', fontSize: 20, }}> R$ {cestaTotal} </Text>
            </View>

            <RectButton style={styles.deleteButton} onPress={confirmDialog}>
                <FontAwesome5
                    name="trash-alt"
                    color="#ffff"
                    size={22}

                />
            </RectButton>

            <RectButton style={styles.compareButton} onPress={() => setModalVisible(true)}>
                <Ionicons
                    name="ios-git-compare"
                    color="#ffff"
                    size={30}

                />

            </RectButton>



        </SafeAreaView>

    )
}
export default ComparacaoProduto;