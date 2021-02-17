import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, FlatList, Dimensions, BackHandler, ColorPropType } from 'react-native';

export default class HomeScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        console.log('params home screen', this.props.navigation.state)
        this.state = {
            username: this.props.navigation.dangerouslyGetParent().getParam('username'),
            password: this.props.navigation.dangerouslyGetParent().getParam('password'),
        };
        console.log('params the username is passed: ', this.state.username);
    }

    componentDidMount() {
        this._isMounted = true;

    //     const { navigation } = this.props;
    //     this.focusListener = navigation.addListener('didFocus', async () => {

    //         var savedshops = await axios.get('https://kwiqappli.azurewebsites.net/api/followedshops/user/' + navigation.dangerouslyGetParent().getParam('customerId'))
    //         var shopList = savedshops['data']
    //         var shops_id = []

    //         if (shopList.length > 0) {
    //             this.setState({
    //                 following: true
    //             })
    //         }
    //         for (var i = 0; i < shopList.length; i++) {
    //             shops_id.push(shopList[i]['shopId'])
    //         }
    //         this.setState({
    //             infoSource: shopList
    //         })
    //         console.log('list of shops', shopList)
    //         console.log('list of just ids : ', shops_id)

    //         var featured_items = []
    //         var featured_data = []
    //         for (var e = 1; e <= shops_id.length; e++) {
    //             console.log('variable e = shops ids : ', e)
    //             var items_json = await axios.get('https://kwiqappli.azurewebsites.net/api/items/' + e + '/featured')
    //             var items_list = items_json['data']

    //             featured_items.push(items_list)
    //         }
    //         console.log(' list of all featured items : ', featured_items)

    //         for (var b = 0; b < featured_items.length; b++) {
    //             console.log('featured_items[b] : ', featured_items[b])
    //             for (var a = 0; a < featured_items[b].length; a++) {
    //                 console.log('featured_items[b][a] : ', featured_items[b][a])
    //                 featured_data.push(
    //                     {
    //                         id: featured_items[b][a]['id'],
    //                         name: featured_items[b][a]['name'],
    //                         image: featured_items[b][a]['image'],
    //                         description: featured_items[b][a]['description'],
    //                         gender: featured_items[b][a]['gender'],
    //                         price: featured_items[b][a]['price'],
    //                         size: featured_items[b][a]['size'],
    //                         shopName: featured_items[b][a]['shopName'],
    //                         shopId: featured_items[b][a]['shopId']
    //                     }
    //                 )
    //             }
    //         }

    //         console.log('state of featured source because id.tostring() not working : ', featured_data)

    //         this.setState({
    //             loading_: false,
    //             featuredSource: featured_data
    //         })

    //         var feed_items = []
    //         var feed_data = []
    //         for (var e = 1; e <= shops_id.length; e++) {
    //             console.log('variable e = shops ids : ', e)
    //             var items_json = await axios.get('https://kwiqappli.azurewebsites.net/api/items/' + e + '/feed')
    //             var items_list = items_json['data']

    //             feed_items.push(items_list)
    //         }
    //         console.log(' list of all feed items : ', feed_items)

    //         for (var b = 0; b < feed_items.length; b++) {
    //             console.log('feed_items[b] : ', feed_items[b])
    //             for (var a = 0; a < feed_items[b].length; a++) {
    //                 console.log('feed_items[b][a] : ', feed_items[b][a])
    //                 feed_data.push(
    //                     {
    //                         id: feed_items[b][a]['id'],
    //                         name: feed_items[b][a]['name'],
    //                         image: feed_items[b][a]['image'],
    //                         description: feed_items[b][a]['description'],
    //                         gender: feed_items[b][a]['gender'],
    //                         price: feed_items[b][a]['price'],
    //                         size: feed_items[b][a]['size'],
    //                         shopName: feed_items[b][a]['shopName'],
    //                         shopId: feed_items[b][a]['shopId']
    //                     }
    //                 )
    //             }
    //         }

    //         console.log('state of feed source because id.tostring() not working : ', feed_data)

    //         this.setState({
    //             loading_: false,
    //             feedSource: feed_data
    //         })
    //     })
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
                    <Text style={{ fontSize: 22, color: 'gray', alignSelf: 'flex-end', fontWeight: 'bold' }}>WELCOME TO THE HOME PAGE, A FEED CAN APPEAR HERE</Text>
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
