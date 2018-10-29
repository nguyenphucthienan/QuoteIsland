export class StringHelpers {

  static truncate(value: string, limit = 50, completeWords = true, ellipsis = '...') {
    if (!value) {
      return null;
    }

    if (value.length <= limit) {
      return value;
    }

    let lastindex = limit;
    if (completeWords) {
      lastindex = value.substr(0, limit).lastIndexOf(' ');
    }

    return `${value.substr(0, lastindex)}${ellipsis}`;
  }

}
