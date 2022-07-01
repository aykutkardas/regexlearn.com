import isEmpty from 'lodash.isempty';
import xor from 'lodash.xor';

const createGrouppedRegex = (regex: string, flags?: string) => {
  const matches = [...regex.matchAll(/\\(\d+)/g)]
    .map(item => Number(item[1]))
    .sort((a, b) => b - a);

  let newRegex = regex;

  matches.forEach(number => {
    newRegex = newRegex.replace(`\\${number}`, `\\${number + 1}`);
  });

  return new RegExp(`(${newRegex})`, flags);
};

type CheckRegex = (
  data,
  regexObj: { regex: string; flags?: string },
) => {
  err?: Error;
  isMatch?: boolean;
  isSuccess?: boolean;
  regex?: RegExp;
};

const checkRegex: CheckRegex = (data, { regex, flags }) => {
  const isGlobal = flags?.includes('g');
  const isValidRegex = data.regex.includes(regex) || data.customValidate?.(regex);
  const isValidFlags = isEmpty(xor(data.flags.split(''), flags.split('')));

  try {
    const grouppedRegex = createGrouppedRegex(regex, flags);
    let results;

    if (isGlobal) {
      results = [...data.content.matchAll(grouppedRegex)].map(result => result[0]).filter(Boolean);
    } else {
      results = [...data.content.match(grouppedRegex)].filter(Boolean);
    }

    const isMatch = data.answer?.length === results.length && isEmpty(xor(data.answer, results));
    const isSuccess = isMatch && isValidRegex && isValidFlags;

    return { isMatch, isSuccess, regex: grouppedRegex };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

export default checkRegex;
