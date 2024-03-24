import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./init";
import { collectionName } from "../../constants/const";

export const getEvent = async (isAll: boolean, eventIds: string[]) => {
  if (isAll) {
    const collectionRef = collection(db, collectionName);
    await getDocs(collectionRef)
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        return [];
      });
  } else {
    const docRef = doc(db, collectionName, eventIds[0]);
    await getDoc(docRef)
      .then((docSnap) => {
        return docSnap.exists() ? docSnap.data() : [];
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        return [];
      });
  }
};
