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
  readonly APIUrl = "http://localhost:5038/api/todoapp/";
  notes: Note[] = []; // This should already be populated via your existing methods

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshNotes(); // Fetches all notes on initialization
  }

  refreshNotes() {
    // Your existing method to fetch all notes
    this.http.get<Note[]>(this.APIUrl + 'GetNotes').subscribe(data => {
      this.notes = data;
    }, error => {
      console.error('Failed to load notes:', error);
    });
  }

  deleteNotes(id: number) {
    // Your existing method to delete notes
    this.http.delete(this.APIUrl + 'DeleteNotes?id=' + id).subscribe(() => {
      // Immediately remove the note from the list upon successful deletion
      this.notes = this.notes.filter(note => note.id !== id);
    }, error => {
      console.error('Failed to delete the note:', error);
    });
  }
}

