import { normalizeBase, normalizeNamespace } from "./utils";

/**
 *
 * @type { function(*=, *=): * }
 */
export const mapFields = normalizeNamespace((namespace, { fields, base, action, mutation }) => {
  return fields.reduce((object, field) => {
    object[field] = {
      get () {
        base = base ?? "";
        
        return normalizeBase(this.$store.state, namespace + base)[field];
      },
      
      set (value) {
        if (action) {
          this.$store.dispatch(namespace + action, {
            [field]: value
          }).then();
        }
        
        if (mutation) {
          // eslint-disable-next-line no-console
          console.warn("mutation param is deprecated, use action instead");
          this.$store.commit(namespace + mutation, {
            [field]: value
          });
        }
      }
    };
    
    return object;
  }, {});
});
