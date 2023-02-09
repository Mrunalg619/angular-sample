import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public diagIds = ['diagram1', 'diagram2', 'diagram3'];

  public getIds(ind) {
    return this.diagIds[ind];
  }
}
