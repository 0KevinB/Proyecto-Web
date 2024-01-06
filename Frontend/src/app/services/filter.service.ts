// filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject = new BehaviorSubject<string>('');
  filter$ = this.filterSubject.asObservable();

  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  getFilter(): string {
    return this.filterSubject.value;
  }
}
