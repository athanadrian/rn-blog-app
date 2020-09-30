import axios from 'axios';

export default axios.create({
  // should change every 8 hours
  // run on terminal npm run tunnel 'script-> "tunnel":"ngrok http 3000"'
  baseURL: 'http://c4cd087aec46.ngrok.io',
});
