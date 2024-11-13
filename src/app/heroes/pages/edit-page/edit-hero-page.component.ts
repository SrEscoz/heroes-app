import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Hero, Publisher} from '../../interfaces/hero-response.interface';
import {HeroesService} from '../../services/heroes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-new-page',
	templateUrl: './edit-hero-page.component.html',
	styles: ``
})
export class EditHeroPageComponent implements OnInit {

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

	private hero?: Hero;

	constructor(private heroService: HeroesService,
	            private activateRoute: ActivatedRoute,
	            private router: Router,
	            private snackBar: MatSnackBar,
	            private dialog: MatDialog) {
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
				this.hero = hero;
				this.editMode = true;
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
					this.router.navigate(['/heroes/edit', hero?.id]).then();
					this.showSnackBar(`El héroe ${hero?.superhero} fue agregado exitosamente`);
				});

			return;
		}

		// Si tiene un ID es una actualización
		this.heroService.updateHero(this.currentHero)
			.subscribe(hero => {
				if (!hero) {
					this.showSnackBar('Error al actualizar el héroe');
				}

				this.showSnackBar(`El héroe ${hero?.superhero} fue editado exitosamente`);
			});

		return;
	}

	onDelete() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: this.heroFrom.value
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.heroService.deleteHero(this.currentHero.id)
					.subscribe(value => {
						if (value) {
							this.router.navigate(['/heroes']).then();
							this.showSnackBar('Heroe elimiado exitosamente');
						}
					});
			}
		});
	}


	showSnackBar(message: string): void {
		this.snackBar.open(message, 'Ok', {

			duration: 2500,
		});
	}

	clearForm(): void {
		if (this.hero) this.heroFrom.reset(this.hero);
		else this.heroFrom.reset();
	}

	get currentHero(): Hero {
		return this.heroFrom.value as Hero;
	}
}
