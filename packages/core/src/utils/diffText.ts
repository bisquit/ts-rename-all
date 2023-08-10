import intersect from 'just-intersect';
import remove from 'just-remove';

// https://stackoverflow.com/a/58977343
const TitleCaseRegex = /([A-Z][a-z]+)/;
const KebabCaseRegex = /(\w+)-(\w)([\w-]*)/;

export function diffText(a: string, b: string) {
  const aWords = toWords(a);
  const bWords = toWords(b);
  const sameWords = intersect(aWords, bWords);

  // TODO: support multiple
  const before = remove(aWords, sameWords).at(0) ?? '';
  const after = remove(bWords, sameWords).at(0) ?? '';

  return { before, after };
}

function toWords(str: string) {
  // TODO: support more case patterns
  if (TitleCaseRegex.test(str)) {
    return str.split(/(?=[A-Z])/);
  }
  if (KebabCaseRegex.test(str)) {
    return str.split('-');
  }
  return [];
}
