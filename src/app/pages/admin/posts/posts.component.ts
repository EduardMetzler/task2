import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { PostsService } from 'src/app/services/posts/posts.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { map } from 'rxjs/operators'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { PageDaten } from 'src/app/interface'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  constructor(private postsService: PostsService) {}
  posts: any = []
  displayedColumns: string[] = ['no', 'title', 'text']
  dataSource = new MatTableDataSource()

  pageDaten$ = new BehaviorSubject<PageEvent>({
    length: this.posts.length,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  })

  dataSource$ = new BehaviorSubject<any>(null)

  posts$ = this.postsService.posts$

  ngOnInit(): void {
    this.postsService.loadPosts()
    this.posts$.subscribe((posts) => {
      if (posts) {
        this.dataSource.data = posts
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    // this.dataSource.sort = this.sort;
  }

  OnPageChange(event: PageEvent) {
    console.log(event)
    this.pageDaten$.next(event)
  }
  applyFilter(event: Event) {
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
