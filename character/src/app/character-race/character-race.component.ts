import { RaceDataService } from './race-data.service';
import { RaceService } from './race.service';
import { Component, OnInit } from '@angular/core';
import * as data from '../../assets/names.json';

@Component({
  selector: 'app-character-race',
  templateUrl: './character-race.component.html',
  styleUrls: ['./character-race.component.css']
})

export class CharacterRaceComponent implements OnInit {

  public abilityScores = [
    { id: 'STR', score: 8 },
    { id: 'DEX', score: 8 },
    { id: 'CON', score: 8 },
    { id: 'INT', score: 8 },
    { id: 'WIS', score: 8 },
    { id: 'CHA', score: 8 },
  ];

  public abilityMods = [
    { id: 'STR', score: 0 },
    { id: 'DEX', score: 0 },
    { id: 'CON', score: 0 },
    { id: 'INT', score: 0 },
    { id: 'WIS', score: 0 },
    { id: 'CHA', score: 0 },
  ];

  public abilites = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  public gender = ['male', 'female'];
  raceList = [];
  data;
  myScores = [];
  fullName;
  characterAC;
  myRandomRace;
  abilityBonusList = [];
  languageList = [];
  speed;
  constructor(private raceService: RaceService, private raceData: RaceDataService) { }

  // Gets random race.
  getRandomRace() {
    this.raceService.getRaces().subscribe(races => {
      this.raceList = races['results'];
      const randomNumber = Math.floor(Math.random() * this.raceList.length);
      this.myRandomRace = this.raceList[randomNumber];
      this.myRandomRace = this.myRandomRace.name;
      this.getRaceData(this.myRandomRace);
      this.getRaceAndGender(this.myRandomRace);
      return this.myRandomRace;
    });
  }

// Gets the race and randomly generates the gender. Then passes them to the random name generator function.
  getRaceAndGender(race) {
    const random0Or1 = Math.round(Math.random());
    const gender = this.gender[random0Or1];
    this.getRandomName(race, gender);
  }

  // Gets random name based on race and gender.
  getRandomName(race, gender) {
    const theRace = race.toLowerCase();
    const nameArray = (data as any).default;

    const firstNameList = nameArray[0][theRace]['firstname'][gender];
    const firstNameRandomNum = Math.floor(Math.random() * firstNameList.length);
    console.log(firstNameRandomNum)
    const firstName = firstNameList[firstNameRandomNum];

    const lastNameList = nameArray[0][theRace]['lastname'];
    const lastNameRandomNum = Math.floor(Math.random() * lastNameList.length);
    console.log(lastNameRandomNum)
    const lastName = lastNameList[lastNameRandomNum];

    this.fullName = firstName + ' ' + lastName;
    return this.fullName;
  }

  // Gets data related to the random race choice.
  getRaceData(theRace) {
    this.raceData.getRaceData(theRace.toLowerCase()).subscribe(raceData => {
      this.data = raceData;
      this.abilityBonusList = this.data['ability_bonuses'];
      this.languageList = this.data['languages'];
      this.speed = this.data['speed'];
      const adjustedScores = this.calculateRaceBonuses(this.abilityBonusList, this.abilityScores);
      this.myScores = adjustedScores;
    });
  }

  // Adds racial bonus to ability scores.
  calculateRaceBonuses(abilityBonusList, abilityScores) {
    Object.entries(abilityBonusList).forEach(([key, value]) => {
      Object.entries(abilityScores).forEach(([key1, value1]) => {
        if (value['name'] === value1['id']) {
          value1['score'] += value['bonus'];
        }
      });
    });
    this.calculateAbilityScores(abilityScores);
    return abilityScores;
  }

  // Uses 27 point system to determine ability scores.
  calculateAbilityScores(abilityScores) {
    let calculatedAbilityScores = [];
    for (let i = 0; i < 27; i++) {
      const randomAbility = Math.floor(Math.random() * 6);
      calculatedAbilityScores = abilityScores[randomAbility]['score'] += 1;
    }
    this.calculateAbilityMod(abilityScores);
  }

  // Calculates ability scores from ability scores.
  calculateAbilityMod(abilityScores) {
    let modifier = 0;
    Object.entries(this.abilityScores).forEach(([key, abilityScoreValue]) => {
      modifier = Math.floor((abilityScoreValue['score'] - 10) / 2);
      Object.entries(this.abilityMods).forEach(([key1, abilityModValue]) => {
        if (abilityScoreValue['id'] === abilityModValue['id']) {
          abilityModValue['score'] += modifier;
        }
      });
    });
    this.characterAC = this.calculateAC(this.abilityMods);
    return this.characterAC;
  }
  // Calculates AC from DEX in abilityMods.
  calculateAC(abilityMods) {
    const calculatedAC = abilityMods[1]['score'] + 10;
    return calculatedAC;
  }

  ngOnInit(): void {
    this.getRandomRace();
  }
}
