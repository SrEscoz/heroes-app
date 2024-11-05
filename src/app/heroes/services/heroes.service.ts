import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero, HeroResponse} from '../interfaces/hero-response.interface';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HeroesService {

	private baseUrl = environment.baseUrl;

	constructor(private httpClient: HttpClient) {
	}

	public getHeroes(): Observable<Hero[]> {
		return this.httpClient.get<HeroResponse>(`${this.baseUrl}/heroes`)
			.pipe(
				map(response => response.content),
			);
	}
}
