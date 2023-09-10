import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportComponent} from "./components/report/report.component";
import {MainPageComponent} from "./components/main-page/main-page.component";

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },

  {
  path: 'report',
  component: ReportComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
