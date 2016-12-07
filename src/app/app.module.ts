import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Material design.
import { MdCardModule } from '@angular2-material/card';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';

import { AppComponent } from './app.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FeedService } from './feed.service';
import { StripHtmlTagsPipe } from './pipe/strip-html-tags.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

import { ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    FeedCardComponent,
    StripHtmlTagsPipe,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [FeedService, MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
