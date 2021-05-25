import React from 'react';

import { View, Text, Alert } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { SimpleLineIcons } from '@expo/vector-icons';
import CestaService from '../../services/Cesta.service'
import ProdutoService from '../../services/Produto.service'
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { NavigationScreenProp, NavigationState } from 'react-navigation';

export type NavigationDrawerState = NavigationState & {
  isDrawerOpen: boolean;
};

interface MenuOptionsProps {
  id: number;
  headerRight?: string;
  isUpdate?: boolean;
  pageNavigateName?: string;

}


const MenuOptions: React.FC<MenuOptionsProps> = ({ id, headerRight, isUpdate, pageNavigateName, children }) => {

  const { navigate } = useNavigation();

  let _menu = null;

  function setMenuRef(ref) {
    _menu = ref;
  };

  function hideMenu() {
    _menu.hide();

  };

  function showMenu() {
    _menu.show();
  };

  function deleteItem(){
    _menu.hide();
    confirmDialog(headerRight);
  }

  function confirmDialog(nome: string) {
    Alert.alert(
      "Excluir",
      "Deseja realmente excluir este item?",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {

            if (nome === "cesta") {
              CestaService.deleteById(id);
            }

            if (nome === "produto") {
              ProdutoService.deleteById(id);
            }

          }
        }
      ],
      { cancelable: false }
    );
  }

  function handleToAnyUpdate(id: number, pageNavigateName: string) {
    _menu.hide();

    navigate(pageNavigateName, {
        id: id,
    });
}

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 292, height: 34, width: 65, top: 35 }}>
      <Menu
        ref={(ref) => setMenuRef(ref)}
        button={<RectButton onPress={showMenu}><SimpleLineIcons name="options-vertical" size={16} color="black" /></RectButton>}
      >
        <MenuItem onPress={deleteItem}>Excluir</MenuItem>
        {isUpdate ? <MenuItem onPress={() => handleToAnyUpdate(id, pageNavigateName)}>Atualizar</MenuItem> : null}

        <MenuItem onPress={hideMenu} disabled>
          Menu item 3
          </MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
      </Menu>
    </View>
  );
}

export default MenuOptions;