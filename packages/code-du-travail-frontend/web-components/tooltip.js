import { LitElement, html, css } from "lit-element";

class WebComponentsTooltip extends LitElement {
  static get properties() {
    return {
      content: { type: String },
    };
  }

  get root() {
    return this.shadowRoot || this;
  }

  static get styles() {
    return css`
      .tooltip {
        position: relative;
        display: inline;
        box-sizing: border-box;
        width: auto;
        height: auto;
        color: rgb(62, 72, 110);
        font-size: 16px;
        font-family: "Open Sans", sans-serif;
        line-height: 26px;
        border-bottom-color: rgb(121, 148, 212);
        border-bottom-width: 1px;
        border-bottom-style: dotted;
        text-rendering: optimizelegibility;
        text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
      }
      .tooltip:hover {
        -webkit-animation-play-state: paused;
      }
      .tooltip:hover .content {
        visibility: visible;
      }
      .tooltip .content {
        left: 50%;
        position: absolute;
        z-index: 2;
        width: 300px;
        transform: translateX(-50%);
        visibility: hidden;
        max-width: 70vw;
        padding: 0.25em 0.5em;
        color: #3e486e;
        font-weight: normal;
        font-size: 1.6rem;
        background: #e4e8ef;
        border: #bbcadf;
        box-shadow: #7994d4;
        pointer-events: none;
      }
    `;
  }
  render() {
    return html`
      <div class="tooltip"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
      >
        <slot></slot>
      </slot>
    `;
  }
  handleMouseEnter() {
    const rootElement = this.root.querySelector(".tooltip");
    var tooltipWrap = document.createElement("div");
    tooltipWrap.className = "content";
    tooltipWrap.innerHTML = this.content.trim();
    rootElement.append(tooltipWrap);
  }
  handleMouseLeave() {
    const rootElement = this.root.querySelector(".tooltip");
    const [tooltipElement] = rootElement.parentNode.querySelectorAll(
      ".content"
    );
    tooltipElement.remove();
  }
}

customElements.define("webcomponent-tooltip", WebComponentsTooltip);
