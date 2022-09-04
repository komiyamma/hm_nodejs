・https://github.com/komiyamma/edge-js-up_48

Powershellでedge-js/tools のディレクトリへ
npm install --save follow-redirects みたいなのする。
.\buildall.bat  でコンパイルされる。









# node.js のビルド

edgejs でサポートしているバージョンの node.js のソースをダウンロード

```
vcbuild dll openssl-no-asm
```

でdllが出来あがる。


timeGetTime 系の参照エラーが出てるようなら、
「リンク」の追加参照ライブラリとして「ws2_32.lib; winmm.lib」を追加する。
プロジェクトに追加。