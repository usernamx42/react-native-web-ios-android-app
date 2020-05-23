import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Button,
    CheckBox,
    Picker
  } from 'react-native';

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
        if(login.length < 1) v.login = langs(lang, "LoginValidation")
        if(password.length < 1) v.login = langs(lang, "PasswordValidation")
        setValidation(v)
    }, [ login, password, lang, remember ])

    const handleLogin = () => {
        onLogin(Object.keys(validation).length ? undefined : {
            login, password, lang, remember
        })
    }

    return <View testID="Authorization form">
        <View style={styles.label}>
            <Text>{ langs(lang, "Login") }:</Text>
            <TextInput style={styles.input} onChange={e => setLogin(e.target.value)} value={ login } testID="Login input"/><br/>
        </View>
        <View style={styles.label}>
            <Text>{ langs(lang, "Password") }:</Text>
            <TextInput style={styles.input} onChange={e => setPassword(e.target.value)} value={ password } testID="Password input" secureTextEntry={true}/>
        </View>
        <View style={styles.loginOptions}>
            <View style={styles.optionLabel}>
                <Text>{ langs(lang, "Language") }:</Text>
                <Picker style={styles.optionPicker} value={ lang } onChange={e => setLang(e.target.value)} testID="Language select">
                    <Picker.Item label="Русский" value="Russian" />
                    <Picker.Item label="English" value="English" />
                </Picker>
            </View>
            <View style={styles.optionLabel}>
                <CheckBox style={styles.CheckBox} value={ remember } onChange={e => setRemember(!remember)} testID="Remember me checkbox" type="checkbox"/> 
                <Text>{ langs(lang, "Remember") }</Text>
            </View>
        </View>
        <View style={styles.submitWrapper}>
            <Button style={styles.loginButton} disabled={Object.keys(validation).length > 0} testID="Login button" onPress={ handleLogin } title={ langs(lang, "Submit") }/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    label: {
        textAlign: "left",
        flexDirection: "column",
        fontSize: 13,
        marginTop: 8,
        display: "flex",
    },
    optionLabel: {
        textAlign: "left",
        flexDirection: "row",
        fontSize: 13,
        marginTop: 8,
        marginLeft: 16
    },
    CheckBox: {
        marginRight: 8
    },
    optionPicker: {
        marginLeft: 8
    },
    input: {
        fontSize: 15,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8,
        padding: 4,
        marginLeft: 16
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
    },
    loginOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
        marginBottom: 32,
        display: "flex",
        alignItems: "center",
    },
  })