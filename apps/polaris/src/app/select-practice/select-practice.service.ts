import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import { SelectPracticeModel } from './select-practice-model';
import { PRACTICES } from './mock-select-practices';

@Injectable({
  providedIn: 'root',
})
export class SelectPracticeService {
  static nextCrisisId = 100;
  private crises$: BehaviorSubject<SelectPracticeModel[]> = new BehaviorSubject<SelectPracticeModel[]>(PRACTICES);

  constructor(private messageService: MessageService) { }

  getCrises() { return this.crises$; }

  getCrisis(id: number | string) {
    return this.getCrises().pipe(
      map(crises => crises.find(crisis => crisis.id === +id))
    );
  }

  addCrisis(name: string) {
    name = name.trim();
    if (name) {
      let crisis = { id: SelectPracticeService.nextCrisisId++, name };
      PRACTICES.push(crisis);
      this.crises$.next(PRACTICES);
    }
  }
}
