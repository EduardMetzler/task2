import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PostDetailsComponent } from './post-details.component'
import { PostDetailsRoutingModule } from './pposts-details-routing.module'
import { MaterialModule } from './../../../../material/material.module'

@NgModule({
  declarations: [PostDetailsComponent],
  imports: [CommonModule, PostDetailsRoutingModule, MaterialModule],
})
export class PostsDetailsModule {}
