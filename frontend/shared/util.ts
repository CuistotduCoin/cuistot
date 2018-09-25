import get from 'lodash.get';

export const fromString = <T>(enumObject: T, val: string): T[keyof T] =>
  enumObject[val.toUpperCase() as keyof typeof enumObject];

export const formatName = (object: object, firstNamePath: string, lastNamePath: string): string =>
  `${get(object, firstNamePath)} ${get(object, lastNamePath)}`;