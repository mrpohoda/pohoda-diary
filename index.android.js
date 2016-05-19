import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Firebase from 'firebase';

import DiaryForm from './components/Form';
import DiaryList from './components/List';

const FirebaseUrl = 'https://pohodadiary.firebaseio.com/';
const firebaseRef = new Firebase(FirebaseUrl + 'entries/');

class PohodaDiary extends Component {

  render() {
    return (
      <View style={styles.container}>
        <DiaryForm firebaseRef={firebaseRef} />
        <DiaryList firebaseRef={firebaseRef} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    // textAlign: 'center',
    margin: 10,
  },
  instructions: {
    // textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PohodaDiary', () => PohodaDiary);
