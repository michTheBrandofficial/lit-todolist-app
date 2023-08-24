import { html } from 'lit';
import { check, plus, search, tag, x } from 'lit-heroicon/outline';
import { customElement, state } from 'lit/decorators.js';
import { createRef, Ref } from 'lit/directives/ref.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import TailwindElement from 'styles/tw.element';
import '../components/lit-noteform';
import { useStorage } from '@/lib';
import '../lit-heroicon';
import './lit-notes';
import './lit-todo';
import NotesClass from './classes/notesclass';

class QuickTools extends NotesClass {
  tools: ToolsArray = [
    {
      path: check,
      color: ['bg-lime-200', 'stroke-lime-700'],
      name: 'check',
    },
    {
      path: x,
      color: ['bg-red-200', 'stroke-red-700'],
      name: 'x',
    },
    {
      path: tag,
      color: ['bg-green-200', 'stroke-green-700'],
      name: 'tag',
    },
    {
      path: search,
      color: ['bg-purple-200', 'stroke-purple-700'],
      name: 'search',
    },
    {
      path: plus,
      color: ['bg-blue-200', 'stroke-blue-700'],
      name: 'plus',
    },
  ];

  toolsClickHandlersMap: ToolsClickhandlersMap = {
    plus: async (e: LitMouseEvent<HTMLButtonElement>) => {
      this.fsNotes ? (this.fsNotes = false) : (this.fsNotes = true);
      await Promise.resolve();
      this.notesInputRef.value?.focus();
    },
  };
}

class LitBodyBaseClass extends QuickTools {
  // persistent view from localStorage
  getView = useStorage<LinksUnion>('screenView')[0];
  setView = useStorage<LinksUnion>('screenView')[1];

  // state for toggling between todos and notes views.
  @state() screenView: LinksUnion = this.getView() || 'Todos';
  links: Links = ['Todos', 'Notes'];
  linkActive(link: LinksUnion) {
    return (e: LitMouseEvent<HTMLLIElement>) => {
      const ulEl = e.currentTarget.parentElement;
      if (!ulEl) return;
      ulEl
        .querySelector('.linkActive')
        ?.classList.replace('linkActive', 'linkNotActive');
      e.currentTarget
        .querySelector('.linkNotActive')
        ?.classList.replace('linkNotActive', 'linkActive');
      this.screenView = this.setView(link);
    };
  }

  // filters section
  filters = ['All', '1h', '2h', 'Work'];
  filterActive(e: LitMouseEvent<HTMLParagraphElement>) {
    const sectionEl = e.currentTarget.parentElement;
    if (!sectionEl) return;
    sectionEl
      .querySelector('.filterActive')
      ?.classList.replace('filterActive', 'filterNotActive');
    e.currentTarget.classList.replace('filterNotActive', 'filterActive');
  }
}

@customElement('lit-body')
export class LitBody extends LitBodyBaseClass {
  getFilters() {
    return this.filters.map(
      (filter, i) =>
        html`
          <button
            @click="${this.filterActive}"
            class="${i === 0
              ? 'filterActive'
              : 'filterNotActive'} cursor-pointer text-[14px]"
          >
            ${filter}
          </button>
        `
    );
  }

  getMainSection() {
    return when(
      this.screenView === 'Todos',
      () => html` <lit-todos></lit-todos> `,
      () => html`
        <lit-notes
          class="w-full h-full flex overflow-y-scroll overflow-x-scroll no-scroll gap-6 "
        >
          <lit-noteform
            .inputRef="${this.notesInputRef}"
            .noteText="${this.notesText}"
            .litBody="${this as LitBody}"
            .beforeSubmit="${this.beforeSubmit.bind(this)}"
            class="${this.fsNotes === true ? 'block' : 'hidden'} "
          ></lit-noteform>
          ${when(
            !this.fsNotes,
            // show all notes
            () =>
              when(this.notesToRender, () => {
                return repeat(this.notesToRender || [], (text, i) => {
                  return html`
                    <lit-note
                      .litBody="${this as any}"
                      .notesText="${text}"
                      .key="${i}"
                      .class="${'bg-yellow-200 ' + (this.fsNotes && 'hidden')}"
                    ></lit-note>
                  `;
                });
              })
          )}
        </lit-notes>
      `
    );
  }

  render() {
    this.notesToRender = this.getNotes();
    return html`
      <!-- click the button , show appropriate screen and then switch the clicked button to active -->
      <header class="w-full h-fit flex items-center justify-between ">
        <h1 class="text-gray-800 text-[35px] ">Design</h1>
        <!-- Filters -->
        <section class="w-fit flex items-center space-x-2">
          ${this.getFilters()}
        </section>
      </header>
      <main class="mt-10 h-[90%] w-full flex-auto flex flex-col ">
        <nav class="w-full h-fit">
          <ul class="w-full h-fit flex items-center text-[14px] space-x-6">
            <!-- click the button , show appropriate screen and then switch the clicked button to active -->
            ${this.links.map(
              (link) =>
                html`
                  <li
                    @click="${this.linkActive(link)}"
                    class="w-fit flex items-start cursor-pointer gap-3 "
                  >
                    <p
                      class="p-1 px-2 w-fit h-fit rounded-full bg-blue-200 text-blue-400 "
                    >
                      10
                    </p>
                    <button
                      class="text-[17px] pb-3 ${this.screenView === link
                        ? 'linkActive'
                        : 'linkNotActive'} border-b-2  "
                    >
                      ${link}
                    </button>
                  </li>
                `
            )}
          </ul>
        </nav>
        <!-- main section -->
        <section class="w-full section-notes flex-auto mt-10 mb-10 text-[30px]">
          ${this.getMainSection()}
        </section>
        <!-- quick tools -->
        <section class="w-full h-fit flex mt-auto gap-5">
          ${this.tools.map(
            (tool, i) =>
              html`<button
                class="${tool
                  .color[0]} p-2 cursor-pointer rounded-[13px] ${i ===
                  this.tools.length - 1 && 'ml-auto'} "
                @click="${this.toolsClickHandlersMap[tool.name]?.bind(this)}"
              >
                <lit-heroicon
                  .path="${tool.path}"
                  .size="${22}"
                  class="fill-none ${tool.color[1]} "
                ></lit-heroicon>
              </button>`
          )}
        </section>
      </main>
    `;
  }
}
