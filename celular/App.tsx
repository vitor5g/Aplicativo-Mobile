import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins'
import DatabaseInit from './src/database/DatabaseInit';

import MenuDrawer from './src/routes/Drawer';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    new DatabaseInit();
    return (
      <>
        <MenuDrawer />
        <StatusBar style="auto" />
      </>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
