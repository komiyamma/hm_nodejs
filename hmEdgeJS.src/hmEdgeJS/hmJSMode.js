(function () {
 var f = 1;
 hidemaru = {};
 hidemaru.getCurrentWindowHandle = function() { return hm.WindowHandle; };

 hidemaru.getTotalText = function() { return hm.Edit.TotalText; };
 hidemaru.getLineText = function(l) { if (l==null) { l = hm.Edit.CursorPos.lineno; } var line = l-1; var text = hm.Edit.TotalText; var lines = text.match(/[^\r\n]*(\r\n|\r|\n|$)/g); if (0 <= line && line < lines.length) { return lines[line]; } else { return undefined; } };
 hidemaru.getSelectedText = function() { var selected = hm.Edit.SelectedText; if (selected == "") { return undefined; } else { return selected; } };
 hidemaru.loadTextFile = function (p) { try { var sr = hm.File.Open(p); var text = sr.Read(); sr.Close(); return text; } catch(e) { } return undefined; };
 hidemaru.saveTextFile = function (p, t, e) { return hm.File._SaveTextFile(p, t, e); };

 hidemaru.getVar = function (s) { return hm.Macro.Var(s); };
 hidemaru.setVar = function (s, v) { return hm.Macro.Var(s, v); };
 hidemaru.evalMacro = function (s) { return hm.Macro.Eval(s); };
 hidemaru.isMacroExecuting = function() { return hm.Macro.IsExecuting; };
 hidemaru.getStaticVariable = function(s, n) { return hm.Macro.GetStaticVariable(s, n); };
 hidemaru.setStaticVariable = function(s, v, n) { return hm.Macro.SetStaticVariable(s, v, n); };

 hidemaru.sendMessage = function(h, m, l, w) { return hm.Macro._SendMessage(h, m, l, w); };
 hidemaru.getCursorPos = function() { var cpos = hm.Edit.CursorPos; return [cpos.lineno, cpos.column]; };
 hidemaru.getCursorPosFromMousePos = function() { var cpos = hm.Edit.MousePos; return [cpos.lineno, cpos.column]; };

 var gtv = hidemaru.getVar;
 var evm = hidemaru.evalMacro;

 var hidemacJsGlobalStatements="var s=m+' ';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}evm(s+';###=result;');var r=gtv('###');";
 var hidemacJsGlobalStatements1s="var s=m+' ';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(i==0||typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}evm(s+';###=result;');var r=gtv('###');";
 var hidemacJsGlobalStatements1s2s="var s=m+' ';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(i==0||i==1||typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}evm(s+';###=result;');var r=gtv('###');";
 var hidemacJsGlobalStatementsAry="var s=m+' ';var ary=arguments[0];var c=0;if(arguments.length>1){c=arguments[1];}else{c=ary.length;}for(var i=0;i<c;i++){if(i>0)s+=',';var a=ary[i];if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}evm(s+';###=result;');var r=gtv('###');";
 var hidemacJsGlobalStatements1j="var s=m+' ';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(typeof(a)=='object'){a=JSON.stringify(a);}if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}evm(s+';###=result;');var r=gtv('###');"; var hidemacJsGlobalFomulaNumber1s="var s='###='+m+'(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(i==0||typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';evm(s+';');var r=gtv('###');";
 var hidemacJsGlobalFomulaNumber1s2s="var s='###='+m+'(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(i==0||i==1||typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';evm(s+';');var r=gtv('###');";
 var hidemacJsGlobalFomulaNumber3rn="var s='###='+m+'(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(i==2){s+='###3';}else if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';evm(s+';');var r=gtv('###');";
 var hidemacJsGlobalFomulaNumber="var s='###='+m;"
 +"if(arguments.length>=1){s+='(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';}"    
 +"evm(s+';');var r=gtv('###');";
 var hidemacJsGlobalFomulaString0="var s='$$$='+m+'(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';evm(s+';');var r=gtv('$$$');";
 var hidemacJsGlobalFomulaJson0="var r;var a;var s='$$$='+m+'(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';a=arguments[i];if(typeof(a)=='object'){a=JSON.stringify(a);}if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';evm(s+';');r=gtv('$$$');";
 var hidemacJsGlobalFomulaString2rn="var s='$$$='+m+'(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(i==1){s+='###2';}else if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';evm(s+';');var r=gtv('$$$');";
 var hidemacJsGlobalFomulaString="var s='$$$='+m;"
 +"if(arguments.length>=1){s+='(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';}"    
 +"evm(s+';');var r=gtv('$$$');";
 var hidemacJsGlobalFomulaSorN = "var s=m;"
 +"if(arguments.length>=1){s+='(';for(var i=0;i<arguments.length;i++){if(i>0)s+=',';var a=arguments[i];if(typeof(a)=='string'){s+='R\"\xFF('+a+')\xFF\"';}else{s+=a;}}s+=')';}"    
 +"evm('###='+s+';');var r=gtv('###');if(r==0){evm('$$$='+s+';');var rs=gtv('$$$');if(rs!='0'&&rs!=''){r=rs;}}";
 var HidemacJsGlobalNotSupport="var serr='Not supported \"'+m+'\"';hidemaruGlobal.message(serr);console.log(serr);";

 var st = hidemacJsGlobalStatements;
 var st1s = hidemacJsGlobalStatements1s;
 var st1s2s = hidemacJsGlobalStatements1s2s;
 var stary = hidemacJsGlobalStatementsAry;
 var st1j = hidemacJsGlobalStatements1j;
 var fn1s = hidemacJsGlobalFomulaNumber1s;
 var fn1s2s = hidemacJsGlobalFomulaNumber1s2s;
 var fn3rn = hidemacJsGlobalFomulaNumber3rn;
 var fn = hidemacJsGlobalFomulaNumber;
 var fs0 = hidemacJsGlobalFomulaString0;
 var fs1j = hidemacJsGlobalFomulaJson0;
 var fs2rn = hidemacJsGlobalFomulaString2rn;
 var fs = hidemacJsGlobalFomulaString;
 var fsn = hidemacJsGlobalFomulaSorN;
 var ns = HidemacJsGlobalNotSupport;

 var hg = {};
 hidemaruGlobal = hg;

 hg.result = function(){var m="result";eval(fn);return r;};if(f)result=hg.result;
 hg.version = function(){var m="version";eval(fn);return r;};if(f)version=hg.version;
 hg.platform = function(){var m="platform";eval(fn);return r;};if(f)platform=hg.platform;
 hg.darkmode = function(){var m="darkmode";eval(fn);return r;};if(f)darkmode=hg.darkmode;
 hg.findmarker = function(){var m="findmarker";eval(fs);return r;};if(f)findmarker=hg.findmarker;
 hg.diff = function(){var m="diff";eval(fs);return r;};if(f)diff=hg.diff;
 hg.reservedmultisel = function(){var m="reservedmultisel";eval(fs);return r;};if(f)reservedmultisel=hg.reservedmultisel;
 hg.regulardll = function(){var m="regulardll";eval(fs);return r;};if(f)regulardll=hg.regulardll;

 hg.x = function(){var m="x";eval(fn);return r;};if(f)x=hg.x;
 hg.y = function(){var m="y";eval(fn);return r;};if(f)y=hg.y;
 hg.column = function(){var m="column";eval(fn);return r;};if(f)column=hg.column;
 hg.column_wcs = function(){var m="column_wcs";eval(fn);return r;};if(f)column_wcs=hg.column_wcs;
 hg.column_ucs4 = function(){var m="column_ucs4";eval(fn);return r;};if(f)column_ucs4=hg.column_ucs4;
 hg.column_cmu = function(){var m="column_cmu";eval(fn);return r;};if(f)column_cmu=hg.column_cmu;
 hg.column_gcu = function(){var m="column_gcu";eval(fn);return r;};if(f)column_gcu=hg.column_gcu;
 hg.lineno = function(){var m="lineno";eval(fn);return r;};if(f)lineno=hg.lineno;
 hg.tabcolumn = function(){var m="tabcolumn";eval(fn);return r;};if(f)tabcolumn=hg.tabcolumn;
 hg.xview = function(){var m="xview";eval(fn);return r;};if(f)xview=hg.xview;
 hg.code = function(){var m="code";eval(fn);return r;};if(f)code=hg.code;
 hg.unicode = function(){var m="unicode";eval(fn);return r;};if(f)unicode=hg.unicode;
 hg.colorcode = function(){var m="colorcode";eval(fn);return r;};if(f)colorcode=hg.colorcode;
 hg.marked = function(){var m="marked";eval(fn);return r;};if(f)marked=hg.marked;
 hg.lineupdated = function(){var m="lineupdated";eval(fn);return r;};if(f)lineupdated=hg.lineupdated;
 hg.xpixel = function(){var m="xpixel";eval(fn);return r;};if(f)xpixel=hg.xpixel;
 hg.ypixel = function(){var m="ypixel";eval(fn);return r;};if(f)ypixel=hg.ypixel;
 hg.xpixel2 = function(){var m="xpixel2";eval(fn);return r;};if(f)xpixel2=hg.xpixel2;
 hg.ypixel2 = function(){var m="ypixel2";eval(fn);return r;};if(f)ypixel2=hg.ypixel2;
 hg.prevposx = function(){var m="prevposx";eval(fn);return r;};if(f)prevposx=hg.prevposx;
 hg.prevposy = function(){var m="prevposy";eval(fn);return r;};if(f)prevposy=hg.prevposy;
 hg.lastupdatedx = function(){var m="lastupdatedx";eval(fn);return r;};if(f)lastupdatedx=hg.lastupdatedx;
 hg.lastupdatedy = function(){var m="lastupdatedy";eval(fn);return r;};if(f)lastupdatedy=hg.lastupdatedy;
 hg.mousecolumn = function(){var m="mousecolumn";eval(fn);return r;};if(f)mousecolumn=hg.mousecolumn;
 hg.mouselineno = function(){var m="mouselineno";eval(fn);return r;};if(f)mouselineno=hg.mouselineno;

 hg.linecount = function(){var m="linecount";eval(fn);return r;};if(f)linecount=hg.linecount;
 hg.linecount2 = function(){var m="linecount2";eval(fn);return r;};if(f)linecount2=hg.linecount2;
 hg.linelen = function(){var m="linelen";eval(fn);return r;};if(f)linelen=hg.linelen;
 hg.linelen2 = function(){var m="linelen2";eval(fn);return r;};if(f)linelen2=hg.linelen2;
 hg.linelen_wcs = function(){var m="linelen_wcs";eval(fn);return r;};if(f)linelen_wcs=hg.linelen_wcs;
 hg.linelen_ucs4 = function(){var m="linelen_ucs4";eval(fn);return r;};if(f)linelen_ucs4=hg.linelen_ucs4;
 hg.linelen_cmu = function(){var m="linelen_cmu";eval(fn);return r;};if(f)linelen_cmu=hg.linelen_cmu;
 hg.linelen_gcu = function(){var m="linelen_gcu";eval(fn);return r;};if(f)linelen_gcu=hg.linelen_gcu;
 hg.tabcolumnmax = function(){var m="tabcolumnmax";eval(fn);return r;};if(f)tabcolumnmax=hg.tabcolumnmax;

 hg.selecting = function(){var m="selecting";eval(fn);return r;};if(f)selecting=hg.selecting;
 hg.rectselecting = function(){var m="rectselecting";eval(fn);return r;};if(f)rectselecting=hg.rectselecting;
 hg.lineselecting = function(){var m="lineselecting";eval(fn);return r;};if(f)lineselecting=hg.lineselecting;
 hg.selectionlock = function(){var m="selectionlock";eval(fn);return r;};if(f)selectionlock=hg.selectionlock;
 hg.mouseselecting = function(){var m="mouseselecting";eval(fn);return r;};if(f)mouseselecting=hg.mouseselecting;
 hg.multiselecting = function(){var m="multiselecting";eval(fn);return r;};if(f)multiselecting=hg.multiselecting;
 hg.multiselectcount = function(){var m="multiselectcount";eval(fn);return r;};if(f)multiselectcount=hg.multiselectcount;
 hg.inselecting = function(){var m="inselecting";eval(fn);return r;};if(f)inselecting=hg.inselecting;
 hg.seltopx = function(){var m="seltopx";eval(fn);return r;};if(f)seltopx=hg.seltopx;
 hg.seltopy = function(){var m="seltopy";eval(fn);return r;};if(f)seltopy=hg.seltopy;
 hg.selendx = function(){var m="selendx";eval(fn);return r;};if(f)selendx=hg.selendx;
 hg.selendy = function(){var m="selendy";eval(fn);return r;};if(f)selendy=hg.selendy;
 hg.seltopcolumn = function(){var m="seltopcolumn";eval(fn);return r;};if(f)seltopcolumn=hg.seltopcolumn;
 hg.seltoplineno = function(){var m="seltoplineno";eval(fn);return r;};if(f)seltoplineno=hg.seltoplineno;
 hg.selendcolumn = function(){var m="selendcolumn";eval(fn);return r;};if(f)selendcolumn=hg.selendcolumn;
 hg.selendlineno = function(){var m="selendlineno";eval(fn);return r;};if(f)selendlineno=hg.selendlineno;
 hg.seltop_wcs = function(){var m="seltop_wcs";eval(fn);return r;};if(f)seltop_wcs=hg.seltop_wcs;
 hg.seltop_ucs4 = function(){var m="seltop_ucs4";eval(fn);return r;};if(f)seltop_ucs4=hg.seltop_ucs4;
 hg.seltop_cmu = function(){var m="seltop_cmu";eval(fn);return r;};if(f)seltop_cmu=hg.seltop_cmu;
 hg.seltop_gcu = function(){var m="seltop_gcu";eval(fn);return r;};if(f)seltop_gcu=hg.seltop_gcu;
 hg.selend_wcs = function(){var m="selend_wcs";eval(fn);return r;};if(f)selend_wcs=hg.selend_wcs;
 hg.selend_ucs4 = function(){var m="selend_ucs4";eval(fn);return r;};if(f)selend_ucs4=hg.selend_ucs4;
 hg.selend_cmu = function(){var m="selend_cmu";eval(fn);return r;};if(f)selend_cmu=hg.selend_cmu;
 hg.selend_gcu = function(){var m="selend_gcu";eval(fn);return r;};if(f)selend_gcu=hg.selend_gcu;
 hg.selopenx = function(){var m="selopenx";eval(fn);return r;};if(f)selopenx=hg.selopenx;
 hg.selopeny = function(){var m="selopeny";eval(fn);return r;};if(f)selopeny=hg.selopeny;
 hg.windowwidth = function(){var m="windowwidth";eval(fn);return r;};if(f)windowwidth=hg.windowwidth;
 hg.windowheight = function(){var m="windowheight";eval(fn);return r;};if(f)windowheight=hg.windowheight;
 hg.windowcx = function(){var m="windowcx";eval(fn);return r;};if(f)windowcx=hg.windowcx;
 hg.windowcy = function(){var m="windowcy";eval(fn);return r;};if(f)windowcy=hg.windowcy;
 hg.windowposx = function(){var m="windowposx";eval(fn);return r;};if(f)windowposx=hg.windowposx;
 hg.windowposy = function(){var m="windowposy";eval(fn);return r;};if(f)windowposy=hg.windowposy;
 hg.splitstate = function(){var m="splitstate";eval(fn);return r;};if(f)splitstate=hg.splitstate;
 hg.splitmode = function(){var m="splitmode";eval(fn);return r;};if(f)splitmode=hg.splitmode;
 hg.splitpos = function(){var m="splitpos";eval(fn);return r;};if(f)splitpos=hg.splitpos;
 hg.windowstate = function(){var m="windowstate";eval(fn);return r;};if(f)windowstate=hg.windowstate;
 hg.windowstate2 = function(){var m="windowstate2";eval(fn);return r;};if(f)windowstate2=hg.windowstate2;
 hg.cxscreen = function(){var m="cxscreen";eval(fn);return r;};if(f)cxscreen=hg.cxscreen;
 hg.cyscreen = function(){var m="cyscreen";eval(fn);return r;};if(f)cyscreen=hg.cyscreen;
 hg.xworkarea = function(){var m="xworkarea";eval(fn);return r;};if(f)xworkarea=hg.xworkarea;
 hg.yworkarea = function(){var m="yworkarea";eval(fn);return r;};if(f)yworkarea=hg.yworkarea;
 hg.cxworkarea = function(){var m="cxworkarea";eval(fn);return r;};if(f)cxworkarea=hg.cxworkarea;
 hg.cyworkarea = function(){var m="cyworkarea";eval(fn);return r;};if(f)cyworkarea=hg.cyworkarea;
 hg.monitor = function(){var m="monitor";eval(fn);return r;};if(f)monitor=hg.monitor;
 hg.monitorcount = function(){var m="monitorcount";eval(fn);return r;};if(f)monitorcount=hg.monitorcount;
 hg.tabmode = function(){var m="tabmode";eval(fn);return r;};if(f)tabmode=hg.tabmode;
 hg.tabgroup = function(){var m="tabgroup";eval(fn);return r;};if(f)tabgroup=hg.tabgroup;
 hg.tabgrouporder = function(){var m="tabgrouporder";eval(fn);return r;};if(f)tabgrouporder=hg.tabgrouporder;
 hg.taborder = function(){var m="taborder";eval(fn);return r;};if(f)taborder=hg.taborder;
 hg.tabtotal = function(){var m="tabtotal";eval(fn);return r;};if(f)tabtotal=hg.tabtotal;
 hg.tabgrouptotal = function(){var m="tabgrouptotal";eval(fn);return r;};if(f)tabgrouptotal=hg.tabgrouptotal;
 hg.screentopy = function(){var m="screentopy";eval(fn);return r;};if(f)screentopy=hg.screentopy;
 hg.screenleftx = function(){var m="screenleftx";eval(fn);return r;};if(f)screenleftx=hg.screenleftx;
 hg.compfilehandle = function(){var m="compfilehandle";eval(fn);return r;};if(f)compfilehandle=hg.compfilehandle;
 hg.scrolllinkhandle = function(){var m="scrolllinkhandle";eval(fn);return r;};if(f)scrolllinkhandle=hg.scrolllinkhandle;

 hg.browserpanehandle = function(){var m="browserpanehandle";eval(fn);return r;};if(f)browserpanehandle=hg.browserpanehandle;
 hg.browserpanesize = function(){var m="browserpanesize";eval(fn);return r;};if(f)browserpanesize=hg.browserpanesize;
 hg.browserpaneurl = function(){var m="browserpaneurl";eval(fs);return r;};if(f)browserpaneurl=hg.browserpaneurl;

 hg.filename = function(){var m="filename";eval(fs);return r;};if(f)filename=hg.filename;
 hg.filename2 = function(){var m="filename2";eval(fs);return r;};if(f)filename2=hg.filename2;
 hg.filename3 = function(){var m="filename3";eval(fs);return r;};if(f)filename3=hg.filename3;
 hg.basename = function(){var m="basename";eval(fs);return r;};if(f)basename=hg.basename;
 hg.basename2 = function(){var m="basename2";eval(fs);return r;};if(f)basename2=hg.basename2;
 hg.basename3 = function(){var m="basename3";eval(fs);return r;};if(f)basename3=hg.basename3;
 hg.directory = function(){var m="directory";eval(fs);return r;};if(f)directory=hg.directory;
 hg.directory2 = function(){var m="directory2";eval(fs);return r;};if(f)directory2=hg.directory2;
 hg.directory3 = function(){var m="directory3";eval(fs);return r;};if(f)directory3=hg.directory3;
 hg.filetype = function(){var m="filetype";eval(fs);return r;};if(f)filetype=hg.filetype;
 hg.currentmacrofilename = function(){var m="currentmacrofilename";eval(fs);return r;};if(f)currentmacrofilename=hg.currentmacrofilename;
 hg.currentmacrobasename = function(){var m="currentmacrobasename";eval(fs);return r;};if(f)currentmacrobasename=hg.currentmacrobasename;
 hg.currentmacrodirectory = function(){var m="currentmacrodirectory";eval(fs);return r;};if(f)currentmacrodirectory=hg.currentmacrodirectory;
 hg.currentjsfilename = hg.currentmacrofilename;if(f)currentjsfilename=hg.currentjsfilename;
 hg.hidemarudir = function(){var m="hidemarudir";eval(fs);return r;};if(f)hidemarudir=hg.hidemarudir;
 hg.macrodir = function(){var m="macrodir";eval(fs);return r;};if(f)macrodir=hg.macrodir;
 hg.settingdir = function(){var m="settingdir";eval(fs);return r;};if(f)settingdir=hg.settingdir;
 hg.backupdir = function(){var m="backupdir";eval(fs);return r;};if(f)backupdir=hg.backupdir;
 hg.windir = function(){var m="windir";eval(fs);return r;};if(f)windir=hg.windir;
 hg.winsysdir = function(){var m="winsysdir";eval(fs);return r;};if(f)winsysdir=hg.winsysdir;
 hg.filehistcount = function(){var m="filehistcount";eval(fn);return r;};if(f)filehistcount=hg.filehistcount;

 hg.overwrite = function(){var m="overwrite";if(arguments.length==0){eval(fn);}else{eval(st1s);}return r;};if(f)overwrite=hg.overwrite;
 hg.updated = function(){var m="updated";eval(fn);return r;};if(f)updated=hg.updated;
 hg.updatecount = function(){var m="updatecount";eval(fn);return r;};if(f)updatecount=hg.updatecount;
 hg.anyclipboard = function(){var m="anyclipboard";eval(fn);return r;};if(f)anyclipboard=hg.anyclipboard;
 hg.inputstates = function(){var m="inputstates";eval(fn);return r;};if(f)inputstates=hg.inputstates;
 hg.imestate = function(){var m="imestate";eval(fn);return r;};if(f)imestate=hg.imestate;
 hg.browsemode = function(){var m="browsemode";eval(fn);return r;};if(f)browsemode=hg.browsemode;
 hg.keypressed = function(){var m="keypressed";eval(fn);return r;};if(f)keypressed=hg.keypressed;
 hg.replay = function(){var m="replay";eval(fn);return r;};if(f)replay=hg.replay;
 hg.searchmode = function(){var m="searchmode";eval(fn);return r;};if(f)searchmode=hg.searchmode;
 hg.searchbuffer = function(){var m="searchbuffer";eval(fs);return r;};if(f)searchbuffer=hg.searchbuffer;
 hg.searchoption = function(){var m="searchoption";eval(fn);return r;};if(f)searchoption=hg.searchoption;
 hg.searchoption2 = function(){var m="searchoption2";eval(fn);return r;};if(f)searchoption2=hg.searchoption2;
 hg.targetcolormarker = function(){var m="targetcolormarker";eval(fs);return r;};if(f)targetcolormarker=hg.targetcolormarker;
 hg.replacebuffer = function(){var m="replacebuffer";eval(fs);return r;};if(f)replacebuffer=hg.replacebuffer;
 hg.grepfilebuffer = function(){var m="grepfilebuffer";eval(fs);return r;};if(f)grepfilebuffer=hg.grepfilebuffer;
 hg.grepfolderbuffer = function(){var m="grepfolderbuffer";eval(fs);return r;};if(f)grepfolderbuffer=hg.grepfolderbuffer;
 hg.foundtopx = function(){var m="foundtopx";eval(fn);return r;};if(f)foundtopx=hg.foundtopx;
 hg.foundtopy = function(){var m="foundtopy";eval(fn);return r;};if(f)foundtopy=hg.foundtopy;
 hg.foundendx = function(){var m="foundendx";eval(fn);return r;};if(f)foundendx=hg.foundendx;
 hg.foundendy = function(){var m="foundendy";eval(fn);return r;};if(f)foundendy=hg.foundendy;
 hg.foundhilighting = function(){var m="foundhilighting";eval(fn);return r;};if(f)foundhilighting=hg.foundhilighting;
 hg.foundbuffer = function(){var m="foundbuffer";eval(fs);return r;};if(f)foundbuffer=hg.foundbuffer;
 hg.foundoption = function(){var m="foundoption";eval(fn);return r;};if(f)foundoption=hg.foundoption;
 hg.readonly = function(){var m="readonly";eval(fn);return r;};if(f)readonly=hg.readonly;
 hg.encode = function(){var m="encode";eval(fn);return r;};if(f)encode=hg.encode;
 hg.charset = function(){var m="charset";eval(fn);return r;};if(f)charset=hg.charset;
 hg.bom = function(){var m="bom";eval(fn);return r;};if(f)bom=hg.bom;
 hg.codepage = function(){var m="codepage";eval(fn);return r;};if(f)codepage=hg.codepage;
 hg.getfocus = function(){var m="getfocus";eval(fn);return r;};if(f)getfocus=hg.getfocus;
 hg.autocompstate = function(){var m="autocompstate";eval(fn);return r;};if(f)autocompstate=hg.autocompstate;
 hg.argcount = function(){var m="argcount";eval(fn);return r;};if(f)argcount=hg.argcount;
 hg.compatiblemode = function(){var m="compatiblemode";eval(fn);return r;};if(f)compatiblemode=hg.compatiblemode;
 hg.carettabmode = function(){var m="carettabmode";eval(fn);return r;};if(f)carettabmode=hg.carettabmode;
 hg.return_in_cell_mode = function(){var m="return_in_cell_mode";eval(fn);return r;};if(f)return_in_cell_mode=hg.return_in_cell_mode;
 hg.stophistory = function(){var m="stophistory";eval(fn);return r;};if(f)stophistory=hg.stophistory;

 hg.fontmode = function(){var m="fontmode";eval(fn);return r;};if(f)fontmode=hg.fontmode;
 hg.formline = function(){var m="formline";eval(fn);return r;};if(f)formline=hg.formline;
 hg.currentconfigset = function(){var m="currentconfigset";eval(fs);return r;};if(f)currentconfigset=hg.currentconfigset;
 hg.configstate = function(){var m="configstate";eval(fn);return r;};if(f)configstate=hg.configstate;
 hg.fontname = function(){var m="fontname";eval(fs);return r;};if(f)fontname=hg.fontname;
 hg.fontsize = function(){var m="fontsize";eval(fn);return r;};if(f)fontsize=hg.fontsize;

 hg.refreshdatetime = function(){var m="refreshdatetime";eval(st);return r;};if(f)refreshdatetime=hg.refreshdatetime;
 hg.date = function(){var m="date";eval(fs);return r;};if(f)date=hg.date;
 hg.time = function(){var m="time";eval(fs);return r;};if(f)time=hg.time;
 hg.year = function(){var m="year";eval(fs);return r;};if(f)year=hg.year;
 hg.month = function(){var m="month";eval(fs);return r;};if(f)month=hg.month;
 hg.day = function(){var m="day";eval(fs);return r;};if(f)day=hg.day;
 hg.hour = function(){var m="hour";eval(fs);return r;};if(f)hour=hg.hour;
 hg.minute = function(){var m="minute";eval(fs);return r;};if(f)minute=hg.minute;
 hg.second = function(){var m="second";eval(fs);return r;};if(f)second=hg.second;
 hg.dayofweek = function(){var m="dayofweek";eval(fs);return r;};if(f)dayofweek=hg.dayofweek;
 hg.dayofweeknum = function(){var m="dayofweeknum";eval(fn);return r;};if(f)dayofweeknum=hg.dayofweeknum;
 hg.tickcount = function(){var m="tickcount";eval(fn);return r;};if(f)tickcount=hg.tickcount;

 hg.foldable = function(){var m="foldable";eval(fn);return r;};if(f)foldable=hg.foldable;
 hg.folded = function(){var m="folded";eval(fn);return r;};if(f)folded=hg.folded;
 hg.rangeedittop = function(){var m="rangeedittop";eval(fn);return r;};if(f)rangeedittop=hg.rangeedittop;
 hg.rangeeditend = function(){var m="rangeeditend";eval(fn);return r;};if(f)rangeeditend=hg.rangeeditend;
 hg.rangeeditmode = function(){var m="rangeeditmode";eval(fn);return r;};if(f)rangeeditmode=hg.rangeeditmode;
 hg.outlinehandle = function(){var m="outlinehandle";eval(fn);return r;};if(f)outlinehandle=hg.outlinehandle;
 hg.outlinesize = function(){var m="outlinesize";eval(fn);return r;};if(f)outlinesize=hg.outlinesize;
 hg.outlineitemcount = function(){var m="outlineitemcount";eval(fn);return r;};if(f)outlineitemcount=hg.outlineitemcount;

 hg.str = function(){var m="str";eval(fs);return r;};if(f)str=hg.str;
 hg.val = function(){var m="val";eval(fn);return r;};if(f)val=hg.val;
 hg.char = function(){var m="char";eval(fs);return r;};if(f)char=hg.char;
 hg.ascii = function(){var m="ascii";eval(fn);return r;};if(f)ascii=hg.ascii;
 hg.unichar = function(){var m="unichar";eval(fs);return r;};if(f)unichar=hg.unichar;
 hg.hex = function(){var m="hex";eval(fs);return r;};if(f)hex=hg.hex;
 hg.sprintf = function(){var m="sprintf";eval(fs);return r;};if(f)sprintf=hg.sprintf;
 hg.leftstr = function(){var m="leftstr";eval(fs);return r;};if(f)leftstr=hg.leftstr;
 hg.rightstr = function(){var m="rightstr";eval(fs);return r;};if(f)rightstr=hg.rightstr;
 hg.midstr = function(){var m="midstr";eval(fs);return r;};if(f)midstr=hg.midstr;
 hg.strlen = function(){var m="strlen";eval(fn);return r;};if(f)strlen=hg.strlen;
 hg.strstr = function(){var m="strstr";eval(fn);return r;};if(f)strstr=hg.strstr;
 hg.strrstr = function(){var m="strrstr";eval(fn);return r;};if(f)strrstr=hg.strrstr;
 hg.wcsleftstr = function(){var m="wcsleftstr";eval(fs);return r;};if(f)wcsleftstr=hg.wcsleftstr;
 hg.wcsrightstr = function(){var m="wcsrightstr";eval(fs);return r;};if(f)wcsrightstr=hg.wcsrightstr;
 hg.wcsmidstr = function(){var m="wcsmidstr";eval(fs);return r;};if(f)wcsmidstr=hg.wcsmidstr;
 hg.wcslen = function(){var m="wcslen";eval(fn);return r;};if(f)wcslen=hg.wcslen;
 hg.wcsstrstr = function(){var m="wcsstrstr";eval(fn);return r;};if(f)wcsstrstr=hg.wcsstrstr;
 hg.wcsstrrstr = function(){var m="wcsstrrstr";eval(fn);return r;};if(f)wcsstrrstr=hg.wcsstrrstr;
 hg.ucs4leftstr = function(){var m="ucs4leftstr";eval(fs);return r;};if(f)ucs4leftstr=hg.ucs4leftstr;
 hg.ucs4rightstr = function(){var m="ucs4rightstr";eval(fs);return r;};if(f)ucs4rightstr=hg.ucs4rightstr;
 hg.ucs4midstr = function(){var m="ucs4midstr";eval(fs);return r;};if(f)ucs4midstr=hg.ucs4midstr;
 hg.ucs4len = function(){var m="ucs4len";eval(fn);return r;};if(f)ucs4len=hg.ucs4len;
 hg.ucs4strstr = function(){var m="ucs4strstr";eval(fn);return r;};if(f)ucs4strstr=hg.ucs4strstr;
 hg.ucs4strrstr = function(){var m="ucs4strrstr";eval(fn);return r;};if(f)ucs4strrstr=hg.ucs4strrstr;
 hg.cmuleftstr = function(){var m="cmuleftstr";eval(fs);return r;};if(f)cmuleftstr=hg.cmuleftstr;
 hg.cmurightstr = function(){var m="cmurightstr";eval(fs);return r;};if(f)cmurightstr=hg.cmurightstr;
 hg.cmumidstr = function(){var m="cmumidstr";eval(fs);return r;};if(f)cmumidstr=hg.cmumidstr;
 hg.cmulen = function(){var m="cmulen";eval(fn);return r;};if(f)cmulen=hg.cmulen;
 hg.cmustrstr = function(){var m="cmustrstr";eval(fn);return r;};if(f)cmustrstr=hg.cmustrstr;
 hg.cmustrrstr = function(){var m="cmustrrstr";eval(fn);return r;};if(f)cmustrrstr=hg.cmustrrstr;
 hg.gculeftstr = function(){var m="gculeftstr";eval(fs);return r;};if(f)gculeftstr=hg.gculeftstr;
 hg.gcurightstr = function(){var m="gcurightstr";eval(fs);return r;};if(f)gcurightstr=hg.gcurightstr;
 hg.gcumidstr = function(){var m="gcumidstr";eval(fs);return r;};if(f)gcumidstr=hg.gcumidstr;
 hg.gculen = function(){var m="gculen";eval(fn);return r;};if(f)gculen=hg.gculen;
 hg.gcustrstr = function(){var m="gcustrstr";eval(fn);return r;};if(f)gcustrstr=hg.gcustrstr;
 hg.gcustrrstr = function(){var m="gcustrrstr";eval(fn);return r;};if(f)gcustrrstr=hg.gcustrrstr;
 hg.wcs_to_char = function(){var m="wcs_to_char";eval(fn);return r;};if(f)wcs_to_char=hg.wcs_to_char;
 hg.char_to_wcs = function(){var m="char_to_wcs";eval(fn);return r;};if(f)char_to_wcs=hg.char_to_wcs;
 hg.ucs4_to_char = function(){var m="ucs4_to_char";eval(fn);return r;};if(f)ucs4_to_char=hg.ucs4_to_char;
 hg.char_to_ucs4 = function(){var m="char_to_ucs4";eval(fn);return r;};if(f)char_to_ucs4=hg.char_to_ucs4;
 hg.cmu_to_char = function(){var m="cmu_to_char";eval(fn);return r;};if(f)cmu_to_char=hg.cmu_to_char;
 hg.char_to_cmu  = function(){var m="char_to_cmu ";eval(fn);return r;};if(f)char_to_cmu=hg.char_to_cmu;
 hg.gcu_to_char = function(){var m="gcu_to_char";eval(fn);return r;};if(f)gcu_to_char=hg.gcu_to_char;
 hg.char_to_gcu = function(){var m="char_to_gcu";eval(fn);return r;};if(f)char_to_gcu=hg.char_to_gcu;
 hg.byteindex_to_charindex = function(){var m="byteindex_to_charindex";eval(fn);return r;};if(f)byteindex_to_charindex=hg.byteindex_to_charindex;
 hg.charindex_to_byteindex = function(){var m="charindex_to_byteindex";eval(fn);return r;};if(f)charindex_to_byteindex=hg.charindex_to_byteindex;

 hg.gettext = function(){var m="gettext";eval(fs);return r;};if(f)gettext=hg.gettext;
 hg.gettext2 = function(){var m="gettext2";eval(fs);return r;};if(f)gettext2=hg.gettext2;
 hg.gettext_wcs = function(){var m="gettext_wcs";eval(fs);return r;};if(f)gettext_wcs=hg.gettext_wcs;
 hg.gettext_ucs4 = function(){var m="gettext_ucs4";eval(fs);return r;};if(f)gettext_ucs4=hg.gettext_ucs4;
 hg.gettext_cmu = function(){var m="gettext_cmu";eval(fs);return r;};if(f)gettext_cmu=hg.gettext_cmu;
 hg.gettext_gcu = function(){var m="gettext_gcu";eval(fs);return r;};if(f)gettext_gcu=hg.gettext_gcu;
 hg.getenv = function(){var m="getenv";eval(fs);return r;};if(f)getenv=hg.getenv;
 hg.findwindow = function(){var m="findwindow";eval(fn);return r;};if(f)findwindow=hg.findwindow;
 hg.findwindowclass = function(){var m="findwindowclass";eval(fn);return r;};if(f)findwindowclass=hg.findwindowclass;
 hg.sendmessage = function(){var m="sendmessage";eval(fn);return r;};if(f)sendmessage=hg.sendmessage;
 hg.getgrepfilehist = function(){var m="getgrepfilehist";eval(fs);return r;};if(f)getgrepfilehist=hg.getgrepfilehist;
 hg.xtocolumn = function(){var m="xtocolumn";eval(fn);return r;};if(f)xtocolumn=hg.xtocolumn;
 hg.ytolineno = function(){var m="ytolineno";eval(fn);return r;};if(f)ytolineno=hg.ytolineno;
 hg.columntox = function(){var m="columntox";eval(fn);return r;};if(f)columntox=hg.columntox;
 hg.linenotoy = function(){var m="linenotoy";eval(fn);return r;};if(f)linenotoy=hg.linenotoy;
 hg.getlinecount = function(){var m="getlinecount";eval(fn3rn);arguments[2].column=gtv("###3");return r;};if(f)getlinecount=hg.getlinecount;
 hg.charcount = function(){var m="charcount";eval(fn);return r;};if(f)charcount=hg.charcount;
 hg.enumcolormarkerlayer = function(){var m="enumcolormarkerlayer";eval(fs);return r;};if(f)enumcolormarkerlayer=hg.enumcolormarkerlayer;
 hg.existfile = function(){var m="existfile";eval(fn);return r;};if(f)existfile=hg.existfile;
 hg.getfiletime = function(){var m="getfiletime";eval(fs);return r;};if(f)getfiletime=hg.getfiletime;
 hg.getmaxinfo = function(){var m="getmaxinfo";eval(fn);return r;};if(f)getmaxinfo=hg.getmaxinfo;
 hg.getoutlineitem = function(){var m="getoutlineitem";eval(fs);return r;};if(f)getoutlineitem=hg.getoutlineitem;
 hg.getarg = function(){var m="getarg";eval(fs);return r;};if(f)getarg=hg.getarg;
 hg.getautocompitem = function(){var m="getautocompitem";eval(fs);return r;};if(f)getautocompitem=hg.getautocompitem;
 hg.getcolormarker = function(){var m="getcolormarker";eval(fs);return r;};if(f)getcolormarker=hg.getcolormarker;
 hg.getfilehist = function(){var m="getfilehist";eval(fs);return r;};if(f)getfilehist=hg.getfilehist;
 hg.getpathhist = function(){var m="getpathhist";eval(fs);return r;};if(f)getpathhist=hg.getpathhist;
 hg.getreplacehist = function(){var m="getreplacehist";eval(fs);return r;};if(f)getreplacehist=hg.getreplacehist;
 hg.getresultex = function(){var m="getresultex";eval(fsn);return r;};if(f)getresultex=hg.getresultex;
 hg.getsearchhist = function(){var m="getsearchhist";eval(fs);return r;};if(f)getsearchhist=hg.getsearchhist;
 hg.gettagsfile = function(){var m="gettagsfile";eval(fs);return r;};if(f)gettagsfile=hg.gettagsfile;
 hg.gettitle = function(){var m="gettitle";eval(fs);return r;};if(f)gettitle=hg.gettitle;
 hg.browsefile = function(){var m="browsefile";eval(fs);return r;};if(f)browsefile=hg.browsefile;
 hg.keypressedex = function(){var m="keypressedex";eval(fn);return r;};if(f)keypressedex=hg.keypressedex;
 hg.quote = function(){var m="quote";eval(fs);return r;};if(f)quote=hg.quote;
 hg.strreplace = function(){var m="strreplace";eval(fs);return r;};if(f)strreplace=hg.strreplace;

 hg.newfile = function(){var m="newfile";eval(st);return r;};if(f)newfile=hg.newfile;
 hg.openfile = function(){var m="openfile";eval(st);return r;};if(f)openfile=hg.openfile;
 hg.loadfile = function(){var m="loadfile";eval(st);return r;};if(f)loadfile=hg.loadfile;
 hg.openfilepart = function(){var m="openfilepart";eval(st);return r;};if(f)openfilepart=hg.openfilepart;
 hg.closenew = function(){var m="closenew";eval(st);return r;};if(f)closenew=hg.closenew;
 hg.saveas = function(){var m="saveas";eval(st);return r;};if(f)saveas=hg.saveas;
 hg.appendsave = function(){var m="appendsave";eval(st);return r;};if(f)appendsave=hg.appendsave;
 hg.changename = function(){var m="changename";eval(st);return r;};if(f)changename=hg.changename;
 hg.insertfile = function(){var m="insertfile";eval(st);return r;};if(f)insertfile=hg.insertfile;
 hg.readonlyopenfile = function(){var m="readonlyopenfile";eval(st);return r;};if(f)readonlyopenfile=hg.readonlyopenfile;
 hg.readonlyloadfile = function(){var m="readonlyloadfile";eval(st);return r;};if(f)readonlyloadfile=hg.readonlyloadfile;
 hg.save = function(){var m="save";eval(st);return r;};if(f)save=hg.save;
 hg.savelf = function(){var m="savelf";eval(st);return r;};if(f)savelf=hg.savelf;
 hg.print = function(){var m="print";eval(st);return r;};if(f)print=hg.print;
 hg.saveall = function(){var m="saveall";eval(st);return r;};if(f)saveall=hg.saveall;
 hg.saveupdatedall = function(){var m="saveupdatedall";eval(st);return r;};if(f)saveupdatedall=hg.saveupdatedall;
 hg.openbyshell = function(){var m="openbyshell";eval(st);return r;};if(f)openbyshell=hg.openbyshell;
 hg.openbyhidemaru = function(){var m="openbyhidemaru";eval(st);return r;};if(f)openbyhidemaru=hg.openbyhidemaru;
 hg.setfilehist = function(){var m="setfilehist";eval(st);return r;};if(f)setfilehist=hg.setfilehist;
 hg.setpathhist = function(){var m="setpathhist";eval(st);return r;};if(f)setpathhist=hg.setpathhist;
 hg.setencode = function(){var m="setencode";eval(st);return r;};if(f)setencode=hg.setencode;
 hg.stophistoryswitch = function(){var m="stophistoryswitch";eval(st);return r;};if(f)stophistoryswitch=hg.stophistoryswitch;
 hg.deletefilehist = function(){var m="deletefilehist";eval(st);return r;};if(f)deletefilehist=hg.deletefilehist;
 hg.OPEN = function(){var m="OPEN";eval(st);return r;};if(f)OPEN=hg.OPEN;
 hg.SAVEAS = function(){var m="SAVEAS";eval(st);return r;};if(f)SAVEAS=hg.SAVEAS;
 hg.LOAD = function(){var m="LOAD";eval(st);return r;};if(f)LOAD=hg.LOAD;
 hg.APPENDSAVE = function(){var m="APPENDSAVE";eval(st);return r;};if(f)APPENDSAVE=hg.APPENDSAVE;
 hg.CHANGENAME = function(){var m="CHANGENAME";eval(st);return r;};if(f)CHANGENAME=hg.CHANGENAME;
 hg.INSERTFILE = function(){var m="INSERTFILE";eval(st);return r;};if(f)INSERTFILE=hg.INSERTFILE;
 hg.OPENFILEPART = function(){var m="OPENFILEPART";eval(st);return r;};if(f)OPENFILEPART=hg.OPENFILEPART;
 hg.deletefile = function(){var m="deletefile";eval(st);return r;};if(f)deletefile=hg.deletefile;
 hg.propertydialog = function(){var m="propertydialog";eval(st);return r;};if(f)propertydialog=hg.propertydialog;

 hg.up = function(){var m="up";eval(st);return r;};if(f)up=hg.up;
 hg.down = function(){var m="down";eval(st);return r;};if(f)down=hg.down;
 hg.right = function(){var m="right";eval(st);return r;};if(f)right=hg.right;
 hg.left = function(){var m="left";eval(st);return r;};if(f)left=hg.left;
 hg.up_nowrap = function(){var m="up_nowrap";eval(st);return r;};if(f)up_nowrap=hg.up_nowrap;
 hg.down_nowrap = function(){var m="down_nowrap";eval(st);return r;};if(f)down_nowrap=hg.down_nowrap;
 hg.shiftup = function(){var m="shiftup";eval(st);return r;};if(f)shiftup=hg.shiftup;
 hg.shiftdown = function(){var m="shiftdown";eval(st);return r;};if(f)shiftdown=hg.shiftdown;
 hg.shiftright = function(){var m="shiftright";eval(st);return r;};if(f)shiftright=hg.shiftright;
 hg.shiftleft = function(){var m="shiftleft";eval(st);return r;};if(f)shiftleft=hg.shiftleft;
 hg.gofileend = function(){var m="gofileend";eval(st);return r;};if(f)gofileend=hg.gofileend;
 hg.gofiletop = function(){var m="gofiletop";eval(st);return r;};if(f)gofiletop=hg.gofiletop;
 hg.gokakko = function(){var m="gokakko";eval(st);return r;};if(f)gokakko=hg.gokakko;
 hg.golastupdated = function(){var m="golastupdated";eval(st);return r;};if(f)golastupdated=hg.golastupdated;
 hg.goleftkakko = function(){var m="goleftkakko";eval(st);return r;};if(f)goleftkakko=hg.goleftkakko;
 hg.gorightkakko = function(){var m="gorightkakko";eval(st);return r;};if(f)gorightkakko=hg.gorightkakko;
 hg.golinetop = function(){var m="golinetop";eval(st);return r;};if(f)golinetop=hg.golinetop;
 hg.golinetop2 = function(){var m="golinetop2";eval(st);return r;};if(f)golinetop2=hg.golinetop2;
 hg.golineend = function(){var m="golineend";eval(st);return r;};if(f)golineend=hg.golineend;
 hg.golineend2 = function(){var m="golineend2";eval(st);return r;};if(f)golineend2=hg.golineend2;
 hg.golineend3 = function(){var m="golineend3";eval(st);return r;};if(f)golineend3=hg.golineend3;
 hg.goscreenend = function(){var m="goscreenend";eval(st);return r;};if(f)goscreenend=hg.goscreenend;
 hg.goscreentop = function(){var m="goscreentop";eval(st);return r;};if(f)goscreentop=hg.goscreentop;
 hg.jump = function(){var m="jump";eval(st);return r;};if(f)jump=hg.jump;
 hg.moveto = function(){var m="moveto";eval(st);return r;};if(f)moveto=hg.moveto;
 hg.movetolineno = function(){var m="movetolineno";eval(st);return r;};if(f)movetolineno=hg.movetolineno;
 hg.movetoview = function(){var m="movetoview";eval(st);return r;};if(f)movetoview=hg.movetoview;
 hg.moveto2 = function(){var m="moveto2";eval(st);return r;};if(f)moveto2=hg.moveto2;
 hg.moveto_wcs = function(){var m="moveto_wcs";eval(st);return r;};if(f)moveto_wcs=hg.moveto_wcs;
 hg.moveto_ucs4 = function(){var m="moveto_ucs4";eval(st);return r;};if(f)moveto_ucs4=hg.moveto_ucs4;
 hg.moveto_cmu = function(){var m="moveto_cmu";eval(st);return r;};if(f)moveto_cmu=hg.moveto_cmu;
 hg.moveto_gcu = function(){var m="moveto_gcu";eval(st);return r;};if(f)moveto_gcu=hg.moveto_gcu;
 hg.nextpage = function(){var m="nextpage";eval(st);return r;};if(f)nextpage=hg.nextpage;
 hg.prevpage = function(){var m="prevpage";eval(st);return r;};if(f)prevpage=hg.prevpage;
 hg.halfnextpage = function(){var m="halfnextpage";eval(st);return r;};if(f)halfnextpage=hg.halfnextpage;
 hg.halfprevpage = function(){var m="halfprevpage";eval(st);return r;};if(f)halfprevpage=hg.halfprevpage;
 hg.rollup = function(){var m="rollup";eval(st);return r;};if(f)rollup=hg.rollup;
 hg.rollup2 = function(){var m="rollup2";eval(st);return r;};if(f)rollup2=hg.rollup2;
 hg.rolldown = function(){var m="rolldown";eval(st);return r;};if(f)rolldown=hg.rolldown;
 hg.rolldown2 = function(){var m="rolldown2";eval(st);return r;};if(f)rolldown2=hg.rolldown2;
 hg.wordleft = function(){var m="wordleft";eval(st);return r;};if(f)wordleft=hg.wordleft;
 hg.wordleft2 = function(){var m="wordleft2";eval(st);return r;};if(f)wordleft2=hg.wordleft2;
 hg.wordright = function(){var m="wordright";eval(st);return r;};if(f)wordright=hg.wordright;
 hg.wordright2 = function(){var m="wordright2";eval(st);return r;};if(f)wordright2=hg.wordright2;
 hg.wordrightsalnen = function(){var m="wordrightsalnen";eval(st);return r;};if(f)wordrightsalnen=hg.wordrightsalnen;
 hg.wordrightsalnen2 = function(){var m="wordrightsalnen2";eval(st);return r;};if(f)wordrightsalnen2=hg.wordrightsalnen2;
 hg.gowordtop = function(){var m="gowordtop";eval(st);return r;};if(f)gowordtop=hg.gowordtop;
 hg.gowordend = function(){var m="gowordend";eval(st);return r;};if(f)gowordend=hg.gowordend;
 hg.gowordtop2 = function(){var m="gowordtop2";eval(st);return r;};if(f)gowordtop2=hg.gowordtop2;
 hg.gowordend2 = function(){var m="gowordend2";eval(st);return r;};if(f)gowordend2=hg.gowordend2;
 hg.prevpos = function(){var m="prevpos";eval(st);return r;};if(f)prevpos=hg.prevpos;
 hg.prevposhistback = function(){var m="prevposhistback";eval(st);return r;};if(f)prevposhistback=hg.prevposhistback;
 hg.prevposhistforward = function(){var m="prevposhistforward";eval(st);return r;};if(f)prevposhistforward=hg.prevposhistforward;
 hg.setmark = function(){var m="setmark";eval(st);return r;};if(f)setmark=hg.setmark;
 hg.clearallmark = function(){var m="clearallmark";eval(st);return r;};if(f)clearallmark=hg.clearallmark;
 hg.marklist = function(){var m="marklist";eval(st);return r;};if(f)marklist=hg.marklist;
 hg.nextmark = function(){var m="nextmark";eval(st);return r;};if(f)nextmark=hg.nextmark;
 hg.prevmark = function(){var m="prevmark";eval(st);return r;};if(f)prevmark=hg.prevmark;
 hg.prevfunc = function(){var m="prevfunc";eval(st);return r;};if(f)prevfunc=hg.prevfunc;
 hg.nextfunc = function(){var m="nextfunc";eval(st);return r;};if(f)nextfunc=hg.nextfunc;
 hg.nextresult = function(){var m="nextresult";eval(st);return r;};if(f)nextresult=hg.nextresult;
 hg.prevresult = function(){var m="prevresult";eval(st);return r;};if(f)prevresult=hg.prevresult;
 hg.gotagpair = function(){var m="gotagpair";eval(st);return r;};if(f)gotagpair=hg.gotagpair;
 hg.backtab = function(){var m="backtab";eval(st);return r;};if(f)backtab=hg.backtab;
 hg.forwardtab = function(){var m="forwardtab";eval(st);return r;};if(f)forwardtab=hg.forwardtab;

 hg.appendcopy = function(){var m="appendcopy";eval(st);return r;};if(f)appendcopy=hg.appendcopy;
 hg.appendcut = function(){var m="appendcut";eval(st);return r;};if(f)appendcut=hg.appendcut;
 hg.beginrect = function(){var m="beginrect";eval(st);return r;};if(f)beginrect=hg.beginrect;
 hg.beginrectmulti = function(){var m="beginrectmulti";eval(st);return r;};if(f)beginrectmulti=hg.beginrectmulti;
 hg.beginsel = function(){var m="beginsel";eval(st);return r;};if(f)beginsel=hg.beginsel;
 hg.beginlinesel = function(){var m="beginlinesel";eval(st);return r;};if(f)beginlinesel=hg.beginlinesel;
 hg.endsel = function(){var m="endsel";eval(st);return r;};if(f)endsel=hg.endsel;
 hg.copy = function(){var m="copy";eval(st);return r;};if(f)copy=hg.copy;
 hg.copy2 = function(){var m="copy2";eval(st);return r;};if(f)copy2=hg.copy2;
 hg.cut = function(){var m="cut";eval(st);return r;};if(f)cut=hg.cut;
 hg.copyline = function(){var m="copyline";eval(st);return r;};if(f)copyline=hg.copyline;
 hg.cutline = function(){var m="cutline";eval(st);return r;};if(f)cutline=hg.cutline;
 hg.cutafter = function(){var m="cutafter";eval(st);return r;};if(f)cutafter=hg.cutafter;
 hg.copyword = function(){var m="copyword";eval(st);return r;};if(f)copyword=hg.copyword;
 hg.cutword = function(){var m="cutword";eval(st);return r;};if(f)cutword=hg.cutword;
 hg.escapeselect = function(){var m="escape";eval(st);return r;};if(f)escapeselect=hg.escapeselect;
 hg.paste = function(){var m="paste";eval(st);return r;};if(f)paste=hg.paste;
 hg.pasterect = function(){var m="pasterect";eval(st);return r;};if(f)pasterect=hg.pasterect;
 hg.refpaste = function(){var m="refpaste";eval(st);return r;};if(f)refpaste=hg.refpaste;
 hg.refcopy = function(){var m="refcopy";eval(st);return r;};if(f)refcopy=hg.refcopy;
 hg.refcopy2 = function(){var m="refcopy2";eval(st);return r;};if(f)refcopy2=hg.refcopy2;
 hg.selectall = function(){var m="selectall";eval(st);return r;};if(f)selectall=hg.selectall;
 hg.selectline = function(){var m="selectline";eval(st);return r;};if(f)selectline=hg.selectline;
 hg.selectword = function(){var m="selectword";eval(st);return r;};if(f)selectword=hg.selectword;
 hg.selectword2 = function(){var m="selectword2";eval(st);return r;};if(f)selectword2=hg.selectword2;
 hg.showcliphist = function(){var m="showcliphist";eval(st);return r;};if(f)showcliphist=hg.showcliphist;
 hg.poppaste = function(){var m="poppaste";eval(st);return r;};if(f)poppaste=hg.poppaste;
 hg.poppaste2 = function(){var m="poppaste2";eval(st);return r;};if(f)poppaste2=hg.poppaste2;
 hg.getcliphist = function(){var m="getcliphist";eval(st);return r;};if(f)getcliphist=hg.getcliphist;
 hg.clearcliphist = function(){var m="clearcliphist";eval(st);return r;};if(f)clearcliphist=hg.clearcliphist;
 hg.selectcfunc = function(){var m="selectcfunc";eval(st);return r;};if(f)selectcfunc=hg.selectcfunc;
 hg.copyurl = function(){var m="copyurl";eval(st);return r;};if(f)copyurl=hg.copyurl;
 hg.copyformed = function(){var m="copyformed";eval(st);return r;};if(f)copyformed=hg.copyformed;
 hg.selectcolumn = function(){var m="selectcolumn";eval(st);return r;};if(f)selectcolumn=hg.selectcolumn;
 hg.tomultiselect = function(){var m="tomultiselect";eval(st);return r;};if(f)tomultiselect=hg.tomultiselect;
 hg.invertselection = function(){var m="invertselection";eval(st);return r;};if(f)invertselection=hg.invertselection;
 hg.reservemultisel = function(){var m="reservemultisel";eval(st);return r;};if(f)reservemultisel=hg.reservemultisel;
 hg.selectreservedmultisel = function(){var m="selectreservedmultisel";eval(st);return r;};if(f)selectreservedmultisel=hg.selectreservedmultisel;
 hg.clearreservedmultisel = function(){var m="clearreservedmultisel";eval(st);return r;};if(f)clearreservedmultisel=hg.clearreservedmultisel;
 hg.clearreservedmultiselall = function(){var m="clearreservedmultiselall";eval(st);return r;};if(f)clearreservedmultiselall=hg.clearreservedmultiselall;

 hg.backspace = function(){var m="backspace";eval(st);return r;};if(f)backspace=hg.backspace;
 hg.del = function(){var m="delete";eval(st);return r;};if(f)del=hg.del;
 hg.deleteafter = function(){var m="deleteafter";eval(st);return r;};if(f)deleteafter=hg.deleteafter;
 hg.deletebefore = function(){var m="deletebefore";eval(st);return r;};if(f)deletebefore=hg.deletebefore;
 hg.deleteline = function(){var m="deleteline";eval(st);return r;};if(f)deleteline=hg.deleteline;
 hg.deleteline2 = function(){var m="deleteline2";eval(st);return r;};if(f)deleteline2=hg.deleteline2;
 hg.deleteword = function(){var m="deleteword";eval(st);return r;};if(f)deleteword=hg.deleteword;
 hg.deletewordall = function(){var m="deletewordall";eval(st);return r;};if(f)deletewordall=hg.deletewordall;
 hg.deletewordfront = function(){var m="deletewordfront";eval(st);return r;};if(f)deletewordfront=hg.deletewordfront;

 hg.insert = function(){var m="insert";eval(st1s);return r;};if(f)insert=hg.insert;
 hg.insertfix = function(){var m="insertfix";eval(st1s);return r;};if(f)insertfix=hg.insertfix;
 hg.dupline = function(){var m="dupline";eval(st);return r;};if(f)dupline=hg.dupline;
 hg.insertline = function(){var m="insertline";eval(st);return r;};if(f)insertline=hg.insertline;
 hg.insertreturn = function(){var m="insertreturn";eval(st);return r;};if(f)insertreturn=hg.insertreturn;
 hg.tab = function(){var m="tab";eval(st);return r;};if(f)tab=hg.tab;
 hg.undelete = function(){var m="undelete";eval(st);return r;};if(f)undelete=hg.undelete;

 hg.undo = function(){var m="undo";eval(st);return r;};if(f)undo=hg.undo;
 hg.redo = function(){var m="redo";eval(st);return r;};if(f)redo=hg.redo;
 hg.casechange = function(){var m="casechange";eval(st);return r;};if(f)casechange=hg.casechange;
 hg.indent = function(){var m="indent";eval(st);return r;};if(f)indent=hg.indent;
 hg.unindent = function(){var m="unindent";eval(st);return r;};if(f)unindent=hg.unindent;
 hg.shifttab = function(){var m="shifttab";eval(st);return r;};if(f)shifttab=hg.shifttab;
 hg.toupper = function(){var m="toupper";if(arguments.length>=1&&typeof(arguments[0])=="string"){eval(fs);}else{eval(st);}return r;};if(f)toupper=hg.toupper;
 hg.tolower = function(){var m="tolower";if(arguments.length>=1&&typeof(arguments[0])=="string"){eval(fs);}else{eval(st);}return r;};if(f)tolower=hg.tolower;
 hg.tospace = function(){var m="tospace";eval(st);return r;};if(f)tospace=hg.tospace;
 hg.totab = function(){var m="totab";eval(st);return r;};if(f)totab=hg.totab;
 hg.tohankaku = function(){var m="tohankaku";eval(st);return r;};if(f)tohankaku=hg.tohankaku;
 hg.tozenkakuhira = function(){var m="tozenkakuhira";eval(st);return r;};if(f)tozenkakuhira=hg.tozenkakuhira;
 hg.tozenkakukata = function(){var m="tozenkakukata";eval(st);return r;};if(f)tozenkakukata=hg.tozenkakukata;
 hg.capslockforgot = function(){var m="capslockforgot";eval(st);return r;};if(f)capslockforgot=hg.capslockforgot;
 hg.imeconvforgot = function(){var m="imeconvforgot";eval(st);return r;};if(f)imeconvforgot=hg.imeconvforgot;
 hg.reopen = function(){var m="reopen";eval(st);return r;};if(f)reopen=hg.reopen;
 hg.filter = function(){var m="filter";if(arguments.length>=4){eval(fs);}else{eval(st);}return r;};if(f)filter=hg.filter;
 hg.filtermenu = function(){var m="filtermenu";eval(st);return r;};if(f)filtermenu=hg.filtermenu;
 hg.autocomplete = function(){var m="autocomplete";eval(st);return r;};if(f)autocomplete=hg.autocomplete;
 hg.form = function(){var m="form";eval(st);return r;};if(f)form=hg.form;
 hg.unform = function(){var m="unform";eval(st);return r;};if(f)unform=hg.unform;
 hg.showformline = function(){var m="showformline";eval(st);return r;};if(f)showformline=hg.showformline;
 hg.clearundobuffer = function(){var m="clearundobuffer";eval(st);return r;};if(f)clearundobuffer=hg.clearundobuffer;
 hg.template = function(){var m="template";eval(st);return r;};if(f)template=hg.template;

 hg.find1 = function(){var m="find";eval(st);return r;};if(f)find1=hg.find1;
 hg.find2 = function(){var m="find2";eval(st);return r;};if(f)find2=hg.find2;
 hg.findword = function(){var m="findword";eval(st);return r;};if(f)findword=hg.findword;
 hg.searchdialog = function(){var m="searchdialog";eval(st1s);return r;};if(f)searchdialog=hg.searchdialog;
 hg.searchdown = function(){var m="searchdown";eval(st1s);return r;};if(f)searchdown=hg.searchdown;
 hg.searchdown2 = function(){var m="searchdown2";eval(st1s);return r;};if(f)searchdown2=hg.searchdown2;
 hg.searchup = function(){var m="searchup";eval(st1s);return r;};if(f)searchup=hg.searchup;
 hg.searchup2 = function(){var m="searchup2";eval(st1s);return r;};if(f)searchup2=hg.searchup2;
 hg.replace1 = function(){var m="replace";eval(st);return r;};if(f)replace1=hg.replace1;
 hg.replacedialog = function(){var m="replacedialog";eval(st1s2s);return r;};if(f)replacedialog=hg.replacedialog;
 hg.replacedown = function(){var m="replacedown";eval(st1s2s);return r;};if(f)replacedown=hg.replacedown;
 hg.replaceup = function(){var m="replaceup";eval(st1s2s);return r;};if(f)replaceup=hg.replaceup;
 hg.replaceall = function(){var m="replaceall";eval(st);return r;};if(f)replaceall=hg.replaceall;
 hg.replaceallfast = function(){var m="replaceallfast";eval(st);return r;};if(f)replaceallfast=hg.replaceallfast;
 hg.replaceallquick = function(){var m="replaceallquick";eval(st);return r;};if(f)replaceallquick=hg.replaceallquick;
 hg.finddown = function(){var m="finddown";eval(st);return r;};if(f)finddown=hg.finddown;
 hg.finddown2 = function(){var m="finddown2";eval(st);return r;};if(f)finddown2=hg.finddown2;
 hg.findup = function(){var m="findup";eval(st);return r;};if(f)findup=hg.findup;
 hg.findup2 = function(){var m="findup2";eval(st);return r;};if(f)findup2=hg.findup2;
 hg.getsearch = function(){var m="getsearch";eval(st);return r;};if(f)getsearch=hg.getsearch;
 hg.gosearchstarted = function(){var m="gosearchstarted";eval(st);return r;};if(f)gosearchstarted=hg.gosearchstarted;
 hg.setsearch = function(){var m="setsearch";eval(st);return r;};if(f)setsearch=hg.setsearch;
 hg.setsearchhist = function(){var m="setsearchhist";eval(st);return r;};if(f)setsearchhist=hg.setsearchhist;
 hg.setreplace = function(){var m="setreplace";eval(st);return r;};if(f)setreplace=hg.setreplace;
 hg.setreplacehist = function(){var m="setreplacehist";eval(st);return r;};if(f)setreplacehist=hg.setreplacehist;
 hg.setgrepfile = function(){var m="setgrepfile";eval(st);return r;};if(f)setgrepfile=hg.setgrepfile;
 hg.forceinselect = function(){var m="forceinselect";eval(st);return r;};if(f)forceinselect=hg.forceinselect;
 hg.goupdatedown = function(){var m="goupdatedown";eval(st);return r;};if(f)goupdatedown=hg.goupdatedown;
 hg.goupdateup = function(){var m="goupdateup";eval(st);return r;};if(f)goupdateup=hg.goupdateup;
 hg.clearupdates = function(){var m="clearupdates";eval(st);return r;};if(f)clearupdates=hg.clearupdates;
 hg.grep = function(){var m="grep";eval(st);return r;};if(f)grep=hg.grep;
 hg.grepdialog = function(){var m="grepdialog";eval(st);return r;};if(f)grepdialog=hg.grepdialog;
 hg.grepdialog2 = function(){var m="grepdialog2";eval(st);return r;};if(f)grepdialog2=hg.grepdialog2;
 hg.localgrep = function(){var m="localgrep";eval(st);return r;};if(f)localgrep=hg.localgrep;
 hg.grepreplace = function(){var m="grepreplace";eval(st);return r;};if(f)grepreplace=hg.grepreplace;
 hg.grepreplacedialog2 = function(){var m="grepreplacedialog2";eval(st);return r;};if(f)grepreplacedialog2=hg.grepreplacedialog2;
 hg.escapeinselect = function(){var m="escapeinselect";eval(st);return r;};if(f)escapeinselect=hg.escapeinselect;
 hg.hilightfound = function(){var m="hilightfound";eval(st);return r;};if(f)hilightfound=hg.hilightfound;
 hg.colormarker = function(){var m="colormarker";eval(st1j);return r;};if(f)colormarker=hg.colormarker;
 hg.nextcolormarker = function(){var m="nextcolormarker";eval(st);return r;};if(f)nextcolormarker=hg.nextcolormarker;
 hg.prevcolormarker = function(){var m="prevcolormarker";eval(st);return r;};if(f)prevcolormarker=hg.prevcolormarker;
 hg.colormarkerdialog = function(){var m="colormarkerdialog";eval(st);return r;};if(f)colormarkerdialog=hg.colormarkerdialog;
 hg.deletecolormarker = function(){var m="deletecolormarker";eval(st);return r;};if(f)deletecolormarker=hg.deletecolormarker;
 hg.deletecolormarkerall = function(){var m="deletecolormarkerall";eval(st);return r;};if(f)deletecolormarkerall=hg.deletecolormarkerall;
 hg.selectcolormarker = function(){var m="selectcolormarker";eval(st);return r;};if(f)selectcolormarker=hg.selectcolormarker;
 hg.selectallfound = function(){var m="selectallfound";eval(st);return r;};if(f)selectallfound=hg.selectallfound;
 hg.colormarkerallfound = function(){var m="colormarkerallfound";eval(st);return r;};if(f)colormarkerallfound=hg.colormarkerallfound;
 hg.clearcolormarkerallfound = function(){var m="clearcolormarkerallfound";eval(st);return r;};if(f)clearcolormarkerallfound=hg.clearcolormarkerallfound;
 hg.foundlist = function(){var m="foundlist";eval(st);return r;};if(f)foundlist=hg.foundlist;
 hg.foundlistoutline = function(){var m="foundlistoutline";eval(st);return r;};if(f)foundlistoutline=hg.foundlistoutline;
 hg.findmarkerlist = function(){var m="findmarkerlist";eval(st);return r;};if(f)findmarkerlist=hg.findmarkerlist;
 hg.selectinselect = function(){var m="selectinselect";eval(st);return r;};if(f)selectinselect=hg.selectinselect;
 hg.setinselect2 = function(){var m="setinselect2";eval(st);return r;};if(f)setinselect2=hg.setinselect2;

 hg.settargetcolormarker = function(){var m="settargetcolormarker";eval(st);return r;};if(f)settargetcolormarker=hg.settargetcolormarker;
 hg.colormarkersnapshot = function(){var m="colormarkersnapshot";eval(st);return r;};if(f)colormarkersnapshot=hg.colormarkersnapshot;

 hg.restoredesktop = function(){var m="restoredesktop";eval(st);return r;};if(f)restoredesktop=hg.restoredesktop;
 hg.savedesktop = function(){var m="savedesktop";eval(st);return r;};if(f)savedesktop=hg.savedesktop;
 hg.scrolllink = function(){var m="scrolllink";eval(st);return r;};if(f)scrolllink=hg.scrolllink;
 hg.split = function(){var m="split";eval(st);return r;};if(f)split=hg.split;
 hg.setsplitinfo = function(){var m="setsplitinfo";eval(st);return r;};if(f)setsplitinfo=hg.setsplitinfo;
 hg.splitswitch = function(){var m="splitswitch";eval(st);return r;};if(f)splitswitch=hg.splitswitch;
 hg.windowcascade = function(){var m="windowcascade";eval(st);return r;};if(f)windowcascade=hg.windowcascade;
 hg.windowhorz = function(){var m="windowhorz";eval(st);return r;};if(f)windowhorz=hg.windowhorz;
 hg.windowtiling = function(){var m="windowtiling";eval(st);return r;};if(f)windowtiling=hg.windowtiling;
 hg.windowvert = function(){var m="windowvert";eval(st);return r;};if(f)windowvert=hg.windowvert;
 hg.windowlist = function(){var m="windowlist";eval(st);return r;};if(f)windowlist=hg.windowlist;
 hg.compfile = function(){var m="compfile";eval(st);return r;};if(f)compfile=hg.compfile;
 hg.COMPFILE = function(){var m="COMPFILE";eval(st);return r;};if(f)COMPFILE=hg.COMPFILE;
 hg.nextcompfile = function(){var m="nextcompfile";eval(st);return r;};if(f)nextcompfile=hg.nextcompfile;
 hg.prevcompfile = function(){var m="prevcompfile";eval(st);return r;};if(f)prevcompfile=hg.prevcompfile;
 hg.alwaystopswitch = function(){var m="alwaystopswitch";eval(st);return r;};if(f)alwaystopswitch=hg.alwaystopswitch;
 hg.settabmode = function(){var m="settabmode";eval(st);return r;};if(f)settabmode=hg.settabmode;
 hg.settabgroup = function(){var m="settabgroup";eval(st);return r;};if(f)settabgroup=hg.settabgroup;
 hg.settaborder = function(){var m="settaborder";eval(st);return r;};if(f)settaborder=hg.settaborder;
 hg.iconthistab = function(){var m="iconthistab";eval(st);return r;};if(f)iconthistab=hg.iconthistab;
 hg.fullscreen = function(){var m="fullscreen";eval(st);return r;};if(f)fullscreen=hg.fullscreen;

 hg.registercallback = function(){var m="registercallback";eval(fn);return r;};if(f)registercallback=hg.registercallback;

 hg.setbrowserpanetarget = function(){var m="setbrowserpanetarget";eval(st);return r;};if(f)setbrowserpanetarget=hg.setbrowserpanetarget;
 hg.setrenderpanetarget = function(){var m="setrenderpanetarget";eval(st);return r;};if(f)setrenderpanetarget=hg.setrenderpanetarget;
 hg.showbrowserpane = function(){var m="showbrowserpane";eval(st);return r;};if(f)showbrowserpane=hg.showbrowserpane;
 hg.refreshbrowserpane = function(){var m="refreshbrowserpane";eval(st);return r;};if(f)refreshbrowserpane=hg.refreshbrowserpane;
 hg.setbrowserpanesize = function(){var m="setbrowserpanesize";eval(st);return r;};if(f)setbrowserpanesize=hg.setbrowserpanesize;
 hg.setbrowserpaneurl = function(){var m="setbrowserpaneurl";eval(st);return r;};if(f)setbrowserpaneurl=hg.setbrowserpaneurl;
 hg.browserpanecommand = function(){var m="browserpanecommand";eval(fs1j);return r;};if(f)browserpanecommand=hg.browserpanecommand;
 hg.renderpanecommand = function(){var m="renderpanecommand";eval(fs1j);return r;};if(f)renderpanecommand=hg.renderpanecommand;

 hg.backtagjump = function(){var m="backtagjump";eval(st);return r;};if(f)backtagjump=hg.backtagjump;
 hg.directtagjump = function(){var m="directtagjump";eval(st);return r;};if(f)directtagjump=hg.directtagjump;
 hg.freecursorswitch = function(){var m="freecursorswitch";eval(st);return r;};if(f)freecursorswitch=hg.freecursorswitch;
 hg.imeswitch = function(){var m="imeswitch";eval(st);return r;};if(f)imeswitch=hg.imeswitch;
 hg.imeregisterword = function(){var m="imeregisterword";eval(st);return r;};if(f)imeregisterword=hg.imeregisterword;
 hg.help = function(){var m="help";eval(st);return r;};if(f)help=hg.help;
 hg.help2 = function(){var m="help2";eval(st);return r;};if(f)help2=hg.help2;
 hg.help3 = function(){var m="help3";eval(st);return r;};if(f)help3=hg.help3;
 hg.help4 = function(){var m="help4";eval(st);return r;};if(f)help4=hg.help4;
 hg.help5 = function(){var m="help5";eval(st);return r;};if(f)help5=hg.help5;
 hg.help6 = function(){var m="help6";eval(st);return r;};if(f)help6=hg.help6;
 hg.hidemaruhelp = function(){var m="hidemaruhelp";eval(st);return r;};if(f)hidemaruhelp=hg.hidemaruhelp;
 hg.macrohelp = function(){var m="macrohelp";eval(st);return r;};if(f)macrohelp=hg.macrohelp;
 hg.overwriteswitch = function(){var m="overwriteswitch";eval(st);return r;};if(f)overwriteswitch=hg.overwriteswitch;
 hg.readonlyswitch = function(){var m="readonlyswitch";eval(st);return r;};if(f)readonlyswitch=hg.readonlyswitch;
 hg.showcode = function(){var m="showcode";eval(st);return r;};if(f)showcode=hg.showcode;
 hg.showcharcount = function(){var m="showcharcount";eval(st);return r;};if(f)showcharcount=hg.showcharcount;
 hg.showlineno = function(){var m="showlineno";eval(st);return r;};if(f)showlineno=hg.showlineno;
 hg.tagjump = function(){var m="tagjump";eval(st);return r;};if(f)tagjump=hg.tagjump;
 hg.redraw = function(){var m="redraw";eval(st);return r;};if(f)redraw=hg.redraw;
 hg.browsemodeswitch = function(){var m="browsemodeswitch";eval(st);return r;};if(f)browsemodeswitch=hg.browsemodeswitch;
 hg.clist = function(){var m="clist";eval(st);return r;};if(f)clist=hg.clist;
 hg.clearupdated = function(){var m="clearupdated";eval(st);return r;};if(f)clearupdated=hg.clearupdated;
 hg.refreshtabstop = function(){var m="refreshtabstop";eval(st);return r;};if(f)refreshtabstop=hg.refreshtabstop;
 hg.refreshtabstop_pause = function(){var m="refreshtabstop_pause";eval(st);return r;};if(f)refreshtabstop_pause=hg.refreshtabstop_pause;
 hg.refreshtabstop_shrink = function(){var m="refreshtabstop_shrink";eval(st);return r;};if(f)refreshtabstop_shrink=hg.refreshtabstop_shrink;
 hg.refreshtabstop_current = function(){var m="refreshtabstop_current";eval(st);return r;};if(f)refreshtabstop_current=hg.refreshtabstop_current;
 hg.autospellcheckswitch = function(){var m="autospellcheckswitch";eval(st);return r;};if(f)autospellcheckswitch=hg.autospellcheckswitch;
 hg.spellcheckdialog = function(){var m="spellcheckdialog";eval(st);return r;};if(f)spellcheckdialog=hg.spellcheckdialog;
 hg.savebacktagjump = function(){var m="savebacktagjump";eval(st);return r;};if(f)savebacktagjump=hg.savebacktagjump;

 hg.fold = function(){var m="fold";eval(st);return r;};if(f)fold=hg.fold;
 hg.unfold = function(){var m="unfold";eval(st);return r;};if(f)unfold=hg.unfold;
 hg.nextfoldable = function(){var m="nextfoldable";eval(st);return r;};if(f)nextfoldable=hg.nextfoldable;
 hg.prevfoldable = function(){var m="prevfoldable";eval(st);return r;};if(f)prevfoldable=hg.prevfoldable;
 hg.selectfoldable = function(){var m="selectfoldable";eval(st);return r;};if(f)selectfoldable=hg.selectfoldable;
 hg.foldall = function(){var m="foldall";eval(st);return r;};if(f)foldall=hg.foldall;
 hg.unfoldall = function(){var m="unfoldall";eval(st);return r;};if(f)unfoldall=hg.unfoldall;
 hg.rangeeditin = function(){var m="rangeeditin";eval(st);return r;};if(f)rangeeditin=hg.rangeeditin;
 hg.rangeeditout = function(){var m="rangeeditout";eval(st);return r;};if(f)rangeeditout=hg.rangeeditout;
 hg.nextoutlineitem = function(){var m="nextoutlineitem";eval(st);return r;};if(f)nextoutlineitem=hg.nextoutlineitem;
 hg.prevoutlineitem = function(){var m="prevoutlineitem";eval(st);return r;};if(f)prevoutlineitem=hg.prevoutlineitem;
 hg.showoutline = function(){var m="showoutline";eval(st);return r;};if(f)showoutline=hg.showoutline;
 hg.showoutlinebar = function(){var m="showoutlinebar";eval(st);return r;};if(f)showoutlinebar=hg.showoutlinebar;
 hg.showfoldingbar = function(){var m="showfoldingbar";eval(st);return r;};if(f)showfoldingbar=hg.showfoldingbar;
 hg.syncoutline = function(){var m="syncoutline";eval(st);return r;};if(f)syncoutline=hg.syncoutline;
 hg.refreshoutline = function(){var m="refreshoutline";eval(st);return r;};if(f)refreshoutline=hg.refreshoutline;
 hg.setoutlinesize = function(){var m="setoutlinesize";eval(st);return r;};if(f)setoutlinesize=hg.setoutlinesize;

 hg.message = function(){var m="message";eval(fn1s2s);return r;};if(f)message=hg.message;
 hg.question = function(){var m="question";eval(st1s);return r;};if(f)question=hg.question;
 hg.beep = function(){var m="beep";eval(st);return r;};if(f)beep=hg.beep;
 hg.play = function(){var m="play";eval(st);return r;};if(f)play=hg.play;
 hg.playsync = function(){var m="playsync";eval(st);return r;};if(f)playsync=hg.playsync;
 hg.debuginfo = function(){var m="debuginfo";eval(st);return r;};if(f)debuginfo=hg.debuginfo;
 hg.showvars = function(){var m="showvars";eval(st);return r;};if(f)showvars=hg.showvars;
 hg.title = function(){var m="title";eval(st);return r;};if(f)title=hg.title;

 hg.run = function(){var m="run";eval(st);return r;};if(f)run=hg.run;
 hg.runsync = function(){var m="runsync";eval(st);return r;};if(f)runsync=hg.runsync;
 hg.runsync2 = function(){var m="runsync2";eval(st);return r;};if(f)runsync2=hg.runsync2;
 hg.runex = function(){var m="runex";eval(st);return r;};if(f)runex=hg.runex;

 hg.endmacro = function(){throw "endmacro";};if(f)endmacro=hg.endmacro;
 hg.endmacroall = function(){throw "endmacroall";};if(f)endmacroall=hg.endmacroall;

 hg.disabledraw = function(){var m="disabledraw";eval(st);return r;};if(f)disabledraw=hg.disabledraw;
 hg.enabledraw = function(){var m="enabledraw";eval(st);return r;};if(f)enabledraw=hg.enabledraw;
 hg.disabledraw2 = function(){var m="disabledraw2";eval(st);return r;};if(f)disabledraw2=hg.disabledraw2;
 hg.disablebreak = function(){var m="disablebreak";eval(st);return r;};if(f)disablebreak=hg.disablebreak;
 hg.enablebreak = function(){var m="enablebreak";eval(st);return r;};if(f)enablebreak=hg.enablebreak;
 hg.disableinvert = function(){var m="disableinvert";eval(st);return r;};if(f)disableinvert=hg.disableinvert;
 hg.enableinvert = function(){var m="enableinvert";eval(st);return r;};if(f)enableinvert=hg.enableinvert;
 hg.disableerrormsg = function(){var m="disableerrormsg";eval(st);return r;};if(f)disableerrormsg=hg.disableerrormsg;
 hg.enableerrormsg = function(){var m="enableerrormsg";eval(st);return r;};if(f)enableerrormsg=hg.enableerrormsg;
 hg.disablehistory = function(){var m="disablehistory";eval(st);return r;};if(f)disablehistory=hg.disablehistory;
 hg.sleep = function(){var m="sleep";eval(st);return r;};if(f)sleep=hg.sleep;
 hg.setcompatiblemode = function(){var m="setcompatiblemode";eval(fn);return r;};if(f)setcompatiblemode=hg.setcompatiblemode;
 hg.setfloatmode = function(){var m="setfloatmode";eval(st);return r;};if(f)setfloatmode=hg.setfloatmode;
 hg.seterrormode = function(){var m="seterrormode";eval(st);return r;};if(f)seterrormode=hg.seterrormode;
 hg.setbackgroundmode = function(){var m="setbackgroundmode";eval(st);return r;};if(f)setbackgroundmode=hg.setbackgroundmode;

 hg.inputpos = function(){var m="inputpos";eval(st);return r;};if(f)inputpos=hg.inputpos;
 hg.menu = function(){var m="menu";eval(st);return r;};if(f)menu=hg.menu;
 hg.mousemenu = function(){var m="mousemenu";eval(st);return r;};if(f)mousemenu=hg.mousemenu;
 hg.menuarray = function(){var m="menu";eval(stary);return r;};if(f)menuarray=hg.menuarray;
 hg.mousemenuarray = function(){var m="mousemenu";eval(stary);return r;};if(f)mousemenuarray=hg.mousemenuarray;
 hg.setmenudelay = function(){var m="setmenudelay";eval(st);return r;};if(f)setmenudelay=hg.setmenudelay;
 hg.input = function(){var m="input";eval(fs);return r;};if(f)input=hg.input;
 hg.inputchar = function(){var m="inputchar";eval(fn);return r;};if(f)inputchar=hg.inputchar;
 hg.iskeydown = function(){var m="iskeydown";eval(fn);return r;};if(f)iskeydown=hg.iskeydown;

 hg.getininum = function(){var m="getininum";eval(fn);return r;};if(f)getininum=hg.getininum;
 hg.getininumw = function(){var m="getininumw";eval(fn);return r;};if(f)getininumw=hg.getininumw;
 hg.getinistr = function(){var m="getinistr";eval(fs);return r;};if(f)getinistr=hg.getinistr;
 hg.getinistrw = function(){var m="getinistrw";eval(fs);return r;};if(f)getinistrw=hg.getinistrw;
 hg.writeininum = function(){var m="writeininum";eval(st);return r;};if(f)writeininum=hg.writeininum;
 hg.writeininumw = function(){var m="writeininumw";eval(st);return r;};if(f)writeininumw=hg.writeininumw;
 hg.writeinistr = function(){var m="writeinistr";eval(st);return r;};if(f)writeinistr=hg.writeinistr;
 hg.writeinistrw = function(){var m="writeinistrw";eval(st);return r;};if(f)writeinistrw=hg.writeinistrw;

 hg.openreg = function(){var m="openreg";eval(st);return r;};if(f)openreg=hg.openreg;
 hg.createreg = function(){var m="createreg";eval(st);return r;};if(f)createreg=hg.createreg;
 hg.closereg = function(){var m="closereg";eval(st);return r;};if(f)closereg=hg.closereg;
 hg.writeregbinary = function(){var m="writeregbinary";eval(st);return r;};if(f)writeregbinary=hg.writeregbinary;
 hg.writeregnum = function(){var m="writeregnum";eval(st);return r;};if(f)writeregnum=hg.writeregnum;
 hg.writeregstr = function(){var m="writeregstr";eval(st);return r;};if(f)writeregstr=hg.writeregstr;
 hg.getregbinary = function(){var m="getregbinary";eval(fs);return r;};if(f)getregbinary=hg.getregbinary;
 hg.getregnum = function(){var m="getregnum";eval(fn);return r;};if(f)getregnum=hg.getregnum;
 hg.getregstr = function(){var m="getregstr";eval(fs);return r;};if(f)getregstr=hg.getregstr;
 hg.enumregkey = function(){var m="enumregkey";eval(fs);return r;};if(f)enumregkey=hg.enumregkey;
 hg.enumregvalue = function(){var m="enumregvalue";eval(fs2rn);arguments[1].regtype=gtv("###2");return r;};if(f)enumregvalue=hg.enumregvalue;
 hg.deletereg = function(){var m="deletereg";eval(st);return r;};if(f)deletereg=hg.deletereg;

 hg.configset = function(){var m="configset";eval(st);return r;};if(f)configset=hg.configset;
 hg.config = function(){var m="config";eval(st);return r;};if(f)config=hg.config;
 hg.getconfig = function(){var m="getconfig";eval(fsn);return r;};if(f)getconfig=hg.getconfig;
 hg.configcolor = function(){var m="configcolor";eval(st);return r;};if(f)configcolor=hg.configcolor;
 hg.getconfigcolor = function(){var m="getconfigcolor";eval(fn);return r;};if(f)getconfigcolor=hg.getconfigcolor;
 hg.saveconfig = function(){var m="saveconfig";eval(st);return r;};if(f)saveconfig=hg.saveconfig;
 hg.setconfigstate = function(){var m="setconfigstate";eval(st);return r;};if(f)setconfigstate=hg.setconfigstate;
 hg.setfiletype = function(){var m="setfiletype";eval(st);return r;};if(f)setfiletype=hg.setfiletype;
 hg.envchanged = function(){var m="envchanged";eval(st);return r;};if(f)envchanged=hg.envchanged;
 hg.loadkeyassign = function(){var m="loadkeyassign";eval(st);return r;};if(f)loadkeyassign=hg.loadkeyassign;
 hg.savekeyassign = function(){var m="savekeyassign";eval(st);return r;};if(f)savekeyassign=hg.savekeyassign;
 hg.loadhilight = function(){var m="loadhilight";eval(st);return r;};if(f)loadhilight=hg.loadhilight;
 hg.savehilight = function(){var m="savehilight";eval(st);return r;};if(f)savehilight=hg.savehilight;
 hg.loadbookmark = function(){var m="loadbookmark";eval(st);return r;};if(f)loadbookmark=hg.loadbookmark;
 hg.savebookmark = function(){var m="savebookmark";eval(st);return r;};if(f)savebookmark=hg.savebookmark;
 hg.setfontchangemode = function(){var m="setfontchangemode";eval(st);return r;};if(f)setfontchangemode=hg.setfontchangemode;
 hg.settabstop = function(){var m="settabstop";eval(st);return r;};if(f)settabstop=hg.settabstop;
 hg.gettabstop = function(){var m="gettabstop";eval(fs);return r;};if(f)gettabstop=hg.gettabstop;
 hg.convert_return_in_cell = function(){var m="convert_return_in_cell";eval(st);return r;};if(f)convert_return_in_cell=hg.convert_return_in_cell;

 hg.showwindow = function(){var m="showwindow";eval(st);return r;};if(f)showwindow=hg.showwindow;
 hg.setmonitor = function(){var m="setmonitor";eval(st);return r;};if(f)setmonitor=hg.setmonitor;
 hg.setwindowpos = function(){var m="setwindowpos";eval(st);return r;};if(f)setwindowpos=hg.setwindowpos;
 hg.setwindowsize = function(){var m="setwindowsize";eval(st);return r;};if(f)setwindowsize=hg.setwindowsize;
 hg.setfocus = function(){var m="setfocus";eval(st);return r;};if(f)setfocus=hg.setfocus;

 hg.begingroupundo = function(){var m="begingroupundo";eval(st);return r;};if(f)begingroupundo=hg.begingroupundo;
 hg.endgroupundo = function(){var m="endgroupundo";eval(st);return r;};if(f)endgroupundo=hg.endgroupundo;
 hg.findspecial = function(){var m="findspecial";eval(st);return r;};if(f)findspecial=hg.findspecial;
 hg.setstaticvariable = function(){var m="setstaticvariable";eval(st);return r;};if(f)setstaticvariable=hg.setstaticvariable;
 hg.getstaticvariable = function(){var m="getstaticvariable";eval(fs);return r;};if(f)getstaticvariable=hg.getstaticvariable;
 hg.setregularcache = function(){var m="setregularcache";eval(st);return r;};if(f)setregularcache=hg.setregularcache;
 hg.hidemaruversion = function(){var m="hidemaruversion";if(arguments.length>=1&&typeof(arguments[0])=="string"){eval(st);}else{eval(fs);}return r;};if(f)hidemaruversion=hg.hidemaruversion;

 hg.keyhook = function(){var m="keyhook";eval(fn);return r;};if(f)keyhook=hg.keyhook;
 hg.clearkeyhook = function(){var m="clearkeyhook";eval(st);return r;};if(f)clearkeyhook=hg.clearkeyhook;

 hg.hidemaruorder = function(){var m="hidemaruorder";eval(fn);return r;};if(f)hidemaruorder=hg.hidemaruorder;
 hg.hidemarucount = function(){var m="hidemarucount";eval(fn);return r;};if(f)hidemarucount=hg.hidemarucount;
 hg.findhidemaru = function(){var m="findhidemaru";eval(fn);return r;};if(f)findhidemaru=hg.findhidemaru;
 hg.hidemaruhandle = function(){var m="hidemaruhandle";eval(fn);return r;};if(f)hidemaruhandle=hg.hidemaruhandle;
 hg.closehidemaru = function(){var m="closehidemaru";eval(st);return r;};if(f)closehidemaru=hg.closehidemaru;
 hg.closehidemaruforced = function(){var m="closehidemaruforced";eval(st);return r;};if(f)closehidemaruforced=hg.closehidemaruforced;

 hg.getcurrenttab = function(){var m="getcurrenttab";eval(fn);return r;};if(f)getcurrenttab=hg.getcurrenttab;
 hg.gettabhandle = function(){var m="gettabhandle";eval(fn);return r;};if(f)gettabhandle=hg.gettabhandle;

 hg.beginclipboardread = function(){var m="beginclipboardread";eval(st);return r;};if(f)beginclipboardread=hg.beginclipboardread;
 hg.getclipboard = function(){var m="getclipboard";eval(fs);return r;};if(f)getclipboard=hg.getclipboard;
 hg.setclipboard = function(){var m="setclipboard";eval(st1s);return r;};if(f)setclipboard=hg.setclipboard;
 hg.addclipboard = function(){var m="addclipboard";eval(st1s);return r;};if(f)addclipboard=hg.addclipboard;
 hg.getclipboardinfo = function(){var m="getclipboardinfo";eval(fn);return r;};if(f)getclipboardinfo=hg.getclipboardinfo;


 hg.event = function(){var m="event";eval(fn);return r;};if(f)event=hg.event;
 hg.geteventparam = function(){var m="geteventparam";eval(fsn);return r;};if(f)geteventparam=hg.geteventparam;
 hg.seteventnotify = function(){var m="seteventnotify";eval(st);return r;};if(f)seteventnotify=hg.seteventnotify;
 hg.geteventnotify = function(){var m="geteventnotify";eval(fn);return r;};if(f)geteventnotify=hg.geteventnotify;

 hg.gettotaltext = function(){ var m="gettotaltext";eval(fs0);return r;};if(f)gettotaltext=hg.gettotaltext;
 hg.getlinetext = function(){ var m="getlinetext";eval(fs0);return r;};if(f)getlinetext=hg.getlinetext;
 hg.getselectedtext = function(){ var m="getselectedtext";eval(fs0);return r;};if(f)getselectedtext=hg.getselectedtext;

 hg.setselectionrange = function(){var m="setselectionrange";eval(st1j);return r;};if(f)setselectionrange=hg.setselectionrange;
 hg.getselectedrange = function(){var m="getselectedrange";eval(fs1j);return JSON.parse(r);};if(f)getselectedrange=hg.getselectedrange;

 hg.execmacro = function(){var m="execmacro"; eval(ns); return 0; };if(f)execmacro=hg.execmacro;
 hg.js = function(){var m="js"; eval(ns); return 0; };if(f)js=hg.js;
 hg.jsmode = function(){var m="jsmode"; eval(ns); return 0; };if(f)jsmode=hg.jsmode;
 hg.execjs = function(){var m="execjs"; eval(ns); return 0; };if(f)execjs=hg.execjs;

 hg.GREP = function(){var m="GREP"; eval(ns); return 0; };if(f)GREP=hg.GREP;
 hg.FIND = function(){var m="FIND"; eval(ns); return 0; };if(f)FIND=hg.FIND;
 hg.ENV = function(){var m="ENV"; eval(ns); return 0; };if(f)ENV=hg.ENV;
 hg.call = function(){var m="call"; eval(ns); return 0; };if(f)call=hg.call;
 hg.refcall = function(){var m="refcall"; eval(ns); return 0; };if(f)refcall=hg.refcall;
 hg.setactivehidemaru = function(){var m="setactivehidemaru"; eval(ns); return 0; };if(f)setactivehidemaru=hg.setactivehidemaru;
 hg.nexthidemaru = function(){var m="nexthidemaru"; eval(ns); return 0; };if(f)nexthidemaru=hg.nexthidemaru;
 hg.prevhidemaru = function(){var m="prevhidemaru"; eval(ns); return 0; };if(f)prevhidemaru=hg.prevhidemaru;
 hg.nexthidemaruicon = function(){var m="nexthidemaruicon"; eval(ns); return 0; };if(f)nexthidemaruicon=hg.nexthidemaruicon;
 hg.prevhidemaruicon = function(){var m="prevhidemaruicon"; eval(ns); return 0; };if(f)prevhidemaruicon=hg.prevhidemaruicon;
 hg.nexttab = function(){var m="nexttab"; eval(ns); return 0; };if(f)nexttab=hg.nexttab;
 hg.prevtab = function(){var m="prevtab"; eval(ns); return 0; };if(f)prevtab=hg.prevtab;
 hg.getobject = function(){var m="getobject"; eval(ns); return 0; };if(f)getobject=hg.getobject;
 hg.msdnlibrary = function(){var m="msdnlibrary"; eval(ns); return 0; };if(f)msdnlibrary=hg.msdnlibrary;
 hg.ddeexecute = function(){var m="ddeexecute"; eval(ns); return 0; };if(f)ddeexecute=hg.ddeexecute;
 hg.ddeexecutew = function(){var m="ddeexecutew"; eval(ns); return 0; };if(f)ddeexecutew=hg.ddeexecutew;
 hg.ddeinitiate = function(){var m="ddeinitiate"; eval(ns); return 0; };if(f)ddeinitiate=hg.ddeinitiate;
 hg.ddeinitiatew = function(){var m="ddeinitiatew"; eval(ns); return 0; };if(f)ddeinitiatew=hg.ddeinitiatew;
 hg.ddepoke = function(){var m="ddepoke"; eval(ns); return 0; };if(f)ddepoke=hg.ddepoke;
 hg.ddepokew = function(){var m="ddepokew"; eval(ns); return 0; };if(f)ddepokew=hg.ddepokew;
 hg.dderequest = function(){var m="dderequest"; eval(ns); return 0; };if(f)dderequest=hg.dderequest;
 hg.dderequestw = function(){var m="dderequestw"; eval(ns); return 0; };if(f)dderequestw=hg.dderequestw;
 hg.ddestartadvice = function(){var m="ddestartadvice"; eval(ns); return 0; };if(f)ddestartadvice=hg.ddestartadvice;
 hg.ddestartadvicew = function(){var m="ddestartadvicew"; eval(ns); return 0; };if(f)ddestartadvicew=hg.ddestartadvicew;
 hg.ddestopadvice = function(){var m="ddestopadvice"; eval(ns); return 0; };if(f)ddestopadvice=hg.ddestopadvice;
 hg.ddestopadvicew = function(){var m="ddestopadvicew"; eval(ns); return 0; };if(f)ddestopadvicew=hg.ddestopadvicew;
 hg.ddeterminate = function(){var m="ddeterminate"; eval(ns); return 0; };if(f)ddeterminate=hg.ddeterminate;
 hg.ddewaitadvice = function(){var m="ddewaitadvice"; eval(ns); return 0; };if(f)ddewaitadvice=hg.ddewaitadvice;
 hg.ddewaitadvicew = function(){var m="ddewaitadvicew"; eval(ns); return 0; };if(f)ddewaitadvicew=hg.ddewaitadvicew;
 hg.keepdde = function(){var m="keepdde"; eval(ns); return 0; };if(f)keepdde=hg.keepdde;

 hg.exit = function(){var m="exit";eval(ns);return 0;};if(f)exit=hg.exit;
 hg.exitall = function(){var m="exitall";eval(ns);return 0;};if(f)exitall=hg.exitall;
 hg.saveexit = function(){var m="saveexit";eval(ns);return 0;};if(f)saveexit=hg.saveexit;
 hg.saveexitall = function(){var m="saveexitall";eval(ns);return 0;};if(f)saveexitall=hg.saveexitall;
 hg.quit = function(){var m="quit";eval(ns);return 0;};if(f)quit=hg.quit;
 hg.quitall = function(){var m="quitall";eval(ns);return 0;};if(f)quitall=hg.quitall;

 if(f){
 getVar=hidemaru.getVar;
 setVar=hidemaru.setVar;
 evalMacro=hidemaru.evalMacro;
 evalJs = function(s){return eval(s);};
 loadTextFile = function(s){return hidemaru.loadTextFile(s);};
 }

 if (typeof hidemaruCompat == 'undefined') {
 hidemaruCompat = {};
 }
 var hc = hidemaruCompat;
 if (hc) {
 hc.loaddll = function(){var m="loaddll";eval(fn); return r;}
 hc.freedll = function(){var m="freedll ";eval(st); return r;}
 hc.dllfunc = function(){var m="dllfunc";eval(fn);return r;}
 hc.dllfuncw = function(){var m="dllfuncw";eval(fn);return r;}
 hc.dllfuncstr = function(){var m="dllfuncstr";eval(fs);return r;}
 hc.dllfuncstrw = function(){var m="dllfuncstrw";eval(fs);return r;}
 hc.getloaddllfile = function(){var m="getloaddllfile";eval(fs);return r;}
 hc.setdlldetachfunc = function(){var m="setdlldetachfunc";eval(st);return r;}
 hc.dllfuncexist = function(){var m="dllfuncexist";eval(fn);return r;}
 hc.keepdll = function(){var m="keepdll";eval(st);return r;}

 hc.createobject = function(){var m="createobject";eval(fn); return r;}
 hc.releaseobject = function(){var m="releaseobject";eval(st); return r;}
 hc.member = {
    rnum:function(){var m="member";eval(fn); return r;},
    rstr:function(){var m="member";eval(fs); return r;}
 };
 hc.setcomdetachmethod = function(){var m="setcomdetachmethod";eval(st); return r;}
 hc.keepobject = function(){var m="keepobject";eval(st); return r;}
 }

hidemaruFlags = {
 Encode : {
  Sjis : 0x01,
  Utf16 : 0x02,
  Euc : 0x03,
  Jis : 0x04,
  Utf7 : 0x05,
  Utf8 : 0x06,
  Utf16_be : 0x07,
  Euro : 0x08,
  Gb2312 : 0x09,
  Big5 : 0x0a,
  Euckr : 0x0b,
  Johab : 0x0c,
  Easteuro : 0x0d,
  Baltic : 0x0e,
  Greek : 0x0f,
  Russian : 0x10,
  Symbol : 0x11,
  Turkish : 0x12,
  Hebrew : 0x13,
  Arabic : 0x14,
  Thai : 0x15,
  Vietnamese : 0x16,
  Mac : 0x17,
  Oem : 0x18,
  Default : 0x19,
  Utf32 : 0x1b,
  Utf32_be : 0x1c,
  Binary : 0x1a,
  LF : 0x40,
  CR : 0x80,

  Bom : 0x0600,
  NoBom : 0x0400,
  Selection : 0x2000,

  NoAddHist : 0x0100,
  WS : 0x0800,
  WB : 0x1000,
 },

 SearchOption : {
  Word : 0x00000001,
  Casesense : 0x00000002,
  NoCasesense : 0x00000000,
  Regular : 0x00000010,
  NoRegular : 0x00000000,
  Fuzzy : 0x00000020,
  Hilight : 0x00003800,
  NoHilight : 0x00002000,
  LinkNext : 0x00000080,
  Loop : 0x01000000,

  MaskComment : 0x00020000,
  MaskIfdef : 0x00040000,
  MaskNormal : 0x00010000,
  MaskScript : 0x00080000,
  MaskString : 0x00100000,
  MaskTag : 0x00200000,
  MaskOnly : 0x00400000,
  FEnableMaskFlags : 0x00800000,

  FEnableReplace : 0x00000004,
  Ask : 0x00000008,
  NoClose : 0x02000000,

  SubDir : 0x00000100,
  Icon : 0x00000200,
  Filelist : 0x00000040,
  FullPath : 0x00000400,
  OutputSingle : 0x10000000,
  OutputSameTab : 0x20000000,

  BackUp : 0x04000000,
  Preview : 0x08000000,

  FEnableSearchOption2 : 0x80000000
 },

 SearchOption2 : {
  UnMatch : 0x00000001,
  InColorMarker : 0x00000002,
  FGrepFormColumn : 0x00000008,
  FGrepFormHitOnly : 0x00000010,
  FGrepFormSortDate : 0x00000020,
 }
};

hm.Macro.Flags = hidemaruFlags;

}());

