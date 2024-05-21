import { Injectable } from "@angular/core";
import { PluginsFn } from "@progress/kendo-angular-editor";
import { BookmarkManager } from "./bookmark.service";
import { BookmarkView } from "./bookmark.view";
import {  EditorView } from 'prosemirror-view';
import { Plugin } from '@progress/kendo-angular-editor';

@Injectable({providedIn:'root'})
export class BookmarksEditorAdapter {
  constructor(private bookmarksManager:BookmarkManager){
  }
  
  getBookmarkPlugin(): Plugin<any> {
    return new Plugin<any>({
      props: {
        nodeViews: {
          'philips-bookmark': (node, editorView: EditorView, getPos) => {
            return new BookmarkView( this.bookmarksManager.getBookmark$(node.attrs.bookmarkId), node, editorView, getPos);
          },
        },
      },
    });
  }
}