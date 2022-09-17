declare namespace hm {
 
    /**
     * 秀丸のバージョン。
     */
    const version: number;
                 
    /**
     * デバッグモニタへの出力。console.logと同じ。
     */
    function debuginfo(message?: any, ...optionalParams: any[]): void;
 
    namespace File {
        interface IEncoding {
            readonly HmEncode: number;
            readonly MsCodePage: number;
            readonly JsEncodingName: string;
        }
 
        interface IHidemaruStreamReader {
            readonly FilePath: string;
            readonly Encoding: IEncoding;
            Read(): string;
            Close(): void;
        }
 
        /**
         * 対象の外部ファイルを秀丸で「はじめて」オープンした際、あなたの設定の秀丸だとどのような文字コードだと判定するか
         */
        function GetEncoding(filepath: string): IEncoding;
 
        /**
         * 対象の外部ファイルを秀丸で「はじめて」オープンした際、あなたの設定の秀丸で開いた時と同じ状態でオープン
         */
        function Open(filepath: string, hm_encode?: number): IHidemaruStreamReader;
    }
 
    namespace Macro {
 
        /**
         * 複数の秀丸マクロをヒアドキュメント的に記述するための特殊な関数表記の型。
         */
        type TFnExpression = (f: any) => void;
 
        /**
         * 秀丸マクロを実行。
         */
        function Eval(expression: string | TFnExpression): {
            readonly Result: number;
            readonly Message: string;
            readonly Error: {
                readonly Message: string;
            }
        };
 
        /**
         * 秀丸マクロの変数の読み書きのための型。関数のような表記と連想配列のような表記。
         */
        interface TVar {
            (key: string): number | string;
            (key: string, value: any): void;
            [key: string]: any;
        }
 
        /**
         * 秀丸マクロの変数の読み書き。
         */
        let Var: TVar;

        interface IStatementResult {
            Result :number;
            Args: object[];
            Error: { readonly Message: string };
            Message: string;
        }
        /**
         * ステートメントの実行
         */
        let Statement: any;

        interface IFunctionResult {
            Result :number | string;
            Args: object[];
            Error: { readonly Message: string };
            Message: string;
        }
        /**
         * 関数の実行
         */
         let Function: any;

         namespace Flags {
            namespace Encode {
                const Sjis: number;
                const Utf16: number;
                const Euc: number;
                const Jis: number;
                const Utf7: number;
                const Utf8: number;
                const Utf16_be: number;
                const Euro: number;
                const Gb2312: number;
                const Big5: number;
                const Euckr: number;
                const Johab: number;
                const Easteuro: number;
                const Baltic: number;
                const Greek: number;
                const Russian: number;
                const Symbol: number;
                const Turkish: number;
                const Hebrew: number;
                const Arabic: number;
                const Thai: number;
                const Vietnamese: number;
                const Mac: number;
                const Oem: number;
                const Default: number;
                const Utf32: number;
                const Utf32_be: number;
                const Binary: number;
                const LF: number;
                const CR: number;

                const Bom: number;
                const NoBom: number;
                const Selection: number;

                const NoAddHist: number;
                const WS: number;
                const WB: number;
            }

            namespace SearchOption {
                const Word: number;
                const Casesense: number;
                const NoCasesense: number;
                const Regular: number;
                const NoRegular: number;
                const Fuzzy: number;
                const Hilight: number;
                const NoHilight: number;
                const LinkNext: number;
                const Loop: number;

                const MaskComment: number;
                const MaskIfdef: number;
                const MaskNormal: number;
                const MaskScript: number;
                const MaskString: number;
                const MaskTag: number;
                const MaskOnly: number;
                const FEnableMaskFlags: number;

                const FEnableReplace: number;
                const Ask: number;
                const NoClose: number;

                const SubDir: number;
                const Icon: number;
                const Filelist: number;
                const FullPath: number;
                const OutputSingle: number;
                const OutputSameTab: number;

                const BackUp: number;
                const Preview: number;

                const FEnableSearchOption2: number;
            }
            namespace SearchOption2 {
                const UnMatch: number;
                const InColorMarker: number;
                const FGrepFormColumn: number;
                const FGrepFormHitOnly: number;
                const FGrepFormSortDate: number;
            }
        }
    }
 
    namespace Edit {
 
        /**
         * 編集中のテキスト内容の読み書き
         */
        let TotalText: string;
 
        /**
         * 通常選択や行選択のテキスト内容の読み書き
         */
        let SelectedText: string;
 
        /**
         * カーソル行のテキスト内容の読み書き
         */
        let LineText: string;
 
        /**
         * カーソルの位置
         */
        const CursorPos: {
            readonly column: number;
            readonly lineno: number;
        };
 
        /**
         * マウスの位置に対応するカーソルの位置
         */
        const MousePos: {
            readonly column: number;
            readonly lineno: number;
            readonly x: number;
            readonly y: number;
        };
    }

    namespace OutputPane {
 
        /**
         * アウトプット枠への出力
         */
         function Output(message: string): number;
 
        /**
         * 一時退避
         */
         function Push(): number;

        /**
         * 復元
         */
         function Pop(): number;

         /**
         * クリア
         */
         function Clear(): number;

         /**
         * アウトプット枠へのコマンド実行
         */
         function SendMessage(command_id: number): number;

         /**
         * ベースディレクトリの設定
         */
         function SetBaseDir(dirpath: string): number;
    }

    namespace ExplorerPane {

        /**
         * ファイルマネージャ枠のモードの設定
         */
         function SetMode(mode: number): number;
 
        /**
         * ファイルマネージャ枠のモードの取得
         */
         function GetMode(): number;

        /**
         * ファイルマネージャ枠に指定のファイルのプロジェクトを読み込む
         */
         function LoadProject(filename: string): number;

        /**
         * ファイルマネージャ枠のプロジェクトを指定ファイルに保存
         */
         function SaveProject(filename: string): number;

        /**
         * ファイルマネージャ枠にプロジェクトを読み込んでいるならば、そのファイルパスを取得する(読み込んでいなければNoneが返る)
         */
         function GetProject(): string;

        /**
         * ファイルマネージャ枠にメッセージを送る
         */
         function SendMessage(command_id: number): number;

        /**
         * ファイルマネージャ枠が「プロジェクト」表示のとき、更新された状態であるかどうかを返します
         */
         function GetUpdated(): number;

        /**
         * ファイルマネージャ枠のカレントディレクトリを返す
         */
         function GetCurrentDir(): string;
    }

}