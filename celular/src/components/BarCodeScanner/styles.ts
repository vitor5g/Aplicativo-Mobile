import { StyleSheet, Appearance, useColorScheme } from 'react-native';

const colorScheme = Appearance.getColorScheme();

// console.log(colorScheme);

const styles = StyleSheet.create({

    topBar: {
        left: -170,
        top: 30
        // bottom: 80,
    },

    backIcon: {
        borderRadius: 80,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    barcodeScanner: {
        width: '100%',
        flex: 1,
        // marginBottom: 310,
        // marginTop: 160,

    },

    title: {
        color: 'black',
        fontSize: 28,
        // width: 165,
        textAlign: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        // textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
        // marginLeft: 20,
        marginTop: -60,
        top: 80
    },

});

export default styles;