import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "ToDoApp"
}
