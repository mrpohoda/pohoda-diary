import React, { Component } from 'react';
import { ImagePickerManager } from 'NativeModules';
import CryptoJS from 'crypto-js';

const options = {
  title: 'Add photo', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  // customButtons: {
  //   'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  // },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  // videoQuality: 'high', // 'low', 'medium', or 'high'
  // durationLimit: 10, // video recording max time in seconds
  // maxWidth: 100, // photos only
  // maxHeight: 100, // photos only
  // aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  // aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  // angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  // storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
  //   skipBackup: true, // ios only - image will NOT be backed up to icloud
  //   path: 'images' // ios only - will save image at /Documents/images rather than the root
  // }
};

class ImageService extends Component {

  chooseImage(cb) {
    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // uri (on iOS)
        // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        // const source = {uri: response.uri, isStatic: true};

        cb(response);
      }
    });
  }

  uploadImage(uri, fileName) {
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = '193632296433199';
    let api_secret = 'VaXt0xIxEevi-wBeQLh9clLri-4';
    let cloud = 'mrpohoda';
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      console.log(xhr);
    };
    let formdata = new FormData();
    formdata.append('file', {uri: uri, type: 'image/jpeg', name: fileName});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    // formdata.append('folder', 'pohoda-diary');
    xhr.send(formdata);

    return xhr;
  }
}

export default ImageService;