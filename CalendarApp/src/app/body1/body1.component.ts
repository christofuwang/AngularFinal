// body1.component.ts
import { Component } from '@angular/core';import
{ HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component'

interface Note {
  id: number;  // Ensure your note structure is properly typed
  description: string;
  day: string;
}

interface NotesByDay {
  [key: string]: Note[];  // Index signature
  sunday: Note[];
  monday: Note[];
  tuesday: Note[];
  wednesday: Note[];
  thursday: Note[];
  friday: Note[];
  saturday: Note[];
}


@Component({
  selector: 'app-body1',
  templateUrl: './body1.component.html',
  styleUrls: ['./body1.component.css']
})
export class Body1Component {
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

  refreshNotes() {
    // Clear existing notes before fetching new ones to avoid duplication
    Object.keys(this.notesByDay).forEach(day => this.notesByDay[day] = []);

    this.http.get<Note[]>(this.APIUrl + 'GetNotes').subscribe(data => {
      data.forEach(note => {
        this.notesByDay[note.day.toLowerCase()].push(note);
      });
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
    const newNotesInput = (<HTMLInputElement>document.getElementById("newNotes")).value;
    const dayOfWeek = (<HTMLInputElement>document.getElementById("dayOfWeek")).value.toLowerCase();
    const existingNote = this.notesByDay[dayOfWeek].find(note => note.description.toLowerCase() === newNotesInput.toLowerCase());

    if (existingNote) {
      alert('This note already exists for ' + dayOfWeek);
      return; // Stop the function if the note already exists
    }

    var formData = new FormData();
    formData.append("newNotes", newNotesInput);
    formData.append("dayOfWeek", dayOfWeek);

    this.http.post<Note>(this.APIUrl + 'AddNotes', formData).subscribe({
      next: (note) => {
        alert('Note added!');
        this.notesByDay[dayOfWeek].push(note); // Add the new note to the specific day array
        this.refreshNotes();
      },
      error: (error) => {
        console.error('Error adding note:', error);
        alert('Failed to add note.');
      }
    });
  }

  deleteNotes(id: any) {
    this.http.delete(this.APIUrl + 'DeleteNotes?id=' + id).subscribe({
      next: (response) => {
        alert('Note deleted successfully');
        // Remove the note from the local list without needing to refresh from the server
        Object.keys(this.notesByDay).forEach(day => {
          this.notesByDay[day] = this.notesByDay[day].filter(note => note.id !== id);
        });
      },
      error: (error) => {
        console.error('Failed to delete the note:', error);
        alert('Failed to delete note.');
      }
    });
  }
}

