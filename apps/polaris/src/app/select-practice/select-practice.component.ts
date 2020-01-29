import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Router }     from '@angular/router';

import { SelectPracticeService }  from './select-practice.service';
import { SelectPracticeModel }         from './select-practice-model';
import { switchMap }      from 'rxjs/operators';

@Component({
  selector: 'pol-new-select-practice',
  templateUrl: './select-practice.component.html',
  styleUrls: ['./select-practice.component.css']
})
export class SelectPracticeComponent implements OnInit {
  public practices: SelectPracticeModel[];
  public filterPractices: SelectPracticeModel[];
  public selectedId: number;
  public searchText = '';

  constructor(
    private service: SelectPracticeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.selectedId = 2;
    this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.service.getCrises();
      })
    ).subscribe((location)=>{
      this.practices = this.filterPractices  = location;
    });
  }
  onSelect(){
    this.router.navigate(['/home']);
  }
  public searchPractices(searchText: string) {
    this.practices = this.filterPractices;
    if (searchText) {
        this.practices = this.practices.filter(practice =>
          practice.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }
}
}
