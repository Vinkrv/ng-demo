import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Posts} from "../shared/models/posts";
import {Comments} from "../shared/models/comments"

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {
  }
  private api = 'https://jsonplaceholder.typicode.com'

  getPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.api}/posts`)
  }

  getPostComments(postId: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.api}/posts/${postId}/comments`)
  }
}
