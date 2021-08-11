import { MulterFile } from '../common/upload';

export interface UserRequestBody {
  email: string;
  username: string;
  password: string;
  files?: MulterFile[];
}
