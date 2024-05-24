import { NodeView, EditorView,  } from 'prosemirror-view';
import { Node, Plugin, PluginKey, Schema, Decoration, DecorationSet } from '@progress/kendo-angular-editor';
import {Selection, TextSelection} from 'prosemirror-state';
import { Observable, Subscription } from 'rxjs';
import { IBookMark } from './bookmark.service';


export interface HyperlinksPluginState {
	sortedArr: Decoration[];
	decorationSet: DecorationSet;
}
let view : EditorView;
export const hyperlinksPluginKeyName: PluginKey = new PluginKey<any>("HyperlinksPlugin");
export function getHyperlinksPlugin() {
  let editorSchema: Schema;
	const hyperlinksPlugin = new Plugin({
    key: hyperlinksPluginKeyName,
    view: (editorView) => {
      view = editorView;
      return {};
    },
    state: {
      init(_, {schema, doc}) {
        let decoArr = [] ;
        editorSchema = schema;
        doc.descendants((node: Node, pos) => {
          if(node.type.name === "philips-bookmark") {
            const newDeco = Decoration.inline(pos, pos + node.nodeSize, {},{...node.attrs} );
            
            decoArr.push(newDeco);
          }
        });
        console.log("plugin init - found - ", decoArr.length);
        const newSet = DecorationSet.create(doc, decoArr);
        const sortedArr = newSet.find().sort((a, b) => a.from - b.from);
        return {sortedArr: sortedArr, decorationSet: newSet}
      },
      apply(tr, oldState) {
        let newSet = oldState.decorationSet.map(tr.mapping, tr.doc);
        let sortedArr = newSet.find().sort((a, b) => a.from - b.from);
        return {sortedArr: sortedArr, decorationSet: newSet};
      }
    }
  });
  return hyperlinksPlugin;
}

  

export function findBookmarkById(bmk:IBookMark) {
  const state = view.state;
  let tr = view.state.tr;
  const pluginState = hyperlinksPluginKeyName.getState(state);
  const sortedArr = pluginState.sortedArr;
  const found = sortedArr.filter((deco) => deco.spec['bookmarkId'] === bmk.id); 
  //if(found)
  found.reverse().forEach((deco) => { // traverse in reverse order to avoid pos changes
    const bmkNode = state.doc.nodeAt(deco.from);
    bmkNode.descendants((node, pos) => {
      if(node.marks.some(mark => mark.type.name === "bookmark-measurement")) {
        const postRelativeToRoot = deco.from + pos + 1;
        console.log(node.type.name, postRelativeToRoot);
        let measurementTextNode = state.schema.text(bmk.measurement + " " + bmk.unit);
        measurementTextNode = measurementTextNode.mark(node.marks);
        tr.replaceWith(postRelativeToRoot, postRelativeToRoot + node.nodeSize, measurementTextNode);
      }
    });
     
  });
  view.dispatch(tr);
}


// export function createHyperlink(bmk: IBookMark) {
//   let text : string;
//   let tr = view.state.tr;
//   const state = view.state;
//   if(view.state.selection.empty) {
//     text = "hyperlink";
//     const textNode = state.schema.text(text);
    
//     tr = tr.insert(state.selection.from, [textNode]);
//     tr = tr.setSelection(TextSelection.create(tr.doc, state.selection.from, state.selection.from+ text.length));
//   }
  
//   const href = "ttps://github.com/search?q=repo";
//   view.dispatch(view.state.tr.addMark(state))


// }

