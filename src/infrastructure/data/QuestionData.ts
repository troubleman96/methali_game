// Infrastructure Layer - Question Data Source
// Dynamically loads data from JSON files and generates distractors with HTML formatting

import { Question, QuestionType } from '@domain/entities/Question';
import methaliData from '../../json/methali.json';
import nahauData from '../../json/nahau.json';
import vitendawiliData from '../../json/vitendawili.json';

const shuffle = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getOptions = (correct: string, allAnswers: string[]): string[] => {
  const distractors = Array.from(new Set(allAnswers.filter(a => a !== correct && a.trim() !== '')));
  const selected = shuffle(distractors).slice(0, 3);
  return shuffle([correct, ...selected]);
};

// Process Methali
const allMethaliAnswers = methaliData.map(m => {
  const parts = m.text.split(/,\s*/);
  return parts.length > 1 ? parts[parts.length - 1] : m.text;
});

const processedMethali: Question[] = methaliData.map(m => {
  const parts = m.text.split(/,\s*/);
  const answer = parts.length > 1 ? parts.pop()! : m.text;
  const riddleText = parts.length > 0 ? parts.join(', ') + '...' : 'Kamilisha methali hii';
  return {
    id: `m-${m.id}`,
    type: 'Methali' as QuestionType,
    riddle: `Kamilisha: <b>"${riddleText}"</b>`,
    answer,
    options: getOptions(answer, allMethaliAnswers),
    hint: 'Sikiliza hekima ya wahenga.'
  };
});

// Process Nahau
const allNahauAnswers = nahauData.map(n => n.maana);

const processedNahau: Question[] = nahauData.map(n => ({
  id: `n-${n.id}`,
  type: 'Nahau' as QuestionType,
  riddle: `Maana ya nahau <br><b>"${n.nahau}"</b> ni:`,
  answer: n.maana,
  options: getOptions(n.maana, allNahauAnswers),
  hint: 'Fikiri maana ya ndani.'
}));

// Process Vitendawili
const allVitendawiliAnswers = vitendawiliData.map(v => v.jibu);

const processedVitendawili: Question[] = vitendawiliData.map(v => ({
  id: `v-${v.id}`,
  type: 'Kitendawili' as QuestionType,
  riddle: `<b>"${v.kitendawili}"</b>`,
  answer: v.jibu,
  options: getOptions(v.jibu, allVitendawiliAnswers),
  hint: 'Tega na kutegua!'
}));

export const QUESTION_DATA: Question[] = [
  ...processedVitendawili,
  ...processedNahau,
  ...processedMethali
];