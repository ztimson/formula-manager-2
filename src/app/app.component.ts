import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {LocalStorage} from 'webstorage-decorators';
import {AppService} from "./services/app.service";
import {AuthService} from "./services/auth.service";
import {DeleteComponent} from './components/delete/delete.component';
import {Formula} from "./models/formula";
import {LoginComponent} from "./components/login/login.component";
import {NewFormulaComponent} from './components/newFormula/newFormula.component';
import {ConvertFromGPipe, ConvertToGPipe} from './pipes/units.pipe';
import {ViewComponents} from './components/viewComponents/viewComponents.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	formula?: Formula | null;
	formulas!: Observable<Formula[]>;
	search = new BehaviorSubject<string>('');

	@LocalStorage({defaultValue: 'g'}) unit!: string;

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
		return !this.formula?.total ? 0 :
			this.formula.components.reduce((acc, row) => acc + ((((row.quantity / (<number>this.formula?.total)) * this._newTotal) / 1000) * row.component.price), 0);
	}

	async edit(formula: Formula) {
		this.formula = null;
		this.dialog.open(NewFormulaComponent, {data: formula});
	}

	delete(formula: Formula) {
		this.dialog.open(DeleteComponent, {data: formula}).afterClosed().subscribe(() => this.formula = null);
	}

	displayFormula(formula: Formula) {
		const copy = JSON.parse(JSON.stringify({...formula, ref: undefined}))
		this.formula = {
			ref: formula.ref,
			...copy,
			components: copy.components.map((comp: any) => Object.assign(comp, {component: this.appService.components.value.find(c => c.id == comp.component)})),
			total: copy.components.reduce((acc: number, row: any) => acc + (Math.round(row.quantity * 100) / 100), 0)
		};
		this.newTotal = new ConvertFromGPipe().transform(this.formula?.total || 0, this.unit);
	}

	newFormula() {
		this.dialog.open(NewFormulaComponent);
	}

	openComponents() {
		this.dialog.open(ViewComponents, {height: '500px'});
	}

	searchFor(target: any) {
		this.search.next(target?.value);
	}

	login() {
		this.dialog.open(LoginComponent);
	}
}
