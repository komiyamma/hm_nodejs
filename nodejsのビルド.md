# edge_nativeclr.node のビルド
・https://github.com/komiyamma/edge-js-up_48

Powershellでedge-js/tools のディレクトリへ
npm install --save follow-redirects みたいなのする。
.\buildall.bat  で多くのバージョンが一気にコンパイルされる。


（C:\Users\admin\.nuget\packages）の.neget フォルダのedge-js には、
11.15.0 のバイナリがあり、ia32とx64のedge_nativeclr.nodeとnode.dllがある。
ところが、なんのミスか edge_nativeclr.node は node.dllではなく、node.exe を読み込もうとするため、
ここで飛んでしまう。
バイナリで編集して、node.dllと修正する。


#node.dllが build_douleで通らない時 (timeGetTimeのビルドエラー)
node.gypの中身を編集する必要がある

diff --git a/node.gyp b/node.gyp
index 6dd9541cc5..302e9ba269 100644
--- a/node.gyp
+++ b/node.gyp
@@ -823,6 +823,7 @@
             'Dbghelp',
             'Psapi',
             'Ws2_32',
+            'Winmm'
           ],
         }],
         [ 'node_use_etw=="true"', {




edgejs系のtoolsのdownload.csは
```
using System;
using System.Net;

class Program
{
    public static void Main(string[] args)
    {
        if (args.Length != 2) {
            throw new InvalidOperationException("Usage: download.exe <url> <file>");
        }
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls13;
        Console.WriteLine("Downloading " + args[0] + " to " + args[1] + "...");
        var client = new WebClient();
        client.DownloadFile(args[0], args[1]);
        Console.WriteLine("Done.");
    }
}
```
といったように、
```
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls13;
```
が必要になっているので注意。
 

build_double.bat 9.8.0 などで対象のnodeのダウンロードとx86/x64両方のビルドが始まる。

