import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PostsComponent } from './posts.component'
import { PostsRoutingModule } from './posts-routing.module'
import { MaterialModule } from './../../../material/material.module'

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, PostsRoutingModule, MaterialModule],
})
export class PostsModule {}
