import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero, HeroResponse} from '../interfaces/hero-response.interface';
import {catchError, map, Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HeroesService {

	private baseUrl = environment.baseUrl;

	constructor(private httpClient: HttpClient) {}

	public getHeroes(): Observable<Hero[]> {
		return this.httpClient.get<HeroResponse>(`${this.baseUrl}/heroes`)
			.pipe(
				map(response => response.content),
			);
	}

	public getHero(id: string): Observable<Hero | undefined> {
		return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
			.pipe(
				catchError(() => of(undefined))
			);
	}

	public postHero(hero: Hero): Observable<Hero | undefined> {
		return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero)
			.pipe(
				catchError(() => of(undefined))
			);
	}

	public updateHero(hero: Hero): Observable<Hero | undefined> {
		return this.httpClient.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
			.pipe(
				catchError(() => of(undefined))
			);
	}

	public deleteHero(id: string): Observable<boolean> {
		return this.httpClient.delete<boolean>(`${this.baseUrl}/heroes/${id}`)
			.pipe(
				catchError(() => of(false)),
				map(() => true)
			);
	}

	public getSuggestions(search: string): Observable<Hero[]> {
		return this.httpClient.get<HeroResponse>(`${this.baseUrl}/heroes?hero_name=${search}&page_size=6`)
			.pipe(
				map(response => response.content)
			);
	}
}
