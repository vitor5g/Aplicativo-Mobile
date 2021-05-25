import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton, BaseButton } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions'


import styles from './styles';
import backIcon from '../../assets/icons/back.png';

export default function App({ navigation }) {

  const { navigate } = useNavigation();

  let camera: any;

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // useFocusEffect(() => {
  //   console.log('aqui');
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // });

  useEffect(() => {
      (async () => {
      console.log('la');
        const { status } = await Camera.requestPermissionsAsync();
        console.log(status)
        setHasPermission(status === 'granted');
      })();

});
  

  if (hasPermission === null) {
    console.log('Permissão nula');
    return <View />;
  }
  if (hasPermission === false) {
    console.log('Permissão falsa');
    return <Text>No access to camera</Text>;
  }

let numero: any;

  const snap = async () => {
    if (camera) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      console.log('photo');
      let {uri} = await camera.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      MediaLibrary.createAlbumAsync('Expo', asset)
      .then(() => {
        Alert.alert('Album created!')
      })
      .catch(error => {
        Alert.alert('An Error Occurred!')
      });
      // await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images/');
      // FileSystem.copyAsync({ from: photo.uri, to: FileSystem.documentDirectory + 'images/vitor01camera.jpg'}).then(({uri}) => {
      //   console.log(uri)
      // }).catch(error => {
      //   console.log("Erro foi: " + error)
      // })
      
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {camera = ref;}} >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          {/* <View style={styles.buttonContainer}> */}
            <TouchableOpacity onPress={snap} style={{flex: 0.1,
              alignSelf: 'center',
              alignItems: 'center',}}>
              <Text style={styles.textBtn}> SNAP </Text>
            </TouchableOpacity>
          {/* </View> */}
        </View>
      </Camera>
    </View>
  );
}