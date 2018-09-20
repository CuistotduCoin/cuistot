export const fromString = <T>(enumObject: T, val: string): T[keyof T] =>
  enumObject[val.toUpperCase() as keyof typeof enumObject];
