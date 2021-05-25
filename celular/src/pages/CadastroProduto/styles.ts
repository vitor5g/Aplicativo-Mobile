import { StyleSheet, Appearance, useColorScheme } from 'react-native';


const colorScheme = Appearance.getColorScheme();




// console.log(colorScheme);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center"
    },

    label: {
        color: 'black',
        fontSize: 16,
        // width: 165,
        textAlign: 'center',
        flexDirection: 'row',
        // marginBottom: 15,
        // textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 20,
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    inputBlock: {
        width: '30%',
        marginRight: 50,
        marginBottom: 15,
        marginLeft: 33,
    },


    input: {
        backgroundColor: '#ffffff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 8,
        fontSize: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
        // marginRight: 300,
        width: 150,
        height: 38,
        // fontFamily: 'Archivo_400Regular',
    },
    inputDescription: {
        backgroundColor: '#ffff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 8,
        fontSize: 14,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
        // marginRight: 300,
        width: 300,
        marginLeft: -72,
        fontFamily: 'Archivo_400Regular',
        marginBottom: 20,
    },

    topBar: {
        left: -150,
        bottom: 0,
    },

    backIcon: {
        borderRadius: 80,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        color: 'black',
        fontSize: 28,
        // width: 165,
        textAlign: 'center',
        flexDirection: 'row',
        // marginBottom: 15,
        // textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
        // marginLeft: 20,
        // marginTop: -40,
        marginBottom: 80,
    },

    loadButton: {
        width: 180,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 50,
        marginLeft: 25,
        marginTop: -18
    },

    barcodeBtn:{
        marginLeft: 10,
    },

    viewScanButton: {
        top: -60,
    },

    scanButton: {
        borderRadius: 40,
        width: 70,
        height: 70,
        justifyContent: 'center',
        // alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',

        // marginTop: -60,
        // marginBottom: 35,
    },

    textBtn: {
        color: 'white',
        fontFamily: 'Archivo_700Bold',
        fontSize: 23,
    }
});

export default styles;