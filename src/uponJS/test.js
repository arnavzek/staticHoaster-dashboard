let ask = (elementsNotUnlined, type) => {
  //title with varying weight
  if (!type) type = "ask";
  let overlayContainerName = "#overlayUI" + type;
  //to remember if two source are trying to do something that will require login, two event listener will be set to the input box
  if (document.querySelector(overlayContainerName)) {
    document
      .querySelector(overlayContainerName)
      .parentNode.removeChild(document.querySelector(overlayContainerName));
  }

  let elements = elementsNotUnlined.map((item) => {
    return item;
  });

  class promptUI extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      let html = `

            <style>

                  .container {
                    display: block;
                    position: relative;
                    padding-left: 35px;
                    margin-bottom: 12px;
                    cursor: pointer;
                    font-size: 22px;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    font-family: sans-serif;
                    color: #787878;
                    -ms-user-select: none;
                    user-select: none;
                    margin: 60px;
                    margin-bottom: 20px;
                  }
                  
                  /* Hide the browser's default radio button */
                  .container input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                  }
                  
                  /* Create a custom radio button */
                  .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 24px;
                    width: 24px;
                  
                    background-color: #eee;
                    border-radius: 500px;
                  }
                  
                  /* On mouse-over, add a grey background color */
                  .container:hover input ~ .checkmark {
                    background-color: #ccc;
                  }
                  
                  /* When the radio button is checked, add a blue background */
                  .container input:checked ~ .checkmark {
                    background-color: #333;
                  }
                  
                  /* Create the indicator (the dot/circle - hidden when not checked) */
                  .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                  }
                  
                  /* Show the indicator (dot/circle) when checked */
                  .container input:checked ~ .checkmark:after {
                    display: block;
                  }
                  
                  /* Style the indicator (dot/circle) */
                  .container .checkmark:after {
                    top: 8px;
                    left: 8px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: white;
                  }


                  

                  label[data-type=date] {
                    margin-top: 60px;
                    display: inline-block;
                 
                    color: #999;
                    font-family: sans-serif;
                    font-size: 40px;
                  }


              .promptUi {
                background: #000000c2;
                padding: 4vh 31%;
                padding-top: 5vh;
                color: #000;
              
                position: fixed;
                overflow-y: scroll;
                border: none;
                z-index: 8000000;
                font-family: roboto;
                top: 0;
                left: 0;
                margin: 0;
                width: 100vw;
                border-radius: 0;
                box-sizing: border-box;
                height: 100vh;
              }

              #input textarea{
                resize: none;
                height:100px;
              }

              #input div[contenteditable="true"]:focus:before{
                content: '';
              }

              #input div[contenteditable="true"]:before {
                  color:#999;
                  font-family:sans-serif;
                  content: attr(data-placeholder);
                  padding-right:20px;
              }

              #input div[contenteditable="true"] span{
                padding: 5px 20px;
                color: #ffffff;
                margin: 0;
                display: inline-block;
                border: 0.20px solid;
                background: #000;
                font-weight: 100;
                margin-bottom: 20px;
                font-size: 12px;
                /* font-family: roboto; */
                border-radius: 5px;
              }

              #input div[contenteditable="true"]{
                overflow-y:scroll !important;
                height:60px !important;
                padding-top: 10px !important;
              }

              #input div[contenteditable="true"]::-webkit-scrollbar {
                display: none;
              }

              #input input,#input textarea, #input div[contenteditable="true"]{
                width: 100%;
                background: #e6e6e6a8;
                margin-top: 5%;
              
                font-size: 15px;
                padding-left: 40px;
                text-align: left;
                color: #222;
                border: none;
                padding: 20px 20px;
                overflow: hidden;
                border-radius: 5px;
                -webkit-box-sizing: unset;
                -moz-box-sizing: unset;
                box-sizing: unset;
                box-sizing: border-box;
                outline: none;
                display: flex;
                flex-direction: row;
              
                align-items: center;
                flex-wrap: wrap;
              }

              

              #input input[type="radio"]{
                margin-top: 0;
                height: 40px;
                padding: 0;
                width: 40px;
                margin: 40px 20px;
              }

              #input input[type=file] {
                  visibility: hidden;
                  position: relative;
              }

              #input input[type=file]:before {
                  width: 100%;
                  background: #fff;
                  height: 5vh;
                  font-size: 40px;
                  text-align: center;
                  color: #222;
                  border: none;
                  padding: 40px 0;
                  border-radius: 10px;
                  visibility: visible;
                  position: absolute;
                  top: 0;
                  content: attr(data-placeholder);
                  cursor:pointer;
              }

              #button button:hover{
                transform: scale(0.9);

              }

              #button button{
                transition: All ease-in 0.25s;
                width: auto;
                background: #000000;
                padding: 15px 35px;
                /* margin-right: 20px; */
                color: #fff;
                cursor: pointer;
                float: left;
                border: none;
                display: flex;
                justify-content: center;
                margin: 0;
                align-items: center;
               
                border-radius: 200px;
              }

              #button button img{
                height: 25px;
    width: 25px;
    margin: 0;
    margin-right: 10px;
    padding: 0;
              }

              #headings{
                color: #222;
                position:relative;
                font-size: 23px;
                font-family: roboto,calibri;
              }

              pre{
                background: linear-gradient(45deg, #000000, #333332);
                padding: 20px;
                color: #fff;
                border-radius: 10px;
              }

              #headings #title{
                font-size:20px;
                color:#fff;
                text-align:center;
              }

              #headings #imgpadding{
                width50%;
                height:50%;
                padding:0 25%;
                border-radius:100vw;
              }

              #headings h1,#headings h2, #headings h3{
                width: 92%;
              }



              #button{
                margin-top: 60px;
                display: flex;
                grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
                border-radius: 10px;
                grid-gap: 20px;
                margin-bottom: 30px;
                box-sizing: border-box;
                /* justify-content: space-between; */
                justify-content: flex-end;
              }

              #button button:last-child{
                border:none;
              }

              ::-webkit-scrollbar {
                width: 12px;
              }
              
              ::-webkit-scrollbar-thumb {
                  -webkit-border-radius: 10px;
                  border-radius: 10px;
                  background: rgb(0, 0, 0);
                  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
              }
                ::-webkit-scrollbar-track {
                  -webkit-border-radius: 10px;
                  border-radius: 10px;
                }
                #absoluteCloseButton {
                  position: absolute;
                  right: 0;
                  font-size: 35px;
                  font-family: roboto;
                  font-weight: 100;
                  color: #555;
                  background: transparent;
                  border: none;
                  outline:none;
                  top: 0;
                  cursor:pointer;
                  line-height: 0.7;
              }

              #promptContainer{
                border-radius: 5px;
                position:relative;
                z-index:10000000;
                padding: 2px 25px;
                background-color: rgba(255, 255, 255, .9);
              }

       

              /* if backdrop support: very transparent and blurred */
              @supports ((-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))) {
                #promptContainer{
                  background-color: rgba(255, 255, 255, .7);
                  -webkit-backdrop-filter: blur(10px);
                  backdrop-filter: blur(10px);
                }
              }

              #closeOverlay{
                
                height: 100%;
                width: 100%;
                left: 0;
                position: absolute;
                top: 0;
              }
              
                @media (max-width:800px){
          

                  .promptUi{
                    padding: 5vw;
                    padding-bottom:0;
                  }


                  #button button{
                    width:100%;
                  }

                  #button{
                    flex-wrap: wrap;
                  }
                }


              }


            </style>

            <div class='promptUi'>

            <div class="killSwitch" id="closeOverlay" > </div>

              <div id="promptContainer">
              <div id='headings'>

                <button class="killSwitch" id="absoluteCloseButton" > × </button>
              </div>
              <div id='input'>
              </div>
              <div style="display:none" id='button'>
              </div>
              </div>
            </div>
            `;

      let template = document.createElement("template");
      template.innerHTML = html;
      template = template.content;
      this.shadowRoot.appendChild(template.cloneNode(true));
    }
  }

  if (!customElements.get("prompt-ui")) {
    window.customElements.define("prompt-ui", promptUI);
  }

  let overlayContainerElement = document.createElement("div");
  overlayContainerElement.setAttribute(
    "id",
    overlayContainerName.replace("#", "")
  );
  let newPromptTag = document.createElement("prompt-ui");
  overlayContainerElement.appendChild(newPromptTag);
  document.body.appendChild(overlayContainerElement);
  let shadowDom = document
    .querySelector(overlayContainerName)
    .querySelector("prompt-ui").shadowRoot;
  let promptContainer = shadowDom.querySelector(".promptUi");

  let primaryButon = null; //required fields are not validated if secondary buttons are clicked
  let requiredFields = [];

  for (let element of elements) {
    for (let tagName in element) {
      //there is only one tag name per element

      tagName = tagName.toLowerCase();

      let newTag = document.createElement(tagName);
      let configPerElement = element[tagName];

      /*
          In heading, key is element type
          in fields key is placeholder
          in buttons key is innerHTML
        */

      if (tagName === "button" && primaryButon === null) {
        //first button is taken as primary button
        primaryButon = configPerElement["innerHTML"];
      }

      if (typeof configPerElement === "object") {
        if (configPerElement.type)
          if (configPerElement.type === "radio") {
            newTag = document.createElement("div");

            if (!configPerElement.checked) {
              configPerElement.checked = "";
            } else {
              configPerElement.checked = "checked";
            }

            newTag.innerHTML = `<label class="container">${configPerElement.value}
              <input type="radio" value="${configPerElement.value}" ${configPerElement.checked} name="${configPerElement.name}">
              <span class="checkmark"></span>
             </label>`;
          }

        if (configPerElement.type)
          if (configPerElement.type === "date") {
            newTag = document.createElement("div");

            newTag.innerHTML = `
              <label data-type="date" for="birthday">${this.caps(
                configPerElement.name
              )}</label>
              <input type="date" name="${configPerElement.name}">
              `;
          }

        if (configPerElement.name)
          if (!configPerElement.placeholder)
            configPerElement.placeholder = configPerElement.name;

        for (let attribute in configPerElement) {
          let value = configPerElement[attribute];
          if (attribute === "required") {
            let name = configPerElement.name;
            if (!name) name = configPerElement.placeholder;
            if (!name) return this.say("name not given for required field");

            requiredFields.push(name);
          } else if (attribute === "type" && value === "array") {
            newTag.setAttribute("contenteditable", true);
            newTag.addEventListener("keyup", renderArray);

            newTag.addEventListener("focusout", (event) => {
              renderArray(event, true);
            });
            //setting default array values
            if (configPerElement.value) {
              let html = "";
              for (let index of configPerElement.value) {
                html += "<span>" + index + "</span> "; //the last space is important
              }
              newTag.innerHTML = html;
            }
          } else if (attribute === "placeholder" || attribute === "name") {
            if (attribute === "placeholder") value = this.caps(value);
            newTag.setAttribute("data-" + attribute, value); //data-placeholder for divs
            newTag.setAttribute(attribute, value);
          } else if (attribute.indexOf("on") !== -1) {
            let eventType = attribute.replace("on", "");

            if (tagName === "button") {
              let intermediate = (event) => {
                let newFn = value;
                let fieldValues = GetAllFieldValues();
                if (
                  requiredOmmited(fieldValues) === false &&
                  configPerElement["innerHTML"] === primaryButon
                )
                  return this.say("required field is missing"); //a required value was ommited and a primary button was clicked
                newFn(event, fieldValues);
              };

              newTag.addEventListener(eventType, intermediate);
            } else {
              let newFn = value;

              let intermediate = (event) => {
                let fieldValue = GetAllFieldValues();
                newFn(event, fieldValue);
              };

              if (attribute.toLowerCase() === "onenter") {
                eventType = "keyup";

                let oldIntermediate = intermediate;
                intermediate = (event) => {
                  if (event.keyCode !== 13) return;
                  oldIntermediate(event);
                };
              }

              newTag.addEventListener(eventType, intermediate);
            }
          } else {
            setAttribute(attribute, value);
          }
        }
      } else {
        let defaultAttribute = "innerHTML";
        setAttribute(defaultAttribute, configPerElement);
      }

      function setAttribute(attribute, value) {
        //console.log(attribute, value);

        if (attribute === "innerHTML") return (newTag.innerHTML = value);
        newTag.setAttribute(attribute, value);
      }

      let containerName = tagName;
      if (tagName === "h1" || tagName === "h2" || tagName === "h3") {
        containerName = "headings";
      } else if (tagName === "button") {
        containerName = "button";
      } else {
        //for element divs and input, code is written in this way to be most understandable
        containerName = "input";
      }

      containerName = "#" + containerName;

      if (containerName === "#button")
        promptContainer.querySelector(containerName).style.display = "flex";

      promptContainer.querySelector(containerName).appendChild(newTag);
    }
  }

  function renderArray(event, finish) {
    if (!finish) finish = false;

    if (event.keyCode !== 32 && finish === false) return;

    let array = getArray(event.target.innerHTML);

    if (!array) return;

    event.target.innerHTML = "";

    for (let x of array) {
      event.target.innerHTML += `<span>${x}</span> `;
    }

    if (!finish) {
      event.target.innerHTML += `<span>&nbsp</span> `;

      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(
        event.target.childNodes[event.target.childNodes.length - 1],
        0
      );
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      event.target.focus();
    }
  }

  function requiredOmmited(cred) {
    for (let index of requiredFields) {
      if (!cred[index]) return false;
    }

    return true;
  }

  function getArray(html) {
    let interest = [];

    let splits = html
      .replace(/<\/span>/gi, "")
      .replace(/<span>/gi, "")
      .split(" ");

    if (splits.length <= 0) return null;

    for (let oneInterest of splits) {
      // a = a.replace(/&nbsp;/g,'').trim()
      if (!oneInterest) continue;
      console.log(oneInterest);
      let value = oneInterest.replace(/&nbsp;/gi, "");
      if (value) interest.push(value);
    }

    console.log(html, splits, splits.length, interest);

    return interest;
  }

  function GetAllFieldValues() {
    let Obj = {};
    for (let index of promptContainer.querySelectorAll(
      '#input input,#input textarea, #input div[contenteditable="true"]'
    )) {
      if (index.getAttribute("type") === "file") {
        Obj[index.getAttribute("data-name")] = index;
      } else if (index.getAttribute("contenteditable")) {
        let arrayValues = getArray(index.innerHTML);
        Obj[index.getAttribute("data-name")] = arrayValues;
        continue;
      } else if (index.getAttribute("type") === "radio") {
        Obj[index.value] = index.checked;
      } else {
        let name = index.getAttribute("data-name");
        if (!name) name = index.getAttribute("name");
        Obj[name] = index.value;
      }
    }

    return Obj;
  }

  this.currentPrompt[type] = {
    kill: () => {
      this.removeDom(newPromptTag);
    },
    dom: shadowDom,
  };

  let killSwitches = promptContainer.querySelectorAll(".killSwitch");
  killSwitches.forEach((killSwitch) => {
    killSwitch.addEventListener("click", this.currentPrompt[type].kill);
  });

  return this.currentPrompt[type];
};
