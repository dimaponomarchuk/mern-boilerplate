export default interface CRUD<T> {
  list: (limit: number, page: number) => Promise<T[]>;
  create: (resource: T) => Promise<boolean>;
  updateById: (resourceId: string, resource: T) => Promise<boolean>;
  readById: (resourceId: string) => Promise<T>;
  deleteById: (resourceId: string) => Promise<boolean>;
  patchById: (resourceId: string, resource: T) => Promise<boolean>;
}
