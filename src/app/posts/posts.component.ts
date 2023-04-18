import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {concatMap, from, switchMap, tap, map, toArray, catchError, Subscription, Observable} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PostsService} from "./posts.service";
import {Posts} from "../shared/models/posts";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PostsComponent implements OnInit, OnDestroy {
  @Input() userPosts: boolean = false;
  @Input() userId: number = 0;
  postsList$: Observable<Posts[]>;
  posts$: Subscription;
  comments$: Subscription;
  dataSource: MatTableDataSource<Posts>;
  isLoaded: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private postsService: PostsService,
              private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.checkPageAndGetResults();
  }

  checkPageAndGetResults(): void {
    if (this.userPosts) {
      this.posts$ = this.postsService.getUserPosts(this.userId).pipe(
        tap(res => {
          this.savePostsResults(res);
        }),
        catchError(async (err) => console.log(err))
      ).subscribe()
    } else {
      this.posts$ = this.postsService.getPosts().pipe(
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
        tap((list) => {
          this.savePostsResults(list);
        }),
        catchError(async (err) => console.log(err))
      ).subscribe();
    }
  }

  savePostsResults(posts: Posts[]): void {
    this.dataSource = new MatTableDataSource<Posts>(posts);
    this.dataSource.paginator = this.paginator;
    this.postsList$ = this.dataSource.connect();
    this.isLoaded = true;
  }

  getPostComments(postId: number): void {
    this.comments$ = this.postsService.getPostComments(postId).pipe(
      tap(data => {
        this.dataSource.data = this.dataSource.data.map(el => {
          if (el.id === postId) {
            el.comments = data
          }
          return el
        })
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.posts$?.unsubscribe();
    this.comments$?.unsubscribe();
  }
}
