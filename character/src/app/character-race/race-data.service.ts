import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseURL = 'http://www.dnd5eapi.co/api/races/';

@Injectable({
  providedIn: 'root'
})
export class RaceDataService {

  constructor(private http: HttpClient) { }

  getRaceData(theRace) {
    return this.http.get(baseURL + theRace);
  }
}
