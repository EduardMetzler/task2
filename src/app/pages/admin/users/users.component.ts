import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { UsersService } from 'src/app/services/users/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  users: any = []
  displayedColumns: string[] = ['no', 'name', 'email', 'company']
  dataSource = new MatTableDataSource()

  pageDaten$ = new BehaviorSubject<PageEvent>({
    length: this.users.length,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  })

  dataSource$ = new BehaviorSubject<any>(null)

  users$ = combineLatest([
    this.usersService.users$,
    this.pageDaten$,
    this.dataSource$,
  ]).pipe(
    map(([users, pageDaten, dataSource]) => {
      if (dataSource && dataSource.filter !== '') {
        this.users = dataSource.filteredData
        console.log(this.users)
        const startIndex = pageDaten.pageIndex * pageDaten.pageSize
        let endIndex = startIndex + pageDaten.pageSize
        if (endIndex > dataSource.filteredData.length) {
          endIndex = dataSource.filteredData.length
        }
        // console.log(startIndex, endIndex)

        const pageSlice = dataSource.filteredData.slice(startIndex, endIndex)
        this.dataSource.data = users

        // return pageSlice
        return pageSlice
      }

      console.log(dataSource)
      this.users = users
      const startIndex = pageDaten.pageIndex * pageDaten.pageSize
      let endIndex = startIndex + pageDaten.pageSize
      if (endIndex > users.length) {
        endIndex = users.length
      }
      // console.log(startIndex, endIndex)

      const pageSlice = users.slice(startIndex, endIndex)
      this.dataSource.data = users

      return pageSlice
    }),
  )

  ngOnInit(): void {
    this.usersService.getUsers()
  }
  OnPageChange(event: PageEvent) {
    console.log(event)
    this.pageDaten$.next(event)
  }

  applyFilter(event: Event) {
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    console.log(this.dataSource.filteredData)
    // this.posts = this.dataSource
    this.dataSource$.next(this.dataSource)
  }
}
