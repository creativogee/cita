import { createIntext } from '../intext.js';

export const processOne = (partOne) => {
  //new citation string parts
  let newPartOne = [];

  //identifier regular expressions
  let name = /[a-zÀ-ÖØ-öø-ÿ]{2,},$/gim;
  let initials = /^[A-Z]{1,2}\.,*$/gm;
  let yearexp = /\((.*?)\)./gim;

  //processing partOne? (required)
  partOne.map((item, index, arr) => {
    if (item.match(name)) {
      let newItem = item.replace(',', '');
      newPartOne.push(newItem);
    } else if (item.match(initials) && arr[index + 1].match(initials)) {
      let multipleInitials = arr[index].replace('.', '') + arr[index + 1].replace('.', '');
      newPartOne.push(multipleInitials);
      arr.splice(index + 1, 1);
    } else if (item.match(initials)) {
      let loneInitial = item.replace('.', '');
      newPartOne.push(loneInitial);
    } else {
      newPartOne.push(item);
    }
  });

  const { intextRef } = createIntext(newPartOne);
  let authoursAndYear = newPartOne.join(' ');

  const items = authoursAndYear.split(', ');

  //reference can only contain 6 authors
  if (items.length > 6) {
    const authors = items.splice(0, 6).join(', ');

    const year = items[0].match(yearexp);

    authoursAndYear = authors + ' <i>et al</i> ' + year;
  }

  return { intextRef, authoursAndYear };
};
