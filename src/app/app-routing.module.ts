import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {PostsComponent} from "./posts/posts.component";

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'user/:id', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
