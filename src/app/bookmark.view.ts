import { NodeView, EditorView } from 'prosemirror-view';
import { Node } from '@progress/kendo-angular-editor';
import { Observable, Subscription } from 'rxjs';
import { IBookMark } from './bookmark.service';

export class BookmarkView implements NodeView {
  dom: HTMLElement;
  subscription: Subscription;
  userTextNode: HTMLElement;
  measurementTextNode: HTMLElement;
  contentDom: HTMLAnchorElement;
  constructor(
    private observableBookmark: Observable<IBookMark>,
    private node: Node,
    private view: EditorView,
    private getPos
  ) {
    console.log('const');
    const userText = "sssssss";
    const measurementText = node.attrs.measurementText;

    this.contentDom = document.createElement("a");
    this.contentDom.innerText= node.textContent;
    this.dom = document.createElement('a');
    // this.dom.contentEditable = "true";
    this.dom.setAttribute('philips-bookmark', 'true');
    this.userTextNode = document.createElement('span');
    this.userTextNode.innerHTML = "some text ";
    // this.userTextNode.contentEditable = "true";
    this.measurementTextNode = document.createElement('span');
    this.measurementTextNode.setAttribute("measurement", 'true');
    this.contentDom.appendChild(this.userTextNode);
    this.dom.appendChild(this.contentDom)
    this.subscription = this.observableBookmark.subscribe((bookmark) =>
      this.updateDom(bookmark)
    );
    // this.dom.contentEditable = "true";
    this.dom.addEventListener('input', this.onInput.bind(this));

     // Handle click to edit
    //  this.dom.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   this.startEditing();
    // });
  //}
  
  // startEditing() {
  //   // Replace the text content with an input field for editing
  //   const input = document.createElement("input");
  //   input.type = "text";
  //   input.value = this.node.attrs.text;
  //   input.addEventListener("blur", () => {
  //     this.finishEditing(input.value);
  //   });
  //   this.dom.innerHTML = "";
  //   this.dom.appendChild(input);
  //   input.focus();
  // }
  // finishEditing(newText) {
  //   const { state, dispatch } = this.view;
  //   const pos = this.getPos();
  //   dispatch(
  //     state.tr.setNodeMarkup(pos, null, {
  //       ...this.node.attrs,
  //       text: newText,
  //     })
  //   );
  }

  

  setSelection(anchor: number,head: number,root: Document | ShadowRoot){
    
  }

  onInput(event) {
    // Update the node attribute with the new measurement text
    console.log('onInput');
    const newContent = event.target.textContent;
    const userText = this.node.textContent;
    const measurementText = newContent.substring(userText.length).trim();

    // const newNode = this.node.type.create(
    //   { measurementText },
    //   this.node.textContent
    // );
    // const transaction = this.view.state.tr.replaceRangeWith(
    //   this.getPos(),
    //   this.getPos() + this.node.nodeSize,
    //   newNode
    // );
    // this.view.dispatch(transaction);

    //this.userTextNode.textContent = userText;
    this.measurementTextNode.textContent = measurementText;

  }

  destroy() {
    this.subscription.unsubscribe();
  }

  //private renderContent(userText, measurementText) {}

  private updateDom(bookmark: IBookMark) {
    console.log('updateDOM');
    this.measurementTextNode.innerHTML =
      bookmark.measurement + ' - ' + bookmark.unit;
    this.dom.setAttribute('href', bookmark.href);
    this.dom.setAttribute('target', '_blank');
    this.userTextNode = document.createElement('span');
    //this.userTextNode.innerHTML = this.freeText.innerHTML ?? " ... "
    this.userTextNode.contentEditable = 'true';
    // this.dom.appendChild(this.userTextNode);
    this.contentDom.appendChild(this.measurementTextNode);
    //this.dom.innerText = 'Mesaurement is ' + bookmark.measurement;
    this.dom.contentEditable = 'true';
  }

  // update(node, decorations) {
  //   console.log('here');
  //   const userText = node.textContent;
  //   const measurementText = node.attrs.measurementText;
  //   //this.renderContent(userText, measurementText);
  //   return true;
  // }
}
