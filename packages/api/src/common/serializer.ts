export default interface Serializer<T1 = any, T2 = any> {
  serialize(value: T1): T2;

  deserialize(value: T2): T1;
}
