import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { NavigationScreenProp, NavigationState } from 'react-navigation'

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




const MenuButton: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <Ionicons
            name="md-menu"
            color="#000000"
            size={32}
            style={styles.menuIcon}
            onPress={() => navigation.toggleDrawer()}
        />
    )
}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        top: 40,
        left: 20,

    }
})

export default MenuButton;
