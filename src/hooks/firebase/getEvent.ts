import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "./init";
import { collectionName } from "../../constants/const";

export const getEvent = async (eventId: string): Promise<DocumentData> => {
  try {
    const docRef = doc(db, collectionName, eventId);
    const snapshot = await getDoc(docRef);

    return snapshot.data() ?? [];
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};
