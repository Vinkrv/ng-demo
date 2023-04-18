import {NgModule} from "@angular/core";
import {PostsComponent} from "./posts.component";
import {PostsService} from "./posts.service";
import {UserService} from "../user/user.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PostsRoutingModule} from "./posts-routing.module";

@NgModule({
  declarations: [
    PostsComponent
  ],
  providers: [
    PostsService,
    UserService
  ],
  imports: [
    PostsRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatIconModule,
    MatPaginatorModule,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  exports: [
    PostsComponent
  ]
})
export class PostsModule {
}
