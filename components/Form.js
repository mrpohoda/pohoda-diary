import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImageService from './ImageService';
// import Cloudinary from 'cloudinary';

import db from '../services/db';

const styles = require('../styles.js');

var is = new ImageService();

var Form = React.createClass({

  getInitialState: function() {
    return {
      date: new Date(),
      text: '',
      images: []
    }
  },

  resetState: function() {
    this.setState({
      text: '',
      images: []
    });
    this._textInput.setNativeProps({text: ''});
  },

  _save: function() {
    const state = this.state;
    db.createEntry({
      date: state.date,
      text: state.text,
      images: state.images
    });

    this.resetState();
  },

  _chooseImage: function() {
    var self = this;
    is.chooseImage(function(response) {

      const source = {uri: response.uri, isStatic: true};

      console.log('Chosen image: ', response);

      var newArray = self.state.images.slice();
      newArray.push(response.uri);
      self.setState({images: newArray});
      // self.setState({
      //   avatarSource: source
      // });

      var xhr = is.uploadImage(response.uri, response.fileName);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var image = JSON.parse(xhr.responseText);
          console.log(image);
          if (image.url) {
            var newArray = self.state.images.slice();

            var index = newArray.indexOf(response.uri);
            if (index !== -1) {
              newArray[index] = image.url;
            }

            self.setState({images: newArray});
          }
        }
      }
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
          ref={component => this._textInput = component}
          onChangeText={(text) => this.setState({text})}
        />
        <TouchableHighlight onPress={this._chooseImage}>
          <Text>Add photo</Text>
        </TouchableHighlight>
        {this.state.images.map(function(image) {
          return <Image key={image} source={{uri: image}} style={styles.uploadAvatar} />
          // <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
        })}
      </View>
    );
  }
})

export default Form;
