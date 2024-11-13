import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {MaterialModule} from '../material/material.module';


@NgModule({
	declarations: [
		NotFoundPageComponent
	],
	imports: [
		CommonModule,
		MaterialModule
	],
	exports: [
		NotFoundPageComponent
	]
})
export class SharedModule {
}
