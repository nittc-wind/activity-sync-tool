# activity-sync-tool

## 構成
- Next.js
  - Auth.js
- google-apis

## Usage
1. Google Cloud プロジェクトを[作成](https://developers.google.com/workspace/guides/create-project?hl=ja)
2. [APIの有効化](https://console.cloud.google.com/flows/enableapi?apiid=calendar-json.googleapis.com&hl=ja)
    - 1.で作ったプロジェクトで`Google Calendar API`を有効にする
3. デスクトップ アプリケーションの認証情報を承認する
    - OAuthクライアントIDを作成し、ダウンロードしたJSONファイルを`credentials.json`として保存しリポジトリ配下に配置
    - 右のリンクを参照（https://developers.google.com/calendar/api/quickstart/nodejs?hl=ja#authorize_credentials_for_a_desktop_application）
4. 3.で作成した`credentials.json`を基に、以下のコマンドで`.env.local`を作成する。
```
touch .env.local
echo "AUTH_GOOGLE_ID={CLIENT_ID}" >> .env.local
echo "AUTH_GOOGLE_SECRET={CLIENT_SECRET} >> .env.local
```
5. 実行
```
npm i
npm run dev
```
