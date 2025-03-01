import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "NDnOw3Ud4HRclFwT4ah0D0LLTRhFmuxM4ai0zxkf",
  databaseURL: "https://datafasteox-default-rtdb.firebaseio.com/",
  projectId: "datafasteox",
  appId: "1:909777783079:web:YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push };