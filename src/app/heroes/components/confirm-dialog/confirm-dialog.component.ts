import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Hero} from '../../interfaces/hero-response.interface';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styles: ``
})
export class ConfirmDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: Hero) {
	}

}
