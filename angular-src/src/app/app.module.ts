import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';


import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { CoursesService } from './services/courses.service';
import { QuestionService } from './services/question.service';

import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AddSessionComponent } from './components/add-session/add-session.component';
import { QuestionsComponent } from './components/questions/questions.component';


@NgModule({
    declarations: [
        AppComponent,
        CoursesComponent,
        AppRoutingModule.components,
        LoginComponent,
        RegisterComponent,
        NavComponent,
        DashboardComponent,
        AddCourseComponent,
        HeaderComponent,
        HomeComponent,
        AddSessionComponent,
        QuestionsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        AppRoutingModule,
        FlashMessagesModule,
        ReactiveFormsModule,

    ],
    providers: [
        ValidateService,
        FlashMessagesService,
        AuthService,
        QuestionService,
        CoursesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
