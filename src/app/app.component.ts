import {Component} from '@angular/core';
import {ConvertFromGPipe, ConvertToGPipe} from './units.pipe';
import {LocalStorage} from 'webstorage-decorators';
import {MatDialog} from '@angular/material';
import {ViewComponents} from './viewComponents/viewComponents.component';
import {NewFormulaComponent} from './newFormula/newFormula.component';
import {DeleteComponent} from './delete/delete.component';
import {flatMap, map} from "rxjs/operators";
import {AppService} from "./app.service";
import {Formula} from "./formula";
import {AuthService} from "./auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginComponent} from "./login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  formula: Formula;
  formulas: Observable<Formula[]>;
  search = new BehaviorSubject<string>('');
  @LocalStorage({defaultValue: 'g'}) unit: string;

  _newTotal: number = 0;
  get newTotal() {
    return new ConvertFromGPipe().transform(this._newTotal, this.unit);
  }

  set newTotal(total) {
    this._newTotal = new ConvertToGPipe().transform(total, this.unit);
  }

  constructor(private dialog: MatDialog, private appService: AppService, public auth: AuthService) {
    this.formulas = this.auth.user.pipe(
      flatMap(user => this.appService.formulas.pipe(
        map(formulas => formulas.filter(formula => formula.approved || (user && user.admin)))
      )),
      flatMap(formulas => this.search.pipe(
        map(search => formulas.filter(formula => !search || formula.name.toLowerCase().indexOf(search.toLowerCase()) >= 0))
      ))
    );
  }

  approve(formula: Formula) {
    formula.ref.update({approved: true, approvedOn: new Date()});
  }

  cost() {
    if(this.formula['total']) return this.formula.components.reduce((acc, row) => acc + ((((row.quantity / this.formula['total']) * this._newTotal) / 1000) * row.component.price), 0);
  }

  async edit(formula: Formula) {
    this.formula = null;
    this.dialog.open(NewFormulaComponent, {data: formula});
  }

  delete(formula: Formula) {
    this.dialog.open(DeleteComponent, {data: formula}).afterClosed().subscribe(() => this.formula = null);
  }

  displayFormula(formula: Formula) {
    let ref = formula.ref;
    delete formula.ref;
    this.formula = JSON.parse(JSON.stringify(formula));
    this.formula.ref = ref;

    this.formula.components = this.formula.components.map(component => Object.assign(component, {component: this.appService.components.value.find(c => c.id == <any>component.component)}));
    this.formula['total'] = this.formula.components.reduce((acc, row) => acc + Math.round(row.quantity * 100) / 100, 0);
    this.newTotal = new ConvertFromGPipe().transform(this.formula['total'], this.unit);
  }

  newFormula() {
    this.dialog.open(NewFormulaComponent);
  }

  openComponents() {
    this.dialog.open(ViewComponents, {height: '500px'});
  }

  login() {
    this.dialog.open(LoginComponent);
  }
}
