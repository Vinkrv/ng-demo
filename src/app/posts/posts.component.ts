import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PostsService} from "./posts.service";
import {Posts} from "../shared/models/posts";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PostsComponent implements OnInit {
  @Input() userPosts: boolean = false
  posts: Array<Posts> = [];

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(
      data => this.posts = data
    )
    // this.postsService.getPosts().pipe(
    //   tap( (res: Posts[]) => {
    //     this.posts = res
    //   }),
    //   tap( () => {
    //     this.posts = this.posts.map( el => {
    //       el.user = this.postsService.getUser(el.userId)
    //       return el
    //     })
    //   })
    // ).subscribe()
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
