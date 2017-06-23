import Firebase from 'firebase';
import moment from 'moment';

const FIREBASE_URL = 'https://pohodadiary.firebaseio.com/';

class DB {

  constructor() {
    this._ref = new Firebase(FIREBASE_URL + 'entries/');
  }

  fetchEntries(callback) {
    this._ref.orderByChild('dateDesc').on('value', snap => {
      let items = [];
      snap.forEach(child => {
        const item = child.val();
        items.push({
          date: item.date,
          text: item.text,
          images: item.images,
          _key: child.key()
        });
      });

      callback(items);
    });
  }

  createEntry(entry) {
    var date = moment(entry.date).format('YYYY-MM-DD');
    var uniqId = date + '-' + new Date().getTime();
    this._ref.child(uniqId).set({
      date,
      dateDesc: 0 - moment(entry.date).valueOf(),  // negative timestamp for descending sort
      text: entry.text,
      images: entry.images
    });
  }

}

const db = new DB();
export default db;
