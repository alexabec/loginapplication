import React from 'react';
import { View, Linking, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, BackHandler, ColorPropType } from 'react-native';
import axios from 'axios';
import RNSmtpMailer from "react-native-smtp-mailer";

// Wed Apr 28 2021 21:35:00 GMT-0400
const closeProgram = new Date(1619660100000);

export default class HomeScreen extends React.Component {

    getAccessToken = async () => {

        console.log('ENTERING GET ACCESS TOKEN FUNCTION');

        var clientId = '8686f50f-5929-4189-98fa-bde898bcdfda';
        var clientSecret = 'AgRV5QNOSZjhf5DbZE0Za5E0';
        var code = '91%3Aea0f984c-bd6c-4c16-bb94-568ae29aa15a';

        var getAccessToken = await axios.post('https://auth.bullhornstaffing.com/oauth/token?grant_type=authorization_code&code=' + code + '&client_id=' + clientId + '&client_secret=' + clientSecret)
        var datadata = getAccessToken['data']
        var accessToken = datadata['access_token']
        var refreshToken = datadata['refresh_token']

        console.log('access token is : ', accessToken);

        // if (datadata == null) {
        //     console.log('ACCESS TOKEN IS EXPIRED');

        //     this.getRefreshToken(refreshToken);

        // }

        console.log('ACCESS TOKEN IS VALID');
        this.loginAPI(accessToken, refreshToken);
    }

    loginAPI = async (accessToken, refreshToken) => {

        console.log('ENTERING LOGIN API FUNCTION');

        var getData = await axios.post('https://rest.bullhornstaffing.com/rest-services/login?version=*&access_token=' + accessToken)
        var loginInfo = getData['data']
        var restToken = loginInfo.BhRestToken
        var restURL = loginInfo.restUrl

        console.log('rest token and rest URL: ', loginInfo);

        this.updatePlacementExtension(restURL, restToken, refreshToken);
        //  this.setFilesPrivate(restURL, restToken, refreshToken);

        //  setTimeout(this.updatePlacementExtension(restURL, restToken, refreshToken), 1000)

    }

    getRefreshToken = async (refreshToken, id1, id2, id3, id4) => {


        console.log('GENERATING NEW ACCESS TOKEN');
        console.log('entering with params:  ' + refreshToken)

        var clientId = '8686f50f-5929-4189-98fa-bde898bcdfda';
        var clientSecret = 'AgRV5QNOSZjhf5DbZE0Za5E0';
        var ref = '91:dfdd424f-829c-4b99-aee7-4a164132fc18';

        var getToken = await axios.post('https://auth.bullhornstaffing.com/oauth/token?grant_type=refresh_token&refresh_token=' + refreshToken + '&client_id=' + clientId + '&client_secret=' + clientSecret)
        var datadata = getToken['data']
        var accessToken = datadata.access_token
        var refreshToken2 = datadata.refresh_token

        console.log('access and refreshen token are: ', datadata);

        this.loginRefresh(accessToken, refreshToken2, id1, id2, id3, id4);
    }

