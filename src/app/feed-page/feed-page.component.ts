import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { FeedEntry } from '../model/feed-entry';
import {AngularFire,AngularFireModule, FirebaseListObservable} from 'angularfire2';
import { firebaseConfig } from '../../environments/firebase.config';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {

  private feedUrl: string = 'https%3A%2F%2Fwww.becompany.ch%2Fen%2Fblog%2Ffeed.xml';
  private feeds: Array<FeedEntry> = [];

   items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/stream');
    this.items.subscribe(console.log);
  }

  ngOnInit() {
  }


}
