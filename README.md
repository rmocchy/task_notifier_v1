# task_notifier_v1
## Overview
- タスクについて、時間が近づいた時に様々な方法で通知してくれるサービス
- タスク開始を通知するAPIを叩くまでタスクのリマインドをし続け、締切が近づくにつれてより強力な通知を行うようにする

## Getting Started Local
1. 環境変数系のセット
```
## setup
make setup_env
## direnv
direnv allow
```
2. 依存関係のインストール
```
pnpm install
```
1. db起動/ migration/ insert-seed-data
```
## 起動
docker compose up -d
## migration
make migrate_be_local-docker
```
1. ビルド&起動
独自コマンド`mpm`を使ってどれを起動するか選択することも可能: `mpm build/ mpm start`
- FE (注意: 終了時は"q"キーを押さないとviteの使用上code=1で終了する)
```
make start_frontend
```
- BE
```
make start_backend
```


## For developers
### 独自コマンド: mpmについて
本レポジトリはモノレポであり、各サービスごとに独自のpackage.jsonを持つ。

誤ってproject packageにinstallしてしまった等のトラブルを避けるため、mpmコマンドを用意した。

pnpmをベースに動作するためコマンドはpnpmと同じで酔いが、実行時にどのワークスペースで実行するかを確認する機能を設けた

例) mpm -v (pnpmのバージョンを返す処理)を実行した場合
```
$ mpm -v
select WorkSpace:
1) frontend
2) backend
3) global
4) cancel
#? 3 // 3を選択
exec this command now: (y: yes, r: reselect, c: cancel)
  pnpm -v
y // yキーを押下
10.11.0
```

### migration
DBはディレクトリ傘下に絶対的なスキーマとして定義され、Migration実行時にはAtlasによって自動的に差分検出されて実行される
```
make migrate_be_local-docker
```