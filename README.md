Run development version in emulator or directly on device (depends on which one is connected):
react-native run-android

Accessing development options: CMD+m on laptop, shake the phone on real device.

Generating the release APK:
cd android && ./gradlew assembleRelease

Installing the release on the device:
https://facebook.github.io/react-native/docs/running-on-device-android.html#content
cd android && ./gradlew installRelease