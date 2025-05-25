# version: 1.1
## tag
 - v1.1
## last-commit
 - d396add8013c58903724c4a539f5e77deb60841f
## what's new?
 - FE, BEのサービスをDockerから起動できるようにする

# version: 1.0
## tag
 - v1.0
## last-commit
 - c345cf2b44ef254a072bbec864d40cd0a28dd09e
## what's new?
 - FE, BEのサービスを起動できる状態にする
 - psql環境をdockerで構築でき, migrationを実行できるようにする
 - monorepo環境でenvを分離して管理しつつ、開発環境では統合envを使用できるようにする
 - 意図せぬrepoへの影響を排除することを目的に、monorepo向けにpnpm派生のコマンド: mpmを整備した
