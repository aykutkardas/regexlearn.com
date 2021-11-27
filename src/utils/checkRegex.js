import _ from 'lodash';

function checkRegex(data, { regex, flags }) {
  try {
    let $regex = regex;
    [...$regex.matchAll(/\\(\d+)/g)].reverse().forEach(item => {
      $regex = $regex.replace(
        `\\${item[1]}`,
        `\\${parseInt(item[1], 10) + 1}`,
      );
    });
    const reg = new RegExp(`(${$regex})`, flags);
    const matchType = flags?.includes('g') ? 'matchAll' : 'match';
    const isMatchAll = matchType === 'matchAll';
    const regResult = [...data.content[matchType](reg)]
      .map(res => (isMatchAll ? res[0] : res))
      .filter(res => !!res);

    const isMatch =
      data.answer &&
      data.answer.length === regResult.length &&
      _.isEmpty(_.xor(data.answer, regResult));

    const isSuccess =
      isMatch &&
      (data.regex.includes(regex) || data.customValidate?.(regex)) &&
      _.isEmpty(_.xor(data.flags.split(''), flags.split('')));

    return { isMatch, isSuccess, $regex: reg };
  } catch (err) {
    console.error(err);
    return { err };
  }
}

export default checkRegex;
