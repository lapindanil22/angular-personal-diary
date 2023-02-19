import { Component, OnInit } from '@angular/core';
import { Note } from "../../interfaces/note";
import { NotesService } from "../../services/notes.service";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  notes: Note[] = []

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    })
  }

  async onClickDelete(note: Note) {
    const response = await this.notesService.deleteNote(note);
  }
}
