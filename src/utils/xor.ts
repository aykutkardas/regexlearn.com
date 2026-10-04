// Symmetric difference of the unique values of two arrays (same semantics as lodash.xor).
// Non-array arguments are treated as empty arrays.
const xor = <T>(a?: T[] | null, b?: T[] | null): T[] => {
  const setA = new Set(Array.isArray(a) ? a : []);
  const setB = new Set(Array.isArray(b) ? b : []);

  return [...setA].filter(value => !setB.has(value)).concat([...setB].filter(value => !setA.has(value)));
};

export default xor;
