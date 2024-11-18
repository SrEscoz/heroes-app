import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/user.interface';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {resolve} from '@angular/compiler-cli';
import {error} from '@angular/compiler-cli/src/transformers/util';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private baseUrl = environment.baseUrl;
	private user?: User;

	constructor(private http: HttpClient) {}

	login(email: string, password: string): Observable<User> {
		return this.http.get<User>(`${this.baseUrl}/users/1`)
			.pipe(
				tap(response => this.user = response),
				tap(response => localStorage.setItem('token', response.id.toString()))
			);
	}

	logout(): void {
		this.user = undefined;
		localStorage.removeItem('token');
	}

	checkAuth(): Observable<boolean> {
		if (!localStorage.getItem('token')) {
			return of(false);
		}

		const token = localStorage.getItem('token');

		return this.http.get<User>(`${this.baseUrl}/users/${token}`)
			.pipe(
				tap(response => this.user = response),
				map(() => true),
				catchError(() => of(false))
			);
	}

	get currentUser(): User | undefined {
		if (!this.user)
			return undefined;

		return structuredClone(this.user);
	}
}
