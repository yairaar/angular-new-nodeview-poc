import { Injectable } from '@angular/core';
import { BookmarkManager } from './bookmark.service';
import { DOMSerializer ,Node} from 'prosemirror-model';
import { schema, Schema,  } from '@progress/kendo-angular-editor';

@Injectable({ providedIn: 'root' })
export class SchemaService {
  constructor() {}

  getSchema() {
    const nodes = schema.spec.nodes.addToEnd('philips-bookmark', {
      attrs: {
        bookmarkId: { default: null },
        href: {},
        text: {},
      },
      group: 'inline',
      selectable: false,
      inline: true,
      content: 'text*',
      //atoms: false,
      isAtom: false,
      parseDOM: [
        {
          tag: 'philips-bookmark',
          getAttrs: (dom: HTMLElement): unknown => ({
            bookmarkId: dom.getAttribute('data-id'),
            href: dom.getAttribute('href'),
            text: dom.innerText,
          }),
          // getContent: (node:Node,schema:Schema) => {
          //   return DOMSerializer.fromSchema(schema).serializeFragment(
          //     node.content
          //   );
          // },
        },
      ],
      toDOM(node: Node): any {
        //middle object is for rendering the attributes out of the node, hole is where to put the content (first child)
        return ['philips-bookmark', 0];
      },
    });
    // Append a new mark representing the <s> formatting tag.
    const marks = schema.spec.marks;
    // Create the new schema.
    return new Schema({ nodes, marks });
  }
}
