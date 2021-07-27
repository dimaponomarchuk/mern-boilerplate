import mongoose from 'mongoose';

export default class MongooseService {
  private static _instance: MongooseService;

  constructor() {
    this.connectWithRetry();
  }

  public static getInstance() {
    if (!this._instance) {
      this._instance = new MongooseService();
    }
    return this._instance;
  }

  async connectWithRetry() {
    const url = process.env.DB_URL || 'mongodb://mongo:27017/api-db';

    const options = {
      autoIndex: false,
      poolSize: 10,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log('MongoDB connection with retry');
    await mongoose
      .connect(url, options)
      .then(() => {
        console.log('MongoDB is connected');
      })
      .catch((err) => {
        console.log(err);
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ');
        setTimeout(this.connectWithRetry, 5000);
      });
  }
}
