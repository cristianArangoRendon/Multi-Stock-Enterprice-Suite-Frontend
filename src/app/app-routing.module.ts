import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalErrorComponent } from './_layout/common/internal-error/internal-error.component';
import { NotFoundComponent } from './_layout/common/not-found/not-found.component';
import { DashboardComponent } from './presentation/pages/private/dashboard/dashboard.component';
import { LoginComponent } from './presentation/pages/private/login/login.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: DashboardComponent},
    {path: 'home', component: DashboardComponent},
    {path: 'error-500', component: InternalErrorComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
