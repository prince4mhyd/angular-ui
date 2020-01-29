import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from './../features/select-patient/patients.service';
import { MatSidenav } from '@angular/material/sidenav';
import { PatientViewModel } from '../features/select-patient/models/patientviewmodel';
import { MatDialog } from '@angular/material/dialog';
import { LiveChatDialogComponent } from 'app/features/live-chat/live-chat-dialog-component';

@Component({
  selector: 'pol-new-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  public patients: any;
  public isDashboard = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PatientsService,
    private elementRef: ElementRef,
    private dialog: MatDialog,
  ) { }
  public get getPatientAvatar(): string {
    // if (this.patients && this.patients.dnFirstName) {
    //   return this.patients.dnFirstName.split(' ').length > 1 ?
    //     this.patients.dnFirstName.split(' ')[0].charAt(0).concat(this.patients.dnLastName.split(' ')[1].charAt(0)) :
    //     this.patients.dnFirstName.split(' ')[0].charAt(0);
    // }
    if (this.patients.resource.name[0].given) {
        if(this.patients.resource.name[0].given[0] && this.patients.resource.name[0].given[1]) {
            return this.patients.resource.name[0].given[0].charAt(0).concat(this.patients.resource.name[0].given[1].charAt(0));
        } else {
            return this.patients.resource.name[0].given[0].charAt(0);
        }
    }
  }
  ngOnInit() {
    this.service.selectedpatient.subscribe((patient) => {
      this.patients = patient;
      if (this.patients) {
        this.isDashboard = false;
      }
    });
  }
  
  public redirectToDashboard() {
    this.isDashboard = true;
    this.router.navigate(['/home']);
  }
  public redirectToPatient() {
    this.isDashboard = false;
    this.router.navigate(['/home/patients']);
  }
  public checkPatient() {
    if (this.patients) {
      this.redirectToPatient();
    } else {
      this.redirectToDashboard();
    }
  }
  public close() {
    this.sidenav.close();
  }

  public toggle() {
    this.sidenav.toggle();
  }
  @HostListener('document:click', ['$event.target'])
  public backdropClick(event) {
    const clickedInside = this.elementRef.nativeElement.contains(event);
    if (!clickedInside && !event.classList.contains("mat-option-text")) {
      this.sidenav.close();
    }
    else if (clickedInside && event.firstChild && event.firstChild.classList && event.firstChild.classList.contains("sticky-body")) {
      this.sidenav.close();
    }
  }

  public onVidyo() {
    window.open("https://cloud.vidyo.com/login-widget", "_blank");
  }

  public togglePopover(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }

  public onLiveChatClick() {
   const dialogRef = this.dialog.open(LiveChatDialogComponent, {
      height: '300px',
      width: '500px',
      position: { 
        bottom: '1%', 
        right: '1%',
      },
    });
  }
  public getPatientName(resource) {
    if (resource && resource.name && resource.name.length) {
        return resource.name[0].given.join(', ');
    }
}
}


