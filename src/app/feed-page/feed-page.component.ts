import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { FeedEntry } from '../model/feed-entry';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})


export class FeedPageComponent implements OnInit {

  private feeds: Array<FeedEntry> = [];
  private savedData: Array<FeedEntry> = [];
  private runningThread: any;

  constructor(
    private feed: FeedService
  ) { }


  ngOnInit() {
    this.feed.syncData(30, (data: Array<FeedEntry>) => {
      data.forEach((obj) => {
        this.savedData.push(obj);
      });
      clearTimeout(this.runningThread);
      this.runningThread = setTimeout(this.updateSavedData.bind(this), 1000);
    });
  }

  private updateSavedData(){
    this.savedData.forEach((obj) => {
      this.feeds.push(obj);
    });
    this.savedData.length = 0;
  }


}
