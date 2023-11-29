export const highlightSearchKeyword = (text: string, keyword: string) => {
  const indexOfOriginal = text.indexOf(keyword);

  if (indexOfOriginal > -1) {
    return text.replace(keyword, `<span class="highlight-text">${keyword}</span>`);
  }

  const indexOfLower = text.toLowerCase().indexOf(keyword.toLowerCase());

  if (indexOfLower >= 0) {
    const originalKeyword = text.slice(indexOfLower, indexOfLower + keyword.length);

    if (originalKeyword) {
      return text.replace(originalKeyword, `<span class="highlight-text">${originalKeyword}</span>`);
    }
  }

  return text.replace(keyword, `<span class="highlight-text">${keyword}</span>`);
};
