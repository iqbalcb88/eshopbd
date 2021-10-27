import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';

const initAppAuth = () => {
  initializeApp(firebaseConfig);
};

export default initAppAuth;
