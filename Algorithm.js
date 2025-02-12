export const sentenceGenerator = {
  replacePlaceholders: (template, wordBank) => {
    const substitutions = [];
    const sentence = template.replace(/\[(.*?)\]/g, (match, category) => { // dont forget to fix later
      const words = wordBank[category] || ["relevant concept"];
      const chosenWord = words[Math.floor(Math.random() * words.length)];
      substitutions.push({ category, word: chosenWord });
      return chosenWord;
    });
    return { sentence, substitutions };
  }
};