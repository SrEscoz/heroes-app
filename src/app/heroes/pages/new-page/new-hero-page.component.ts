import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Hero, Publisher} from '../../interfaces/hero-response.interface';
import {HeroesService} from '../../services/heroes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs';

@Component({
	selector: 'app-new-page',
	templateUrl: './new-hero-page.component.html',
	styles: ``
})
export class NewHeroPageComponent implements OnInit {

	public editMode: boolean = false;

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

	constructor(private heroService: HeroesService,
	            private activateRoute: ActivatedRoute,
	            private router: Router) {
	}

	ngOnInit(): void {
		if (this.router.url.includes('edit')) {
			this.activateRoute.params
				.pipe(
					switchMap(({id}) => this.heroService.getHero(id))
				).subscribe(hero => {

				if (!hero)
					this.router.navigate(['/404']).then();

				this.heroFrom.reset(hero);
				this.editMode = true;

				return;
			});
		}
	}

	onSubmit(): void {
		if (this.heroFrom.invalid) {
			return;
		}

		// Si no tiene ID es uno nuevo
		if (!this.currentHero.id) {
			this.heroService.postHero(this.currentHero)
				.subscribe(hero => {
					// this.router.navigate([`/heroes/${hero!.id}`]).then();
					return;
				});
		}

		// Si tiene un ID es una actualización
		this.heroService.updateHero(this.currentHero)
			.subscribe(hero => {
				// this.router.navigate([`/heroes/${hero!.id}`]).then();
				return;
			});

	}

	get currentHero(): Hero {
		return this.heroFrom.value as Hero;
	}
}
