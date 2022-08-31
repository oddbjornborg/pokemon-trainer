import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination-menu',
  templateUrl: './pagination-menu.component.html',
  styleUrls: ['./pagination-menu.component.css']
})
export class PaginationMenuComponent implements OnInit {

  @Output() pageClicked: EventEmitter<number> = new EventEmitter;

  @Input() paginationElements: string[] = [];

  get finalPage(): number | undefined {
    return this.paginationService.finalPage;
  }

  get currentPage(): number {
    return this.paginationService.currentPage;
  }

  constructor(
    private readonly paginationService: PaginationService
  ) { }

  ngOnInit(): void {
  }

  public onPageClicked(element: string) {
    let pageNumber: number | undefined;

    switch (element) {
      case "<<":
        pageNumber = 0;
        break;
      case "<":
        pageNumber = (this.currentPage === 0) ? 0 : (this.currentPage - 1);
        break;
      case ">":
        pageNumber = (this.currentPage === this.finalPage) ? this.finalPage : (this.currentPage + 1);
        break;
      case ">>":
        pageNumber = this.finalPage;
        break;
      default:
        pageNumber = Number(element)
        break;
    }

    this.pageClicked.emit(pageNumber);
  }

  public toNumber(element: string): string {
    if(/[0-9]/.test(element)) {
      return String(Number(element) + 1)
    }
    return element;
  }

}
