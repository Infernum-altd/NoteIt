import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";
import {createThrowErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;
  searchText: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("An error has occurred;")
      }
    );
  }

  getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      error => {
        alert("Error occurred while downloading the notes")
      }
    );
  }

  createNotebook() {
    let newNotebook: Notebook = {
      name: 'New notebook',
      id: null,
      nbOfNotes: 0
    };

    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      error => {
        alert("An error has occurred while saving the notebook;")
      }
    );
  }

  updateNotebook(updatedNotebook: Notebook) {
    this.apiService.postNotebook(updatedNotebook).subscribe(
      res => {
      },
      error => {
        alert("An error has occurred while saving the notebook;")
      }
    );
  }

  deleteNotebook(notebook: Notebook) {
    if (confirm("Are you sure you want to delete notebook?")){
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        error => {
          alert("Could not delete notebook")
        }
      );
    }
  }

  deleteNote(note: Note){
    if (confirm("Are you sure you want to delete this note?")){
      this.apiService.deleteNote(note.id).subscribe(
        res=>{
          let indexOfnote = this.notes.indexOf(note);
          this.notes.splice(indexOfnote, 1);
        },
        error => {alert("An error has occured deleting the note")}
      );
    }
  }

  createNote(notebookId: string) {
    let newNote: Note = {
      id:null,
      title: "New Note",
      text: "Write something here",
      lastModifiedOn: null,
      notebookId: notebookId
    };

    this.apiService.saveNote(newNote).subscribe(
      res =>{
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      error => {alert("An error while saving the note");}
    );
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getNotesByNoteBook(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      error => {alert("An error while downloading the notes")}
    )
  }

  updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res =>{

      },
      error => {alert("An error while saving the note");}
    );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
