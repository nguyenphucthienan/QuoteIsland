import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { QuoteService } from 'src/app/core/services/quote.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public readonly tabNames = {
    quotes: 'QUOTES',
    authors: 'AUTHORS',
    categories: 'CATEGORIES'
  };

  public readonly textProperties = {
    quotes: 'text',
    authors: 'fullName',
    categories: 'name'
  };

  currentTab: string = this.tabNames.quotes;
  textProperty: string = this.textProperties.quotes;

  value: string;
  search$: Observable<any>;

  items: any[] = [];
  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 16
  };

  readonly bannerImageUrl = environment.bannerImageUrls.searchPage;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(queryParams => {
        this.value = queryParams.get('value');
        this.selectTab(this.tabNames.quotes);
      });
  }

  selectTab(tabName: string) {
    this.currentTab = tabName;
    this.items = [];

    if (this.value.length < 3) {
      this.alertService.info('Search value must be at least 3 characters');
      return;
    }

    if (tabName === this.tabNames.quotes) {
      this.textProperty = this.textProperties.quotes;
      this.search$ = this.quoteService.getQuotes(this.pagination, undefined, { text: this.value });
    } else if (tabName === this.tabNames.authors) {
      this.textProperty = this.textProperties.authors;
      this.search$ = this.authorService.getAuthors(this.pagination, undefined, { fullName: this.value });
    } else if (tabName === this.tabNames.categories) {
      this.textProperty = this.textProperties.categories;
      this.search$ = this.categoryService.getCategories(this.pagination, undefined, { name: this.value });
    }

    this.search();
  }

  private search() {
    if (this.search$) {
      this.search$.subscribe((response: any) => {
        this.items = response.items;
        this.pagination = response.pagination;
      });
    }
  }

  onPageChanged(pageNumber: number) {
    this.pagination.pageNumber = pageNumber;
    this.selectTab(this.tabNames.quotes);
  }

  itemSelected(item: any) {
    const id = item._id;
    if (this.currentTab === this.tabNames.quotes) {
      this.router.navigate(['/quotes', id]);
    } else if (this.currentTab === this.tabNames.authors) {
      this.router.navigate(['/authors', id]);
    } else if (this.currentTab === this.tabNames.categories) {
      this.router.navigate(['/categories', id]);
    }
  }

}
