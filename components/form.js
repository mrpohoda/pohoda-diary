import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import ImageService from './ImageService';
// import Cloudinary from 'cloudinary';

const styles = require('../styles.js');

var is = new ImageService();

var Form = React.createClass({

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

  _chooseImage: function() {
    var self = this;
    is.chooseImage(function(response) {

      const source = {uri: response.uri, isStatic: true};

      console.log('Chosen image: ', response);
      self.setState({
        avatarSource: source
      });

      is.uploadImage(response.uri, response.fileName);
    })
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
        <TouchableHighlight onPress={this._chooseImage}>
          <Text>Add photo</Text>
        </TouchableHighlight>
        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
      </View>
    );
  }
})

export default Form;