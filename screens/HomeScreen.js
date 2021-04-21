import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, BackHandler, ColorPropType } from 'react-native';
import axios from 'axios';


export default class HomeScreen extends React.Component {

    getAuthFunc = async () => {

        var getAuth = await axios.get('https://auth.bullhornstaffing.com/oauth/authorize?client_id=8686f50f-5929-4189-98fa-bde898bcdfda&response_type=code&action=Login')

        console.log('response of the auth link: ', getAuth);
    }

    getAccessToken = async () => {

        console.log('ENTERING GET ACCESS TOKEN FUNCTION');

        var clientId = '8686f50f-5929-4189-98fa-bde898bcdfda';
        var clientSecret = 'AgRV5QNOSZjhf5DbZE0Za5E0';

        var getAccessToken = await axios.post('https://auth.bullhornstaffing.com/oauth/token?grant_type=authorization_code&code=91%3Ade279d62-feca-4f61-a042-8f9e2095004d&client_id=' + clientId + '&client_secret=' + clientSecret)
        var datadata = getAccessToken['data']
        var accessToken = datadata['access_token']
        var refreshToken = datadata['refresh_token']

        console.log('access token is : ', accessToken);

        if (datadata == null) {
            console.log('ACCESS TOKEN IS EXPIRED');

            this.getRefreshToken(refreshToken, clientId, clientSecret);
            return;
        }

        console.log('ACCESS TOKEN IS VALID');
        this.loginAPI(accessToken);
    }

    getRefreshToken = async (refreshToken, clientId, clientSecret) => {

        console.log('GENERATING NEW ACCESS TOKEN');

        var clientId = '8686f50f-5929-4189-98fa-bde898bcdfda';
        var clientSecret = 'AgRV5QNOSZjhf5DbZE0Za5E0';

        var getToken = await axios.post('https://auth.bullhornstaffing.com/oauth/token?grant_type=refresh_token&refresh_token=' + refreshToken + '&client_id=' + clientId + '&client_secret=' + clientSecret)
        var datadata = getToken['data']

        console.log('access token is: ', datadata['access_token']);
    }

    loginAPI = async (accessToken) => {

        console.log('ENTERING LOGIN API FUNCTION');

        var getData = await axios.post('https://rest.bullhornstaffing.com/rest-services/login?version=*&access_token=' + accessToken)
        var loginInfo = getData['data']
        var restToken = getData['bhRestToken']
        var restURL = getData['restUrl']

        console.log('rest token and rest URL: ', loginInfo);

        this.updateExtensionPossibility(restURL, restToken);
    }

    // getPlacementDates = async () => {

    //     console.log('starting function.............')
    //     var restToken = 'e03da462-29c8-4c27-96ec-5b2450f6eefc'
    //     var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

    //     // https://rest91.bullhornstaffing.com/rest-services/3e1yys/search/Placement?BhRestToken=0e643ec2-3187-4c8f-93b4-d0ca932fe642&query=isDeleted:0&fields=id,dateEnd&start=0&count=500

    //     var init = 0

    //     var Getplacements = await axios.get(restURL + 'search/Candidate?BhRestToken=' + restToken + '&query=isDeleted:0&fields=id,firstName&start=' + init + '&count=500')
    //     var listOne = []
    //     var total = Getplacements.data.total

    //     listOne.push(Getplacements['data'])

    //     console.log('total et start ' + total);

    //     for (init < total; init = (init + 501);) {

    //         console.log('FOR EACH ENTERED ' + init);

    //         var Getplacements2 = await axios.get(restURL + 'search/Candidate?BhRestToken=' + restToken + '&query=isDeleted:0&fields=id,firstName&start=' + init + '&count=500')
    //         listOne.push(Getplacements2['data'])

    //         console.log('COUNT START   ', Getplacements2.data.start)

    //         if (init > total) {
    //             console.log('list of all placements ');
    //             console.log(listOne.length)

    //             return this.comparePlacements(listOne);
    //         }
    //     }
    // }

    // comparePlacements = async (listOne) => {

    //     console.log('starting function.............')
    //     var restToken = 'e03da462-29c8-4c27-96ec-5b2450f6eefc'
    //     var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

    //     // https://rest91.bullhornstaffing.com/rest-services/3e1yys/search/Placement?BhRestToken=0e643ec2-3187-4c8f-93b4-d0ca932fe642&query=isDeleted:0&fields=id,dateEnd&start=0&count=500

    //     var init2 = 0

    //     var Getplacements = await axios.get(restURL + 'search/Candidate?BhRestToken=' + restToken + '&query=isDeleted:0&fields=id,firstName&start=' + init2 + '&count=500')
    //     var listTwo = []
    //     var total = Getplacements.data.total

    //     listTwo.push(Getplacements['data'])

