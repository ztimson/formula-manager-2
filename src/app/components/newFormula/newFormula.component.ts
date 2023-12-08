import {Component, Inject} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LocalStorage} from 'webstorage-decorators';
import {AppService} from "../../services/app.service";
import {ConvertToGPipe} from '../../pipes/units.pipe';
import {Component as Comp} from '../../models/component';

@Component({
	selector: 'new-formula',
	templateUrl: './newFormula.component.html'
})
export class NewFormulaComponent {
	name?: string | null;
	amount?: number | null;
	approved: boolean = false;
	component?: string | null;
	components: { component: Comp; quantity: number }[] = [];
	componentsList: Comp[] = [];
	exists: boolean = false;

	@LocalStorage({defaultValue: 'kg', fieldName: 'newFormulaUnit'}) unit!: string;

	constructor(
		private dialogRef: MatDialogRef<NewFormulaComponent>,
		private db: AngularFirestore,
		private appService: AppService,
		@Inject(MAT_DIALOG_DATA) public data
	) {
		this.appService.components.subscribe(rows => (this.componentsList = rows));

		if(this.data) {
			this.name = this.data.name;
			this.approved = this.data.approved;
			this.components = this.data.components;
		}
	}

	add() {
		let component = this.componentsList.find(row => row.name == this.component);
		let amount = new ConvertToGPipe().transform(Number(this.amount), this.unit);
		this.components.push({component: <Comp>component, quantity: amount});
		this.component = null;
		this.amount = null;
	}

	checkExists(target: any) {
		this.appService.formulas.subscribe(formulas => {
			this.exists = !!formulas.find(f => f.id == target.value);
		});
	}

	remove(i) {
		this.components.splice(i, 1);
	}

	submit() {
		let newFormula = {
			name: this.name,
			approved: this.approved,
			components: this.components.map((row: any) => ({component: row.component.id, quantity: row.quantity})),
			createdOn: new Date()
		};

		if(!this.data) {
			this.db.collection('formulas').doc(<string>this.name).set(newFormula).then(ignore => this.dialogRef.close(newFormula));
		} else {
			this.data.ref.update(newFormula).then(ignore => this.dialogRef.close(newFormula));
		}
	}

	total() {
		return this.components.reduce((acc, row) => acc + row.quantity, 0);
	}
}
