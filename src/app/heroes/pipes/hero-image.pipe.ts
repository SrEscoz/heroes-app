import {Pipe, PipeTransform} from '@angular/core';
import {Hero} from '../interfaces/hero-response.interface';

@Pipe({
	name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

	transform(hero: Hero): string {
		if (!hero.id && !hero.altImage)
			return 'assets/no-image.png';

		if (hero.altImage)
			return hero.altImage;

		return `assets/heroes/${hero.id}.jpg`;
	}

}
