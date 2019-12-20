import { Component, ViewEncapsulation } from '@angular/core';

import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})

export class AboutPage {
  constructor(
    private storage: Storage,
    private fileChooser: FileChooser,
    private localNotifications: LocalNotifications
  ) { }

  ngOnInit() {
    this.localNotifications.schedule({
      text: 'Opened about page.'
    });
  }

  chooseFile() {
    this.fileChooser.open()
      .then(uri => console.log(uri))
      .catch(e => console.log(e));
  }

  resetStorage() {
    this.storage.set('key', Math.random())
  }

  getStorage() {
    this.storage.get('key').then(res => {
      console.log(res)
    })
  }

  rxjs() {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.complete();
        subscriber.next(4);
      }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
    console.log('just after subscribe');
  }
}
