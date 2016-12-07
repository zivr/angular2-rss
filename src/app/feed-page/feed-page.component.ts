import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { FeedEntry } from '../model/feed-entry';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})


export class FeedPageComponent implements OnInit {

  private feedUrl: string = 'https%3A%2F%2Fwww.becompany.ch%2Fen%2Fblog%2Ffeed.xml';
  private feeds: Array<FeedEntry> = [];

  constructor(
    private feed: FeedService
  ) { }


  ngOnInit() {
    this.feed.getData(300);
  }


}
