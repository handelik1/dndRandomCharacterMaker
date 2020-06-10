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
  myProficiencyChoices = 'proficiency_choices';
  results = 'results';
  choose = 'choose';
  from = 'from';
  name = 'name';
  proficiencies = 'proficiencies';
  mySavingThrows = 'saving_throws';
  data;
  theClass = '';
  savingThrows = [];
  proficiencyChoices = [];
  numberToChoose = '';
  proficiencyList = [];
  equipmentProficiences = [];


  constructor(private classService: ClassService, private classData: ClassDataService) { }

  // Gets data related to the random class choice.
  getClassData(theClass) {
    this.classData.getClassData(theClass.toLowerCase()).subscribe(classData => {
      this.data = classData;
      if (this.data[this.name] === 'Monk') {
        this.proficiencyChoices = this.data[this.myProficiencyChoices][2];
      }
      else {
        this.proficiencyChoices = this.data[this.myProficiencyChoices][0];
      }
      this.numberToChoose = this.proficiencyChoices[this.choose];
      this.proficiencyList = this.proficiencyChoices[this.from];
      this.equipmentProficiences = this.data[this.proficiencies];
      this.savingThrows = this.data[this.mySavingThrows];
    });
  }

  // Gets random class.
  getRandomClass() {
    this.classService.getClasses().subscribe(classes => {
      this.classList = classes[this.results];
      const randomNumber = Math.floor(Math.random() * this.classList.length);
      this.myRandomClass = this.classList[randomNumber].name;
      this.getClassData(this.myRandomClass);
      return this.myRandomClass;
    });
  }

  ngOnInit(): void {
    this.getRandomClass();
  }

}
