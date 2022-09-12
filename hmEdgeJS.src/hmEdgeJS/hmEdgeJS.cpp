/* 
 * Copyright (c) 2016-2018 Akitsugu Komiyama
 * under the Apache License Version 2.0
 */

#include <windows.h>
#include <string>

#include "string_converter.h"
#include "hidemaruexe_export.h"
#include "hmEdgeJS.h"
#include "hmEdgeJSStatlcLib.h"


using namespace std;
using namespace System;

extern HMODULE hSelfDllModule;


// 上の手動のBindDllHandleを自動で行う。秀丸8.66以上
// １回だけ実行すれば良いわけではない。dllが読み込まれている間にもdll値が変わってしまうかもしれないため。(将来の実装では)
// よって、DoStringとDoFileの時を契機に更新する。
static bool BindDllHandle() {
	// 秀丸8.66以上
	if (Hidemaru_GetDllFuncCalledType) {
		int dll = Hidemaru_GetDllFuncCalledType(-1); // 自分のdllの呼ばれ方をチェック

		// Hidemaru_GetDllFuncCalledTypeについては、別の存在でありながら成り立たせるために、呼ばれ方情報だけは結びつけています。
		// 0x80000001みたいな、32bitの最上位ビットが立ったIDにしていて、マクロ側loaddllのIDと被らないようにしています。10進だとマイナス値でわかりにくいですね。
		if ((dll & 0x80000000) != 0) {
			wstring errmsg = L"「jsmode」の「hidemaru.loadDll(...)」からの呼び出しを検知しました。\n「jsmode」の「loadDll経由の呼び出し」には対応していません。\n"
				L"「jsmode」から呼び出すには、「hidemaruCompat.loaddll(...)」を利用してください。\n"
				L"https://秀丸マクロ.net/?page=nobu_tool_hm_jsmode_hidemarucompat\n";
			MessageBox(NULL, errmsg.c_str(), L"「hmEdgeJS.dll」の「jsmode」からの呼び出し", NULL);
			OutputDebugStringW(errmsg.c_str());
		}

		IEdgeJSStaticLib::BindDllHandle((IntPtr)dll);
		return true;
	}
	return false;
}

bool isExpressionLoaded = false;
static bool InitializeHandle() {
	bool ret = BindDllHandle();
	if (!isExpressionLoaded && hSelfDllModule) {
		HRSRC res = FindResource(hSelfDllModule, TEXT("HMJSMODE"), TEXT("TEXT"));
		if (res) {
			char *expression = (char *)LoadResource(hSelfDllModule, res);
			if (expression) {
				String^ mng_expression = gcnew String(expression);
				IEdgeJSStaticLib::SetJSModeExpression(mng_expression);
				isExpressionLoaded = true;
			}
		}
	}
	return ret;
}


// 秀丸の変数が文字列か数値かの判定用
MACRO_DLL intHM_t SetTmpVar(const void* dynamic_value) {
	int param_type = Hidemaru_GetDllFuncCalledType(1); // 1番目の引数の型。
	if (param_type == DLLFUNCPARAM_WCHAR_PTR) {
		return (intHM_t)IEdgeJSStaticLib::SetTmpVar(gcnew String((wchar_t *)dynamic_value));
	}
	else {
		return (intHM_t)IEdgeJSStaticLib::SetTmpVar((intHM_t)dynamic_value);
	}
}

MACRO_DLL intHM_t PopNumVar() {
	intHM_t num = (intHM_t)IEdgeJSStaticLib::PopTmpVar();
	return num;
}

static wstring strvarsopop;
MACRO_DLL const TCHAR * PopStrVar() {
	auto var = (String ^)IEdgeJSStaticLib::PopTmpVar();
	strvarsopop = String_to_tstring(var);
	return strvarsopop.data();
}


MACRO_DLL intHM_t DoFile(const TCHAR *szfilename) {
	InitializeHandle();

	// ここはよく間違えるのでここだけチェック。他は秀丸8.66以降ではほとんど利用しないので無視
	if (Hidemaru_GetDllFuncCalledType) {
		auto rtn_type = Hidemaru_GetDllFuncCalledType(0); // 0は返り値の型
		if (rtn_type == DLLFUNCRETURN_CHAR_PTR || rtn_type == DLLFUNCRETURN_WCHAR_PTR) {
			MessageBox(NULL, L"返り値の型が異なります。\ndllfuncstrではなく、dllfuncw文を利用してください。", L"返り値の型が異なります", MB_ICONERROR);
		}

		auto arg_type = Hidemaru_GetDllFuncCalledType(1); // 1は1番目の引数
		if (arg_type != DLLFUNCPARAM_WCHAR_PTR) {
			MessageBox(NULL, L"引数の型が異なります。\ndllfuncではなく、dllfuncw文を利用してください。", L"引数の型が異なります", MB_ICONERROR);
		}
	}

	return (intHM_t)IEdgeJSStaticLib::DoFile(gcnew String(szfilename));
}

MACRO_DLL intHM_t DestroyScope() {
	isExpressionLoaded = false;
	return (intHM_t)IEdgeJSStaticLib::DestroyScope();
}

MACRO_DLL intHM_t DllDetachFunc_After_Hm866() {
	return DestroyScope();
}