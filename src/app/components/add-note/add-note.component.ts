import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NotesService } from "../../services/notes.service";
import { Timestamp } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  form: FormGroup;

  constructor(private notesService: NotesService, private router: Router) {
    this.form = new FormGroup({
      content: new FormControl(),
      date: new FormControl(Timestamp.now()),
      img: new FormControl(),
    })
  }

  ngOnInit(): void { }

  async onSubmit() {
    const response = await this.notesService.addNote(this.form.value);
    await this.router.navigate(['/diary']);
  }
}
