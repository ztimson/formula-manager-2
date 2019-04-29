import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DeleteComponent} from '../delete/delete.component';
import {NewComponentComponent} from '../newComponent/newComponent.component';
import {AppService} from "../app.service";

@Component({
  selector: '',
  templateUrl: './viewComponents.component.html'
})
export class ViewComponents {
  constructor(private dialog: MatDialog, public appService: AppService) {}

  createComponent(component?) {
    if (component) {
      this.dialog.open(NewComponentComponent, {data: component});
    } else {
      this.dialog.open(NewComponentComponent);
    }
  }

  delete(component) {
    this.dialog.open(DeleteComponent, {data: component});
  }
}
