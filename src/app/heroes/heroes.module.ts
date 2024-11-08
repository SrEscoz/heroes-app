import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeroesRoutingModule} from './heroes-routing.module';
import {HeroPageComponent} from './pages/hero-page/hero-page.component';
import {LayoutPageComponent} from './pages/layout-page/layout-page.component';
import {ListPageComponent} from './pages/list-page/list-page.component';
import {NewHeroPageComponent} from './pages/new-page/new-hero-page.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {MaterialModule} from '../material/material.module';
import {HeroCardComponent} from './components/hero-card/hero-card.component';
import {HeroImagePipe} from './pipes/hero-image.pipe';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
	declarations: [
		HeroPageComponent,
		LayoutPageComponent,
		ListPageComponent,
		NewHeroPageComponent,
		SearchPageComponent,
		HeroCardComponent,
		HeroImagePipe
	],
	imports: [
		CommonModule,
		HeroesRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
	]
})
export class HeroesModule {
}
