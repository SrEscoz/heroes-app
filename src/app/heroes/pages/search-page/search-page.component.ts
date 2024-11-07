import {Component} from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {Hero} from '../../interfaces/hero-response.interface';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styles: ``
})
export class SearchPageComponent {

	public searchInput: FormControl = new FormControl('');
	public heroes: Hero[] = [];
	public selectedHero?: Hero;

	constructor(private heroService: HeroesService) {
	}

	performSearch(): void {
		this.heroService.getSuggestions(this.searchInput.value)
			.subscribe(heroes => this.heroes = heroes);
	}

	onSelectedOption(event: MatAutocompleteSelectedEvent): void {
		if (!event.option.value) {
			this.selectedHero = undefined;
			return;
		}

		const hero: Hero = event.option.value;
		this.searchInput.setValue(hero.superhero);
		this.selectedHero = hero;
	}
}
