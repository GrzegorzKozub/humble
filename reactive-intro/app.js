import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/startWith';

import * as $ from 'jquery';

const USER_1 = '.user1';
const USER_2 = '.user2';

const refreshClickStream = Observable.fromEvent(document.querySelector('.refresh'), 'click');

const requestStream = refreshClickStream
  .startWith('page load') // simulate clicking refresh when page loads
  .map(() => 'https://api.github.com/users?scramble=' + Math.floor(Math.random() * 500));

const responseStream = requestStream
  .flatMap(requestUrl => Observable.fromPromise($.getJSON(requestUrl)))
  .publish().refCount(); // make it a hot observable to avoid duplicate AJAX requests

const nullStream = refreshClickStream.map(() => null);

const createUserStream = selector => {
  return Observable
    .fromEvent(document.querySelector(selector + ' .remove'), 'click')
    .startWith('page load') // simulate clicking remove so combineLatest works
    .combineLatest(responseStream, (_, users) => users[Math.floor(Math.random() * users.length)])
    .merge(nullStream) // hide when refresh is clicked
    .startWith(null); // hide when page loads
}

const user1Stream = createUserStream(USER_1);
const user2Stream = createUserStream(USER_2);

const renderUser = (user, selector) => {
  const userElement = document.querySelector(selector);
  if (user === null) {
    userElement.style.visibility = 'hidden';
  } else {
    userElement.style.visibility = 'visible';
    var nameElement = userElement.querySelector('.name');
    nameElement.href = user.html_url;
    nameElement.textContent = user.login;
  }
}

user1Stream.subscribe(user => renderUser(user, USER_1));
user2Stream.subscribe(user => renderUser(user, USER_2));
