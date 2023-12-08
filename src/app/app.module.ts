import {ScrollingModule} from "@angular/cdk/scrolling";
import {NgModule} from '@angular/core';
import {provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from "@angular/fire/auth";
import {FIREBASE_OPTIONS} from '@angular/fire/compat';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from "../environments/environment";
import {AppComponent} from './app.component';
import {DeleteComponent} from "./components/delete/delete.component";
import {LoginComponent} from "./components/login/login.component";
import {NewComponentComponent} from "./components/newComponent/newComponent.component";
import {NewFormulaComponent} from "./components/newFormula/newFormula.component";
import {ScalePipe} from "./pipes/scale.pipe";
import {ConvertFromGPipe, ConvertToGPipe} from "./pipes/units.pipe";
import {ViewComponents} from "./components/viewComponents/viewComponents.component";
import initializeApp = firebase.initializeApp;
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
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
		ReactiveFormsModule,
		ScrollingModule
	],
	providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
	bootstrap: [AppComponent]
})
export class AppModule {}
