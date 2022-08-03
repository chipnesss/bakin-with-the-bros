import { createContext, useContext, useEffect, useState } from "react";
import initializeFirebase from "./firebase/connection";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [firebase, setFirebase] = useState(null);

  useEffect(() => {
    console.log("I work");
    const database = initializeFirebase();
    console.log(database);
    setFirebase(database);
  }, []);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
