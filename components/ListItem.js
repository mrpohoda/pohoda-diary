import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
const styles = require('../styles.js');

class ListItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.date}>{ this.props.item.date }</Text>
          <Text style={styles.liText}>{this.props.item.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;