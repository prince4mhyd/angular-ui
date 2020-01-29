import { Component, OnInit, OnDestroy } from '@angular/core';
import { CareTeamFacade } from '../care-team/state/care-team.facade';
import { PatientCareTeam, SpecialtyTypes, Providers } from '../care-team/models/care-team.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'pol-new-chart-browser',
    templateUrl: 'chart-browser.component.html',
    styleUrls: ['./chart-browser.component.css']
})
export class ChartBrowserComponent implements OnInit, OnDestroy {

    public notesCount: number;
    public careTeams: PatientCareTeam[];
    private ngUnsubscribe: Subject<any> = new Subject();
    public careTeamCount: number;

    constructor( private careTeamFacade: CareTeamFacade) {}

    public ngOnInit() {
        this.careTeamFacade.getCareTeams().pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
            if(value){
                this.careTeams = value;
                this.careTeamCount = value.length;
            }
        });
    }

    public stickyNotesCount(count): void {
        this.notesCount = count;
    }
    
    public getSpecialty(specialtyId): string {
        const specialtyName = SpecialtyTypes.find(data => data.id === specialtyId).value;
        return specialtyName;
    }
    public getProviderName(providerId): string {
        const provider = Providers.find(data => data.id === providerId).value
        return provider;
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}