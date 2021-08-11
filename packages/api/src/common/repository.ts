import { Model } from 'mongoose';
import Serializer from './serializer';

export interface IWrite<T> {
  create(item: T): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
  patch(id: string, item: T): Promise<boolean>;
  delete(id: string): void;
}

export interface IRead<T> {
  find(limit: number, page: number): Promise<T[]>;
  findOne(id: string): Promise<T>;
}

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
  public readonly Collection: Model<any, any, any>;

  public readonly Serializer: Serializer;

  constructor(collection: Model<any, any, any>, serializer: Serializer) {
    this.Collection = collection;
    this.Serializer = serializer;
  }

  async find(limit: number = 25, page: number = 0): Promise<T[]> {
    const list = (
      await this.Collection.find()
        .limit(limit)
        .skip(limit * page)
        .exec()
    ).map((value: any) => this.Serializer.deserialize(value));

    return list;
  }

  async patch(id: string, item: any): Promise<boolean> {
    return this.Collection.updateOne(
      { _id: id },
      { $set: this.Serializer.serialize(item) },
      { omitUndefined: true },
    );
  }

  async findOne(id: string): Promise<T> {
    return this.Serializer.deserialize(await this.Collection.findOne({ _id: id }).exec());
  }

  async create(item: T): Promise<boolean> {
    const document = new this.Collection(this.Serializer.serialize(item));
    await document.save();

    return document._id;
  }

  async update(id: string, item: any): Promise<boolean> {
    return this.Collection.updateOne({ _id: id }, this.Serializer.serialize(item), { new: true });
  }

  async delete(id: string) {
    return this.Collection.deleteOne({ _id: id });
  }
}
