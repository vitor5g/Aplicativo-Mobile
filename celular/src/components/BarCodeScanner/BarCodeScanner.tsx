import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity, RectButton, BaseButton } from 'react-native-gesture-handler';
import { NavigationScreenProp, NavigationState } from 'react-navigation'

import styles from './styles';
import backIcon from '../../assets/icons/back.png';

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

const CodeScanner: React.FC<NavigationProps> = ({ route, navigation }) => {

  const { navigate } = useNavigation();

  const { rota } = route.params;

  const [rotaName, setRotaName] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      return setRotaName(rota);
    });
  });

  function handleNavigateToCadastroProduto(barcode: any) {
    navigate(rota, {
      barcode: barcode,
    });
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    handleNavigateToCadastroProduto(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => handleNavigateToCadastroProduto(0)} style={styles.backIcon}>
          <Image source={backIcon} style={{ tintColor: 'black', width: 40, height: 45 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Scan Bar Code</Text>
      <View style={styles.barcodeScanner}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, { width: '100%' }]}
        />
      </View>

      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </View>
  );
}

export default CodeScanner;
