import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'convertFromG'
})
export class ConvertFromGPipe implements PipeTransform {
	transform(grams: number, to: string): number {
		switch(to) {
			case 'oz':
				return grams / 28.34952;
			case 'lb':
				return grams * 0.0022;
			case 'kg':
				return grams / 1000;
			default:
				return grams;
		}
	}
}

@Pipe({
	name: 'convertToG'
})
export class ConvertToGPipe implements PipeTransform {
	transform(units: number, from: string): number {
		switch(from) {
			case 'oz':
				return units * 28.34952;
			case 'lb':
				return units / 0.0022;
			case 'kg':
				return units * 1000;
			default:
				return units;
		}
	}
}
