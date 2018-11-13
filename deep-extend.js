export const deepExtend = (target, source) => {
  if (!(source instanceof Object)) {
    return source;
  }

  switch (source.constructor) {
    case Date:
      // Treat Dates like scalars; if the target date object had any child
      // properties - they will be lost!
      // let dateValue = (source as any) as Date;
      return new Date(source.getTime());

    case Object:
      if (target === undefined) {
        target = {};
      }
      break;

    case Array:
      // Always copy the array source and overwrite the target.
      target = [];
      break;

    default:
      // Not a plain Object - treat it as a scalar.
      return source;
  }

  for (let prop in source) {
    if (!Object.prototype.hasOwnProperty.call(source, prop)) continue;
    target[prop] = deepExtend(target[prop], source[prop]);
  }

  return target;
};
