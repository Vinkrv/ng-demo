import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {UserService} from "./user.service";
import {PostsModule} from "../posts/posts.module";
import {MatIconModule} from "@angular/material/icon";
import {UserRoutingModule} from "./user-routing.module";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [
    UserComponent
  ],
  providers: [
    UserService
  ],
  imports: [
    UserRoutingModule,
    PostsModule,
    MatIconModule,
    NgIf,
  ]
})
export class UserModule {
}
