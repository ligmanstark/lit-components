import { css, html, LitElement, nothing } from "lit";
import { unsafeCSS } from "lit";
import globalStyles from "../assets/css/style.css?inline";

export const COOKIE_APPROVED = "cookies-approved";
const TAG_NAME = "cookie-alert";

export class LitCookieAlert extends LitElement {
  static properties = {
    path: { type: Object },
    isVisible: { state: true },
  };

  constructor() {
    super();
    this.path = "/privacy";
    this.isVisible = false;
  }

  static styles = [
    unsafeCSS(globalStyles),
    css`
      :host {
        position: relative;
        display: block;
      }

      .cookies-alert {
        transition: transform 0.3s ease;
      }

      .cookies-alert:not(.is-open) {
        transform: translateY(100%);
      }

      button {
        font-weight: 600;
      }
    `,
  ];

  firstUpdated() {
    const approved = localStorage.getItem(COOKIE_APPROVED);
    this.isVisible = !approved;
    if (!this.isVisible) {
      this.#emitInit();
    }
  }

  #emitInit() {
    this.dispatchEvent(
      new CustomEvent("init", {
        detail: { isVisible: this.isVisible },
        bubbles: true,
        composed: true,
      })
    );
  }

  #approveCookie() {
    localStorage.setItem(COOKIE_APPROVED, "true");
    this.isVisible = false;
    this.dispatchEvent(
      new CustomEvent("approve", { bubbles: true, composed: true })
    );
  }

  #renderLink() {
    return html`
      <a
        class="cursor-pointer text-cornflower-900 transition-opacity hover:opacity-80"
        href=${props.href}
        target=${props.target ?? nothing}
        rel=${props.rel ?? nothing}
      >
        политики конфиденциальности и обработки персональных данных
      </a>
    `;
  }

  render() {
    if (!this.isVisible) return null;

    return html`
      <div class="cookies-alert is-open">
        <div
          data-ui="ui-cookie"
          class="fixed bottom-0 left-0 z-[99999999] flex h-fit w-full flex-row items-center justify-center rounded-t-lg bg-white px-5 py-8 shadow-[0_4px_24px_0px_rgba(0,0,0,0.1)] md:h-20 md:py-4"
          role="region"
          aria-label="Уведомление о cookies"
        >
          <div class="flex flex-col items-center gap-5 md:flex-row">
            <slot>
              <p class="my-0 text-sm text-center md:text-left">
                Я принимаю условия
                <a href="${this.path}" target="_blank" class="text-[#0D4A75]"
                  >политики конфиденциальности и обработки персональных
                  данных</a
                >с использованием Cookies.
              </p>
            </slot>
            <button
              class="max-md:w-full rounded-md  px-6 py-2 text-sm leading-[26px] outline-solid  hover:text-[#0D4A75] active:text-[#0D4A75] active:bg-white active:border-[#0D4A75] hover:bg-white active:border hover:border hover:border-[#0D4A75] relative inline-flex items-center justify-center gap-2 font-semibold duration-200 text-white bg-[#0D4A75] border border-[#0D4A75]"
              @click=${this.#approveCookie}
            >
              Принять
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, LitCookieAlert);
}

export const COOKIE_ALERT_TAG = TAG_NAME;
