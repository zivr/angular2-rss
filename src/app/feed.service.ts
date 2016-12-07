import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Feed } from './model/feed';
import {AngularFire,AngularFireModule, FirebaseListObservable} from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';


@Injectable()
export class FeedService {
  
  readonly dbName = 'newsDB';

  items: FirebaseListObservable<any[]>;
  private IndexDb: IDBFactory; 
  private db: IDBDatabase;
  
  constructor(af: AngularFire,private http: Http) {
    this.items = af.database.list('/stream_2');
    this.IndexDb = window.indexedDB;
    this.createDB();
    this.items.subscribe(this.onDataRecieved.bind(this));
  }
  
  private createDB(){
    var req: IDBOpenDBRequest;
    req = this.IndexDb.open(this.dbName);
    req.onupgradeneeded = (e: any) => {
      var db = e.target.result;
      db.createObjectStore('feeds', { keyPath: 'id'});
    }
  }
  private updateDataInDB(data: Array<any>) {
    var req: IDBOpenDBRequest;
    req = this.IndexDb.open(this.dbName);
    req.onsuccess = (e: any) => {
      this.db = e.target.result;
      var tbl: IDBObjectStore = this.db.transaction('feeds','readwrite').objectStore('feeds');
      data.forEach(obj => {
        tbl.add(obj);
      });
    }
  }

  private onDataRecieved(data: any) {
    var myFeed: any = data.map((obj) => {
      return {
        id: obj.$key,
        title: obj.title,
        url: obj.url,
        author: obj.author,
        text: obj.text,
        published: obj.published,
        country: obj.thread.country,
        site: obj.thread.site
      }
    });
    this.updateDataInDB(myFeed);
  }

  public getData(amount: number) {
    return {};
  }
  // getFeedContent(url: string): Observable<Feed> {
  //   return this.http.get(this.rssToJsonServiceBaseUrl + url)
  //           .map(this.extractFeeds)
  //           .catch(this.handleError);
  // }

  // private extractFeeds(res: Response): Feed {
  //   let feed = res.json();
  //   return feed || { };
  // }

  // private handleError (error: any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   // We'd also dig deeper into the error to get a better message
  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }
}
