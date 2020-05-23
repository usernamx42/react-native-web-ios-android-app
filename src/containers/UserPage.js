import React from "react"
import {
    View,
    Text,
  } from 'react-native'

  import langs from "./../langs"

export const UserPage = ({ user }) => {
    return <View style={{marginLeft: 8}}>
            <Text testID="Private content">Here is your private content #1</Text>
            <Text testID="Private content">and private content #2</Text>
            {/* <Text>{langs(user.lang, "Hello")}, { user.login }!</Text> */}
        </View>
}