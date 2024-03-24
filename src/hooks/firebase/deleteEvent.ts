import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./init";
import { collectionName } from "../../constants/const";

export const deleteEvent = async (eventId: string) => {
  const documentRef = doc(db, collectionName, eventId);

  deleteDoc(documentRef)
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};
