import {Component, OnInit} from '@angular/core';
import {PostsService} from "../posts/posts.service";
import {User} from "../shared/models/user";
import {ActivatedRoute} from "@angular/router";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit{
  user: User | undefined;
  userId: number= 0;

  constructor(private postsService: PostsService,
              private route: ActivatedRoute) {
  }



  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = Number(params['id'])
    })
    this.postsService.getUser(this.userId).pipe(
      tap((res: User | undefined) => this.user = res),
      catchError(async (err) => console.log(err))
    ).subscribe()
  }
}
