import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TinderSearchPageComponent } from './pages/tinder-search-page/tinder-search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AdPanelComponent } from './shared-components/ad-panel/ad-panel.component';
import { AdPanelListComponent } from './shared-components/ad-panel-list/ad-panel-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { UserEditorComponent } from './shared-components/user-editor/user-editor.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavouriteAdsPageComponent } from './pages/favourite-ads-page/favourite-ads-page.component';
import { UsersAdsPageComponent } from './pages/users-ads-page/users-ads-page.component';
import { HeaderPanelComponent } from './shared-components/header-panel/header-panel.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterFormPageComponent } from './pages/register-form-page/register-form-page.component';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { TinderResultPageComponent } from './pages/tinder-result-page/tinder-result-page.component';
import { NewAdvertComponent } from './pages/new-advert/new-advert.component';
import { ValidatorsService } from './services/validators.service';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { SearchSelectionComponent } from './pages/search-page/search-selection/search-selection.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { BriefAdvComponent } from './shared-components/brief-adv/brief-adv.component';
import { DetailAdvComponent } from './pages/detail-adv/detail-adv.component';
import { ExpansionPanelComponent } from './shared-components/expansion-panel/expansion-panel.component';
import { TinderHowToComponent } from './pages/tinder-how-to/tinder-how-to.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchPageComponent,
    TinderSearchPageComponent,
    ProfilePageComponent,
    AdPanelComponent,
    AdPanelListComponent,
    UserEditorComponent,
    EditUserPageComponent,
    FavouriteAdsPageComponent,
    UsersAdsPageComponent,
    HeaderPanelComponent,
    LandingPageComponent,
    RegisterFormPageComponent,
    TinderResultPageComponent,
    NewAdvertComponent,
    TermsOfServiceComponent,
    SearchSelectionComponent,
    SearchResultComponent,
    BriefAdvComponent,
    DetailAdvComponent,
    ExpansionPanelComponent,
    TinderHowToComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule
  ],
  providers: [ValidatorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
