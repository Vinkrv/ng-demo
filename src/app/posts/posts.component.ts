import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostsService} from "./posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PostsComponent implements OnInit {
  posts: any

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.posts = this.postsService.getPosts().subscribe(
        (data: any) => this.posts = data
    )
  }
}
