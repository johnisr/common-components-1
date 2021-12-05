import unionBy from "lodash/unionBy";
import union from "lodash/union";

/**
 * Given an array of objects, returns an array of unique object[key] elements
 *
 * @param {Object[]} objects
 * @param {string} key - string of object property to be aggregated
 * @param {string} uniqueBy - optional, if object[key] is an object/array of objects
 *  what property to check for uniqueness
 * @returns {Object[] | string[]}
 */
export function GetAllObjectValue<
  T extends Record<K, any | Record<U, any>>[],
  K extends keyof T[number],
  U extends keyof T[number][K]
>(objects: T, key: K, uniqueBy?: U): T[K][] {
  return objects.reduce<T[K][]>((values, object) => {
    const currentValue = Array.isArray(object[key])
      ? object[key]
      : [object[key]];
    if (uniqueBy) {
      return unionBy<T[K]>(values, currentValue, uniqueBy);
    } else {
      return union<T[K]>(values, currentValue);
    }
  }, []);
}
