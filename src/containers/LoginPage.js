import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Button,
    Picker
  } from 'react-native';

//   import {Picker} from '@react-native-community/picker';
  import CheckBox from '@react-native-community/checkbox';

import langs from "./../langs"

export const LoginPage = ({ onLogin, onSetLang }) => {

    const [ login, setLogin ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ lang, setLang ] = useState("English")
    const [ remember, setRemember ] = useState(false)
    const [ validation, setValidation ] = useState({})

    useEffect(() => {
        onSetLang(lang)
    }, [ lang, onSetLang ])
    
    useEffect(() => {
        const v = {}
        if(login?.length < 1) v.login = langs(lang, "LoginValidation")
        if(password?.length < 1) v.login = langs(lang, "PasswordValidation")
        setValidation(v)
    }, [ login, password, lang, remember ])

    const handleLogin = () => {
        onLogin(Object.keys(validation).length ? undefined : {
            login, password, lang, remember
        })
    }

    return <View style={styles.loginContainer} accessibilityLabel="Authorization form" testID="Authorization form">
        <View style={styles.label}>
            <Text>{ langs(lang, "Login") }:</Text>
            <TextInput style={styles.input} onChangeText={setLogin} value={ login } accessibilityLabel="Login input" testID="Login input"/>
        </View>
        <View style={styles.label}>
            <Text>{ langs(lang, "Password") }:</Text>
            <TextInput style={styles.input} onChangeText={setPassword} value={ password } accessibilityLabel="Password input" testID="Password input" secureTextEntry={true}/>
        </View>
        <View style={styles.loginOptions}>
            <View style={styles.optionLabel}>
                <Text style={styles.optionLabelText}>{ langs(lang, "Language") }:</Text>
                <Picker itemStyle={{fontSize: 13}} mode={Picker.MODE_DROPDOWN} style={styles.optionPicker} selectedValue={ lang } onValueChange={setLang} accessibilityLabel="Language select" testID="Language select">
                    <Picker.Item label="Русский" value="Russian" />
                    <Picker.Item label="English" value="English" />
                </Picker>
            </View>
            <View style={styles.optionLabel}>
                <Text style={styles.optionLabelText}>{ langs(lang, "Remember") }:</Text>
                <CheckBox boxType={"square"} style={styles.CheckBox} selectedValue={ remember } onValueChange={e => setRemember(!remember)} accessibilityLabel="Remember me checkbox" testID="Remember me checkbox" type="checkbox"/> 
            </View>
        </View>
        <View style={styles.submitWrapper}>
            <Button style={styles.loginButton} disabled={Object.keys(validation).length > 0} accessibilityLabel="Login button" testID="Login button" onPress={ handleLogin } title={ langs(lang, "Submit") }/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    loginContainer: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        width: "100%"
    },
    label: {
        textAlign: "left",
        flexDirection: "column",
        fontSize: 13,
        marginTop: 8,
        display: "flex",
        alignSelf: "stretch",
    },
    optionLabel: {
        textAlign: "left",
        flexDirection: "row",
        fontSize: 13,
        marginTop: 32,
        height: 25,
        // marginLeft: 16,
        alignItems: "center",
        alignSelf: "stretch",
        // overflow: "hidden",
        // backgroundColor: "green"
    },
    CheckBox: {
        marginRight: 8,
        fontSize: 10,
        height: 20,
        marginLeft: 16
    },
    optionPicker: {
        marginRight: 32,
        marginLeft: 16,
        width: 150,
        height: 70,
        fontSize: 12,
        justifyContent: "center",
        // backgroundColor: "blue",
        zIndex: 0,
        // overflow: "hidden",
    },
    input: {
        fontSize: 15,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8,
        padding: 4,
        marginLeft: 16,
        alignSelf: "stretch",
        zIndex: 10,
        
    },
    loginButton: {
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    submitWrapper: {
        marginTop: 16,
        marginLeft: 16,
        borderWidth: 1,
        borderColor: "gray",
        alignSelf: "stretch",
    },
    loginOptions: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 32,
        // marginBottom: 32,
        height: 130,
        display: "flex",
        alignItems: "center",
        zIndex: 1,
        marginBottom: 32,
        // backgroundColor: "red",
        overflow: "hidden"
    },
    optionLabelText: {
        width: 120,
        textAlign: "right"
    }
  })