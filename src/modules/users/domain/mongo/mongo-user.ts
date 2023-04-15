import { Schema, model } from 'mongoose';
import { IUser } from '../iuser';


const User_Schema = new Schema<IUser>({
  email: String,
  first_name: String,
  last_name: String,
  password: String,
  role: {
    type: String,
    default: 'USER'
  },
});

export const User = model('User', User_Schema);

