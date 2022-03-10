/**
 * Record type ensures, we have no double or missing keys, values can be neglected
 *
 * @see https://stackoverflow.com/a/60932900
 * @example const keys = createKeys({ isDeleted: 1, createdAt: 1, title: 1, id: 1 })
 */
export const getModelKeys = <P>(keyRecord: Record<keyof P, any>): (keyof P)[] => {
  return Object.keys(keyRecord) as any;
};
