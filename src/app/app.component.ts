import { Schema, Plugin,PluginsFn } from '@progress/kendo-angular-editor';
import { Component } from '@angular/core';

import { BookmarkManager } from './bookmark.service';
import { SchemaService } from './schema.service';
import { BookmarksEditorAdapter } from './bookmarks.editor.adapter';


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

  ) {}

  public plugins: PluginsFn = (defaultPlugins: Plugin[]) => {
    return [...defaultPlugins, this.bookmarksEditorAdapter.getBookmarkPlugin()];
  };

  public value = `
        <h3> ProseMirror element with angular data source</h3>
        <p> by using  editor internal logic in schema node and plugin</p>
        <philips-bookmark data-id="123">123</philips-bookmark><div>ABC</div>
    `;
  updateMeasurement() {
    this.bookMarkManager.updateBookmarkById(123, { measurement: 5.5 });
  }
  public mySchema: Schema = this.schemaService.getSchema();
}
