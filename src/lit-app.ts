import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import TailwindElement from 'styles/tw.element';
import './lit-sidebar';
import './lit-body';

@customElement('lit-app')
export class LitApp extends TailwindElement() {
  render() {
    return html`
      <lit-sidebar
        class="w-[25%] min-w-[300px] max-w-[300px] h-full bg-white "
      ></lit-sidebar>
      <lit-body
        class="flex-1 w-[75%] h-full flex flex-col px-12 py-5 font-HantenGrotesk "
      ></lit-body>
    `;
  }
}
