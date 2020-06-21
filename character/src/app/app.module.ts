import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterRaceComponent } from './character-race/character-race.component';
import { RaceService } from './character-race/race.service';
import { CharacterClassComponent } from './character-class/character-class.component';
import { ClassService } from './character-class/class.service';
import { ClassDataService } from './character-class/class-data.service';
import { RaceDataService } from './character-race/race-data.service';
import { CharacterNameComponent } from './character-name/character-name.component';
import { NameService } from './character-name/name.service';

@NgModule({
  declarations: [
    AppComponent,
    CharacterRaceComponent,
    CharacterClassComponent,
    CharacterNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [RaceService, ClassService, ClassDataService, RaceDataService, NameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
