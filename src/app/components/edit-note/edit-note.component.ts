import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NotesService } from "../../services/notes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Timestamp } from "@angular/fire/firestore";
import { Observable, tap } from "rxjs";
import { Note } from "../../interfaces/note";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  form: FormGroup;
  note$: Observable<Note> | null = null;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      content: new FormControl(),
      date: new FormControl(Timestamp.now()),
      img: new FormControl(),
      id: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.note$ = this.notesService.getNote(id);
        })
      )
      .subscribe();

    this.note$?.subscribe((note: Note) => {
      this.form.get('content')?.setValue(note.content);
      this.form.get('date')?.setValue(note.date);
      this.form.get('id')?.setValue(note.id);
      this.form.get('img')?.setValue(note.img);
    });
  }

  async onSubmit() {
    const response = await this.notesService.updateNote({
      content: this.form.value.content,
      date: Timestamp.now(),
      id: this.form.value.id,
      img: this.form.value.img,
    });
    await this.router.navigate(['/diary']);
  }
}
