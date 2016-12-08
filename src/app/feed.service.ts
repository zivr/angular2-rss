import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Feed } from './model/feed';
import { FeedEntry } from './model/feed-entry';
import {AngularFire,AngularFireModule, FirebaseListObservable, FirebaseRef} from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';


@Injectable()
export class FeedService {

    readonly
    dbName = 'newsRssDB';

    items:FirebaseListObservable<any[]>;
    private listRef;
    private listenres : Array<any>;

    private IndexDb:IDBFactory;
    private db:IDBDatabase;

    constructor(af:AngularFire, @Inject(FirebaseRef) private firebase) {
        this.listRef = firebase.database().ref('/stream_2');
        this.listRef.on('child_added', this.onDataRecieved.bind(this));
        //this.items = af.database.list('/stream_2', {
        //  query: {
        //    limitToLast: 15
        //  }
        //});
        this.IndexDb = window.indexedDB;
        this.listenres = [];
        this.createDB();
        //this.items.subscribe(this.onDataRecieved.bind(this));
    }

    private createDB() {
        var req:IDBOpenDBRequest;
        req = this.IndexDb.open(this.dbName);
        req.onupgradeneeded = (e:any) => {
            var db = e.target.result;
            db.createObjectStore('feeds', {keyPath: 'id'});
        }
    }

    private updateDataInDB(data:Array<any>) {
        var req:IDBOpenDBRequest;
        req = this.IndexDb.open(this.dbName);
        req.onsuccess = (e:any) => {
            this.db = e.target.result;
            var tbl:IDBObjectStore = this.db.transaction('feeds', 'readwrite').objectStore('feeds');
            data.forEach(obj => {
                if (typeof (obj.id) === 'string') {
                    tbl.put(obj);
                }
            });
        }
    }

    private onDataRecieved(snapshot:any) {
        var data:any = snapshot.val();
        var myData: FeedEntry = {
            id: data.uuid,
            title: data.title,
            url: data.url,
            author: data.author,
            text: data.text,
            published: data.published,
            country: data.thread.country,
            site: data.thread.site
        };
        this.updateDataInDB([myData]);
        this.listenres.forEach((listener) => {
           listener([myData]) ;
        });

        //var myFeed: any = data.map((obj : any) => {
        //  return {
        //    id: obj.$key,
        //    title: obj.title,
        //    url: obj.url,
        //    author: obj.author,
        //    text: obj.text,
        //    published: obj.published,
        //    country: obj.thread.country,
        //    site: obj.thread.site
        //  }
        //});
        //this.updateDataInDB(myFeed);
    }

    private getData(amount:number) {
        return new Promise((resolve, reject) => {
            var req:IDBOpenDBRequest;
            req = this.IndexDb.open(this.dbName);
            req.onsuccess = (e:any) => {
                this.db = e.target.result;
                var tbl:any = this.db.transaction('feeds', 'readonly').objectStore('feeds');
                tbl.getAll().onsuccess = (e:any) => {
                    var dataArr:Array<FeedEntry> = e.target.result;
                    resolve(dataArr.slice(dataArr.length - amount));
                };
            };
        });
    }

    public syncData(amount: number, callback: any){
        this.listenres.push(callback);
        this.getData(amount).then(callback);
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
