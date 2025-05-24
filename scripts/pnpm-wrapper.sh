#!/bin/sh

# pnpmのラッパースクリプト
# モノレポ環境下において、誤って別のworkspaceに影響の及ぶコマンドを実行してしまうことを防ぐために作成

options=("frontend" "backend" "global" "cancel")

while :; do
  echo "select WorkSpace:"
  select opt in "${options[@]}"; do
    if [[ -z "$opt" ]]; then
      echo "invalid option. Please try again."
    else
      break
    fi
  done

  if [[ "$opt" == "cancel" ]]; then
    echo "canceled"
    exit 1
  fi

  if [[ "$opt" == "global" ]]; then
    CMD="pnpm $*"
  else
    CMD="pnpm $* -F $opt"
  fi

  echo "exec this command now: (y: yes, r: reselect, c: cancel)"
  echo "  $CMD"

  while :; do
    read -rn1 key
    echo
    if [[ "$key" == "r" || "$key" == "R" ]]; then
      break
    elif [[ "$key" == "c" || "$key" == "C" ]]; then
      echo "canceled"
      exit 0
    elif [[ "$key" == "y" || "$key" == "Y" ]]; then
      exec $CMD
      exit 0
    elif [[ -z "$key" ]]; then
      continue
    else
      echo "invalid key. Please try again."
      continue
    fi
  done
done
