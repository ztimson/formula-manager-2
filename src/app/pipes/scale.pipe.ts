import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'scale'
})
export class ScalePipe implements PipeTransform {
    transform(quantity: number, total: number = 1, newTotal: number = 1): number {
        return quantity / total * newTotal;
	}
}
