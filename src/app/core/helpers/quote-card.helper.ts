export class QuoteCardHelpers {

  private static readonly cardsPerPage = 8;

  private static readonly colorGradients = [
    'blue-gradient',
    'ripe-malinka-gradient',
    'tempting-azure-gradient',
    'night-fade-gradient',
    'sunny-morning-gradient',
    'dusty-grass-gradient',
    'winter-neva-gradient',
    'young-passion-gradient'
  ];

  static getColorClass(index: number) {
    return this.colorGradients[index % this.cardsPerPage];
  }

}
