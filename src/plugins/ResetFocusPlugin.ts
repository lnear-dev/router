import { kLnear, kVersion } from '@lnear/utils';
import { RouterPlugin, Context } from '../Plugin.js';
import { html, render } from 'lit-html';

const FOCUS_ELEMENT_ID = 'router-focus';
const SR_ONLY_STYLE = `position:absolute;top:0;width:1px;height:1px;overflow:hidden;clip:rect(1px,1px,1px,1px);clip-path:inset(50%);margin:-1px;`;
const template = (title: unknown) => html`
  <div
    ${kLnear}="true"
    .kVersion="${kVersion}"
    id="${FOCUS_ELEMENT_ID}"
    tabindex="-1"
    aria-live="polite"
    style="${SR_ONLY_STYLE}"
  >
    ${title}
  </div>
`;
export class ResetFocusPlugin extends RouterPlugin {
  protected static readonly _name: string = 'resetFocus';

  afterNavigation(context: Context): void {
    const el = document.querySelector(
      `div[${kLnear}][kVersion="${kVersion}"]#${FOCUS_ELEMENT_ID}`
    ) as HTMLElement;

    if (!el) {
      render(template(context.title as string), document.body);
    } else {
      el.textContent = context.title as string;
    }

    el.addEventListener('blur', () => {
      el?.style.setProperty('display', 'none');
    });

    el.style.removeProperty('display');
    el.focus();
  }
}

