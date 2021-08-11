import { MulterFile } from '../common/upload';

export interface UserRequestBody {
  email: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  files?: MulterFile[];
}
