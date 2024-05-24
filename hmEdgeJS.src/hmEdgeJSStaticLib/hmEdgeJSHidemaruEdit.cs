/* 
 * Copyright (c) 2016-2018 Akitsugu Komiyama
 * under the Apache License Version 2.0
 */

using System;
using System.Runtime.InteropServices;
using System.Text;




// ★秀丸クラス
public sealed partial class hmEdgeJSDynamicLib
{
    public sealed partial class Hidemaru
    {
        public sealed class Edit
        {
            static Edit()
            {
                SetUnManagedDll();
            }

            // 座標型。Point型では、System.Drawingを読み込まないとダメなので負荷がある。また、x, yは秀丸に別値として存在するので、
            // あくまでも、マクロのcolumnとlinenoと一致しているという主張。なお、x, yはワープロ的な座標を拾ってくる。
            // columnやlinenoはエディタ的な座標である。
            public struct HmCursurPos
            {
                private int m_lineno;
                private int m_column;
                public HmCursurPos(int lineno, int column)
                {
                    this.m_lineno = lineno;
                    this.m_column = column;
                }
                public int column { get { return m_column; } }
                public int lineno { get { return m_lineno; } }
            }

            public struct HmMousePos
            {
                private int m_x;
                private int m_y;
                private int m_lineno;
                private int m_column;
                public HmMousePos(int x, int y, int lineno, int column)
                {
                    this.m_x = x;
                    this.m_y = y;
                    this.m_lineno = lineno;
                    this.m_column = column;
                }
                public int x { get { return m_x; } }
                public int y { get { return m_y; } }
                public int column { get { return m_column; } }
                public int lineno { get { return m_lineno; } }
            }

            [StructLayout(LayoutKind.Sequential)]
            private struct POINT
            {
                public int X;
                public int Y;
            }
            [DllImport("user32.dll", SetLastError = true)]
            [return: MarshalAs(UnmanagedType.Bool)]
            static extern bool GetCursorPos(out POINT lpPoint);


            // columnやlinenoはエディタ的な座標である。
            public static HmCursurPos GetCursorPos()
            {
                if (version < 866)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed866);
                    return new HmCursurPos(-1, -1);
                }

                int column = -1;
                int lineno = -1;
                int success = pGetCursorPosUnicode(ref lineno, ref column);
                if (success > 0)
                {
                    HmCursurPos p = new HmCursurPos(lineno, column);
                    return p;
                }

                return new HmCursurPos(-1, -1);
            }

