// src/services/riverService.js

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export async function getRiverLevels() {
  const q = query(collection(db, "river_levels"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    date: doc.data().date,
    level: doc.data().level
  }));
}
