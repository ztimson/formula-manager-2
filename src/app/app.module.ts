import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConvertFromGPipe, ConvertToGPipe} from "./units.pipe";
import {ScalePipe} from "./scale.pipe";
import {NgxElectronModule} from "ngx-electron";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule, FirestoreSettingsToken} from "@angular/fire/firestore";
import {environment} from "../environments/environment";
import {NewComponentComponent} from "./newComponent/newComponent.component";
import {NewFormulaComponent} from "./newFormula/newFormula.component";
import {DeleteComponent} from "./delete/delete.component";
import {ViewComponents} from "./viewComponents/viewComponents.component";
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule,
  MatSidenavModule, MatToolbarModule
} from "@angular/material";
import {LoginComponent} from "./login/login.component";
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    AppComponent,
    ConvertFromGPipe,
    ConvertToGPipe,
    DeleteComponent,
    LoginComponent,
    NewComponentComponent,
    NewFormulaComponent,
    ScalePipe,
    ViewComponents
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    NgxElectronModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  providers: [{provide: FirestoreSettingsToken, useValue: {}}],
  entryComponents: [
    DeleteComponent,
    LoginComponent,
    NewComponentComponent,
    NewFormulaComponent,
    ViewComponents
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
