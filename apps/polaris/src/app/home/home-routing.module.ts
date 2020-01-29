import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }           from './home.component';

import { AuthGuard }                from '../auth/auth.guard';
import { PatientsSearchComponent } from './../features/patients-search/patients-search.component';
import { PatientDetailsComponent } from '../features/select-patient/patient-details/patient-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'patients', component: PatientDetailsComponent },
          { path: 'patients/:id', component: PatientDetailsComponent },
          { path: '', component: PatientsSearchComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}