            // columnやlinenoはエディタ的な座標である。
            public static HmMousePos GetCursorPosFromMousePos()
            {
                if (_ver < 873)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed873);
                    return new HmMousePos(-1, -1, -1, -1);
                }

                // この関数が存在しないバージョン
                if (pGetCursorPosUnicodeFromMousePos == null)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed873);
                    return new HmMousePos(-1, -1, -1, -1);
                }

                POINT lpPoint;
                bool success = GetCursorPos(out lpPoint);
                if (!success)
                {
                    lpPoint.X = -1;
                    lpPoint.Y = -1;
                }
                int column = -1;
                int lineno = -1;
                pGetCursorPosUnicodeFromMousePos(IntPtr.Zero, ref lineno, ref column);
                HmMousePos p = new HmMousePos(lpPoint.X, lpPoint.Y, lineno, column);
                return p;
            }

            public static String GetFileFullPath()
            {
                IntPtr hWndHidemaru = WindowHandle;
                if (hWndHidemaru != IntPtr.Zero)
                {
                    const int WM_USER = 0x400;
                    const int WM_HIDEMARUINFO = WM_USER + 181;
                    const int HIDEMARUINFO_GETFILEFULLPATH = 4;

                    StringBuilder sb = new StringBuilder(512);
                    bool cwch = SendMessage(hWndHidemaru, WM_HIDEMARUINFO, new IntPtr(HIDEMARUINFO_GETFILEFULLPATH), sb);
                    String filename = sb.ToString();
                    if (String.IsNullOrEmpty(filename))
                    {
                        return "";
                    }
                    else
                    {
                        return filename;
                    }
                }
                return "";
            }


            // 途中でエラーが出るかもしれないので、相応しいUnlockやFreeが出来るように内部管理用
            private enum HGlobalStatus { None, Lock, Unlock, Free };

            // 現在の秀丸の編集中のテキスト全て。元が何の文字コードでも関係なく秀丸がwchar_tのユニコードで返してくれるので、
            // String^型に入れておけば良い。
            public static String GetTotalText()
            {
                if (version < 866)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed866);
                    return "";
                }

                IntPtr hGlobal = pGetTotalTextUnicode();
                return HGlobalToString(hGlobal);
            }

            public static void SetTotalText(String value)
            {
                // 935.β6以降は、settotaltext() が実装された。
                if (version >= 935.06)
                {
                    SetTotalText2(value);
                    return;
                }

                if (version < 866)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed866);
                    return;
                }

                int dll = iDllBindHandle;

                if (dll == 0)
                {
                    throw new NullReferenceException(ErrorMsg.NoDllBindHandle866);
                }

                SetTmpVar(value);
                String cmd = ModifyFuncCallByDllType(
                    "begingroupundo;\n" +
                    "selectall;\n" +
                    "insert dllfuncstrw( {0} \"PopStrVar\" );\n" +
                    "endgroupundo;\n"
                );
                Macro._Eval(cmd);
                SetTmpVar(null);
            }


            private static void SetTotalText2(String value)
            {
                if (version < 866)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed866);
                    return;
                }

                int dll = iDllBindHandle;

                if (dll == 0)
                {
                    throw new NullReferenceException(ErrorMsg.NoDllBindHandle866);
                }


                SetTmpVar(value);
                String cmd = ModifyFuncCallByDllType(
                    "settotaltext dllfuncstrw( {0} \"PopStrVar\" );\n"
                );
                Macro._Eval(cmd);
                SetTmpVar(null);
            }


            // 現在の秀丸の選択中のテキスト。元が何の文字コードでも関係なく秀丸がwchar_tのユニコードで返してくれるので、
            // String^型に入れておけば良い。
            public static String GetSelectedText()
            {
                if (version < 866)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed866);
                    return "";
                }

                String curstr = "";
                IntPtr hGlobal = pGetSelectedTextUnicode();
                curstr = HGlobalToString(hGlobal);

                if (curstr == null)
                {
                    curstr = "";
                }
                return curstr;
            }

            public static void SetSelectedText(String value)
            {
                if (version < 866)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed866);
                    return;
                }

                int dll = iDllBindHandle;

                if (dll == 0)
                {
                    throw new NullReferenceException(ErrorMsg.NoDllBindHandle866);
                }

                SetTmpVar(value);
                String invocate = ModifyFuncCallByDllType("{0}");
                String cmd =
                    "if (selecting) {\n" +
                    "insert dllfuncstrw( " + invocate + " \"PopStrVar\" );\n" +
                    "}\n";
                Macro._Eval(cmd);
                SetTmpVar(null);
            }

            // 現在の秀丸の編集中のテキストで、カーソルがある行だけのテキスト。
            // 元が何の文字コードでも関係なく秀丸がwchar_tのユニコードで返してくれるので、
            // String^型に入れておけば良い。
            public static String GetLineText()
            {
                if (version < 866)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed866);
                    return "";
                }

                HmCursurPos p = GetCursorPos();

                IntPtr hGlobal = pGetLineTextUnicode(p.lineno);
                return HGlobalToString(hGlobal);
            }


            public static void SetLineText(String value)
            {
                if (version < 866)
                {
                    OutputDebugStream(ErrorMsg.MethodNeed866);
                    return;
                }

                int dll = iDllBindHandle;

                if (dll == 0)
                {
                    throw new NullReferenceException(ErrorMsg.NoDllBindHandle866);
                }

                SetTmpVar(value);
                var pos = GetCursorPos();
                String cmd = ModifyFuncCallByDllType(
                    "begingroupundo;\n" +
                    "selectline;\n" +
                    "insert dllfuncstrw( {0} \"PopStrVar\" );\n" +
                    "moveto2 " + pos.column + ", " + pos.lineno + ";\n" +
                    "endgroupundo;\n"
                );
                Macro._Eval(cmd);
                SetTmpVar(null);
            }
        }
    }
}