    //     console.log('total et start ' + total);

    //     for (init2 < total; init2 = (init2 + 501);) {

    //         console.log('2ND FOR EACH ENTERED ' + init2);

    //         var Getplacements2 = await axios.get(restURL + 'search/Candidate?BhRestToken=' + restToken + '&query=isDeleted:0&fields=id,firstName&start=' + init2 + '&count=500')
    //         listTwo.push(Getplacements2['data'])

    //         console.log('COUNT START   ', Getplacements2.data.start)

    //         if (init2 > total) {
    //             console.log('2nd list of all placements ');
    //             console.log(listTwo.length)

    //             for (var i = 0; i < listOne.length; i++)
    //                 if (listOne[i]['firstName'] != listTwo[i]['firstName'])
    //                     return "False";
    //             return "True";
    //         }
    //     }
    // }

    // ******************* AUTOMATISME MISE A JOUR A 50% DE CHANCE + AVAIL. DATE CANDIDAT LORSQUE PLACEMENT ALLONGE ******************** //

    updatePlacementExtension = async () => {

        var restToken = '61415127-ab2f-4fba-9aeb-1aa2a8f23872'
        var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

        console.log('...ENTERING UPDATE POSSIBILIY OF EXTENSION AND CANDIDATE AVAILABILTY')

        var apiChangeReq = await axios.get(restURL + "query/PlacementChangeRequest?fields=dateEnd,placement,dateAdded&where=requestType='Placement Extension'&count=2&BhRestToken=" + restToken)
        var readable = []
        readable.push(apiChangeReq['data'])

        console.log('data count>>>' + apiChangeReq.data.count)
        console.log('date end of placement cr  ' + JSON.stringify(readable))

        var placement_id = []
        var dates = []

        for (let i = 0; i < apiChangeReq.data.count; i++) {

            placement_id.push(apiChangeReq.data.data[i].placement)
            dates.push(apiChangeReq.data.data[i].dateEnd)
        }

        console.log('readable data:  >>> ' + JSON.stringify(placement_id))

        for (let e = 0; e < placement_id.length; e++) {

            var placement = placement_id[e].id
            var getExtValue = await axios.get(restURL + "entity/Placement/" + placement + "?fields=customText29,candidate&BhRestToken=" + restToken)
            var extValue = JSON.stringify(getExtValue.data.data.customText29)
            var candId = JSON.stringify(getExtValue.data.data.candidate.id)

            console.log('data received from call get extension value  >  ' + extValue)
            console.log('data received from call get candidate id  >  ' + candId)

            await axios.post(restURL + "entity/Candidate/" + candId + "?BhRestToken=" + restToken, {
                dateAvailable: dates[e],
            })
                .then(function (response) {
                    console.log('RESPONSEEE ', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

            if (extValue === '0% - Confirmed that the Consultant will not be Renewed' || extValue === '25% - Unlikely to be Renewed' || !extValue || extValue === null) {

                await axios.post(restURL + "entity/Placement/" + placement + "?BhRestToken=" + restToken, {
                    customText29: '50% - One chance in Two that the Consultant be renewed',
                })
                    .then(function (response) {
                        console.log('RESPONSEEE ', response.data);
                        console.log("this candidate's availabilty is updated")
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                console.log('update is done for this placement' + placement_id[e].id)
            }
            else {
                console.log('EXTENSION ALREADY AT 50%')
            }
        }
        console.log('Everything has been updated.')
    }


    // ******************* AUTOMATISME MISE A JOUR DU SALAIRE CANDIDAT, PRIS DU SALAIRE PLACEMENT ******************** //

    updateCandidateSalary = async () => {

        var restToken = 'b00a9946-4d54-494d-905d-9ed75aa51ac1'
        var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

        console.log('... ENTERING UPDATE CANDIDATE SALARY FROM PLACEMENT')

        var getPlacementSalary = await axios.get(restURL + "query/PlacementEditHistoryFieldChange?fields=*&where=columnName='salary'&BhRestToken=" + restToken)
        var placementSalary = []
        placementSalary.push(getPlacementSalary.data)
        var editHistoryIdList = []

        console.log('All salary updates :', JSON.stringify(placementSalary))

        for (let i = 0; i < getPlacementSalary.data.count; i++) {

            console.log('FOR EACH ENTERED ' + (i + 1) + '/' + getPlacementSalary.data.count);

            editHistoryIdList.push(getPlacementSalary.data.data[i].editHistory.id)
        }

        console.log('editHistory id List to retrieve placement id :   ', editHistoryIdList)

        console.log('List length is : ', editHistoryIdList.length)

        for (let e = 0; e < editHistoryIdList.length; e++) {

            var historyId = editHistoryIdList[e]

            console.log('editHistory id  ', historyId)

            var getPlacement = await axios.get(restURL + "entity/PlacementEditHistory/" + historyId + "?fields=*&BhRestToken=" + restToken)

            if (getPlacement.data.data.targetEntity !== null) {

                var placementId = getPlacement.data.data.targetEntity.id

                var getPlacementId = await axios.get(restURL + "entity/Placement/" + placementId + "?fields=salary,candidate&BhRestToken=" + restToken)
                var salaryP = getPlacementId.data.data.salary
                var candidateId = getPlacementId.data.data.candidate.id

                console.log('placement id ' + placementId + '...' + salaryP)
                console.log('candidate id of this placement : ' + candidateId)

                await axios.post(restURL + "entity/Candidate/" + candidateId + "?BhRestToken=" + restToken, {
                    salary: salaryP,
                })
                    .then(function (response) {
                        console.log('POSTING SALARY IN CAND. ', response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        console.log('all salaries updated :)')
    }

    // ******************* AUTOMATISME NOTIFIER RECRUTEMENT QUAND PLACEMENT PREMATURE END ******************** //

    notifyPrematureEnd = async () => {

        var restToken = '3c59251a-62ae-46b6-be03-f58135a4db24'
        var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

        console.log('...ENTERING NOTIFY RECRUITMENT OF PLACEMENT PREMATURE END + REASON')

        var apiChangeReq = await axios.get(restURL + "query/PlacementChangeRequest?fields=placement,terminationReason,dateAdded&where=requestType='Premature End'&count=10&BhRestToken=" + restToken)
        var readable = apiChangeReq.data
        var placementIds = []
        console.log('premature end CRs ...> ' + JSON.stringify(readable))

        for (let i = 0; i < readable.count; i++) {

            var placementId = readable.data[i].placement.id
            placementIds.push([readable.data[i].placement.id, readable.data[i].terminationReason])

            console.log('placement ids tst ...>' + placementId)

        }
        console.log('placements ids > ' + JSON.stringify(placementIds))

        // notify xyz@cof.com that placements placementIds have been terminated prematurely
    }

    // ******************* AUTOMATISME METTRE LES FILES DONNEES EN PRIVATE ******************** //

    setFilesPrivate = async () => {

        var restToken = '5e6e16af-2700-486c-b771-6a62a21d7037'
        var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

        console.log('...ENTERING SET FILES TO PRIVATE')

        var files = []

        // GET WITH POST ALL FILES OF TYPES TO BE PRIVATE
        // var filesAPI = await axios.post("https://rest91.bullhornstaffing.com/rest-services/3e1yys/query/CandidateFileAttachment?fields=*&BhRestToken=86b2665e-14e6-48db-8188-52ad44779ca0&count=1", {
        //     "where": "fileType IN ('Onboarding', 'HR - Immigration Document', 'HR - Check Specimen', 'HR - Work Permit', 'HR - ID Copy', 'HR - BackCheck', 'HR - Other Confidential Docs', 'Contractor Record', 'Payroll Record')",
        // })
        //     .then(function (response) {
        //         console.log('POSTING SALARY IN CAND. ', response.data);
        //         filesList.push(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        //change post data to accurante fileTypes .. see commented url above
        await axios.post(restURL + "query/CandidateFileAttachment?fields=id,isPrivate,fileType,dateAdded&count=5&start=550&BhRestToken=" + restToken, {
            "where": "fileType IN ('SAMPLE         ')",
        })
            .then(function (response) {
                console.log('Files that need to be private ', response.data);
                files = response.data

                for (let i = 0; i < files.count; i++) {

                    console.log('files lists is private status   ... >' + JSON.stringify(files.data[i].isPrivate))

                    var dateFile = new Date(files.data[i].dateAdded)

                    console.log('DATE OF THE FILE ' + dateFile)
                    //we will need a fixed date v
                    if (dateFile < new Date()) {

                        console.log('ALL FILES BEFORE TODAY')
                    }

                    if (files.data[i].isPrivate === false) {
                        console.log('if condition entered the current value of private is : ' + files.data[i].isPrivate)

                        axios.post(restURL + "entity/CandidateFileAttachment/" + files.data[i].id + "?fields=*&BhRestToken=" + restToken, {
                            "isPrivate": true,
                        })
                            .then(function (response) {
                                console.log('Private status is now : ', response.data);

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }

                    else {
                        console.log('this file is already PRIVATE')
                    }
                }

                console.log('UPDATE FINISHED THANKS :):):)')
            })
            .catch(function (error) {
                console.log(error);
            });
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
                <View style={{ height: 50, marginBottom: 10, marginTop: 20, alignSelf: 'center', width: '60%' }}>
                    <TouchableOpacity onPress={this.setFilesPrivate}>
                        <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 2 }}>GET CODE</Text>
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
