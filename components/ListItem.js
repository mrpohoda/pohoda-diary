import React, { Component } from 'react';
import {
  Image,
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
          <View style={styles.images}>
	        {this.props.item.images && this.props.item.images.map(function(image) {
	       	  return <Image key={image} source={{uri: image}} style={styles.uploadAvatar} />
	        })}
	      </View>
          <Text style={styles.liText}>{this.props.item.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;