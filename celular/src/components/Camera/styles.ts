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

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    capture: {
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

    textBtn: {
        color: 'white',
        fontFamily: 'Archivo_700Bold',
        fontSize: 23,
    }
});

export default styles;