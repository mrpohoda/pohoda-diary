import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ListView
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

var TestItem = React.createClass({

  getInitialState: function() {
    return {
      date: new Date(),
      text: ''
    }
  },

  _save: function() {
    var date = moment(this.state.date).format('YYYY-MM-DD');
    var uniqId = date + '-' + new Date().getTime();
    this.props.firebaseRef.child(uniqId).set({
      date: date,
      text: this.state.text
    });
  },

  render: function() {
    return (
      <View>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          format="YYYY-MM-DD"
          // minDate="2016-05-01"
          // maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          // iconSource={require('./google_calendar.png')}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <TouchableHighlight onPress={this._save}>
          <Text>Save</Text>
        </TouchableHighlight>
        <TextInput
          name="description"
          placeholder="Add new entry..."
          maxNumberOfLines={50}
          multiline
          numberOfLines={1}
          onChangeText={(text) => this.setState({text})}
        />
      </View>
    );
  }
})

export default TestItem;