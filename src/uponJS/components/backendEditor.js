import { LitElement, html, css } from "lit-element";

//load script

class backendEditor extends LitElement {
  static get properties() {
    return {
      backendCode: String,
      appName: String,
      loading: Boolean,
    };
  }

  constructor() {
    super();

    this.updatebackendCode = this.updatebackendCode.bind(this);
  }

  firstUpdated() {
    let U = global.uponJS_instance[this.appName];
    this.backendCode = U.configuration.backendCode;
  }

  static get styles() {
    return css`
      textarea {
        width: 100%;
        border-radius: 10px;
        background: #fff;
        resize: none;
        box-sizing: border-box;
        height: 60vh;
        border: none;
        margin: 30px 0;
        outline: none;
        padding: 20px;
      }

      button {
        padding: 10px 30px;
        border: none;
        background: #222;
        color: #fff;
        border-radius: 50px;
        font-weight: 500;
      }
    `;
  }

  updatebackendCode(event) {
    this.backendCode = event.target.value;
    console.log(this.backendCode);
  }

  configureVariables() {
    let U = global.uponJS_instance[this.appName];
    if (U.db) transformTypes(U.db);

    U.configuration.db = U.db;
    U.configuration.cloudFunctions = U.cloudFunctions;
    U.configuration.bucket = U.bucket;

    for (let key in U.cloudFunctions) {
      U.cloudFunctions[key] = U.cloudFunctions[key].toString();
    }

    function transformTypes(obj) {
      let blackListFunctions = [String, Number, Array, Object, Date, Object];

      for (let key in obj) {
        if (typeof obj[key] === "object") {
          transformTypes(obj[key]);
          continue;
        } else if (typeof obj[key] === "function") {
          if (blackListFunctions.includes(obj[key]) == false)
            obj[key] = { $executeJS: { code: obj[key].toString() } };
        }

        switch (obj[key]) {
          case String:
            obj[key] = "string";
            break;
          case Array:
            obj[key] = "array";
            break;
          case Number:
            obj[key] = "number";
            break;
          case Boolean:
            obj[key] = "boolean";
            break;
          case Date:
            obj[key] = "date";
            break;
          case Object:
            obj[key] = "object";
            break;
        }
      }
    }
  }

  saveBackendCode({ target }) {
    let U = global.uponJS_instance[this.appName];
    U.configuration.backendCode = this.backendCode;
    let script = document.createElement("script");
    script.innerHTML = this.backendCode;
    document.body.appendChild(script);
    let loading = U.loading("Updating Backend");
    this.configureVariables();
    U.query({ $hostBackend: U.configuration }).then(() => {
      loading.kill();
      U.say("Backend Updated 😊");
    });
  }

  render() {
    return html`
      <textarea @keyup=${this.updatebackendCode.bind(this)} id="textEditor">
${this.backendCode}</textarea
      >

      <button @click="${this.saveBackendCode.bind(this)}">Save</button>
    `;
  }
}

customElements.define("backend-editor", backendEditor);
