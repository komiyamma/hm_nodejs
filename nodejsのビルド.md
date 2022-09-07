# edge_nativeclr.node のビルド
・https://github.com/komiyamma/edge-js-up_48

Powershellでedge-js/tools のディレクトリへ
npm install --save follow-redirects みたいなのする。
.\buildall.bat  で多くのバージョンが一気にコンパイルされる。






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

