import { Schema, Plugin,PluginsFn } from '@progress/kendo-angular-editor';
import { Component } from '@angular/core';

import { BookmarkManager } from './bookmark.service';
import { SchemaService } from './schema.service';
import { BookmarksEditorAdapter } from './bookmarks.editor.adapter';
import { getHyperlinksPlugin, findBookmarkById } from './bookmarks.plugin';
import { randomInt } from 'crypto';


@Component({
  selector: 'my-app',
  template: `
        <kendo-editor
            [value]="value"
            [plugins]="plugins"
            [schema]="mySchema"
            style="height: 370px;"></kendo-editor>
    <button (click)=updateMeasurement()>update mesurement</button>`,
})
export class AppComponent {
  constructor(
    private bookmarksEditorAdapter: BookmarksEditorAdapter,
    private bookMarkManager: BookmarkManager,
    private schemaService: SchemaService,

  ) {
    this.bookMarkManager.subscribeToBookmarkChange('123', (bookmark) => {
      console.log('bookmark 123 updated', bookmark);
      findBookmarkById(bookmark);
    });
    this.bookMarkManager.subscribeToBookmarkChange('5', (bookmark) => {
      console.log('bookmark updated 5', bookmark);
      findBookmarkById(bookmark);
    
    });
  }

  public plugins: PluginsFn = (defaultPlugins: Plugin[]) => {
    return [...defaultPlugins, getHyperlinksPlugin()];
  };

  public value = `
        <h3> ProseMirror element with angular data source <philips-bookmark data-id="123">-hyperlink 123 <bookmark-measurement value="10">10</bookmark-measurement> more text-</philips-bookmark></h3>
        <p> by using  editor internal logic in <philips-bookmark data-id="5">hyperlink 1 <bookmark-measurement value="8">8 cm</bookmark-measurement></philips-bookmark> schema node and plugin</p>
        <philips-bookmark data-id="123">hyperlink 123 <bookmark-measurement value="10">10</bookmark-measurement></philips-bookmark><div>ABC</div>
    `;
  updateMeasurement() {
    // this.bookMarkManager.subscribeToBookmarkChange('123', (bookmark) => {
    //   console.log('bookmark updated', bookmark);
    //   findBookmarkById(bookmark);
    
    // });
    this.bookMarkManager.updateBookmarkById("123", { measurement: Number((Math.random()*50).toPrecision(4)) });
    this.bookMarkManager.updateBookmarkById("5", { measurement: Number((Math.random()*50).toPrecision(4)) });
  }
  public mySchema: Schema = this.schemaService.getSchema();
}
