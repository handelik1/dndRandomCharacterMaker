import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseURL = 'http://www.dnd5eapi.co/api/races';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }

  getRaces() {
    return this.http.get(baseURL);
  }
}
