import { StyleSheet, Appearance, useColorScheme } from 'react-native';

const colorScheme = Appearance.getColorScheme();

// console.log(colorScheme);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
    },

    topBar: {
        left: -150,
        bottom: 80,
    },

    backIcon: {
        borderRadius: 80,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    label: {
        color: 'black',
        fontSize: 16,
        width: 165,
        textAlign: 'center',
        flexDirection: 'row',
        // marginBottom: 15,
        // textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        // marginLeft: 20,
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

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    inputBlock: {
        width: '30%',
        // marginRight: 50,
        marginBottom: 35,
        // marginLeft: 33,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },


    input: {
        backgroundColor: '#ffff',
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
        width: 250,
        height: 45,
        // marginLeft: -50
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
        // marginLeft: -72,
        fontFamily: 'Archivo_400Regular',
        // marginBottom: 20,
    },

    loadButton: {
        width: 180,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 50,
        // marginLeft: 25,
        // bottom: -30
        marginTop: 30,
    },

    textBtn: {
        color: 'white',
        fontFamily: 'Archivo_700Bold',
        fontSize: 23,
    }
});

export default styles;