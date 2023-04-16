import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostsService} from "./posts.service";
import {Posts} from "../shared/models/posts";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PostsComponent implements OnInit {
  posts: Array<Posts> = [];

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(
      data => this.posts = data
    )
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
