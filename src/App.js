import React, { useState, useEffect } from 'react'

import {
  // AppRegistry,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native'

import { LoginPage } from "./containers/LoginPage"
import { UserPage } from "./containers/UserPage"

import langs from "./langs"

function App() {
  const [ user, setUser ] = useState()
  const [ lang, setLang ] = useState()

  useEffect(() => {
    document.querySelector("title").innerText = user ? "Main page" : "Login page"
    setLang(user?.lang)
  }, [ user ])

  const logoutHandler = () => {
    setUser()
  }

  return (
    <View style={ styles.appContainer }>
      <Text style={styles.appHeader} testID="Header label">{ user ? `${langs(user.lang, "Hello")}, ${ user.login }!` : langs(lang, "Not authorized")}</Text>
      {!user || <TouchableOpacity testID="Logout" style={ styles.logout } onPress={logoutHandler}>
          <Text style={ styles.logoutText }>{ langs(lang, "logout")} </Text>
        </TouchableOpacity>
        }
      <View style={styles.appContent} testID="Content block">
        { user 
          ? <UserPage user={user}/> 
          : <LoginPage onLogin={ setUser } onSetLang={setLang} />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    textAlign: "center",
    flexDirection: "column",
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
  },
  appContent: {
    width: 300,
    marginTop: 32,
    flexWrap: "wrap",
    flexDirection: "column",
    alignSelf: "center"
  },
  appHeader: {
    display: "flex",
    height: 60,
    backgroundColor: "#282c34",
    textAlignVertical: "center",
    fontSize: 28,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16
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
    paddingHorizontal: 32
  },
  logoutText: {
    color: "white",
  }
})

export default App