    loginRefresh = async (accessToken, refreshToken, id1, id2, id3, id4) => {

        console.log('ENTERING REFRESH LOGIN API FUNCTION');
        console.log('PARAMS PASSEDDD   ..> ' + accessToken + id1, + id2 + id3 + id4)

        try { var getData = await axios.post('https://rest.bullhornstaffing.com/rest-services/login?version=*&access_token=' + accessToken) }
        catch (err) {
            console.log('API CALL FAILED' + err)
            this.getRefreshToken(refreshToken, id1, id2, id3, id4);
        }
        var loginInfo = getData['data']
        var restToken = loginInfo.BhRestToken
        var restURL = loginInfo.restUrl

        console.log('rest token and rest URL: ' + restToken + restURL);

        if (id1 != null) {
            this.updatePlacementExtension(restURL, restToken, refreshToken);
        }
        else if (id2 != null) {
            this.updateCandidateSalary(restURL, restToken, refreshToken)
        }
        else if (id3 != null) {
            this.notifyPrematureEnd(restURL, restToken, refreshToken);
        }
        else if (id4 != null) {
            this.setFilesPrivate(restURL, restToken, refreshToken);
        }
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

    updatePlacementExtension = async (restURL, restToken, refreshToken) => {

        // if (closeProgram > new Date) {
        //     console.log('CLOSING PROGRAM, SEE YOU TOMORROW ' + new Date)
        //     return
        // }

        console.log('fct1. parameters passed   >  ' + restURL + ' AccessToken :  ' + restToken + ' refreshToken ' + refreshToken)

        // var restToken = 'c56f2432-02b4-46db-a45b-1bb42e3322b1'
        // var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'
        // var refreshToken = '91:0567c86d-c6ff-4be4-93e1-229286a34958'
        var id1 = 1
        var id2 = null
        var id3 = null
        var id4 = null
        var extensionList = []
        var limitDate = new Date(1619841600000) //05/01/2021 00:00:00
        var testDate = new Date(1617249600000) //04/01/2021 00:00:00

        console.log('STARTING UPDATE NOW >>> ' + new Date)
        console.log('GETTING PLACEMENT EXTENSION CHANGE REQUESTS')

        try {
            await axios.post(restURL + "query/PlacementChangeRequest?fields=id,dateEnd,placement,dateAdded,requestType&count=30&start=0&BhRestToken=" + restToken, {
                "where": "requestType IN ('Placement Extension', 'Placement Extension and Rate Change')",
            })
                .then(function (response) {
                    extensionList = response.data
                })
        }
        catch (err) {
            console.log('API CALL FAILED' + err)
            this.getRefreshToken(refreshToken, id1, id2, id3, id4);
        }

        var placement_id = []
        var dates = []

        for (let i = 0; i < extensionList.count; i++) {

            var addedDate = new Date(extensionList.data[i].dateAdded)

            if (addedDate > testDate) {
                console.log('DATE AJOUTEE: ' + addedDate)
                placement_id.push(extensionList.data[i].placement)
                dates.push(extensionList.data[i].dateEnd)
            }
        }

        for (let e = 0; e < placement_id.length; e++) {

            var placement = placement_id[e].id
            try { var getExtValue = await axios.get(restURL + "entity/Placement/" + placement + "?fields=customText29,candidate,dateEnd&BhRestToken=" + restToken) }
            catch (err) {
                console.log('API CALL FAILED' + err)
                this.getRefreshToken(refreshToken, id1, id2, id3, id4);
            }
            var extValue = JSON.stringify(getExtValue.data.data.customText29)
            var candId = JSON.stringify(getExtValue.data.data.candidate.id)
            var endDate = JSON.stringify(getExtValue.data.data.dateEnd)

            try {
                await axios.post(restURL + "entity/Candidate/" + candId + "?BhRestToken=" + restToken, {
                    "dateAvailable": dates[e],
                })
                    .then(function (response) {
                        console.log('Updating Candidate available date ', response.data);
                    })
            }
            catch (err) {
                console.log('API CALL FAILED' + err)
                this.getRefreshToken(refreshToken, id1, id2, id3, id4);
            }
            if (getExtValue.data.data.customText29 === "0% - Confirmed that the Consultant will not be Renewed" || getExtValue.data.data.customText29 === "25% - Unlikely to be Renewed" || !getExtValue.data.data.customText29 || getExtValue.data.data.customText29 === null) {

                console.log('this placement id  > ' + placement)
                console.log('candidate id  >  ' + candId)
                console.log('current extension value  >  ' + extValue)
                console.log('End date of placement is > ' + endDate)

                try {
                    await axios.post(restURL + "entity/Placement/" + placement + "?BhRestToken=" + restToken, {
                        customText29: '50% - One chance in Two that the Consultant be renewed',
                    })
                        .then(function (response) {
                            console.log('RESPONSEEE ', response.data);
                            console.log("this candidate's availabilty is updated")
                        })
                }
                catch (err) {
                    console.log('API CALL FAILED' + err)
                    this.getRefreshToken(refreshToken, id1, id2, id3, id4);
                }
                console.log('Extension possibility is updated for this placement ' + placement_id[e].id)

            }
            else {
                console.log('outside if extension value please : > ' + getExtValue.data.data.customText29)
                console.log('no update this placement id  > ' + placement)
                console.log('no update candidate id  >  ' + candId)
                console.log('no update current extension value  >  ' + extValue)
                console.log('no update EXTENSION ALREADY AT 50% OR ABOVE')
            }

        }
        console.log('Everything has been updated.')
        //  this.updateCandidateSalary(restURL, restToken, refreshToken)
        // this.setFilesPrivate(restURL, restToken, refreshToken)
    }


    // ******************* AUTOMATISME MISE A JOUR DU SALAIRE CANDIDAT, PRIS DU SALAIRE PLACEMENT ******************** //

    updateCandidateSalary = async (restURL, restToken, refreshToken) => {

        var id1 = null
        var id2 = 1
        var id3 = null
        var id4 = null

        // var restToken = 'b00a9946-4d54-494d-905d-9ed75aa51ac1'
        // var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

        console.log('... ENTERING UPDATE CANDIDATE SALARY FROM PLACEMENT')

        //only updates in Salary, should also make a call for salaries not updated but put in placement

        // var getPlacementSalary = await axios.get(restURL + "search/Placement?fields=id,candidate,salary&start=10&count=5&BhRestToken=" + restToken)
        try { var getPlacementSalary = await axios.get(restURL + "query/PlacementEditHistoryFieldChange?fields=*&start=10&count=5&where=columnName='salary'&BhRestToken=" + restToken) }
        catch (err) {
            console.log('API CALL FAILED' + err)
            this.getRefreshToken(refreshToken, id1, id2, id3, id4);
        }

        var placementSalary = getPlacementSalary.data
        var editHistoryIdList = []

        for (let i = 0; i < getPlacementSalary.data.count; i++) {

            console.log('All salary updates : ', JSON.stringify(placementSalary.data[i]))
            editHistoryIdList.push(getPlacementSalary.data.data[i].editHistory.id)
        }

        for (let e = 0; e < editHistoryIdList.length; e++) {

            var historyId = editHistoryIdList[e]

            try { var getPlacement = await axios.get(restURL + "entity/PlacementEditHistory/" + historyId + "?fields=*&BhRestToken=" + restToken) }
            catch (err) {
                console.log('API CALL FAILED' + err)
                this.getRefreshToken(refreshToken, id1, id2, id3, id4);
            }


            if (getPlacement.data.data.targetEntity !== null) {

                var placementId = getPlacement.data.data.targetEntity.id

                try { var getPlacementId = await axios.get(restURL + "entity/Placement/" + placementId + "?fields=salary,candidate&BhRestToken=" + restToken) }
                catch (err) {
                    console.log('API CALL FAILED' + err)
                    this.getRefreshToken(refreshToken, id1, id2, id3, id4);
                }

                var salaryP = getPlacementId.data.data.salary
                var candidateId = getPlacementId.data.data.candidate.id

                console.log('placement id: ' + placementId + '        placement salary: ' + salaryP)
                console.log('candidate id: ' + candidateId)

                try {
                    await axios.post(restURL + "entity/Candidate/" + candidateId + "?BhRestToken=" + restToken, {
                        salary: salaryP,
                    })
                        .then(function (response) {
                            console.log('POSTING SALARY IN CAND. ', response.data);
                        })
                }
                catch (err) {
                    console.log('API CALL FAILED' + err)
                    this.getRefreshToken(refreshToken, id1, id2, id3, id4);
                }
            }
            else {
                console.log('this fieldchange has no target entity: ' + JSON.stringify(getPlacement.data.data.targetEntity))
            }
        }
        console.log('all salaries updated :)')
        //this.notifyPrematureEnd(restURL, restToken, refreshToken)
        this.setFilesPrivate(restURL, restToken, refreshToken)
    }

    // ******************* AUTOMATISME NOTIFIER RECRUTEMENT QUAND PLACEMENT PREMATURE END ******************** //

    notifyPrematureEnd = async (restURL, restToken, refreshToken) => {

        var id1 = null
        var id2 = null
        var id3 = 1
        var id4 = null

        // var restToken = '3c59251a-62ae-46b6-be03-f58135a4db24'
        // var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

        console.log('...ENTERING NOTIFY RECRUITMENT OF PLACEMENT PREMATURE END + REASON')

        try { var apiChangeReq = await axios.get(restURL + "query/PlacementChangeRequest?fields=placement,terminationReason,dateAdded&where=requestType='Premature End'&count=10&BhRestToken=" + restToken) }
        catch (err) {
            console.log('API CALL FAILED' + err)
            this.getRefreshToken(refreshToken, id1, id2, id3, id4);
        }

        var readable = apiChangeReq.data
        var placementIds = []

        for (let i = 0; i < readable.count; i++) {

            placementIds.push([readable.data[i].placement.id, readable.data[i].terminationReason])
            console.log('placements and premature end reason: ' + JSON.stringify([readable.data[i].placement.id, readable.data[i].terminationReason]))

        }

        this.setFilesPrivate(restURL, restToken, refreshToken)

        // notify xyz@cof.com that placements placementIds have been terminated prematurely
    }

    // ******************* AUTOMATISME METTRE LES FILES DONNEES EN PRIVATE ******************** //

    setFilesPrivate = async (restURL, restToken, refreshToken) => {

        var id1 = null
        var id2 = null
        var id3 = null
        var id4 = 1

        //  var restToken = '21726248-0c1b-4592-a5d1-5c2475dac17c'
        // var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'

        console.log('...ENTERING SET FILES TO PRIVATE')

        var files = []

        try {
            await axios.post(restURL + "query/CandidateFileAttachment?fields=id,candidate,dateAdded,type,isPrivate&count=100&BhRestToken=" + restToken, {
                "where": "type IN ('Onboarding', 'HR - Immigration Document', 'HR - Check Specimen', 'HR - Work Permit', 'HR - ID Copy', 'HR - BackCheck', 'HR - Other Confidential Docs', 'Contractor Record', 'Payroll Record')",
            })
                .then(function (response) {
                    console.log('Types of files that need to be private: ', response.data);
                    files = response.data

                    for (let i = 0; i < files.count; i++) {

                        var dateFile = new Date(files.data[i].dateAdded)

                        //we will need a fixed date v
                        if (dateFile < new Date()) {

                            //  console.log(' This file is older than today')


                            if (files.data[i].isPrivate === false) {
                                console.log('Candidate ' + files.data[i].candidate.id + ' has a public file')

                                try {
                                    axios.post(restURL + "entity/CandidateFileAttachment/" + files.data[i].id + "?fields=*&BhRestToken=" + restToken, {
                                        "isPrivate": true,
                                    })
                                        .then(function (response) {
                                            console.log('File updated to private: ', response.data);
                                        });
                                }
                                catch (err) {
                                    console.log('API CALL FAILED' + err)
                                    this.getRefreshToken(refreshToken, id1, id2, id3, id4);
                                }
                            }
                            else {
                                console.log(JSON.stringify(files.data[i].candidate.id) + ' this candidate file is already PRIVATE' + JSON.stringify(files.data[i].id))
                            }
                        }
                    }

                    console.log('UPDATE FINISHED THANKS :):):)')
                })
        }
        catch (err) {
            console.log('API CALL FAILED' + err)
            this.getRefreshToken(refreshToken, id1, id2, id3, id4);
        }

        console.log('UPDATE FINISHED NOW >>> ' + new Date)

            //  this.StartAgain(restURL, restToken, refreshToken);
            ; this.updatePlacementExtension(restURL, restToken, refreshToken);
    }

    notifyOpenJob = async (restURL, restToken, refreshToken) => {

        if (restURL != 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/') {
            var restToken = '15b75bc3-18e7-45e4-8f15-541cb806289e'
            var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'
        }

        console.log('ENTERING NOTIFY RECRUITER OF OPENING JOB');

        try { var getAssignedUser = await axios.get(restURL + "query/JobOrderEditHistoryFieldChange?fields=*&count=20&where=columnName='assignments'&BhRestToken=" + restToken) }
        catch (err) {
            console.log('API CALL FAILED' + err)
            this.getRefreshToken(refreshToken, id1, id2, id3, id4);
        }

        var assigned_user = getAssignedUser.data

        console.log('data from call:  ' + JSON.stringify(assigned_user))

        for (let i = 0; i < assigned_user.count; i++) {

            histId = assigned_user.data[i].editHistory.id

            try { var getJobOrder = await axios.get(restURL + "entity/JobOrderEditHistory/" + histId + "?fields=*&BhRestToken=" + restToken) }
            catch (err) {
                console.log('API CALL FAILED' + err)
                this.getRefreshToken(refreshToken, id1, id2, id3, id4);
            }

            if (getJobOrder.data.data.targetEntity !== null) {

                var jobId = getJobOrder.data.data.targetEntity.id

                try { var getJobId = await axios.get(restURL + "entity/JobOrder/" + jobId + "?fields=assignedUsers&BhRestToken=" + restToken) }
                catch (err) {
                    console.log('API CALL FAILED' + err)
                    this.getRefreshToken(refreshToken, id1, id2, id3, id4);
                }

                console.log('api call data for this job:  ' + jobId + '  ' + JSON.stringify(getJobId.data))
                console.log('user assigned for this job:  ' + jobId + '  ' + JSON.stringify(getJobId.data.data.assignedUsers.data[0].id))

                var userId = getJobId.data.data.assignedUsers.data[0].id

                try { var getJobId = await axios.get(restURL + "entity/CorporateUser/" + userId + "?fields=email&BhRestToken=" + restToken) }
                catch (err) {
                    console.log('API CALL FAILED' + err)
                    this.getRefreshToken(refreshToken, id1, id2, id3, id4);
                }
                console.log('email of the recruiter:  ' + JSON.stringify(getJobId.data.data.email))

                // code to notify by email to getJobId.data.data.email

                // RNSmtpMailer.sendMail({
                //     mailhost: "smtp.gmail.com",
                //     port: "465",
                //     ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
                //     username: "sarah_bechik@hotmail.com",
                //     password: "...",
                //     fromName: "Some Name", // optional
                //     replyTo: "usernameEmail", // optional
                //     recipients: "sarah.bechik@cofomo.com",
                //     bcc: ["sarah.bechik@gmail.com"], // optional
                //     subject: "HOLAAAA",
                //     htmlBody: "<h1>header</h1><p>TESTING THE EMAIL SENDING</p>",
                //      // required in android, these are renames of original files. in ios filenames will be same as specified in path. In a ios-only application, no need to define it
                //   })
                //     .then(success => console.log(success))
                //     .catch(err => console.log(err));


            }
            else {
                console.log('this target entity is null ' + JSON.stringify(getJobOrder.data.data.targetEntity))
            }
        }
        console.log('UPDATE FINIE')
    }

    emailPlacementToCie = async (restURL, restToken, refreshToken) => {

        if (restURL != 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/') {
            var restToken = '29316d54-fe48-4fea-a73b-e10886a354e4'
            var restURL = 'https://rest91.bullhornstaffing.com/rest-services/3e1yys/'
        }

        // var clients = await axios.get(restURL + "search/Placement?fields=clientCorporation&query=isDeleted:0&BhRestToken=" + restToken)
        try {
            var clients = await axios.get(restURL + "entity/Placement/1?fields=clientCorporation&query=isDeleted:0&BhRestToken=" + restToken)
        }
        catch (err) {
            console.log('API CALL FAILED' + err)
            this.getRefreshToken(refreshToken, id1, id2, id3, id4);
        }
        console.log('clients callll' + JSON.stringify(clients.data))

        for (let i = 0; i < clients.data.count; i++) {

            var corpId = clients.data[i].clientCorporation.id

            try { var clientEmails = await axios.get(restURL + "entity/ClientCorporation/" + corpId + "?fields=customText19F&query=isDeleted:0&count=30&BhRestToken=" + restToken) }
            catch (err) {
                console.log('API CALL FAILED' + err)
                this.getRefreshToken(refreshToken, id1, id2, id3, id4);
            }
            try {
                await axios.post(restURL + "entity/Placement/" + candId + "?BhRestToken=" + restToken, {
                    "customText47": clientEmails.data.customText19,
                })
                    .then(function (response) {
                        console.log('Updating Placement cie email ', response.data);
                    })
            }
            catch (err) {
                console.log('API CALL FAILED' + err)
                this.getRefreshToken(refreshToken, id1, id2, id3, id4);
            }
        }

    }









    StartAgain(restURL, restToken, refreshToken) {
        this.setFilesPrivate(restURL, restToken, refreshToken);
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

                <View style={{ height: 50, marginBottom: 10, marginTop: 20, alignSelf: 'flex-start', width: '50%' }}>
                    <TouchableOpacity onPress={this.notifyOpenJob}>
                        <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 2 }}>START AUTOMATION</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 50, marginBottom: 10, marginTop: 20, alignSelf: 'flex-end', width: '50%' }}>
                    <TouchableOpacity onPress={this.emailPlacementToCie}>
                        <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 2 }}>DO AGAIN</Text>
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
