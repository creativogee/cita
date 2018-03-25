import { processOne, processTwo, processThree, processFourFive } from './modify/index.js';
import { teardown } from './teardown.js';
import { sorting } from './sorting.js';
import { verify } from './verify.js';

export const convertCitation = (citation) => {
  try {
    if (citation === '') {
      throw 'citation field cannot be empty';
    }

    //Initial processing
    const { newCitation } = teardown(citation);

    //Splitting newCitation into five parts
    const { partOne, partTwo, partThree, partFour, partFive } = sorting(newCitation);

    //processing partOne? (required)
    const { intextRef, authoursAndYear } = processOne(partOne);

    //processing partTwo? (not required)
    const { title } = processTwo(partTwo);

    //processing partThree? (required)
    const { journal } = processThree(partThree);

    //processing partFour and partFive? (required)
    const { edition, pages } = processFourFive(partFour, partFive);

    verify(intextRef, authoursAndYear, title, journal, edition, pages);

    return { intextRef, authoursAndYear, title, journal, edition, pages };
  } catch (e) {
    return {
      error: e,
    };
  }
};
