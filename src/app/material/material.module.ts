import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table'

const MaterialComponents = [
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatTableModule,
]

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MaterialComponents],
})
export class MaterialModule {}
