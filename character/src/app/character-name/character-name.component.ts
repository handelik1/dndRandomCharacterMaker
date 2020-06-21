import { NameService } from './name.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-name',
  templateUrl: './character-name.component.html',
  styleUrls: ['./character-name.component.css']
})
export class CharacterNameComponent implements OnInit {

  constructor(private nameService: NameService) { }

  ngOnInit(): void {
  }

}
