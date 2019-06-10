import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignService } from './shared/campaign.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    CampaignListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [CampaignService],
  bootstrap: [AppComponent]
})
export class AppModule { }
