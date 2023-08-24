import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import TailwindElement from 'styles/tw.element';
import '../lit-heroicon';
import {
  calendar,
  check,
  inbox,
  plus,
  star,
  trash,
} from 'lit-heroicon/outline';

@customElement('lit-sidebar')
export class LitSidebar extends TailwindElement() {
  menuButtons: ButtonArray = [
    { button: 'Inbox', path: inbox },
    { button: 'Today', path: star },
    { button: 'Upcoming', path: calendar },
    { button: 'Completed', path: check },
    { button: 'Trash', path: trash },
  ];

  getMenuButtons() {
    return this.menuButtons.map(
      (menu) =>
        html`<div
          class="h-fit w-full flex items-center space-x-2 text-lg cursor-pointer "
        >
          <lit-heroicon
            .path="${menu.path}"
            class="stroke-inherit fill-none "
          ></lit-heroicon>
          <p>${menu.button}</p>
        </div>`
    );
  }

  render() {
    return html`
      <aside
        class="font-HantenGrotesk w-full h-full flex flex-col content-between items-center border-r  px-6 py-10 "
      >
        <!-- quick menu -->
        <section
          class="h-fit w-full text-gray-800 stroke-gray-800 bg-white space-y-6 "
        >
          ${this.getMenuButtons()}
        </section>

        <!-- add todo button -->
        <button
          class="p-3 w-fit mt-auto rounded-full shadow-lg shadow-blue-300 bg-blue-500"
        >
          <lit-heroicon
            .path="${plus}"
            size="${30}"
            class="stroke-white "
          ></lit-heroicon>
        </button>
      </aside>
    `;
  }
}
