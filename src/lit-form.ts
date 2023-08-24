import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';
import TailwindElement from 'styles/tw.element';
import 'lit-heroicon';

@customElement('lit-form')
export default class LitHeader extends TailwindElement() {
  // access the parent element which is <lit-body> and set the state of the object from here to cause a rerender.
  @property({ attribute: false }) parent: any = this;

  @property({ attribute: false }) inputRef: Ref<HTMLInputElement> = createRef();

  setTodos(e: LitSubmitEvent<HTMLFormElement>) {
    // stop the page from reloading.
    e.preventDefault();

    // get the data using the FormData constructor.
    const formData = new FormData(e.currentTarget);
    const data = formData.get('todo');

    if (!data) return;
    if (data === '') return;
    this.parent.todos = [...(this.parent.todos as string[]), data];
    this.parent.display = false;
    (
      (this.parent.inputRef as Ref<HTMLInputElement>).value as HTMLInputElement
    ).value = '';
  }

  render() {
    return html`
      <form
        @submit="${this.setTodos}"
        class="w-full h-12 flex rounded-lg items-center p-3 bg-white border border-gray-300 "
      >
        <input
          autofocus
          type="text"
          name="todo"
          class="w-full bg-inherit placeholder:text-gray-300 placeholder:text-[18px] focus:outline-none "
          placeholder="Write a note..."
          ${ref(this.inputRef)}
        />
      </form>
    `;
  }
}
