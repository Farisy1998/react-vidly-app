import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  // *********Chaining using the wrapper method from lodash*********
  // The wrapper method will look like _(array)

  //_.slice(items, startIndex);   // slcie(array, start, end);
  // take(array, no: of item to be taken from thew array);
  // Since the items is an array of object. So, the value method in the
  // below method chain will retun the value.
  return _(items).slice(startIndex).take(pageSize).value(); // method chaining
}
