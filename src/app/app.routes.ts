import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
//import { HomeComponent } from './home';
//import { AboutComponent } from './about';
//import { NoContentComponent } from './no-content';


export const ROUTES: Routes = [
  { path: '',      component: AppComponent },
  { path: 'home',  component: AppComponent },
  //{ path: '**',    component: NoContentComponent },
];
