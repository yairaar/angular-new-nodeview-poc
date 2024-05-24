import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';


export interface IBookMark {
  id: string;
  measurement: number;
  unit: string;
  href: string;
}

@Injectable({ providedIn: 'root' })
export class BookmarkManager extends ComponentStore<IBookMark[]> {
  constructor() {
    super([
      {
        id: "123",
        measurement: 3.8,
        unit: 'cm',
        href: 'https://google.com/q?123',
      },
      {
        id: "5",
        measurement: 100,
        unit: 'cm',
        href: 'https://google.com/q?123',
      },
    ]);
  }

  updateBookmarkById(id: string, bookmark: Partial<IBookMark>) {
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
    return this.get().find((b) => b.id === id);
  }

  getBookmark$(id: string) {
    return this.select((state) => state.find((b) => b.id === id));
  }

// subscribe to any bookmark change and update the bookmark in the editor
  public subscribeToBookmarkChange(id: string, updateFn: (bookmark: IBookMark) => void) {
    this.select((state) => state.find((b) => b.id === id)).subscribe(
      updateFn
    );//.unsubscribe();
  }


 
}
