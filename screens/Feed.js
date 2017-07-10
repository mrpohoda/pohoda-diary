import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { users } from '../config/data';

class Feed extends Component {
  onLearnMore = (user) => {
    this.props.navigation.navigate('Details', { ...user });
  };

  render() {
    return (
      <View>

        <ScrollView>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.login.username}
                roundAvatar
                avatar={{ uri: user.picture.thumbnail }}
                title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
                subtitle={user.email}
                onPress={() => this.onLearnMore(user)}
              />
            ))}
          </List>
        </ScrollView>
        <Icon
          raised
          name='plus'
          type='font-awesome'
          color='#f50'
          style={{position: "absolute", bottom: 10, right: 10}}
          onPress={() => console.log('hello')} />
      </View>
    );
  }
}

export default Feed;
