import { LitElement, html, css } from "lit-element";

//load script

class adminPannel extends LitElement {
  static get properties() {
    return {
      title: String,
      dbData: Object,
      appName: String,
      collections: Array,
      currentTab: String,
      errorMsg: String,
      showMessage: String,
      display: String,
    };
  }

  constructor() {
    super();

    this.dbData = null;
    this.display = "block";
    this.showMessage = "Please Wait";
    this.prevOverflowValue = document.body.style.overflowY;
  }

  static get styles() {
    return css`
      #container {
        margin: 0px;
        border-radius: 0px;
        font-family: roboto, sans-serif;
        padding: 20px;
        margin-bottom: 50px;
      }

      #header {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      #console {
        background: #2d2c2c;
        color: #ffffff87;
        margin-bottom: 1vw;
        padding: 24px;
        border-radius: 20px;
      }

      #header button {
        padding: 10px 40px;
        margin-right: 20px;
        margin-bottom: 20px;
        background: transparent;
        border-radius: 20px;
        cursor: pointer;
        color: rgb(0, 0, 0);
        border: 2px solid;
      }

      [data-display="none"] {
        display: none;
      }

      .section {
        padding: 20px;
        min-height: 200px;
        border-radius: 20px;
        width: 98%;
        display: inline-block;
        background: transparent;
        margin-top: 100px;
      }

      .left-pannel {
        float: left;
        height: 80vh;
        width: 14%;
        display: inline-block;
        border: 2px solid;
        position: relative;
        width: 17%;
        border-radius: 20px;
      }

      .left-pannel h3 {
        position: absolute;
        margin: 0;
        top: -45px;
        font-size: 30px;
      }

      .left-pannel button {
        width: 100%;
        font-size: 20px;
        overflow: hidden;
        text-align: left;
        background: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        background: transparent;
        font-size: 20px;
        font-weight: 600;
        text-decoration: underline;
        margin: 40px 20px;
        outline: none;
        cursor: pointer;
      }

      .left-pannel button.highlighted {
        font-weight: 900;
      }

      .right-pad {
        float: right;
        width: 90%;
        height: 1000px;
        display: inline-block;
        background: #dbdbdb;
        width: 80%;
        margin: 20px;
        margin: 0;
        background: transparent;
        width: 80%;
      }

      .workingArea {
        height: 1000px;
        float: right;
        border-radius: 20px;
        overflow-x: scroll;
        background: #fff;
        width: 100%;
        padding: 40px;
        height: 400px;
      }

      documents-section {
        position: relative;
        width: 95%;
        display: inline-block;
        float: right;
      }

      documents-section #cmsOptions {
        position: absolute;
        width: 50vw;
        top: -60px;
        left: 20px;
      }

      documents-section #cmsOptions button {
        background: transparent;
        border: 0.2px solid;
        border-radius: 20px;
        padding: 10px 40px;
        margin-right: 15px;
      }

      documents-section #cmsArea {
        padding-top: 40px;
        padding-left: 20px;
        padding-bottom: 100px;
      }

      documents-section #cmsArea p {
        display: inline-block;
        position: relative;
        width: 95%;
        border-radius: 20px;
        margin-top: 0;
        padding: 20px;
        box-shadow: 0vw 10px 10px #00000057;
        color: #00000078;
        position: relative;
        display: inline-block;
        font-size: 20px;
      }

      documents-section #cmsArea p b {
        font-size: 24px;
        margin-bottom: 5px;
        color: #000;
      }

      documents-section #cmsArea p span {
        display: inline-block;
        margin-bottom: 20px;
      }

      add-document input[placeholder="field"] {
        display: inline-block;
        width: 100%;
        border: none;
        padding: 20px;
        box-sizing: border-box;
        outline: none;
        font-size: 40px;
      }

      add-document input[placeholder="value"] {
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        border: none;
        outline: none;
        padding: 20px;
        font-size: 20px;
      }

      add-document button {
        background: transparent;
        padding: 10px 40px;
        margin-right: 20px;
        cursor: pointer;
        border: 0.2px solid;
        border-radius: 20px;
      }

      documents-section #cmsArea p #buttonContainer {
        position: absolute;
        right: 20px;
        top: 20px;
      }

      documents-section #cmsArea p button {
        border-radius: 20px;
        cursor: pointer;
        border: 0.2px solid;
        background: transparent;
        padding: 10px 40px;
      }

      /* Let's get this party started */
      ::-webkit-scrollbar {
        width: 12px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        -webkit-border-radius: 10px;
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: #222;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      }
      ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255, 0, 0, 0.4);
      }
    `;
  }

  firstUpdated() {
    this.U = global.uponJS_instance[this.appName];

    this.U.query({ $readDBconfig: null }, true)
      .then((apiData) => {
        if (!apiData) return (this.dbData = []);

        this.dbData = JSON.parse(apiData.DBs);
        console.log(this.dbData);
      })
      .catch((error) => {
        console.log(error);
        this.showMessage = error.message;
      });
  }

  render() {
    let U = global.uponJS_instance[this.appName];
    if (this.errorMsg)
      return html`<div id="container" data-display="${this.display}">
        ${this.errorMsg}
      </div>`;

    return html`



            <div id='container' data-display='${this.display}'>

            <div id='header'>
       
            <button @click="${() => {
              U.openBackendEditor();
            }}">Setup Backend </button>
              
              <button @click="${() => {
                U.developerLogout();
              }}">Logout as Developer </button>

              <button @click="${() => {
                U.developerLogout();
              }}">Logout as User </button>

              <button @click="${
                U.promptUploadHostFiles
              }">Upload secondary Files</button>

            
            </div>

            <console-logs appName="${this.appName}"></console-logs>

      

              </div>

            </div>
            `;
  }
}
customElements.define("admin-pannel", adminPannel);

class consoleLogs extends LitElement {
  static get properties() {
    return {
      logs: Object,
      appName: String,
    };
  }

  constructor() {
    super();
    this.refresh = this.refresh.bind(this);
  }

  firstUpdated() {
    this.refresh();
  }
  refresh() {
    console.log(this.appName, "aaaaa", global);
    let U = global.uponJS_instance[this.appName];

    U.query({ $readLogs: 10 }, true)
      .then((data) => {
        this.logs = data;
      })
      .catch((error) => {
        console.log(error);
        this.logs = [{ log: error.message }];
      });
  }

  static get styles() {
    return css`
      #console {
        background: #2d2c2c;
        color: #ffffff87;
        margin-bottom: 1vw;
        padding: 24px;
        border-radius: 20px;
      }

      button {
        padding: 10px 20px;
        border-radius: 20px;
        border: 2px solid #222;
        background: transparent;
        float: right;
      }
    `;
  }

  render() {
    let logs = this.logs;

    if (logs) logs.push({ log: "Log is empty" });
    return html`
      <h1>Console</h1>
      ${logs
        ? html`
            <div id="console">
              ${logs.map((item) => {
                return html`${item.log}<br />`;
              })}
            </div>
          `
        : html`Loading...`}

      <button @click="${this.refresh.bind(this)}">Refresh</button>
    `;
  }
}

customElements.define("console-logs", consoleLogs);

//window.U.ask([{ h3: " ⚙️ Settings" }, { p: "<admin-pannel> </admin-pannel>" }]);
