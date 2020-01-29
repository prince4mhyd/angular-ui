import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';

import { AuthGuard }                          from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { SelectPracticeComponent } from './select-practice/select-practice.component';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'select-practice',
    component:SelectPracticeComponent,
    canActivate: [AuthGuard],
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
