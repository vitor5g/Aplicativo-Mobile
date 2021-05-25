import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch


} from 'react-native-paper'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import {MaterialCommunityIcons} from '@expo/vector-icons';

import styles from './styles';


export function DrawerContent(props) {

    const paperTheme = useTheme();

    // const { signOut, toggleTheme } = React.useContext(AuthContext);


    

     function signOut(){
         alert('aqui');
     }

    return (
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props} >
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection:'row',marginTop: 15}}>
                        <Avatar.Image 
                            source={{
                                uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                            }}
                            size={50}
                        />
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>John Doe</Title>
                            <Caption style={styles.caption}>@j_doe</Caption>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                            <Caption style={styles.caption}>Following</Caption>
                        </View>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                            <Caption style={styles.caption}>Followers</Caption>
                        </View>
                    </View>
                </View>

                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <MaterialCommunityIcons 
                            name="home-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('Cesta')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <MaterialCommunityIcons 
                            name="account-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Comparar"
                        onPress={() => {props.navigation.navigate('ComparacaoProduto')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <MaterialCommunityIcons 
                            name="bookmark-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Bookmarks"
                        onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <MaterialCommunityIcons 
                            name="settings-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Settings"
                        onPress={() => {props.navigation.navigate('SettingsScreen')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <MaterialCommunityIcons 
                            name="account-check-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Support"
                        onPress={() => {props.navigation.navigate('SupportScreen')}}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={() => {toggleTheme()}}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={paperTheme.dark}/>
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem 
                icon={({color, size}) => (
                    <MaterialCommunityIcons 
                    name="exit-to-app" 
                    color={color}
                    size={size}
                    />
                )}
                label="Sign Out"
                onPress={signOut}
            />
        </Drawer.Section>
    </View>
    )
}