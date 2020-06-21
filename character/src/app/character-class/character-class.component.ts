import { ClassDataService } from './class-data.service';
import { Component, OnInit } from '@angular/core';
import { ClassService } from './class.service';

@Component({
  selector: 'app-character-class',
  templateUrl: './character-class.component.html',
  styleUrls: ['./character-class.component.css']
})

export class CharacterClassComponent implements OnInit {

  classList = [];
  classDataList = [];
  myRandomClass;
  data;
  theClass = '';
  savingThrows = [];
  proficiencyChoices = [];
  numberToChoose = '';
  proficiencyList = [];
  equipmentProficiences = [];


  constructor(private classService: ClassService, private classData: ClassDataService) { }

  // Gets random class.
  getRandomClass() {
    this.classService.getClasses().subscribe(classes => {
      this.classList = classes['results'];
      const randomNumber = Math.floor(Math.random() * this.classList.length);
      this.myRandomClass = this.classList[randomNumber].name;
      this.getClassData(this.myRandomClass);
      return this.myRandomClass;
    });
  }

  // Gets data related to the random class choice.
  getClassData(theClass) {
    this.classData.getClassData(theClass.toLowerCase()).subscribe(classData => {
      this.data = classData;
      if (this.data['name'] === 'Monk') {
        this.proficiencyChoices = this.data['proficiency_choices'][2];
      }
      else {
        this.proficiencyChoices = this.data['proficiency_choices'][0];
      }
      this.numberToChoose = this.proficiencyChoices['choose'];
      this.proficiencyList = this.proficiencyChoices['from'];
      this.equipmentProficiences = this.data['proficiencies'];
      this.savingThrows = this.data['saving_throws'];
    });
  }

  ngOnInit(): void {
    this.getRandomClass();
  }

}
