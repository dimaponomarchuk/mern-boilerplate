class Entity {
  protected _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  equals(other: Entity): boolean {
    if (other instanceof Entity === false) {
      return false;
    }

    return this._id ? this.referenceEquals(other._id) : this === other;
  }

  referenceEquals(id: any): boolean {
    if (!this._id) {
      return this.equals(id);
    }

    const reference = typeof id !== 'string' ? id.toString() : id;

    return this._id === reference;
  }

  toString(): string {
    return this._id;
  }
}

export default Entity;
