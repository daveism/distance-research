import { Store } from './store';

const store = new Store({});

export class GoogleAnalytics {
  constructor() {
    this.foo = {};
  }

  setEvent(action = '', category = '', label = '', value = 0) {
    const fooObj = this.foo; // eslint-disable-line
    gtag('event', store.getStateItem('uuid'), {  // eslint-disable-line
      event_category: category,
      event_label: label,
      value: `${value}`,
      uuid: store.getStateItem('uuid')
    });
  }
}
