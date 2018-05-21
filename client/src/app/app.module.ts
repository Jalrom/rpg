import { MatTooltipModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppService } from './app.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { RaycasterService } from 'app/raycaster.service';
import { PlayerGlobal } from 'app/player.global';
import { ObjectLoaderService } from './objectLoader.service';
import { SkillsService } from './skills/skills.service';

import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SlotComponent } from './inventory/slot/slot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { SkillsComponent } from './skills/skills.component';

import { ResourceHub } from './resource.hub';
@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    SlotComponent,
    LoginComponent,
    RegisterComponent,
    GameComponent,
    SkillsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  providers: [RaycasterService, RegisterService, LoginService, AppService, PlayerGlobal, SkillsService,
    ObjectLoaderService, ResourceHub],
  bootstrap: [AppComponent]
})
export class AppModule { }
