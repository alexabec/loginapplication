import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ImageBackground, KeyboardAvoidingView, AsyncStorage, Image } from 'react-native';

export default class ProfileScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    // ********************************** CHECK IF USER IS LOGGED UP WHEN OPENING APP ***************************************************************

    componentDidMount() {
        //     const { dispatch, currentURL } = this.props

        //     if (!isLoggedIn) {
        //       // set the current url/path for future redirection (we use a Redux action)
        //       // then redirect (we use a React Router method)
        //       dispatch(setRedirectUrl(currentURL))
        //       browserHistory.replace("/login")
        //     }
        //   }

        //   render() {
        //     if (isLoggedIn) {
        //       return this.props.children
        //     } else {
        //       return null
        //     }
        //   }
        // }

        // // Grab a reference to the current URL. If this is a web app and you are
        // // using React Router, you can use `ownProps` to find the URL. Other
        // // platforms (Native) or routing libraries have similar ways to find
        // // the current position in the app.
        // function mapStateToProps(state, ownProps) {
        //   return {
        //     isLoggedIn: state.loggedIn,
        //     currentURL: ownProps.location.pathname
        //   }
    }

    // ************************************************************************************************************************************************

   

    loginFunction = async () => {

            this.props.navigation.navigate('Home');
                
    
    }

    render() {            

        return (
            
            <View style={styles.container}>

                <View style={{ height: 100, backgroundColor: 'black', flexDirection: 'row' }}>
                    <View style={{ width: '33%' }}>
                    </View>
                    <View style={{ width: '33%' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginTop: 50, alignSelf: 'center' }}>K       W       I       Q</Text>
                    </View>
                    <View style={{ width: '33%' }}>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: 'gray', width: '66%', alignSelf: 'flex-end', marginTop: 30, marginBottom: 40 }}></View>
                <View style={{ marginBottom: -25 }}>
                    <Text style={{ fontSize: 22, color: 'gray', alignSelf: 'flex-end', fontWeight: 'bold' }}>WELCOME TO YOUR PROFILE, YOU CAN EDIT IT HERE, AND YOU CAN GO TO HOME</Text>
                </View>
                <View style={{ height: 50, marginBottom: 10, marginTop: 60, alignSelf: 'center', width: '60%' }}>
                    <TouchableOpacity onPress={this.loginFunction}>
                        <Text style={{ fontSize: 30, color: 'white', alignSelf: 'center', marginTop: 2, fontWeight: 'bold' }}>H  O  M  E</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        backgroundColor: '#000',
        justifyContent: 'flex-start',
        borderLeftWidth: 5,
        borderRightWidth: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    images: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginTop: -5,
        marginRight: 20,
        flexWrap: 'nowrap',
    },
    shop: {
        color: '#fff',
        fontSize: 17,
        marginBottom: 10,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    }

});