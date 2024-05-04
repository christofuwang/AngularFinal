// body2.component.ts
import { Component } from '@angular/core';import
{ HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-body2',
  templateUrl: './body2.component.html',
  styleUrls: ['./body2.component.css']
})
export class Body2Component {
  title = 'todoapp';
  readonly APIUrl = "http://localhost:5038/api/todoapp/";
  constructor(private http:HttpClient){

  }
  notes:any=[];
  refreshNotes(){
    this.http.get(this.APIUrl+'GetNotes').subscribe(data=>{
      this.notes = data;
    })
  }


  ngOnInit(){
  this.refreshNotes();
  }

  addNotes(){
    var newNotes = (<HTMLInputElement>document.getElementById("newNotes")).value;
    var formData = new FormData();
    formData.append("newNotes",newNotes);
    this.http.post(this.APIUrl+'AddNotes', formData).subscribe(data=>{
      alert(data);
      this.refreshNotes();
    })
  }

  deleteNotes(id:any){
    this.http.delete(this.APIUrl+'DeleteNotes?id='+id).subscribe(data=>{
      alert(data);
      this.refreshNotes();
    })
  }
}

