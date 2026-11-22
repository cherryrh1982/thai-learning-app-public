import assert from 'node:assert/strict';
import test from 'node:test';
import { findLesson, lessons } from '../src/lessons.ts';

test('すべての例文に発音と単語別の解説がある', () => {
  for (const lesson of lessons) {
    assert.equal(findLesson(lesson.japanese), lesson);
    assert.ok(lesson.roman && lesson.kana);
    assert.equal(lesson.words.map(([thai]) => thai).join(''), lesson.thai);
    assert.equal(lesson.words.at(-1)[0], 'ครับ');
    for (const word of lesson.words) {
      assert.equal(word.length, 4);
      assert.ok(word.every(Boolean));
    }
  }
});

test('前後の空白や文末記号、登録済みの言い換えを扱う', () => {
  assert.equal(findLesson('　ありがとう！　'), lessons[1]);
  assert.equal(findLesson('会議は何時に始まりますか?'), lessons[3]);
  assert.equal(findLesson('こんばんは。'), lessons[0]);
});

test('未登録の文章に別の例文の翻訳を返さない', () => {
  assert.equal(findLesson('明日は何時に出社しますか？'), undefined);
  assert.equal(findLesson('ありがとうございます。明日もよろしくお願いします。'), undefined);
  assert.equal(findLesson('　'), undefined);
});
