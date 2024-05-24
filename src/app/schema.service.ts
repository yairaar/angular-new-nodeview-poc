import { Injectable } from '@angular/core';
import { BookmarkManager } from './bookmark.service';
import { DOMSerializer, Node, DOMOutputSpec } from 'prosemirror-model'; // Import DOMOutputSpec
import { Mark, schema, Schema, } from '@progress/kendo-angular-editor';

@Injectable({ providedIn: 'root' })
export class SchemaService {
  constructor() { }

  getSchema() {
    const nodes = schema.spec.nodes.addToEnd('philips-bookmark', {
      attrs: {
        bookmarkId: { default: null },
        href: {},
      },
      group: 'inline',
      selectable: false,
      inline: true,
      content: 'text*',
      //atoms: false,
      isAtom: false,
      marks: "_",
      parseDOM: [
        {
          tag: 'philips-bookmark',
          getAttrs: (dom: HTMLElement): unknown => ({
            bookmarkId: dom.getAttribute('data-id'),
            href: dom.getAttribute('href'),
            class: "philips-bookmark",
          }),
          // getContent: (dom, schema) => {
          //   return Fragment.fromJSON(schema, [type: "text", text: `${this.options.matcher.char}${label}`])
        },
      ],
      toDOM(node: Node): any {
        //middle object is for rendering the attributes out of the node, hole is where to put the content (first child)
        return [
          'philips-bookmark', {
            class: "philips-bookmark", 
            bookmarkId: node.attrs.bookmarkId, 
            href: node.attrs.href
            }, 0];
      },
      //contentDOM: 'span',
    });
    
    // Append a new mark representing the <s> formatting tag.
    const marks = schema.spec.marks.addToEnd('bookmark-measurement', {
      attrs: {
        value: {default: null},
      },
      parseDOM: [
        {
          tag: 'bookmark-measurement',
          getAttrs: (dom: HTMLElement): unknown => ({
            value: dom.getAttribute('value'),
          }),
        },
      ],
      toDOM(mark: Mark, inline: boolean): DOMOutputSpec {
        return ['bookmark-measurement', {value: mark.attrs.value}, 0];
      },

    });
    // Create the new schema.
    return new Schema({ nodes, marks });
  }
}
