import { Timestamp } from "@angular/fire/firestore/firebase";

export interface Note {
  id: string,
  content: string,
  date: Timestamp,
  img: string,
}
