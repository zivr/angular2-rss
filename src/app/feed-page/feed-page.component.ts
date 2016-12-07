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

  constructor(
    private feed: FeedService
  ) { }


  ngOnInit() {
    this.feed.getData(300).then((data: Array<FeedEntry>) => {
      data.forEach((obj) => {
        this.feeds.push(obj);
      });
    });
  }


}
