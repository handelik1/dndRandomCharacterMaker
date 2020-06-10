import { RaceDataService } from './race-data.service';
import { RaceService } from './race.service';
import { Component, OnInit } from '@angular/core';


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

  raceList = [];
  data;
  myScores = [];
  yourAC;
  myRandomRace;
  results = 'results';
  name = 'name';
  id = 'id';
  score = 'score';
  bonus = 'bonus';
  abilityBonusList = [];
  abilityBonuses = 'ability_bonuses';
  languageList = [];
  languages = 'languages';

  constructor(private raceService: RaceService, private raceData: RaceDataService) { }

  // Gets data related to the random race choice.
  getRaceData(theRace) {
    this.raceData.getRaceData(theRace.toLowerCase()).subscribe(raceData => {
      this.data = raceData;
      this.abilityBonusList = this.data[this.abilityBonuses];
      this.languageList = this.data[this.languages];
      const adjustedScores = this.calculateRaceBonuses(this.abilityBonusList, this.abilityScores);
      this.myScores = adjustedScores;
    });
  }

  getRandomRace() {
    this.raceService.getRaces().subscribe(races => {
      this.raceList = races[this.results];
      const randomNumber = Math.floor(Math.random() * this.raceList.length);
      this.myRandomRace = this.raceList[randomNumber];
      this.myRandomRace = this.myRandomRace.name;
      this.getRaceData(this.myRandomRace);
      return this.myRandomRace;
    });
  }

  // Adds racial bonus to ability scores.
  calculateRaceBonuses(abilityBonusList, abilityScores) {
    Object.entries(abilityBonusList).forEach(([key, value]) => {
      Object.entries(abilityScores).forEach(([key1, value1]) => {
        if (value[this.name] === value1[this.id]) {
          value1[this.score] += value[this.bonus];
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
      calculatedAbilityScores = abilityScores[randomAbility][this.score] += 1;
    }
    this.calculateAbilityMod(abilityScores);
  }

  // Calculates ability scores from ability scores.
  calculateAbilityMod(abilityScores) {
    let modifier = 0;
    Object.entries(this.abilityScores).forEach(([key, abilityScoreValue]) => {
      modifier = Math.floor((abilityScoreValue[this.score] - 10) / 2);
      Object.entries(this.abilityMods).forEach(([key1, abilityModValue]) => {
        if (abilityScoreValue[this.id] === abilityModValue[this.id]) {
          abilityModValue[this.score] += modifier;
        }
      });
    });
    this.yourAC = this.calculateAC(this.abilityMods);
    return this.yourAC;
  }
  // Calculates AC from DEX in abilityMods.
  calculateAC(abilityMods){
    const calculatedAC = abilityMods[1][this.score] + 10;
    return calculatedAC;
  }

  ngOnInit(): void {
    this.getRandomRace();
  }
}
