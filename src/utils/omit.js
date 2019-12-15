import clone from 'lodash.clone';

function omit(obj, propsToOmit) {
  const copy = clone(obj);

  for (const prop in obj) {
    if (propsToOmit.indexOf(prop) === -1) {
      copy[prop] = obj[prop];
    }
  }
  return copy;
}

export default omit;
