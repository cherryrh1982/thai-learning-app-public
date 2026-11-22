import { StrictMode, useEffect, useRef, useState, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { findLesson, lessons } from './lessons';
import './style.css';

type Exchange = { id: number; question: string; lesson: ReturnType<typeof findLesson> };

const openingExample = lessons[2];

function App() {
  const [draft, setDraft] = useState('');
  const [history, setHistory] = useState<Exchange[]>([
    { id: 0, question: openingExample.japanese, lesson: openingExample },
  ]);
  const conversation = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (history.length > 1 && conversation.current) {
      const latest = conversation.current.lastElementChild;
      if (latest instanceof HTMLElement) {
        conversation.current.scrollTop = latest.offsetTop;
      }
    }
  }, [history]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;

    setHistory((previous) => [
      ...previous,
      { id: previous.length, question, lesson: findLesson(question) },
    ]);
    setDraft('');
    input.current?.focus();
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon" lang="th">ก</span>
          <div><h1>タイ語ノート</h1><p>日本語で学ぶ、職場のタイ語</p></div>
        </div>
        <span className="mode">例文モード</span>
      </header>

      <main className="workspace">
        <aside className="sidebar" aria-labelledby="examples">
          <h2 id="examples">例文を試す</h2>
          <p>例文を選ぶと入力欄に入ります。</p>
          <ul>{lessons.map((lesson) => (
            <li key={lesson.japanese}>
              <button type="button" onClick={() => {
                setDraft(lesson.japanese);
                input.current?.focus();
              }}>
                <span className="topic">{lesson.topic}</span>
                {lesson.japanese}
              </button>
            </li>
          ))}</ul>
        </aside>

        <section className="chat" aria-labelledby="chat-title">
          <div className="chat-header">
            <h2 id="chat-title">学習チャット</h2>
            <p>登録済みの例文に対応しています。自由入力の翻訳（AI）は未実装です。</p>
          </div>
          <div className="conversation" ref={conversation} role="log" aria-label="チャット履歴" tabIndex={0}>
            {history.map(({ id, question, lesson }) => (
              <article className="exchange" key={id}>
                <div className="question"><span>{id === 0 ? 'サンプル入力' : 'あなた'}</span><p>{question}</p></div>
                <div className="response">
                  <span className="response-label">タイ語ノート</span>
                  {lesson ? <>
                    <div className="translation">
                      <h3>タイ語訳 <span>男性の丁寧な表現</span></h3>
                      <p className="thai" lang="th">{lesson.thai}</p>
                      <dl className="readings">
                        <div><dt>ローマ字</dt><dd>{lesson.roman}</dd></div>
                        <div><dt>カタカナ</dt><dd>{lesson.kana}</dd></div>
                      </dl>
                      <p className="reading-note">ローマ字の記号は声調を表します。カタカナは発音の目安です。</p>
                    </div>
                    <h3 className="detail-heading">単語の分解</h3>
                    <ol className="segments" aria-label="タイ語の単語順">
                      {lesson.words.map(([thai], index) => <li key={index} lang="th">{thai}</li>)}
                    </ol>
                    <h3 className="detail-heading">単語の意味・発音・文法</h3>
                    <dl className="glossary">{lesson.words.map(([thai, roman, meaning, grammar], index) => (
                      <div className="word" key={index}>
                        <dt><span lang="th">{thai}</span><span className="roman">{roman}</span></dt>
                        <dd><strong>{meaning}</strong><p>{grammar}</p></dd>
                      </div>
                    ))}</dl>
                  </> : <div className="unavailable">
                    <h3>この文章は例文に登録されていません</h3>
                    <p>自由入力の翻訳（AI）は未実装です。「例文を試す」から文章を選ぶと、タイ語訳と解説を確認できます。</p>
                  </div>}
                </div>
              </article>
            ))}
          </div>
          <form className="composer" onSubmit={submit}>
            <label htmlFor="japanese">日本語の文章</label>
            <div className="input-row">
              <textarea ref={input} id="japanese" rows={2} maxLength={500}
                placeholder="例：会議は何時に始まりますか？"
                value={draft} onChange={(event) => setDraft(event.target.value)} required />
              <button type="submit" disabled={!draft.trim()}>送信</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
