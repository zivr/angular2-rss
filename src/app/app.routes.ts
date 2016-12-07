import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'
import { FeedPageComponent } from './feed-page/feed-page.component';
//import { NoContentComponent } from './no-content';


export const ROUTES: Routes = [
  { path: '',      component: HomePageComponent },
  { path: 'home',  component: HomePageComponent },
  { path: 'feed',  component: FeedPageComponent },
  //{ path: '**',    component: NoContentComponent },
];
