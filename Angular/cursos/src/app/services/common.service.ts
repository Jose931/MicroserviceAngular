import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';
import { Directive, Injectable } from '@angular/core';

@Directive()
export abstract class CommonService <E extends Generic>{

  protected baseEndpoint: string;
  protected head: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(protected http: HttpClient) { }

  public list(): Observable<E[]> {
    return this.http.get<E[]>(this.baseEndpoint);
  }

  public listPage(page: string, size: string): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);

    return this.http.get<any>(`${this.baseEndpoint}/page`, {params: params})
  }

  public show(id: number): Observable<E> {
    return this.http.get<E>(`${this.baseEndpoint}/${id}`);
  }

  public create(e: E): Observable<E>{
    return this.http.post<E>(this.baseEndpoint, e, {headers: this.head})
  }

  public edit(e: E): Observable<E>{
    return this.http.put<E>(
      `${this.baseEndpoint}/${e.id}`, 
      e, 
      {headers: this.head}
      );
  }

  public delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
