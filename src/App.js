/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';


import { LoginPage } from "./containers/LoginPage"
import { UserPage } from "./containers/UserPage"

import langs from "./langs"

const App: () => React$Node = () => {
  const [ user, setUser ] = useState()
  const [ lang, setLang ] = useState()

  useEffect(() => {
    // document.querySelector("title").innerText = user ? "Main page" : "Login page"
    setLang(user?.lang)
  }, [ user ])

  const logoutHandler = () => {
    setUser()
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={ styles.appContainer }>
          <View style={styles.appHeader}>
            <Text style={styles.appHeaderText} accessibilityLabel="Header label" testID="Header label">{ user ? `${langs(user.lang, "Hello")}, ${ user.login }!` : langs(lang, "Not authorized")}</Text></View>
            {!user || <TouchableOpacity accessibilityLabel="Logout"  testID="Logout" style={ styles.logout } onPress={logoutHandler}>
                <Text style={ styles.logoutText }>{ langs(lang, "logout")} </Text>
              </TouchableOpacity>
              }
            <View style={styles.appContent} accessibilityLabel="Content block" testID="Content block">
              { user 
                ? <UserPage user={user}/> 
                : <LoginPage onLogin={ setUser } onSetLang={setLang} />
              }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
    height: "100%"
  },
  appContainer: {
    flex: 1,
    textAlign: "center",
    flexDirection: "column",
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
  },
  appContent: {
    width: 310,
    marginTop: 32,
    flexWrap: "wrap",
    flexDirection: "column",
    alignSelf: "center",
    // backgroundColor: "red"
  },
  appHeader: {
    display: "flex",
    height: 60,
    alignSelf: "stretch",
    textAlign: "center",
    backgroundColor: "#282c34",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  appHeaderText: {
    fontSize: 22,
    color: "white",
  },
  logout: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 60,
    fontSize: 16,
    borderWidth: 0,
    backgroundColor: "rgb(33, 150, 243)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 24
  },
  logoutText: {
    color: "white",
  }
})

export default App;
