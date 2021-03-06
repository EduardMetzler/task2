import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MaterialModule } from '../../../../material/material.module'
import { UserDetailsComponent } from './user-details.component'
import { UserDetailsRoutingModule } from './user-details-routing.module'

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, UserDetailsRoutingModule, MaterialModule],
})
export class PostsDetailsModule {}
