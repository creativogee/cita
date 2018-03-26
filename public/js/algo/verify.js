export const verify = (intextRef, authoursAndYear, title, journal, edition, pages) => {
  let markup = `${authoursAndYear} ${title} <i>${journal}</i> <b>${edition}</b> ${pages}`;

  if (markup === result.innerHTML) {
    throw 'Your result is ready';
  }
  if (!intextRef || !authoursAndYear || !title || !journal) {
    throw 'Opps! There was an error. Please try another citation';
  }
};
