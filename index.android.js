import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import DiaryForm from './components/Form';
import DiaryList from './components/List';

const styles = require('./styles.js');

class PohodaDiary extends Component {

  render() {
    return (
      <View style={styles.container}>
        <DiaryForm />
        <DiaryList />
      </View>
    );
  }
}

AppRegistry.registerComponent('PohodaDiary', () => PohodaDiary);
