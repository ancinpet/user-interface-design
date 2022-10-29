import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { FavouriteAdsPageComponent } from './pages/favourite-ads-page/favourite-ads-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NewAdvertComponent } from './pages/new-advert/new-advert.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterFormPageComponent } from './pages/register-form-page/register-form-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TinderResultPageComponent } from './pages/tinder-result-page/tinder-result-page.component';
import { TinderSearchPageComponent } from './pages/tinder-search-page/tinder-search-page.component';
import { UsersAdsPageComponent } from './pages/users-ads-page/users-ads-page.component';
import { AuthenticatedUserGuardService as AuthenticatedUsers } from './services/authenticated-guard.service';
import { NotAuthenticatedUserGuardService as NotAuthenticatedUsers } from './services/not-authenticated-guard.service';
import {SearchResultComponent} from './pages/search-result/search-result.component';
import {DetailAdvComponent} from './pages/detail-adv/detail-adv.component';


const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthenticatedUsers]},

  {path: 'landing-page', component: LandingPageComponent, canActivate: [NotAuthenticatedUsers]},
  {path: 'register', component: RegisterFormPageComponent, canActivate: [NotAuthenticatedUsers]},

  {path: 'search', component: SearchPageComponent},
  {path: 'search-result', component: SearchResultComponent},
  {path: 'search-detail', component: DetailAdvComponent},

  {path: 'tinder-search', component: TinderSearchPageComponent, canActivate: [AuthenticatedUsers]},
  {path: 'tinder-result', component: TinderResultPageComponent, canActivate: [AuthenticatedUsers]},
  {path: 'new-advert', component: NewAdvertComponent, canActivate: [AuthenticatedUsers]},

  {path: 'profile', redirectTo: 'user/0', pathMatch: 'full'},
  {path: 'user/:id', component: ProfilePageComponent, canActivate: [AuthenticatedUsers]},
  {path: 'user/:id/edit', component: EditUserPageComponent, canActivate: [AuthenticatedUsers]},
  {path: 'user/:id/favorites', component: FavouriteAdsPageComponent, canActivate: [AuthenticatedUsers]},
  {path: 'user/:id/adverts', component: UsersAdsPageComponent, canActivate: [AuthenticatedUsers]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
