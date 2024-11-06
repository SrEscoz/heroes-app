import {Component, OnInit} from '@angular/core';
import {Hero} from '../../interfaces/hero-response.interface';
import {HeroesService} from '../../services/heroes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs';

@Component({
	selector: 'app-hero-page',
	templateUrl: './hero-page.component.html',
	styles: ``
})
export class HeroPageComponent implements OnInit {

	public hero?: Hero;

	constructor(private heroService: HeroesService,
	            private activateRoute: ActivatedRoute,
	            private router: Router) {
	}

	ngOnInit(): void {
		this.activateRoute.params
			.pipe(
				switchMap(({id}) => this.heroService.getHero(id))
			)
			.subscribe(hero => {
				if (!hero) {
					return this.router.navigate(['/heroes/list']);
				}

				this.hero = hero;
				return;
			});

	}

}
