import { html, css, LitElement } from 'lit';
import { DDDSuper } from '@haxtheweb/d-d-d/d-d-d.js';

export class MyButton extends DDDSuper(LitElement) {

  
  
  static properties = {
    label: { type: String }, //in HTML can do label='+' or label='-', they can change which is why they get placed here i beleive
    action: { type: String } // add or subtract, the action can change from add or subtract or reset
  };


  constructor() {
    super();
    this.label = '+'; //default value for the button, can then define label="" in html
    this.action = 'add'; //default action of add
  }


  
  
  render() {
    return html`<button @click=${this.handleClick}>${this.label}</button>`;
  }

  
  
  
  
  //this is what makes the button work when it gets clicked
  handleClick() {
    this.dispatchEvent(new CustomEvent('button-click', { //creates a custom event called 'button-click' which is later called in html @button-click
      detail: { action: this.action } //this pulls the action from static properties and the constructor, it can be add or subtract
    }));
  }


  //CSS ...
  
  static styles = css`
    button {
      background-color: var(--ddd-theme-default-beaverBlue);
      color: white;
      border: none;
      padding: 2px 8px;
      margin: 4px;
      border-radius: 8px;
      font-size: 18px;
    }

    button:hover {
      background-color: var(--hax-primary-color-hover, #0056b3);
    }

  `;
}




customElements.define('my-button', MyButton);