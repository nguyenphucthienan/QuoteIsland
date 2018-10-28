import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { DatatableComponent } from 'src/app/shared/components/datatable/datatable.component';
import { environment } from 'src/environments/environment';

import { AdminAuthorManagerTableService } from '../../services/admin-author-manager-table.service';

@Component({
  selector: 'app-admin-author-manager',
  templateUrl: './admin-author-manager.component.html',
  styleUrls: ['./admin-author-manager.component.scss'],
  providers: [AdminAuthorManagerTableService]
})
export class AdminAuthorManagerComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  constructor(public adminAuthorManagerTableService: AdminAuthorManagerTableService,
    private authorService: AuthorService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  openAddModal() {
  }

  addAuthor(author) {
    this.authorService.createAuthor(author)
      .subscribe(
        () => {
          this.alertService.success('Add author successfully');
          this.datatable.refresh();
        },
        error => this.alertService.error('Add author failed')
      );
  }

}
