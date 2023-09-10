import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PersonalWorkTaskComponent } from './components/personal-work-task/personal-work-task.component';
import { ReportComponent } from './components/report/report.component';
import { ReportTaskComponent } from './components/report-task/report-task.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskItemComponent,
    AddTaskComponent,
    HeaderComponent,
    ButtonComponent,
    EditTaskComponent,
    FooterComponent,
    SearchBarComponent,
    PersonalWorkTaskComponent,
    ReportComponent,
    ReportTaskComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
