import createDataContext from './createDataContext';

import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogPosts':
      return action.payload;
    case 'delete_blogPost':
      return state.filter((blogPost) => blogPost.id !== action.payload);
    // case 'add_blogPost':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 9999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
    case 'update_blogPost':
      return state.map((bp) => {
        return bp.id === action.payload.id ? action.payload : bp;
      });

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogPosts');
    dispatch({ type: 'get_blogPosts', payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogPosts', { title, content });

    //dispatch({ type: 'add_blogPost', payload: { title, content } });
    if (callback) callback();
  };
};

const updateBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogPosts/${id}`, { title, content });
    dispatch({ type: 'update_blogPost', payload: { id, title, content } });
    callback();
  };
};
const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogPosts/${id}`);

    dispatch({ type: 'delete_blogPost', payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost },
  []
);
