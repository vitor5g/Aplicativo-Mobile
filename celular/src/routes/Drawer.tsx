import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';


import Cesta from '../pages/Cesta/Cesta';
import CadastroCesta from '../pages/CadastroCesta/CadastroCesta';
import AtualizarCesta from '../pages/CadastroCesta/AtualizarCesta';

import Produto from '../pages/Produto/Produto';
import CadastroProduto from '../pages/CadastroProduto/CadastroProduto';
import AtualizarProduto from '../pages/CadastroProduto/AtualizarProduto';

import ComparacaoProduto from '../pages/ComparacaoProduto/ComparacaoProduto';


import BarCodeScanner from '../components/BarCodeScanner/BarCodeScanner';
import Camera from '../components/Camera/Camera';


import { DrawerContent } from '../components/MenuDrawer/DrawerContent';






const { Navigator, Screen } = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Navigator initialRouteName="Cesta" drawerContent={props => <DrawerContent {...props} />} >
                <Screen name="Cesta" component={Cesta} />
                <Screen name="CadastroCesta" component={CadastroCesta} options={{gestureEnabled: false}}/>
                <Screen name="AtualizarCesta" component={AtualizarCesta} options={{gestureEnabled: false}}/>
                <Screen name="Produto" component={Produto} />
                <Screen name="CadastroProduto" component={CadastroProduto} options={{gestureEnabled: false}} initialParams={{ barcode: null }} />
                <Screen name="AtualizarProduto" component={AtualizarProduto} options={{gestureEnabled: false}} initialParams={{ barcode: null }} />
                <Screen name="ComparacaoProduto" component={ComparacaoProduto} initialParams={{ idCesta: 1 }} />
                <Screen name="BarCodeScanner" component={BarCodeScanner} options={{gestureEnabled: false}} />
                <Screen name="Camera" component={Camera} options={{gestureEnabled: false}} />
            </Navigator>

        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    menuIcon: {
        // zIndex: 9,
        // position: 'absolute',
        paddingTop: 80,
        left: 40,

    }
})