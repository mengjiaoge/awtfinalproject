import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddSessionComponent } from './components/add-session/add-session.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'courses/add', component: AddCourseComponent },
    { path: 'questions',component: QuestionsComponent},
    { path: 'courses/:id', component: CoursesComponent },
    { path: 'sessions/add/:id', component: AddSessionComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    static components = [
        DashboardComponent,
        CoursesComponent,
        LoginComponent,
        QuestionsComponent,
        AddCourseComponent,
        HomeComponent
    ];
}

