import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import Firebase from 'firebase';

import DiaryForm from './components/Form';
import DiaryList from './components/List';

const styles = require('./styles.js');

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

AppRegistry.registerComponent('PohodaDiary', () => PohodaDiary);
