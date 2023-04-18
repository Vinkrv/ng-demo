import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, Subscription, tap} from "rxjs";
import {User} from "../shared/models/user";
import {UserService} from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  userId: number = 0;
  user$: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = Number(params['id'])
    })
    this.user$ = this.userService.getUser(this.userId).pipe(
      tap((res: User) => this.user = res),
      catchError(async (err) => console.log(err))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.user$?.unsubscribe();
  }
}
