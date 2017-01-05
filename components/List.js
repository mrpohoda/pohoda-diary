import React, { Component } from 'react';
import {
  View,
  ListView
} from 'react-native';
import ListItem from './ListItem.js';
const styles = require('../styles.js');

var DiaryList = React.createClass({

  getInitialState: function() {
    return {
      items: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  },

  listenForItems: function(itemsRef) {
    itemsRef.orderByChild('dateDesc').on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          date: child.val().date,
          text: child.val().text,
          images: child.val().images,
          _key: child.key()
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
        // items: items
      });

    });
  },

  componentDidMount: function() {
    this.listenForItems(this.props.firebaseRef);
  },

  _renderItem: function(item) {
    console.log('ITEM:', item);

    const onPress = () => {
      console.log('onPress...', item);
    }
    return (
      <ListItem item={item} onPress={onPress} />
    );
  },

  _removeItem: function(item) {
    console.log('REMOVE', item);
  },

  render: function() {
    return (
      // <View>{ this.state.items.map(this._renderItem) }</View>
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem}
          style={styles.listview}/>
      </View>
    );
  }
});

export default DiaryList;
