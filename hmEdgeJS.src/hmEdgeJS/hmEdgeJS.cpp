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


// ��̎蓮��BindDllHandle�������ōs���B�G��8.66�ȏ�
// �P�񂾂����s����Ηǂ��킯�ł͂Ȃ��Bdll���ǂݍ��܂�Ă���Ԃɂ�dll�l���ς���Ă��܂���������Ȃ����߁B(�����̎����ł�)
// ����āADoString��DoFile�̎����_�@�ɍX�V����B
static bool BindDllHandle() {
	// �G��8.66�ȏ�
	if (Hidemaru_GetDllFuncCalledType) {
		int dll = Hidemaru_GetDllFuncCalledType(-1); // ������dll�̌Ă΂�����`�F�b�N

		// Hidemaru_GetDllFuncCalledType�ɂ��ẮA�ʂ̑��݂ł���Ȃ��琬�藧�����邽�߂ɁA�Ă΂����񂾂��͌��т��Ă��܂��B
		// 0x80000001�݂����ȁA32bit�̍ŏ�ʃr�b�g��������ID�ɂ��Ă��āA�}�N����loaddll��ID�Ɣ��Ȃ��悤�ɂ��Ă��܂��B10�i���ƃ}�C�i�X�l�ł킩��ɂ����ł��ˁB
		if ((dll & 0x80000000) != 0) {
			wstring errmsg = L"�ujsmode�v�́uhidemaru.loadDll(...)�v����̌Ăяo�������m���܂����B\n�ujsmode�v�́uloadDll�o�R�̌Ăяo���v�ɂ͑Ή����Ă��܂���B\n"
				L"�ujsmode�v����Ăяo���ɂ́A�uhidemaruCompat.loaddll(...)�v�𗘗p���Ă��������B\n"
				L"https://�G�ۃ}�N��.net/?page=nobu_tool_hm_jsmode_hidemarucompat\n";
			MessageBox(NULL, errmsg.c_str(), L"�uhmEdgeJS.dll�v�́ujsmode�v����̌Ăяo��", NULL);
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


// �G�ۂ̕ϐ��������񂩐��l���̔���p
MACRO_DLL intHM_t SetTmpVar(const void* dynamic_value) {
	int param_type = Hidemaru_GetDllFuncCalledType(1); // 1�Ԗڂ̈����̌^�B
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

	// �����͂悭�ԈႦ��̂ł��������`�F�b�N�B���͏G��8.66�ȍ~�ł͂قƂ�Ǘ��p���Ȃ��̂Ŗ���
	if (Hidemaru_GetDllFuncCalledType) {
		auto rtn_type = Hidemaru_GetDllFuncCalledType(0); // 0�͕Ԃ�l�̌^
		if (rtn_type == DLLFUNCRETURN_CHAR_PTR || rtn_type == DLLFUNCRETURN_WCHAR_PTR) {
			MessageBox(NULL, L"�Ԃ�l�̌^���قȂ�܂��B\ndllfuncstr�ł͂Ȃ��Adllfuncw���𗘗p���Ă��������B", L"�Ԃ�l�̌^���قȂ�܂�", MB_ICONERROR);
		}

		auto arg_type = Hidemaru_GetDllFuncCalledType(1); // 1��1�Ԗڂ̈���
		if (arg_type != DLLFUNCPARAM_WCHAR_PTR) {
			MessageBox(NULL, L"�����̌^���قȂ�܂��B\ndllfunc�ł͂Ȃ��Adllfuncw���𗘗p���Ă��������B", L"�����̌^���قȂ�܂�", MB_ICONERROR);
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