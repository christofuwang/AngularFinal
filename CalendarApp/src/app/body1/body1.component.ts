// body1.component.ts
import { Component } from '@angular/core';import
{ HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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
    // Initialize or clear categories
    this.notesByDay = {
      sunday: [], monday: [], tuesday: [], wednesday: [],
      thursday: [], friday: [], saturday: []
    };

    // Categorize all current notes
    this.notes.forEach(note => {
      let day = note.day.toLowerCase();
      if (this.notesByDay.hasOwnProperty(day)) {
        this.notesByDay[day as keyof NotesByDay].push(note);
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

