import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinalPageResponse } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private _limit: number = 20;
  private _currentPage: number = 0;
  private _lastAccessedPage: number | undefined;
  private _finalPage: number | undefined;
  private _paginationElements: string[] = [];

  get paginationElements(): string[] {
    return this._paginationElements;
  }

  get offset(): number {
    return this._limit * this._currentPage;
  }

  get lastAccessedPage(): number | undefined {
    return this._lastAccessedPage;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get limit(): number {
    return this._limit;
  }

  get finalPage(): number | undefined {
    return this._finalPage;
  }

  set currentPage(pageNumber: number) {
    this._currentPage = pageNumber;
  }
  
  constructor(
    private readonly http: HttpClient
  ) { }
  
  public pageIsCached(): boolean {
    return this._lastAccessedPage !== undefined && this._currentPage === this._lastAccessedPage
  }

  public updateLastAccessedPage() {
    this._lastAccessedPage = this._currentPage;
  }

  public getFinalPageNumber() {
    if(this._finalPage !== undefined) {
      return;
    }

    this.http.get<FinalPageResponse>("https://pokeapi.co/api/v2/pokemon?limit=1")
      .subscribe({
        next: (res) => {
          this._finalPage = Math.floor(res.count / 20);
        },
        error: (err: HttpErrorResponse) => {
          console.log("ERROR", err.message);
        }
      })
  }

  public setPaginationElements() {
 
    this._paginationElements = [];

    this._paginationElements.push(...["<<", "<"]);
    if(this._currentPage < 3) {
      for(let i = 0; i < 5; i++) {
        this._paginationElements.push(String(i));
      }
    }
    else if(this._finalPage !== undefined && this._currentPage > this._finalPage - 2) {
      for(let i = -4; i <= 0; i++) {
        this._paginationElements.push(String(this._finalPage + i));
      }
    }
    else {
      for(let i = -2; i <= 2; i++) {
        this._paginationElements.push(String(this._currentPage + i));
      }
    }
    this._paginationElements.push(...[">", ">>"]);
  }
}
