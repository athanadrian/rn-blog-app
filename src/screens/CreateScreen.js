import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import BlogPostForm from '../components/BlogPostForm';
import { Context } from '../context/BlogContext';

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);

  return (
    <BlogPostForm
      titleLabel='Enter New Title:'
      contentLabel='Enter New Content:'
      btnTitle='Add Blog Post'
      onPress={(title, content) => {
        addBlogPost(title, content, () => {
          navigation.navigate('Index');
        });
      }}
    />
  );
};

export default CreateScreen;

const styles = StyleSheet.create({});
