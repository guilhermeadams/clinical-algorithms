export const highlightKeyword = (text: string, keyword: string) => {
  const indexOf = text.toLowerCase().indexOf(keyword.toLowerCase());

  if (indexOf >= 0) {
    const originalKeyword = text.slice(indexOf, keyword.length);

    if (originalKeyword) {
      return text.replace(originalKeyword, `<span class="highlight-text">${originalKeyword}</span>`);
    }
  }

  return text.replace(keyword, `<span class="highlight-text">${keyword}</span>`);
};
