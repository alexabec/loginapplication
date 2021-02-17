import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ImageBackground, KeyboardAvoidingView, AsyncStorage, Image } from 'react-native';

export default class LoginScreen extends React.Component {

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

    updateValue(input, field) {

        if (field == 'username') {
            this.setState({
                username: input,
            })
        }
        else if (field == 'password') {
            this.setState({
                password: input,
            })
        }
    }

    loginFunction = async () => {

        if (this.state.username == '1' && this.state.password == '1') {

            this.props.navigation.navigate('Home', {username: this.state.username, password: this.state.password});  
        }
        else {
            alert('Wrong username and password. Use 1 and 1.')
        }
    }

    render() {            

        return (
            
            <View style={styles.container}>
                <View style={{ padding: 1 }}>
                   
                    <View>
                        <TouchableOpacity>
                            <Text style={{ marginTop: 100, fontSize: 50, fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>WELCOME</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Image source={require('./../assets/iconK.png')} style={{ height: screenHeight / 3, width: screenWidth / 2, alignSelf: 'center', marginTop: 80 }}></Image> */}
                
                <View>
                <Text style={{ marginTop: 10, fontSize: 22, color: 'gray', alignSelf: 'center', fontWeight: 'bold' }}>PLEASE ENTER 1 FOR USERNAME AND 1 FOR PASSWORD TO ENTER</Text>
                </View>
                
                <View style={{ marginTop: 60}}>
                    <Text style={{ fontSize: 22, color: 'white', alignSelf: 'center', marginBottom: 5 }}>username</Text>
                    <View style={{ height: 40, backgroundColor: '#2c2c2e', opacity: 0.8, marginBottom: 10, alignSelf: 'center', width: '60%', borderWidth: 2, borderColor: 'grey' }}>
                        <TextInput
                            style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 5 }}
                            onChangeText={(input) => this.updateValue(input, 'username')}
                            placeholder=""
                            value={this.state.username}
                            autoCapitalize="none"></TextInput>
                    </View>
                    <Text style={{ fontSize: 22, color: 'white', alignSelf: 'center', marginBottom: 5 }}>password </Text>
                    <View style={{ height: 40, backgroundColor: '#2c2c2e', opacity: 0.8, marginBottom: 15, alignSelf: 'center', width: '60%', borderWidth: 2, borderColor: 'grey' }}>
                        <TextInput style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 5 }}
                            onChangeText={(input) => this.updateValue(input, 'password')}
                            placeholder=""
                            value={this.state.password}
                            secureTextEntry={true}></TextInput>
                    </View>
                </View>
                <Text style={styles.credit}>I forgot my password.</Text>

                <View style={{ height: 50, marginBottom: 10, marginTop: 20, alignSelf: 'center', width: '60%' }}>
                    <TouchableOpacity onPress={this.loginFunction}>
                        <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 2 }}>L O G I N</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#000',
        justifyContent: 'flex-start',
        borderLeftWidth: 5,
        borderRightWidth: 5,
    },
    header: {
        flex: 1,
        fontSize: 50,
    },
    title: {
        marginTop: 18,
        fontSize: 18,
        color: '#fff',
        alignSelf: 'flex-end',
    },
    infoText: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'center',
    },
    credit: {
        fontSize: 15,
        color: 'gray',
        marginTop: 5,
        marginBottom: 10,
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
});

