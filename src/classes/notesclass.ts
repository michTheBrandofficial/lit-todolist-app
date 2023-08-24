import { useStorage } from '../@/lib';
import { state } from 'lit/decorators';
import { Ref, createRef } from 'lit/directives/ref';
import TailwindElement from 'styles/tw.element';
import { LitBody } from '~/lit-body';

export default class NotesClass extends TailwindElement() {
  // state for fullscreenView on Notes screen
  @state() fsNotes = false;

  notesInputRef: Ref<HTMLInputElement> = createRef();
  // state for the notesText to change.
  notesText: [string, string] | null = null;
  // key to update a note.
  noteKey: number | null = null;
  getNotes = useStorage<[string, string][]>('notes')[0];
  parent: LitBody = this as unknown as LitBody;
  notesToRender = this.getNotes();
  beforeSubmit() {
    return this.noteKey;
  }
}
