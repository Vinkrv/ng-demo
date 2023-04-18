import {Comments} from "./comments";
import {User} from "./user";

export interface Posts {
  userId: number,
  id: number,
  title: string,
  body: string
  comments?: Array<Comments>,
  user?: User,
}
