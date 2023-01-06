import { NgModule, isDevMode } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import {TodoInputComponent} from "./todo-input.component";
import {TodoListComponent} from "./todo-list.component";
import { TodoEffects } from './+state/todo.effects';
import {todosStateReducer} from "./+state/todo.reducer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TodoInputComponent,
    TodoListComponent,
    HttpClientModule,
    StoreModule.forRoot({core: todosStateReducer}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([TodoEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
