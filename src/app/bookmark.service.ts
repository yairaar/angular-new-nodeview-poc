import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';


export interface IBookMark {
  id: number;
  measurement: number;
  unit: string;
  href: string;
}

@Injectable({ providedIn: 'root' })
export class BookmarkManager extends ComponentStore<IBookMark[]> {
  constructor() {
    super([
      {
        id: 123,
        measurement: 3.8,
        unit: 'cm',
        href: 'https://google.com/q?123',
      },
    ]);
  }

  updateBookmarkById(id: number, bookmark: Partial<IBookMark>) {
    this.setState((state) => {
      const index = state.findIndex((b) => b.id === id);
      const newBookmark = { ...state[index], ...bookmark };
      return [
        ...state.splice(0, index),
        newBookmark,
        ...state.splice(index + 1),
      ];
    });
    console.log('state updated', this.get());
  }

  getBookmarkById(id: string) {
    return this.get().find((b) => b.id === parseInt(id));
  }

  getBookmark$(id: string) {
    return this.select((state) => state.find((b) => b.id === parseInt(id)));
  }

 
}
