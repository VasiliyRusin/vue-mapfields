/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's
 * function will handle the new namespace and the map.
 * @param { Function } fn
 * @return { function(*=, *=): * }
 */
export default function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== "string") {
      map = namespace;
      namespace = "";
    } else if (namespace.charAt(namespace.length - 1) !== "/") {
      namespace += "/";
    }
    return fn(namespace, map);
  };
}
