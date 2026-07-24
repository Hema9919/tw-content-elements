export interface FaqItem {
  /** The question text shown on the vertical column and as the answer header */
  question: string;
  /** The answer body. Use \n for line breaks — they are rendered as <br> */
  answer: string;
}
