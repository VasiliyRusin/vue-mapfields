# Vue mapFields

Small shortcut for **vuex** function which could be used same as `mapState` or `mapGetters`.

### Installation

`npm i @vasiliyrusin/vue-mapfields`

### Types

```typescript
interface Params {
  // object's properties
  fields: Array<string>;
  // path to object in state (from module root)
  base?: string,
  // action name. Needs full path if namespace doesn't set.
  action: string
  // Deprecated. It will be removed soon.
  mutation: string
}

mapFields (namespace?: string, map: Params): Object
```

### Example

#### store/carMarket/index.js
```javascript
{
  state: {
    filters: {
      models: []
      datePicker: {
        dateStart: null;
        dateEnd: null;
      };
    }
  },
  
  actions: {
    // will be an object with filter name as key and value as the value
    updateFilters ({ commit }, filter) {
      console.log(filter) // { models: ['Tesla'] }
      commit("UPDATE_FILTERS", filter)
    },
  
    updateDatePicker ({ commit }, filter) {
      console.log(filter) // { dateStart: ['1970-01-01T00:00:00.000Z'] }
    }
  },
  
  mutations: {
    UPDATE_FILTERS (state, filters) {
      // method 1 (preferred)
      for (const [key, value] of Object.entries(filters)) {
        Vue.set(state.filters, key, value);
      }
      
      // method 2
      // this fires update of all "filters".
      state.filters = { ...state.filters, ...filters };
    }
  }
}
```

#### components/carFilters.vue
```javascript
import { mapFields } from "@vasiliyrusin/vue-mapfields";

export default {
  computed: {
    ...mapFields("carMarket", {
      fields: ["models"],
      base: "filters",
      action: updateFilters
    }),

    ...mapFields("carMarket", {
      fields: ["dateStart", "dateEnd"],
      base: "filters.datePicker",
      action: updateDatePicker
    })
  }
}
```
