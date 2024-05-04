// body2.component.ts
import { Component } from '@angular/core';import
{ HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component'

interface Note {
  id: number; // Assuming each note has an ID
  description: string;
  day: string;
}

interface NotesByDay {
  sunday: Note[];
  monday: Note[];
  tuesday: Note[];
  wednesday: Note[];
  thursday: Note[];
  friday: Note[];
  saturday: Note[];
}

@Component({
  selector: 'app-body2',
  templateUrl: './body2.component.html',
  styleUrls: ['./body2.component.css']
})
export class Body2Component {
  title = 'todoapp';
  readonly APIUrl = "http://localhost:5038/api/todoapp/";
  notes: Note[] = [];
  notesByDay: NotesByDay = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  };

  constructor(private http: HttpClient, private appComponent: AppComponent) {}

  ngOnInit() {
    this.refreshNotes();
  }

  refreshNotes() {
    this.http.get<Note[]>(this.APIUrl + 'GetNotes').subscribe(data => {
      this.notes = data;
      this.categorizeNotes();
    }, error => {
      console.error('Failed to load notes:', error);
    });
  }

  categorizeNotes() {
    this.notes.forEach(note => {
      let day = note.day.toLowerCase();
      if (this.notesByDay.hasOwnProperty(day)) {
        this.notesByDay[day as keyof NotesByDay].push(note);
      }
    });
  }

  addNotes() {
    var newNotes = (<HTMLInputElement>document.getElementById("newNotes")).value;
    var dayOfWeek = (<HTMLInputElement>document.getElementById("dayOfWeek")).value;
    var formData = new FormData();
    formData.append("newNotes", newNotes);
    formData.append("dayOfWeek", dayOfWeek);
    this.http.post<Note>(this.APIUrl + 'AddNotes', formData).subscribe({
      next: (note) => {
        alert('Note added!');
        this.appComponent.notifyNoteAdded(note); // Notify other components
        this.refreshNotes();
      },
      error: (error) => {
        console.error('Error adding note:', error);
      }
    });
  }

  reloadPage() {
    window.location.reload();
  }
}

