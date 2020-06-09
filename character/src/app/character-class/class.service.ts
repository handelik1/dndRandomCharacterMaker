import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseURL = 'http://www.dnd5eapi.co/api/classes';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  getClasses() {
    return this.http.get(baseURL);
  }
}
