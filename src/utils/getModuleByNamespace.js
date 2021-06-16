/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
export default function getModuleByNamespace (store, namespace) {
  return store._modulesNamespaceMap[namespace];
}
