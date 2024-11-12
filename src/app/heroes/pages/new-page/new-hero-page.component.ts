import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Publisher} from '../../interfaces/hero-response.interface';

@Component({
	selector: 'app-new-page',
	templateUrl: './new-hero-page.component.html',
	styles: ``
})
export class NewHeroPageComponent {

	public heroFrom = new FormGroup({
		id: new FormControl<string>(''),
		superhero: new FormControl<string>('', {nonNullable: true}),
		publisher: new FormControl<Publisher>(Publisher.DCComics),
		alterEgo: new FormControl<string>(''),
		firstApparence: new FormControl<string>(''),
		characters: new FormControl<string>(''),
		altImage: new FormControl<string>(''),
	});

	public publishers: string[] = ['DC Comics', 'Marvel Comics'];

	onSubmit(): void {

		console.log({valid: this.heroFrom.valid, value: this.heroFrom.value});
	}

}
