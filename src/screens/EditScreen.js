import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import BlogPostForm from '../components/BlogPostForm';
import { Context } from '../context/BlogContext';

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { state, updateBlogPost } = useContext(Context);
  const { title, content } = state.find((bp) => bp.id === id);

  return (
    <BlogPostForm
      titleLabel='Edit Title:'
      contentLabel='Edit Content:'
      btnTitle='Update Blog Post'
      initialValues={{
        title,
        content,
      }}
      onPress={(title, content) => {
        updateBlogPost(id, title, content, () => {
          navigation.pop();
        });
      }}
    />
  );
};

export default EditScreen;

const styles = StyleSheet.create({});
