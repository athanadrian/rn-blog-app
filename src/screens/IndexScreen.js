import React, { useContext, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Context } from '../context/BlogContext';

const IndexScreen = ({ navigation }) => {
  const { state, getBlogPosts, deleteBlogPost } = useContext(Context);
  //console.log(state);

  useEffect(() => {
    getBlogPosts();

    //re-fetch data on listener
    const Listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    //unsubscribe
    return () => {
      Listener.remove();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Show', { id: item.id })}
          >
            <View style={styles.container}>
              <Text style={styles.text}>
                {item.title} - {item.id}
              </Text>
              <Text style={styles.subText}>{item.content}</Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Feather style={styles.trashIcon} name='trash' />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather style={styles.plusIcon} name='plus' />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 15,
  },
  plusIcon: {
    color: 'green',
    fontSize: 30,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
  },
  subText: {
    flex: 1,
    fontSize: 14,
  },
  trashIcon: {
    fontSize: 24,
    color: 'tomato',
  },
});

export default IndexScreen;
