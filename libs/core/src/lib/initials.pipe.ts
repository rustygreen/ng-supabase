import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(fullName: string | null | undefined, numChars: number = 2): string {
    if (!fullName) {
      return '';
    }

    return fullName
      .split(' ')
      .slice(0, numChars)
      .map((n) => n[0].toUpperCase())
      .join('');
  }
}
