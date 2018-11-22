import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ActionBarComponent, DrawerComponent } from './mobile/component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { GameFilterPipe } from './pipe/game-filter.pipe';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { NativeScriptUIAutoCompleteTextViewModule } from 'nativescript-ui-autocomplete/angular';

@NgModule({
  declarations: [
    ActionBarComponent,
    DrawerComponent,
    GameFilterPipe
  ],
  imports: [
    CommonModule,

    // http client
    HttpClientModule,
    // Forms
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,       // for share counts
    NativeScriptCommonModule,


    NativeScriptFormsModule,
    ReactiveFormsModule,
    TNSCheckBoxModule,
    NativeScriptUIAutoCompleteTextViewModule
  ],
  exports: [
    CommonModule, HttpClientModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    TNSCheckBoxModule,
    NativeScriptUIAutoCompleteTextViewModule,
    HttpClientModule,
    ActionBarComponent,
    DrawerComponent,
    GameFilterPipe]
})
export class SharedModule { }
