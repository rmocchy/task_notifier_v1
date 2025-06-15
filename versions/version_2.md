# version: ２.0
## tag
 - v2.0
## last-commit
 - a3ccfdc1a3db8a7e3b0b548dbaee745371a5c789
## what's new?
 - GoogleSSO認証の追加
 - BE/FEのopenapiによる通信の確立
 - cookieのコールバック関数の用意
 - DIツールをtsyringeからinversifyへ変更
 - orm?をpgtypedからprismaへ変更
 - FE/BE以上のセットを想定しないことにしたのでpackage/frontend(backend)->frontend(backend)に変更
 - BEのDIの基準をclassからinterfaceに変更: Mock化しやすくなるよ！
 - 絶対パスでのインポートができるようにエイリアス周りの設定: 将来的には相対パスインポートを禁止します