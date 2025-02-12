import { templates, wordBank } from './words.js';
import { sentenceGenerator } from './Algorithm.js';

const getPriorityCategories = (essayType) => {
  const categoryPriority = {
    research: ['topic', 'context', 'concept1', 'concept2'],
    expository: ['commonThing', 'field', 'technology', 'situation'],
    analytical: ['subject1', 'subject2', 'debateTopic', 'realWorldThing'],
    narrative: ['character', 'setting', 'surprise', 'unusualPower']
  };
  return categoryPriority[essayType] || [];
};

const generateTitle = (substitutions, essayType) => {
  const priorityCategories = getPriorityCategories(essayType);
  const uniqueWords = [];
  const usedWords = new Set();

  //priority words first
  priorityCategories.forEach(category => {
    const sub = substitutions.find(s => s.category === category);
    if (sub && !usedWords.has(sub.word)) { //sometimes doesnt work?
      uniqueWords.push(sub.word);
      usedWords.add(sub.word);
    }
  });

  //fill in the rest
  substitutions.forEach(({ word }) => {
    if (uniqueWords.length < 2 && !usedWords.has(word)) { //doesnt work either sometimes
      uniqueWords.push(word);
      usedWords.add(word);
    }
  });

  const titlePrefixes = {
    research: ['Study of', 'Research on', 'Analysis of'],
    expository: ['Understanding', 'Guide to', 'Inside Look at'],
    analytical: ['Examining', 'Perspective on', 'Critical View of'],
    narrative: ['Story:', 'Tale of', 'Chronicle:']
  };

  const prefix = titlePrefixes[essayType][Math.floor(Math.random() * 3)];
  return uniqueWords.length > 0 
    ? `${prefix} ${uniqueWords.slice(0, 2).join(' & ')}` 
    : prefix;
};

function generateSentence() {
  const essayType = document.getElementById('essayType').value;
  const template = templates[essayType][Math.floor(Math.random() * templates[essayType].length)];
  const { sentence, substitutions } = sentenceGenerator.replacePlaceholders(template, wordBank);
  
  const resultElement = document.getElementById('result');
  const titleElement = document.getElementById('ideaTitle');
  
  //gen and display title
  const title = generateTitle(substitutions, essayType);
  titleElement.textContent = title;
  
  //result
  resultElement.style.animation = 'none';
  void resultElement.offsetWidth;
  resultElement.style.animation = 'fadeIn 0.5s';
  resultElement.innerText = sentence;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generateBtn').addEventListener('click', generateSentence);
});