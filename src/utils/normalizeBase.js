/**
 * @param { Object } state
 * @param { String } base
 * @return { Object }
 */
export default function normalizeBase (state, base) {
  return base
    .replace(/\./g, "/")
    .split("/")
    .filter(Boolean)
    .reduce((object, level) => object[level], state);
}
