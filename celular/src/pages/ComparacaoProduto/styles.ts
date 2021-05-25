import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        textAlign: 'center',
        width: '100%',
        justifyContent: 'space-around'



    },

    containerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    label: {
        color: 'black',
        fontSize: 16,
        // width: 165,
        textAlign: 'center',
        flexDirection: 'row',
        marginBottom: 15,
        // textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        //marginLeft: 20,
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
        width: 150,
        height: 38,
        // fontFamily: 'Archivo_400Regular',
    },

    cestaList: {
        width: 350,
        // marginTop: 130,
        marginLeft: 30,
        marginBottom: 80,
        padding: 10,
        marginTop: 20,
        flexDirection: 'column'
        // marginBottom: 60
    },

    notaList: {
        width: 350,
        marginLeft: 30,
        marginBottom: 80,
        padding: 10,
        marginTop: -20,
        flexDirection: 'column'
        // marginBottom: 60
    },

    name: {
        marginHorizontal: 30,
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        lineHeight: 35,
        // color: '#6a6180',
        color: 'black',
        marginLeft: 5

    },

    quantidade: {
        marginHorizontal: 30,
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        lineHeight: 35,
        // color: '#6a6180',
        color: '#000',
        marginRight: -12

    },


    inputBlock: {
        width: '100%',
    },

    information: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    description: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
        lineHeight: 15,
        color: '#6a6180',
        textAlign: 'justify',
        marginLeft: 15,
        marginBottom: 8
    },

    price: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        lineHeight: 15,
        color: '#03a84d',
        textAlign: 'right',
        // marginRight: ,
        // marginTop: -10 ,
    },
    date: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 9,
        lineHeight: 15,
        color: '#6a6180',
        textAlign: 'right',
        // marginRight: 50,
        marginTop: 10,
    },

    menuIcon: {
        // justifyContent: 'space-between',
        // alignItems: 'flex-end',
        flexDirection: 'row',
        // marginTop: 40,
        justifyContent: 'space-between',


    },

    backIcon: {
        borderRadius: 80,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        color: 'black',
        fontSize: 24,
        // width: 165,
        textAlign: 'center',
        flexDirection: 'row',
        // marginBottom: 15,
        // textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
        // marginLeft: 20,
        // marginTop: 10,
        alignSelf: 'center',
        marginTop: 45,
        marginLeft: 20

    },

    nomeCesta: {
        color: 'black',
        fontSize: 20,
        // width: 165,
        textAlign: 'center',
        flexDirection: 'row',
        // marginBottom: 15,
        // textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        // marginLeft: 20,
        // marginTop: 10,
        alignSelf: 'center',
        marginTop: 25
    },

    
    deleteButton: {
        backgroundColor: 'black',
        height: 60,
        width: 60,
        borderRadius: 40,
        left: 290,
        bottom: 65,
        marginBottom: -40,
        // left: 300,
        // bottom: 50,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    compareButton: {
        backgroundColor: '#000000',
        height: 60,
        width: 60,
        borderRadius: 40,
        left: 20,
        bottom: 85,
        marginBottom: -40,
        // left: 300,
        // bottom: 50,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }



});

export default styles;