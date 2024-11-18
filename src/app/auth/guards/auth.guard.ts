import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	CanMatchFn,
	Route, Router,
	RouterStateSnapshot,
	UrlSegment
} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map, Observable, tap} from 'rxjs';

export const privateMatchGuard: CanMatchFn = (route: Route, segment: UrlSegment[]) => {
	return checkPrivateAccess();
};

export const publicMatchGuard: CanMatchFn = (route: Route, segment: UrlSegment[]) => {
	return checkPublicAccess();
};

export const privateActiveGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return checkPrivateAccess();
};

export const publicActiveGuard: CanMatchFn = (route: Route, segment: UrlSegment[]) => {
	return checkPublicAccess();
};

const checkPrivateAccess = (): Observable<boolean> => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.checkAuth()
		.pipe(
			tap(isAuthenticated => {
				if (!isAuthenticated) {
					router.navigate(['/auth/login']).then();
				}
			})
		);
};

const checkPublicAccess = (): Observable<boolean> => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.checkAuth()
		.pipe(
			tap(isAuthenticated => {
				if (isAuthenticated) {
					router.navigate(['./']).then();
				}
			}),
			map(isAuthenticated => !isAuthenticated)
		);
};
