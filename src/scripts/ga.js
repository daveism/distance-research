import { Store } from './store';

const store = new Store({});

// adds a custom google events
export function googleAnalyticsEvent(action = '', category = '', label = '', value = 0) {
  gtag('event', action, {  // eslint-disable-line
    event_category: category,
    event_label: label,
    value: `${value}`,
    uuid: store.getStateItem('uuid')
  });
}
