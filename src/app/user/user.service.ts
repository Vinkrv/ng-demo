import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  private api = 'https://jsonplaceholder.typicode.com'

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${userId}`)
  }
}
