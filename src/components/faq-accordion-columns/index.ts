import { html, LitElement, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { componentStyles } from './styles';
import type { FaqItem } from './types';

/**
 * FAQ Accordion — Greek Columns style.
 *
 * All content and appearance is controlled through public properties, which
 * map 1:1 to the merchant-facing fields defined for this component in
 * twilight-bundle.json (see settings.example.json next to this file):
 *
 *  - sectionTitle     → text field
 *  - items            → collection field (unlimited questions/answers)
 *  - desktopImage     → image field (used on screens > 991px)
 *  - mobileImage      → image field (used on screens <= 991px)
 *  - titleColor / subtitleColor / borderColor / cardBgColor /
 *    overlayColor / answerTitleColor / answerTextColor → color fields
 */
export default class FaqAccordionColumns extends LitElement {
  static styles = componentStyles;

  @property({ type: String, attribute: 'section-title' })
  sectionTitle = 'الأسئلة الشائعة';

  @property({ type: Array })
  items: FaqItem[] = [];

  @property({ type: String, attribute: 'desktop-image' })
  desktopImage = '';

  @property({ type: String, attribute: 'mobile-image' })
  mobileImage = '';

  @property({ type: String, attribute: 'title-color' })
  titleColor = '#261d1d';

  @property({ type: String, attribute: 'subtitle-color' })
  subtitleColor = '#8e5c5c';

  @property({ type: String, attribute: 'border-color' })
  borderColor = '#ece1d7';

  @property({ type: String, attribute: 'card-bg-color' })
  cardBgColor = '#ffffff';

  @property({ type: String, attribute: 'overlay-color' })
  overlayColor = 'rgba(0,0,0,.35)';

  @property({ type: String, attribute: 'answer-title-color' })
  answerTitleColor = '#261d1d';

  @property({ type: String, attribute: 'answer-text-color' })
  answerTextColor = '#5b514d';

  /** Index of the currently open item. -1 means all closed. */
  @state()
  private activeIndex = 0;

  protected updated(changed: PropertyValues) {
    if (
      changed.has('titleColor') ||
      changed.has('subtitleColor') ||
      changed.has('borderColor') ||
      changed.has('cardBgColor') ||
      changed.has('overlayColor') ||
      changed.has('answerTitleColor') ||
      changed.has('answerTextColor')
    ) {
      this.style.setProperty('--faq-title-color', this.titleColor);
      this.style.setProperty('--faq-subtitle-color', this.subtitleColor);
      this.style.setProperty('--faq-border-color', this.borderColor);
      this.style.setProperty('--faq-card-bg', this.cardBgColor);
      this.style.setProperty('--faq-overlay-color', this.overlayColor);
      this.style.setProperty('--faq-answer-title-color', this.answerTitleColor);
      this.style.setProperty('--faq-answer-text-color', this.answerTextColor);
    }
  }

  private toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }

  private renderAnswerLines(answer: string) {
    const lines = answer.split('\n');
    return lines.map(
      (line, i) => html`${line}${i < lines.length - 1 ? html`<br />` : ''}`
    );
  }

  render() {
    if (!this.items?.length) return html``;

    return html`
      <section class="faq-section" dir="rtl">
        <div class="faq-container">
          <div class="faq-title">
            <h2>${this.sectionTitle}</h2>
          </div>

          <div class="faq-list">
            ${this.items.map(
              (faq, index) => html`
                <div class="faq-item ${this.activeIndex === index ? 'active' : ''}">
                  <div class="faq-column" @click=${() => this.toggle(index)}>
                    ${this.desktopImage
                      ? html`<img class="col-img col-img--desktop" src=${this.desktopImage} alt="" />`
                      : ''}
                    ${this.mobileImage
                      ? html`<img class="col-img col-img--mobile" src=${this.mobileImage} alt="" />`
                      : ''}
                    <div class="column-question">${faq.question}</div>
                  </div>

                  <div class="faq-answer">
                    <div class="answer-card">
                      <h3 class="answer-question">${faq.question}</h3>
                      <div class="answer-body">${this.renderAnswerLines(faq.answer)}</div>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }
}

// ملحوظة: لا تحتاج لاستدعاء customElements.define يدويًا — الـ Vite plugin
// (sallaTransformPlugin) في starter kit بيسجل العنصر تلقائيًا باسم المجلد
// (faq-accordion-columns) وقت البناء.
