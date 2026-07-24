import { css as l, LitElement as n, html as e } from "lit";
import "lit/decorators.js";
const c = l`
  :host {
    display: block;
    /* Defaults — overridden at runtime via style.setProperty() from component properties */
    --faq-title-color: #261d1d;
    --faq-subtitle-color: #8e5c5c;
    --faq-border-color: #ece1d7;
    --faq-card-bg: #ffffff;
    --faq-overlay-color: rgba(0, 0, 0, 0.35);
    --faq-answer-title-color: #261d1d;
    --faq-answer-text-color: #5b514d;
  }

  .faq-section {
    background: transparent;
    padding: 90px 5%;
    direction: rtl;
  }

  .faq-container {
    max-width: 1400px;
    margin: auto;
  }

  .faq-title h2 {
    font-size: 42px;
    color: var(--faq-title-color);
    margin-bottom: 15px;
    font-weight: 700;
  }

  .faq-title p {
    color: var(--faq-subtitle-color);
    font-size: 18px;
  }

  .faq-list {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 16px;
  }

  .faq-item {
    display: flex;
    align-items: stretch;
    flex: 0.6;
    min-width: 110px;
    height: 460px;
    overflow: hidden;
    border-radius: 22px;
    border: 1px solid var(--faq-border-color);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
    transition: flex 0.5s ease;
    cursor: pointer;
  }

  .faq-item.active {
    flex: 4;
    background: var(--faq-card-bg);
  }

  .faq-column {
    position: relative;
    width: 110px;
    min-width: 110px;
    height: 100%;
    cursor: pointer;
    transition: 0.35s;
    overflow: hidden;
  }

  .faq-column:hover {
    transform: translateY(-4px);
  }

  .col-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: drop-shadow(0 12px 20px rgba(0, 0, 0, 0.15));
    user-select: none;
    pointer-events: none;
  }

  .col-img--mobile {
    display: none;
  }

  .column-question {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    padding: 20px 8px;
    color: #fff;
    background: var(--faq-overlay-color);
    font-size: 15px;
    font-weight: 700;
    line-height: 1.9;
    transition: opacity 0.4s ease;
  }

  .faq-item.active .column-question {
    opacity: 0;
    pointer-events: none;
  }

  .faq-answer {
    flex: 1;
    opacity: 0;
    overflow-y: auto;
    overflow-x: hidden;
    transition: opacity 0.4s ease 0.1s;
    display: flex;
    align-items: center;
  }

  .faq-item.active .faq-answer {
    opacity: 1;
  }

  .answer-card {
    padding: 30px;
    color: var(--faq-answer-text-color);
    line-height: 2.2;
    font-size: 16px;
    width: 100%;
  }

  .answer-question {
    color: var(--faq-answer-title-color);
    font-size: 19px;
    font-weight: 700;
    line-height: 1.7;
    margin: 0 0 18px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--faq-border-color);
  }

  /* ===== الموبايل: العمود فوق والإجابة تحته ===== */
  @media (max-width: 991px) {
    .faq-list {
      flex-direction: column;
      gap: 12px;
    }

    .faq-item {
      flex-direction: column;
      flex: unset;
      height: auto;
      overflow: visible;
    }

    .faq-column {
      width: 100%;
      height: 70px;
      flex: none;
    }

    .faq-item.active .faq-column {
      height: 110px;
    }

    .col-img--desktop {
      display: none;
    }

    .col-img--mobile {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: auto;
      height: 280%;
      max-width: none;
      transform: translate(-50%, -50%) rotate(90deg);
      object-fit: cover;
    }

    .faq-answer {
      flex: none;
      width: 100%;
      display: block;
      align-items: unset;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.45s ease, opacity 0.3s ease;
    }

    .faq-item.active .faq-answer {
      max-height: 900px;
      opacity: 1;
      overflow-y: auto;
    }

    .column-question {
      writing-mode: horizontal-tb;
      font-size: 14px;
    }

    .answer-card {
      padding: 20px;
      font-size: 15px;
      line-height: 2;
    }

    .answer-question {
      font-size: 16px;
      margin-bottom: 14px;
      padding-bottom: 12px;
    }

    .faq-title h2 {
      font-size: 26px;
    }

    .faq-title p {
      font-size: 14px;
    }
  }
`, r = class r extends n {
  constructor() {
    super(...arguments), this.sectionTitle = "الأسئلة الشائعة", this.items = [], this.desktopImage = "", this.mobileImage = "", this.titleColor = "#261d1d", this.subtitleColor = "#8e5c5c", this.borderColor = "#ece1d7", this.cardBgColor = "#ffffff", this.overlayColor = "rgba(0,0,0,.35)", this.answerTitleColor = "#261d1d", this.answerTextColor = "#5b514d", this.activeIndex = 0;
  }
  updated(t) {
    (t.has("titleColor") || t.has("subtitleColor") || t.has("borderColor") || t.has("cardBgColor") || t.has("overlayColor") || t.has("answerTitleColor") || t.has("answerTextColor")) && (this.style.setProperty("--faq-title-color", this.titleColor), this.style.setProperty("--faq-subtitle-color", this.subtitleColor), this.style.setProperty("--faq-border-color", this.borderColor), this.style.setProperty("--faq-card-bg", this.cardBgColor), this.style.setProperty("--faq-overlay-color", this.overlayColor), this.style.setProperty("--faq-answer-title-color", this.answerTitleColor), this.style.setProperty("--faq-answer-text-color", this.answerTextColor));
  }
  toggle(t) {
    this.activeIndex = this.activeIndex === t ? -1 : t;
  }
  renderAnswerLines(t) {
    const i = t.split(`
`);
    return i.map(
      (o, a) => e`${o}${a < i.length - 1 ? e`<br />` : ""}`
    );
  }
  render() {
    var t;
    return (t = this.items) != null && t.length ? e`
      <section class="faq-section" dir="rtl">
        <div class="faq-container">
          <div class="faq-title">
            <h2>${this.sectionTitle}</h2>
          </div>

          <div class="faq-list">
            ${this.items.map(
      (i, o) => e`
                <div class="faq-item ${this.activeIndex === o ? "active" : ""}">
                  <div class="faq-column" @click=${() => this.toggle(o)}>
                    ${this.desktopImage ? e`<img class="col-img col-img--desktop" src=${this.desktopImage} alt="" />` : ""}
                    ${this.mobileImage ? e`<img class="col-img col-img--mobile" src=${this.mobileImage} alt="" />` : ""}
                    <div class="column-question">${i.question}</div>
                  </div>

                  <div class="faq-answer">
                    <div class="answer-card">
                      <h3 class="answer-question">${i.question}</h3>
                      <div class="answer-body">${this.renderAnswerLines(i.answer)}</div>
                    </div>
                  </div>
                </div>
              `
    )}
          </div>
        </div>
      </section>
    ` : e``;
  }
};
r.styles = c;
let s = r;
typeof s < "u" && s.registerSallaComponent("salla-faq-accordion-columns");
export {
  s as default
};
