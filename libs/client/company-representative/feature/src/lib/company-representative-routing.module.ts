import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyRepresentativePageComponent } from './company-representative-page/company-representative-page.component';
import { CompanyRepresentativeMockLoginPageComponent } from './company-representative-mock-login-page/company-representative-mock-login-page.component';
import { CompanyRepresentativeEditPageComponent } from './company-representative-edit-page/company-representative-edit-page.component';
import { CompanyRepresentativeMockStudentExplorePageComponent } from './company-representative-mock-student-explore-page/company-representative-mock-student-explore-page.component';
// import * as path from 'path';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: CompanyRepresentativeMockLoginPageComponent,
      },
      {
        path: 'home-page',
        component: CompanyRepresentativePageComponent,
      },
      {
        path: 'edit-page',
        component: CompanyRepresentativeEditPageComponent,
      },
      {
        path: 'student-explore',
        component: CompanyRepresentativeMockStudentExplorePageComponent,
      },
    ]),
  ],
})
export class CompanyRepresentativeRoutingModule { }
