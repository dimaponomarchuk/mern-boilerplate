import { Model } from 'mongoose';

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
  public readonly _collection: Model<any, any, any>;

  constructor(collection: Model<any, any, any>) {
    this._collection = collection;
  }

  async find(limit: number = 25, page: number = 0): Promise<T[]> {
    return this._collection
      .find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async patch(id: string, item: T): Promise<boolean> {
    return this._collection.updateOne({ _id: id }, { $set: item });
  }

  async findOne(id: string): Promise<T> {
    return this._collection.findOne({ _id: id });
  }

  async create(item: T): Promise<boolean> {
    const document = new this._collection(item);
    await document.save();

    return document._id;
  }

  async update(id: string, item: T): Promise<boolean> {
    return this._collection.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string) {
    return this._collection.deleteOne({ _id: id });
  }
}
