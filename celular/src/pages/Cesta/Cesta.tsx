import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, RefreshControl, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

// import firebase from 'firebase';

import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

import * as Util from '../../Util/Util'

import MenuButton from '../../components/MenuButton/MenuButton';

import MenuOptions from '../../components/MenuOptions/MenuOptions'

import CestaService from '../../services/Cesta.service'
import { Cesta as CestaModel } from '../../schemas/Cesta.model'

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






const Cesta: React.FC<NavigationProps> = ({ route, navigation }) => {

    const { navigate } = useNavigation();

    const [cestas, setCestas] = useState([]);

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const wait = (timeout: any) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadCestas()
        wait(2000).then(() => setRefreshing(false));


    }, []);


    function handleToCadastroCesta() {
        navigate('CadastroCesta');
    }

    function handleToProduto(id: any) {
        navigate('Produto', {
            idCesta: id,
            barcode: null,
        });
    }

    function confirmDialog() {
        Alert.alert(
            "Excluir",
            "Deseja realmente deletar todas as cestas?",
            [
                {
                    text: "Cancel",
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        CestaService.deleteAll();
                    }
                }
            ],
            { cancelable: false }
        );
    }



    async function loadCestas() {


        CestaService.findAll()
            .then((response: any) => {
                let data = response._array;
                setCestas(data);
                // console.log(data)
            }), (error: unknown) => {
                console.log('error ao buscar: ' + error);
            }

    }

    useFocusEffect(() => {
        loadCestas();
    });

    return (
        <SafeAreaView style={styles.container}>
            <MenuButton navigation={navigation} />
            <View style={styles.menuIcon}>

                <TouchableOpacity onPress={handleToCadastroCesta} style={{ marginTop: 40, width: 80, height: 40, alignItems: 'center' }}>
                    <Ionicons
                        name="md-add"
                        color="#000000"
                        size={35}
                    />
                </TouchableOpacity>
            </View>


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

                {cestas.map((cesta: CestaModel) => {
                    return (
                        <View style={{ marginTop: 0, backgroundColor: 'white', width: 310, marginLeft: -20 }}>
                            <MenuOptions id={cesta.id} headerRight={"cesta"} isUpdate={true} pageNavigateName={"AtualizarCesta"} />

                            <TouchableOpacity style={styles.inputBlock}
                                key={cesta.id}
                                onPress={() => handleToProduto(cesta.id)}
                            >
                                <Text style={styles.name}>
                                    <FontAwesome5
                                        name="shopping-basket"
                                        color="black"
                                        size={20}
                                    />
                                    {'  '}
                                    {cesta.nome} {' '}

                                </Text>

                                <View style={styles.information}>
                                    <Text style={styles.description}>{cesta.descricao}</Text>
                                    <Text style={styles.price}>R$ {cesta.total ? cesta.total.toFixed(2).toString().replace(".", ",") : "0,00"}</Text>
                                    <Text style={styles.date}>Última Atualização: {cesta.updated_at}</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                    )
                })}


            </ScrollView>
            <RectButton style={styles.deleteButton} onPress={confirmDialog}>
                <FontAwesome5
                    name="trash-alt"
                    color="#ffff"
                    size={22}

                />
            </RectButton>
        </SafeAreaView>


    )

}
export default Cesta;