import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Note } from "../interfaces/note";
import { AuthService } from "./auth.service";
import { PRIMARY_OUTLET, Router } from "@angular/router";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc, docData,
  Firestore,
  orderBy,
  query,
  updateDoc
} from "@angular/fire/firestore";

@Injectable({ providedIn: 'root' })
export class NotesService {

  user_uid = sessionStorage.getItem('user_uid');
  collect = collection(this.firestore, `users/${this.user_uid}/notes`);

  constructor(private firestore: Firestore, private authService: AuthService, private router: Router) { }

  addNote(note: Note) {
    return addDoc(this.collect, note);
  }

  getNotes(): Observable<Note[]> {
    const q = query(this.collect, orderBy('date', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Note[]>;
  }

  getNote(id: string): Observable<Note> {
    const noteRef = doc(this.collect, id);
    return docData(noteRef) as Observable<Note>;
  }

  deleteNote(note: Note) {
    const noteRef = doc(this.firestore, `users/${this.user_uid}/notes/${note.id}`);
    return deleteDoc(noteRef);
  }

  updateNote(note: Note) {
    note.id = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments[2].path;
    const noteRef = doc(this.firestore, `users/${this.user_uid}/notes/${note.id}`);

    return updateDoc(noteRef, {
      content: note.content,
      date: note.date,
      img: note.img,
    });
  }
}
