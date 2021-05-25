import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        textAlign: 'center',
        width: '100%',
        


    },

    cestaList: {
        width: '100%',
        // marginTop: 130,
        marginLeft: 50,
        marginBottom: 20,
        marginTop: 40,
        // marginBottom: 60
    },

    name: {
        marginHorizontal: 30,
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        lineHeight: 35,
        // color: '#6a6180',
        color: 'black',
        marginLeft: 6
        
    },


    inputBlock: {
       width: '100%',
        // paddingTop: 53,
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
        marginBottom: 6,
    },

    price: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 11,
        lineHeight: 15,
        color: '#04d361',
        textAlign: 'right',
        // marginRight: ,
        // marginTop: ,
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
        justifyContent: 'space-between',
        alignItems: 'flex-end',


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



});

export default styles;