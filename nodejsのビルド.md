# edge_nativeclr.node のビルド
・https://github.com/komiyamma/edge-js-up_48

Powershellでedge-js/tools のディレクトリへ
npm install --save follow-redirects みたいなのする。
.\buildall.bat  で多くのバージョンが一気にコンパイルされる。









# node.js のビルド

edgejs でサポートしているバージョンの node.js のソースをダウンロード

```
vcbuild dll x86 openssl-no-asm
```

でdllが出来あがる。x64は

```
vcbuild dll x64 openssl-no-asm
```


timeGetTime 系の参照エラーが出てるようなら、
ビルド中に「libnode.vcxproj」が出来るので、「Ws2_32.lib」を探して、
「winmm.lib」を付け足す。
「リンク」の追加参照ライブラリとして「ws2_32.lib; winmm.lib」を追加する。
プロジェクトに追加。