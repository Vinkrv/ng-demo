import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PostsService} from "./posts.service";
import {Posts} from "../shared/models/posts";
import {concatMap, from, switchMap, tap, map, toArray, catchError} from "rxjs";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PostsComponent implements OnInit {
  @Input() userPosts: boolean = false;
  @Input() userId: number = 0;
  posts: Array<Posts> = [];

  constructor(private postsService: PostsService,
              private userService: UserService,
              ) {
  }

  ngOnInit(): void {
    if (this.userPosts) {
      this.postsService.getUserPosts(this.userId).pipe(
        tap( res => this.posts = res),
        catchError(async (err) => console.log(err))
      ).subscribe()
    } else {
      this.postsService.getPosts().pipe(
        switchMap(posts => from(posts)),
        concatMap(post => this.userService.getUser(post.userId).pipe(
          map(user => ({
            id: post.id,
            userId: post.userId,
            title: post.title,
            body: post.body,
            user: user,
          })),
        )),
        toArray(),
        tap((list) => this.posts = list),
        catchError(async (err) => console.log(err))
      ).subscribe()
    }
  }

  getPostComments(postId: number): void {
    this.postsService.getPostComments(postId).subscribe(
      data => {
        this.posts = this.posts.map( el => {
          if (el.id === postId) {
            el.comments = data
          }
          return el
        })
      }
    )
  }
}
