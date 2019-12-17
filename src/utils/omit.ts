import clone from 'lodash.clone';

function omit(obj: {[key: string]: any}, propsToOmit: string[]) {
  const copy = clone(obj);

  for (const prop in obj) {
    if (propsToOmit.indexOf(prop) === -1) {
      copy[prop] = obj[prop];
    }
  }
  return copy;
}

export default omit;
