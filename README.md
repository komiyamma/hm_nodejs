# hmEdgeJS

![hmEdgeJS v2.0.5](https://img.shields.io/badge/hmEdgeJS-v2.0.5-6479ff.svg)
[![Apache 2.0](https://img.shields.io/badge/license-Apache_2.0-blue.svg?style=flat)](LICENSE)
![Hidemaru 8.73](https://img.shields.io/badge/Hidemaru-v8.73-6479ff.svg)
![Node.js 11.15.0](https://img.shields.io/badge/Node.js-v11.15.0-6479ff.svg?logo=node.js&logoColor=white)

「秀丸マクロ」と「Node.js」をシームレスに近い形で利用するためのライブラリとなります。

[https://秀丸マクロ.net/?page=nobu_tool_hm_edgejs](https://秀丸マクロ.net/?page=nobu_tool_hm_edgejs)

## 概要

`hmEdgeJS`は、高機能テキストエディタ「秀丸エディタ」のマクロ機能から、Node.jsのパワフルな機能とエコシステムをシームレスに利用するためのライブラリです。
これにより、秀丸マクロでは困難だった複雑な処理や、豊富なnpmパッケージを利用した機能拡張を、JavaScriptで簡単に記述できます。

## 主な機能

- **Node.jsとの連携**: 秀丸マクロからNode.jsのスクリプトを直接呼び出し、実行できます。
- **npmパッケージの利用**: `require`を通じて、ファイル操作、ネットワーク通信、画像処理など、多種多様なnpmパッケージを利用可能です。
- **秀丸エディタの操作**: JavaScript側から、編集中のテキスト、カーソル位置、アウトプット枠、マクロ変数など、秀丸エディタの様々な要素を操作できます。
- **双方向の連携**: 秀丸マクロの変数をJavaScriptで読み書きしたり、JavaScript側から秀丸マクロのコマンドを実行したりと、双方向の緊密な連携が可能です。

## 動作環境

- **秀丸エディタ**: ver8.73 以上 (ver8.98以上を強く推奨)
- **.NET Framework**: 4.5 以上
- **Microsoft VC++ 再頒布可能パッケージ**: [Visual Studio 2017 の Microsoft Visual C++ 再頒布可能パッケージ](https://learn.microsoft.com/ja-jp/cpp/windows/latest-supported-vc-redist)
  - ご利用の秀丸エディタのビット版（x86 or x64）に合わせてインストールしてください。

## インストール

1.  お使いの秀丸エディタのビット数に対応するインストーラーをダウンロードします。
    - [hmEdgeJSSetup_x86.msi](https://xn--pckzexbx21r8q9b.net/other_soft/hm_edgejs/hmEdgeJSSetup_x86.msi) (32bit版秀丸エディタ用)
    - [hmEdgeJSSetup_x64.msi](https://xn--pckzexbx21r8q9b.net/other_soft/hm_edgejs/hmEdgeJSSetup_x64.msi) (64bit版秀丸エディタ用)
2.  ダウンロードしたインストーラーを実行し、**秀丸エディタの実行ファイル(`hidemaru.exe`)があるフォルダ**をインストール先に指定してください。

## 使い方

`hmEdgeJS`を利用するには、秀丸マクロ（`.mac`）と、Node.jsスクリプト（`.js`）の2つのファイルを用意します。

#### 秀丸マクロ側 (例: `mytest.mac`)

```macromates
// hmEdgeJS.dllをロード
#NODE = loaddll( hidemarudir + @"\hmEdgeJS" );
if(#NODE == 0) {
    message "hmEdgeJS.dllの読み込みに失敗しました。";
    endmacro;
}

// Node.jsスクリプトを実行
// DoFileの第２引数で、実行したいjsファイルのパスを指定
#r = dllfuncw( #NODE, "DoFile", currentmacrodirectory + @"\mytest.js" );

// dllを解放
freedll(#NODE);

// JavaScript側で設定されたマクロ変数を表示
message "JavaScript側で設定された変数 $abc の値は、「" + $abc + "」です。";
```

#### Node.js側 (例: `mytest.js`)

```javascript
const util = require('util');

// 秀丸エディタの各種機能にアクセスするための `hm` オブジェクトが利用可能です
// console.log('hm object:', hm);

// 秀丸マクロの `message` 関数を呼び出す
hm.Macro.Eval('message "Hello from Node.js!";');

// 秀丸マクロの変数を読み取る
const currentFile = hm.Macro.Var["$$h"]; // $$hは現在編集中のファイルパスを保持するシステム変数
console.log('Current file:', currentFile);

// 秀丸マクロの変数に値を設定する
hm.Macro.Var["$abc"] = "Node.jsから設定した文字列です。";

// アウトプット枠に文字列を出力
hm.OutputPane.Output(util.format('This message is shown in the output pane. Timestamp: %d', Date.now()));

// 秀丸エディタのカーソルを 1行目 1列目に移動
hm.Edit.MoveTo(1, 1);
```

## 制限事項

- 実行するマクロファイルやJavaScriptファイルが保存されているフォルダのパスに、**日本語（マルチバイト文字）が含まれていると正常に動作しません。**
  ファイルは英数字のパスを持つフォルダに保存してください。

## ライセンス

このプロジェクトは **Apache License 2.0** の下で公開されています。
詳細は [License.txt](License.txt) をご覧ください。

## 詳細情報

より詳しい使い方、APIリファレンス、応用例については、以下の公式サイトをご覧ください。

[https://秀丸マクロ.net/?page=nobu_tool_hm_edgejs](https://秀丸マクロ.net/?page=nobu_tool_hm_edgejs)