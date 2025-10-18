/**
 * Copyright 2025 zdg5063-glitch
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import './my-button.js';
/**
 * `ice-planner`
 * 
 * @demo index.html
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-planner";
  }

//**************************************************************************************************************** 
       // Lit reactive properties, these change
      static get properties() {
      return {
      ...super.properties,
      hours: { type: Number },
      coaches: { type: Number },
      players: { type: Number },
      fee: { type: Number },
      hoursFee: { type: Number }, 
      coachesFee: { type: Number },
      jerseyFee: { type: Number }, 
    };
  }

  //**************************************************************************************************************** 
      constructor() {
      super();
      this.hours = 0;
      this.coaches = 0;
      this.players = 1;
      this.fee = 0;
      this.title = "";
      this.hoursFee = 100;
      this.coachesFee = 1000;
      this.jerseyFee = 50;

      this.plannerSettings = { hours: 0, coaches: 0, players: 1, fee: 0 };


//**************************************************************************************************************** 
//URL STUFF
      // Load saved values from the URL
      const params = new URLSearchParams(window.location.search);
      this.hours = Number(params.get("hours")) || this.hours;
      this.coaches = Number(params.get("coaches")) || this.coaches;
      this.players = Number(params.get("players")) || this.players;
      this.fee = Number(params.get("fee")) || this.fee;
      this.hoursFee = Number(params.get("hoursFee")) || this.hoursFee;
      this.coachesFee = Number(params.get("coachesFee")) || this.coachesFee;
      this.jerseyFee = Number(params.get("jerseyFee")) || this.jerseyFee;


    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ice-planner.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

buildURL() {
  const baseUrl = globalThis.location.origin;
  const paramData = {
    hours: this.hours,
    coaches: this.coaches,
    players: this.players,
    fee: this.fee,
    hoursFee: this.hoursFee,
    coachesFee: this.coachesFee,
    jerseyFee: this.jerseyFee
  };
  const params = new URLSearchParams(paramData).toString();
  this.plannerSettings.url = `${baseUrl}?${params}`;
  history.replaceState(null, '', this.plannerSettings.url);
}
connectedCallback() {
  super.connectedCallback();

  // Read URL parameters if they exist
  const params = new URLSearchParams(globalThis.location.search);

  if (params.has('hours')) this.hours = Number(params.get('hours'));
  if (params.has('coaches')) this.coaches = Number(params.get('coaches'));
  if (params.has('players')) this.players = Number(params.get('players'));
  if (params.has('fee')) this.fee = Number(params.get('fee'));

  // Update the planner URL immediately after loading
  this.buildURL();
}


//**************************************************************************************************************** 
  // Lit render the HTML
  render() {
    const hoursCost = this.hours * this.hoursFee;
    const coachesCost = this.coaches * this.coachesFee;
    const playerCost = this.players * this.jerseyFee;
    const sumCost = hoursCost + coachesCost + playerCost;
    const feeAmount = sumCost * (this.fee / 100);
    const total = sumCost + feeAmount; //total = sum of all values plus fee amount added on
    
    let costPerPlayer;
    if (this.players > 0) { //if player is greater than 0 then (total / players)
    costPerPlayer = total / this.players;
    } else { //if players = 0 dont divide at all
    costPerPlayer = 0;
    }



//**************************************************************************************************************** 
    return html`
    <h1 id="teamName">Season Planner</h1>
    <img id="image" src="https://media1.thehungryjpeg.com/thumbs2/ori_3682618_seg5k6yv2ztwy0jscatb008v5n2qmvyhemjjw9xz_mosquito-esport-mascot-logo-design.png">
    
    <div class="amount-headings">
  <span class="cost-heading">Cost ($)</span>
  <span class="quantity-heading">Quantity</span>
</div>

    <p>
        <span class="label">Ice Hours</span>
        <span>
        <my-button label="-" action="subtract" @button-click=${e => this.change('hoursFee', e.detail.action)}></my-button>
        <input type="number" .value=${this.hoursFee} @input=${e => this.updateField('hoursFee', e)}>
        <my-button label="+" action="add" @button-click=${e => this.change('hoursFee', e.detail.action)}></my-button>
        
        <my-button label="-" action="subtract" @button-click=${e => this.change('hours', e.detail.action)}></my-button>
        <input type="number" .value=${this.hours} @input=${e => this.updateField('hours', e)}>
        <my-button label="+" action="add" @button-click=${e => this.change('hours', e.detail.action)}></my-button>
      </span>
      </p>


      <p>
        <span class="label">Coaches</span>
        <span>
        <my-button label="-" action="subtract" @button-click=${e => this.change('coachesFee', e.detail.action)}></my-button>
        <input type="number" .value=${this.coachesFee} @input=${e => this.updateField('coachesFee', e)}>
        <my-button label="+" action="add" @button-click=${e => this.change('coachesFee', e.detail.action)}></my-button>

        <my-button label="-" action="subtract" @button-click=${e => this.change('coaches', e.detail.action)}></my-button>
        <input type="number" .value=${this.coaches} @input=${e => this.updateField('coaches', e)}>
        <my-button label="+" action="add" @button-click=${e => this.change('coaches', e.detail.action)}></my-button>
        </span>
      </p>


      <p>
        <span class="label">Players/Jerseys</span>
        <span>
        <my-button label="-" action="subtract" @button-click=${e => this.change('jerseyFee', e.detail.action)}></my-button>
        <input type="number" .value=${this.jerseyFee} @input=${e => this.updateField('jerseyFee', e)}>
        <my-button label="+" action="add" @button-click=${e => this.change('jerseyFee', e.detail.action)}></my-button>

        <my-button label="-" action="subtract" @button-click=${e => this.change('players', e.detail.action)}></my-button>
        <input type="number" .value=${this.players} @input=${e => this.updateField('players', e)}>
        <my-button label="+" action="add" @button-click=${e => this.change('players', e.detail.action)}></my-button>
        </span>
      </p>


      <p>
        <span class="label">Fee %</span>
        <span>
        <my-button label="-" action="subtract" @button-click=${e => this.change('fee', e.detail.action)}></my-button>
        <input type="number" .value=${this.fee} @input=${e => this.updateField('fee', e)}>
        <my-button label="+" action="add" @button-click=${e => this.change('fee', e.detail.action)}></my-button>
        </span>
      </p>


      <h2 id="feeAmount"> Fees: $${feeAmount.toFixed(2)}</h2>
      <h2 id="playerTotal"> Total Per Player: $${costPerPlayer.toFixed(2)}</h2>
      <h2 id="total"> Total: $${total.toFixed(2)}</h2>

      <div class="reset-container">
  <button class="reset-button" @click=${this.resetCalculator}>Reset Calculator</button>
</div>


<div class="wrapper">
<slot></slot>
</div>`;
  }


//**************************************************************************************************************** 
  change(field, action) {
  // default increment is 1
  let increment = 1;
  this.buildURL();

  // custom increments for fee fields
  if (field === 'hoursFee') increment = 25;
  else if (field === 'coachesFee') increment = 100;
  else if (field === 'jerseyFee') increment = 5;

  if (action === 'add') {
    this[field] += increment;
  } else if (action === 'subtract') {
    // prevent going below zero
    this[field] = Math.max(0, this[field] - increment);
  }
}

  updateField(field, e) { //this is for user input, takes an input and stores it in the right value (hours, coaches, players, fees) if the conversion fails then default value is 0
    this[field] = Number(e.target.value) || 0;
    this.buildURL();
  }

  setFee(field) {
  const newFee = Number(prompt(`Enter new value for ${field.replace('Fee','')} cost:`));
  if (!isNaN(newFee) && newFee >= 0) {
    this[field] = newFee;
  } else {
    alert("Please enter a valid number!");
  }
}


//**************************************************************************************************************** 
  resetCalculator() {
  this.hours = 0;
  this.coaches = 0;
  this.players = 1;
  this.fee = 0;
  this.coachesFee = 1000;
  this.jerseyFee = 50;
  this.hoursFee = 100;
}



//**************************************************************************************************************** 
// Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      
      :host {
        display: inline-block;
        background: linear-gradient(135deg, #ffffff 0%, #f7f2ff 100%);     
        width: 500px;
      } 
      #teamName { /*SEASON PLANNER*/
        text-align: center;
        margin-top: 24px;
        color: var(--ddd-theme-default-wonderPurple); 
        font-family: var(--ddd-font-secondary);
        font-size: 16px;
        text-transform: uppercase;
      }

      img { /*TEAM IMAGE*/
        display: block;
        margin: 0 auto;
        width: 450px;
        height: 150px;
        padding-top: 0px;
        margin-top: -12px;
        padding-bottom: 24px;
      }
      p { /*ICE HOURS, COACHES, PLAYERS/JERSEYS, FEE*/
        display: flex;
        justify-content: space-between;
        margin: 8px 0;     
        border-bottom: 1px solid;
        padding: 4px 0;
        color: var(--ddd-theme-default-beaverBlue);
      }
      input { /*INPUT BOXES*/
        color: var(--ddd-theme-default-wonderPurple); 
        width: 48px;
        border-radius: 12px;
        padding: 8px;
        background-color: var(--ddd-theme-default-roarLight)
        outline: none;
        border: 2px solid var(--ddd-theme-default-wonderPurple);
        box-shadow: 0 0 6px var(--ddd-theme-default-wonderPurple);
      }
      h2{ /*FEES, TOTAL PER PLAYER, TOTAL*/
      display: flex;
        justify-content: center;
        margin: 0px;      
        padding-top: 8px;
      }
      
      .amount-headings { /*COST, QUANTITY HEADINGS*/
      display: flex;
      justify-content: space-between;
      color: var(--ddd-theme-default-opportunityGreen);
      font-size: 12px;
      padding-top: 24px;
      text-transform: uppercase;
      }

      .cost-heading {
        padding-left: 250px;
        padding-bottom: 8px;
        color: var(--ddd-theme-default-opportunityGreen);
      }

      .quantity-heading {
        color: green;
        padding-right: 50px;
      }

      p span { /*SPACE BETWEEN COST AND QUANTITY*/
      display: flex;
      align-items: center;
      gap: 6px; 
    }

    .reset-button {
      color: red;
      justify-content: right;
    }

    #total {
      color: var(--ddd-theme-default-nittanyNavy);
      font-family: var(--ddd-font-secondary);
      font-size: 36px;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: all 0.3s ease-in-out;
    }
    #feeAmount {
      color: var(--ddd-theme-default-original87Pink);
      font-family: var(--ddd-font-secondary);
      font-size: 16px;
      letter-spacing: 1px;
    }
    #playerTotal {
      color: var(--ddd-theme-default-potential70);
      font-family: var(--ddd-font-secondary);
      font-size: 16px;
      letter-spacing: 1px;
    }
    .reset-container {
      display: flex;
      justify-content: center; /* pushes button to the right */
      margin-top: 24px;
      margin-bottom: 24px;
    }
    .reset-button {
      text-decoration: underline;
      background-color: white;
      border: 2px solid red;
      border-radius: 12px;
      color: red;
      padding: 8px 12px;
      font-family: var(--ddd-font-secondary);
      
    }
    .reset-button:hover {
      background-color: var(--ddd-theme-default-wonderPurple);
      color: white;
    }

    /*Ice hours, coaches, players/jerseys/fee*/
    .label {
      font-weight: bold;
      color: var(--ddd-theme-default-wonderPurple); 
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 1px;
      width: 140px; 
      text-align: left;
      padding-left: 24px;
    }
    p .label {
      flex-shrink: 0;
      margin-right: 8px;
    }

    `];
  }
//**************************************************************************************************************** 
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}
globalThis.customElements.define(IcePlanner.tag, IcePlanner);