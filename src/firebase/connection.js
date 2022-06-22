import { initializeApp } from 'firebase/app';
import firebaseConfig from './apiKeys.json';
import { getDatabase } from "firebase/database";


const firebaseApp = () => {

    console.log('initialized')
    const app = initializeApp(firebaseConfig.firebaseKeys);
    
    // Get a reference to the database service
    return getDatabase(app);
};



export default firebaseApp;