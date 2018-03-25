export const createIntext = (newPartOne) => {
  let intextRef;

  if (newPartOne.length > 2) {
    const firstAuthor = newPartOne[0];
    const yearinbracks = newPartOne[newPartOne.length - 1];
    const yearoutbracks = yearinbracks.slice(1, yearinbracks.length - 2);
    intextRef = `(${firstAuthor} <i>et al</i>, ${yearoutbracks})`;
  } else {
    intextRef = `(${firstAuthor}, ${yearoutbracks})`;
  }

  return { intextRef };
};
