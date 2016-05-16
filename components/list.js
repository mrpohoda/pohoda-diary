import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView
} from 'react-native';


var DiaryList = React.createClass({
  getInitialState: function() {
    return {
      items: []
    }
  },

  listenForItems: function(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          date: child.val().date,
          text: child.val().text,
          _key: child.key()
        });
      });

      this.setState({
        // dataSource: this.state.dataSource.cloneWithRows(items)
        items: items
      });

    });
  },

  componentDidMount: function() {
    this.listenForItems(this.props.firebaseRef);
  },

  _renderItem: function(item) {
    console.log('ITEM:', item);
    return (
      <View key={ item._key }>
        <Text style={styles.date}>{ item.date }</Text>
        <Text style={styles.text}>{ item.text }</Text>
      </View>
    );
  },

  _removeItem: function(item) {
    console.log('REMOVE', item);
  },

  render: function() {
    return <View>{ this.state.items.map(this._renderItem) }</View>;
  }
});

const styles = StyleSheet.create({
  date: {
    fontWeight: 'bold'
  },
  text: {
    marginBottom: 10
  }
});

export default DiaryList;