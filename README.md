# タイ語ノート

日本人社員向けのタイ語学習チャットです。登録済みの例文を送ると、タイ語訳（男性の丁寧な表現）、ローマ字での発音、カタカナでの読み方、単語の分解、各単語の意味・発音・文法を順に表示します。

第1版は4つの例文と一部の言い換えに対応します。自由入力の翻訳（AI）は未実装です。チャット履歴は現在の画面に表示され、再読み込みすると最初の例文に戻ります。アプリの利用にログインは不要です。翻訳データはアプリに含まれており、入力した文章をサーバーに送信しません。有料APIやサーバーの契約は不要です。

## パソコンで起動する

1. [Node.js](https://nodejs.org/ja) の v24 LTS をインストールします。
2. このリポジトリを GitHub の **Code → Download ZIP** からダウンロードし、展開します。Git が使える場合は、次のコマンドでも取得できます。

   ```sh
   git clone https://github.com/cherryrh1982/thai-learning-app-public.git
   cd thai-learning-app-public
   ```

3. `package.json` が入っているフォルダーをターミナルで開き、以下を実行します。

   ```sh
   npm ci
   npm run dev
   ```

4. ターミナルに表示されたURL（通常は `http://localhost:5173/thai-learning-app-public/`）をブラウザーで開きます。終了するときはターミナルで Ctrl+C を押します。

## テストとビルド

```sh
npm test
npm run build
npm run preview
```

`npm test` は例文の登録内容、言い換え、未登録の入力を確認します。`npm run build` は型を確認してから、公開用の静的ファイルを `dist/` に生成します。`npm run preview` で公開用ビルドを手元で確認できます。

## GitHub Pages に無料で公開する

GitHub Free の公開リポジトリで利用できます。公開すると、URLを知っている社員はログイン不要で使えます。サイトと公開リポジトリの内容は誰でも閲覧できるため、例文に社内限定の情報は含めないでください。非公開のまま使う場合は、ローカルで起動するか、社内に既存の静的Webサーバーがあれば `npm run build` で生成した `dist/` の中身を配信できます。

1. リポジトリの **Settings → Pages** を開き、**Build and deployment** の **Source** に **GitHub Actions** を選びます。
2. **Actions → GitHub Pages に公開 → Run workflow** を選び、`main` ブランチで実行します。この操作はリポジトリの管理者が行います。
3. 実行が成功したら **Settings → Pages** で公開URLを確認します。通常は `https://cherryrh1982.github.io/thai-learning-app-public/` です。
4. アプリを更新する場合は、変更を `main` に反映してから同じワークフローを再実行します。

## 例文を追加する

`src/lessons.ts` の `lessons` に既存の例文と同じ形式で追加します。`aliases` に対応する言い換えを指定できます。ローマ字はタイ語の発音を示し、アクセント記号は声調を表します。カタカナは発音の目安です。
