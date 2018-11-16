export class CardUtils {

  private static readonly cardsPerPage = 8;

  private static readonly colorGradients = [
    'blue-gradient',
    'ripe-malinka-gradient',
    'tempting-azure-gradient',
    'mean-fruit-gradient',
    'sunny-morning-gradient',
    'winter-neva-gradient',
    'young-passion-gradient',
    'dusty-grass-gradient'
  ];

  static getColorClass(index: number) {
    // return this.colorGradients[index % this.cardsPerPage];
    return 'blue-gradient';
  }

}
