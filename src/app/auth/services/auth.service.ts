import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/user.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private baseUrl = environment.baseUrl;
	private user?: User;

	constructor(private http: HttpClient) {}
}
