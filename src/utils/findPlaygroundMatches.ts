export type MatchRange = { start: number; end: number };

// Finds highlight ranges in the playground text, line by line.
// Without the multiline flag, `^` only matches on the first line and `$` only on the last one.
// Without the global flag, only the first match in the whole text is returned.
const findPlaygroundMatches = (text: string, regex: string, flags: string): MatchRange[] => {
  if (!regex) return [];

  const isGlobal = flags.includes('g');
  const isMultiline = flags.includes('m');
  const lines = text.split('\n');
  const ranges: MatchRange[] = [];

  let currentRegex: RegExp;
  try {
    currentRegex = new RegExp(regex, isGlobal ? flags : `g${flags}`);
  } catch {
    return [];
  }

  let offset = 0;

  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    const lineOffset = offset;
    offset += line.length + 1;

    if (!isMultiline) {
      if (regex.startsWith('^') && row > 0) continue;
      if (regex.endsWith('$') && row < lines.length - 1) continue;
    }

    let matches = [...line.matchAll(currentRegex)];
    if (!isGlobal) matches = matches.slice(0, 1);

    matches.forEach(match => {
      if (match[0].length === 0) return;
      ranges.push({ start: lineOffset + match.index, end: lineOffset + match.index + match[0].length });
    });

    if (!isGlobal && matches.length) break;
  }

  return ranges;
};

export default findPlaygroundMatches;
