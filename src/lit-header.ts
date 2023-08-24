import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import TailwindElement from 'styles/tw.element';
import { menuAlt_2 } from 'lit-heroicon/outline';
import 'lit-heroicon';

@customElement('lit-header')
export default class LitHeader extends TailwindElement() {
  @state() props: {
    fill?: Fill;
    stroke?: Stroke;
  } = {
    stroke: 'white',
  };

  render() {
    return html`
      <header
        class="w-[480px] h-fit bg-purple-500 mb-4 px-6 py-3 flex items-center justify-center text-white "
      >
        <lit-heroicon
          .path="${menuAlt_2}"
          .props="${this.props}"
          .size="${25}"
          class="cursor-pointer"
        ></lit-heroicon>
        <h1 class="font-bold mx-auto">Website todo</h1>
      </header>
    `;
  }
}
