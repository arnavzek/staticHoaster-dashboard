import { LitElement, html, css } from "lit-element";

//load script

class overlayButtons extends LitElement {
  static get properties() {
    return {
      appName: String,
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`
      div {
        position: fixed;
        z-index: 5000;
        left: 30px;
        bottom: 30px;
      }

      button {
        cursor: pointer;
        margin-right: 20px;
        background: #fff;
        padding: 10px 15px;
        outline: none;
        box-shadow: 5px 5px 1vw #00000040;
        border: none;
        border-radius: 5px;
        font-family: calibri, roboto;
        border-radius: 5px;
      }
    `;
  }

  render() {
    let U = global.uponJS_instance[this.appName];
    return html`
      <div>
        <button @click=${U.host}>🐣 Host</button>
        <button @click=${U.openBackendEditor}>🧊 Edit Backend</button>
        <button @click=${U.openDocumentation}>💡 Learn</button>
        <button @click=${U.openAdminPanel}>⚙️</button>
      </div>
    `;
  }
}

customElements.define("overlay-buttons", overlayButtons);
