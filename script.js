var context = ctx = MainActivity = getContext();
var sdcard = android.os.Environment.getExternalStorageDirectory();

var MediaStore = android.provider.MediaStore;
var MediaPlayer = android.media.MediaPlayer;
var DownloadManager = android.app.DownloadManager;
var BatteryManager = android.os.BatteryManager;

var animation = android.R.style.Animation_InputMethod;
var animations = {
translucent:android.R.style.Animation_Translucent,
dialog:android.R.style.Animation_Dialog,
toast:android.R.style.Animation_Toast,
}
var Button = android.widget.Button;
var EditText = android.widget.EditText;
var ImageView = android.widget.ImageView;
var View = android.view.View;
var TextView = android.widget.TextView;
var SeekBar = android.widget.SeekBar;

var ScrollView = android.widget.ScrollView;
var LinearLayout = android.widget.LinearLayout;
var LayoutParams = LinearLayout.LayoutParams; 
var PopupWindow = android.widget.PopupWindow;
var RelativeLayout = android.widget.RelativeLayout;
var GridLayout = android.widget.GridLayout;

var ColorDrawable = android.graphics.drawable.ColorDrawable;
var Color = android.graphics.Color;
var Typeface = android.graphics.Typeface;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var GradientDrawable = android.graphics.drawable.GradientDrawable;
var Bitmap = android.graphics.Bitmap;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var BitmapFactory = android.graphics.BitmapFactory;
var Matrix = android.graphics.Matrix;

var fromHtml = android.text.Html.fromHtml;
var String = java.lang.String;
var Base64 = android.util.Base64;
var Cipher = javax.crypto.Cipher;
var SecretKeySpec = javax.crypto.spec.SecretKeySpec;

var Runnable = java.lang.Runnable;
var Thread = java.lang.Thread;
var Runtime = java.lang.Runtime;

var Gravity = android.view.Gravity;
var Intent = android.content.Intent;
var ColorStateList = android.content.res.ColorStateList;
var MotionEvent = android.view.MotionEvent;
var Uri = android.net.Uri;

var BufferedReader = java.io.BufferedReader;
var FileReader = java.io.FileReader; 
var File = java.io.File;
var StringBuilder = java.lang.StringBuilder; 
var FOS = java.io.FileOutputStream;
var FIS = java.io.FileInputStream;
var ZipEntry = java.util.zip.ZipEntry;
var ZipOutputStream = java.util.zip.ZipOutputStream;

var UiWidth = ctx.getWindowManager().getDefaultDisplay().getWidth();
var UiHeight = ctx.getWindowManager().getDefaultDisplay().getHeight();
var WR_CNT = RelativeLayout.LayoutParams.WRAP_CONTENT;
var MCH_PNT = RelativeLayout.LayoutParams.MATCH_PARENT;


var amster_OS={
my_root:{
current_user:"",
system_path:sdcard+"/amster_OS/",
getDir: function(){
rootD = amster_OS.my_root.system_path+amster_OS.my_root.current_user;
return [
rootD+"/games/krestikinoliki/",
rootD+"/games/clicker/",
rootD+"/programs/calculator/",
rootD+"/programs/calendar/",
rootD+"/programs/mpplayer/",
rootD+"/programs/browser/",
rootD+"/programs/explorer/",
rootD+"/programs/myapps/",
rootD+"/games/snake/",
rootD+"/programs/rootcheck/",
rootD+"/programs/settings/",
//data id 11,12,13,14
rootD+"/userapps/",
rootD+"/games/",
rootD+"/programs/",
rootD+"/libs/"
];
}
},
Data:{
getValue: function(keyname,puthV){ 
var result = null; 
try{ 
var br = new BufferedReader(new FileReader(puthV)); 
var str; 
while((str = br.readLine()) != null){ 
if(str.split(":")[0] == keyname) 
result = str.split(":")[1]; 
} 
}catch(e){ 
print(e + " #" + e.lineNumber); 
} 
return result; 
},
setValue: function(keyname,value,puthV){
var fileV = new File(puthV);
let readed = amster_OS.fast_files.readFile(puthV);
readed=readed.split(keyname+":"+this.getValue(keyname,puthV)).join("");
let writed = (keyname+":"+value+'\n')
var writeFOS = new FOS(fileV);
writeFOS.write(new String(readed+writed).getBytes());
},
config:{
create: function(path){
var file = new File(path);
if(!file.exists()){
file.createNewFile();
amster_OS.fast_files.rewriteFile(path,"{\n\n}");
}
},
get: function(path,key){
if(new File(path).exists()){
var text = amster_OS.fast_files.readFile(path);
var cfg = new org.json.JSONObject(text);
if(!cfg.has(key)){
return "incorrect value";
}
return cfg.get(key);
}
return "incorrect path";
},
set: function(key,value,path){
if(new File(path).exists()){
var text = amster_OS.fast_files.readFile(path);
var cfg = new org.json.JSONObject(text.toString());
cfg.put(key,value);
amster_OS.fast_files.rewriteFile(path,cfg.toString());
}else{
print("path error");
}
},
del: function(path,key){
if(new File(path).exists()){
var text = amster_OS.fast_files.readFile(path);
var cfg = new org.json.JSONObject(text.toString());
cfg.remove(key);
amster_OS.fast_files.rewriteFile(path,cfg.toString());
}
}
}
},
fast_files: {
getFolderSize: function(path){
var size = 0;
var files = new File(path).list();
for(var i in files){
var file = new File(path+files[i]);
if(file.isFile()){
size+=file.length();
}else{
size+=amster_OS.fast_files.getFolderSize(path+files[i]+"/");
}}
return size;
},
writeFile: function(path,text){
var readed = amster_OS.fast_files.readFile(path);
var writeFOS;
try{
writeFOS = new FOS(path);
writeFOS.write(new String(readed+"\n"+text).getBytes());
}finally{
writeFOS.close();
}
},
rewriteFile: function(path,text){
var writeFOS;
try{
writeFOS = new FOS(path);
writeFOS.write(new String(text).getBytes());
}finally{
writeFOS.close();
}
},
readFile:function(path){
var file = new File(path)
var readed = (new BufferedReader(new FileReader(file)));
var data = new StringBuilder();
var string;
while((string = readed.readLine()) != null){
if(string!=""){
data.append(string);
data.append('\n');
}
}
return data.toString()
},
copyFile: function(path,newputhn){
if(path!=newputhn){
var fis,fos;
try { 
var fl123 = new File(path);
fis = new FIS(fl123); 
fos = new FOS(new File(newputhn+fl123.getName())); 
var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024); 
 var length; 
 while ((length = fis.read(buffer)) > 0) { 
 fos.write(buffer, 0, length); 
 } 
 } finally { 
fis.close(); 
fos.close(); 
 }
}
},
cutFile: function(puthn,newputhn){
var file = new File(puthn);
this.copyFile(puthn,newputhn);
file.delete();
},
getFileFormat: function(file){
 if(file.isFile()){
  var name = (""+file.getName()).split(".").pop();
  var format = ["js", "txt", "png", "jpg", "apk", "doc", "zip", "7z", "jpeg", "webp", "pdf", "mp4","mp3","ogg","xml","html"];
  var description = ["JavaScript", "Text", "Photo", "Photo", "Program", "Word file", "Archive", "Archive", "Photo", "Photo", "Portable Document Format", "Video","Sound","Sound","XML Text","HTML Text"];
  
  for(let i in format){
   if(name.indexOf(format[i]) != -1){
    return description[i];
    }
   }
   for(let i in format){
    if(name.indexOf(format[i]) == -1) return "unknown format";
   }
  }else{
   return "Folder";
  }
},
convertSize: function(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
},
addFolderToZip: function(args) {
        var pathToFolder = args[0];
        var pathToArchive = args[1];

        try {
            var fos = new FOS(pathToArchive);
            var zos = new ZipOutputStream(fos);

            amster_OS.fast_files.addFolder("", pathToFolder, zos);

            zos.close();
            fos.close();
        } catch (e) {
            print (e);
        }
    },
addFolder: function(parentPath, folderPath, zos){
        var folder = new File(folderPath).list();
for (var i in folder) {
            var filePath = folderPath + "/" + folder[i];
            var file = new File(filePath);
            if (file.isDirectory()) {
                amster_OS.fast_files.addFolder(parentPath + file.getName() + "/", filePath, zos);
                continue;
            }
            var fis = new FIS(filePath);
            zos.putNextEntry(new ZipEntry(parentPath + file.getName()));
var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024); 
 var length; 
 while ((length = fis.read(buffer)) > 0) { 
 zos.write(buffer, 0, length); 
 } 
            fis.close();
}
        },
containsEntry: function(zipputh, filename){
var filey = amster_OS.fast_files.getFileFromZip(zipputh, filename);
if(filey.exists()){
var bg = BitmapDrawable(filey);
return bg;
}
},
extractFilesFromZip: function(zipputh, outputPath){
    var z = new java.util.zip.ZipFile(zipputh);
    var entries = z.entries();
    while(entries.hasMoreElements()){
        var entry = entries.nextElement();
        if(!entry.isDirectory()){
            var fileName = entry.getName();
            var input = z.getInputStream(entry);
            var output = new java.io.FileOutputStream(outputPath + "/" + fileName);
            var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
            var len;
            while ((len = input.read(buffer)) != -1) {
                output.write(buffer, 0, len);
            }
            output.close();
            input.close();
        }
    }
    z.close();
},
getFileFromZip: function(zipputh, filename){
var z = new java.util.zip.ZipFile(zipputh);
if(z.getEntry(filename) != null){
var input = z.getInputStream(z.getEntry(filename))
var tempfl = File.createTempFile("annsns","xd8837hdh");
var fos = new FOS(tempfl);
var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024); 
 var length; 
 while ((length = input.read(buffer)) > 0) { 
 fos.write(buffer, 0, length); 
 } 
fos.close(); 
input.close(); 
return tempfl;
}
},
getZipEntryNames: function(zip){
var msvname = [];
var fos = new FIS(zip);
var zos = new java.util.zip.ZipInputStream(fos);
var entry;
while((entry=zos.getNextEntry())!=null){
msvname.push(entry.getName())
}
zos.closeEntry();
return msvname;
}
},
screen:{
dipSize: function(dips){ 
 return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density); 
 }
},
graphics : {
colors:["#2aa8d8","#5296b3","#0e1122"],
system_design:{cl1:"#1565c0",cl2:"#81d4fa",gr:"TL_BR"},
print_design:{size:15,cl:"#ffffff",cl2:"#000000",al:150,cor:50},
easyColor: function (clrs){
amster_OS.graphics.colors[0]=clrs[0];
amster_OS.graphics.colors[1]=clrs[1];
amster_OS.graphics.colors[2]=clrs[2];
},
returncolors: function (){
amster_OS.graphics.colors=["#2aa8d8","#5296b3","#0e1122"];
},
easyButton : function (txt,prm){
var fasttxt = new TextView(ctx);
 fasttxt.setGravity(prm[0]);   
    fasttxt.setTextSize(prm[1]);
fasttxt.setAllCaps(false);
fasttxt.setTextColor(Color.parseColor(amster_OS.graphics.colors[0]));
fasttxt.setText(fromHtml('<b><font color='+amster_OS.graphics.colors[0]+'>'+txt+'</font></b>'));   
return fasttxt;
},
easyToggle: function (txt,value){
var fasttxt = new android.widget.Switch(ctx);
    fasttxt.setText(fromHtml('<b><font color='+amster_OS.graphics.colors[0]+'>'+txt+'</font></b>'));
fasttxt.setAllCaps(false);
fasttxt.setTextColor(Color.parseColor(amster_OS.graphics.colors[0]));
fasttxt.setChecked(value);
if(value){
fasttxt.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
fasttxt.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));//голубой
}else{
fasttxt.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
fasttxt.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));//светло голуб
}
fasttxt.setTypeface(null, Typeface.BOLD);
return fasttxt;
},
easyBar: function (par){
var bg = new GradientDrawable();
bg.setAlpha(50);
bg.setCornerRadius(30);
bg.setStroke(5, Color.BLACK);
bg.setColor(Color.parseColor(amster_OS.graphics.colors[1]));

var bartes = new SeekBar(ctx);
    bartes.setMax(par[0]);
bartes.getThumb().setColorFilter(Color.parseColor(amster_OS.graphics.colors[1]), android.graphics.PorterDuff.Mode.SRC);
bartes.setProgressDrawable(bg);
   bartes.setProgress(par[1]);
return bartes;
},
easyEdit: function (txt,size){
var fasttxt = new EditText(ctx);
 fasttxt.setGravity(Gravity.LEFT);   
    fasttxt.setTextSize(size);
fasttxt.setAllCaps(false);
fasttxt.setMaxLines(1);  
fasttxt.setInputType(1);   
fasttxt.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
fasttxt.setTextColor(Color.parseColor(amster_OS.graphics.colors[0])); 
fasttxt.setText(fromHtml('<b><font color='+amster_OS.graphics.colors[0]+'>'+txt+'</font></b>'));
fasttxt.getBackground().mutate().setColorFilter(Color.parseColor(amster_OS.graphics.colors[0]), android.graphics.PorterDuff.Mode.SRC_IN);
fasttxt.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
     amster_OS.start_os.openedit(viewarg);
     }}));
return fasttxt;
},
easyBg: function (){
var bg_k= new android.graphics.drawable.GradientDrawable();
bg_k.setColor(android.graphics.Color.parseColor(amster_OS.graphics.colors[2]));
return bg_k;
},
easyPopup: function (lay,bg){
ui= new PopupWindow(lay, MCH_PNT, MCH_PNT);      
ui.setAnimationStyle(animation);
ui.setBackgroundDrawable(bg);
ctx.runOnUiThread(new Runnable({ run: function(){
ui.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
}}));
return ui;
},
easyLink: function (text,url,size){
var linkbtn = new TextView(ctx);
linkbtn.setText(fromHtml('<i><u><font color="#1f67a0"><b>'+text+'</b></font></u><i>'));
linkbtn.setTextSize(size);      
linkbtn.setPadding(10, 0, 10, 10);
linkbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(view){
amster_OS.createsystemapps.systembrowser.openPage(url);
        	}
}));
return linkbtn;
},
easyWebPage: function (url){
var webs = new android.webkit.WebView(ctx);
    var webset = webs.getSettings();
    webset.setJavaScriptEnabled(true);
    webs.setWebChromeClient(new android.webkit.WebChromeClient());
    webs.setWebViewClient(new android.webkit.WebViewClient());
    webs.loadUrl(url); 
return webs;
},
print: function(text){
    var thetoast = android.widget.Toast.makeText(ctx,text,0.1);
    var layout = new LinearLayout(ctx);
    var msg = new Button(ctx);
    msg.setTextSize(amster_OS.graphics.print_design.size);
    msg.setTextColor(Color.parseColor(amster_OS.graphics.print_design.cl));    
    msg.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
    msg.setText(fromHtml('<b><font color="'+amster_OS.graphics.print_design.cl+'">'+text+'</font></b>'));   
    msg.setGravity(Gravity.CENTER);
    var btnpic = new GradientDrawable();
    btnpic.setColor(Color.parseColor(amster_OS.graphics.print_design.cl2));
btnpic.setAlpha(amster_OS.graphics.print_design.al);
btnpic.setCornerRadius(amster_OS.graphics.print_design.cor);
    layout.addView(msg);
    layout.setBackground(btnpic);
    thetoast.setView(layout);
if(amster_OS.createsystemapps.settings.seeprints){
ctx.runOnUiThread(new Runnable({
   run: function () {
    thetoast.show();    
}}));
}},
black_back: function (){
var black_bg = new GradientDrawable();
black_bg.setColor(Color.parseColor('#000000'));
black_bg.setAlpha(150);
var lays = new LinearLayout(ctx);
lays.setOrientation(1);
return amster_OS.graphics.easyPopup(lays,black_bg);
},
colorPicker: function(v,text){
var current_color = "#ff0000";
var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var lay = new LinearLayout(ctx);
  lay.setOrientation(0);
lays.addView(lay);

var params = new LayoutParams(amster_OS.screen.dipSize(150), amster_OS.screen.dipSize(150));
params.setMargins(1,5,7,5);

var param = new LayoutParams(amster_OS.screen.dipSize(20), amster_OS.screen.dipSize(150));
param.setMargins(5,5,7,1);

var paramss = new LayoutParams(amster_OS.screen.dipSize(175), amster_OS.screen.dipSize(20));
paramss.setMargins(1,7,1,1);


function generate(){
lay.removeAllViews();
lays.removeAllViews();
lays.addView(lay);
var paintt = new Paint();
var bmp = new Bitmap.createBitmap(amster_OS.screen.dipSize(150), amster_OS.screen.dipSize(150),Bitmap.Config.ARGB_8888)
var canvass = new android.graphics.Canvas(bmp);

var shader = new android.graphics.LinearGradient(0, 0, amster_OS.screen.dipSize(150) ,amster_OS.screen.dipSize(150), [Color.parseColor("#ffffff"),Color.parseColor(current_color),Color.parseColor("#000000")], null, android.graphics.Shader.TileMode.CLAMP);
        paintt.setShader(shader);
        canvass.drawRect(0,0, amster_OS.screen.dipSize(150), amster_OS.screen.dipSize(150), paintt);

var paint = new Paint();
var bmo = new Bitmap.createBitmap(amster_OS.screen.dipSize(20), amster_OS.screen.dipSize(150),Bitmap.Config.ARGB_8888)
var canvas = new android.graphics.Canvas(bmo);

var colors = [
  Color.parseColor("#FF0000"),
  Color.parseColor("#800080"),
  Color.parseColor("#0000FF"),
  Color.parseColor("#00FFFF"),
  Color.parseColor("#00FF00"),
  Color.parseColor("#FFFF00"),
Color.parseColor("#FFA500"),
Color.parseColor("#FF0000")
];

var shader = new android.graphics.LinearGradient(0, 0, 0 ,amster_OS.screen.dipSize(150), colors, null, android.graphics.Shader.TileMode.CLAMP);
        paint.setShader(shader);
        canvas.drawRect(0,0, amster_OS.screen.dipSize(20), amster_OS.screen.dipSize(150), paint);

var txt = new TextView(ctx);
//txt.getPaint().setShader(shader);
txt.setLayoutParams(params);
txt.setBackgroundDrawable(new BitmapDrawable(bmp))
txt.setOnTouchListener(new android.view.View.OnTouchListener( { 
onTouch: function (view, m) {
try{
switch (m.getAction()) {
case android.view.MotionEvent.ACTION_UP:
if(m.getY()<bmp.height&&m.getX()<bmp.width){
var pixel = bmp.getPixel(m.getX(),m.getY());
current_color = "#" + java.lang.Integer.toHexString(pixel).substring(2);
generate();
}
break;
}
}catch(e){print(e)}
return true;
}}));
lay.addView(txt);

var txt1 = new TextView(ctx);
txt1.setLayoutParams(param);
txt1.setBackgroundDrawable(new BitmapDrawable(bmo)); 
txt1.setOnTouchListener(new android.view.View.OnTouchListener( { 
onTouch: function (view, m) {
try{
switch (m.getAction()) {
case android.view.MotionEvent.ACTION_UP:
if(m.getY()<bmo.height){
var pixel = bmo.getPixel(10,m.getY());
current_color = "#" + java.lang.Integer.toHexString(pixel).substring(2);
generate();
}
break;
}
}catch(e){print(e)}
return true;
}}));
lay.addView(txt1);

var txt2 = new TextView(ctx);
txt2.setTextSize(15);
txt2.setLayoutParams(paramss);
txt2.setTextColor(Color.parseColor('#FFFFFF'));    
txt2.setBackgroundDrawable(new ColorDrawable(Color.parseColor(current_color))); 
if(text){
txt2.setText(fromHtml('<b><font color="white">'+text+current_color+'</font></b>'));
}else{
txt2.setText(fromHtml('<b><font color="white">'+current_color+'</font></b>'));
}
txt2.setOnClickListener(new View.OnClickListener({ onClick: function(view) {        
v.setText(view.getText());
ui.dismiss();
}}));
txt2.setOnLongClickListener(new View.OnLongClickListener( {
onLongClick: function (v, t) {
amster_OS.start_os.openedit(v,v.getText());
return true;
}}));
lays.addView(txt2);
}
generate();
var ui= new PopupWindow(lays, WR_CNT, WR_CNT);      
ui.setFocusable(true);
ui.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
ui.setAnimationStyle(animations.toast);
ui.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
}
},
createsystemapps:{
crosszero : {
name:"Крестики-нолики",
version:"1.0",
labels:"none",
click_player:new MediaPlayer(),
music_ploz:new MediaPlayer(),
fontS:null,
texturespath:null,
score:[0,0],
ochered:0,
volume:0.5,
volume1:1,
difficulty:1,
maxscore:10,
settings:["×","o",85,"счёт 0 : 0",true,true],
names:["игрок","бот"],
init: function (){
amster_OS.createsystemapps.crosszero.texturespath=amster_OS.my_root.getDir()[0]+"res.aour";
var data1 = new File(amster_OS.my_root.getDir()[0]+"dats.txt");
data1.createNewFile();
amster_OS.createsystemapps.crosszero.isfirstload();
amster_OS.createsystemapps.crosszero.loaddata();
},
loaddata: function (){
if(amster_OS.Data.getValue("diffic",amster_OS.my_root.getDir()[0]+"dats.txt")!=null){
amster_OS.createsystemapps.crosszero.difficulty=amster_OS.Data.getValue("diffic",amster_OS.my_root.getDir()[0]+"dats.txt")
}
if(amster_OS.Data.getValue("scor",amster_OS.my_root.getDir()[0]+"dats.txt")!=null){
amster_OS.createsystemapps.crosszero.maxscore=amster_OS.Data.getValue("scor",amster_OS.my_root.getDir()[0]+"dats.txt")
}
if(amster_OS.Data.getValue("gamemusc",amster_OS.my_root.getDir()[0]+"dats.txt")!=null){
amster_OS.createsystemapps.crosszero.volume=amster_OS.Data.getValue("gamemusc",amster_OS.my_root.getDir()[0]+"dats.txt")
}
if(amster_OS.Data.getValue("gamevol",amster_OS.my_root.getDir()[0]+"dats.txt")!=null){
amster_OS.createsystemapps.crosszero.volume1=amster_OS.Data.getValue("gamevol",amster_OS.my_root.getDir()[0]+"dats.txt")
}
},
startlevel: function(){
var rottfile = new File(amster_OS.createsystemapps.crosszero.texturespath);
if(rottfile.exists()){
amster_OS.createsystemapps.crosszero.audiomanager.setmusic(amster_OS.fast_files.getFileFromZip(amster_OS.createsystemapps.crosszero.texturespath, "music.mp3").getAbsolutePath());
amster_OS.createsystemapps.crosszero.fontS = new Typeface.createFromFile(amster_OS.fast_files.getFileFromZip(amster_OS.createsystemapps.crosszero.texturespath, "font.ttf"));
}
amster_OS.createsystemapps.crosszero.backgroundmenu();
amster_OS.createsystemapps.crosszero.startgamingmenu();
amster_OS.createsystemapps.crosszero.linksmenu();
},
getbgimg: function (key){
var rottfile = new File(amster_OS.createsystemapps.crosszero.texturespath);
if(rottfile.exists()){
if(key=="bg_1"){
var polefile=amster_OS.fast_files.getFileFromZip(amster_OS.createsystemapps.crosszero.texturespath, "pole.png");
var image1 =  BitmapFactory.decodeFile(polefile);
return BitmapDrawable(image1);
}
if(key=="bg_2"||key=="bg_3"){
var bgc = new GradientDrawable();
bgc.setStroke(2, Color.TRANSPARENT);
bgc.setColor(Color.TRANSPARENT);
return bgc;
}
if(key=="bg_4"){
var bgfile = amster_OS.fast_files.getFileFromZip(amster_OS.createsystemapps.crosszero.texturespath, "menu.png");
var image2 =  BitmapFactory.decodeFile(bgfile);
return BitmapDrawable(image2);
}
}else{
if(key=="bg_1"){
bgc = new GradientDrawable();
bgc.setStroke(2, Color.parseColor('#000000'));
bgc.setColor(Color.parseColor('#ffffff'));
return bgc
}
if(key=="bg_2"||key=="bg_3"){
var bgc = new GradientDrawable();
bgc.setStroke(2, Color.parseColor('#000000'));
bgc.setColor(Color.parseColor('#878787'));
return bgc;
}
if(key=="bg_4"){
var bgc = new GradientDrawable();
bgc.setColor(Color.parseColor('#7a8b8c'));
return bgc;
}
}
},
isfirstload: function (){
let puth22 = amster_OS.my_root.getDir()[0]+"use_textures";
var file1 = new File(puth22);
if(file1.exists()){
this.startlevel();
} else {
try{
amster_OS.downloadManager.setupmenu(amster_OS.my_root.getDir()[0]+"use_textures",false,amster_OS.createsystemapps.crosszero,["res.aour"],amster_OS.my_root.getDir()[0],["https://drive.Google.com/uc?export=download&id=16LD-unJQiUgyo7LnC4V1WJIUzhB-iS4a"],true);
}catch(e){print (e)}
}
},
setfontbtn: function(btn){
var rottfile = new File(amster_OS.createsystemapps.crosszero.texturespath);
if(rottfile.exists()){
btn.setTypeface(amster_OS.createsystemapps.crosszero.fontS);  
}},
audiomanager:{
setclick: function (peth){
	if(amster_OS.createsystemapps.crosszero.settings[5]){
amster_OS.createsystemapps.crosszero.click_player.pause();
amster_OS.createsystemapps.crosszero.click_player.reset();
amster_OS.createsystemapps.crosszero.click_player.setVolume(amster_OS.createsystemapps.crosszero.volume1, amster_OS.createsystemapps.crosszero.volume1);
amster_OS.createsystemapps.crosszero.click_player.setDataSource(peth);
amster_OS.createsystemapps.crosszero.click_player.prepare();
amster_OS.createsystemapps.crosszero.click_player.start();    
}
},
setmusic: function (peths){
if(amster_OS.Data.getValue("gamemusc",amster_OS.my_root.getDir()[0]+"dats.txt")!=null){
amster_OS.createsystemapps.crosszero.volume=amster_OS.Data.getValue("gamemusc",amster_OS.my_root.getDir()[0]+"dats.txt")
}
	if(amster_OS.createsystemapps.crosszero.settings[5]){
amster_OS.createsystemapps.crosszero.music_ploz.pause();
amster_OS.createsystemapps.crosszero.music_ploz.reset();
amster_OS.createsystemapps.crosszero.music_ploz.setVolume(amster_OS.createsystemapps.crosszero.volume, amster_OS.createsystemapps.crosszero.volume);
amster_OS.createsystemapps.crosszero.music_ploz.setDataSource(peths);
amster_OS.createsystemapps.crosszero.music_ploz.prepare();
amster_OS.createsystemapps.crosszero.music_ploz.start();    
amster_OS.createsystemapps.crosszero.music_ploz.setLooping(true);
}
}
},
kletki:[
" "," "," ",
" "," "," ",
" "," "," "
],
setPlayerHod: function (id){
if(amster_OS.createsystemapps.crosszero.settings[4]==true){
if(amster_OS.createsystemapps.crosszero.kletki[id]!=amster_OS.createsystemapps.crosszero.settings[0]&&amster_OS.createsystemapps.crosszero.kletki[id]!=amster_OS.createsystemapps.crosszero.settings[1]&&amster_OS.createsystemapps.crosszero.checkpole()>=1){
amster_OS.createsystemapps.crosszero.kletki[id]=amster_OS.createsystemapps.crosszero.settings[0];
amster_OS.createsystemapps.crosszero.audiomanager.setclick(amster_OS.fast_files.getFileFromZip(amster_OS.createsystemapps.crosszero.texturespath, "click.ogg").getAbsolutePath());
if(amster_OS.createsystemapps.crosszero.checkpole()>1){
if(amster_OS.createsystemapps.crosszero.difficulty==0){
amster_OS.createsystemapps.crosszero.setBotHod();
}else{
amster_OS.createsystemapps.crosszero.nichya(id);
}
}}
}else{
if(amster_OS.createsystemapps.crosszero.ochered==0){amster_OS.createsystemapps.crosszero.ochered=1;}else{amster_OS.createsystemapps.crosszero.ochered=0;}
if(amster_OS.createsystemapps.crosszero.kletki[id]==" "&&amster_OS.createsystemapps.crosszero.checkpole()>=1){
if(amster_OS.createsystemapps.crosszero.ochered==1){
amster_OS.createsystemapps.crosszero.kletki[id]=amster_OS.createsystemapps.crosszero.settings[0];
amster_OS.createsystemapps.crosszero.audiomanager.setclick(amster_OS.fast_files.getFileFromZip(amster_OS.createsystemapps.crosszero.texturespath, "click.ogg").getAbsolutePath());
}
if(amster_OS.createsystemapps.crosszero.ochered==0){
amster_OS.createsystemapps.crosszero.kletki[id]=amster_OS.createsystemapps.crosszero.settings[1];
amster_OS.createsystemapps.crosszero.audiomanager.setclick(amster_OS.fast_files.getFileFromZip(amster_OS.createsystemapps.crosszero.texturespath, "click.ogg").getAbsolutePath());
}
}}
},
setBotHod: function (){
if(amster_OS.createsystemapps.crosszero.difficulty==0){
var random = Math.floor(Math.random(0)*8);
if(amster_OS.createsystemapps.crosszero.kletki[random]!=amster_OS.createsystemapps.crosszero.settings[0]&&amster_OS.createsystemapps.crosszero.kletki[random]!=amster_OS.createsystemapps.crosszero.settings[1]){
amster_OS.createsystemapps.crosszero.kletki[random]=amster_OS.createsystemapps.crosszero.settings[1];
}else{
amster_OS.createsystemapps.crosszero.setBotHod();
}
}

},
setBotHodId: function (id){
amster_OS.createsystemapps.crosszero.kletki[id]=amster_OS.createsystemapps.crosszero.settings[1];
},
checkpole: function(){
let num = 0;
for(var i in amster_OS.createsystemapps.crosszero.kletki){
if(amster_OS.createsystemapps.crosszero.kletki[i]==" ")num=num+1;
}
return num;
},
checkwinner: function (){
let a = amster_OS.createsystemapps.crosszero.kletki;
let bb = "";
if(a[0]==a[1]&&a[1]==a[2]&&a[0]!=" "){bb=a[0];}
if(a[3]==a[4]&&a[3]==a[5]&&a[3]!=" "){bb=a[3];}
if(a[6]==a[7]&&a[6]==a[8]&&a[6]!=" "){bb=a[6];}
if(a[0]==a[3]&&a[0]==a[6]&&a[0]!=" "){bb=a[0];}
if(a[1]==a[4]&&a[1]==a[7]&&a[1]!=" "){bb=a[1];}
if(a[2]==a[5]&&a[2]==a[8]&&a[2]!=" "){bb=a[2];}
if(a[0]==a[1]&&a[0]==a[2]&&a[0]!=" "){bb=a[0];}
if(a[0]==a[4]&&a[0]==a[8]&&a[0]!=" "){bb=a[0];}
if(a[6]==a[4]&&a[6]==a[2]&&a[6]!=" "){bb=a[6];}
if(bb==amster_OS.createsystemapps.crosszero.settings[0]){

amster_OS.createsystemapps.crosszero.score[0]=amster_OS.createsystemapps.crosszero.score[0]+1;
amster_OS.createsystemapps.crosszero.settings[3]="счёт "+amster_OS.createsystemapps.crosszero.score[0]+" : "+amster_OS.createsystemapps.crosszero.score[1];
amster_OS.createsystemapps.crosszero.poleclear();
if(!amster_OS.createsystemapps.crosszero.settings[4])amster_OS.createsystemapps.crosszero.ochered=0;
}
if(bb==amster_OS.createsystemapps.crosszero.settings[1]){
amster_OS.createsystemapps.crosszero.score[1]=amster_OS.createsystemapps.crosszero.score[1]+1;
amster_OS.createsystemapps.crosszero.settings[3]="счёт "+amster_OS.createsystemapps.crosszero.score[0]+" : "+amster_OS.createsystemapps.crosszero.score[1];
amster_OS.createsystemapps.crosszero.poleclear();
if(!amster_OS.createsystemapps.crosszero.settings[4])amster_OS.createsystemapps.crosszero.ochered=0;
}
if(amster_OS.createsystemapps.crosszero.checkpole()==0&&amster_OS.createsystemapps.crosszero.score[1]<=amster_OS.createsystemapps.crosszero.maxscore){
amster_OS.createsystemapps.crosszero.settings[3]="ничья";
amster_OS.createsystemapps.crosszero.poleclear();
if(!amster_OS.createsystemapps.crosszero.settings[4])amster_OS.createsystemapps.crosszero.ochered=0;
}
if(amster_OS.createsystemapps.crosszero.score[0]==amster_OS.createsystemapps.crosszero.maxscore){
amster_OS.createsystemapps.crosszero.settings[3]=amster_OS.createsystemapps.crosszero.names[0]+" выиграл";
if(!amster_OS.createsystemapps.crosszero.settings[4])amster_OS.createsystemapps.crosszero.ochered=0;
}
if(amster_OS.createsystemapps.crosszero.score[1]==amster_OS.createsystemapps.crosszero.maxscore){
amster_OS.createsystemapps.crosszero.settings[3]=amster_OS.createsystemapps.crosszero.names[1]+" выиграл";
if(!amster_OS.createsystemapps.crosszero.settings[4])amster_OS.createsystemapps.crosszero.ochered=0;
}

if(amster_OS.createsystemapps.crosszero.score[0]==amster_OS.createsystemapps.crosszero.maxscore||amster_OS.createsystemapps.crosszero.score[1]==amster_OS.createsystemapps.crosszero.maxscore){
try{
amster_OS.createsystemapps.crosszero.restartgame();amster_OS.createsystemapps.crosszero.score=[0,0];
}catch(e){print(e+". #"+e.lineNumber)}
}
},
getname: function (){
if(amster_OS.createsystemapps.crosszero.settings[4]){
amster_OS.createsystemapps.crosszero.names[0]="игрок";
amster_OS.createsystemapps.crosszero.names[1]="бот";
}else{
amster_OS.createsystemapps.crosszero.names[0]="игрок 1";
amster_OS.createsystemapps.crosszero.names[1]="игрок 2";
}
},
scoreclear: function (){
if(amster_OS.createsystemapps.crosszero.score[0]>amster_OS.createsystemapps.crosszero.score[1]){
amster_OS.createsystemapps.crosszero.settings[3]=amster_OS.createsystemapps.crosszero.names[0]+" выиграл";
amster_OS.createsystemapps.crosszero.score[0]=0;
}else{
amster_OS.createsystemapps.crosszero.settings[3]=amster_OS.createsystemapps.crosszero.names[1]+" выиграл";
amster_OS.createsystemapps.crosszero.score[1]=0;
}
},
poleclear: function (){
 
amster_OS.createsystemapps.crosszero.kletki=[
" "," "," ",
" "," "," ",
" "," "," "
]
},
nichya: function (plhod){
let id = 0;
let a = amster_OS.createsystemapps.crosszero.kletki;
let pl = amster_OS.createsystemapps.crosszero.settings[0];
let bot = amster_OS.createsystemapps.crosszero.settings[1];
a[plhod]=amster_OS.createsystemapps.crosszero.settings[0];
if(amster_OS.createsystemapps.crosszero.checkpole()==8){

//боковые
if(a[0]==pl&&a[4]==' ')id=4;
if(a[2]==pl&&a[4]==' ')id=4;
if(a[6]==pl&&a[4]==' ')id=4;
if(a[8]==pl&&a[4]==' ')id=4;
}else{

//прямые
if(a[0]==pl&&a[1]==pl&&a[2]==' ')id=2;
if(a[1]==pl&&a[2]==pl&&a[0]==' ')id=0;
if(a[3]==pl&&a[4]==pl&&a[5]==' ')id=5;
if(a[4]==pl&&a[5]==pl&&a[3]==' ')id=3;
if(a[6]==pl&&a[7]==pl&&a[8]==' ')id=8;
if(a[7]==pl&&a[8]==pl&&a[6]==' ')id=6;
if(a[0]==pl&&a[3]==pl&&a[6]==' ')id=6;
if(a[3]==pl&&a[6]==pl&&a[0]==' ')id=0;
if(a[1]==pl&&a[4]==pl&&a[7]==' ')id=7;
if(a[4]==pl&&a[7]==pl&&a[1]==' ')id=1;
if(a[2]==pl&&a[5]==pl&&a[8]==' ')id=8;
if(a[8]==pl&&a[5]==pl&&a[2]==' ')id=2;

//перекрестные
if(a[0]==pl&&a[4]==pl&&a[8]==' ')id=8;
if(a[1]==pl&&a[5]==pl&&a[2]==' ')id=2;
if(a[1]==pl&&a[3]==pl&&a[0]==' ')id=0;
if(a[2]==pl&&a[4]==pl&&a[6]==' ')id=6;
if(a[6]==pl&&a[4]==pl&&a[2]==' ')id=2;
if(a[7]==pl&&a[5]==pl&&a[8]==' ')id=8;
if(a[3]==pl&&a[7]==pl&&a[6]==' ')id=6;
if(a[8]==pl&&a[4]==pl&&a[0]==' ')id=0;
}
//разделенные
if(a[0]==pl&&a[2]==pl&&a[1]==' ')id=1;
if(a[0]==pl&&a[6]==pl&&a[3]==' ')id=3;
if(a[2]==pl&&a[8]==pl&&a[5]==' ')id=5;
if(a[8]==pl&&a[6]==pl&&a[7]==' ')id=7;

//перекстресные с центром
if(a[2]==pl&&a[6]==pl&&a[4]==bot&&a[1]==' ')id=1;
if(a[4]==pl&&a[8]==pl&&a[0]==bot&&a[6]==' ')id=6;

if(id==0&&a[4]==" ")id=4;
if(amster_OS.createsystemapps.crosszero.kletki[id]==amster_OS.createsystemapps.crosszero.settings[0]||amster_OS.createsystemapps.crosszero.kletki[id]==amster_OS.createsystemapps.crosszero.settings[1]){
for(var i in amster_OS.createsystemapps.crosszero.kletki){
if(amster_OS.createsystemapps.crosszero.kletki[i]==" ")id=i;
}}
if(amster_OS.createsystemapps.crosszero.difficulty==2){
if(amster_OS.createsystemapps.crosszero.winbotid()!=0)id=amster_OS.createsystemapps.crosszero.winbotid();
}
if(amster_OS.createsystemapps.crosszero.checkpole()==4){
if(a[4]==pl&&a[1]==pl&&a[5]==pl&&a[6]==' ')id=6;
if(a[3]==pl&&a[7]==pl&&a[4]==pl&&a[1]==' ')id=1;
}
if(amster_OS.createsystemapps.crosszero.checkpole()==2){
if(a[4]!=' '&&a[2]==' ')id=2;
if(a[4]!=' '&&a[2]==pl&&a[6]==' ')id=6;
if(a[4]!=' '&&a[1]==' '&&a[7]==' ')id=7;
if(a[3]==pl&&a[4]!=' '&&a[1]==' '&&a[7]==' ')id=7;
if(a[3]==bot&&a[4]!=' '&&a[1]==' '&&a[7]==' ')id=1;
if(a[2]==' '&&a[4]==pl&&a[3]==pl&&a[7]==' ')id=7;
if(a[5]==bot&&a[4]==pl&&a[3]==pl&&a[1]==' ')id=1;
}

amster_OS.createsystemapps.crosszero.setBotHodId(id);
},
winbotid: function (){
let a = amster_OS.createsystemapps.crosszero.kletki;
let id = 0;
let pl = amster_OS.createsystemapps.crosszero.settings[1];
if(a[0]==pl&&a[1]==pl&&a[2]==' ')id=2;
if(a[1]==pl&&a[2]==pl&&a[0]==' ')id=0;
if(a[3]==pl&&a[4]==pl&&a[5]==' ')id=5;
if(a[4]==pl&&a[5]==pl&&a[3]==' ')id=3;
if(a[6]==pl&&a[7]==pl&&a[8]==' ')id=8;
if(a[7]==pl&&a[8]==pl&&a[6]==' ')id=6;
if(a[0]==pl&&a[3]==pl&&a[6]==' ')id=6;
if(a[3]==pl&&a[6]==pl&&a[0]==' ')id=0;
if(a[1]==pl&&a[4]==pl&&a[7]==' ')id=7;
if(a[4]==pl&&a[7]==pl&&a[1]==' ')id=1;
if(a[2]==pl&&a[5]==pl&&a[8]==' ')id=8;
if(a[8]==pl&&a[5]==pl&&a[2]==' ')id=2;

if(a[0]==pl&&a[4]==pl&&a[8]==' ')id=8;
if(a[1]==pl&&a[5]==pl&&a[2]==' ')id=2;
if(a[1]==pl&&a[3]==pl&&a[0]==' ')id=0;
if(a[2]==pl&&a[4]==pl&&a[6]==' ')id=6;
if(a[6]==pl&&a[4]==pl&&a[2]==' ')id=2;
if(a[7]==pl&&a[5]==pl&&a[8]==' ')id=8;
if(a[3]==pl&&a[7]==pl&&a[6]==' ')id=6;
if(a[8]==pl&&a[4]==pl&&a[0]==' ')id=0;

if(a[0]==pl&&a[2]==pl&&a[1]==' ')id=1;
if(a[0]==pl&&a[6]==pl&&a[3]==' ')id=3;
if(a[2]==pl&&a[8]==pl&&a[5]==' ')id=5;
if(a[8]==pl&&a[6]==pl&&a[7]==' ')id=7;
if(a[id]==" ")return id;
return 0;
},
pole: function(){
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            var lay1 = new LinearLayout(ctx);
            lay1.setOrientation(0);
var lay2= new LinearLayout(ctx);
            lay2.setOrientation(0);
var lay3 = new LinearLayout(ctx);
            lay3.setOrientation(0);
layout.addView(lay1);
layout.addView(lay2);
layout.addView(lay3);

var btn1 = new TextView(ctx);
 btn1.setGravity(Gravity.CENTER);   btn1.setTextColor(Color.parseColor('#000055'));
    btn1.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
amster_OS.createsystemapps.crosszero.setfontbtn(btn1);
btn1.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btn1.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btn1.setId(0);
     btn1.setText(amster_OS.createsystemapps.crosszero.kletki[0]);   
    btn1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
   }}));
lay1.addView(btn1);

            var btn2 = new TextView(ctx);
 btn2.setGravity(Gravity.CENTER);   btn2.setTextColor(Color.parseColor('#000055'));
    btn2.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
amster_OS.createsystemapps.crosszero.setfontbtn(btn2)
btn2.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btn2.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btn2.setId(1);
     btn2.setText(amster_OS.createsystemapps.crosszero.kletki[1]);   
    btn2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
}catch(e){print(e+". #"+e.lineNumber)}
   }}));
lay1.addView(btn2);

var btn3 = new TextView(ctx);
 btn3.setGravity(Gravity.CENTER);   btn3.setTextColor(Color.parseColor('#000055'));
    btn3.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
amster_OS.createsystemapps.crosszero.setfontbtn(btn3)
btn3.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btn3.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btn3.setId(2);
     btn3.setText(amster_OS.createsystemapps.crosszero.kletki[2]);   
    btn3.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
   }}));
lay1.addView(btn3);

var btns1 = new TextView(ctx);
 btns1.setGravity(Gravity.CENTER);   btns1.setTextColor(Color.parseColor('#000055'));
    btns1.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
amster_OS.createsystemapps.crosszero.setfontbtn(btns1)
btns1.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btns1.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btns1.setId(3);
     btns1.setText(amster_OS.createsystemapps.crosszero.kletki[3]);   
    btns1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
   }}));
lay2.addView(btns1);
var btns2 = new TextView(ctx);
 btns2.setGravity(Gravity.CENTER);   btns2.setTextColor(Color.parseColor('#000055'));
    btns2.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
btns2.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btns2.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btns2.setId(4);
amster_OS.createsystemapps.crosszero.setfontbtn(btns2)
     btns2.setText(amster_OS.createsystemapps.crosszero.kletki[4]);   
    btns2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
   }}));
lay2.addView(btns2);
var btns3 = new TextView(ctx);
 btns3.setGravity(Gravity.CENTER);   btns3.setTextColor(Color.parseColor('#000055'));
    btns3.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
btns3.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btns3.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btns3.setId(5);
     btns3.setText(amster_OS.createsystemapps.crosszero.kletki[5]);   
amster_OS.createsystemapps.crosszero.setfontbtn(btns3)
    btns3.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
	amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
   }}));
lay2.addView(btns3);

var btna1 = new TextView(ctx);
 btna1.setGravity(Gravity.CENTER);   btna1.setTextColor(Color.parseColor('#000055'));
    btna1.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
btna1.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btna1.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btna1.setId(6);
amster_OS.createsystemapps.crosszero.setfontbtn(btna1)
     btna1.setText(amster_OS.createsystemapps.crosszero.kletki[6]);   
    btna1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
   }}));
lay3.addView(btna1);

var btna2 = new TextView(ctx);
 btna2.setGravity(Gravity.CENTER);   btna2.setTextColor(Color.parseColor('#000055'));
    btna2.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
btna2.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btna2.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btna2.setId(7);
amster_OS.createsystemapps.crosszero.setfontbtn(btna2)
     btna2.setText(amster_OS.createsystemapps.crosszero.kletki[7]);   
    btna2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
	amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
   }}));
lay3.addView(btna2);
var btna3 = new TextView(ctx);
 btna3.setGravity(Gravity.CENTER);   btna3.setTextColor(Color.parseColor('#000055'));
    btna3.setBackground(amster_OS.createsystemapps.crosszero.getbgimg("bg_2"));
btna3.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(100)));
    btna3.setTextSize(amster_OS.createsystemapps.crosszero.settings[2]);
btna3.setId(8);
amster_OS.createsystemapps.crosszero.setfontbtn(btna3)
     btna3.setText(amster_OS.createsystemapps.crosszero.kletki[8]);   
    btna3.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.setPlayerHod(viewarg.getId());
   }}));
lay3.addView(btna3);
var tick = android.os.Handler();
var runb = new Runnable() {
   run() {
                try{
btn1.setText(amster_OS.createsystemapps.crosszero.kletki[0])
btn2.setText(amster_OS.createsystemapps.crosszero.kletki[1])
btn3.setText(amster_OS.createsystemapps.crosszero.kletki[2])
btns1.setText(amster_OS.createsystemapps.crosszero.kletki[3])
btns2.setText(amster_OS.createsystemapps.crosszero.kletki[4])
btns3.setText(amster_OS.createsystemapps.crosszero.kletki[5])
btna1.setText(amster_OS.createsystemapps.crosszero.kletki[6])
btna2.setText(amster_OS.createsystemapps.crosszero.kletki[7])
btna3.setText(amster_OS.createsystemapps.crosszero.kletki[8])
amster_OS.createsystemapps.crosszero.checkwinner();
amster_OS.createsystemapps.crosszero.getname();
                                 }catch(e){
                    print("Error(" + e.lineNumber + "): " + e.message);
                }
tick.postDelayed(this, 100);
   }
};
tick.postDelayed(runb, 100);
    
GUYA = new PopupWindow(layout, amster_OS.screen.dipSize(300), amster_OS.screen.dipSize(300));
GUYA.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
GUYA.setBackgroundDrawable(amster_OS.createsystemapps.crosszero.getbgimg("bg_1"));  
GUYA.setAnimationStyle(animation);
 	GUYA.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
exitgame: function(){
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            
var exitbtn = new TextView(ctx);
 exitbtn.setGravity(Gravity.CENTER);   exitbtn.setTextColor(Color.parseColor('#000055'));
    exitbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
exitbtn.setLayoutParams(new LayoutParams(MCH_PNT, MCH_PNT));
    exitbtn.setTextSize(20);
amster_OS.createsystemapps.crosszero.setfontbtn(exitbtn);
     exitbtn.setText("выход");   
    exitbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.settings[3]="счёт 0 : 0";
amster_OS.createsystemapps.crosszero.poleclear();
GUYA.dismiss();
GUY.dismiss();
GUYs.dismiss();
amster_OS.createsystemapps.crosszero.startgamingmenu();
amster_OS.createsystemapps.crosszero.linksmenu();
amster_OS.createsystemapps.crosszero.score=[0,0];
   }}));
layout.addView(exitbtn);
GUY = new PopupWindow(layout, amster_OS.screen.dipSize(65), amster_OS.screen.dipSize(30));
GUY.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
 GUY.setAnimationStyle(animation);
	GUY.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0);
},
scoregame: function(){
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            
var scorebtm = new TextView(ctx);
 scorebtm.setGravity(Gravity.CENTER);   
scorebtm.setTextColor(Color.parseColor('#000055'));
    amster_OS.createsystemapps.crosszero.setfontbtn(scorebtm)
scorebtm.setLayoutParams(new LayoutParams(MCH_PNT, MCH_PNT));
    scorebtm.setTextSize(33);

layout.addView(scorebtm);
var tick = android.os.Handler();
var runb = new Runnable() {
   run() {
try{
scorebtm.setText(amster_OS.createsystemapps.crosszero.settings[3]);   
} catch (e){print(e + e.lineNumber)}
                                  tick.postDelayed(this, 100);
   }
};
tick.postDelayed(runb, 100);
GUYs= new PopupWindow(layout, WR_CNT, amster_OS.screen.dipSize(60));
GUYs.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
GUYs.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
	GUYs.setTouchable(false);
GUYs.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.TOP, 0, 0);
},
backgroundmenu: function(){
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            

GUYK= new PopupWindow(layout, MCH_PNT, MCH_PNT);
GUYK.setBackgroundDrawable(amster_OS.createsystemapps.crosszero.getbgimg("bg_4"));  
GUYK.setAnimationStyle(animation);
 	GUYK.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.TOP, 0, 0);
},
restartgame: function(){
 
GUYs.dismiss()
GUY.dismiss();
GUYA.dismiss();
amster_OS.createsystemapps.crosszero.backgroundblack();
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
 
var resbtn = new TextView(ctx);
 resbtn.setGravity(Gravity.CENTER);   resbtn.setTextColor(Color.parseColor('#ffffff'));
    resbtn.setTextSize(100);
     resbtn.setText(amster_OS.createsystemapps.crosszero.settings[3]);   
amster_OS.createsystemapps.crosszero.setfontbtn(resbtn)
layout.addView(resbtn);
var restartbtn = new TextView(ctx);
 restartbtn.setGravity(Gravity.CENTER);   restartbtn.setTextColor(Color.parseColor('#ffffff'));
restartbtn.setLayoutParams(new LayoutParams(MCH_PNT, MCH_PNT));
    restartbtn.setTextSize(45);
amster_OS.createsystemapps.crosszero.setfontbtn(restartbtn)
     restartbtn.setText("ещё раз");   
    restartbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
GUYKS.dismiss();
amster_OS.createsystemapps.crosszero.settings[3]="счёт 0 : 0";
amster_OS.createsystemapps.crosszero.scoregame();
amster_OS.createsystemapps.crosszero.exitgame();
amster_OS.createsystemapps.crosszero.pole();
GUYLD.dismiss();
   }}));
layout.addView(restartbtn);
GUYLD = new PopupWindow(layout, amster_OS.screen.dipSize(550), amster_OS.screen.dipSize(350));
GUYLD.setBackgroundDrawable(amster_OS.createsystemapps.crosszero.getbgimg("bg_3"));  
 	GUYLD.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
backgroundblack: function(){
  GUYKS= new amster_OS.graphics.black_back();
},
startgamingmenu: function(){
            var layout1 = new LinearLayout(ctx);
            layout1.setOrientation(1);
            
var bitn = new TextView(ctx);
 bitn.setGravity(Gravity.CENTER | Gravity.TOP);   bitn.setTextColor(Color.parseColor('#000055'));
    bitn.setTextSize(60);
amster_OS.createsystemapps.crosszero.setfontbtn(bitn)
     bitn.setText("крестики нолики");   
    
layout1.addView(bitn);


var bitn1 = new TextView(ctx);
 bitn1.setGravity(Gravity.CENTER);   bitn1.setTextColor(Color.parseColor('#000055'));
    bitn1.setTextSize(30);
amster_OS.createsystemapps.crosszero.setfontbtn(bitn1)
     bitn1.setText("играть с ботом");   
    bitn1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.settings[4]=true;
GULO.dismiss();
AGUI.dismiss();
amster_OS.createsystemapps.crosszero.pole();
amster_OS.createsystemapps.crosszero.exitgame();
amster_OS.createsystemapps.crosszero.scoregame();
   }}));
layout1.addView(bitn1);

       var bitn2 = new TextView(ctx);
 bitn2.setGravity(Gravity.CENTER);   bitn2.setTextColor(Color.parseColor('#000055'));
    bitn2.setTextSize(30);
amster_OS.createsystemapps.crosszero.setfontbtn(bitn2)
     bitn2.setText("играть с другом");   
    bitn2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.crosszero.settings[4]=false;
GULO.dismiss();
AGUI.dismiss();
amster_OS.createsystemapps.crosszero.pole();
amster_OS.createsystemapps.crosszero.exitgame();
amster_OS.createsystemapps.crosszero.scoregame();
   }}));
layout1.addView(bitn2);

var bitn3 = new TextView(ctx);
 bitn3.setGravity(Gravity.CENTER);   bitn3.setTextColor(Color.parseColor('#000055'));
    bitn3.setTextSize(30);
amster_OS.createsystemapps.crosszero.setfontbtn(bitn3)
     bitn3.setText("настройки");   
    bitn3.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
GULO.dismiss();
amster_OS.createsystemapps.crosszero.settingsmenu();
amster_OS.createsystemapps.crosszero.exitsettings();
   }}));
layout1.addView(bitn3);

var bitn33= new TextView(ctx);
 bitn33.setGravity(Gravity.CENTER);   bitn33.setTextColor(Color.parseColor('#000055'));
    bitn33.setTextSize(30);
amster_OS.createsystemapps.crosszero.setfontbtn(bitn33)
     bitn33.setText("выйти");   
    bitn33.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
GULO.dismiss();
GUYK.dismiss();
AGUI.dismiss();
amster_OS.createsystemapps.crosszero.music_ploz.pause();
amster_OS.createsystemapps.crosszero.music_ploz.reset();
   }}));
layout1.addView(bitn33);
    
GULO = new PopupWindow(layout1, MCH_PNT, MCH_PNT);
GULO.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
 GULO.setAnimationStyle(animation);
	GULO.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
settingsmenu: function(){
var lay = new LinearLayout(ctx);
            lay.setOrientation(1);
            var layout = new LinearLayout(ctx);
            layout.setOrientation(0);
var layout1 = new LinearLayout(ctx);
            layout1.setOrientation(1);
var layout2 = new LinearLayout(ctx);
            layout2.setOrientation(1);

var layout3 = new LinearLayout(ctx);
            layout3.setOrientation(1);
var menuScroll = new ScrollView(ctx);
menuScroll.addView(layout);
var cbtn1 = new TextView(ctx);
 cbtn1.setGravity(Gravity.CENTER);   cbtn1.setTextColor(Color.parseColor('#000055'));
    cbtn1.setTextSize(60);
amster_OS.createsystemapps.crosszero.setfontbtn(cbtn1)
     cbtn1.setText("настройки");   
lay.addView(cbtn1);
lay.addView(menuScroll);

layout.addView(layout1);
layout.addView(layout2);
layout.addView(layout3);
var cbtn2 = new TextView(ctx);
 cbtn2.setGravity(Gravity.CENTER);   cbtn2.setTextColor(Color.parseColor('#000055'));
    cbtn2.setTextSize(30);
amster_OS.createsystemapps.crosszero.setfontbtn(cbtn2)
     cbtn2.setText("звук");   
cbtn2.setLayoutParams(new LayoutParams(UiWidth/3, MCH_PNT));
layout1.addView(cbtn2);
var rottfile = new File(amster_OS.createsystemapps.crosszero.texturespath);
if(!rottfile.exists()){
var volumbtn1 = new TextView(ctx);
volumbtn1.setText("загрузите ресурсы");
volumbtn1.setTextSize(20);      
amster_OS.createsystemapps.crosszero.setfontbtn(volumbtn1)
volumbtn1.setGravity(Gravity.LEFT);
volumbtn1.setTextColor(Color.parseColor('#000055'));
layout1.addView(volumbtn1);
}else{
var volumbtn1 = new TextView(ctx);
volumbtn1.setText("музыка: "+amster_OS.createsystemapps.crosszero.volume*10);
volumbtn1.setTextSize(20);      
amster_OS.createsystemapps.crosszero.setfontbtn(volumbtn1)
volumbtn1.setGravity(Gravity.LEFT);
volumbtn1.setTextColor(Color.parseColor('#000055'));
layout1.addView(volumbtn1);
var volumbtn2 = new SeekBar(ctx);
    volumbtn2.setMax(10);
    volumbtn2.getThumb().setColorFilter(Color.TRANSPARENT, android.graphics.PorterDuff.Mode.SRC);
    volumbtn2.setProgress(amster_OS.createsystemapps.crosszero.volume*10);
    volumbtn2.getProgressDrawable().setColorFilter(Color.parseColor("#000055"), android.graphics.PorterDuff.Mode.SRC_IN);
    volumbtn2.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
amster_OS.createsystemapps.crosszero.volume=volumbtn2.getProgress()/10;
amster_OS.createsystemapps.crosszero.music_ploz.setVolume(amster_OS.createsystemapps.crosszero.volume, amster_OS.createsystemapps.crosszero.volume);
    volumbtn1.setText("музыка: "+amster_OS.createsystemapps.crosszero.volume*10);
amster_OS.Data.setValue("gamemusc",amster_OS.createsystemapps.crosszero.volume,amster_OS.my_root.getDir()[0]+"dats.txt")
    }
    });
    layout1.addView(volumbtn2);
var volumbtn3 = new TextView(ctx);
volumbtn3.setText("игра: "+amster_OS.createsystemapps.crosszero.volume1*10);
volumbtn3.setTextSize(20);      
amster_OS.createsystemapps.crosszero.setfontbtn(volumbtn3)
volumbtn3.setGravity(Gravity.LEFT);
volumbtn3.setTextColor(Color.parseColor('#000055'));
layout1.addView(volumbtn3);
var volumbtn4 = new SeekBar(ctx);
    volumbtn4.setMax(10);
    volumbtn4.getThumb().setColorFilter(Color.TRANSPARENT, android.graphics.PorterDuff.Mode.SRC);
    volumbtn4.setProgress(amster_OS.createsystemapps.crosszero.volume1*10);
    volumbtn4.getProgressDrawable().setColorFilter(Color.parseColor("#000055"), android.graphics.PorterDuff.Mode.SRC_IN);
    volumbtn4.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
amster_OS.createsystemapps.crosszero.volume1=volumbtn4.getProgress()/10;
amster_OS.createsystemapps.crosszero.click_player.setVolume(amster_OS.createsystemapps.crosszero.volume1, amster_OS.createsystemapps.crosszero.volume1);
    volumbtn3.setText("игра: "+amster_OS.createsystemapps.crosszero.volume1*10);
amster_OS.Data.setValue("gamevol",amster_OS.createsystemapps.crosszero.volume1,amster_OS.my_root.getDir()[0]+"dats.txt")
    }
    });
    layout1.addView(volumbtn4);
}
       var cbtn3 = new TextView(ctx);
 cbtn3.setGravity(Gravity.CENTER);   cbtn3.setTextColor(Color.parseColor('#000055'));
    cbtn3.setTextSize(30);
amster_OS.createsystemapps.crosszero.setfontbtn(cbtn3)
     cbtn3.setText("ресурсы");   
cbtn3.setLayoutParams(new LayoutParams(UiWidth/3, MCH_PNT));
layout2.addView(cbtn3);

if(!rottfile.exists()){
var texturebtn1 = new TextView(ctx);
texturebtn1.setText("скачать ресурсы[нажать]");
texturebtn1.setTextSize(20);      
amster_OS.createsystemapps.crosszero.setfontbtn(texturebtn1)
texturebtn1.setGravity(Gravity.LEFT);
texturebtn1.setTextColor(Color.parseColor('#000055'));
texturebtn1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
if(amster_OS.checkNetwork()){
//download one archive
//amster_OS.loadfiles(filenames73ue[i],amster_OS.my_root.getDir()[0],amster_OS.createsystemapps.crosszero.links[i]);
Thread.sleep(5000);   
GULA.dismiss();
AGUI.dismiss();
GUYK.dismiss();
GUC.dismiss();
amster_OS.createsystemapps.crosszero.startlevel();
} else {
texturebtn1.setText("отсутствует интернет");
}
   }}));
layout2.addView(texturebtn1);
}else{

var gamebtn1 = new TextView(ctx);
gamebtn1.setText("укажите текстурпак");
gamebtn1.setTextSize(20);      
amster_OS.createsystemapps.crosszero.setfontbtn(gamebtn1)
gamebtn1.setGravity(Gravity.LEFT);
gamebtn1.setTextColor(Color.parseColor('#000055'));
layout2.addView(gamebtn1);
var btnputh1 = new EditText(ctx);
 btnputh1.setGravity(Gravity.LEFT);   btnputh1.setTextColor(Color.parseColor("#000055"));
    btnputh1.setTextSize(15);
     btnputh1.setText(amster_OS.createsystemapps.crosszero.texturespath);    
btnputh1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.createsystemapps.my_explorer.setdir("file",viewarg,[".aour"]);
} catch(e){print(e)}
   }}));
layout2.addView(btnputh1);

var gamebtn5 = new TextView(ctx);
gamebtn5.setText("сохранить");
gamebtn5.setTextSize(20);      
amster_OS.createsystemapps.crosszero.setfontbtn(gamebtn5)
gamebtn5.setGravity(Gravity.CENTER);
gamebtn5.setTextColor(Color.parseColor('#000055'));
gamebtn5.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.createsystemapps.crosszero.texturespath = btnputh1.getText().toString();
GUYK.dismiss();
GULA.dismiss();
AGUI.dismiss();
GUC.dismiss();
amster_OS.createsystemapps.crosszero.startlevel();
} catch(e){print(e)}
   }}));
layout2.addView(gamebtn5);
}
var cbtn4 = new TextView(ctx);
 cbtn4.setGravity(Gravity.CENTER);   cbtn4.setTextColor(Color.parseColor('#000055'));
    cbtn4.setTextSize(30);
amster_OS.createsystemapps.crosszero.setfontbtn(cbtn4)
cbtn4.setLayoutParams(new LayoutParams(UiWidth/3, MCH_PNT));
     cbtn4.setText("игра");   
layout3.addView(cbtn4);
var gamebtn1 = new TextView(ctx);
gamebtn1.setText("колличество раундов: "+amster_OS.createsystemapps.crosszero.maxscore);
gamebtn1.setTextSize(20);      
amster_OS.createsystemapps.crosszero.setfontbtn(gamebtn1)
gamebtn1.setGravity(Gravity.LEFT);
gamebtn1.setTextColor(Color.parseColor('#000055'));
layout3.addView(gamebtn1);
var gamebtn2 = new SeekBar(ctx);
    gamebtn2.setMax(150);
    gamebtn2.getThumb().setColorFilter(Color.TRANSPARENT, android.graphics.PorterDuff.Mode.SRC);
    gamebtn2.setProgress(amster_OS.createsystemapps.crosszero.maxscore);
    gamebtn2.getProgressDrawable().setColorFilter(Color.parseColor("#000055"), android.graphics.PorterDuff.Mode.SRC_IN);
    gamebtn2.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
amster_OS.createsystemapps.crosszero.maxscore=gamebtn2.getProgress();
    gamebtn1.setText("колличество раундов: "+amster_OS.createsystemapps.crosszero.maxscore);
amster_OS.Data.setValue("scor",amster_OS.createsystemapps.crosszero.maxscore,amster_OS.my_root.getDir()[0]+"dats.txt")
    }
    });
    layout3.addView(gamebtn2);
var gamebtn3 = new TextView(ctx);
if(amster_OS.createsystemapps.crosszero.difficulty==0){
gamebtn3.setText("уровень сложности: лёгкий");
}
if(amster_OS.createsystemapps.crosszero.difficulty==1){
gamebtn3.setText("уровень сложности: средний");
}
if(amster_OS.createsystemapps.crosszero.difficulty==2){
gamebtn3.setText("уровень сложности: сложный");
}
gamebtn3.setTextSize(20);      
amster_OS.createsystemapps.crosszero.setfontbtn(gamebtn3)
gamebtn3.setGravity(Gravity.LEFT);
gamebtn3.setTextColor(Color.parseColor('#000055'));
layout3.addView(gamebtn3);
var gamebtn4 = new SeekBar(ctx);
    gamebtn4.setMax(2);
    gamebtn4.getThumb().setColorFilter(Color.TRANSPARENT, android.graphics.PorterDuff.Mode.SRC);
    gamebtn4.setProgress(amster_OS.createsystemapps.crosszero.difficulty);
    gamebtn4.getProgressDrawable().setColorFilter(Color.parseColor("#000055"), android.graphics.PorterDuff.Mode.SRC_IN);
    gamebtn4.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
amster_OS.createsystemapps.crosszero.difficulty=gamebtn4.getProgress();
    if(amster_OS.createsystemapps.crosszero.difficulty==0){
gamebtn3.setText("уровень сложности: лёгкий");
}
if(amster_OS.createsystemapps.crosszero.difficulty==1){
gamebtn3.setText("уровень сложности: средний");
}
if(amster_OS.createsystemapps.crosszero.difficulty==2){
gamebtn3.setText("уровень сложности: сложный");
}
amster_OS.Data.setValue("diffic",amster_OS.createsystemapps.crosszero.difficulty,amster_OS.my_root.getDir()[0]+"dats.txt")
    }
    });
    layout3.addView(gamebtn4);
    
GULA = new PopupWindow(lay, MCH_PNT, MCH_PNT);
GULA.setAnimationStyle(animation);
GULA.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
 	GULA.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
exitsettings: function(){
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);   exitsetbtn.setTextColor(Color.parseColor('#000055'));
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80)));
    exitsetbtn.setTextSize(60);
amster_OS.createsystemapps.crosszero.setfontbtn(exitsetbtn);
     exitsetbtn.setText("×");   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
GULA.dismiss();
AGUI.dismiss();
GUC.dismiss();
amster_OS.createsystemapps.crosszero.startgamingmenu();
amster_OS.createsystemapps.crosszero.linksmenu();
   }}));
layout.addView(exitsetbtn);
GUC = new PopupWindow(layout, amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80));
GUC.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
 GUC.setAnimationStyle(animation);
	GUC.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0);
},
linksmenu: function(){
var lay = new LinearLayout(ctx);
lay.setOrientation(1);

var openbtn2 = new TextView(ctx);
openbtn2.setTextSize(30);      
openbtn2.setText("vk");
amster_OS.createsystemapps.crosszero.setfontbtn(openbtn2)
openbtn2.setGravity(Gravity.CENTER);
openbtn2.setTextColor(Color.parseColor('#000055'));
openbtn2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.systembrowser.openPage("https://vk.com/idkomandavk");
   }}));
lay.addView(openbtn2);


var openbtn3 = new TextView(ctx);
openbtn3.setText("yt");
openbtn3.setTextSize(30);      
amster_OS.createsystemapps.crosszero.setfontbtn(openbtn3)
openbtn3.setGravity(Gravity.CENTER);
openbtn3.setTextColor(Color.parseColor('#000055'));
openbtn3.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.systembrowser.openPage("https://youtube.com/@smartmanmcpe8952");
   }}));
lay.addView(openbtn3);


AGUI = new PopupWindow(lay, amster_OS.screen.dipSize(40), amster_OS.screen.dipSize(100));
AGUI.setAnimationStyle(animation);
AGUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
 	AGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.BOTTOM, 0, 0);
}
},
simple_snake:{
name:"Змейка 1997",
version:"1.0",
labels:"none",
snakecords : [[2,5],[2,6]],
headpos : "right",
max:65,
savetime:0,
gametimer : 0,
gamestarted : false,
scoreint : 0,
fdcr : [[4,4]],
init: function (){
amster_OS.createsystemapps.simple_snake.gameUI()
amster_OS.createsystemapps.simple_snake.snakeUI()
amster_OS.createsystemapps.simple_snake.gameJoystick()
amster_OS.createsystemapps.simple_snake.exitSnake()
},
snakeUI: function(){
gametimer = amster_OS.createsystemapps.simple_snake.max-amster_OS.createsystemapps.simple_snake.savetime;
   var bmp = new Bitmap.createBitmap(510, 510,Bitmap.Config.ARGB_8888)
var c = new android.graphics.Canvas(bmp);//Слой
var p = new android.graphics.Paint();//Кисточка
p.setColor(Color.parseColor("#9acd32"));
c.drawPaint(p);


var layout = new LinearLayout(ctx);
layout.setOrientation(1);

var b1utton1 = new Button(ctx);
b1utton1.setLayoutParams(new LayoutParams(MCH_PNT, MCH_PNT));
b1utton1.setBackgroundDrawable(BitmapDrawable(bmp))
     layout.addView(b1utton1);

var tick = android.os.Handler();
var runb = new Runnable() {
   run() {
try{
                    if(amster_OS.createsystemapps.simple_snake.gamestarted){
amster_OS.createsystemapps.simple_snake.gametimer--
if(amster_OS.createsystemapps.simple_snake.gametimer<0){
var msx = (amster_OS.createsystemapps.simple_snake.snakecords[amster_OS.createsystemapps.simple_snake.snakecords.length - 1][amster_OS.createsystemapps.simple_snake.snakecords[amster_OS.createsystemapps.simple_snake.snakecords.length - 1].length - 2])
var msy = (amster_OS.createsystemapps.simple_snake.snakecords[amster_OS.createsystemapps.simple_snake.snakecords.length - 1][amster_OS.createsystemapps.simple_snake.snakecords[amster_OS.createsystemapps.simple_snake.snakecords.length - 1].length - 1])
if(amster_OS.createsystemapps.simple_snake.headpos == "right"){
if((msx+1)<15){
amster_OS.createsystemapps.simple_snake.snakecords.push([msx+1,msy])
if(msx+1==amster_OS.createsystemapps.simple_snake.fdcr[0][0]&&msy==amster_OS.createsystemapps.simple_snake.fdcr[0][1]){
amster_OS.createsystemapps.simple_snake.fdcr=[[Math.ceil(Math.random()*15),Math.ceil(Math.random()*14)]]
amster_OS.createsystemapps.simple_snake.scoreint++;
amster_OS.createsystemapps.simple_snake.savetime++;
}else{
amster_OS.createsystemapps.simple_snake.snakecords.shift()
}
}else{
amster_OS.createsystemapps.simple_snake.gamestarted=false;
}
}
if(amster_OS.createsystemapps.simple_snake.headpos == "left"){
if((msx-1)>-1){
amster_OS.createsystemapps.simple_snake.snakecords.push([msx-1,msy])
if(msx-1==amster_OS.createsystemapps.simple_snake.fdcr[0][0]&&msy==amster_OS.createsystemapps.simple_snake.fdcr[0][1]){
amster_OS.createsystemapps.simple_snake.fdcr=[[Math.ceil(Math.random()*14),Math.ceil(Math.random()*14)]]
amster_OS.createsystemapps.simple_snake.scoreint++;
amster_OS.createsystemapps.simple_snake.savetime++;
}else{
amster_OS.createsystemapps.simple_snake.snakecords.shift()
}
}else{
amster_OS.createsystemapps.simple_snake.gamestarted=false;
}
}
if(amster_OS.createsystemapps.simple_snake.headpos == "top"){
if((msy-1)>-1){
amster_OS.createsystemapps.simple_snake.snakecords.push([msx,msy-1])
if(msx==amster_OS.createsystemapps.simple_snake.fdcr[0][0]&&msy-1==amster_OS.createsystemapps.simple_snake.fdcr[0][1]){
amster_OS.createsystemapps.simple_snake.fdcr=[[Math.ceil(Math.random()*14),Math.ceil(Math.random()*14)]]
amster_OS.createsystemapps.simple_snake.scoreint++;
amster_OS.createsystemapps.simple_snake.savetime++
}else{
amster_OS.createsystemapps.simple_snake.snakecords.shift()
}
}else{
amster_OS.createsystemapps.simple_snake.gamestarted=false;
}
}
if(amster_OS.createsystemapps.simple_snake.headpos == "bottom"){
if((msy+1)<15){
amster_OS.createsystemapps.simple_snake.snakecords.push([msx,msy+1])
if(msx==amster_OS.createsystemapps.simple_snake.fdcr[0][0]&&msy+1==amster_OS.createsystemapps.simple_snake.fdcr[0][1]){
amster_OS.createsystemapps.simple_snake.fdcr=[[Math.ceil(Math.random()*14),Math.ceil(Math.random()*14)]]
amster_OS.createsystemapps.simple_snake.scoreint++;
amster_OS.createsystemapps.simple_snake.savetime++;
}else{
amster_OS.createsystemapps.simple_snake.snakecords.shift()
}
}else{
amster_OS.createsystemapps.simple_snake.gamestarted=false;
}
}

if(checkSnakeInBody())amster_OS.createsystemapps.simple_snake.gamestarted=false;
p.setColor(Color.parseColor("#9acd32"));
c.drawPaint(p);
drawFood(amster_OS.createsystemapps.simple_snake.fdcr,bmp)
drawElements(amster_OS.createsystemapps.simple_snake.snakecords,bmp,"#6b8e23")
b1utton1.setBackgroundDrawable(BitmapDrawable(bmp))
if(amster_OS.createsystemapps.simple_snake.max<amster_OS.createsystemapps.simple_snake.savetime){
amster_OS.createsystemapps.simple_snake.gametimer = 0;
}else{
amster_OS.createsystemapps.simple_snake.gametimer = amster_OS.createsystemapps.simple_snake.max-amster_OS.createsystemapps.simple_snake.savetime;
}
}  
}
                }catch(e){
                    print("Error(" + e.lineNumber + "): " + e.message);
                }
tick.postDelayed(this, 10);
   }
};
tick.postDelayed(runb, 10);

function drawElements(cords,bmps,clr){
for(var i in cords){
drawSquare(cords[i][0],cords[i][1],bmps,17,clr)
}
}

function drawFood(fdps){
try{
if(!checkSnake(fdps[0][0],fdps[0][1])){
drawElements(fdps,bmp,"#ff0000")
}else{
amster_OS.createsystemapps.simple_snake.fdcr=[[Math.ceil(Math.random()*14),Math.ceil(Math.random()*14)]]
drawFood(amster_OS.createsystemapps.simple_snake.fdcr,bmp)
}
}catch(e){print(e)}
}
function drawSquare(x,y,bmps,radius,clr) {
var gg = 0;
  for (let i = 0; i < radius * 2; i++) {
    for (let j = 0; j < radius * 2; j++) {
if((x*radius*2+i)<bmps.width&&(y*radius*2+j)<bmps.height){
      bmps.setPixel(x*radius*2+i,y*radius*2+j, Color.parseColor(clr));
}
    }
  }
}
function checkSnake(x,y){
var check=false;
for(var i in amster_OS.createsystemapps.simple_snake.snakecords){
if(amster_OS.createsystemapps.simple_snake.snakecords[i][0]==x&&amster_OS.createsystemapps.simple_snake.snakecords[i][1]==y)check = true;
}
return check;
}

function checkSnakeInBody(){
var check = false;
var msx = (amster_OS.createsystemapps.simple_snake.snakecords[amster_OS.createsystemapps.simple_snake.snakecords.length - 1][amster_OS.createsystemapps.simple_snake.snakecords[amster_OS.createsystemapps.simple_snake.snakecords.length - 1].length - 2])
var msy = (amster_OS.createsystemapps.simple_snake.snakecords[amster_OS.createsystemapps.simple_snake.snakecords.length - 1][amster_OS.createsystemapps.simple_snake.snakecords[amster_OS.createsystemapps.simple_snake.snakecords.length - 1].length - 1])
for(var i = 0; i<amster_OS.createsystemapps.simple_snake.snakecords.length; i++){
if(amster_OS.createsystemapps.simple_snake.snakecords[i][0]==msx&&amster_OS.createsystemapps.simple_snake.snakecords[i][1]==msy&&i<amster_OS.createsystemapps.simple_snake.snakecords.length-1){
check = true;
}}
return check;
}
  KSUI= new PopupWindow(layout, amster_OS.screen.dipSize(400), amster_OS.screen.dipSize(400));      
KSUI.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
KSUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
KSUI.setAnimationStyle(animation);
ctx.runOnUiThread(new Runnable({ run: function(){
KSUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.CENTER,0, 0);
}}));
},
gameUI: function(){
   var bg_s1 = new GradientDrawable();
bg_s1.setColor(Color.BLACK);
bg_s1.setStroke(10, Color.parseColor("#9acd32"));

var layout = new LinearLayout(ctx);
layout.setOrientation(1);

var b1utton1 = new TextView(ctx);
b1utton1.setText("счёт: "+amster_OS.createsystemapps.simple_snake.scoreint)
b1utton1.setTextSize(30);      
b1utton1.setGravity(Gravity.CENTER);
b1utton1.setTextColor(Color.parseColor('#ffffff'));
     layout.addView(b1utton1);
amster_OS.createsystemapps.simple_snake.fakeBtn(layout)
amster_OS.createsystemapps.simple_snake.fakeBtn(layout)
amster_OS.createsystemapps.simple_snake.fakeBtn(layout)
amster_OS.createsystemapps.simple_snake.fakeBtn(layout)

var b1utton2 = new TextView(ctx);
b1utton2.setText("начать игру");   
b1utton2.setTextSize(30);      
b1utton2.setGravity(Gravity.CENTER);
b1utton2.setTextColor(Color.parseColor('#ffffff'));
 b1utton2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
		try{
if(!amster_OS.createsystemapps.simple_snake.gamestarted){
amster_OS.createsystemapps.simple_snake.headpos = "right"
amster_OS.createsystemapps.simple_snake.savetime=0;
amster_OS.createsystemapps.simple_snake.gametimer = amster_OS.createsystemapps.simple_snake.max-amster_OS.createsystemapps.simple_snake.savetime;
amster_OS.createsystemapps.simple_snake.scoreint = 0;
amster_OS.createsystemapps.simple_snake.snakecords = [[2,5],[2,6]]
amster_OS.createsystemapps.simple_snake.fdcr = [[4,4]];
amster_OS.createsystemapps.simple_snake.gamestarted=true;
b1utton2.setText("");   
}
}catch(e){print (e)}
  	}
}));
    layout.addView(b1utton2);

var tick = android.os.Handler();
var runb = new Runnable() {
   run() {
if(!amster_OS.createsystemapps.simple_snake.gamestarted)b1utton2.setText("начать игру");   
b1utton1.setText("счёт: "+amster_OS.createsystemapps.simple_snake.scoreint)
              tick.postDelayed(this, 100);
   }
};
tick.postDelayed(runb, 100);

  FSUI= new PopupWindow(layout, UiWidth/2, MCH_PNT);      
FSUI.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
FSUI.setBackgroundDrawable(bg_s1);
FSUI.setAnimationStyle(animation);
FSUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.CENTER,0, 0);
},
exitSnake: function(){
   var bg_s1 = new GradientDrawable();
bg_s1.setColor(Color.TRANSPARENT);


var layout = new LinearLayout(ctx);
layout.setOrientation(1);

var b1utton1 = new TextView(ctx);
b1utton1.setText("×");   
b1utton1.setTextSize(60);      
b1utton1.setGravity(Gravity.CENTER);
b1utton1.setTextColor(Color.parseColor('#ffffff'));
     b1utton1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
		try{
GAGUI.dismiss();
GGYUL.dismiss();
FSUI.dismiss();
KSUI.dismiss();
amster_OS.createsystemapps.simple_snake.gamestarted=false;
}catch(e){print(e)}
  	}
}));
layout.addView(b1utton1);


  GAGUI= new PopupWindow(layout, amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80));      
GAGUI.setBackgroundDrawable(bg_s1);
GAGUI.setAnimationStyle(animation);
GAGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP,0, 0);
},
gameJoystick: function(){
   var bg_s1 = new GradientDrawable();
bg_s1.setColor(Color.TRANSPARENT);


var layout = new GridLayout(ctx);
layout.setColumnCount(3);

amster_OS.createsystemapps.simple_snake.fakeBtn(layout)
var b1utton1 = new TextView(ctx);
b1utton1.setText("ᐃ");   
b1utton1.setTextSize(25);      
b1utton1.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(60), amster_OS.screen.dipSize(60)));
b1utton1.setGravity(Gravity.CENTER);
b1utton1.setTextColor(Color.parseColor('#ffffff'));
   b1utton1.setTextColor(Color.parseColor('#ffffff'));
     b1utton1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
		if(amster_OS.createsystemapps.simple_snake.headpos != "bottom"){
amster_OS.createsystemapps.simple_snake.headpos = "top"
}
  	}
}));
  layout.addView(b1utton1);
amster_OS.createsystemapps.simple_snake.fakeBtn(layout)
var b1utton2 = new TextView(ctx);
b1utton2.setText("ᐊ");   
b1utton2.setTextSize(25);      
b1utton2.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(60), amster_OS.screen.dipSize(60)));
b1utton2.setGravity(Gravity.CENTER);
b1utton2.setTextColor(Color.parseColor('#ffffff'));
 b1utton2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
		if(amster_OS.createsystemapps.simple_snake.headpos != "right"){
amster_OS.createsystemapps.simple_snake.headpos = "left"
}
  	}
}));
    layout.addView(b1utton2);
amster_OS.createsystemapps.simple_snake.fakeBtn(layout)
var b1utton3 = new TextView(ctx);
b1utton3.setText("ᐅ");   
b1utton3.setTextSize(25);      
b1utton3.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(60), amster_OS.screen.dipSize(60)));
b1utton3.setGravity(Gravity.CENTER);
b1utton3.setTextColor(Color.parseColor('#ffffff'));
    b1utton3.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
		if(amster_OS.createsystemapps.simple_snake.headpos != "left"){
amster_OS.createsystemapps.simple_snake.headpos = "right"
}
  	}
}));
 layout.addView(b1utton3);
amster_OS.createsystemapps.simple_snake.fakeBtn(layout)
var b1utton4 = new TextView(ctx);
b1utton4.setText("ᐁ");   
b1utton4.setTextSize(25);      
b1utton4.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(60), amster_OS.screen.dipSize(60)));
b1utton4.setGravity(Gravity.CENTER);
b1utton4.setTextColor(Color.parseColor('#ffffff'));
  b1utton4.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
		if(amster_OS.createsystemapps.simple_snake.headpos != "top"){
amster_OS.createsystemapps.simple_snake.headpos = "bottom"
}
  	}
}));
   layout.addView(b1utton4);
amster_OS.createsystemapps.simple_snake.fakeBtn(layout)

  GGYUL= new PopupWindow(layout, WR_CNT, WR_CNT);      
GGYUL.setBackgroundDrawable(bg_s1);
GGYUL.setAnimationStyle(animation);
GGYUL.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.BOTTOM,0, 0);
},
fakeBtn: function(lay){
var b1utton1 = new TextView(ctx);
b1utton1.setText(" ");   
b1utton1.setTextSize(10);      
b1utton1.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(5), amster_OS.screen.dipSize(5)));
b1utton1.setGravity(Gravity.CENTER);
b1utton1.setTextColor(Color.parseColor('#ffffff'));
     lay.addView(b1utton1);
}
},
systemcalendar:{
name:"Календарь",
version:"1.0",
labels:"none",
init: function (){
this.calendint();
this.calendexit();
},
calendint: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var Calendar = new android.widget.CalendarView(ctx);
lays.addView(Calendar)
  CALGUI= new PopupWindow(lays, MCH_PNT, MCH_PNT);      
CALGUI.setAnimationStyle(animation);
CALGUI.setBackgroundDrawable(new ColorDrawable(Color.WHITE));
            CALGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
calendexit: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);   exitsetbtn.setTextColor(Color.parseColor('#a93226'));
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80)));
    exitsetbtn.setTextSize(60);
     exitsetbtn.setText("×");   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
CALCGUI.dismiss();
CALGUI.dismiss();
   }}));
lays.addView(exitsetbtn);
  CALCGUI= new PopupWindow(lays, amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80));      
CALCGUI.setAnimationStyle(animation);
CALCGUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            CALCGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.BOTTOM,0, 0);
}
},
calculator:{
name:"Калькулятор",
version:"1.0",
labels:"none",
page:true,
textd:null,
calc1:['1','2','3','-','4','5','6','+','7','8','9','*','0','(',')','÷'],
calc2:['.','PI','E','!','^','E^','cos','sin','√','round','floor','ceil','log'],
init: function (){
var data3 = new File(amster_OS.my_root.getDir()[2]+"dats.txt");
data3.createNewFile();
textd=null;
if(amster_OS.Data.getValue("resultg",amster_OS.my_root.getDir()[2]+"dats.txt")!=null){
amster_OS.createsystemapps.calculator.textd=amster_OS.Data.getValue("resultg",amster_OS.my_root.getDir()[2]+"dats.txt")
}
this.calculator();
},
autogenbg: function (){
var bg_l = new GradientDrawable();
bg_l.setColor(Color.parseColor('#ffffff'));
bg_l.setStroke(3,Color.parseColor('#e06a1b'));
return bg_l;
},
calculator:function(){
var bg_z=new GradientDrawable();
bg_z.setColor(Color.parseColor('#ffffff'));
var bg_y=new GradientDrawable();
bg_y.setColor(Color.parseColor('#ffffff'));
var layout = new LinearLayout(ctx);
  layout.setOrientation(1);
var layout1 = new LinearLayout(ctx);
  layout1.setOrientation(1);
var layout4 = new LinearLayout(ctx);
layout4.setLayoutParams(new LayoutParams(MCH_PNT, MCH_PNT));
layout4.setBackground(amster_OS.createsystemapps.calculator.autogenbg());
layout4.setPadding(2,2,2,2);
  layout4.setOrientation(1);
var layout2 = new LinearLayout(ctx);
  layout2.setOrientation(0);
var layout3 = new LinearLayout(ctx);
  layout3.setOrientation(0);
var grid = new GridLayout(ctx);
grid.setBackground(amster_OS.createsystemapps.calculator.autogenbg());
grid.setPadding(2,2,2,2);
grid.setColumnCount(4);
var grids = new GridLayout(ctx);
grids.setLayoutParams(new LayoutParams(WR_CNT, MCH_PNT));
grids.setBackground(amster_OS.createsystemapps.calculator.autogenbg());
grids.setPadding(2,2,2,2);
grids.setColumnCount(4);
layout3.addView(grid);
layout3.addView(grids);
layout3.addView(layout4);
layout3.setBackground(amster_OS.createsystemapps.calculator.autogenbg());
layout3.setPadding(4,4,4,4);

var button1 = new TextView(ctx);
if(amster_OS.createsystemapps.calculator.textd != null){
	button1.setText((fromHtml('<b><font color="#000000">'+amster_OS.createsystemapps.calculator.textd+'</font></b>')));
    }else{
    button1.setText("");

    }
button1.setMaxLines(1);  
button1.setBackground(amster_OS.createsystemapps.calculator.autogenbg());
button1.setLayoutParams(new LayoutParams(UiWidth/1, amster_OS.screen.dipSize(90)));
    button1.setGravity(Gravity.CENTER);
    button1.setTextSize(35);
    layout.addView(button1);
layout.addView(layout3);
//layout.addView(layout2);

function genBtn1(){
for(var i in amster_OS.createsystemapps.calculator.calc1){
var button12 = new TextView(ctx);
button12.setTextColor(Color.parseColor('#000000'));
button12.setText(fromHtml('<b><font color="#000000">'+amster_OS.createsystemapps.calculator.calc1[i]+'</font></b>'));
    button12.setGravity(Gravity.CENTER);
    button12.setTextSize(30);
    button12.setId(i);
    button12.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(60), amster_OS.screen.dipSize(60)));
    button12.setBackground(bg_y);
    button12.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
hidetbtn.setText("");
    if(button1.getText().toString() == null){
button1.setText(fromHtml('<b><font color="black">'+amster_OS.createsystemapps.calculator.calc1[view.getId()]+'</font></b>'));
amster_OS.createsystemapps.calculator.textd=amster_OS.createsystemapps.calculator.calc1[view.getId()];
}else{
button1.setText(fromHtml('<b><font color="black">'+button1.getText().toString()+amster_OS.createsystemapps.calculator.calc1[view.getId()]+'</font></b>'));
amster_OS.createsystemapps.calculator.textd=amster_OS.createsystemapps.calculator.textd+amster_OS.createsystemapps.calculator.calc1[view.getId()];
}
    }
    }));
    grid.addView(button12);
}
}

function genBtn2(){
for(var i in amster_OS.createsystemapps.calculator.calc2){
var button12 = new TextView(ctx);
button12.setTextColor(Color.parseColor('#e06a1b'));
    button12.setText(amster_OS.createsystemapps.calculator.calc2[i]);
button12.setText(fromHtml('<b><font color="#e06a1b">'+amster_OS.createsystemapps.calculator.calc2[i]+'</font></b>'));
    button12.setGravity(Gravity.CENTER);
    button12.setTextSize(20);
    button12.setId(i);
    button12.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(60), amster_OS.screen.dipSize(60)));
    button12.setBackground(bg_y);
    button12.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
hidetbtn.setText("");
    if(button1.getText().toString() == null){
button1.setText(fromHtml('<b><font color="black">'+amster_OS.createsystemapps.calculator.calc2[view.getId()]+'</font></b>'));
amster_OS.createsystemapps.calculator.textd=amster_OS.createsystemapps.calculator.calc1[view.getId()];
}else{
button1.setText(fromHtml('<b><font color="black">'+button1.getText().toString()+amster_OS.createsystemapps.calculator.calc2[view.getId()]+'</font></b>'));
amster_OS.createsystemapps.calculator.textd=amster_OS.createsystemapps.calculator.textd+amster_OS.createsystemapps.calculator.calc2[view.getId()];
}
    }
    }));
    grids.addView(button12);
}
}

if(!amster_OS.createsystemapps.calculator.page){
genBtn1();
genBtn2();
}else{
genBtn1();
}
   var button12515 = new TextView(ctx);
button12515.setTextColor(Color.parseColor('#000000'));
    button12515.setText(fromHtml('<b><font color="black">результат</font></b>'));
    button12515.setGravity(Gravity.CENTER);
    button12515.setTextSize(20);
    button12515.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
    button12515.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
   try{
 amster_OS.createsystemapps.calculator.textd = amster_OS.createsystemapps.calculator.textd.replace("null", "");
 amster_OS.createsystemapps.calculator.textd = amster_OS.createsystemapps.calculator.textd.replace("PI", Math.PI);
 amster_OS.createsystemapps.calculator.textd = amster_OS.createsystemapps.calculator.textd.replace("E", Math.E);
 amster_OS.createsystemapps.calculator.textd = amster_OS.createsystemapps.calculator.textd.replace("÷", "/");
amster_OS.createsystemapps.calculator.textd = amster_OS.createsystemapps.calculator.fixParenthesis(amster_OS.createsystemapps.calculator.textd);
 if(amster_OS.createsystemapps.calculator.textd.indexOf("^") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("^")
 if(calct[1] && calct[0]){
 amster_OS.createsystemapps.calculator.textd = "Math.pow("+calct[0]+","+calct[1]+")";
  }else{
  hidetbtn.setText(fromHtml('<b><font color="red">Syntax error</font></b>'));
  }
  }
  if(amster_OS.createsystemapps.calculator.textd.indexOf("E^") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("E^")
 amster_OS.createsystemapps.calculator.textd = "Math.exp("+calct[0]+calct[1]+")";
  }
  if(amster_OS.createsystemapps.calculator.textd.indexOf("cos") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("cos")
 amster_OS.createsystemapps.calculator.textd = "Math.cos("+calct[0]+calct[1]+")";
  }
if(amster_OS.createsystemapps.calculator.textd.indexOf("!") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("!")
 amster_OS.createsystemapps.calculator.textd = "amster_OS.createsystemapps.calculator.factorial("+calct[0]+calct[1]+")";
  }
if(amster_OS.createsystemapps.calculator.textd.indexOf("log") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("log")
 amster_OS.createsystemapps.calculator.textd = "Math.log("+calct[0]+calct[1]+")";
  }
  if(amster_OS.createsystemapps.calculator.textd.indexOf("sin") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("sin")
 amster_OS.createsystemapps.calculator.textd = "Math.sin("+calct[0]+calct[1]+")";
  }
  if(amster_OS.createsystemapps.calculator.textd.indexOf("√") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("√")
 amster_OS.createsystemapps.calculator.textd = "Math.sqrt("+calct[0]+calct[1]+")";
  }
  if(amster_OS.createsystemapps.calculator.textd.indexOf("round") != -1){
 var calct =amster_OS.createsystemapps.calculator.textd.split("round")
 amster_OS.createsystemapps.calculator.textd = "Math.round("+calct[0]+calct[1]+")";
  }
  if(amster_OS.createsystemapps.calculator.textd.indexOf("ceil") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("ceil")
 amster_OS.createsystemapps.calculator.textd = "Math.ceil("+calct[0]+calct[1]+")";
  }
  if(amster_OS.createsystemapps.calculator.textd.indexOf("floor") != -1){
 var calct = amster_OS.createsystemapps.calculator.textd.split("floor")
 amster_OS.createsystemapps.calculator.textd = "Math.floor("+calct[0]+calct[1]+")";
  }
if(button1.getText().toString().toLowerCase().indexOf("error") == -1){
button1.setText((android.text.Html.fromHtml('<b><font color="black">'+eval(amster_OS.createsystemapps.calculator.textd)+'</font></b>')));
amster_OS.createsystemapps.calculator.textd = eval(amster_OS.createsystemapps.calculator.textd)+"";
if(amster_OS.createsystemapps.calculator.textd == "undefined")button1.setText((android.text.Html.fromHtml('<b><font color="black">0</font></b>')));
if(amster_OS.createsystemapps.calculator.textd == "-Infinity" || amster_OS.createsystemapps.calculator.textd == "Infinity")button1.setText((android.text.Html.fromHtml('<b><font color="black">0</font></b>')));
}
}catch(err){
button1.setText("");
hidetbtn.setText(fromHtml('<b><font color="red">Syntax error: by catch '+err+'</font></b>'));
}
    }
    }));
    layout4.addView(button12515);
    
var button2551 = new TextView(ctx);
button2551.setTextColor(Color.parseColor('#000000'));
    button2551.setText(fromHtml('<b><font color="black">стереть</font></b>'));
    button2551.setGravity(Gravity.CENTER);
    button2551.setTextSize(20);
    button2551.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
    button2551.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
amster_OS.createsystemapps.calculator.textd=amster_OS.createsystemapps.calculator.textd.slice(0,-1);
    button1.setText(fromHtml('<b><font color="black">'+amster_OS.createsystemapps.calculator.textd+'</font></b>'))
    }
    }));
    layout4.addView(button2551);
  var button12551 = new TextView(ctx);
button12551.setTextColor(Color.parseColor('#000000'));
    button12551.setText(fromHtml('<b><font color="black">очистить</font></b>'));
    button12551.setGravity(Gravity.CENTER);
    button12551.setTextSize(20);
    button12551.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
    button12551.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
    button1.setText("");
amster_OS.createsystemapps.calculator.textd="";
    }
    }));
    layout4.addView(button12551);
 var utton1 = new TextView(ctx);
utton1.setTextColor(Color.parseColor('#000000'));
    utton1.setText(fromHtml('<b><font color="black">полностью</font></b>'));
utton1.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
    utton1.setGravity(Gravity.CENTER);
    utton1.setTextSize(20);
    utton1.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
grids.removeAllViews();
grid.removeAllViews();
    if(amster_OS.createsystemapps.calculator.page){
    amster_OS.createsystemapps.calculator.page=false;
genBtn1();
    utton1.setText(fromHtml('<b><font color="black">полностью</font></b>'));
    }else{
    amster_OS.createsystemapps.calculator.page=true;
    genBtn1();
    genBtn2();
utton1.setText(fromHtml('<b><font color="black">скрыть</font></b>'));
    }
    }
    }));
    layout4.addView(utton1);
var btnf773 = new TextView(ctx);
btnf773.setTextColor(Color.parseColor('#000000'));
    btnf773.setText(fromHtml('<b><font color="black">выход</font></b>'));
    btnf773.setGravity(Gravity.CENTER);
btnf773.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
    btnf773.setTextSize(20);
    btnf773.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
    CALIGUI.dismiss();
amster_OS.Data.setValue("resultg",button1.getText().toString(),amster_OS.my_root.getDir()[2]+"dats.txt")
    }
    }));
    layout4.addView(btnf773);

var hidetbtn = new TextView(ctx);
 hidetbtn.setGravity(Gravity.CENTER);   
hidetbtn.setTextColor(Color.parseColor('#ffffff'));
hidetbtn.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
hidetbtn.setMarqueeRepeatLimit(-1);
hidetbtn.setTextSize(20);
hidetbtn.setSingleLine();
hidetbtn.setText("");
hidetbtn.setHorizontallyScrolling(true);
hidetbtn.setSelected(true);         
    hidetbtn.setTextSize(20);
layout.addView(hidetbtn);

 CALIGUI = new PopupWindow(layout, MCH_PNT, MCH_PNT);
CALIGUI.setBackgroundDrawable(bg_z);  
 CALIGUI.setAnimationStyle(animation);
 	CALIGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
fixParenthesis: function (text){
var copy = text;
copy = copy.replace("0(", "0*(");
copy = copy.replace("1(", "1*(");
copy = copy.replace("2(", "2*(");
copy = copy.replace("3(", "3*(");
copy = copy.replace("4(", "4*(");
copy = copy.replace("5(", "5*(");
copy = copy.replace("6(", "6*(");
copy = copy.replace("7(", "7*(");
copy = copy.replace("8(", "8*(");
copy = copy.replace("9(", "9*(");
copy = copy.replace(")(", ")*(");
return copy;
},
factorial: function(n) {
if(n==0) return 1;
if(n<180&&n>-180){
    var result = 1;
    for (var i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}else{
return "infinity";
}}
},
simple_clicker:{
name:"Кликер",
version:"1.0",
labels:"none",
money_player:new MediaPlayer(),
bg_player:new MediaPlayer(),
tlcost:[150,400,1200,14300,45000,110000,250000,400000,1000000,5000000,20500000,60000000,100000000,350000000,650000000,1000000000,1450000000],
tlname:["поставить шины","длинные ручки","увеличить место","вторая телега","полная прокачка","добавить колеса","маленький погрузчик","большой погрузчик","КамАЗ","двойной КамАЗ","белаз","бригада с КАМАЗами","Титаник","подводная лодка","морская пехота","инопришельцы","портальная пушка","межгалактический корбаль"],
tlres:[4,11,26,46,108,190,250,350,500,1600,5000,15000,60000,120000,230000,500000,750000,1250000],
tlcount:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
hpcost:[200,600,1300,6000,15000,42500,120000,600000,1000000,7000000,20000000,60000000,250000000,650000000,1100000000,10000000000,65000000000],
hpname:["помощь незнакомца","попросить друга","нанять рабочих","группа прохожих","компания друзей","племя индейцев","бодибилдер","терминатор","оптимус прайм","команда автоботов","конвейер","армия","построить банк","африканская колония","чёрная дыра","черные силы","помощь Иисуса"],
hpres:[1,3,7,15,25,50,100,350,500,2000,5000,10000,35000,60000,100000,250000,500000,750000],
hpcount:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
money:0,
maxrandom:3,
musicplaying:1,
getcoins:0,
init: function (){
let puth22 = amster_OS.my_root.getDir()[1]+"use_textures";
var file1 = new File(puth22);

var data2 = new File(amster_OS.my_root.getDir()[1]+"dats.txt");
data2.createNewFile();
this.loadalldata();

if(file1.exists()){
this.fullstart();
}else{
//download
amster_OS.downloadManager.setupmenu(amster_OS.my_root.getDir()[1]+"use_textures",true,amster_OS.createsystemapps.simple_clicker,["res.aour"],amster_OS.my_root.getDir()[1],["https://drive.Google.com/uc?export=download&id=16OzVB7h0kBRWgf73fXPj2xrPf7ZgY323"],true);
}
},
getimgbg: function (name){
if(name=="game"){
var game_bgimg =amster_OS.fast_files.getFileFromZip(amster_OS.my_root.getDir()[1]+"res.aour", "bg.png");
var game_image =  BitmapFactory.decodeFile(game_bgimg);
return BitmapDrawable(game_image);
}
if(name=="shop"){
var shop_bgimg =amster_OS.fast_files.getFileFromZip(amster_OS.my_root.getDir()[1]+"res.aour", "shop.png");
var shop_image =  BitmapFactory.decodeFile(shop_bgimg);
return BitmapDrawable(shop_image);
}
if(name=="settings"){
var settings_bgimg = amster_OS.fast_files.getFileFromZip(amster_OS.my_root.getDir()[1]+"res.aour", "settings.png");
var settings_image =  BitmapFactory.decodeFile(settings_bgimg);
return BitmapDrawable(settings_image);
}
},
startlevel: function(){
this.fullstart();
},
fullstart: function (){
try{
this.clicker_scene();
this.clickerexit();
this.bgmusic(amster_OS.fast_files.getFileFromZip(amster_OS.my_root.getDir()[1]+"res.aour", "bgmusic.mp3").getAbsolutePath());
this.clicktomoney();
this.moneypanel();
this.openshop();
this.opensettings();
}catch(e){print(e)}
},
loadalldata: function (){
if(amster_OS.Data.getValue("data1",amster_OS.my_root.getDir()[1]+"dats.txt")!=null){
eval('amster_OS.createsystemapps.simple_clicker.tlcost =['+amster_OS.Data.getValue("data1",amster_OS.my_root.getDir()[1]+"dats.txt")+']');
}
if(amster_OS.Data.getValue("data2",amster_OS.my_root.getDir()[1]+"dats.txt")!=null){
eval('amster_OS.createsystemapps.simple_clicker.tlcount =['+amster_OS.Data.getValue("data2",amster_OS.my_root.getDir()[1]+"dats.txt")+']');
}
if(amster_OS.Data.getValue("data3",amster_OS.my_root.getDir()[1]+"dats.txt")!=null){
eval('amster_OS.createsystemapps.simple_clicker.hpcost =['+amster_OS.Data.getValue("data3",amster_OS.my_root.getDir()[1]+"dats.txt")+']');
}
if(amster_OS.Data.getValue("data4",amster_OS.my_root.getDir()[1]+"dats.txt")!=null){
eval('amster_OS.createsystemapps.simple_clicker.hpcount =['+amster_OS.Data.getValue("data4",amster_OS.my_root.getDir()[1]+"dats.txt")+']');
}
if(amster_OS.Data.getValue("monets",amster_OS.my_root.getDir()[1]+"dats.txt")!=null){
amster_OS.createsystemapps.simple_clicker.money=parseInt(amster_OS.Data.getValue("monets",amster_OS.my_root.getDir()[1]+"dats.txt"))
}
if(amster_OS.Data.getValue("randomB",amster_OS.my_root.getDir()[1]+"dats.txt")!=null){
amster_OS.createsystemapps.simple_clicker.maxrandom=parseInt(amster_OS.Data.getValue("randomB",amster_OS.my_root.getDir()[1]+"dats.txt"))
}
if(amster_OS.Data.getValue("getB",amster_OS.my_root.getDir()[1]+"dats.txt")!=null){
amster_OS.createsystemapps.simple_clicker.getcoins=parseInt(amster_OS.Data.getValue("getB",amster_OS.my_root.getDir()[1]+"dats.txt"))
}
if(amster_OS.Data.getValue("parmusic",amster_OS.my_root.getDir()[1]+"dats.txt")!=null){
amster_OS.createsystemapps.simple_clicker.musicplaying=parseInt(amster_OS.Data.getValue("parmusic",amster_OS.my_root.getDir()[1]+"dats.txt"))
}
},
clicker_scene: function(){
var LayoutParams = LayoutParams;
var layout = new LinearLayout(ctx);
  layout.setOrientation(1);
 CLICKGAMEGUI = new PopupWindow(layout, MCH_PNT, MCH_PNT);
CLICKGAMEGUI.setBackgroundDrawable(amster_OS.createsystemapps.simple_clicker.getimgbg("game"));  
 CLICKGAMEGUI.setAnimationStyle(animation);
 	CLICKGAMEGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
clickerexit: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);  
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80)));
    exitsetbtn.setTextSize(60);
     exitsetbtn.setText('');   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.Data.setValue("monets",amster_OS.createsystemapps.simple_clicker.money,amster_OS.my_root.getDir()[1]+"dats.txt");
CLICKGAMEGUI.dismiss();
CLICKGAMEEXIT.dismiss();
CLICKSETOPEN.dismiss();
moneyCLICKUI.dismiss();
moneyUI.dismiss();
CLICKSHOPOPEN.dismiss();
amster_OS.createsystemapps.simple_clicker.bg_player.pause();
amster_OS.createsystemapps.simple_clicker.bg_player.reset();
amster_OS.createsystemapps.simple_clicker.money_player.pause();
amster_OS.createsystemapps.simple_clicker.money_player.reset();
}catch(e){print(e)}
   }}));
lays.addView(exitsetbtn);
  CLICKGAMEEXIT= new PopupWindow(lays, amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80));      
CLICKGAMEEXIT.setAnimationStyle(animation);
CLICKGAMEEXIT.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            CLICKGAMEEXIT.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP,0, 0);
},
shop_scene: function(){
var LayoutParams = LayoutParams;
var layout = new LinearLayout(ctx);
  layout.setOrientation(1);
 CLICKSHOPGUI = new PopupWindow(layout, MCH_PNT, MCH_PNT);
CLICKSHOPGUI.setBackgroundDrawable(amster_OS.createsystemapps.simple_clicker.getimgbg("shop"));  
 CLICKSHOPGUI.setAnimationStyle(animation);
 	CLICKSHOPGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
shopexit: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);  
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80)));
    exitsetbtn.setTextSize(60);
     exitsetbtn.setText('');   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
CLICKSHOPGUI.dismiss();
CLICKSHOPEXIT.dismiss();
SHOPUI.dismiss();
moneyUI.dismiss();amster_OS.createsystemapps.simple_clicker.moneypanel();
}catch(e){print(e)}
   }}));
lays.addView(exitsetbtn);
  CLICKSHOPEXIT= new PopupWindow(lays, amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80));      
CLICKSHOPEXIT.setAnimationStyle(animation);
CLICKSHOPEXIT.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            CLICKSHOPEXIT.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP,0, 0);
},
openshop: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);  
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(130), amster_OS.screen.dipSize(80)));
    exitsetbtn.setTextSize(60);
     exitsetbtn.setText('');   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.createsystemapps.simple_clicker.shop_scene()
amster_OS.createsystemapps.simple_clicker.shopexit();
amster_OS.createsystemapps.simple_clicker.shoppanel();
moneyUI.dismiss();amster_OS.createsystemapps.simple_clicker.moneypanel();
}catch(e){print(e)}
   }}));
lays.addView(exitsetbtn);
  CLICKSHOPOPEN= new PopupWindow(lays, amster_OS.screen.dipSize(130), amster_OS.screen.dipSize(80));      
CLICKSHOPOPEN.setAnimationStyle(animation);
CLICKSHOPOPEN.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            CLICKSHOPOPEN.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.BOTTOM,0, 0);
},
moneysound: function(peth){
amster_OS.createsystemapps.simple_clicker.money_player.pause();
amster_OS.createsystemapps.simple_clicker.money_player.reset();
amster_OS.createsystemapps.simple_clicker.money_player.setVolume(1, 1);
amster_OS.createsystemapps.simple_clicker.money_player.setDataSource(peth);
amster_OS.createsystemapps.simple_clicker.money_player.prepare();
amster_OS.createsystemapps.simple_clicker.money_player.start();    
},
bgmusic: function(peths){
if(amster_OS.createsystemapps.simple_clicker.musicplaying==1){
amster_OS.createsystemapps.simple_clicker.bg_player.pause();
amster_OS.createsystemapps.simple_clicker.bg_player.reset();
amster_OS.createsystemapps.simple_clicker.bg_player.setVolume(1, 1);
amster_OS.createsystemapps.simple_clicker.bg_player.setDataSource(peths);
amster_OS.createsystemapps.simple_clicker.bg_player.prepare();
amster_OS.createsystemapps.simple_clicker.bg_player.start();    
amster_OS.createsystemapps.simple_clicker.bg_player.setLooping(true);
}},
clicktomoney: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);  
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(180), amster_OS.screen.dipSize(200)));
    exitsetbtn.setTextSize(60);
     exitsetbtn.setText('');   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(!amster_OS.createsystemapps.simple_clicker.money_player.isPlaying()){
amster_OS.createsystemapps.simple_clicker.moneysound(amster_OS.fast_files.getFileFromZip(amster_OS.my_root.getDir()[1]+"res.aour", "click.ogg").getAbsolutePath());
}
amster_OS.createsystemapps.simple_clicker.money=amster_OS.createsystemapps.simple_clicker.money+amster_OS.createsystemapps.simple_clicker.maxrandom;
}catch(e){print(e)}
   }}));
lays.addView(exitsetbtn);
  moneyCLICKUI= new PopupWindow(lays, amster_OS.screen.dipSize(180), amster_OS.screen.dipSize(200));      
moneyCLICKUI.setAnimationStyle(animation);
moneyCLICKUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
          moneyCLICKUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
moneypanel: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);  
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(50)));
    exitsetbtn.setTextSize(20);
     exitsetbtn.setText('');    
lays.addView(exitsetbtn);

var tick = android.os.Handler();
var runb = new Runnable() {
   run() {
amster_OS.createsystemapps.simple_clicker.money=amster_OS.createsystemapps.simple_clicker.money+amster_OS.createsystemapps.simple_clicker.getcoins;
exitsetbtn.setText(fromHtml('<b><font color="#ffffff">'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.money)+'</font></b>'))                
tick.postDelayed(this, 1000);
   }
};
tick.postDelayed(runb, 1000);

  moneyUI= new PopupWindow(lays, amster_OS.screen.dipSize(100), amster_OS.screen.dipSize(50));      
moneyUI.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
moneyUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
           moneyUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP,0, 0);
},
shoppanel: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(0);

var lay1 = new LinearLayout(ctx);
  lay1.setOrientation(1);
var lay2 = new LinearLayout(ctx);
  lay2.setOrientation(1);

var menuScroll1 = new ScrollView(ctx);
menuScroll1.addView(lay1);
menuScroll1.setVerticalScrollBarEnabled(false);
menuScroll1.setHorizontalScrollBarEnabled(false);

var menuScroll2 = new ScrollView(ctx);
menuScroll2.addView(lay2);
menuScroll2.setVerticalScrollBarEnabled(false);
menuScroll2.setHorizontalScrollBarEnabled(false);
lays.addView(menuScroll1);
lays.addView(menuScroll2);

function createbtns(){
 lay1.removeAllViews();
 lay2.removeAllViews();

var telinfo = new Button(ctx);
 telinfo.setGravity(Gravity.CENTER);   
telinfo.setTextColor(Color.parseColor('#FFFFFF'));
    telinfo.setTextSize(25);
telinfo.setLayoutParams(new LayoutParams(UiWidth/2, UiHeight/8));
 telinfo.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.maxrandom)+'/click</font></b>'))
telinfo.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
lay1.addView(telinfo);
for(var i in amster_OS.createsystemapps.simple_clicker.tlcost){
var telega = new Button(ctx);
 telega.setGravity(Gravity.CENTER);   
telega.setTextColor(Color.parseColor('#FFFFFF'));
    telega.setTextSize(15);
telega.setId(i);
telega.setLayoutParams(new LayoutParams(UiWidth/2, UiHeight/10));
    if(amster_OS.createsystemapps.simple_clicker.money>=amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.tlcost[i],amster_OS.createsystemapps.simple_clicker.tlcount[i])){
telega.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.tlname[i]+' ('+amster_OS.createsystemapps.simple_clicker.tlcount[i]+')</font></b><b><font color="green">\n'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.tlcost[i],amster_OS.createsystemapps.simple_clicker.tlcount[i]))+'</font></b>'))
}else{
 telega.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.tlname[i]+' ('+amster_OS.createsystemapps.simple_clicker.tlcount[i]+')</font></b><b><font color="red">\n'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.tlcost[i],amster_OS.createsystemapps.simple_clicker.tlcount[i]))+'</font></b>'))
}
telega.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
telega.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
   	try{
let id = viewarg.getId();
if(amster_OS.createsystemapps.simple_clicker.money>=amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.tlcost[id],amster_OS.createsystemapps.simple_clicker.tlcount[id])){
amster_OS.createsystemapps.simple_clicker.tlcount[id]++;
var oldcost = amster_OS.createsystemapps.simple_clicker.tlcost[id];
amster_OS.createsystemapps.simple_clicker.tlcost[id] = amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.tlcost[id],amster_OS.createsystemapps.simple_clicker.tlcount[id])
amster_OS.createsystemapps.simple_clicker.maxrandom=amster_OS.createsystemapps.simple_clicker.maxrandom+amster_OS.createsystemapps.simple_clicker.tlres[id];
amster_OS.createsystemapps.simple_clicker.money=amster_OS.createsystemapps.simple_clicker.money-oldcost;
amster_OS.Data.setValue("randomB",amster_OS.createsystemapps.simple_clicker.maxrandom,amster_OS.my_root.getDir()[1]+"dats.txt")
amster_OS.Data.setValue("data1",amster_OS.createsystemapps.simple_clicker.tlcost,amster_OS.my_root.getDir()[1]+"dats.txt")
amster_OS.Data.setValue("data2",amster_OS.createsystemapps.simple_clicker.tlcount,amster_OS.my_root.getDir()[1]+"dats.txt")
}
if(amster_OS.createsystemapps.simple_clicker.money>=amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.tlcost[id],amster_OS.createsystemapps.simple_clicker.tlcount[id])){
viewarg.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.tlname[id]+' ('+amster_OS.createsystemapps.simple_clicker.tlcount[id]+')</font></b><b><font color="green">\n'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.tlcost[id],amster_OS.createsystemapps.simple_clicker.tlcount[id]))+'</font></b>'))
}else{
viewarg.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.tlname[id]+' ('+amster_OS.createsystemapps.simple_clicker.tlcount[id]+')</font></b><b><font color="red">\n'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.tlcost[id],amster_OS.createsystemapps.simple_clicker.tlcount[id]))+'</font></b>'))
}
    }catch(e){print(e+". #"+e.lineNumber)}
  }
   }));
lay1.addView(telega);
}
var helpinfo = new Button(ctx);
 helpinfo.setGravity(Gravity.CENTER);   
helpinfo.setTextColor(Color.parseColor('#FFFFFF'));
    helpinfo.setTextSize(25);
helpinfo.setLayoutParams(new LayoutParams(UiWidth/2, UiHeight/8));
 helpinfo.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcoins)+'/sec</font></b>'))
helpinfo.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
lay2.addView(helpinfo);
for(var i in amster_OS.createsystemapps.simple_clicker.hpcost){
var helpers = new Button(ctx);
 helpers.setGravity(Gravity.CENTER);   
helpers.setTextColor(Color.parseColor('#FFFFFF'));
    helpers.setTextSize(15);
helpers.setId(i);
helpers.setLayoutParams(new LayoutParams(UiWidth/2, UiHeight/10));
    if(amster_OS.createsystemapps.simple_clicker.money>=amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.hpcost[i],amster_OS.createsystemapps.simple_clicker.hpcount[i])){
helpers.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.hpname[i]+' ('+amster_OS.createsystemapps.simple_clicker.hpcount[i]+')</font></b><b><font color="green">\n'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.hpcost[i],amster_OS.createsystemapps.simple_clicker.hpcount[i]))+'</font></b>'))
}else{
 helpers.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.hpname[i]+' ('+amster_OS.createsystemapps.simple_clicker.hpcount[i]+')</font></b><b><font color="red">\n'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.hpcost[i],amster_OS.createsystemapps.simple_clicker.hpcount[i]))+'</font></b>'))
}
helpers.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
helpers.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
   	try{
let id = viewarg.getId();
if(amster_OS.createsystemapps.simple_clicker.money>=amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.hpcost[id],amster_OS.createsystemapps.simple_clicker.hpcount[id])){
amster_OS.createsystemapps.simple_clicker.hpcount[id]++;
var oldcost = amster_OS.createsystemapps.simple_clicker.hpcost[id];
amster_OS.createsystemapps.simple_clicker.hpcost[id] = amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.hpcost[id],amster_OS.createsystemapps.simple_clicker.hpcount[id]);
amster_OS.createsystemapps.simple_clicker.getcoins=amster_OS.createsystemapps.simple_clicker.getcoins+amster_OS.createsystemapps.simple_clicker.hpres[id];
amster_OS.createsystemapps.simple_clicker.money=amster_OS.createsystemapps.simple_clicker.money-oldcost;
amster_OS.Data.setValue("getB",amster_OS.createsystemapps.simple_clicker.getcoins,amster_OS.my_root.getDir()[1]+"dats.txt")
amster_OS.Data.setValue("data3",amster_OS.createsystemapps.simple_clicker.hpcost,amster_OS.my_root.getDir()[1]+"dats.txt")
amster_OS.Data.setValue("data4",amster_OS.createsystemapps.simple_clicker.hpcount,amster_OS.my_root.getDir()[1]+"dats.txt")
}
if(amster_OS.createsystemapps.simple_clicker.money>=amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.hpcost[id],amster_OS.createsystemapps.simple_clicker.hpcount[id])){
viewarg.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.hpname[id]+' ('+amster_OS.createsystemapps.simple_clicker.hpcount[id]+')</font></b><b><font color="green">\n'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.hpcost[id],amster_OS.createsystemapps.simple_clicker.hpcount[id]))+'</font></b>'))
}else{
viewarg.setText(fromHtml('<b><font color="white">'+amster_OS.createsystemapps.simple_clicker.hpname[id]+' ('+amster_OS.createsystemapps.simple_clicker.hpcount[id]+')</font></b><b><font color="red">\n'+amster_OS.createsystemapps.simple_clicker.valueconverter(amster_OS.createsystemapps.simple_clicker.getcost(amster_OS.createsystemapps.simple_clicker.hpcost[id],amster_OS.createsystemapps.simple_clicker.hpcount[id]))+'</font></b>'))
}
    }catch(e){print(e+". #"+e.lineNumber)}
  }
   }));
lay2.addView(helpers);
}
}
createbtns();


var magaztimer = 120;
var tick = android.os.Handler();
var runb= new Runnable() {
   run() {
magaztimer--;
if(magaztimer<0){
createbtns();
magaztimer=120;
}
                                 tick.postDelayed(this, 1);
   }
};
tick.postDelayed(runb, 1);
  SHOPUI= new PopupWindow(lays, MCH_PNT, UiHeight/2);      
SHOPUI.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
SHOPUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            SHOPUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.BOTTOM,0, 0);
},
valueconverter: function(number){
let text = number;
if(number>=1000){
text=(Math.round(number/1000*100))/100+'K';
}
if(number>=1000000){
text=(Math.round(number/1000000*100))/100+'M';
}
if(number>=1000000000){
text=(Math.round(number/1000000000*100))/100+'B';
}
if(number>=1000000000000){
text=(Math.round(number/1000000000000*100))/100+'T';
}
if(number>=1000000000000000){
text="infinity";
}
return text;
},
getcost: function(cost,count){
let number = cost;
if(count==0){
number=cost;
}
if(count==1){
number=cost*1.4;
}
if(count>1){
number=cost*count;
}
return number;
},
settings_scene: function(){
var LayoutParams = LayoutParams;
var layout = new LinearLayout(ctx);
  layout.setOrientation(1);
 CLICKSETGUI = new PopupWindow(layout, MCH_PNT, MCH_PNT);
CLICKSETGUI.setBackgroundDrawable(amster_OS.createsystemapps.simple_clicker.getimgbg("settings"));  
 CLICKSETGUI.setAnimationStyle(animation);
 	CLICKSETGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
musicpanel: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);  
exitsetbtn.setTextColor(Color.parseColor('#FFFFFF'));
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(250), amster_OS.screen.dipSize(65)));
    exitsetbtn.setTextSize(30);
if(amster_OS.createsystemapps.simple_clicker.musicplaying==1){
exitsetbtn.setText(fromHtml('<b><font color="white">музыка</font></b><b><font color="green"> вкл</font></b>'))        
}else{
     exitsetbtn.setText(fromHtml('<b><font color="white">музыка</font></b><b><font color="red"> выкл</font></b>'))        
}        
exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(amster_OS.createsystemapps.simple_clicker.musicplaying==1){
amster_OS.createsystemapps.simple_clicker.musicplaying=0;
amster_OS.createsystemapps.simple_clicker.bg_player.pause();
amster_OS.createsystemapps.simple_clicker.bg_player.reset();
viewarg.setText(fromHtml('<b><font color="white">музыка</font></b><b><font color="red"> выкл</font></b>'))        
amster_OS.Data.setValue("parmusic",amster_OS.createsystemapps.simple_clicker.musicplaying,amster_OS.my_root.getDir()[1]+"dats.txt")
}else{
amster_OS.createsystemapps.simple_clicker.musicplaying=1;
amster_OS.createsystemapps.simple_clicker.bgmusic(amster_OS.fast_files.getFileFromZip(amster_OS.my_root.getDir()[1]+"res.aour", "bgmusic.mp3").getAbsolutePath());
viewarg.setText(fromHtml('<b><font color="white">музыка</font></b><b><font color="green"> вкл</font></b>'))        
amster_OS.Data.setValue("parmusic",amster_OS.createsystemapps.simple_clicker.musicplaying,amster_OS.my_root.getDir()[1]+"dats.txt")
}

}catch(e){print(e)}
   }}));
lays.addView(exitsetbtn);
  GUIMUSIC= new PopupWindow(lays, amster_OS.screen.dipSize(250), amster_OS.screen.dipSize(65));      
GUIMUSIC.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
           GUIMUSIC.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
opensettings: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);  
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(130), amster_OS.screen.dipSize(80)));
    exitsetbtn.setTextSize(60);
     exitsetbtn.setText('');   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.createsystemapps.simple_clicker.settings_scene();
amster_OS.createsystemapps.simple_clicker.musicpanel();
amster_OS.createsystemapps.simple_clicker.settingsexit();
}catch(e){print(e)}
   }}));
lays.addView(exitsetbtn);
  CLICKSETOPEN= new PopupWindow(lays, amster_OS.screen.dipSize(130), amster_OS.screen.dipSize(80));      
CLICKSETOPEN.setAnimationStyle(animation);
CLICKSETOPEN.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            CLICKSETOPEN.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.BOTTOM,0, 0);
},
settingsexit: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);  
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80)));
    exitsetbtn.setTextSize(60);
     exitsetbtn.setText('');   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
CLICKSETGUI.dismiss();
CLICKSETEXIT.dismiss();
GUIMUSIC.dismiss();
}catch(e){print(e)}
   }}));
lays.addView(exitsetbtn);
  CLICKSETEXIT= new PopupWindow(lays, amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80));      
CLICKSETEXIT.setAnimationStyle(animation);
CLICKSETEXIT.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            CLICKSETEXIT.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP,0, 0);
}
},
systembrowser:{
name:"Браузер",
version:"1.0",
labels:"none",
current:null,
urls:[],
pageid:0,
init: function (){
this.openPage("https://google.com/");
},

openPage: function(url){
amster_OS.createsystemapps.systembrowser.urls.push(url);
amster_OS.createsystemapps.systembrowser.current = url;

   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var lay = new LinearLayout(ctx);
  lay.setOrientation(0);
var scr = new android.widget.HorizontalScrollView(ctx);
scr.setHorizontalScrollBarEnabled(false)
scr.addView(lay);

var params = new LayoutParams(UiWidth/8, WR_CNT);
params.setMargins(5,1,1,5);
var bg = new GradientDrawable();
bg.setColor(Color.parseColor("#878787"));
bg.setCornerRadius(50);

function generate(){
lays.removeAllViews();
lay.removeAllViews();
lays.addView(scr);
for(var i in amster_OS.createsystemapps.systembrowser.urls){
var btnurl = new TextView(ctx);
btnurl.setGravity(Gravity.CENTER);
btnurl.setTextSize(12);
btnurl.setId(i);
btnurl.setMaxLines(1);
btnurl.setBackground(bg);
btnurl.setLayoutParams(params);
if(amster_OS.createsystemapps.systembrowser.pageid==i){
btnurl.setTextColor(Color.parseColor('#959595'));
btnurl.setText(fromHtml('<b><fontcolor="gray">'+amster_OS.createsystemapps.systembrowser.urls[i]+'</font></b>'));
}else{
btnurl.setTextColor(Color.parseColor('#ffffff'));
btnurl.setText(fromHtml('<b><fontcolor="white">'+amster_OS.createsystemapps.systembrowser.urls[i]+'</font></b>'));
}
btnurl.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
amster_OS.createsystemapps.systembrowser.current=amster_OS.createsystemapps.systembrowser.urls[v.getId()];
amster_OS.createsystemapps.systembrowser.pageid=v.getId();
generate();
   }}));
btnurl.setOnLongClickListener(function(v,t) {
ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(37);
amster_OS.createsystemapps.systembrowser.urls.splice(v.getId(),1);
generate();
return true;
				});
lay.addView(btnurl);
}
var btnexit = new TextView(ctx);
btnexit.setGravity(Gravity.CENTER);
btnexit.setTextSize(12);
btnexit.setBackground(bg);
btnexit.setLayoutParams(params);
btnexit.setText(fromHtml('<b><fontcolor="white">настройки</font></b>'));
btnexit.setTextColor(Color.parseColor('#ffffff'));
btnexit.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
try{
lays.removeAllViews();
lays.addView(scr);
genSertings();
}catch(e){print(e)}
   }}));
lay.addView(btnexit);
lays.addView(amster_OS.graphics.easyWebPage(amster_OS.createsystemapps.systembrowser.current))
}
function genSertings(){
var gradient = new GradientDrawable();
gradient.setColors([Color.parseColor(amster_OS.graphics.system_design.cl1),Color.parseColor(amster_OS.graphics.system_design.cl2)])
eval("gradient.setOrientation(GradientDrawable.Orientation."+amster_OS.graphics.system_design.gr+")");

var btnclear = new TextView(ctx);
btnclear.setGravity(Gravity.CENTER);
btnclear.setTextSize(20);
btnclear.setBackground(gradient);
btnclear.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btnclear.setText(fromHtml('<b><fontcolor="white">очистить историю</font></b>'));
btnclear.setTextColor(Color.parseColor('#ffffff'));
btnclear.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
amster_OS.createsystemapps.systembrowser.urls=[];
amster_OS.createsystemapps.systembrowser.urls.push(amster_OS.createsystemapps.systembrowser.current);
generate();
   }}));
lays.addView(btnclear);
var btnadd = new TextView(ctx);
btnadd.setGravity(Gravity.CENTER);
btnadd.setTextSize(20);
btnadd.setBackground(gradient);
btnadd.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btnadd.setText(fromHtml('<b><fontcolor="white">создать ярлык</font></b>'));
btnadd.setTextColor(Color.parseColor('#ffffff'));
btnadd.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
amster_OS.createsystemapps.systembrowser.setlink();
   }}));
lays.addView(btnadd);
var btnclise = new TextView(ctx);
btnclise.setGravity(Gravity.CENTER);
btnclise.setTextSize(20);
btnclise.setBackground(gradient);
btnclise.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btnclise.setText(fromHtml('<b><fontcolor="white">закрыть</font></b>'));
btnclise.setTextColor(Color.parseColor('#ffffff'));
btnclise.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
BRGUI.dismiss();
   }}));
lays.addView(btnclise);
}
generate();
  BRGUI= new PopupWindow(lays, MCH_PNT, MCH_PNT);      
BRGUI.setAnimationStyle(animation);
BRGUI.setBackgroundDrawable(new ColorDrawable(Color.WHITE));
            BRGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
setlink: function(){
var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var btn1 = new EditText(ctx);
 btn1.setGravity(Gravity.CENTER);  
 btn1.setTextColor(Color.parseColor("#ffffff"));
    btn1.setTextSize(15);
btn1.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btn1.setHintTextColor(Color.parseColor("#ffffff"));
btn1.setHint("введите ссылку...");
btn1.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
btn1.getBackground().mutate().setColorFilter(Color.parseColor("#878787"), android.graphics.PorterDuff.Mode.SRC_IN);
lays.addView(btn1);
var btn2 = new EditText(ctx);
 btn2.setGravity(Gravity.CENTER);  
 btn2.setTextColor(Color.parseColor("#ffffff"));
    btn2.setTextSize(15);
btn2.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btn2.setHintTextColor(Color.parseColor("#ffffff"));
btn2.setHint("введите имя...");
btn2.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
btn2.getBackground().mutate().setColorFilter(Color.parseColor("#878787"), android.graphics.PorterDuff.Mode.SRC_IN);
lays.addView(btn2);

var btnclise = new TextView(ctx);
btnclise.setGravity(Gravity.CENTER);
btnclise.setTextSize(20);
btnclise.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btnclise.setText(fromHtml('<b><fontcolor="white">добавить</font></b>'));
btnclise.setTextColor(Color.parseColor('#ffffff'));
btnclise.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
if(btn1.getText()!=""&&btn1.getText()!=null&&btn1.getText()!="введите ссылку..."&&btn2.getText()!=""&&btn2.getText()!=null&&btn2.getText()!="введите имя..."){
if(new File(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/links.amos").exists()){
amster_OS.fast_files.writeFile(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/links.amos",btn2.getText()+"|"+btn1.getText());
}
amster_OS.graphics.print("добавлено");
FGUI.dismiss();
}else{
amster_OS.graphics.print("ошибка добавления");
}
   }}));
lays.addView(btnclise);

FGUI= new PopupWindow(lays, UiWidth/6, WR_CNT);      
FGUI.setAnimationStyle(animations.toast);
FGUI.setFocusable(true);
FGUI.setBackgroundDrawable(new ColorDrawable(Color.BLACK));
FGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
}},
mpplayer : {
name:"MP3 Плеер",
zsearching:null,
main_player:new MediaPlayer(),
check:false,
version:"1.0",
labels:"none",
directory:null,
sortedtracks:[],
list:null,
init: function (){
this.startplayer(sdcard+"/Music/");
this.exitplayer();
},
startplayer: function (path){
amster_OS.createsystemapps.mpplayer.sortedtracks=[];
amster_OS.createsystemapps.mpplayer.directory=path;
amster_OS.createsystemapps.mpplayer.list=new File(amster_OS.createsystemapps.mpplayer.directory).list();

for(var i in amster_OS.createsystemapps.mpplayer.list){
if(new File(amster_OS.createsystemapps.mpplayer.directory+amster_OS.createsystemapps.mpplayer.list[i]).isFile()){
	if(amster_OS.createsystemapps.mpplayer.list[i].indexOf(".mp3")!=-1||amster_OS.createsystemapps.mpplayer.list[i].indexOf(".ogg")!=-1){
amster_OS.createsystemapps.mpplayer.sortedtracks.push(amster_OS.createsystemapps.mpplayer.list[i]);
}
}
}
amster_OS.createsystemapps.mpplayer.sortedtracks.sort();
this.mpplayers()
},
getbg: function (id){
if(id=="bg_nN"||id=="bg_nN2"||id=="bg_nN3"){
var bgc = new GradientDrawable();
bgc.setStroke(2, Color.parseColor('#000000'));
bgc.setColor(Color.parseColor('#111D3D'));
return bgc;
}
if(id=="bg_nN1"||id=="bg_nN4"||id=="bg_nN5"){
var bgc = new GradientDrawable();
bgc.setStroke(2, Color.parseColor('#000000'));
bgc.setColor(Color.parseColor('#3D4352'));
return bgc; 
}
},
getFastPlayer: function(onlypath){
if(onlypath!=null){
amster_OS.createsystemapps.mpplayer.sortedtracks=[];  
var trackid=0;
var filename = onlypath.substring(onlypath.lastIndexOf("/") + 1);
amster_OS.createsystemapps.mpplayer.directory = onlypath.replace(filename, "");
amster_OS.createsystemapps.mpplayer.list  =new File(amster_OS.createsystemapps.mpplayer.directory).list();
for(var i in amster_OS.createsystemapps.mpplayer.list){
if(new File(amster_OS.createsystemapps.mpplayer.directory+amster_OS.createsystemapps.mpplayer.list[i]).isFile()){
	if(amster_OS.createsystemapps.mpplayer.list[i].indexOf(".mp3")!=-1||amster_OS.createsystemapps.mpplayer.list[i].indexOf(".ogg")!=-1){
amster_OS.createsystemapps.mpplayer.sortedtracks.push(amster_OS.createsystemapps.mpplayer.list[i]);
}
}
if(new File(amster_OS.createsystemapps.mpplayer.directory+amster_OS.createsystemapps.mpplayer.list[i]).isFile()&&new File(amster_OS.createsystemapps.mpplayer.directory+amster_OS.createsystemapps.mpplayer.list[i]).getName()==filename){
amster_OS.createsystemapps.mpplayer.check=true;
amster_OS.createsystemapps.mpplayer.main_player.pause();
amster_OS.createsystemapps.mpplayer.main_player.reset();
amster_OS.createsystemapps.mpplayer.main_player.setDataSource(onlypath)
amster_OS.createsystemapps.mpplayer.main_player.prepare();
amster_OS.createsystemapps.mpplayer.main_player.start();
trackid=i;
}}
amster_OS.createsystemapps.mpplayer.sortedtracks.sort();
}
this.mpplayers();
amster_OS.createsystemapps.mpplayer.strokeinfo(filename,parseInt(trackid)+1);
this.exitplayer();
},
mpplayers: function(onlypath){

        	var lay = new LinearLayout(ctx);
  lay.setOrientation(1);
  var lay1=new GridLayout(ctx);
lay1.setColumnCount(2);
  var lay2=new LinearLayout(ctx);
  lay2.setOrientation(0);
  var menuScroll1 = new ScrollView(ctx);
  menuScroll1.addView(lay1);
  var button57 = new TextView(ctx);
 button57.setGravity(Gravity.LEFT);
    button57.setTextSize(25);
button57.setTextColor(Color.parseColor('#FFFFFF'));
      button57.setText((fromHtml('<b><font color="white">Музыкальный плеер</font></b>')));
    lay.addView(button57);


var button58 = new EditText(ctx);
 button58.setGravity(Gravity.CENTER);
    button58.setTextSize(20);
button58.setHintTextColor(Color.parseColor("#ffffff"));
button58.setTextColor(Color.parseColor("#ffffff"));
button58.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
button58.setHint("искать среди "+(amster_OS.createsystemapps.mpplayer.sortedtracks.length)+" песен");
button58.setMaxLines(1);  
button58.addTextChangedListener(new android.text.TextWatcher({
     afterTextChanged: function (text) {
  {
try{
var abiba = text+"";
var changedir = abiba.split(' ');
if(changedir[1]=="set"){
amster_OS.createsystemapps.mpplayer.directory = sdcard+changedir[0];
amster_OS.createsystemapps.mpplayer.list  =new File(amster_OS.createsystemapps.mpplayer.directory).list();
amster_OS.createsystemapps.mpplayer.sortedtracks=[];  
for(var i in amster_OS.createsystemapps.mpplayer.list){
if(new File(amster_OS.createsystemapps.mpplayer.directory+amster_OS.createsystemapps.mpplayer.list[i]).isFile()){
	if(amster_OS.createsystemapps.mpplayer.list[i].indexOf(".mp3")!=-1||amster_OS.createsystemapps.mpplayer.list[i].indexOf(".ogg")!=-1){
amster_OS.createsystemapps.mpplayer.sortedtracks.push(amster_OS.createsystemapps.mpplayer.list[i]);
}
}
}
amster_OS.createsystemapps.mpplayer.sortedtracks.sort();
button58.setHint("искать среди "+((amster_OS.createsystemapps.mpplayer.sortedtracks.length)-1)+" песен");
genarateBtn();
}else{
  	if(text == null){
lay1.removeAllViews();
amster_OS.createsystemapps.mpplayer.zsearching=null;
genarateBtn();
}else{
lay1.removeAllViews();
amster_OS.createsystemapps.mpplayer.zsearching=text;
genarateBtn(text);
}
}
RUF.setBackgroundDrawable(amster_OS.createsystemapps.mpplayer.getbg("bg_nN2")); 
}catch(e){print(e)}
    }
    }
    }));
    lay.addView(button58);
  lay.addView(menuScroll1);  

function genarateBtn(sss){
for(var i in amster_OS.createsystemapps.mpplayer.sortedtracks){

var button5 = new TextView(ctx);
 button5.setGravity(Gravity.CENTER);   button5.setTextColor(Color.parseColor('#FFFFFF'));
    button5.setBackground(amster_OS.createsystemapps.mpplayer.getbg("bg_nN4"));
button5.setMaxLines(2);  
    button5.setTextSize(14);
button5.setLayoutParams(new LayoutParams(UiWidth/2, UiHeight/10));
 var text = amster_OS.createsystemapps.mpplayer.sortedtracks[i].split("-");
var tect = amster_OS.createsystemapps.mpplayer.sortedtracks[i].replace(".mp3", "");
tect=tect.replace(".ogg", "");
var itog=tect.split("-");
if(itog[1]==null){
button5.setText(tect+"\nнеизвестный исполнитель");    
}else{
   button5.setText(itog[1]+"\n"+itog[0]);    
}
    button5.setId(i);
    button5.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
button5.setBackground(amster_OS.createsystemapps.mpplayer.getbg("bg_nN4"));
let ac = viewarg.getId();

amster_OS.createsystemapps.mpplayer.main_player.pause();
    amster_OS.createsystemapps.mpplayer.main_player.reset();
    amster_OS.createsystemapps.mpplayer.main_player.setDataSource(amster_OS.createsystemapps.mpplayer.directory+amster_OS.createsystemapps.mpplayer.sortedtracks[ac])
	amster_OS.createsystemapps.mpplayer.main_player.prepare();
	amster_OS.createsystemapps.mpplayer.main_player.start();
if(amster_OS.createsystemapps.mpplayer.check){
GTT.dismiss();
}else{
amster_OS.createsystemapps.mpplayer.check=true;
}
amster_OS.createsystemapps.mpplayer.strokeinfo(amster_OS.createsystemapps.mpplayer.sortedtracks[ac],(viewarg.getId())+1);

		   }catch(err){
print("An error occured: " + err + err.lineNumber);}
  }
   }));
if(!sss){
lay1.addView(button5);
    }else if(amster_OS.createsystemapps.mpplayer.sortedtracks[i].toLowerCase().indexOf(sss)!=-1){
lay1.addView(button5);
}
}
}
genarateBtn(amster_OS.createsystemapps.mpplayer.zsearching);
  RUF = new PopupWindow(lay, MCH_PNT, UiHeight/1);
            RUF.setBackgroundDrawable(amster_OS.createsystemapps.mpplayer.getbg("bg_nN2")); 
            RUF.setFocusable(true);
RUF.setAnimationStyle(animation);
            	RUF.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
milliSecToMinString: function(mSec) {
  let minutes = parseInt(((mSec / (1000*60)) % 60)).toString();
  let seconds = parseInt((mSec / 1000) % 60).toString();
  if(seconds >= 0 && seconds < 10) {
   seconds = "0" + seconds;
  }
  if(minutes < 0) {
   minutes = "0";
  }
  if(seconds < 0) {
   seconds = "00";
  }
  return minutes + ":" + seconds;
 },
 strokeinfo: function(pathu,idgg){
        	var lay = new LinearLayout(ctx);
        var lays = new LinearLayout(ctx);
        lays.setOrientation(1);
        lay.setOrientation(0);     
   var lay1 = new LinearLayout(ctx);
lay1.setOrientation(1);  

        
          var menuScroll1 = new ScrollView(ctx);
          var menuScroll2 = new ScrollView(ctx);
  menuScroll1.addView(lay);  
        lays.addView(menuScroll1);        

var button548 = new TextView(ctx);
 button548.setGravity(Gravity.CENTER);   button548.setTextColor(Color.parseColor('#FFFFFF'));
    button548.setBackground(amster_OS.createsystemapps.mpplayer.getbg("bg_nN4"));
    button548.setTextSize(19);
button548.setLayoutParams(new LayoutParams(UiWidth/12, UiHeight/9));
     button548.setText("♫");      
button548.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	
amster_OS.createsystemapps.mpplayer.main_player.pause();
    amster_OS.createsystemapps.mpplayer.main_player.reset();
    	GTT.dismiss();
amster_OS.createsystemapps.mpplayer.check=false;
  }
   }));
lay.addView(button548);
var button53 = new TextView(ctx);
 button53.setGravity(Gravity.CENTER);   button53.setTextColor(Color.parseColor('#FFFFFF'));
    button53.setBackground(amster_OS.createsystemapps.mpplayer.getbg("bg_nN4"));
    button53.setTextSize(19);
button53.setLayoutParams(new LayoutParams(UiWidth/12, UiHeight/9));
   
    button53.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    if(amster_OS.createsystemapps.mpplayer.main_player.isPlaying()){
button53.setText("▶");   
amster_OS.createsystemapps.mpplayer.main_player.pause();
}else{
button53.setText("| |");   
amster_OS.createsystemapps.mpplayer.main_player.start();
}
  }
   }));
    lay.addView(button53);    
     var btm1 = new TextView(ctx);
var text = pathu.split("-");
var tect = pathu.replace(".mp3", "");
tect=tect.replace(".ogg", "");
let name;
let author;
var itog=tect.split("-");
if(itog[1]==null){
name=tect;
author="неизвестный исполнитель";
}else{
name=itog[1];
author=itog[0];
}
btm1.setText((fromHtml('<b><font color="white">'+name+'</font></b>')));
btm1.setTextSize(20);      
btm1.setGravity(Gravity.CENTER);
btm1.setTextColor(Color.parseColor('#ffffff'));
btm1.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btm1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
   	try{
amster_OS.createsystemapps.mpplayer.trackinfo(pathu,idgg,button53);
    }catch(e){print(e+". #"+e.lineNumber)}
  }
   }));
lay1.addView(btm1)
var btm2 = new TextView(ctx);

btm2.setText((fromHtml('<b><font color="gray">'+author+'</font></b>')));
btm2.setTextSize(12);      
btm2.setGravity(Gravity.LEFT);
btm2.setTextColor(Color.parseColor('#ffffff'));
btm2.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btm2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    try{
	
amster_OS.createsystemapps.mpplayer.trackinfo(pathu,idgg);
}catch(e){print(e)}
  }
   }));
lay.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
amster_OS.createsystemapps.mpplayer.trackinfo(pathu,idgg);
}catch(e){print(e)}
  }
   }));
lay1.addView(btm2)

lay.addView(lay1);
var tick = android.os.Handler();
  var runb = new Runnable() {
   run() {
                                if(amster_OS.createsystemapps.mpplayer.main_player.isPlaying()){
  button53.setText("| |");   
}else{
button53.setText("▶");   
}
tick.postDelayed(this, 100);
   }
};
tick.postDelayed(runb, 100);



        GTT = new PopupWindow(lays, MCH_PNT, UiHeight/9);
         GTT.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
   GTT.setBackgroundDrawable(amster_OS.createsystemapps.mpplayer.getbg("bg_nN3")); 
            GTT.setAnimationStyle(animation);
            	GTT.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.BOTTOM, 0, 0);
},
exitplayer: function(){
            var layout = new LinearLayout(ctx);
            layout.setOrientation(1);
            
var exitsetbtn = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(50)));
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(amster_OS.createsystemapps.mpplayer.check){
GTT.dismiss();
}
amster_OS.createsystemapps.mpplayer.check=false;
RUF.dismiss();
JGUI.dismiss();

}catch(e){print(e)}
   }}));
exitsetbtn.setOnLongClickListener(new View.OnLongClickListener( {
onLongClick: function (v, t) {
amster_OS.createsystemapps.mpplayer.main_player.pause();
    amster_OS.createsystemapps.mpplayer.main_player.reset();
return true;
}
}));
layout.addView(exitsetbtn);
JGUI = new PopupWindow(layout, amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(50));
JGUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
 JGUI.setAnimationStyle(animation);
	JGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, 0);
},
trackinfo: function(pathu,idgg){
        	var lay = new LinearLayout(ctx);
        var lays = new LinearLayout(ctx);
    var layss = new LinearLayout(ctx);
        layss.setOrientation(0);
        lays.setOrientation(0);
        lay.setOrientation(1);     
var layn = new LinearLayout(ctx);
layn.setOrientation(0);  

   var text = pathu.split("-");
var tect = pathu.replace(".mp3", "");
tect=tect.replace(".ogg", "");
let name;
let author;
var itog=tect.split("-");
if(itog[1]==null){
name=tect;
author="неизвестный исполнитель";
}else{
name=itog[1];
author=itog[0];
}
        

var button548 = new TextView(ctx);
 button548.setGravity(Gravity.CENTER);   button548.setTextColor(Color.parseColor('#FFFFFF'));
    button548.setBackground(amster_OS.createsystemapps.mpplayer.getbg("bg_nN4"));
    button548.setTextSize(110);
button548.setLayoutParams(new LayoutParams(UiWidth/2, MCH_PNT));
     button548.setText("♫");      
button548.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	TTTC.dismiss();
  }
   }));
lays.addView(button548);
lays.addView(lay);        

var btn1 = new TextView(ctx);
 btn1.setGravity(Gravity.CENTER);   btn1.setTextColor(Color.parseColor('#FFFFFF'));
    btn1.setTextSize(25);
btn1.setLayoutParams(new LayoutParams(UiWidth/2, UiHeight/6));
btn1.setMaxLines(2);  
btn1.setText(fromHtml('<b><font color="white">'+name+'</font></b>'));   
   lay.addView(btn1);    
var btn2 = new TextView(ctx);
 btn2.setGravity(Gravity.CENTER);   btn2.setTextColor(Color.parseColor('#FFFFFF'));
    btn2.setTextSize(15);
btn2.setLayoutParams(new LayoutParams(UiWidth/2, UiHeight/12));
btn2.setMaxLines(1);  
btn2.setText(fromHtml('<b><font color="gray">'+author+'</font></b>'));   
   lay.addView(btn2);    

var filev = new File(amster_OS.createsystemapps.mpplayer.directory+pathu);
    var filev2= filev.length();
   
let text = [
'путь: '+amster_OS.createsystemapps.mpplayer.directory,
'играет трек #'+idgg+' из списка ',

'размер: '+amster_OS.fast_files.convertSize(filev2)+"("+filev2+" байт)",
'длительность: '+amster_OS.createsystemapps.mpplayer.milliSecToMinString(amster_OS.createsystemapps.mpplayer.main_player.getDuration())
];
for(var i in text){
var btn3 = new TextView(ctx);
 btn3.setGravity(Gravity.LEFT);   btn3.setTextColor(Color.parseColor('#FFFFFF'));
    btn3.setTextSize(11);
btn3.setText(fromHtml('<b><font color="white">'+text[i]+'</font></b>'));   
   lay.addView(btn3);    
     }
var btn33 = new TextView(ctx);
    btn33.setTextSize(10);
btn33.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(1), amster_OS.screen.dipSize(150)));
btn33.setText(" ");   
   lay.addView(btn33);    
        var musicsbp = new SeekBar(ctx);
    musicsbp.setMax(amster_OS.createsystemapps.mpplayer.main_player.getDuration());
    musicsbp.getThumb().setColorFilter(Color.WHITE, android.graphics.PorterDuff.Mode.SRC);
var bg = new GradientDrawable();
bg.setStroke(10, android.graphics.Color.parseColor('#ffffff'));
bg.setColor(android.graphics.Color.parseColor('#111D3D'));
 musicsbp.setProgressDrawable(bg);
   musicsbp.setProgress(amster_OS.createsystemapps.mpplayer.main_player.getCurrentPosition());
    musicsbp.getProgressDrawable().setColorFilter(Color.parseColor("#3D4352"), android.graphics.PorterDuff.Mode.SRC_IN);
    musicsbp.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
amster_OS.createsystemapps.mpplayer.main_player.seekTo(view.getProgress())
    }
    });
    lay.addView(musicsbp);

var button007 = new TextView(ctx);
 button007.setGravity(Gravity.LEFT);   button007.setTextColor(Color.parseColor('#ffffff'));
    button007.setTextSize(15);
button007.setLayoutParams(new LayoutParams(UiWidth/4, UiHeight/16));
     button007.setText(""+amster_OS.createsystemapps.mpplayer.milliSecToMinString(amster_OS.createsystemapps.mpplayer.main_player.getCurrentPosition()));         
    layn.addView(button007);

var button07 = new TextView(ctx);
 button07.setGravity(Gravity.RIGHT);   button07.setTextColor(Color.parseColor('#ffffff'));
    button07.setTextSize(15);
button07.setLayoutParams(new LayoutParams(UiWidth/4, UiHeight/16));
     button07.setText(""+amster_OS.createsystemapps.mpplayer.milliSecToMinString(amster_OS.createsystemapps.mpplayer.main_player.getDuration()))
layn.addView(button07);

lay.addView(layn);
        lay.addView(layss);
        

var btn22 = new TextView(ctx);
 btn22.setGravity(Gravity.CENTER);   btn22.setTextColor(Color.parseColor('#FFFFFF'));
    btn22.setBackground(amster_OS.createsystemapps.mpplayer.getbg("bg_nN4"));
    btn22.setTextSize(15);
btn22.setLayoutParams(new LayoutParams(UiWidth/6, UiHeight/9));
btn22.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
    	if(amster_OS.createsystemapps.mpplayer.main_player.isPlaying()){
btn22.setText("▶");   
amster_OS.createsystemapps.mpplayer.main_player.pause();
}else{
btn22.setText("| |");   
amster_OS.createsystemapps.mpplayer.main_player.start();
}
}catch(e){print(e)}
  }
   }));
layss.addView(btn22);
var btn11 = new TextView(ctx);
 btn11.setGravity(Gravity.CENTER);  
if(amster_OS.createsystemapps.mpplayer.main_player.isLooping()){
 btn11.setTextColor(Color.parseColor('#878787'));
}else{
 btn11.setTextColor(Color.parseColor('#FFFFFF'));
}
    btn11.setBackground(amster_OS.createsystemapps.mpplayer.getbg("bg_nN4"));
    btn11.setTextSize(15);
btn11.setLayoutParams(new LayoutParams(UiWidth/6, UiHeight/9));
     btn11.setText("⟲");      
btn11.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(amster_OS.createsystemapps.mpplayer.main_player.isLooping()){
amster_OS.createsystemapps.mpplayer.main_player.setLooping(false)
 btn11.setTextColor(Color.parseColor('#FFFFFF'));
}else{
amster_OS.createsystemapps.mpplayer.main_player.setLooping(true)
 btn11.setTextColor(Color.parseColor('#878787'));
}

    	}catch(e){print(e)}
  }
   }));
layss.addView(btn11);
var btn33 = new TextView(ctx);
 btn33.setGravity(Gravity.CENTER);   btn33.setTextColor(Color.parseColor('#FFFFFF'));
    btn33.setBackground(amster_OS.createsystemapps.mpplayer.getbg("bg_nN4"));
    btn33.setTextSize(15);
btn33.setLayoutParams(new LayoutParams(UiWidth/6, UiHeight/9));
     btn33.setText("копировать имя");      
btn33.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(amster_OS.createsystemapps.mpplayer.sortedtracks[idgg-1]);
amster_OS.graphics.print("скопировано "+amster_OS.createsystemapps.mpplayer.sortedtracks[idgg-1])
    	}catch(e){print(e)}

  }
   }));
layss.addView(btn33);
var tick = android.os.Handler();
var runb = new Runnable() {
   run() {
if(amster_OS.createsystemapps.mpplayer.main_player.isPlaying()){
  btn22.setText("| |");   
}else{
btn22.setText("▶");   
}
                                musicsbp.setProgress(amster_OS.createsystemapps.mpplayer.main_player.getCurrentPosition());
button07.setText(""+amster_OS.createsystemapps.mpplayer.milliSecToMinString(amster_OS.createsystemapps.mpplayer.main_player.getDuration()))
button007.setText(""+amster_OS.createsystemapps.mpplayer.milliSecToMinString(amster_OS.createsystemapps.mpplayer.main_player.getCurrentPosition()));         
tick.postDelayed(this, 100);
   }
};
tick.postDelayed(runb, 100);



        TTTC = new PopupWindow(lays, MCH_PNT, MCH_PNT);
           TTTC.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
 TTTC.setBackgroundDrawable(amster_OS.createsystemapps.mpplayer.getbg("bg_nN3")); 
            TTTC.setAnimationStyle(animation);
            	TTTC.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
}
},
mediaview:{
name:"Media Viewer",
version:"1.0",
labels:"none",
replay:false,
init: function (){
amster_OS.createsystemapps.mediaview.menu();
},
menu: function(path){
var lays = new LinearLayout(ctx);
lays.setOrientation(1);
amster_OS.graphics.print("Долгий  клик по изображению/видео закроет приложение");
if(path==null){
var btn = new amster_OS.graphics.easyButton("выбрать путь",[Gravity.CENTER,20]);
btn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.my_explorer.setdir("file",viewarg,[".mp4",".png",".jpg",".jpeg"]);
   }}));
lays.addView(btn);
var btn1 = new amster_OS.graphics.easyButton("открыть",[Gravity.CENTER,20]);
btn1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
viewfile(btn.getText().toString());
}catch(e){print(e)}
   }}));
lays.addView(btn1);
var btn2 = new amster_OS.graphics.easyButton("выйти",[Gravity.CENTER,20]);
btn2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
menu_ui.dismiss();
   }}));
lays.addView(btn2);
} else {
viewfile(path);
}
function viewfile(pth){
var file = new File(pth);
if(file.exists()){
lays.removeAllViews();
if(file.getName().endsWith(".mp4")){
var video = new android.widget.VideoView(ctx);
video.suspend();
video.stopPlayback();
video.setVideoPath(pth);
video.start();
video.requestFocus();
video.setLayoutParams(new LayoutParams(MCH_PNT, MCH_PNT));
video.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener({onCompletion: function(mp) {
     if(amster_OS.createsystemapps.mediaview.replay)video.start();
}}));
video.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
amster_OS.createsystemapps.mediaview.panel(video,"video");
}}));
video.setOnLongClickListener(new View.OnLongClickListener( {
onLongClick: function (v, t) {
print (video.getWidth()+"x"+video.getHeight());
menu_ui.dismiss();
return true;
}
}));
lays.addView(video);
}else{
var photo = new ImageView(ctx);
var bmp = BitmapFactory.decodeFile(file);
photo.setImageDrawable(new BitmapDrawable(bmp));
photo.setLayoutParams(new LayoutParams(MCH_PNT, MCH_PNT));
photo.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
amster_OS.createsystemapps.mediaview.panel(file,"photo");
}}));
photo.setOnLongClickListener(new View.OnLongClickListener( {
onLongClick: function (v, t) {
menu_ui.dismiss();
return true;
}
}));
lays.addView(photo);
}
}else{
amster_OS.graphics.print("некорректный файл");
}}
menu_ui= amster_OS.graphics.easyPopup(lays,new ColorDrawable(Color.BLACK));
},
panel: function(res,type){
var bg = new GradientDrawable();
bg.setColor(Color.parseColor('#00b2ff'));
bg.setAlpha(150);
bg.setCornerRadius(30);
var lays = new LinearLayout(ctx);
lays.setOrientation(0);
var time1 = new TextView(ctx);
var videobar = new SeekBar(ctx);
var time2 = new TextView(ctx);
if(type=="video"){
 time1.setGravity(Gravity.LEFT);   
time1.setTextColor(Color.parseColor('#ffffff'));
    time1.setTextSize(15);
lays.addView(time1);

    videobar.setMax(res.getDuration());
    videobar.getThumb().setColorFilter(Color.parseColor("#909090"), android.graphics.PorterDuff.Mode.SRC);
    videobar.setProgress(res.getCurrentPosition());
    videobar.getProgressDrawable().setColorFilter(Color.parseColor("#ffffff"), android.graphics.PorterDuff.Mode.SRC_IN);
  videobar.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
  videobar.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
res.seekTo(view.getProgress())
    }
    });
    lays.addView(videobar);

 time2.setGravity(Gravity.RIGHT);   
time2.setTextColor(Color.parseColor('#ffffff'));
    time2.setTextSize(15);
lays.addView(time2);
var pause = new TextView(ctx);
 pause.setGravity(Gravity.CENTER);   
pause.setTextColor(Color.parseColor('#ffffff'));
    pause.setTextSize(15);
if(res.isPlaying()){
pause.setText(" || ");   
}else{
pause.setText(" ▶ ");   
}
pause.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
if(res.isPlaying()){
v.setText(" ▶ ");   
res.pause();
}else{
v.setText(" || ");   
res.start();
}
   }}));
lays.addView(pause);
var rplbtn = new TextView(ctx);
if(amster_OS.createsystemapps.mediaview.replay){
rplbtn.setTextColor(Color.parseColor('#ffffff'));
}else{
rplbtn.setTextColor(Color.parseColor('#878787'));
}
    rplbtn.setTextSize(15);
     rplbtn.setText(" ⟳ ");   
rplbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
if(!amster_OS.createsystemapps.mediaview.replay){
rplbtn.setTextColor(Color.parseColor('#ffffff'));
amster_OS.createsystemapps.mediaview.replay=true;
}else{
amster_OS.createsystemapps.mediaview.replay=false;
rplbtn.setTextColor(Color.parseColor('#878787'));
}
   }}));
lays.addView(rplbtn);
}else{
var sizec = new TextView(ctx);
 sizec.setGravity(Gravity.CENTER);   
var bmp = BitmapFactory.decodeFile(res);
sizec.setText("размер: "+bmp.width+"x"+bmp.height+" вес: "+amster_OS.fast_files.convertSize(res.length())+" путь: "+res.getPath());   
sizec.setTextColor(Color.parseColor('#ffffff'));
sizec.setTextSize(15);
lays.addView(sizec);
}
var tick = android.os.Handler();
  runb = new Runnable() {
   run() {
   if(type=="video"){
time1.setText(''+amster_OS.createsystemapps.mpplayer.milliSecToMinString(res.getCurrentPosition()));   
time2.setText(''+amster_OS.createsystemapps.mpplayer.milliSecToMinString(res.getDuration()));   
videobar.setMax(res.getDuration());
 videobar.setProgress(res.getCurrentPosition());
}
tick.postDelayed(this, 100);
   }
};
tick.postDelayed(runb, 100);
paneluis= new PopupWindow(lays, MCH_PNT, WR_CNT);      
paneluis.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runb!=null){
tick.removeCallbacks(runb);
}
}}));
paneluis.setBackgroundDrawable(bg);
paneluis.setFocusable(true);
paneluis.setAnimationStyle(animations.toast);
paneluis.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.BOTTOM,0, 0);
}
},
notes : {
name:"Заметки",
version:"1.0",
labels:"none",
path:"",
init: function (){
amster_OS.createsystemapps.notes.path=amster_OS.my_root.getDir()[13]+"sys_notes/";
File(amster_OS.createsystemapps.notes.path).mkdirs();
amster_OS.createsystemapps.notes.menu();
},
menu: function(){
var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var lay1 = new LinearLayout(ctx);
  lay1.setOrientation(0);
var lay = new LinearLayout(ctx);
  lay.setOrientation(1);
var bg = new GradientDrawable();
bg.setColor(Color.parseColor("#00838f")); 
lay1.setBackgroundDrawable(bg);
var scr = new ScrollView(ctx);
scr.addView(lay);
lays.addView(lay1);
lays.addView(scr);
var exit = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
exit.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(40), amster_OS.screen.dipSize(40)));
exit.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
menu_ui.dismiss();
}}));
lay1.addView(exit);
var crtbtn = new TextView(ctx);
 crtbtn.setGravity(Gravity.CENTER); 
 crtbtn.setTextColor(Color.parseColor('#ffffff'));
crtbtn.setTextSize(20);
crtbtn.setText(fromHtml('<b><font color="#ffffff">создать</font></b>'))
crtbtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
amster_OS.createsystemapps.notes.create();
      } 
     })); 
lay1.addView(crtbtn)
var updbtn = new TextView(ctx);
 updbtn.setGravity(Gravity.CENTER); 
 updbtn.setTextColor(Color.parseColor('#ffffff'));
updbtn.setTextSize(20);
updbtn.setText(fromHtml('<b><font color="#ffffff">⟲</font></b>'))
updbtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
loadNotes(""+searchbtn.getText());
      } 
     })); 
lay1.addView(updbtn);

var searchbtn = new EditText(ctx);
 searchbtn.setGravity(Gravity.CENTER);  
 searchbtn.setTextColor(Color.parseColor("#ffffff"));
    searchbtn.setTextSize(15);
searchbtn.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
searchbtn.setHintTextColor(Color.parseColor("#ffffff"));
searchbtn.setHint("нажмите для поиска заметок...");
searchbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
searchbtn.getBackground().mutate().setColorFilter(Color.parseColor("#878787"), android.graphics.PorterDuff.Mode.SRC_IN);
searchbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.start_os.openedit(viewarg);
} catch(e){print(e)}
   }}));
lay1.addView(searchbtn);

function loadNotes(txt){
lay.removeAllViews();
var reg = new File(amster_OS.createsystemapps.notes.path).list();
for(var i in reg){
var file = new File(amster_OS.createsystemapps.notes.path+reg[i]);
if(file.getName().endsWith(".txt")){
var filebtn = new TextView(ctx);
 filebtn.setGravity(Gravity.CENTER); 
 filebtn.setTextColor(Color.parseColor('#ffffff'));
filebtn.setTextSize(15);
filebtn.setId(i);
var name = (""+file.getName()).replace(".txt","");
filebtn.setText(name);
filebtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(v){ 
try{
amster_OS.createsystemapps.notes.openNote(amster_OS.createsystemapps.notes.path+reg[v.getId()]);
}catch(e){print(e)}
      } 
     })); 
if(!txt||txt==" "||txt==""){
lay.addView(filebtn);
}else if(name.toLowerCase().indexOf(txt)!=-1){
lay.addView(filebtn);
}}}
}
loadNotes();
menu_ui= amster_OS.graphics.easyPopup(lays,new ColorDrawable(Color.parseColor("#202020")));
},
openNote: function(path){
var scsr = new ScrollView(ctx);
var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var lay = new LinearLayout(ctx);
  lay.setOrientation(1);
var lay1= new LinearLayout(ctx);
  lay1.setOrientation(0);
var bg = new GradientDrawable();
bg.setColor(Color.parseColor("#00838f")); 
lay1.setBackgroundDrawable(bg);
scsr.addView(lay);
lays.addView(lay1);
lays.addView(scsr);

var exit = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
exit.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(40), amster_OS.screen.dipSize(40)));
exit.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
note_ui.dismiss();
}}));
lay1.addView(exit);
var updbtn = new TextView(ctx);
 updbtn.setGravity(Gravity.CENTER); 
 updbtn.setTextColor(Color.parseColor('#ffffff'));
updbtn.setTextSize(20);
updbtn.setText(fromHtml('<b><font color="#ffffff">📄</font></b>'))
updbtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
var texts = notess.getText();
amster_OS.fast_files.writeFile(path,texts);
amster_OS.graphics.print("сохранено");
      } 
     })); 
lay1.addView(updbtn);
var delbtn = new TextView(ctx);
 delbtn.setGravity(Gravity.CENTER); 
 delbtn.setTextColor(Color.parseColor('#ffffff'));
delbtn.setTextSize(20);
delbtn.setText(fromHtml('<b><font color="#ffffff">🗑️</font></b>'))
delbtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
amster_OS.graphics.print("зажмите, чтобы удалить");
      } 
     })); 
delbtn.setOnLongClickListener(new View.OnLongClickListener( {
onLongClick: function (v, t) {
var file = new File(path);
file.delete();
amster_OS.graphics.print("удалено");
note_ui.dismiss();
return true;
}
}));
lay1.addView(delbtn);
var text = amster_OS.fast_files.readFile(path);

var notess = new EditText(ctx);
notess.setGravity(Gravity.LEFT);   
notess.setTextSize(15);
notess.setAllCaps(false);
notess.setInputType(1);   
notess.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
notess.setTextColor(Color.parseColor("#ffffff")); 
notess.setText(""+text);
notess.getBackground().mutate().setColorFilter(Color.TRANSPARENT, android.graphics.PorterDuff.Mode.SRC_IN);
lay.addView(notess)

note_ui = new PopupWindow(lays, MCH_PNT, MCH_PNT);
note_ui.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#202020"))); 
note_ui.setFocusable(true);
ctx.runOnUiThread(new Runnable({ run: function(){
note_ui.setAnimationStyle(animation);
note_ui.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
}}));
},
openblack: function (){
  BLACKPHONE= new amster_OS.graphics.black_back();
},
create: function(){
amster_OS.createsystemapps.notes.openblack();
var lays = new LinearLayout(ctx);
 lays.setOrientation(1);
var btnputh1 = new EditText(ctx);
 btnputh1.setGravity(Gravity.LEFT);  
 btnputh1.setTextColor(Color.parseColor("#ffffff"));
    btnputh1.setTextSize(15);
btnputh1.setText("имя");    
btnputh1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.start_os.openedit(viewarg);
} catch(e){print(e)}
   }}));
lays.addView(btnputh1);

var openfile = new TextView(ctx);
openfile.setGravity(Gravity.CENTER);   
openfile.setTextSize(15);
openfile.setAllCaps(false);
openfile.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#202020"))); 
openfile.setTextColor(Color.parseColor('#ffffff'));
openfile.setText("создать");
openfile.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
var path = amster_OS.createsystemapps.notes.path+btnputh1.getText()+".txt";
var file = new File(path);
if(!file.exists()){
file.createNewFile();
amster_OS.createsystemapps.notes.openNote(path);
}else{
amster_OS.graphics.print("Ошибка! Попробуйте другое имя.");
}
my_ui.dismiss();
BLACKPHONE.dismiss();
}catch(e){print(e)}
     }}));
lays.addView(openfile);
var closebtn = new TextView(ctx);
closebtn.setGravity(Gravity.CENTER);   
closebtn.setTextSize(15);
closebtn.setAllCaps(false);
closebtn.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#202020"))); 
closebtn.setTextColor(Color.parseColor('#ffffff'));
closebtn.setText("закрыть");
closebtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
my_ui.dismiss();
BLACKPHONE.dismiss();
}catch(e){print(e)}
     }}));
lays.addView(closebtn);
my_ui= new PopupWindow(lays, UiWidth/6, WR_CNT);      
my_ui.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#202020"))); 
my_ui.setAnimationStyle(animations.toast);
my_ui.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
}
},
settings:{
name:"Настройки",
version:"1.0",
labels:"none",
lastpage:0,
seetablebar:true,
seesystem:true,
seelinks:true,
seefiles:true,
seeprints:true,
seeuser:true,
alphabar:250,
path:null,
init: function (){
amster_OS.createsystemapps.settings.path = amster_OS.my_root.getDir()[13]+"settings/dats.txt";
File(amster_OS.my_root.getDir()[13]+"settings/").mkdirs();
var file = new File(amster_OS.createsystemapps.settings.path);
if(!file.exists()){
file.createNewFile();
}
this.settingui();
},
resetConfig: function(){
amster_OS.launcher.table_path="";
amster_OS.launcher.size=10;
amster_OS.launcher.padding=25;
amster_OS.launcher.maxlines=2;
amster_OS.launcher.colums=9;
amster_OS.createsystemapps.settings.seeprints=true;
amster_OS.graphics.colors=["#2aa8d8","#5296b3","#0e1122"];
amster_OS.graphics.system_design={cl1:"#1565c0",cl2:"#81d4fa",gr:GradientDrawable.Orientation.TL_BR};
amster_OS.graphics.print_design={size:15,cl:"#ffffff",cl2:"#000000",al:150,cor:50};
},
loadConfig: function(){
amster_OS.createsystemapps.settings.path = amster_OS.my_root.getDir()[13]+"settings/dats.txt";
var file = new File(amster_OS.createsystemapps.settings.path);
if(file.exists()){
if(amster_OS.Data.getValue("seetablebar",amster_OS.createsystemapps.settings.path)!=null){
var abs=amster_OS.Data.getValue("seetablebar",amster_OS.createsystemapps.settings.path);
if(abs=="true"){
amster_OS.createsystemapps.settings.seetablebar=true;
}else{
amster_OS.createsystemapps.settings.seetablebar=false;
}}
if(amster_OS.Data.getValue("seesystem",amster_OS.createsystemapps.settings.path)!=null){
var abs=amster_OS.Data.getValue("seesystem",amster_OS.createsystemapps.settings.path);
if(abs=="true"){
amster_OS.createsystemapps.settings.seesystem=true;
}else{
amster_OS.createsystemapps.settings.seesystem=false;
}}
if(amster_OS.Data.getValue("seelinks",amster_OS.createsystemapps.settings.path)!=null){
var abs=amster_OS.Data.getValue("seelinks",amster_OS.createsystemapps.settings.path);
if(abs=="true"){
amster_OS.createsystemapps.settings.seelinks=true;
}else{
amster_OS.createsystemapps.settings.seelinks=false;
}}

if(amster_OS.Data.getValue("seefiles",amster_OS.createsystemapps.settings.path)!=null){
var abs=amster_OS.Data.getValue("seefiles",amster_OS.createsystemapps.settings.path);
if(abs=="true"){
amster_OS.createsystemapps.settings.seefiles=true;
}else{
amster_OS.createsystemapps.settings.seefiles=false;
}}
if(amster_OS.Data.getValue("seeuser",amster_OS.createsystemapps.settings.path)!=null){
var abs=amster_OS.Data.getValue("seeuser",amster_OS.createsystemapps.settings.path);
if(abs=="true"){
amster_OS.createsystemapps.settings.seeuser=true;
}else{
amster_OS.createsystemapps.settings.seeuser=false;
}}
if(amster_OS.Data.getValue("alphabar",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.createsystemapps.settings.alphabar=parseInt(amster_OS.Data.getValue("alphabar",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("UiWidth",amster_OS.createsystemapps.settings.path)!=null){
UiWidth=parseInt(amster_OS.Data.getValue("UiWidth",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("UiHeight",amster_OS.createsystemapps.settings.path)!=null){
UiHeight=parseInt(amster_OS.Data.getValue("UiHeight",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("table_path",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.launcher.table_path=amster_OS.Data.getValue("table_path",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("colors1",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.colors[0]=amster_OS.Data.getValue("colors1",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("colors2",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.colors[1]=amster_OS.Data.getValue("colors2",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("colors3",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.colors[2]=amster_OS.Data.getValue("colors3",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("cl1",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.system_design.cl1=amster_OS.Data.getValue("cl1",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("cl2",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.system_design.cl2=amster_OS.Data.getValue("cl2",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("gr",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.system_design.gr=amster_OS.Data.getValue("gr",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("cr1",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.print_design.cl=amster_OS.Data.getValue("cr1",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("cr2",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.print_design.cl2=amster_OS.Data.getValue("cr2",amster_OS.createsystemapps.settings.path);
}
if(amster_OS.Data.getValue("size",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.print_design.size=parseInt(amster_OS.Data.getValue("size",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("al",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.print_design.al=parseInt(amster_OS.Data.getValue("al",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("seeprints",amster_OS.createsystemapps.settings.path)!=null){
var abs=amster_OS.Data.getValue("seeprints",amster_OS.createsystemapps.settings.path);
if(abs=="true"){
amster_OS.createsystemapps.settings.seeprints=true;
}else{
amster_OS.createsystemapps.settings.seeprints=false;
}}
if(amster_OS.Data.getValue("cor",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.graphics.print_design.cor=parseInt(amster_OS.Data.getValue("cor",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("colums",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.launcher.colums=parseInt(amster_OS.Data.getValue("colums",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("launcherlines",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.launcher.maxlines=parseInt(amster_OS.Data.getValue("launcherlines",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("launcherpadding",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.launcher.padding=parseInt(amster_OS.Data.getValue("launcherpadding",amster_OS.createsystemapps.settings.path));
}
if(amster_OS.Data.getValue("launchersize",amster_OS.createsystemapps.settings.path)!=null){
amster_OS.launcher.size=parseInt(amster_OS.Data.getValue("launchersize",amster_OS.createsystemapps.settings.path));
}
}
},
settingui: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);

var lay1 = new LinearLayout(ctx);
  lay1.setOrientation(0);
var lay2 = new LinearLayout(ctx);
  lay2.setOrientation(0);
var layl1 = new LinearLayout(ctx);//разделЫ(инфо,рабочий стол)
  layl1.setOrientation(1);
var layl2 = new LinearLayout(ctx);//менюшки с настройками
  layl2.setOrientation(1);
layl2.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
var scrl1 = new ScrollView(ctx);
scrl1.setVerticalScrollBarEnabled(false)
var scrl2 = new ScrollView(ctx);
scrl2.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
scrl2.setVerticalScrollBarEnabled(false)
scrl1.addView(layl1);
scrl2.addView(layl2);
lay2.addView(scrl1);
lay2.addView(scrl2);
lays.addView(lay1);
lays.addView(lay2);

var params = new LayoutParams(UiWidth/6, amster_OS.screen.dipSize(50));
params.setMargins(10,1,1,10);

var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);   //exitsetbtn.setTextColor(Color.parseColor('#000000'));
exitsetbtn.setLayoutParams(params);
    exitsetbtn.setTextSize(15);
exitsetbtn.setAllCaps(false);
exitsetbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
     exitsetbtn.setText(fromHtml('<font color="#ffffff"><b>выход</b></font>'));   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
SETGUI.dismiss();
   }}));
lay1.addView(exitsetbtn);
var namebtn = new Button(ctx);
 namebtn.setGravity(Gravity.CENTER);   namebtn.setTextColor(Color.parseColor('#ffffff'));
namebtn.setLayoutParams(new LayoutParams(MCH_PNT, amster_OS.screen.dipSize(50)));
    namebtn.setTextSize(23);
namebtn.setAllCaps(false);
namebtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
     namebtn.setText(fromHtml('<font color="#ffffff"><b>настройки</b></font>'));   
lay1.addView(namebtn);

var pages = ["информация","язык","рабочий стол","приложения","пользователь","экран","память","библиотеки","персонализация"];
var savewidgets = [];
for(var i in pages){
var razdelbtn = new TextView(ctx);
savewidgets.push(razdelbtn);
 razdelbtn.setGravity(Gravity.LEFT);   
razdelbtn.setTextColor(Color.parseColor('#ffffff'));
    razdelbtn.setTextSize(15);
razdelbtn.setId(i);
razdelbtn.setLayoutParams(params);
     razdelbtn.setText(pages[i]);   
    razdelbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
for(var a in savewidgets)savewidgets[a].setTextColor(Color.parseColor('#ffffff'));
viewarg.setTextColor(Color.parseColor('#878787'));
amster_OS.createsystemapps.settings.lastpage=viewarg.getId();
genSet(amster_OS.createsystemapps.settings.lastpage);
}catch(e){print (e+e.lineNumber)}
   }}));
layl1.addView(razdelbtn);
}
function genSet(id){
layl2.removeAllViews();
var zagbtn = new Button(ctx);
 zagbtn.setGravity(Gravity.CENTER);   zagbtn.setTextColor(Color.parseColor('#878787'));
    zagbtn.setTextSize(15);
zagbtn.setAllCaps(false);
zagbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
zagbtn.setText(pages[id]);   
layl2.addView(zagbtn);
switch (id){
case 0:
let OS = android.os.Build,sys = java.lang.System;
var btn1 = new amster_OS.graphics.easyButton("Информация об устройстве:",[Gravity.LEFT,15]);
btn1.setText(fromHtml('<b><font color="#ffffff">Информация об устройстве:</font><b>'));   
layl2.addView(btn1);
var btn2 = new amster_OS.graphics.easyButton("Модель: "+OS.MODEL,[Gravity.LEFT,10]);
layl2.addView(btn2);
var btn3 = new amster_OS.graphics.easyButton("Хост: "+OS.HOST,[Gravity.LEFT,10]);
layl2.addView(btn3);
var btn4 = new amster_OS.graphics.easyButton("Сборка: "+OS.ID,[Gravity.LEFT,10]);
layl2.addView(btn4);
var btn5 = new amster_OS.graphics.easyButton("Производитель: "+OS.MANUFACTURER,[Gravity.LEFT,10]);
layl2.addView(btn5);
var btn6 = new amster_OS.graphics.easyButton("Бренд: "+OS.BRAND,[Gravity.LEFT,10]);
layl2.addView(btn6);
var btn7 = new amster_OS.graphics.easyButton("Теги: "+OS.TAGS,[Gravity.LEFT,10]);
layl2.addView(btn7);
var btn8 = new amster_OS.graphics.easyButton("Имя устройства: "+OS.DEVICE,[Gravity.LEFT,10]);
layl2.addView(btn8);
var btn9 = new amster_OS.graphics.easyButton("Язык: "+java.util.Locale.getDefault().getLanguage(),[Gravity.LEFT,10]);
layl2.addView(btn9);
var btn10 = new amster_OS.graphics.easyButton("Разрешение: "+UiWidth+"x"+UiHeight,[Gravity.LEFT,10]);
layl2.addView(btn10);
var btn11 = new amster_OS.graphics.easyButton("Ядро: "+sys.getProperty("os.version"),[Gravity.LEFT,10]);
layl2.addView(btn11);

var btnd = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
layl2.addView(btnd);

var bts1 = new amster_OS.graphics.easyButton("Информация о системе:",[Gravity.LEFT,15]);
bts1.setText(fromHtml('<b><font color="#ffffff">Информация о системе:</font><b>'));   
layl2.addView(bts1);
var bts2 = new amster_OS.graphics.easyButton("Название: "+amster_OS.Info.getName(),[Gravity.LEFT,10]);
layl2.addView(bts2);
var bts3 = new amster_OS.graphics.easyButton("Версия: "+amster_OS.Info.getVersion(),[Gravity.LEFT,10]);
layl2.addView(bts3);
var bts3 = new amster_OS.graphics.easyButton("Пользователи: "+amster_OS.Info.getUsers(),[Gravity.LEFT,10]);
layl2.addView(bts3);
var bts4 = new amster_OS.graphics.easyButton("Всего пользователей: "+amster_OS.Info.getUsersCount(),[Gravity.LEFT,10]);
layl2.addView(bts4);
var bts5 = new amster_OS.graphics.easyButton("Текущий пользователь: "+amster_OS.my_root.current_user,[Gravity.LEFT,10]);
layl2.addView(bts5);

var btnr = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
layl2.addView(btnr);

var btr1 = new amster_OS.graphics.easyButton("Контакты с разработчиком:",[Gravity.LEFT,15]);
btr1.setText(fromHtml('<b><font color="#ffffff">Контакты с разработчиком:</font><b>'));   
layl2.addView(btr1);
var btr2 = new amster_OS.graphics.easyLink("Telegram","https://t.me/smirnoff_dmi",10);
layl2.addView(btr2);
var btr3 = new amster_OS.graphics.easyLink("Vk","https://vk.com/idkomandavk",10);
layl2.addView(btr3);
var btr4 = new amster_OS.graphics.easyLink("Tg channel","https://t.me/amstercheats",10);
layl2.addView(btr4);
var btr5 = new amster_OS.graphics.easyButton("By Amstercheats(smartman) 2022-2024",[Gravity.LEFT,10]);
btr5.setText(fromHtml('<b><font color="#00ff00">By Amstercheats(smartman) 2022-2024</font><b>'));   
layl2.addView(btr5);
break;
case 1:
var langs = ['English', 'Español', 'Português', 'Français', 'Deutsch', 'Italiano', 'Русский', '日本語', '中文', '한국어', 'हिन्दी', 'العربية', 'Türkçe', 'اردو', 'Bahasa Indonesia', 'Nederlands', 'Svenska', 'Polski', 'Magyar', 'Čeština'];

function generateLang(text){
var lar = new LinearLayout(ctx);
lar.setOrientation(0);
layl2.removeAllViews();
var btnk1 = new amster_OS.graphics.easyEdit("поиск из "+(langs.length)+" языков",15);
lar.addView(btnk1);
var btnk2 = new amster_OS.graphics.easyButton(" ⟲",[Gravity.RIGHT,15]);
btnk2.setText(fromHtml('<b><font color="#00ff00"> ⟲</font><b>'));   
btnk2.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
try{
generateLang(btnk1.getText().toString());
}catch(e){print(e+e.lineNumber)}
}}));
lar.addView(btnk2);
layl2.addView(lar);

for(var i in langs){
var bts1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
bts1.setText(fromHtml('<b><font color="#ffffff">'+langs[i]+'</font><b>'));   
if(!text||text==""||text==" "||text=="\n"){
layl2.addView(bts1);
}else if(langs[i].toLowerCase().indexOf(text)!=-1){
layl2.addView(bts1);
}
}
}

generateLang();
break;
case 2:
var btn2 = new amster_OS.graphics.easyToggle("показывать навигационную панель", amster_OS.createsystemapps.settings.seetablebar);
btn2.setOnClickListener(new View.OnClickListener({
    onClick: function(viewarg){
      if(!amster_OS.createsystemapps.settings.seetablebar){
    amster_OS.createsystemapps.settings.seetablebar = true;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
    }else{
    amster_OS.createsystemapps.settings.seetablebar = false;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
   }
amster_OS.Data.setValue("seetablebar",amster_OS.createsystemapps.settings.seetablebar,amster_OS.createsystemapps.settings.path);
viewarg.setChecked(amster_OS.createsystemapps.settings.seetablebar);
    }
    }));
layl2.addView(btn2);
var btn1 = new amster_OS.graphics.easyButton("прозрачность панели: "+amster_OS.createsystemapps.settings.alphabar,[Gravity.LEFT,10]);
layl2.addView(btn1);
var btn3 = new amster_OS.graphics.easyBar([255, amster_OS.createsystemapps.settings.alphabar]);
btn3.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    amster_OS.createsystemapps.settings.alphabar=view.getProgress();
    btn1.setText("прозрачность: "+amster_OS.createsystemapps.settings.alphabar);
amster_OS.Data.setValue("alphabar",amster_OS.createsystemapps.settings.alphabar,amster_OS.createsystemapps.settings.path);
    }
    });
layl2.addView(btn3);
var btn7 = new amster_OS.graphics.easyToggle("показывать системные приложения", amster_OS.createsystemapps.settings.seesystem);
btn7.setOnClickListener(new View.OnClickListener({
    onClick: function(viewarg){
      if(!amster_OS.createsystemapps.settings.seesystem){
    amster_OS.createsystemapps.settings.seesystem = true;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
    }else{
    amster_OS.createsystemapps.settings.seesystem = false;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
   }
amster_OS.Data.setValue("seesystem",amster_OS.createsystemapps.settings.seesystem,amster_OS.createsystemapps.settings.path);
viewarg.setChecked(amster_OS.createsystemapps.settings.seesystem);
    }
    }));
layl2.addView(btn7);
var btn8 = new amster_OS.graphics.easyToggle("показывать пользовательские приложения", amster_OS.createsystemapps.settings.seeuser);
btn8.setOnClickListener(new View.OnClickListener({
    onClick: function(viewarg){
      if(!amster_OS.createsystemapps.settings.seeuser){
    amster_OS.createsystemapps.settings.seeuser = true;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
    }else{
    amster_OS.createsystemapps.settings.seeuser = false;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
   }
amster_OS.Data.setValue("seeuser",amster_OS.createsystemapps.settings.seeuser,amster_OS.createsystemapps.settings.path);
viewarg.setChecked(amster_OS.createsystemapps.settings.seeuser);
    }
    }));
layl2.addView(btn8);
var btj1 = new amster_OS.graphics.easyToggle("показывать ссылки", amster_OS.createsystemapps.settings.seelinks);
btj1.setOnClickListener(new View.OnClickListener({
    onClick: function(viewarg){
      if(!amster_OS.createsystemapps.settings.seelinks){
    amster_OS.createsystemapps.settings.seelinks = true;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
    }else{
    amster_OS.createsystemapps.settings.seelinks = false;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
   }
amster_OS.Data.setValue("seelinks",amster_OS.createsystemapps.settings.seelinks,amster_OS.createsystemapps.settings.path);
viewarg.setChecked(amster_OS.createsystemapps.settings.seelinks);
    }
    }));
layl2.addView(btj1);
var btj2 = new amster_OS.graphics.easyToggle("показывать файлы", amster_OS.createsystemapps.settings.seefiles);
btj2.setOnClickListener(new View.OnClickListener({
    onClick: function(viewarg){
      if(!amster_OS.createsystemapps.settings.seefiles){
    amster_OS.createsystemapps.settings.seefiles = true;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
    }else{
    amster_OS.createsystemapps.settings.seefiles = false;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
   }
amster_OS.Data.setValue("seefiles",amster_OS.createsystemapps.settings.seefiles,amster_OS.createsystemapps.settings.path);
viewarg.setChecked(amster_OS.createsystemapps.settings.seefiles);
    }
    }));
layl2.addView(btj2);
var btn6 = new amster_OS.graphics.easyButton("обои (png или zip)",[Gravity.LEFT,10]);
layl2.addView(btn6);
var btn5c = new amster_OS.graphics.easyButton(amster_OS.launcher.table_path,[Gravity.LEFT,10]);
btn5c.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.my_explorer.setdir("file",viewarg,[".zip",".7z",".png",".jpg"]);
   }}));
layl2.addView(btn5c);
var btn9 = new amster_OS.graphics.easyButton("вернуть навигационную панель",[Gravity.CENTER,15]);
btn9.setText(fromHtml('<b><font color="#ffffff">обновить навигационную панель</font><b>'));   
btn9.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
if(OSGUI){
OSGUI.dismiss();
OSGUI=null;
amster_OS.launcher.bar.init();
}else{
amster_OS.launcher.bar.init();
}
   }}));
layl2.addView(btn9);

var btr1 = new amster_OS.graphics.easyButton("размер текста приложений: "+amster_OS.launcher.size,[Gravity.LEFT,10]);
layl2.addView(btr1);
var btr2 = new amster_OS.graphics.easyBar([30, amster_OS.launcher.size]);
btr2.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    amster_OS.launcher.size=view.getProgress();
    btr1.setText("размер текста приложений: "+amster_OS.launcher.size);
amster_OS.Data.setValue("launchersize",amster_OS.launcher.size,amster_OS.createsystemapps.settings.path);
    }
    });
layl2.addView(btr2);

var btr3 = new amster_OS.graphics.easyButton("отступ: "+amster_OS.launcher.padding,[Gravity.LEFT,10]);
layl2.addView(btr3);
var btr4 = new amster_OS.graphics.easyBar([50, amster_OS.launcher.padding]);
btr4.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    amster_OS.launcher.padding=view.getProgress();
    btr3.setText("отступ: "+amster_OS.launcher.padding);
amster_OS.Data.setValue("launcherpadding",amster_OS.launcher.padding,amster_OS.createsystemapps.settings.path);
    }
    });
layl2.addView(btr4);

var btr5 = new amster_OS.graphics.easyButton("линий текста: "+amster_OS.launcher.maxlines,[Gravity.LEFT,10]);
layl2.addView(btr5);
var btr6 = new amster_OS.graphics.easyBar([4, amster_OS.launcher.maxlines]);
btr6.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    amster_OS.launcher.maxlines=view.getProgress();
    btr5.setText("линий текста: "+amster_OS.launcher.maxlines);
amster_OS.Data.setValue("launcherlines",amster_OS.launcher.maxlines,amster_OS.createsystemapps.settings.path);
    }
    });
layl2.addView(btr6);

var btr7 = new amster_OS.graphics.easyButton("столбиков: "+amster_OS.launcher.colums,[Gravity.LEFT,10]);
layl2.addView(btr7);
var btr8 = new amster_OS.graphics.easyBar([15, amster_OS.launcher.colums]);
btr8.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    amster_OS.launcher.colums=view.getProgress();
    btr7.setText("столбиков: "+amster_OS.launcher.colums);
amster_OS.Data.setValue("colums",amster_OS.launcher.colums,amster_OS.createsystemapps.settings.path);
    }
    });
layl2.addView(btr8);

var btn10 = new amster_OS.graphics.easyButton("сохранить изменения",[Gravity.CENTER,15]);
btn10.setText(fromHtml('<b><font color="#ffffff">сохранить изменения</font><b>'));   
btn10.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.launcher.table_path=btn5c.getText();
amster_OS.Data.setValue("table_path",amster_OS.launcher.table_path,amster_OS.createsystemapps.settings.path);
amster_OS.graphics.print("Сохранено. Изменения вступят в силу после перезапуска.");
   }}));
layl2.addView(btn10);
break;
case 3:
function getBtn(name){
layl2.removeAllViews();
var sys_apps = amster_OS.Info.getsystemapps();
var apppth = amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/userapps/";
var lista = new File(apppth).list();
var lar = new LinearLayout(ctx);
lar.setOrientation(0);
var btnk1 = new amster_OS.graphics.easyEdit("поиск из "+(sys_apps.length+lista.length)+" приложений",15);
lar.addView(btnk1);
var btnk2 = new amster_OS.graphics.easyButton(" ⟲",[Gravity.RIGHT,15]);
btnk2.setText(fromHtml('<b><font color="#00ff00"> ⟲</font><b>'));   
btnk2.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
try{
getBtn(btnk1.getText().toString());
}catch(e){print(e+e.lineNumber)}
}}));
lar.addView(btnk2);
layl2.addView(lar);
var bts2 = new amster_OS.graphics.easyButton("Системные ",[Gravity.LEFT,10]);
layl2.addView(bts2);
for(var u in sys_apps){
var btnx1 = new amster_OS.graphics.easyButton("loading",[Gravity.LEFT,15]);
btnx1.setText(fromHtml('<b><font color="#ffffff">'+sys_apps[u].name+'</font><font color="'+amster_OS.graphics.colors[0]+'"> V'+sys_apps[u].version+'</font><u><font color="#878787"> lb '+sys_apps[u].labels+'</font><u><b>'));   
if(!name){
layl2.addView(btnx1);
}else if(sys_apps[u].name.toLowerCase().indexOf(name)!=-1){
layl2.addView(btnx1);
}}
var bts3= new amster_OS.graphics.easyButton("Пользовательские ",[Gravity.LEFT,10]);
layl2.addView(bts3);
for(var u in lista){
var lau = new LinearLayout(ctx);
lau.setOrientation(0);
var btnx2 = new amster_OS.graphics.easyButton("loading",[Gravity.LEFT,15]);
btnx2.setText(fromHtml('<b><font color="#ffffff">'+(amster_OS.userapps.getInfoByProject(lista[u]).Name).toString()+'</font><font color="'+amster_OS.graphics.colors[0]+'"> V'+(amster_OS.userapps.getInfoByProject(lista[u]).Version).toString()+'</font><u><font color="#878787"> lb '+(amster_OS.userapps.getInfoByProject(lista[u]).Labels).toString()+'</font><u><font color="#00ff00"> '+amster_OS.fast_files.convertSize(new File(apppth+lista[u]).length())+'</font><b>'));   
lau.addView(btnx2);

var btnx3 = new amster_OS.graphics.easyButton("loading",[Gravity.RIGHT,15]);
btnx3.setId(u);
btnx3.setText(fromHtml('<b><font color="#ff0000">⌫</font><b>'));   
btnx3.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
btnx3.setOnClickListener(new View.OnClickListener({ onClick: function(v) {        
try{
var file = new File(apppth+lista[v.getId()]);
amster_OS.graphics.print("удалено: "+(amster_OS.userapps.getInfoByProject(lista[v.getId()]).Name).toString());
file.delete();
getBtn();
}catch(e){print(e+e.lineNumber)}
}}));
lau.addView(btnx3);
if(!name){
layl2.addView(lau);
}else if((amster_OS.userapps.getInfoByProject(lista[u]).Name).toString().toLowerCase().indexOf(name)!=-1){
layl2.addView(lau);
}}}
getBtn();

break;
case 4:
var btn1 = new amster_OS.graphics.easyButton("loading",[Gravity.CENTER,15]);
btn1.setText(fromHtml('<b><font color="#ffffff">'+amster_OS.my_root.current_user+ '</font><b>'));
layl2.addView(btn1);
var text = amster_OS.fast_files.readFile(amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos");
var search = ["name","password","country","gender","date"];
var data = ["логин","пароль","страна","пол","день рождения"];
var buttons = [];
for(var a in data){
var btn2 = new amster_OS.graphics.easyButton("loading",[Gravity.LEFT,20]);
buttons.push(btn2);
btn2.setText(fromHtml('<b><font color="#ffffff">'+data[a]+':</font><font color="#'+amster_OS.graphics.colors[0]+'">'+amster_OS.Text.findStringByKey(search[a],text)+'</font><b>'));
btn2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.start_os.openedit(viewarg,viewarg.getText());
   }}));
layl2.addView(btn2);
}
var btn3 = new amster_OS.graphics.easyButton("сохранить изменения",[Gravity.CENTER,15]);
btn3.setText(fromHtml('<b><font color="#ffffff">сохранить изменения</font><b>'));   
btn3.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
var path = amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos";
for(var o in search){
var value = (""+buttons[o].getText()).split(":");
amster_OS.Data.setValue(search[o],value[1],path);
}
amster_OS.graphics.print("Сохранено. Изменения вступят в силу после перезапуска.");
   }}));
layl2.addView(btn3);
break;
case 5:
var display = ctx.getWindowManager().getDefaultDisplay();
var disp = ctx.getResources().getDisplayMetrics();

var point = android.graphics.Point;
var size = new point();
display.getRealSize(size);

var btn0 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
btn0.setText(fromHtml('<b><font color="#ffffff">Размер: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+size.x+'x'+size.y+'</font><b>'));   
layl2.addView(btn0);

var btn1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
btn1.setText(fromHtml('<b><font color="#ffffff">Размер окна: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+display.getWidth()+'x'+display.getHeight()+'</font><b>'));   
layl2.addView(btn1);

var btn2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
btn2.setText(fromHtml('<b><font color="#ffffff">Частота обновления </font><font color="'+amster_OS.graphics.colors[0]+'"> '+display.getRefreshRate()+'</font><b>'));   
layl2.addView(btn2);
var btn3 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
btn3.setText(fromHtml('<b><font color="#ffffff">Плотность пикселей </font><font color="'+amster_OS.graphics.colors[0]+'"> '+disp.density+'</font><b>'));   
layl2.addView(btn3);
var btn4 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
var msh = disp.widthPixels/disp.heightPixels;
btn4.setText(fromHtml('<b><font color="#ffffff">Соотношение </font><font color="'+amster_OS.graphics.colors[0]+'"> '+msh.toFixed(2)+'</font><b>'));   
layl2.addView(btn4);
var btn5 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
btn5.setText(fromHtml('<b><font color="#ffffff">X DPI </font><font color="'+amster_OS.graphics.colors[0]+'"> '+disp.xdpi+'</font><b>'));   
layl2.addView(btn5);
var btn6 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
btn6.setText(fromHtml('<b><font color="#ffffff">Y DPI </font><font color="'+amster_OS.graphics.colors[0]+'"> '+disp.ydpi+'</font><b>'));   
layl2.addView(btn6);
var space2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
layl2.addView(space2);
var btns1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
btns1.setText(fromHtml('<b><font color="#ffffff">Системный размер <br/>Высота: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+UiWidth+'</font><font color="#ffffff"><br/>Ширина: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+UiHeight+'</font><b>'));   
layl2.addView(btns1);
var btns2 = new amster_OS.graphics.easyBar([ctx.getWindowManager().getDefaultDisplay().getWidth(), UiWidth]);
btns2.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    UiWidth=view.getProgress();
btns1.setText(fromHtml('<b><font color="#ffffff">Системный размер <br/>Высота: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+UiWidth+'</font><font color="#ffffff"><br/>Ширина: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+UiHeight+'</font><b>'));   
amster_OS.Data.setValue("UiWidth",UiWidth,amster_OS.createsystemapps.settings.path);
    }
    });
layl2.addView(btns2);
var btns3 = new amster_OS.graphics.easyBar([ctx.getWindowManager().getDefaultDisplay().getHeight(), UiHeight]);
btns3.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    UiHeight=view.getProgress();
btns1.setText(fromHtml('<b><font color="#ffffff">Системный размер <br/>Высота: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+UiWidth+'</font><font color="#ffffff"><br/>Ширина: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+UiHeight+'</font><b>'));   
amster_OS.Data.setValue("UiHeight",UiHeight,amster_OS.createsystemapps.settings.path);
    }
    });
layl2.addView(btns3);
var btns4 = new amster_OS.graphics.easyButton("",[Gravity.CENTER,15]);
btns4.setText(fromHtml('<b><font color="#ffffff">вернуть обратно</font><b>'));   
btns4.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
UiWidth=ctx.getWindowManager().getDefaultDisplay().getWidth();
UiHeight=ctx.getWindowManager().getDefaultDisplay().getHeight();
amster_OS.Data.setValue("UiWidth",UiWidth,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("UiHeight",UiHeight,amster_OS.createsystemapps.settings.path);
amster_OS.graphics.print("Сохранено.");
   }}));
layl2.addView(btns4);
break;
case 6:
var activityManager = ctx.getSystemService(android.content.Context.ACTIVITY_SERVICE);
var memoryInfo = new android.app.ActivityManager.MemoryInfo();
activityManager.getMemoryInfo(memoryInfo);

var totalMemory = memoryInfo.totalMem;
var availableMemory = memoryInfo.availMem;
var usedMemory = totalMemory - availableMemory;

var os_size = amster_OS.fast_files.getFolderSize(amster_OS.my_root.system_path);
var data_size = amster_OS.fast_files.getFolderSize(amster_OS.my_root.getDir()[12])+amster_OS.fast_files.getFolderSize(amster_OS.my_root.getDir()[11])
var programs_size = amster_OS.fast_files.getFolderSize(amster_OS.my_root.getDir()[13]);
var libs_size = amster_OS.fast_files.getFolderSize(amster_OS.my_root.getDir()[14]);

var btn1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
var usablespace = parseInt(sdcard.getTotalSpace())-parseInt(sdcard.getUsableSpace());
btn1.setText(fromHtml('<b><font color="#ffffff">Внутренняя память (SSD): занято</font><font color="'+amster_OS.graphics.colors[0]+'"> '+amster_OS.fast_files.convertSize(usablespace)+'/'+amster_OS.fast_files.convertSize(sdcard.getTotalSpace())+'</font><font color="#ffffff"> ('+Math.round(parseInt(usablespace)/parseInt(sdcard.getTotalSpace())*100)+'%)</font><b>'));   
layl2.addView(btn1);
var btn2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
btn2.setText(fromHtml('<b><font color="#ffffff">Доступно </font><font color="'+amster_OS.graphics.colors[0]+'"> '+amster_OS.fast_files.convertSize(sdcard.getUsableSpace())+'</font><font color="#ffffff"> ('+Math.round(parseInt(sdcard.getUsableSpace())/parseInt(sdcard.getTotalSpace())*100)+'%)</font><b>'));   
layl2.addView(btn2);
var btn3 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
var os_pr = parseInt(os_size)/parseInt(sdcard.getTotalSpace())*100;
btn3.setText(fromHtml('<b><font color="#ffffff">AmsterOS: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+amster_OS.fast_files.convertSize(os_size)+'</font><font color="#ffffff"> ('+os_pr.toFixed(2)+'%)</font><b>'));   
layl2.addView(btn3);
var space1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
layl2.addView(space1);
var btnf = new amster_OS.graphics.easyButton("Для текущего пользователя",[Gravity.LEFT,10]);
layl2.addView(btnf);
var btn4 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
var dt_pr = parseInt(data_size)/parseInt(sdcard.getTotalSpace())*100;
btn4.setText(fromHtml('<b><font color="#ffffff">Данные: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+amster_OS.fast_files.convertSize(data_size)+'</font><font color="#ffffff"> ('+dt_pr.toFixed(2)+'%)</font><b>'));   
layl2.addView(btn4);
var btn5 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
var pr_pr = parseInt(programs_size)/parseInt(sdcard.getTotalSpace())*100;
btn5.setText(fromHtml('<b><font color="#ffffff">Пользовательские приложения: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+amster_OS.fast_files.convertSize(programs_size)+'</font><font color="#ffffff"> ('+pr_pr.toFixed(2)+'%)</font><b>'));   
layl2.addView(btn5);
var btn6 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
var lb_pr = parseInt(libs_size)/parseInt(sdcard.getTotalSpace())*100;
btn6.setText(fromHtml('<b><font color="#ffffff">Libs: </font><font color="'+amster_OS.graphics.colors[0]+'"> '+amster_OS.fast_files.convertSize(libs_size)+'</font><font color="#ffffff"> ('+lb_pr.toFixed(2)+'%)</font><b>'));   
layl2.addView(btn6);
var space2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
layl2.addView(space2);
var btns1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
btns1.setText(fromHtml('<b><font color="#ffffff">Оперативная память (RAM): занято</font><font color="'+amster_OS.graphics.colors[0]+'"> '+amster_OS.fast_files.convertSize(usedMemory)+'/'+amster_OS.fast_files.convertSize(totalMemory)+'</font><font color="#ffffff"> ('+Math.round(parseInt(usedMemory)/parseInt(totalMemory)*100)+'%)</font><b>'));   
layl2.addView(btns1);
var btns2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
btns2.setText(fromHtml('<b><font color="#ffffff">Доступно </font><font color="'+amster_OS.graphics.colors[0]+'"> '+amster_OS.fast_files.convertSize(availableMemory)+'</font><font color="#ffffff"> ('+Math.round(parseInt(availableMemory)/parseInt(totalMemory)*100)+'%)</font><b>'));   
layl2.addView(btns2);
break;
case 7:
var btn1 = new amster_OS.graphics.easyButton("Список:",[Gravity.LEFT,15]);
var all = new File(amster_OS.my_root.getDir()[14]).list();
layl2.addView(btn1);
for(var i in all){
if(all[i].endsWith(".aolb")){
var fl = new File(amster_OS.my_root.getDir()[14]+all[i]);
var btn2 = new amster_OS.graphics.easyButton("loading",[Gravity.LEFT,10]);
btn2.setText(fromHtml('<b><font color="#ffffff">'+fl.getName()+' </font><font color="'+amster_OS.graphics.colors[0]+'">'+amster_OS.fast_files.convertSize(fl.length())+'</font><b>'));   
btn2.setId(i);
btn2.setOnLongClickListener(function(v,t) {
var file = new File(amster_OS.my_root.getDir()[14]+all[v.getId()]);
amster_OS.graphics.print("удалено: "+file.getName());
file.delete();
layl2.removeView(v);
					return true;
				});
layl2.addView(btn2);
}
}
break;
case 8:
var text1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
text1.setText(fromHtml('<b><font color="#ffffff">Уведомления</font><b>'));   
layl2.addView(text1);

var btn2 = new amster_OS.graphics.easyToggle("показывать ", amster_OS.createsystemapps.settings.seeprints);
btn2.setOnClickListener(new View.OnClickListener({
    onClick: function(viewarg){
      if(!amster_OS.createsystemapps.settings.seeprints){
    amster_OS.createsystemapps.settings.seeprints = true;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
    }else{
    amster_OS.createsystemapps.settings.seeprints = false;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
   }
viewarg.setChecked(amster_OS.createsystemapps.settings.seeprints);
    }
    }));
layl2.addView(btn2);

var btn1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btn1.setText(fromHtml('<b><font color="#ffffff">Цвет текста:</font><b>'));   
layl2.addView(btn1);

var btn2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btn2.setText(fromHtml('<b><font color="'+amster_OS.graphics.print_design.cl+'">'+amster_OS.graphics.print_design.cl+'</font><b>'));   
btn2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.graphics.colorPicker(viewarg);
   }}));
layl2.addView(btn2);

var btn3 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btn3.setText(fromHtml('<b><font color="#ffffff">Цвет фона:</font><b>'));   
layl2.addView(btn3);

var btn4 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btn4.setShadowLayer(5,0,0,Color.WHITE);
btn4.setText(fromHtml('<b><font color="'+amster_OS.graphics.print_design.cl2+'">'+amster_OS.graphics.print_design.cl2+'</font><b>'));   
btn4.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.graphics.colorPicker(viewarg);
   }}));
layl2.addView(btn4);

var btn5 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btn5.setText(fromHtml('<b><font color="#ffffff">Прозрачность: </font><font color="'+amster_OS.graphics.colors[0]+'">'+amster_OS.graphics.print_design.al+'</font><b>'));   
layl2.addView(btn5);

var btn6 = new amster_OS.graphics.easyBar([200, amster_OS.graphics.print_design.al]);
btn6.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    amster_OS.graphics.print_design.al=view.getProgress();
  btn5.setText(fromHtml('<b><font color="#ffffff">Прозрачность: </font><font color="'+amster_OS.graphics.colors[0]+'">'+amster_OS.graphics.print_design.al+'</font><b>'));   
  }
    });
layl2.addView(btn6);

var btn7 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btn7.setText(fromHtml('<b><font color="#ffffff">Углы: </font><font color="'+amster_OS.graphics.colors[0]+'">'+amster_OS.graphics.print_design.cor+'</font><b>'));   
layl2.addView(btn7);

var btn8 = new amster_OS.graphics.easyBar([100, amster_OS.graphics.print_design.cor]);
btn8.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {
    amster_OS.graphics.print_design.cor=view.getProgress();
btn7.setText(fromHtml('<b><font color="#ffffff">Углы: </font><font color="'+amster_OS.graphics.colors[0]+'">'+amster_OS.graphics.print_design.cor+'</font><b>'));   
    }
    });
layl2.addView(btn8);

var space1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
layl2.addView(space1);

var text2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
text2.setText(fromHtml('<b><font color="#ffffff">Интерфейс</font><b>'));   
layl2.addView(text2);

var bts1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
bts1.setText(fromHtml('<b><font color="#ffffff">Цвет градиента 1:</font><b>'));   
layl2.addView(bts1);

var bts2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
bts2.setText(fromHtml('<b><font color="'+amster_OS.graphics.system_design.cl1+'">'+amster_OS.graphics.system_design.cl1+'</font><b>'));   
bts2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.graphics.colorPicker(viewarg);
   }}));
layl2.addView(bts2);

var bts3 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
bts3.setText(fromHtml('<b><font color="#ffffff">Цвет градиента 2:</font><b>'));   
layl2.addView(bts3);

var bts4 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
bts4.setText(fromHtml('<b><font color="'+amster_OS.graphics.system_design.cl2+'">'+amster_OS.graphics.system_design.cl2+'</font><b>'));   
bts4.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.graphics.colorPicker(viewarg);
   }}));
layl2.addView(bts4);

var bts5 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
bts5.setText(fromHtml('<b><font color="#ffffff">Тип: '+amster_OS.graphics.system_design.gr+'</font><b>'));   
layl2.addView(bts5);

var currentprogress = 0;

if(amster_OS.graphics.system_design.gr=="TOP_BOTTOM"){
currentprogress = 0;
}else if(amster_OS.graphics.system_design.gr=="TR_BL"){
currentprogress = 1;
}else if(amster_OS.graphics.system_design.gr=="RIGHT_LEFT"){
currentprogress = 2;
}else if(amster_OS.graphics.system_design.gr=="BR_TL"){
currentprogress = 3;
}else if(amster_OS.graphics.system_design.gr=="BOTTOM_TOP"){
currentprogress = 4;
}else if(amster_OS.graphics.system_design.gr=="BL_TR"){
currentprogress = 5;
}else if(amster_OS.graphics.system_design.gr=="LEFT_RIGHT"){
currentprogress = 6;
}else if(amster_OS.graphics.system_design.gr=="TL_BR"){
currentprogress = 7;
}
var bts6 = new amster_OS.graphics.easyBar([7, 2]);
bts6.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
    {
    onStopTrackingTouch: function(view)
    {

switch (view.getProgress()) {
    case 0:
        amster_OS.graphics.system_design.gr = "TOP_BOTTOM";
        break;
    case 1:
        amster_OS.graphics.system_design.gr = "TR_BL";
        break;
    case 2:
        amster_OS.graphics.system_design.gr = "RIGHT_LEFT";
        break;
    case 3:
        amster_OS.graphics.system_design.gr = "BR_TL";
        break;
    case 4:
        amster_OS.graphics.system_design.gr = "BOTTOM_TOP";
        break;
    case 5:
        amster_OS.graphics.system_design.gr = "BL_TR";
        break;
    case 6:
        amster_OS.graphics.system_design.gr = "LEFT_RIGHT";
        break;
    case 7:
        amster_OS.graphics.system_design.gr = "TL_BR";
        break;
}
bts5.setText(fromHtml('<b><font color="#ffffff">Тип: '+amster_OS.graphics.system_design.gr+'</font><b>'));   
    }
    });
layl2.addView(bts6);

var space2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
layl2.addView(space2);

var text3 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,15]);
text3.setText(fromHtml('<b><font color="#ffffff">Приложения</font><b>'));   
layl2.addView(text3);

var btr1 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btr1.setText(fromHtml('<b><font color="#ffffff">Цвет текста, переключателей:</font><b>'));   
layl2.addView(btr1);

var btr2 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btr2.setText(fromHtml('<b><font color="'+amster_OS.graphics.colors[0]+'">'+amster_OS.graphics.colors[0]+'</font><b>'));   
btr2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.graphics.colorPicker(viewarg);
   }}));
layl2.addView(btr2);

var btr3 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btr3.setText(fromHtml('<b><font color="#ffffff">Прогресс бар:</font><b>'));   
layl2.addView(btr3);

var btr4 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btr4.setText(fromHtml('<b><font color="'+amster_OS.graphics.colors[1]+'">'+amster_OS.graphics.colors[1]+'</font><b>'));   
btr4.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.graphics.colorPicker(viewarg);
   }}));
layl2.addView(btr4);

var btr5 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btr5.setText(fromHtml('<b><font color="#ffffff">Цвет фона:</font><b>'));   
layl2.addView(btr5);

var btr6 = new amster_OS.graphics.easyButton("",[Gravity.LEFT,10]);
btr6.setShadowLayer(5,0,0,Color.WHITE);
btr6.setText(fromHtml('<b><font color="'+amster_OS.graphics.colors[2]+'">'+amster_OS.graphics.colors[2]+'</font><b>'));   
btr6.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.graphics.colorPicker(viewarg);
   }}));
layl2.addView(btr6);

var text4 = new amster_OS.graphics.easyButton("сохранить изменения",[Gravity.CENTER,15]);
text4.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.graphics.print_design.cl2=btn4.getText().toString();
amster_OS.graphics.print_design.cl=btn2.getText().toString();
amster_OS.graphics.system_design.cl2=bts4.getText().toString();
amster_OS.graphics.system_design.cl1=bts2.getText().toString();
amster_OS.graphics.colors[0]=btr2.getText().toString();
amster_OS.graphics.colors[1]=btr4.getText().toString();
amster_OS.graphics.colors[2]=btr6.getText().toString();
amster_OS.Data.setValue("seeprints",amster_OS.createsystemapps.settings.seeprints,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("colors1",amster_OS.graphics.colors[0],amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("colors2",amster_OS.graphics.colors[1],amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("colors3",amster_OS.graphics.colors[2],amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cl1",amster_OS.graphics.system_design.cl1,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cl2",amster_OS.graphics.system_design.cl2,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("gr",amster_OS.graphics.system_design.gr,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cr1",amster_OS.graphics.print_design.cl,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cr2",amster_OS.graphics.print_design.cl2,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("size",amster_OS.graphics.print_design.size,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("al",amster_OS.graphics.print_design.al,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cor",amster_OS.graphics.print_design.cor,amster_OS.createsystemapps.settings.path);
amster_OS.graphics.print("Сохранено. Изменения вступят в силу после перезапуска.");
   }}));
layl2.addView(text4);

var text5 = new amster_OS.graphics.easyButton("откатить изменения",[Gravity.CENTER,15]);
text5.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
amster_OS.createsystemapps.settings.seeprints=true;
amster_OS.Data.setValue("seeprints",amster_OS.createsystemapps.settings.seeprints,amster_OS.createsystemapps.settings.path);
amster_OS.graphics.colors=["#2aa8d8","#5296b3","#0e1122"];
amster_OS.graphics.system_design={cl1:"#1565c0",cl2:"#81d4fa",gr:GradientDrawable.Orientation.TL_BR};
amster_OS.graphics.print_design={size:15,cl:"#ffffff",cl2:"#000000",al:150,cor:50};
amster_OS.Data.setValue("colors1",amster_OS.graphics.colors[0],amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("colors2",amster_OS.graphics.colors[1],amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("colors3",amster_OS.graphics.colors[2],amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cl1",amster_OS.graphics.system_design.cl1,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cl2",amster_OS.graphics.system_design.cl2,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("gr",amster_OS.graphics.system_design.gr,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cr1",amster_OS.graphics.print_design.cl,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cr2",amster_OS.graphics.print_design.cl2,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("size",amster_OS.graphics.print_design.size,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("al",amster_OS.graphics.print_design.al,amster_OS.createsystemapps.settings.path);
amster_OS.Data.setValue("cor",amster_OS.graphics.print_design.cor,amster_OS.createsystemapps.settings.path);
amster_OS.graphics.print("Откат. Изменения вступят в силу после перезапуска.");
   }}));
layl2.addView(text5);
break;
}
}
 SETGUI= amster_OS.graphics.easyPopup(lays,amster_OS.graphics.easyBg());
}
},
my_explorer:{
name:"Проводник",
version:"1.2",
labels:"none",
explor_dir:sdcard,
init: function (){
this.explorermenu(amster_OS.createsystemapps.my_explorer.explor_dir);
},
explorermenu: function(newdir){
amster_OS.createsystemapps.my_explorer.explor_dir=newdir;
var file_search;
var select_puth = "";
var selectmode = false;
var showhidden = false;
var longclick = false;
var firstselector=0;
var lastselector=0;
var countselector = 0;
var fileselector = [];
var folderselector = [];
var selectorputhes1 = [];
var selectorputhes2 = [];
var sort2 = [];var sort1 = [];

var bg_ad= new GradientDrawable();
bg_ad.setColor(Color.parseColor("#2374E7")); // #282923
var bg_ac = new GradientDrawable();
bg_ac.setStroke(2, Color.parseColor('#000000'));
bg_ac.setColor(Color.parseColor("#2374E7")); // #282923
var selector_blackbg = new GradientDrawable();
selector_blackbg.setColor(Color.BLACK);
var selector_graybg = new GradientDrawable();
selector_graybg.setColor(Color.parseColor("#4f505e"));
var params_for_buttons = new LayoutParams(UiWidth/4, WR_CNT);
var lay = new GridLayout(ctx);
  lay.setColumnCount(4);

var lay2 = new LinearLayout(ctx);
lay2.setOrientation(0);
var lays = new LinearLayout(ctx);
lays.setOrientation(1);
lays.setBackgroundDrawable(bg_ac);

        var menuScroll = new ScrollView(ctx);
        var menuScrol = new android.widget.HorizontalScrollView(ctx);
        menuScrol.setHorizontalScrollBarEnabled(false)
menuScroll.setVerticalScrollBarEnabled(false)
        menuScroll.addView(lay);  
        menuScrol.addView(lay2);  
        lays.addView(menuScrol);     
        lays.addView(menuScroll);     
        var list;
        function btns(){
list =  new File(amster_OS.createsystemapps.my_explorer.explor_dir).list();
        	var dir = (""+amster_OS.createsystemapps.my_explorer.explor_dir).split("/");
        for(var i=0; i<dir.length; i++){
        var button57 = new TextView(ctx);
 button57.setGravity(Gravity.CENTER);   button57.setTextColor(Color.WHITE);
    button57.setTextSize(15);
    button57.setId(i)
    button57.setPadding(5, 15, 5, 15);
     button57.setText(fromHtml('<b><font color="#ffffff">'+dir[i]+'</font></b>'))                
 button57.setLayoutParams(new LayoutParams(WR_CNT, WR_CNT));
     button57.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
     	try{
     amster_OS.createsystemapps.my_explorer.explor_dir = dir.slice(0,viewarg.getId()+1).join("/");
     list =  new File(amster_OS.createsystemapps.my_explorer.explor_dir).list();
    	lay.removeAllViews();
    lay2.removeAllViews();
    buttons();
    btns();
     }catch(e){print(e+" #"+e.lineNumber)}
     }}));
    lay2.addView(button57);
    var btton57 = new TextView(ctx);
 btton57.setGravity(Gravity.CENTER);   btton57.setTextColor(Color.WHITE);
    btton57.setTextSize(20);
    btton57.setPadding(5, 15, 5, 15);
     btton57.setText(fromHtml('<b><font color="#ffffff">/</font></b>'))                
    lay2.addView(btton57);
    }
        lay2.setBackground(bg_ad);
   }
btns();     

        function buttons(sss){
lay.removeAllViews();
sort2 = [];sort1 = [];
for(var i in list){
	if(new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+list[i]).isFile()==true){
if(showhidden&&new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+list[i]).isHidden()){
sort2.push(list[i])
}
if(!showhidden&&!new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+list[i]).isHidden()){
sort2.push(list[i])
}
if(showhidden&&!new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+list[i]).isHidden()){
sort2.push(list[i])
}
}else{
if(showhidden&&new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+list[i]).isHidden()){
sort1.push(list[i])
}
if(!showhidden&&!new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+list[i]).isHidden()){
sort1.push(list[i])
}
if(showhidden&&!new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+list[i]).isHidden()){
sort1.push(list[i])
}
	}

}
sort2.sort();
sort1.sort();
for(var i in sort1){
folderselector.push(false);
selectorputhes1.push("pust");
var utton5 = new TextView(ctx);
 utton5.setGravity(Gravity.LEFT);   utton5.setTextColor(Color.parseColor('#ffffff'));
 utton5.setPadding(5, 15, 5, 15);
    utton5.setBackground(selector_blackbg);
    utton5.setTextSize(15);
utton5.setMaxLines(1);  
     utton5.setText("📂 "+sort1[i]);    // folder
     if(folderselector[i]){
utton5.setBackground(selector_graybg);
}
    utton5.setId(i);
    utton5.setLayoutParams(params_for_buttons);
    utton5.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
if(selectmode){
if(!folderselector[viewarg.getId()]){
folderselector[viewarg.getId()]=true;
viewarg.setBackground(selector_graybg);
lastselector=viewarg.getId();
countselector++;
selectorputhes1[viewarg.getId()]=amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort1[viewarg.getId()]
}else{
if(!longclick){
folderselector[viewarg.getId()]=false;
countselector--;
viewarg.setBackground(selector_blackbg);
selectorputhes1[viewarg.getId()]="pust";
}else{
longclick=false;
}
}
}else{
    	amster_OS.createsystemapps.my_explorer.explor_dir = amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort1[viewarg.getId()]
    list =  new File(amster_OS.createsystemapps.my_explorer.explor_dir).list();
    	lay.removeAllViews();
    lay2.removeAllViews();
    buttons();
    btns();
lays.setBackgroundDrawable(bg_ac);
}
           }catch(e){print(e+" #"+e.lineNumber)}
  }
   }));
utton5.setOnLongClickListener(function(v,t) {
try{
if(!selectmode){
countselector=1;
firstselector=v.getId();
ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(37);
v.setBackground(selector_graybg);
selectmode=true;
longclick=true;
folderselector[v.getId()]=true;
selectorputhes1[v.getId()]=amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort1[v.getId()]
selcetorview();parametersview();
}
}catch(e){print(e+" #"+e.lineNumber)}
  
					return false;
				});
if(sort1[i]!="amster_OS"){
if(!sss){
lay.addView(utton5);
    }else if(sort1[i].toLowerCase().indexOf(sss)!=-1){
lay.addView(utton5);
}}
}
for(var i in sort2){
fileselector.push(false);
selectorputhes2.push("pust");
var button5 = new TextView(ctx);
 button5.setGravity(Gravity.LEFT);   button5.setTextColor(Color.parseColor('#ffffff'));
 button5.setPadding(5, 15, 5, 15);
    button5.setBackground(selector_blackbg);
if(fileselector[i]){
button5.setBackground(selector_graybg);
}
    button5.setTextSize(15);
button5.setMaxLines(1);  
     button5.setText("📄 "+sort2[i]);    // file
    button5.setId(i);
button5.setLayoutParams(params_for_buttons);
button5.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
if(selectmode){
if(!fileselector[viewarg.getId()]){
fileselector[viewarg.getId()]=true;
countselector++;
viewarg.setBackground(selector_graybg);
lastselector=viewarg.getId();
selectorputhes2[viewarg.getId()]=amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort2[viewarg.getId()]
}else{
if(!longclick){
fileselector[viewarg.getId()]=false;
countselector--;
viewarg.setBackground(selector_blackbg);
selectorputhes2[viewarg.getId()]="pust";
}else{
longclick=false;
}
}
}else{
if(sort2[viewarg.getId()].indexOf(".mp3")!=-1||sort2[viewarg.getId()].indexOf(".ogg")!=-1){
amster_OS.createsystemapps.mpplayer.getFastPlayer(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort2[viewarg.getId()]);
}else if(sort2[viewarg.getId()].indexOf(".txt")!=-1||sort2[viewarg.getId()].indexOf(".js")!=-1||sort2[viewarg.getId()].indexOf(".lua")!=-1||sort2[viewarg.getId()].indexOf(".xml")!=-1||sort2[viewarg.getId()].indexOf(".properties")!=-1||sort2[viewarg.getId()].indexOf(".html")!=-1){
amster_OS.createsystemapps.txt_editor.menu(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort2[viewarg.getId()])
}else if(sort2[viewarg.getId()].indexOf(".png")!=-1||sort2[viewarg.getId()].indexOf(".jpg")!=-1||sort2[viewarg.getId()].indexOf(".mp4")!=-1||sort2[viewarg.getId()].indexOf(".jpeg")!=-1){
amster_OS.createsystemapps.mediaview.menu(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort2[viewarg.getId()]);
}
lays.setBackgroundDrawable(bg_ac);
}
           }catch(e){print(e+" #"+e.lineNumber)}
  }
   }));
button5.setOnLongClickListener(function(v,t) {
					if(!selectmode){
firstselector=v.getId();
countselector=1;
ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(37);
v.setBackground(selector_graybg);
selectmode=true;
longclick=true;
fileselector[v.getId()]=true;
selectorputhes2[v.getId()]=amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort2[v.getId()]
selcetorview();parametersview();
}
					return false;
				});
    
if(!sss){
lay.addView(button5);
    }else if(sort2[i].toLowerCase().indexOf(sss)!=-1){
lay.addView(button5);
}

}
}
buttons(file_search);
function selcetorview(){
            var layoutc = new LinearLayout(ctx);
            layoutc.setOrientation(0);
var bgac = new GradientDrawable();
bgac.setColor(Color.parseColor("#2374E7")); // #282923
layoutc.setBackgroundDrawable(bgac);
var infoobtn = new Button(ctx);
     infoobtn.setText(amster_OS.createsystemapps.my_explorer.explor_dir+"\n"+countselector+"/"+(sort1.length+sort2.length)); 
     infoobtn.setTextColor(Color.parseColor('#FFFFFF'));   
 infoobtn.setAllCaps(false);
infoobtn.setTextSize(10);
infoobtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
infoobtn.setLayoutParams(new LayoutParams(UiWidth/2, MCH_PNT));
infoobtn.setGravity(Gravity.LEFT);
     layoutc.addView(infoobtn);
var click = false;
var selectallbtn = new Button(ctx);
     selectallbtn.setText("выбрать всё"); 
     selectallbtn.setTextColor(Color.parseColor('#FFFFFF'));   
 selectallbtn.setAllCaps(false);
selectallbtn.setTextSize(15);
selectallbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
selectallbtn.setLayoutParams(new LayoutParams(WR_CNT, MCH_PNT));
selectallbtn.setGravity(Gravity.CENTER);
     selectallbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(click){
click=false;
selectorputhes1 = [];
selectorputhes2 = [];
for(var o in fileselector){
fileselector[o]=false;

}
for(var o in folderselector){
folderselector[o]=false;
}
countselector=0;
}else{
for(var o in sort2){
fileselector[o]=true;
selectorputhes2[o]=amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort2[o]
}
for(var o in sort1){
folderselector[o]=true;
selectorputhes1[o]=amster_OS.createsystemapps.my_explorer.explor_dir+"/"+sort1[o]
}
click=true;
countselector=(sort1.length+sort2.length);
}
buttons();
}catch(e){print(e)}
   }}));
layoutc.addView(selectallbtn);
var intervalbtn = new Button(ctx);
     intervalbtn.setText("интервал"); 
     intervalbtn.setTextColor(Color.parseColor('#FFFFFF'));   
 intervalbtn.setAllCaps(false);
intervalbtn.setTextSize(15);
intervalbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
intervalbtn.setLayoutParams(new LayoutParams(WR_CNT, MCH_PNT));
intervalbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(firstselector>lastselector){
for(var a = lastselector; a<firstselector;a++){

}
}
if(firstselector<lastselector){
for(var a = firstselector; a<lastselector;a++){

}
}
buttons();
}catch(e){print(e)}
   }}));
intervalbtn.setGravity(Gravity.CENTER);
     layoutc.addView(intervalbtn);
var cancelbtn = new Button(ctx);
     cancelbtn.setText("отмена"); 
     cancelbtn.setTextColor(Color.parseColor('#FFFFFF'));   
 cancelbtn.setAllCaps(false);
cancelbtn.setTextSize(15);
cancelbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
cancelbtn.setLayoutParams(new LayoutParams(WR_CNT, MCH_PNT));
cancelbtn.setGravity(Gravity.CENTER);
cancelbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
GUILAC.dismiss();
GUILAB.dismiss();
selectmode = false;
firstselector=0;
lastselector=0;
countselector = 0;
fileselector = [];
folderselector = [];
buttons();
}catch(e){print(e)}
   }}));
     layoutc.addView(cancelbtn);
//knopki
var handler = android.os.Handler();
var runnable = new Runnable() {
   run() {
                                
try{
infoobtn.setText(amster_OS.createsystemapps.my_explorer.explor_dir+"\n"+countselector+"/"+(sort1.length+sort2.length)); 
} catch (e){print(e + e.lineNumber)}
                                  handler.postDelayed(this, 100);
   }
};
handler.postDelayed(runnable, 100);
GUILAB = new PopupWindow(layoutc, MCH_PNT, WR_CNT);
GUILAB.setOnDismissListener(new PopupWindow.OnDismissListener({
onDismiss: function(){
if(runnable!=null){
handler.removeCallbacks(runnable);
}
}}));
GUILAB.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
	GUILAB.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.TOP, 0, 0);
}

function parametersview(){
            var layoutc = new LinearLayout(ctx);
            layoutc.setOrientation(0);
var bgac = new GradientDrawable();
bgac.setColor(Color.parseColor("#2374E7")); // #282923
layoutc.setBackgroundDrawable(bgac);
var names = ["копировать","переместить","удалить","переименовать","ещё"];
for(var i in names){
var selectallbtn = new Button(ctx);
     selectallbtn.setText(names[i]); 
     selectallbtn.setTextColor(Color.parseColor('#FFFFFF'));   
 selectallbtn.setAllCaps(false);
selectallbtn.setTextSize(15);
selectallbtn.setId(i);
selectallbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
selectallbtn.setGravity(Gravity.CENTER);
selectallbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(viewarg.getId()==0&&countselector>0){
dirmenu("folder",0)
}
if(viewarg.getId()==1&&countselector>0){
dirmenu("folder",1)
}
if(viewarg.getId()==2&&countselector>0){
dopddialog(0,"удаление элемента","вы действительно хотите удалить "+countselector+" элемент"+wordcorrect(countselector)+"?",bgac)
}
if(viewarg.getId()==3&&countselector>0){
renamemenu();
}
if(viewarg.getId()==4&&countselector>0){
otherexplor();
}

}catch(e){print(e)}
   }}));
     layoutc.addView(selectallbtn);
}
//knopki

GUILAC = new PopupWindow(layoutc, MCH_PNT, WR_CNT);
GUILAC.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
 GUILAC.setAnimationStyle(animation);
	GUILAC.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.BOTTOM, 0, 0);
}

function openerdops(){
            var abobalay = new LinearLayout(ctx);
            abobalay.setOrientation(1);
            
var opendopbtn = new TextView(ctx);
 opendopbtn.setGravity(Gravity.CENTER);   opendopbtn.setTextColor(Color.parseColor('#eb4c42'));
opendopbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(35), amster_OS.screen.dipSize(35)));
    opendopbtn.setTextSize(25);
     opendopbtn.setText(fromHtml('<b><font color="#ffffff">:</font></b>'))               
    opendopbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{

exitexplor();
}catch(e){print(e)}
   }}));
abobalay.addView(opendopbtn);
DGUI = new PopupWindow(abobalay, amster_OS.screen.dipSize(35), amster_OS.screen.dipSize(35));
DGUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
	DGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, 0);
}
function exitexplor(){
            var layoutc = new LinearLayout(ctx);
            layoutc.setOrientation(1);
var bgac = new GradientDrawable();
bgac.setColor(Color.parseColor("#2374E7")); // #282923
layoutc.setBackgroundDrawable(bgac);
            var createbtn = new TextView(ctx);
 createbtn.setGravity(Gravity.CENTER);   
createbtn.setTextColor(Color.parseColor('#ffffff'));
    createbtn.setTextSize(20);
     createbtn.setText("создать");   
    createbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
GUILAA.dismiss();
var miscDialog = new android.app.Dialog(ctx);
     miscDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
     var dialogLayout = new LinearLayout(ctx);
     dialogLayout.setOrientation(1);
 var dialzagbtn = new TextView(ctx);
     dialzagbtn.setText(fromHtml('<b><font color="#ffffff">создать</font></b>')); 
     dialzagbtn.setTextColor(Color.parseColor('#FFFFFF'));   
dialzagbtn.setBackground(bgac);
 dialzagbtn.setTextSize(35);
dialzagbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
dialzagbtn.setGravity(Gravity.CENTER);
     
     dialogLayout.addView(dialzagbtn);
var b1utton0 = new TextView(ctx);
     b1utton0.setText(fromHtml('<b><font color="#ffffff">Папка</font></b>')); 
     b1utton0.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton0.setTextSize(25);
b1utton0.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton0.setGravity(Gravity.LEFT);
     b1utton0.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
     	miscDialog.dismiss();
createObj("Папка",bgac)
      } 
     })); 
     dialogLayout.addView(b1utton0);
     var b1utton1 = new TextView(ctx);
     b1utton1.setText(fromHtml('<b><font color="#ffffff">Word</font></b>')); 
     b1utton1.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton1.setTextSize(25);
b1utton1.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton1.setGravity(Gravity.LEFT);
     b1utton1.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
     	miscDialog.dismiss();
createObj("Word",bgac)
      } 
     })); 
     dialogLayout.addView(b1utton1);
var b1utton2 = new TextView(ctx);
     b1utton2.setText(fromHtml('<b><font color="#ffffff">Exel</font></b>')); 
     b1utton2.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton2.setTextSize(25);
b1utton2.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton2.setGravity(Gravity.LEFT);
     b1utton2.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
     	miscDialog.dismiss();
createObj("Exel",bgac)
      } 
     })); 
     dialogLayout.addView(b1utton2);
     var b1utton3 = new TextView(ctx);
     b1utton3.setText(fromHtml('<b><font color="#ffffff">PowerPoint</font></b>')); 
     b1utton3.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton3.setTextSize(25);
b1utton3.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton3.setGravity(Gravity.LEFT);
     b1utton3.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
     	miscDialog.dismiss();
createObj("PowerPoint",bgac)
      } 
     })); 
     dialogLayout.addView(b1utton3);
var b1utton4 = new TextView(ctx);
     b1utton4.setText(fromHtml('<b><font color="#ffffff">Файл</font></b>')); 
     b1utton4.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton4.setTextSize(25);
b1utton4.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton4.setGravity(Gravity.LEFT);
     b1utton4.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
     	miscDialog.dismiss();
createObj("Файл",bgac)
      } 
     })); 
     dialogLayout.addView(b1utton4);
     dialogLayout.setBackgroundDrawable(new ColorDrawable(Color.BLACK));
  miscDialog.setContentView(dialogLayout);
 miscDialog.show();
}catch(e){print(e)}
   }}));
layoutc.addView(createbtn);
var hidetbtn = new TextView(ctx);
 hidetbtn.setGravity(Gravity.CENTER);   
hidetbtn.setTextColor(Color.parseColor('#ffffff'));
hidetbtn.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
hidetbtn.setMarqueeRepeatLimit(-1);
hidetbtn.setSingleLine();
hidetbtn.setHorizontallyScrolling(true);
hidetbtn.setSelected(true);         
    hidetbtn.setTextSize(20);
if(showhidden){
hidetbtn.setText("не видеть скрытые файлы");   
}else{
     hidetbtn.setText("показать скрытые файлы"); 
}  
    hidetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
GUILAA.dismiss();

if(showhidden){
showhidden=false;
hidetbtn.setText("не видеть скрытые файлы");   
} else {
showhidden=true;
hidetbtn.setText("показать скрытые файлы");   
}
lay2.removeAllViews();
btns();
buttons();
}catch(e){print(e)}
   }}));
layoutc.addView(hidetbtn);
var updtbtn = new TextView(ctx);
 updtbtn.setGravity(Gravity.CENTER);   
updtbtn.setTextColor(Color.parseColor('#ffffff'));
    updtbtn.setTextSize(20);
     updtbtn.setText("главная");   
    updtbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
GUILAA.dismiss();
amster_OS.createsystemapps.my_explorer.explor_dir = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
lay2.removeAllViews();
btns();
buttons();
}catch(e){print(e)}
   }}));
layoutc.addView(updtbtn);
var explexit = new TextView(ctx);
 explexit.setGravity(Gravity.CENTER);   
explexit.setTextColor(Color.parseColor('#ffffff'));
    explexit.setTextSize(20);
     explexit.setText("выход");   
    explexit.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
GUILAA.dismiss();
GUILA.dismiss();
DGUI.dismiss();
amster_OS.createsystemapps.my_explorer.explor_dir=sdcard;
}catch(e){print(e)}
   }}));
layoutc.addView(explexit);
var searchbtn = new EditText(ctx);
 searchbtn.setGravity(Gravity.CENTER);   
searchbtn.setTextColor(Color.parseColor('#ffffff'));
    searchbtn.setTextSize(20);
searchbtn.setHintTextColor(Color.parseColor("#ffffff"));
searchbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
searchbtn.setHint("поиск файлов");
searchbtn.setMaxLines(1);  
    searchbtn.addTextChangedListener(new android.text.TextWatcher({
     afterTextChanged: function (text) {
  {
if(text == null){
file_search=null;
buttons();
}else{
file_search=text;
buttons(text);
}
}
    }
    }));

layoutc.addView(searchbtn);

GUILAA = new PopupWindow(layoutc, UiWidth/4, WR_CNT);
GUILAA.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
GUILAA.setFocusable(true);
 GUILAA.setAnimationStyle(animation);
	GUILAA.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, 0);
}
function otherexplor(){
            var layoutc = new LinearLayout(ctx);
            layoutc.setOrientation(1);
var bgac = new GradientDrawable();
bgac.setColor(Color.parseColor("#2374E7")); // #282923
layoutc.setBackgroundDrawable(bgac);
            
var names = ["свойства","отправить","открыть через","создать ярлык"]

for(var h in names){
var explexit = new TextView(ctx);
 explexit.setGravity(Gravity.CENTER);   
explexit.setTextColor(Color.parseColor('#ffffff'));
    explexit.setTextSize(15);
explexit.setId(h);
     explexit.setText(names[h]);   
    explexit.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(viewarg.getId()==0)amster_OS.createsystemapps.my_explorer.settings(amster_OS.createsystemapps.my_explorer.explor_dir,selectorputhes1,selectorputhes2,countselector);
if(viewarg.getId()==1){
for(var o in selectorputhes2){
if(selectorputhes2[o]!="pust"){
var intent = new Intent(Intent.ACTION_SEND);
intent.setType("text/plain");
intent.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://" + selectorputhes2[o]));
intent.putExtra(Intent.EXTRA_SUBJECT, selectorputhes2[o]);
ctx.startActivity(intent);
}
}
for(var o in selectorputhes1){
if(selectorputhes1[o]!="pust"){
var intent = new Intent(Intent.ACTION_SEND);
intent.setType("text/plain");
intent.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://" + selectorputhes1[o]));
intent.putExtra(Intent.EXTRA_SUBJECT, selectorputhes1[o]);
ctx.startActivity(intent);
}
}
}
if(viewarg.getId()==3){
for(var o in selectorputhes2){
if(selectorputhes2[o]!="pust"){
if(new File(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/paths.amos").exists()){
amster_OS.fast_files.writeFile(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/paths.amos",selectorputhes2[o]);
}
}
}
for(var o in selectorputhes1){
if(selectorputhes1[o]!="pust"){
if(new File(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/paths.amos").exists()){
amster_OS.fast_files.writeFile(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/paths.amos",selectorputhes1[o]);
}
}
}
}
if(viewarg.getId()==2){
for(var o in selectorputhes1){
if(selectorputhes1[o]!="pust"){
var filess = new File(selectorputhes1[o])
var i = new Intent();
i.setAction(Intent.ACTION_VIEW);
var ext = filess.getName().substring(filess.getName().indexOf(".")+1);
var type = android.webkit.MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext);
i.setDataAndType(Uri.fromFile(filess), type);
i.setFlags(i.FLAG_ACTIVITY_NEW_TASK)
ctx.startActivity(i);
}}
for(var o in selectorputhes2){
if(selectorputhes2[o]!="pust"){
var filess = new File(selectorputhes2[o])
var i = new Intent();
i.setAction(Intent.ACTION_VIEW);
var ext = filess.getName().substring(filess.getName().indexOf(".")+1);
var type = android.webkit.MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext);
i.setDataAndType(Uri.fromFile(filess), type);
i.setFlags(i.FLAG_ACTIVITY_NEW_TASK)
ctx.startActivity(i);
}}
}
GUILAY.dismiss();
}catch(e){print(e)}
   }}));
if(countselector==1&&(names[h]=="отправить"||names[h]=="открыть через"||names[h]=="создать ярлык")){
layoutc.addView(explexit);
}
if(names[h]=="свойства"){
layoutc.addView(explexit);
}
}

GUILAY = new PopupWindow(layoutc, UiWidth/6, WR_CNT);
GUILAY.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
GUILAY.setFocusable(true);
 GUILAY.setAnimationStyle(animation);
	GUILAY.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT | Gravity.BOTTOM, 0, 0);
}
        function createObj(obj,bg){
var miscDialog = new android.app.Dialog(ctx);
     miscDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
     var dialogLayout = new LinearLayout(ctx);
     dialogLayout.setOrientation(1);
var dialogLayout1 = new LinearLayout(ctx);
     dialogLayout1.setOrientation(0);
 var dialzagbtn = new TextView(ctx);
     dialzagbtn.setText(fromHtml('<b><font color="#ffffff">'+obj+'</font></b>')); 
     dialzagbtn.setTextColor(Color.parseColor('#FFFFFF'));   
dialzagbtn.setBackground(bg);
 dialzagbtn.setTextSize(35);
dialzagbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
dialzagbtn.setGravity(Gravity.CENTER);
     
     dialogLayout.addView(dialzagbtn);
var b0utton1 = new EditText(ctx);
     b0utton1.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
b0utton1.setHint("введите название");
 b0utton1.setMaxLines(1);  
b0utton1.setTextColor(Color.parseColor('#FFFFFF'));   
b0utton1.setInputType(1);   
b0utton1.setTextSize(25);   
b0utton1.setGravity(Gravity.CENTER);
     dialogLayout.addView(b0utton1);
dialogLayout.addView(dialogLayout1);

     var b1utton1 = new TextView(ctx);
     b1utton1.setText(fromHtml('<b><font color="#ffffff">отмена</font></b>')); 
     b1utton1.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton1.setTextSize(25);
b1utton1.setLayoutParams(new LayoutParams(UiWidth/4, WR_CNT));
b1utton1.setGravity(Gravity.CENTER);
     b1utton1.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
     	miscDialog.dismiss();
      } 
     })); 
     dialogLayout1.addView(b1utton1);
var b1utton2 = new TextView(ctx);
     b1utton2.setText(fromHtml('<b><font color="#ffffff">ок</font></b>')); 
     b1utton2.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton2.setTextSize(25);
b1utton2.setLayoutParams(new LayoutParams(UiWidth/4, WR_CNT));
b1utton2.setGravity(Gravity.CENTER);
     b1utton2.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
try{
var nameobj = b0utton1.getText().toString();
if(b0utton1.getText().toString()==""){
nameobj="безымянный";
}
if(obj=="Папка"){
amster_OS.graphics.print("папка "+nameobj+" создана");
File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+nameobj).mkdirs();
}
if(obj=="Word"){
amster_OS.graphics.print("файл "+nameobj+" создан");
var fileobj = new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+nameobj+".docx");
fileobj.createNewFile();
}
if(obj=="Exel"){
amster_OS.graphics.print("файл "+nameobj+" создан");
var fileobj = new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+nameobj+".xlsx");
fileobj.createNewFile();
}
if(obj=="PowerPoint"){
amster_OS.graphics.print("файл "+nameobj+" создан");
var fileobj = new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+nameobj+".pptx");
fileobj.createNewFile();
}
if(obj=="Файл"){
amster_OS.graphics.print("файл "+nameobj+" создан");
var fileobj = new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+nameobj);
fileobj.createNewFile();
}
buttons();
miscDialog.dismiss();
}catch(e){
    print(e+". #"+e.lineNumber)
    }
      } 
     })); 
     dialogLayout1.addView(b1utton2);
     
     dialogLayout.setBackgroundDrawable(new ColorDrawable(Color.BLACK));
  miscDialog.setContentView(dialogLayout);
 miscDialog.show();
}
function dopddialog(event,tect,tecb,bgac){
var miscDialog = new android.app.Dialog(ctx);
     miscDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
     var dialogLayout = new LinearLayout(ctx);
     dialogLayout.setOrientation(1);
var dialogLayout1 = new LinearLayout(ctx);
     dialogLayout1.setOrientation(0);
 var dialzagbtn = new TextView(ctx);
     dialzagbtn.setText(fromHtml('<b><font color="#ffffff">'+tect+'</font></b>')); 
     dialzagbtn.setTextColor(Color.parseColor('#FFFFFF'));   
dialzagbtn.setBackground(bgac);
 dialzagbtn.setTextSize(25);
dialzagbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
dialzagbtn.setGravity(Gravity.CENTER);  
     dialogLayout.addView(dialzagbtn);
var b1utton0 = new TextView(ctx);
     b1utton0.setText(fromHtml('<b><font color="#ffffff">'+tecb+'</font></b>')); 
     b1utton0.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton0.setTextSize(15);
b1utton0.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton0.setGravity(Gravity.LEFT);
     dialogLayout.addView(b1utton0);
dialogLayout.addView(dialogLayout1);

     var b1utton1 = new Button(ctx);
     b1utton1.setText(fromHtml('<b><font color="#ffffff">отмена</font></b>')); 
     b1utton1.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton1.setTextSize(20);
b1utton1.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
b1utton1.setLayoutParams(new LayoutParams(UiWidth/4, WR_CNT));
b1utton1.setGravity(Gravity.CENTER);
     b1utton1.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 

     	miscDialog.dismiss();
      } 
     })); 
     dialogLayout1.addView(b1utton1);
var b1utton2 = new Button(ctx);
     b1utton2.setText(fromHtml('<b><font color="#ffffff">ок</font></b>')); 
     b1utton2.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton2.setTextSize(20);
b1utton2.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
b1utton2.setLayoutParams(new LayoutParams(UiWidth/4, WR_CNT));
b1utton2.setGravity(Gravity.CENTER);
     b1utton2.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
try{
if(event==0){
for(var o in selectorputhes2){
if(selectorputhes2[o]!="pust"){
fileselector[o]=false;
var Files = new File(selectorputhes2[o]);
    Files.delete();
selectorputhes2[o]=="pust"
}
}
for(var o in selectorputhes1){
if(selectorputhes1[o]!="pust"){
folderselector[o]=false;
var Files = new File(selectorputhes1[o]);
    Files.delete();
selectorputhes1[o]=="pust"
}
}
amster_OS.graphics.print("удален"+wordcorrect2(countselector)+" "+countselector+" элемент"+wordcorrect(countselector));
}
if(event==1){
amster_OS.graphics.print("скопирован"+wordcorrect2(countselector)+" "+countselector+" элемент"+wordcorrect(countselector));
for(var o in selectorputhes1){
if(selectorputhes1[o]!="pust"){
amster_OS.fast_files.copyFile(selectorputhes1[o]+"/",select_puth)
}
}
for(var o in selectorputhes2){
if(selectorputhes2[o]!="pust"){
amster_OS.fast_files.copyFile(selectorputhes2[o]+"/",select_puth)
}}
}
if(event==2){
amster_OS.graphics.print("перемещен"+wordcorrect2(countselector)+" "+countselector+" элемент"+wordcorrect(countselector));
for(var o in selectorputhes1){
if(selectorputhes1[o]!="pust"){
amster_OS.fast_files.cutFile(selectorputhes1[o]+"/",select_puth)
selectorputhes1[o]=="pust"
}}
for(var o in selectorputhes2){
if(selectorputhes2[o]!="pust"){
amster_OS.fast_files.cutFile(selectorputhes2[o]+"/",select_puth)
selectorputhes2[o]=="pust"
}}
}
GUILAC.dismiss();
GUILAB.dismiss();
selectmode = false;
firstselector=0;
lastselector=0;
countselector = 0;
fileselector = [];
folderselector = [];
buttons();
miscDialog.dismiss();
}catch(e){
    print(e+". #"+e.lineNumber+"\n"+amster_OS.createsystemapps.my_explorer.explor_dir+"/")
    }
      } 
     })); 
     dialogLayout1.addView(b1utton2);
     dialogLayout.setBackgroundDrawable(new ColorDrawable(Color.BLACK));
  miscDialog.setContentView(dialogLayout);
 miscDialog.show();
}
function renamemenu(){
var bgac = new GradientDrawable();
bgac.setColor(Color.parseColor("#2374E7")); // #282923
var miscDialog = new android.app.Dialog(ctx);
     miscDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
     var dialogLayout = new LinearLayout(ctx);
     dialogLayout.setOrientation(1);
var dialogLayout1 = new LinearLayout(ctx);
     dialogLayout1.setOrientation(0);
 var dialzagbtn = new TextView(ctx);
     dialzagbtn.setText(fromHtml('<b><font color="#ffffff">переименовать '+countselector+' файл'+wordcorrect(countselector)+'</font></b>')); 
     dialzagbtn.setTextColor(Color.parseColor('#FFFFFF'));   
dialzagbtn.setBackground(bgac);
 dialzagbtn.setTextSize(25);
dialzagbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
dialzagbtn.setGravity(Gravity.CENTER);  
     dialogLayout.addView(dialzagbtn);
var b1utton0 = new EditText(ctx);
     b1utton0.setHintTextColor(Color.parseColor("#ffffff"));
b1utton0.setTextColor(Color.parseColor("#ffffff"));
b1utton0.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
b1utton0.setHint("введите имя");
if(countselector==1){
for(var o in selectorputhes2){
if(selectorputhes2[o]!="pust"){
b1utton0.setText(new File(selectorputhes2[o]).getName());
}}
for(var o in selectorputhes1){
if(selectorputhes1[o]!="pust"){
b1utton0.setText(new File(selectorputhes1[o]).getName());
}}
}
b1utton0.setMaxLines(1);  
     b1utton0.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton0.setTextSize(15);
b1utton0.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton0.setGravity(Gravity.LEFT);
     dialogLayout.addView(b1utton0);
dialogLayout.addView(dialogLayout1);

     var b1utton1 = new Button(ctx);
     b1utton1.setText(fromHtml('<b><font color="#ffffff">отмена</font></b>')); 
     b1utton1.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton1.setTextSize(20);
b1utton1.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
b1utton1.setLayoutParams(new LayoutParams(UiWidth/4, WR_CNT));
b1utton1.setGravity(Gravity.CENTER);
     b1utton1.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 

     	miscDialog.dismiss();
      } 
     })); 
     dialogLayout1.addView(b1utton1);
var b1utton2 = new Button(ctx);
     b1utton2.setText(fromHtml('<b><font color="#ffffff">ок</font></b>')); 
     b1utton2.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton2.setTextSize(20);
b1utton2.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
b1utton2.setLayoutParams(new LayoutParams(UiWidth/4, WR_CNT));
b1utton2.setGravity(Gravity.CENTER);
     b1utton2.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
try{
let name="безымянный";
if(b1utton0.getText().toString()==''){
name="безымянный";
}else{
name=b1utton0.getText().toString()
}

for(var o in selectorputhes2){
if(selectorputhes2[o]!="pust"){
var fild2;
if(countselector==1){
fild2 = new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+name)
}else{
fild2 = new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/r"+o+(name))
}
fileselector[o]=false;
var Files = new File(selectorputhes2[o]);
    Files.renameTo(fild2);
selectorputhes2[o]=="pust"
}
}
for(var o in selectorputhes1){
if(selectorputhes1[o]!="pust"){
var fild2;
if(countselector==1){
fild2 = new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/"+name)
}else{
fild2 = new File(amster_OS.createsystemapps.my_explorer.explor_dir+"/d"+o+(name))
}
folderselector[o]=false;
var Files = new File(selectorputhes1[o]);
    Files.renameTo(fild2);
selectorputhes1[o]=="pust"
}
}
amster_OS.graphics.print("переименован"+wordcorrect2(countselector)+" "+countselector+" элемент"+wordcorrect(countselector)+ " на "+name);
GUILAC.dismiss();
GUILAB.dismiss();
selectmode = false;
firstselector=0;
lastselector=0;
countselector = 0;
fileselector = [];
folderselector = [];
buttons();
miscDialog.dismiss();
}catch(e){
    print(e+". #"+e.lineNumber)
    }
      } 
     })); 
     dialogLayout1.addView(b1utton2);
     dialogLayout.setBackgroundDrawable(new ColorDrawable(Color.BLACK));
  miscDialog.setContentView(dialogLayout);
 miscDialog.show();
}
function dirmenu(type,event){
var selmgdir=amster_OS.createsystemapps.my_explorer.explor_dir;
var bg66ad= new GradientDrawable();
bg66ad.setColor(Color.parseColor("#2374E7")); // #282923
var bg66ac = new GradientDrawable();
bg66ac.setColor(Color.parseColor("#2374E7")); // #282923
var selector66blackbg = new GradientDrawable();
selector66blackbg.setColor(Color.BLACK);
var guibg123 = new GradientDrawable();
guibg123.setColor(Color.TRANSPARENT);
guibg123.setStroke(5, Color.BLACK);
var params66buttons = new LayoutParams(MCH_PNT, WR_CNT);
params66buttons.setMargins(2,2,2,2);

var lay66 = new LinearLayout(ctx);
lay66.setOrientation(1);
var lay266= new LinearLayout(ctx);
lay266.setOrientation(0);
var lays66 = new LinearLayout(ctx);
lays66.setOrientation(1);
lays66.setBackgroundDrawable(bg66ac);

        var menuScroll66 = new ScrollView(ctx);
        var menuScrol66 = new android.widget.HorizontalScrollView(ctx);
        menuScrol66.setVerticalScrollBarEnabled(false)
        menuScroll66.addView(lay66);  
        menuScrol66.addView(lay266);  
        lays66.addView(menuScrol66);     
        lays66.addView(menuScroll66);     
        var list66 =  new File(selmgdir).list();
        function btns66(){
        	var dir66 = (""+selmgdir).split("/");
        for(var i=0; i<dir66.length; i++){
        var button57 = new TextView(ctx);
 button57.setGravity(Gravity.CENTER);   button57.setTextColor(Color.BLACK);
    button57.setTextSize(9);
    button57.setId(i)
    button57.setPadding(5, 15, 5, 15);
     button57.setText(dir66[i])
 button57.setLayoutParams(new LayoutParams(WR_CNT, UiWidth/16));
     button57.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
     	try{
     selmgdir = dir66.slice(0,viewarg.getId()+1).join("/");
     list66 =  new File(selmgdir).list();
    	lay66.removeAllViews();
    lay266.removeAllViews();
    buttons66();
    btns66();
     }catch(e){print(e+" #"+e.lineNumber)}
     }}));
    lay266.addView(button57);
    var btton57 = new TextView(ctx);
 btton57.setGravity(Gravity.CENTER);   btton57.setTextColor(Color.BLACK);
    btton57.setTextSize(9);
    btton57.setPadding(5, 15, 5, 15);
     btton57.setText("/");        
    lay266.addView(btton57);
    }
        lay266.setBackground(bg66ad);
   }
btns66();     

        function buttons66(){
lay66.removeAllViews();
var sort266 = [];var sort166 = [];
for(var i in list66){
	if(new File(selmgdir+"/"+list66[i]).isFile()==true){
sort266.push(list66[i])
}else{
sort166.push(list66[i])
	}
}
sort266.sort();
sort166.sort();
for(var i in sort166){
var utton5 = new TextView(ctx);
 utton5.setGravity(Gravity.LEFT);   utton5.setTextColor(Color.parseColor('#ffffff'));
 utton5.setPadding(5, 15, 5, 15);
    utton5.setBackground(selector66blackbg);
    utton5.setTextSize(12);
     utton5.setText("📂 "+sort166[i]);    // folder
     
    utton5.setId(i);
    utton5.setLayoutParams(params66buttons);
    utton5.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
    	selmgdir = selmgdir+"/"+sort166[viewarg.getId()]
    list66 =  new File(selmgdir).list();
    	lay66.removeAllViews();
    lay266.removeAllViews();
    buttons66();
    btns66();
lays66.setBackgroundDrawable(bg66ac);
           }catch(e){print(e+" #"+e.lineNumber)}
  }
   }));
lay66.addView(utton5);
}
for(var i in sort266){
var button5 = new TextView(ctx);
 button5.setGravity(Gravity.LEFT);   button5.setTextColor(Color.parseColor('#ffffff'));
 button5.setPadding(5, 15, 5, 15);
    button5.setBackground(selector66blackbg);
    button5.setTextSize(12);
     button5.setText("📄 "+sort266[i]);    // file
    button5.setId(i);
button5.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
if(type=="file"){
select_puth=selmgdir+"/"+sort266[viewarg.getId()]
}
lays66.setBackgroundDrawable(bg66ac);
           }catch(e){print(e+" #"+e.lineNumber)}
  }
   }));

    button5.setLayoutParams(params66buttons);
lay66.addView(button5);

}
var utton5s = new TextView(ctx);
 utton5s.setGravity(Gravity.CENTER);  
 utton5s.setTextColor(Color.parseColor('#ffffff'));
 utton5s.setPadding(5, 15, 5, 15);
    utton5s.setBackground(selector66blackbg);
    utton5s.setTextSize(12);
     utton5s.setText("select puth");
    utton5s.setLayoutParams(params66buttons);
    utton5s.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
select_puth = selmgdir+"/"
if(event==0){
GUIL66.dismiss();
dopddialog(1,"копирование элемента","копировать "+countselector+" элемент"+wordcorrect(countselector)+"\n из "+amster_OS.createsystemapps.my_explorer.explor_dir+"/ \n в"+select_puth+" ?",bg66ac)
}
if(event==1){
GUIL66.dismiss();
dopddialog(2,"вырезка элемента","вырезать "+countselector+" элемент"+wordcorrect(countselector)+"\n из "+amster_OS.createsystemapps.my_explorer.explor_dir+"/ \n в"+select_puth+" ?",bg66ac)
}
amster_OS.graphics.print("выбранный путь: "+select_puth);
           }catch(e){print(e+" #"+e.lineNumber)}
  }
   }));
if(type=="folder"){
lay66.addView(utton5s);
}
}
buttons66();
        
        GUIL66= new PopupWindow(lays66, UiWidth/3.5, UiHeight/1.4);
            GUIL66.setBackgroundDrawable(guibg123); 
GUIL66.setFocusable(true); 
            GUIL66.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
}
        GUILA= new PopupWindow(lays, MCH_PNT, MCH_PNT);
            GUILA.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
GUILA.setAnimationStyle(animation);
            GUILA.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
openerdops();
   
function wordcorrect(numb){
let txt = "";
if(numb>0)txt = "";
if(numb>1)txt = "а";
if(numb>4)txt = "ов";
return txt;
}
function wordcorrect2(numb){
let txt = "";
if(numb>0)txt = "";
if(numb>1)txt = "о";
return txt;
}
},
setdir: function(type,view,filter){
var copy_exp_dir=amster_OS.createsystemapps.my_explorer.explor_dir;
var bg3= new GradientDrawable();
bg3.setColor(Color.parseColor("#2374E7")); // #282923
var bg2 = new GradientDrawable();
bg2.setColor(Color.parseColor("#2374E7")); // #282923
var black_bg = new GradientDrawable();
black_bg.setColor(Color.BLACK);

var bg1 = new GradientDrawable();
bg1.setColor(Color.TRANSPARENT);
bg1.setStroke(5, Color.BLACK);

var params = new LayoutParams(MCH_PNT, WR_CNT);
params.setMargins(2,2,2,2);

var lay1 = new LinearLayout(ctx);
lay1.setOrientation(1);
var lay2= new LinearLayout(ctx);
lay2.setOrientation(0);
var lays = new LinearLayout(ctx);
lays.setOrientation(1);
lays.setBackgroundDrawable(bg2);

        var scroll1 = new ScrollView(ctx);
        var scroll2 = new android.widget.HorizontalScrollView(ctx);
        scroll2.setVerticalScrollBarEnabled(false)
        scroll1.addView(lay1);  
        scroll2.addView(lay2);  

var searchbtn = new EditText(ctx);
 searchbtn.setGravity(Gravity.CENTER);   
searchbtn.setTextColor(Color.parseColor('#ffffff'));
 searchbtn.setTextSize(9);
searchbtn.setHintTextColor(Color.parseColor("#ffffff"));
searchbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
searchbtn.setHint("поиск");
searchbtn.setMaxLines(1);  
searchbtn.getBackground().mutate().setColorFilter(Color.BLACK, android.graphics.PorterDuff.Mode.SRC_IN);
    searchbtn.addTextChangedListener(new android.text.TextWatcher({
     afterTextChanged: function (text) {
  {
generateCatalog(text);
}
    }
    }));
lays.addView(searchbtn);

        lays.addView(scroll2);     
        lays.addView(scroll1);     

        var all_files =  new File(copy_exp_dir).list();

        function gen_path(){
        	var split_cur_path = (""+copy_exp_dir).split("/");
        for(var i=0; i<split_cur_path.length; i++){
        var file_btn7 = new TextView(ctx);
 file_btn7.setGravity(Gravity.CENTER);   file_btn7.setTextColor(Color.BLACK);
    file_btn7.setTextSize(9);
    file_btn7.setId(i)
    file_btn7.setPadding(5, 15, 5, 15);
     file_btn7.setText(split_cur_path[i])
 file_btn7.setLayoutParams(new LayoutParams(WR_CNT, UiWidth/16));
     file_btn7.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
     	try{
     copy_exp_dir = split_cur_path.slice(0,viewarg.getId()+1).join("/");
     all_files =  new File(copy_exp_dir).list();
    lay2.removeAllViews();
    generateCatalog();
    gen_path();
     }catch(e){print(e+" #"+e.lineNumber)}
     }}));
    lay2.addView(file_btn7);
    var btton57 = new TextView(ctx);
 btton57.setGravity(Gravity.CENTER);   btton57.setTextColor(Color.BLACK);
    btton57.setTextSize(9);
    btton57.setPadding(5, 15, 5, 15);
     btton57.setText("/");        
    lay2.addView(btton57);
    }
        lay2.setBackground(bg3);
   }
gen_path();     

function generateCatalog(sss){
lay1.removeAllViews();
var sort_files = [];var sort_folders = [];
for(var i in all_files){
	if(new File(copy_exp_dir+"/"+all_files[i]).isFile()){
sort_files.push(all_files[i])
}else{
sort_folders.push(all_files[i])
	}
}
sort_files.sort();
sort_folders.sort();
for(var i in sort_folders){
var folder_btn = new TextView(ctx);
 folder_btn.setGravity(Gravity.LEFT);   folder_btn.setTextColor(Color.parseColor('#ffffff'));
 folder_btn.setPadding(5, 15, 5, 15);
    folder_btn.setBackground(black_bg);
    folder_btn.setTextSize(12);
     folder_btn.setText("📂 "+sort_folders[i]);    // folder
     
    folder_btn.setId(i);
    folder_btn.setLayoutParams(params);
    folder_btn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
    	copy_exp_dir = copy_exp_dir+"/"+sort_folders[viewarg.getId()]
    all_files =  new File(copy_exp_dir).list();
    	lay1.removeAllViews();
    lay2.removeAllViews();
    generateCatalog();
    gen_path();
lays.setBackgroundDrawable(bg2);
           }catch(e){print(e+" #"+e.lineNumber)}
  }
   }));
if(sort_folders[i]!="amster_OS"){
if(!sss){
lay1.addView(folder_btn);
    }else if(sort_folders[i].toLowerCase().indexOf(sss)!=-1){
lay1.addView(folder_btn);
}}
}
for(var i in sort_files){
var file_btn = new TextView(ctx);
 file_btn.setGravity(Gravity.LEFT);   file_btn.setTextColor(Color.parseColor('#ffffff'));
 file_btn.setPadding(5, 15, 5, 15);
    file_btn.setBackground(black_bg);
    file_btn.setTextSize(12);
     file_btn.setText("📄 "+sort_files[i]);    // file
    file_btn.setId(i);
file_btn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
var curdir =copy_exp_dir+"/"+sort_files[viewarg.getId()];
view.setText(curdir);
amster_OS.graphics.print("Выбранный файл: "+sort_files[viewarg.getId()]+"\nЕго путь: "+curdir);
CGUI.dismiss();
lays.setBackgroundDrawable(bg2);
           }catch(e){print(e+" #"+e.lineNumber)}
  }
   }));
file_btn.setLayoutParams(params);

if(type=="file"){
if(filter!=null){
for(var a in filter){
if(sort_files[i].endsWith(filter[a])){
if(!sss){
lay1.addView(file_btn);
}else if(sort_files[i].toLowerCase().indexOf(sss)!=-1){
lay1.addView(file_btn);
}
}
}
}else{
if(!sss){
lay1.addView(file_btn);
}else if(sort_files[i].toLowerCase().indexOf(sss)!=-1){
lay1.addView(file_btn);
}
}
}
}


var set_path_btn = new TextView(ctx);
 set_path_btn.setGravity(Gravity.CENTER);  
 set_path_btn.setTextColor(Color.parseColor('#ffffff'));
 set_path_btn.setPadding(5, 15, 5, 15);
    set_path_btn.setBackground(black_bg);
    set_path_btn.setTextSize(12);
     set_path_btn.setText("select puth");
    set_path_btn.setLayoutParams(params);
    set_path_btn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
    	try{
var curdir =copy_exp_dir+"/"
view.setText(curdir);
CGUI.dismiss();
amster_OS.graphics.print("выбранный путь: "+curdir);
           }catch(e){print(e+" #"+e.lineNumber)}
  }
   }));
if(type=="folder"){
lay1.addView(set_path_btn);
}
}
generateCatalog();
        
CGUI= new PopupWindow(lays, UiWidth/3.5, UiHeight/1.4);
CGUI.setBackgroundDrawable(bg1); 
CGUI.setFocusable(true); 
CGUI.setAnimationStyle(animations.toast);
CGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
settings: function(dir,nam1,nam2,vibrano){
dir=dir+"/"
       var selector_blackbg = new GradientDrawable();
selector_blackbg.setColor(Color.BLACK);
var bg_ac = new GradientDrawable();
bg_ac.setStroke(2, Color.parseColor('#2374E7'));
bg_ac.setColor(Color.parseColor("#2374E7")); // #282923
	

var sortname=[];
for(var i in nam1){
if(nam1[i]!="pust")sortname.push(nam1[i])
}
for(var i in nam2){
if(nam2[i]!="pust")sortname.push(nam2[i])
}


var lay = new LinearLayout(ctx);        
        var lays = new LinearLayout(ctx);
        lays.setOrientation(1);
        lay.setOrientation(1);        
var layss = new LinearLayout(ctx);
        layss.setOrientation(0);
lays.setBackgroundDrawable(bg_ac);
          var menuScroll1 = new ScrollView(ctx);      
  menuScroll1.addView(lay);  
        lays.addView(menuScroll1);     

var button5448 = new TextView(ctx);
 button5448.setGravity(Gravity.CENTER);   button5448.setTextColor(Color.parseColor('#FFFFFF'));
    button5448.setTextSize(13);    
     button5448.setText("свойства");   
lay.addView(button5448);

if(vibrano>1){
var filesizes = 0;
var filenames = [];
for(var i in sortname){
var filess = File(sortname[i])
filenames.push(filess.getName())
filesizes=filesizes+parseInt(filess.length());
}

  var button548 = new TextView(ctx);
 button548.setGravity(Gravity.LEFT);   button548.setTextColor(Color.parseColor('#FFFFFF'));
    button548.setBackground(selector_blackbg);
    button548.setTextSize(10);
    button548.setText(fromHtml("<font color='#2374E7'>Названия</font>: "+filenames+"<br/><font color='#2374E7'>Путь</font>: "+dir+"<br/><font color='#2374E7'>Размер</font>: "+amster_OS.fast_files.convertSize(filesizes)+" ("+filesizes+" байт)<br/>"));
    button548.setPadding(5, 10, 5, 0);
lay.addView(button548);
}
if(vibrano==1){
var filess = new File(sortname[0])
var namesf = filess.getName();
  var button548 = new TextView(ctx);
 button548.setGravity(Gravity.LEFT);   button548.setTextColor(Color.parseColor('#FFFFFF'));
    button548.setBackground(selector_blackbg);
    button548.setTextSize(10);
    button548.setText(fromHtml("<font color='#2374E7'>Название</font>: "+namesf+"<br/><font color='#2374E7'>Путь</font>: "+dir+"<br/><font color='#2374E7'>Type</font>: "+amster_OS.fast_files.getFileFormat(filess)+"<br/><font color='#2374E7'>Размер</font>: "+amster_OS.fast_files.convertSize(filess.length())+" ("+filess.length()+" байт)<br/><font color='#2374E7'>Последние изменения: </font>: "+getLastMod(filess)+"<br/><font color='#2374E7'>Скрытый: </font>: "+getInvisFiles(filess)+"<br/><font color='#2374E7'>Hash: </font>: "+filess.hashCode()+"<br/>"));
    button548.setPadding(5, 10, 5, 0);
lay.addView(button548);


var button54_ = new TextView(ctx);
 button54_.setGravity(Gravity.CENTER);   button54_.setTextColor(Color.parseColor('#FFFFFF'));
    button54_.setBackground(selector_blackbg);
    button54_.setTextSize(16);
button54_.setPadding(5, 10, 5, 0);
    button54_.setText(fromHtml("<b><font color='#ffffff'>Проиграть трек</font><b>"));
button54_.setOnClickListener(new View.OnClickListener({
onClick: function(viewarg) {
amster_OS.createsystemapps.mpplayer.getFastPlayer(filess.getPath())
}
}));
if(sortname[0].indexOf(".mp3")!=-1||sortname[0].indexOf(".ogg")!=-1){
lay.addView(button54_);
}
lay.addView(layss);
var uttoncopy1 = new TextView(ctx);
 uttoncopy1.setGravity(Gravity.CENTER);   uttoncopy1.setTextColor(Color.parseColor('#FFFFFF'));
    uttoncopy1.setTextSize(10);    
uttoncopy1.setLayoutParams(new LayoutParams(UiWidth/8, WR_CNT));
     uttoncopy1.setText("копировать имя");   
uttoncopy1.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
    ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(namesf);
amster_OS.graphics.print("скопировано: "+namesf)
    }
    }));
layss.addView(uttoncopy1);
var uttoncopy2 = new TextView(ctx);
 uttoncopy2.setGravity(Gravity.CENTER);   uttoncopy2.setTextColor(Color.parseColor('#FFFFFF'));
    uttoncopy2.setTextSize(10);    
uttoncopy2.setLayoutParams(new LayoutParams(UiWidth/8, WR_CNT));
     uttoncopy2.setText("копировать путь");   
uttoncopy2.setOnClickListener(new View.OnClickListener({
    onClick: function(view){
ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(dir);
amster_OS.graphics.print("скопиповано: "+dir)
    }
    }));
layss.addView(uttoncopy2);
}

        GUIS = new PopupWindow(lays, UiWidth/4, WR_CNT);
            GUIS.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
            GUIS.setFocusable(true); 
            GUIS.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);

function getLastMod(fl123){
var unix = fl123.lastModified()
var aunix = new Date(unix).toLocaleTimeString("en-US");
return aunix;
}
function getInvisFiles(fl123){
if(fl123.isHidden()){
return "да"
} else {
return "нет"
}
}
}
},
advertisement:{
name:"Партнёр",
version:"1.0",
labels:"none",
init: function (){
amster_OS.createsystemapps.advertisement.menu();
},
menu: function(){
var lays = new LinearLayout(ctx);
lays.setOrientation(1);
var exitbtn = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
exitbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(40), amster_OS.screen.dipSize(40)));
    exitbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
menu_ui.dismiss();
   }}));
lays.addView(exitbtn);
if(amster_OS.web.getType()!="none"){
var errorbtn;
var r  = new java.lang.Runnable() {
        run: function() {
errorbtn = (""+amster_OS.web.getTextFromURL("https://raw.githubusercontent.com/Smartman09/amster_OS/main/ads.txt")).toString();
}}
var threadt = new Thread(r);
    threadt.start();
Thread.sleep(1000);   
var viewr = new amster_OS.graphics.easyWebPage(errorbtn);
lays.addView(viewr);
}else{
var errorbtn = new TextView(ctx);
errorbtn.setGravity(Gravity.CENTER);   
errorbtn.setTextSize(15);
errorbtn.setAllCaps(false);
errorbtn.setTextColor(Color.parseColor('#ffffff'));
errorbtn.setText("ошибка подключения");
lays.addView(errorbtn);
}
menu_ui= amster_OS.graphics.easyPopup(lays,new ColorDrawable(Color.parseColor("#202020")));
}
},
txt_editor:{
name:"Редактор текста",
version:"1.0",
labels:"none",
curtext:null,
curline:null,
path:null,
init: function (){
amster_OS.createsystemapps.txt_editor.menu();
},
setBg: function(cl){
var bg = new GradientDrawable();
bg.setColor(Color.parseColor(cl));
bg.setStroke(4,Color.parseColor("#d3d3d3"));
return bg;
},
menu: function(path){

   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var layss = new LinearLayout(ctx);
  layss.setOrientation(1);
var lay = new LinearLayout(ctx);
  lay.setOrientation(0);
lay.setBackgroundDrawable(amster_OS.createsystemapps.txt_editor.setBg("#c0c0c0"));
var lay1= new LinearLayout(ctx);
  lay1.setOrientation(0);
var scroll = new ScrollView(ctx);
var scroll2 = new android.widget.HorizontalScrollView(ctx);
scroll2.addView(layss);
scroll.addView(scroll2);
layss.addView(lay1);
lays.addView(lay);
lays.addView(scroll);

var exitbtn = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
exitbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(40), amster_OS.screen.dipSize(40)));
    exitbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
menushka.dismiss();
   }}));
lay.addView(exitbtn);

var names = ["файл","сохранить","сохранить как","поиск","статистика","поделиться"];
for(var i in names){
var openfile = new TextView(ctx);
openfile.setGravity(Gravity.CENTER);   
openfile.setTextSize(15);
openfile.setAllCaps(false);
openfile.setTextColor(Color.parseColor('#ffffff'));
openfile.setText(fromHtml('<b><font color="#ffffff">'+names[i]+'</font></b>'));
openfile.setPadding(15,20,15,5);
openfile.setShadowLayer(5,0,0,Color.BLACK);
openfile.setId(i);
openfile.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
var id = viewarg.getId();
if(id==0){
amster_OS.createsystemapps.txt_editor.window(id);
}else if(id==1){
try{
if(path!=null){
amster_OS.fast_files.rewriteFile(path,amster_OS.createsystemapps.txt_editor.curtext.getText());
amster_OS.graphics.print("сохранено: "+path);
}else if(amster_OS.createsystemapps.txt_editor.path!=null){
amster_OS.fast_files.rewriteFile(amster_OS.createsystemapps.txt_editor.path,amster_OS.createsystemapps.txt_editor.curtext.getText());
amster_OS.graphics.print("сохранено: "+amster_OS.createsystemapps.txt_editor.path);
}else{
amster_OS.graphics.print("используйте функцию 'сохранить как'");
}
}catch(e){print(e)}
}else if(id==2){
amster_OS.createsystemapps.txt_editor.window(id);
}else if(id==3){
amster_OS.createsystemapps.txt_editor.window(id);
}else if(id==4){
amster_OS.createsystemapps.txt_editor.window(id);
}else if(id==5){
if(path!=null){
var intent = new Intent(Intent.ACTION_SEND);
intent.setType("text/plain");
intent.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://" + path));
intent.putExtra(Intent.EXTRA_SUBJECT, path);
ctx.startActivity(intent);
}else if(amster_OS.createsystemapps.txt_editor.path!=null){
var intent = new Intent(Intent.ACTION_SEND);
intent.setType("text/plain");
intent.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://" + amster_OS.createsystemapps.txt_editor.path));
intent.putExtra(Intent.EXTRA_SUBJECT, amster_OS.createsystemapps.txt_editor.path);
ctx.startActivity(intent);
}
}
     }}));
lay.addView(openfile);
}
amster_OS.createsystemapps.txt_editor.curtext = new EditText(ctx);
amster_OS.createsystemapps.txt_editor.curtext.setGravity(Gravity.LEFT);   
amster_OS.createsystemapps.txt_editor.curtext.setTextSize(20);
amster_OS.createsystemapps.txt_editor.curtext.setPadding(20,0,0,0);
amster_OS.createsystemapps.txt_editor.curtext.setInputType(android.text.InputType.TYPE_TEXT_FLAG_MULTI_LINE);
amster_OS.createsystemapps.txt_editor.curtext.setSingleLine(false);
amster_OS.createsystemapps.txt_editor.curtext.setHorizontallyScrolling(true);
amster_OS.createsystemapps.txt_editor.curtext.getBackground().mutate().setColorFilter(Color.TRANSPARENT, android.graphics.PorterDuff.Mode.SRC_IN);
amster_OS.createsystemapps.txt_editor.curtext.setAllCaps(false);
var mytxt;
if(path!=null){
mytxt=amster_OS.fast_files.readFile(path);
}else{
mytxt="hello world!";
}
amster_OS.createsystemapps.txt_editor.curtext.setText(amster_OS.createsystemapps.txt_editor.highlightSyntax(mytxt));

var getText = (""+amster_OS.createsystemapps.txt_editor.curtext.getText()).split("\n");
var text="";
for(var i = 0; i < getText.length-1; i++){
text = text+(i+1)+"\n";
}
amster_OS.createsystemapps.txt_editor.curline = new TextView(ctx);
amster_OS.createsystemapps.txt_editor.curline.setGravity(Gravity.CENTER);
amster_OS.createsystemapps.txt_editor.curline.setTextSize(20);
amster_OS.createsystemapps.txt_editor.curline.setText(text);   
lay1.addView(amster_OS.createsystemapps.txt_editor.curline);
lay1.addView(amster_OS.createsystemapps.txt_editor.curtext);

menushka= new PopupWindow(lays, UiWidth/1, UiHeight/1);      
menushka.setBackgroundDrawable(amster_OS.createsystemapps.txt_editor.setBg("#ffffff")); 
menushka.setFocusable(true);
menushka.setAnimationStyle(animation);
menushka.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
openblack: function (){
  BLACKPHONE= new amster_OS.graphics.black_back();
},
getwindbg: function(){
var bg = new GradientDrawable();
bg.setColor(Color.parseColor('#ffffff'));
bg.setCornerRadius(50);
bg.setStroke(5,Color.parseColor('#878787'));
return bg;
},
window: function(id){
amster_OS.createsystemapps.txt_editor.openblack();
var lays = new LinearLayout(ctx);
 lays.setOrientation(1);
if(id==0){
var btnputh1 = new EditText(ctx);
 btnputh1.setGravity(Gravity.LEFT);  
 btnputh1.setTextColor(Color.parseColor("#000000"));
    btnputh1.setTextSize(15);
if(amster_OS.createsystemapps.txt_editor.path){
     btnputh1.setText(amster_OS.createsystemapps.txt_editor.path);    
}else{
btnputh1.setText("none");    
}
btnputh1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.createsystemapps.my_explorer.setdir("file",viewarg,[".txt",".js",".xml",".properties",".lua"]);
} catch(e){print(e)}
   }}));
lays.addView(btnputh1);

var openfile = new TextView(ctx);
openfile.setGravity(Gravity.CENTER);   
openfile.setTextSize(15);
openfile.setAllCaps(false);
openfile.setBackground(amster_OS.createsystemapps.txt_editor.getwindbg());
openfile.setTextColor(Color.parseColor('#000000'));
openfile.setText("открыть");
openfile.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(btnputh1.getText()!="none"){
amster_OS.createsystemapps.txt_editor.path=btnputh1.getText().toString();
var text = amster_OS.fast_files.readFile(btnputh1.getText().toString());
amster_OS.createsystemapps.txt_editor.curtext.setText(amster_OS.createsystemapps.txt_editor.highlightSyntax(text));
var getText = (""+amster_OS.createsystemapps.txt_editor.curtext.getText()).split("\n");
var texts="";
for(var i = 0; i < getText.length-1; i++){
texts = texts+(i+1)+"\n";
}
amster_OS.createsystemapps.txt_editor.curline.setText(texts);
}
my_ui.dismiss();
BLACKPHONE.dismiss();
}catch(e){print(e)}
     }}));
lays.addView(openfile);
}
if(id==2){
var btnputh1 = new EditText(ctx);
 btnputh1.setGravity(Gravity.LEFT);  
 btnputh1.setTextColor(Color.parseColor("#000000"));
    btnputh1.setTextSize(15);
btnputh1.setText("none");    
btnputh1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.createsystemapps.my_explorer.setdir("folder",viewarg);
} catch(e){print(e)}
   }}));
lays.addView(btnputh1);
var btnname1 = new EditText(ctx);
 btnname1.setGravity(Gravity.LEFT);  
 btnname1.setTextColor(Color.parseColor("#000000"));
    btnname1.setTextSize(15);
btnname1.setText("none");    
btnname1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.start_os.openedit(viewarg);
} catch(e){print(e)}
   }}));
lays.addView(btnname1);

var exitfile = new TextView(ctx);
exitfile.setGravity(Gravity.CENTER);   
exitfile.setTextSize(15);
exitfile.setAllCaps(false);
exitfile.setBackground(amster_OS.createsystemapps.txt_editor.getwindbg());
exitfile.setTextColor(Color.parseColor('#000000'));
exitfile.setText("закрыть");
exitfile.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
my_ui.dismiss();
BLACKPHONE.dismiss();
     }}));
lays.addView(exitfile);
var openfile = new TextView(ctx);
openfile.setGravity(Gravity.CENTER);   
openfile.setTextSize(15);
openfile.setAllCaps(false);
openfile.setBackground(amster_OS.createsystemapps.txt_editor.getwindbg());
openfile.setTextColor(Color.parseColor('#000000'));
openfile.setText("сохранить");
openfile.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
var path = btnputh1.getText();
var name = btnname1.getText();
if(path!="none"&&name!="none"){
var file = new File(path+name);
if(!file.exists()){
file.createNewFile();
}
amster_OS.graphics.print(name+" создан.");
amster_OS.fast_files.rewriteFile(path+name,amster_OS.createsystemapps.txt_editor.curtext.getText());
my_ui.dismiss();
BLACKPHONE.dismiss();
}
}catch(e){print(e)}
     }}));
lays.addView(openfile);
}

if(id==3){
var btnname1 = new EditText(ctx);
 btnname1.setGravity(Gravity.LEFT);  
 btnname1.setTextColor(Color.parseColor("#000000"));
    btnname1.setTextSize(15);
btnname1.setHint("искать");    
btnname1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.start_os.openedit(viewarg);
} catch(e){print(e)}
   }}));
lays.addView(btnname1);
var btnname2 = new EditText(ctx);
 btnname2.setGravity(Gravity.LEFT);  
 btnname2.setTextColor(Color.parseColor("#000000"));
    btnname2.setTextSize(15);
btnname2.setHint("заменить на");    
btnname2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
amster_OS.start_os.openedit(viewarg);
} catch(e){print(e)}
   }}));
lays.addView(btnname2);
var exitfile = new TextView(ctx);
exitfile.setGravity(Gravity.CENTER);   
exitfile.setTextSize(15);
exitfile.setAllCaps(false);
exitfile.setBackground(amster_OS.createsystemapps.txt_editor.getwindbg());
exitfile.setTextColor(Color.parseColor('#000000'));
exitfile.setText("закрыть");
exitfile.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
my_ui.dismiss();
BLACKPHONE.dismiss();
     }}));
lays.addView(exitfile);
var openfile = new TextView(ctx);
openfile.setGravity(Gravity.CENTER);   
openfile.setTextSize(15);
openfile.setAllCaps(false);
openfile.setBackground(amster_OS.createsystemapps.txt_editor.getwindbg());
openfile.setTextColor(Color.parseColor('#000000'));
openfile.setText("ok");
openfile.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
var searching = btnname1.getText();
var replaced = btnname2.getText();
var text = amster_OS.createsystemapps.txt_editor.curtext.getText().toString();
var newtxt = (""+text).split(searching).join(replaced);

amster_OS.createsystemapps.txt_editor.curtext.setText(amster_OS.createsystemapps.txt_editor.highlightSyntax(newtxt))
var getText = (""+amster_OS.createsystemapps.txt_editor.curtext.getText()).split("\n");
var texts="";
for(var i = 0; i < getText.length-1; i++){
texts = texts+(i+1)+"\n";
}
amster_OS.createsystemapps.txt_editor.curline.setText(texts);
amster_OS.graphics.print("заменено "+(""+text).split(searching).length+" слов.")
my_ui.dismiss();
BLACKPHONE.dismiss();
}catch(e){print(e)}
     }}));
lays.addView(openfile);
}
if(id==4){
var text = amster_OS.createsystemapps.txt_editor.curtext.getText();
var strokes = (""+text).split("\n").length-1;
var words = (""+text).split(" ").length;
var symbols = text.length();

var btnputh1 = new TextView(ctx);
 btnputh1.setGravity(Gravity.CENTER);  
 btnputh1.setTextColor(Color.parseColor("#000000"));
    btnputh1.setTextSize(15);
btnputh1.setText("Статистика\nСтрок - "+strokes+"\nСлов - "+words+"\nСимволов - "+symbols);    
btnputh1.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(btnputh1.getText());
amster_OS.graphics.print("скопировано: "+btnputh1.getText())
     }}));
lays.addView(btnputh1);

var openfile = new TextView(ctx);
openfile.setGravity(Gravity.CENTER);   
openfile.setTextSize(15);
openfile.setAllCaps(false);
openfile.setBackground(amster_OS.createsystemapps.txt_editor.getwindbg());
openfile.setTextColor(Color.parseColor('#000000'));
openfile.setText("закрыть");
openfile.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
my_ui.dismiss();
BLACKPHONE.dismiss();
}catch(e){print(e)}
     }}));
lays.addView(openfile);
}

my_ui= new PopupWindow(lays, UiWidth/6, WR_CNT);      
my_ui.setBackgroundDrawable(amster_OS.createsystemapps.txt_editor.getwindbg()); 
my_ui.setAnimationStyle(animations.toast);
my_ui.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
highlightSyntax: function(code) {
        var stringBuilder = new android.text.SpannableStringBuilder(code);
        var uppercasePattern = "\\b[A-Z][A-Za-z0-9_]*\\b";
this.applyForegroundColor(stringBuilder, uppercasePattern, Color.parseColor("#f056e0"));
var keywordsPattern = "\\b(for|while|function|try|catch|var|finally|new|if|true|false|null|undefined)\\b";
        this.applyForegroundColor(stringBuilder, keywordsPattern, Color.parseColor("#1957d4"));
var numbersPattern = "\\b\\d+\\b";
        this.applyForegroundColor(stringBuilder, numbersPattern, Color.parseColor("#069cc9"));
var quotesPattern = "\"[^\"]*\"";
        this.applyForegroundColor(stringBuilder, quotesPattern, Color.parseColor("#b5941d"));
       var symbolsPattern = "([(){}\\[\\].,!?;:])";
        this.applyForegroundColor(stringBuilder, symbolsPattern, Color.parseColor("#ff6208"));
var commentsPattern = "//.*|/\\*(.|\\n)*?\\*/";
        this.applyForegroundColor(stringBuilder, commentsPattern, Color.parseColor("#099e0e"));
 return stringBuilder;
    },
applyForegroundColor: function(stringBuilder, pattern, color) {
        var regexPattern = java.util.regex.Pattern.compile(pattern);
        var matcher = regexPattern.matcher(stringBuilder);

        while (matcher.find()) {
            var span = new android.text.style.ForegroundColorSpan(color);
            stringBuilder.setSpan(span, matcher.start(), matcher.end(), android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
    }
},
rootchecker:{
name:"Root Checker",
version:"1.0",
labels:"none",
init: function (){
this.rootInfo();
},
isDeviceRooted: function() {
  return this.checkRootMethod1() && this.checkRootMethod2() && this.checkRootMethod3();
},
checkRootMethod1: function() {
  let buildTags = android.os.Build.TAGS;
  return buildTags != null && buildTags.includes("test-keys");
},
checkRootMethod2: function() {
  let paths = [
    "/system/app/Superuser.apk",
    "/sbin/su",
    "/system/bin/su",
    "/system/xbin/su",
    "/data/local/xbin/su",
    "/data/local/bin/su",
    "/system/sd/xbin/su",
    "/system/bin/failsafe/su",
    "/data/local/su",
    "/su/bin/su"
  ];

  for (let i = 0; i < paths.length; i++) {
    if (new File(paths[i]).exists()) {
      return true;
    }
  }

  return false;
},
checkRootMethod3: function() {
  let process;

  try {
    process = Runtime.getRuntime().exec(["/system/xbin/which", "su"]);
    let ink = new BufferedReader(new InputStreamReader(process.getInputStream()));

    if (ink.readLine() != null) {
      return true;
    }

    return false;
  } catch (t) {
    return false;
  } finally {
    if (process != null) {
      process.destroy();
    }
  }
},
rootInfo: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);

  ROOTINFGUI= new PopupWindow(lays, MCH_PNT, MCH_PNT);      
ROOTINFGUI.setAnimationStyle(animation);
ROOTINFGUI.setBackgroundDrawable(new ColorDrawable(Color.WHITE));
            ROOTINFGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);

function rootAct(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var bg_d2 = new GradientDrawable();
bg_d2.setStroke(7, Color.parseColor("#039be5"));
bg_d2.setColor(Color.TRANSPARENT);
bg_d2.setCornerRadius(300);

var rootbtn = new TextView(ctx);
 rootbtn.setGravity(Gravity.CENTER);   
rootbtn.setTextColor(Color.parseColor('#ffffff'));
    rootbtn.setTextSize(30);
rootbtn.setLayoutParams(new LayoutParams(UiWidth/4, UiWidth/4));
rootbtn.setBackground(bg_d2);
     rootbtn.setText(fromHtml('<b><font color="gray">check root</font></b>'))
    rootbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
if(amster_OS.createsystemapps.rootchecker.isDeviceRooted()){
bg_d2.setStroke(7, Color.parseColor("#00ff00"));
rootbtn.setBackground(bg_d2);
rootbtn.setText(fromHtml('<b><font color="gray">root </font></b><b><font color="green">YES</font></b>'))
}else{
bg_d2.setStroke(7, Color.parseColor("#ff0000"));
rootbtn.setBackground(bg_d2);
rootbtn.setText(fromHtml('<b><font color="gray">root </font></b><b><font color="red">NO</font></b>'))
}
   }}));
lays.addView(rootbtn);
var otrtup = new TextView(ctx);
 otrtup.setGravity(Gravity.CENTER);   
otrtup.setTextColor(Color.parseColor('#039be5'));
    otrtup.setTextSize(15);
     otrtup.setText(""+android.os.Build.MODEL+"\nAndroid "+android.os.Build.VERSION.RELEASE+" "+android.os.Build.ID);   
    
lays.addView(otrtup);

  ROOTGUI= new PopupWindow(lays, UiWidth/4, WR_CNT);      
ROOTGUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
ROOTGUI.setAnimationStyle(animation);
            ROOTGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
}
function rootExit(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(0);
var exitsetbtn = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(45), amster_OS.screen.dipSize(45)));
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
CRAGUI.dismiss();
ROOTGUI.dismiss();
ROOTINFGUI.dismiss();
   }}));
lays.addView(exitsetbtn);

var namebtn = new Button(ctx);
 namebtn.setGravity(Gravity.RIGHT);   namebtn.setTextColor(Color.parseColor('#ffffff'));
namebtn.setLayoutParams(new LayoutParams(MCH_PNT, amster_OS.screen.dipSize(45)));
    namebtn.setTextSize(20);
namebtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
     namebtn.setText("root checker");   
lays.addView(namebtn);

  CRAGUI= new PopupWindow(lays, MCH_PNT, amster_OS.screen.dipSize(45));      
CRAGUI.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#039be5")));
CRAGUI.setAnimationStyle(animation);
            CRAGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP,0, 0);
}
rootAct();
rootExit();
}
},
myapps:{
name:"My Apps",
version:"1.0",
labels:"none",
inited:false,
init: function (){
if(!this.inited){
this.applicationMenu();
this.inited=true;
}
},
applicationMenu: function(texting){
var searchapps;
var metadat;
     var black_bg = new GradientDrawable();
black_bg.setColor(Color.parseColor('#ffffff'));
   if(texting!=null)searchapps=texting;
var lays = new GridLayout(ctx);
lays.setColumnCount(2);
lays.setLayoutParams(new LayoutParams(MCH_PNT, UiHeight/6));
var layss = new LinearLayout(ctx);
  layss.setOrientation(1);
var scroll = new ScrollView(ctx);
scroll.setVerticalScrollBarEnabled(false)
scroll.addView(lays);
layss.addView(scroll);

function updatebtn(sss){
lays.removeAllViews();
metadat = ctx.getPackageManager().getInstalledApplications(0)
for (var i=0; i < metadat.size(); i++) {
let info = metadat.get(i)
var appget=ctx.getPackageManager().getApplicationInfo(info.packageName,0)
var icon = appget.loadIcon(ctx.getPackageManager())

var appiconbtn = new TextView(ctx);
appiconbtn.setBackgroundDrawable(icon)
 appiconbtn.setLayoutParams(new LayoutParams(UiWidth/10, UiHeight/8));
appiconbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){        
 var bgac = new GradientDrawable();
bgac.setColor(Color.parseColor("#ffffff")); // #282923
bgac.setStroke(5,Color.parseColor("#878787"));
var miscDialog = new android.app.Dialog(ctx);
     miscDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
     var dialogLayout = new LinearLayout(ctx);
     dialogLayout.setOrientation(1);

     var b1utton1 = new Button(ctx);
     b1utton1.setText(fromHtml('<b><font color="#878787">запуск</font></b>')); 
     b1utton1.setTextColor(Color.parseColor('#878787'));   
 b1utton1.setTextSize(15);
b1utton1.setBackground(bgac); 
b1utton1.setGravity(Gravity.CENTER);
     b1utton1.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
amster_OS.graphics.print("запускается "+info.packageName);
ctx.startActivity(ctx.getPackageManager().getLaunchIntentForPackage(info.packageName));
     	miscDialog.dismiss();
      } 
     })); 
     dialogLayout.addView(b1utton1);
var b1utton3 = new Button(ctx);
     b1utton3.setText(fromHtml('<b><font color="#878787">удалить</font></b>')); 
     b1utton3.setTextColor(Color.parseColor('#878787'));   
 b1utton3.setTextSize(15);
b1utton3.setBackground(bgac); 
b1utton3.setGravity(Gravity.CENTER);
     b1utton3.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
var intent = new Intent(Intent.ACTION_DELETE);
intent.setData(Uri.parse("package:" + info.packageName));
ctx.startActivity(intent);
updatebtn()
     	miscDialog.dismiss();
      } 
     })); 
     dialogLayout.addView(b1utton3);
var b1utton2 = new Button(ctx);
     b1utton2.setText(fromHtml('<b><font color="#878787">копировать информацию</font></b>')); 
     b1utton2.setTextColor(Color.parseColor('#878787'));   
 b1utton2.setTextSize(15);
b1utton2.setBackground(bgac); 
b1utton2.setGravity(Gravity.CENTER);
     b1utton2.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
if(info.enabled){
ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText("Имя: "+info.loadLabel(ctx.getPackageManager()).toString()+"\nПакет: "+info.packageName+"\nВерсия(код): "+info.versionCode+"\nВключено: да\nИсходная директория: "+info.sourceDir+"\nДиректория с данными: "+info.dataDir+"\nБиблиотека: "+info.nativeLibraryDir)
amster_OS.graphics.print("Скопировано\nИмя: "+info.loadLabel(ctx.getPackageManager()).toString()+"\nПакет: "+info.packageName+"\nВерсия(код): "+info.versionCode+"\nВключено: да\nИсходная директория: "+info.sourceDir+"\nДиректория с данными: "+info.dataDir+"\nБиблиотека: "+info.nativeLibraryDir);
}else{
amster_OS.graphics.print("Скопировано\nИмя: "+info.loadLabel(ctx.getPackageManager()).toString()+"\nПакет: "+info.packageName+"\nВерсия(код): "+info.versionCode+"\nВключено: нет\nИсходная директория: "+info.sourceDir+"\nДиректория с данными: "+info.dataDir+"\nБиблиотека: "+info.nativeLibraryDir);
ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText("Имя: "+info.loadLabel(ctx.getPackageManager()).toString()+"\nПакет: "+info.packageName+"\nВерсия(код): "+info.versionCode+"\nВключено: нет\nИсходная директория: "+info.sourceDir+"\nДиректория с данными: "+info.dataDir+"\nБиблиотека: "+info.nativeLibraryDir)
}
    miscDialog.dismiss();
      } 
     })); 
     dialogLayout.addView(b1utton2);
     dialogLayout.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
  miscDialog.setContentView(dialogLayout);
 miscDialog.show();
}}));
if(!sss){
lays.addView(appiconbtn);
    }else if((info.loadLabel(ctx.getPackageManager()).toString()).toLowerCase().indexOf(sss)!=-1){
lays.addView(appiconbtn);
}
var appbg = new GradientDrawable();
appbg.setStroke(2, Color.BLACK);
appbg.setColor(Color.WHITE);
if(!sss){
lays.addView(amster_OS.createsystemapps.myapps.informationapps(info,appbg));
    }else{
 if((info.loadLabel(ctx.getPackageManager()).toString()).toLowerCase().indexOf(sss)!=-1){
lays.addView(amster_OS.createsystemapps.myapps.informationapps(info,appbg));
}}
}}
updatebtn(searchapps)

function shapkaMenu(){
     var uh_bg = new GradientDrawable();
uh_bg.setColor(Color.parseColor('#ffffff'));
uh_bg.setStroke(5,Color.parseColor("#878787"));
var lauoutop = new LinearLayout(ctx);
  lauoutop.setOrientation(0);
var updbtn = new Button(ctx);
 updbtn.setGravity(Gravity.LEFT); 
updbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); 
 updbtn.setTextColor(Color.parseColor('#000000'));
updbtn.setLayoutParams(new LayoutParams(UiWidth/4, WR_CNT));
updbtn.setTextSize(20);
updbtn.setText(fromHtml('<b><font color="#000000">обновить</font></b>'))
updbtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
updatebtn()
      } 
     })); 
lauoutop.addView(updbtn)
var searchbtn = new EditText(ctx);
searchbtn.setGravity(Gravity.CENTER);  
searchbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
searchbtn.setTextColor(Color.parseColor('#000000'));
searchbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
searchbtn.setHintTextColor(Color.parseColor("#000000"));
searchbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
    searchbtn.setTextSize(20);
searchbtn.setHint("нажмите для поиска приложений...");
searchbtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 

searchMenu(searchapps)
      } 
     })); 
lauoutop.addView(searchbtn)
var exitbtn = new Button(ctx);
 exitbtn.setGravity(Gravity.RIGHT);  
exitbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
 exitbtn.setTextColor(Color.parseColor('#878787'));
exitbtn.setLayoutParams(new LayoutParams(UiWidth/4, WR_CNT));
exitbtn.setText(fromHtml('<b><font color="#000000">выход</font></b>'))
    exitbtn.setTextSize(20);
exitbtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
amster_OS.createsystemapps.myapps.inited=false;
SHAPGUI.dismiss();
ACTIBGUI.dismiss();
      } 
     })); 
lauoutop.addView(exitbtn)
  SHAPGUI= new PopupWindow(lauoutop, MCH_PNT, WR_CNT);      
SHAPGUI.setBackgroundDrawable(uh_bg); 
            SHAPGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.TOP,0, 0);
}
function searchMenu(textgc){
     var uh_bg = new GradientDrawable();
uh_bg.setColor(Color.parseColor('#ffffff'));
var lauoutop = new LinearLayout(ctx);
  lauoutop.setOrientation(1);

var searchbtn = new EditText(ctx);
searchbtn.setGravity(Gravity.CENTER);  
searchbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
searchbtn.setTextColor(Color.parseColor('#000000'));
searchbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
searchbtn.setHintTextColor(Color.parseColor("#000000"));
searchbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
searchbtn.setMaxLines(2);  
    searchbtn.setTextSize(20);
if(searchapps!=null){
searchbtn.setText(searchapps)}
searchbtn.setHint("поиск из "+metadat.size()+" приложений...");
searchbtn.addTextChangedListener(new android.text.TextWatcher({
     afterTextChanged: function (text) {
  {
searchapps=text;
if(searchapps == null){
updatebtn();
}else{
updatebtn(searchapps)
}
}
    }
    }));
lauoutop.addView(searchbtn)

  SEARXHUI= new PopupWindow(lauoutop, UiWidth/2, WR_CNT);      
SEARXHUI.setBackgroundDrawable(uh_bg); 
SEARXHUI.setFocusable(true);      
            SEARXHUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.TOP,0, 0);
}
  ACTIBGUI= new PopupWindow(layss, UiWidth/1, UiHeight/1);      
ACTIBGUI.setBackgroundDrawable(black_bg); 
            ACTIBGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
   shapkaMenu();
},
informationapps: function(info,appbg){
var layss = new LinearLayout(ctx);
layss.setLayoutParams(new LayoutParams(MCH_PNT, WR_CNT));
layss.setBackgroundDrawable(appbg)
  layss.setOrientation(1);
var appinfobtn = new TextView(ctx);
 appinfobtn.setGravity(Gravity.CENTER);  
 appinfobtn.setTextColor(Color.parseColor('#000000'));
appinfobtn.setText(fromHtml('<b><font color="#000000"> '+info.loadLabel(ctx.getPackageManager()).toString()+'</font></b>'))
    appinfobtn.setTextSize(10);
layss.addView(appinfobtn)
var appinfobtn1 = new TextView(ctx);
 appinfobtn1.setGravity(Gravity.LEFT);  
 appinfobtn1.setTextColor(Color.parseColor('#878787'));
if(info.enabled){
appinfobtn1.setText("Пакет: "+info.packageName+"\nВерсия(код): "+info.versionCode+"\nВключено: да\nИсходная директория: "+info.sourceDir+" Директория с данными: "+info.dataDir+"\nБиблиотека: "+info.nativeLibraryDir)
}else{
appinfobtn1.setText("Пакет: "+info.packageName+"\nВерсия(код): "+info.versionCode+"\nВключено: нет\nИсходная директория: "+info.sourceDir+" Директория с данными: "+info.dataDir+"\nБиблиотека: "+info.nativeLibraryDir)
}
    appinfobtn1.setTextSize(7);
layss.addView(appinfobtn1)
return layss;
}
}
},



Info:{
getsystemapps: function (){
return [amster_OS.createsystemapps.crosszero,
amster_OS.createsystemapps.systemcalendar,
amster_OS.createsystemapps.simple_clicker,
amster_OS.createsystemapps.calculator,
amster_OS.createsystemapps.mpplayer,
amster_OS.createsystemapps.systembrowser,
amster_OS.createsystemapps.my_explorer,
amster_OS.createsystemapps.myapps,
amster_OS.createsystemapps.simple_snake,
amster_OS.createsystemapps.rootchecker,
amster_OS.createsystemapps.settings,
amster_OS.createsystemapps.txt_editor,
amster_OS.createsystemapps.notes,
amster_OS.createsystemapps.advertisement,
amster_OS.createsystemapps.mediaview
];
},
getName: function(){
return "Amster_OS"
},
getVersion: function(){
return "b1.4"
},
getUsers: function(){
var abs = new File(amster_OS.my_root.system_path).list();
var abss = [];
for(var i in abs){
if(abs[i]!="data"){
abss.push(""+abs[i])
}}
return abss;
},
getUsersCount: function(){
var abs = new File(amster_OS.my_root.system_path).list();
return abs.length-1;
}
},

launcher:{
table_path:"",
size:10,
padding:25,
maxlines:2,
colums:9,
getTableCover: function(){
if(amster_OS.launcher.table_path==""||amster_OS.launcher.table_path==null||!new File(amster_OS.launcher.table_path).exists()||!new File(amster_OS.launcher.table_path).getName().endsWith(".png")){
amster_OS.launcher.table_path=amster_OS.my_root.system_path+"data/table.png";
}
var tbfile =  new File(amster_OS.launcher.table_path)
var tbzp =  new File(amster_OS.my_root.system_path+"data/table.zip")

var table;
if(tbzp.exists()){
var allimg = amster_OS.fast_files.getZipEntryNames(tbzp);
var img = allimg[Math.floor(Math.random(0) * allimg.length)];
table = amster_OS.fast_files.containsEntry(amster_OS.my_root.system_path+"data/table.zip",""+img)
}
if(tbfile.exists()){
table =  BitmapDrawable(BitmapFactory.decodeFile(tbfile));
}
return table;
},
init: function(){
var lays = new LinearLayout(ctx);
lays.setOrientation(1);

var menuScroll = new ScrollView(ctx);
menuScroll.setVerticalScrollBarEnabled(false);
var lay = new GridLayout(ctx);
lay.setColumnCount(amster_OS.launcher.colums); 

menuScroll.addView(lay);
lays.addView(menuScroll);

for(var ah = 0; ah<amster_OS.Info.getsystemapps().length; ah++){
if(amster_OS.createsystemapps.settings.seesystem||amster_OS.Info.getsystemapps()[ah].name=="Настройки"){
lay.addView(amster_OS.launcher.icon.addSystemApp(ah));
}}
var apppth = amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/userapps/";
var list = new File(apppth).list();
if(amster_OS.createsystemapps.settings.seeuser){
for(var ah = 0; ah<list.length; ah++){
if(new File(apppth+list[ah]).getName().endsWith(".aoua")){
lay.addView(amster_OS.launcher.icon.addUserApp(ah));
}}
}

if(new File(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/paths.amos").exists()&&amster_OS.createsystemapps.settings.seefiles){
var text = amster_OS.fast_files.readFile(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/paths.amos");
var text1 = (""+text).split("\n");
for(var ah = 0; ah<text1.length-1; ah++){
lay.addView(amster_OS.launcher.icon.addFolder(ah));
}}

if(new File(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/links.amos").exists()&&amster_OS.createsystemapps.settings.seelinks){
var text = amster_OS.fast_files.readFile(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/links.amos");
var text1 = (""+text).split("\n");
for(var ah = 0; ah<text1.length-1; ah++){
lay.addView(amster_OS.launcher.icon.addLink(ah));
}}

GGUI = new PopupWindow(lays, WR_CNT, UiHeight/1.2);
GGUI.setAnimationStyle(animation);
GGUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
GGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
loadBg: function(){
var lays = new LinearLayout(ctx);
GGGUI = new PopupWindow(lays, UiWidth/1, UiHeight/1);
GGGUI.setAnimationStyle(animation);
GGGUI.setBackgroundDrawable(amster_OS.launcher.getTableCover());
GGGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER, 0, 0);
},
icon:{
addUserApp: function (id){
var apppth = amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/userapps/";
var list = new File(apppth).list();
var app = list[id];

var lay2=new LinearLayout(ctx);
 lay2.setOrientation(1);
var params = new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(40));
params.setMargins(amster_OS.launcher.padding,1,amster_OS.launcher.padding,1);

var param = new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(30));
param.setMargins(amster_OS.launcher.padding,1,amster_OS.launcher.padding,amster_OS.launcher.padding);

var paramss = new LayoutParams(WR_CNT,WR_CNT);
paramss.setMargins(amster_OS.launcher.padding,5,amster_OS.launcher.padding,5);
lay2.setLayoutParams(paramss);

var iconbtn = new ImageView(ctx);
iconbtn.setImageDrawable(amster_OS.userapps.getInfoByProject(app).Icon);
iconbtn.setLayoutParams(params);
iconbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){         
try{
amster_OS.userapps.readScripts(apppth+app,".js");
}catch(e){print(e+". #"+e.lineNumber)}
}}));
lay2.addView(iconbtn);
var tablebtn = new TextView(ctx);
tablebtn.setText(fromHtml('<b><font color="#ffffff">'+(amster_OS.userapps.getInfoByProject(app).Name).toString()+'</font><b>'));   
tablebtn.setShadowLayer(7,0,0,Color.BLACK);
tablebtn.setLayoutParams(param);
tablebtn.setMaxLines(amster_OS.launcher.maxlines);  
tablebtn.setGravity(Gravity.CENTER);  
 tablebtn.setTextColor(Color.parseColor('#ffffff'));
    tablebtn.setTextSize(amster_OS.launcher.size);
tablebtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){         
try{
amster_OS.userapps.readScripts(apppth+app,".js");
}catch(e){print(e+". #"+e.lineNumber)}
}}));
lay2.addView(tablebtn);
return lay2;
},
addFolder: function (id){
var text = amster_OS.fast_files.readFile(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/paths.amos");
var text1 = (""+text).split("\n");
var file = new File(text1[id]);
var current = file.getName();

var lay2=new LinearLayout(ctx);
 lay2.setOrientation(1);
var params = new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(40));
params.setMargins(amster_OS.launcher.padding,1,amster_OS.launcher.padding,1);

var param = new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(30));
param.setMargins(amster_OS.launcher.padding,1,amster_OS.launcher.padding,amster_OS.launcher.padding);

var paramss = new LayoutParams(WR_CNT,WR_CNT);
paramss.setMargins(amster_OS.launcher.padding,5,amster_OS.launcher.padding,5);
lay2.setLayoutParams(paramss);

var abcd = amster_OS.fast_files.containsEntry(amster_OS.my_root.system_path+"data/icons.zip","icon6.png")

var iconbtn = new ImageView(ctx);
iconbtn.setImageDrawable(abcd);
iconbtn.setLayoutParams(params);
iconbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){         
try{
if(file.isFile()){
amster_OS.createsystemapps.my_explorer.explorermenu(file.getParent());
}else{
amster_OS.createsystemapps.my_explorer.explorermenu(file.getAbsolutePath());
}
}catch(e){print(e+". #"+e.lineNumber)}
}}));
lay2.addView(iconbtn);
var tablebtn = new TextView(ctx);
tablebtn.setText(fromHtml('<b><font color="#ffffff">'+(current).toString()+'</font><b>'));   
tablebtn.setShadowLayer(7,0,0,Color.BLACK);
tablebtn.setLayoutParams(param);
tablebtn.setMaxLines(amster_OS.launcher.maxlines);  
tablebtn.setGravity(Gravity.CENTER);  
 tablebtn.setTextColor(Color.parseColor('#ffffff'));
    tablebtn.setTextSize(amster_OS.launcher.size);
tablebtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){         
try{
if(file.isFile()){
amster_OS.createsystemapps.my_explorer.explorermenu(file.getParent());
}else{
amster_OS.createsystemapps.my_explorer.explorermenu(file.getAbsolutePath());
}
}catch(e){print(e+". #"+e.lineNumber)}
}}));
lay2.addView(tablebtn);
return lay2;
},
addLink: function (id){
var text = amster_OS.fast_files.readFile(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/links.amos");
var text1 = (""+text).split("\n");
var current = text1[id].split ("|");

var lay2=new LinearLayout(ctx);
 lay2.setOrientation(1);
var params = new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(40));
params.setMargins(amster_OS.launcher.padding,1,amster_OS.launcher.padding,1);

var param = new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(30));
param.setMargins(amster_OS.launcher.padding,1,amster_OS.launcher.padding,amster_OS.launcher.padding);

var paramss = new LayoutParams(WR_CNT,WR_CNT);
paramss.setMargins(amster_OS.launcher.padding,5,amster_OS.launcher.padding,5);
lay2.setLayoutParams(paramss);

var abcd = amster_OS.fast_files.containsEntry(amster_OS.my_root.system_path+"data/icons.zip","icon5.png")

var iconbtn = new ImageView(ctx);
iconbtn.setImageDrawable(abcd);
iconbtn.setLayoutParams(params);
iconbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){         
try{
if(amster_OS.web.getType()=="mobile"||amster_OS.web.getType()=="wifi"){
amster_OS.createsystemapps.systembrowser.openPage(current[1]);
}else{
amster_OS.graphics.print("connection failed");
}
}catch(e){print(e+". #"+e.lineNumber)}
}}));
lay2.addView(iconbtn);
var tablebtn = new TextView(ctx);
tablebtn.setText(fromHtml('<b><font color="#ffffff">'+(current[0]).toString()+'</font><b>'));   
tablebtn.setShadowLayer(7,0,0,Color.BLACK);
tablebtn.setLayoutParams(param);
tablebtn.setMaxLines(amster_OS.launcher.maxlines);  
tablebtn.setGravity(Gravity.CENTER);  
 tablebtn.setTextColor(Color.parseColor('#ffffff'));
    tablebtn.setTextSize(amster_OS.launcher.size);
tablebtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){         
try{
if(amster_OS.web.getType()=="mobile"||amster_OS.web.getType()=="wifi"){
amster_OS.createsystemapps.systembrowser.openPage(current[1]);
}else{
amster_OS.graphics.print("connection failed");
}
}catch(e){print(e+". #"+e.lineNumber)}
}}));
lay2.addView(tablebtn);
return lay2;
},
addSystemApp: function (id){
let info = amster_OS.Info.getsystemapps()[id];
if(info.icon!=null){
var abobafile =new File(info.icon)
var abobaimg =  BitmapFactory.decodeFile(abobafile);
var abcd = BitmapDrawable(abobaimg);
}else{
var abcd = amster_OS.fast_files.containsEntry(amster_OS.my_root.system_path+"data/icons.zip","icon"+id+".png")
}
var lay2=new LinearLayout(ctx);
 lay2.setOrientation(1);
var params = new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(40));
params.setMargins(amster_OS.launcher.padding,1,amster_OS.launcher.padding,1);

var param = new LayoutParams(amster_OS.screen.dipSize(50), amster_OS.screen.dipSize(30));
param.setMargins(amster_OS.launcher.padding,1,amster_OS.launcher.padding,amster_OS.launcher.padding);

var paramss = new LayoutParams(WR_CNT,WR_CNT);
paramss.setMargins(amster_OS.launcher.padding,5,amster_OS.launcher.padding,5);
lay2.setLayoutParams(paramss);

var iconbtn = new ImageView(ctx);
iconbtn.setLayoutParams(params);
iconbtn.setImageDrawable(abcd);
iconbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){         
try{
info.init();
}catch(e){print(e+". #"+e.lineNumber)}
}}));
lay2.addView(iconbtn);
var tablebtn = new TextView(ctx);
tablebtn.setText(fromHtml('<b><font color="#ffffff">'+info.name+'</font><b>'));   
tablebtn.setShadowLayer(7,0,0,Color.BLACK);
tablebtn.setLayoutParams(param);
tablebtn.setMaxLines(amster_OS.launcher.maxlines);  
tablebtn.setGravity(Gravity.CENTER);  
 tablebtn.setTextColor(Color.parseColor('#ffffff'));
    tablebtn.setTextSize(amster_OS.launcher.size);
tablebtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){         
try{
info.init();
}catch(e){print(e+". #"+e.lineNumber)}
}}));
lay2.addView(tablebtn);
return lay2;
}
},
bar:{
init: function(){
var lays = new LinearLayout(ctx);
if(amster_OS.createsystemapps.settings.seetablebar){
lays.setVisibility(View.VISIBLE);
}else{
lays.setVisibility(View.GONE);
}
lays.setOrientation(0);
lays.setLayoutParams(new LayoutParams(MCH_PNT, amster_OS.screen.dipSize(27)));
var black_bg = new GradientDrawable();
black_bg.setColors([Color.parseColor(amster_OS.graphics.system_design.cl1),Color.parseColor(amster_OS.graphics.system_design.cl2)])
eval("black_bg.setOrientation(GradientDrawable.Orientation."+amster_OS.graphics.system_design.gr+")");
black_bg.setAlpha(amster_OS.createsystemapps.settings.alphabar);
lays.setBackgroundDrawable(black_bg);

lays.addView(amster_OS.launcher.bar.createpanellayout());

  OSGUI= new PopupWindow(lays, MCH_PNT, amster_OS.screen.dipSize(27));      
OSGUI.setAnimationStyle(animation);
OSGUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
OSGUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.BOTTOM,0, 0);
},
createpanelbtn: function (text){
var tablebtn = new TextView(ctx);
tablebtn.setGravity(Gravity.CENTER);  
 tablebtn.setTextColor(Color.parseColor('#ffffff'));
tablebtn.setLayoutParams(new LayoutParams(WR_CNT, amster_OS.screen.dipSize(27),0));
tablebtn.setText(fromHtml('<b><font color="#ffffff">'+text+'</font></b>')); 
    tablebtn.setTextSize(12);
tablebtn.setAllCaps(false);
return tablebtn;
},
getbitmap: function (x,y,x1,y1){
var images = amster_OS.my_root.system_path+"data/bitmap.png";
var photo = BitmapFactory.decodeFile(new File(images));
var mtr = new Matrix();
mtr.postScale(4,4);
var bmp1 = new Bitmap.createBitmap(photo,x,y,47,47,mtr,true);
return BitmapDrawable(bmp1);
},
createpanelimg: function (bml){
var image = new ImageView(ctx); 
image.setImageDrawable(bml);
image.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(27), amster_OS.screen.dipSize(27),0));   
return image;
},
createpanellayout: function (){
var lay1= new LinearLayout(ctx);
lay1.setOrientation(0);
lay1.setLayoutParams(new LayoutParams(MCH_PNT, amster_OS.screen.dipSize(27)));
var exit = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
exit.setOnClickListener(new View.OnClickListener({
                onClick: function(v){         
hand.removeCallbacks(runnable);
amster_OS.start_os.init();
GGUI.dismiss();
GGGUI.dismiss();
OSGUI.dismiss();
}}));
lay1.addView(exit);
var otstup = new TextView(ctx);
otstup.setLayoutParams(new LayoutParams(WR_CNT, amster_OS.screen.dipSize(27),8));
otstup.setText(""); 
otstup.setTextSize(1);
lay1.addView(otstup);

var timeimg = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(1,96));
lay1.addView(timeimg);
var onebtn = new amster_OS.launcher.bar.createpanelbtn("999");
lay1.addView(onebtn);
var dateimg = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(1,1));
lay1.addView(dateimg);
var twobtn = new amster_OS.launcher.bar.createpanelbtn("999");
lay1.addView(twobtn);
var batar = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(47,47));
lay1.addView(batar);
var threebtn = new amster_OS.launcher.bar.createpanelbtn("999");
lay1.addView(threebtn);
var wifiimg = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(47,1));
lay1.addView(wifiimg);
var blueimg = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,47));
lay1.addView(blueimg);
var cons = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(1,47));
cons.setLayoutParams(new LayoutParams(WR_CNT, amster_OS.screen.dipSize(27),2));
cons.setOnClickListener(new View.OnClickListener({
                onClick: function(v){         
amster_OS.cmdclass.init();
}}));
lay1.addView(cons);
function fixdate(dt){
if(dt<10)return "0"+dt;
return dt;
}
var hand = android.os.Handler();
var runnable = new Runnable() {
   run() {
        onebtn.setText(fromHtml('<b><font color="#ffffff">'+fixdate(new Date().getDate())+'.'+fixdate(new Date().getMonth()+1)+'.'+new Date().getFullYear()+' </font></b>')); 
twobtn.setText(fromHtml('<b><font color="#ffffff">'+fixdate(new Date().getHours())+':'+fixdate(new Date().getMinutes())+':'+fixdate(new Date().getSeconds())+' </font></b>')); 
if(amster_OS.web.getBatteryLevel()<=20)threebtn.setText(fromHtml('<b><font color="#ff0000">'+amster_OS.web.getBatteryLevel()+' % </font></b>'));
if(amster_OS.web.getBatteryLevel()>20)threebtn.setText(fromHtml('<b><font color="#ffffff">'+amster_OS.web.getBatteryLevel()+' % </font></b>'));
 
if(amster_OS.web.getType()=="wifi"){
wifiimg.setImageDrawable(amster_OS.launcher.bar.getbitmap(96,1));
}else{
wifiimg.setImageDrawable(amster_OS.launcher.bar.getbitmap(47,1));
}
if(amster_OS.web.getBluetooth()){
blueimg.setVisibility(View.VISIBLE);
}else{
blueimg.setVisibility(View.GONE);
}
        hand.postDelayed(this, 100);
   }
};
hand.postDelayed(runnable, 100);
return lay1;
}
}

},//class laucnher


web:{
getType: function(){
var webts = ctx.getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
if(webts.getNetworkInfo(android.net.ConnectivityManager.TYPE_MOBILE).isConnected()) return "mobile";
if(webts.getNetworkInfo(android.net.ConnectivityManager.TYPE_WIFI).isConnected()) return "wifi";
return "none";
},
getBluetooth: function (){
var check = false;
var bluetoothAdapter = Packages.android.bluetooth.BluetoothAdapter.getDefaultAdapter();
try{
check = bluetoothAdapter.isEnabled();
}catch(e){check=true;}
return check;
},
getBatteryLevel: function() {
var level = ctx.getSystemService(ctx.BATTERY_SERVICE).getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY); 
    return level; 
},
getTextFromURL: function(link) {
var result = "";
        var url;
        var connection;

        try {
            url = new java.net.URL(link);
            connection = url.openConnection();
            var stream = new java.io.BufferedInputStream(connection.getInputStream());

            var reader = new java.io.BufferedReader(new java.io.InputStreamReader(stream));
            var builder = new java.lang.StringBuilder();
            var line;

            while ((line = reader.readLine()) != null) {
                builder.append(line).append("\n");
            }

            result = builder.toString();
        } catch (e) {
            print (e);
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
        return result;
}
},


downloadManager:{
totalsize:0,
actualsize:0,
usemobile:false,
isworking:false,
allsizes:[],
buttons:[],
getConnection: function (mobile){
return (amster_OS.web.getType()=="mobile"&&mobile)||amster_OS.web.getType()=="wifi";
},
setupmenu: function(testfile,do_res,obj,files,path,links,canleave){

var gradient = new GradientDrawable();
gradient.setColors([Color.parseColor(amster_OS.graphics.system_design.cl1),Color.parseColor(amster_OS.graphics.system_design.cl2)])
eval("gradient.setOrientation(GradientDrawable.Orientation."+amster_OS.graphics.system_design.gr+")");
var lays = new LinearLayout(ctx);
lays.setOrientation(1);

function createZag(){
var zagal = new amster_OS.graphics.easyButton("",[Gravity.CENTER,30]);
zagal.setAllCaps(false);
zagal.setShadowLayer(35, 1, 1, Color.parseColor('#102e52'));
zagal.setText(fromHtml('<b><font color="#ffffff">Загрузчик ресурсов для '+obj.name+'</font></b>')); 
lays.addView(zagal);
}

function startMenu(){
var lay = new LinearLayout(ctx);
lay.setOrientation(1);
lays.addView(lay);

var btn = new amster_OS.graphics.easyToggle("", amster_OS.downloadManager.usemobile);
btn.setText(fromHtml('<b><font color="#ffffff">использовать мобильную сеть</font></b>')); 
btn.setOnClickListener(new View.OnClickListener({
    onClick: function(viewarg){
      if(!amster_OS.downloadManager.usemobile){
    amster_OS.downloadManager.usemobile = true;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[0])));
    }else{
    amster_OS.downloadManager.usemobile = false;
    viewarg.setTrackTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
viewarg.setThumbTintList(ColorStateList.valueOf(Color.parseColor(amster_OS.graphics.colors[1])));
   }
viewarg.setChecked(amster_OS.downloadManager.usemobile);
    }
    }));
lay.addView(btn);

var btn2 = new amster_OS.graphics.easyButton("",[Gravity.CENTER,25]);
btn2.setText(fromHtml('<b><font color="#ffffff">продолжить</font></b>')); 
btn2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
if(amster_OS.downloadManager.getConnection(amster_OS.downloadManager.usemobile)){
amster_OS.downloadManager.getDownloadFileInfo(links, path,files);
downloadPage();
}else{
amster_OS.graphics.print("нет подключения к сети.")
}
   }}));
lay.addView(btn2);

if(!do_res){
var btn3 = new amster_OS.graphics.easyButton("",[Gravity.CENTER,25]);
btn3.setText(fromHtml('<b><font color="#ffffff">запустить без текстур</font></b>')); 
btn3.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
var file1 = new File(testfile);
file1.createNewFile();
SGUI.dismiss();
obj.startlevel();
   }}));
lay.addView(btn3);
}
var brn4 = new amster_OS.graphics.easyButton("",[Gravity.CENTER,25]);
brn4.setText(fromHtml('<b><font color="#ffffff">выход</font></b>')); 
brn4.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
SGUI.dismiss();
resetAll();
amster_OS.downloadManager.usemobile = false;
   }}));
if(canleave){
lay.addView(brn4);
}}
createZag();
startMenu();

function downloadPage(){
lays.removeAllViews();
createZag();
var lay = new LinearLayout(ctx);
lay.setOrientation(1);
lays.addView(lay);

var btn = new amster_OS.graphics.easyButton("",[Gravity.LEFT,12]);
btn.setText(fromHtml('<b><font color="#ffffff">будут загружены данные файлы:</font></b>')); 
lay.addView(btn);
for(var i in links){
var infobtn = new amster_OS.graphics.easyButton("loading",[Gravity.LEFT,10]);
amster_OS.downloadManager.buttons.push(infobtn);
lay.addView(infobtn);
}

var tick = android.os.Handler();
var runb = new Runnable() {
   run() {
try{
for(var i in amster_OS.downloadManager.buttons){
amster_OS.downloadManager.buttons[i].setText(fromHtml('<b><font color="#00ff00">'+files[i]+' '+amster_OS.fast_files.convertSize(amster_OS.downloadManager.allsizes[i])+'</font></b>')); 
}
}catch(e){print(e+". #"+e.lineNumber)}
tick.postDelayed(this, 1);
   }
};
tick.postDelayed(runb, 1);

var btn2 = new amster_OS.graphics.easyButton("",[Gravity.CENTER,25]);
btn2.setText(fromHtml('<b><font color="#ffffff">скачать</font></b>')); 
btn2.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
try{
if(amster_OS.downloadManager.buttons.length<=amster_OS.downloadManager.allsizes.length){
amster_OS.downloadManager.isworking=true;
downloadingUi();
tick.removeCallbacks(runb);
}else{
amster_OS.graphics.print("Идёт подготовка файлов.")
}
}catch(e){print(e)}
   }}));
lay.addView(btn2);

var brn4 = new amster_OS.graphics.easyButton("выход",[Gravity.CENTER,25]);
brn4.setText(fromHtml('<b><font color="#ffffff">выход</font></b>')); 
brn4.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
SGUI.dismiss();
tick.removeCallbacks(runb);
resetAll();
amster_OS.downloadManager.usemobile = false;
   }}));
if(canleave){
lay.addView(brn4);
}
}

function downloadingUi(){
amster_OS.downloadManager.buttons=[];
lays.removeAllViews();
createZag();
var lay = new LinearLayout(ctx);
lay.setOrientation(1);

var lau = new LinearLayout(ctx);
lau.setOrientation(0);
lays.addView(lay);
lays.addView(lau);

for(var i in links){
var infobtn = new amster_OS.graphics.easyButton("loading",[Gravity.LEFT,10]);
amster_OS.downloadManager.buttons.push(infobtn);
lay.addView(infobtn);
amster_OS.downloadManager.downloadFileFromURL(links[i],path+files[i]);
}
var bg = new GradientDrawable();
bg.setAlpha(50);
bg.setCornerRadius(30);
bg.setStroke(5, Color.parseColor("#878787"));
bg.setColor(Color.parseColor("#878787"));

var loadbar = new SeekBar(ctx);
    loadbar.setMax(1);
    loadbar.setProgressDrawable(bg);
    loadbar.getThumb().setColorFilter(Color.WHITE, android.graphics.PorterDuff.Mode.SRC);
    loadbar.setProgress(1);
    lay.addView(loadbar);
var left = new amster_OS.graphics.easyButton("0b",[Gravity.LEFT,20]);
left.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
lau.addView(left);
var right = new amster_OS.graphics.easyButton("0%",[Gravity.RIGHT,20]);
right.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
lau.addView(right);

var tick = android.os.Handler();
var runb = new Runnable() {
   run() {
try{
for(var i in amster_OS.downloadManager.buttons){
amster_OS.downloadManager.buttons[i].setText(fromHtml('<b><font color="#00ff00">'+files[i]+' '+amster_OS.fast_files.convertSize(amster_OS.downloadManager.allsizes[i])+'</font></b>')); 
}

if(amster_OS.downloadManager.isworking){
loadbar.setMax(parseInt(amster_OS.downloadManager.totalsize));
loadbar.setProgress(parseInt(amster_OS.downloadManager.actualsize));

left.setText(fromHtml('<b><font color="#00ff00">'+amster_OS.fast_files.convertSize(amster_OS.downloadManager.actualsize)+'</font></b>')); 
right.setText(fromHtml('<b><font color="#00ff00">'+parseInt(amster_OS.downloadManager.actualsize/amster_OS.downloadManager.totalsize*100)+' %</font></b>')); 

if(amster_OS.downloadManager.actualsize>=amster_OS.downloadManager.totalsize&&amster_OS.downloadManager.totalsize>0&&amster_OS.downloadManager.actualsize>0){
resetAll();
var file1 = new File(testfile);
file1.createNewFile();
tick.removeCallbacks(runb);
SGUI.dismiss();
obj.startlevel();
}
}
if(!amster_OS.downloadManager.getConnection(amster_OS.downloadManager.usemobile)){
resetAll();
lays.removeAllViews();
createZag();
startMenu();
for(var i in files){
var newfile = new File(path+files[i]);
if(newfile.exists()){
newfile.delete();
}}
tick.removeCallbacks(runb);
}
}catch(e){print(e+". #"+e.lineNumber)}
tick.postDelayed(this, 1);
   }
};
tick.postDelayed(runb, 1);
}

function resetAll(){
amster_OS.downloadManager.isworking=false;
amster_OS.downloadManager.totalsize=0;
amster_OS.downloadManager.allsizes=[];
amster_OS.downloadManager.actualsize=0;
amster_OS.downloadManager.buttons=[];
}

SGUI = new amster_OS.graphics.easyPopup(lays, gradient);
},
downloadFileFromURL: function(url,path) {
var r  = new java.lang.Runnable() {
        run: function() {
            try {
var newfile = new File(path);
if(!newfile.exists()){
newfile.createNewFile();
var fileURL = new java.net.URL(url);
var connection = fileURL.openConnection();
var input = java.io.BufferedInputStream(connection.getInputStream());
var output =  new java.io.FileOutputStream(path);
var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024); 
var length; 
 while ((length = input.read(buffer)) != -1) { 
amster_OS.downloadManager.actualsize+=length;
 output.write(buffer, 0, length); 
 } 
output.flush();
    output.close();
    input.close();
}
}catch(e){print(e+". #"+e.lineNumber)}
}
}
    var threadt = new java.lang.Thread(r);
    threadt.start();
},
getDownloadFileInfo: function(url,path,name){
var o  = new java.lang.Runnable() {
        run: function() {
            try {
for(var i in url){
if(!new File(path+name[i]).exists()){
var fileURL = new java.net.URL(url[i]);
var connection = fileURL.openConnection();
amster_OS.downloadManager.totalsize+=connection.getContentLength();
amster_OS.downloadManager.allsizes.push(connection.getContentLength());
}}
}catch(e){print(e+". #"+e.lineNumber)}
}
}
    var tr = new java.lang.Thread(o);
    tr.start();
}
},

Text:{
amster_key:"Ge9TIFd8mcOkPBBm2aHtvUbusFgvF5G2",
encrypt: function(plainText, skey){
if(skey==null){
skey=amster_OS.Text.amster_key;
}
        var secretKeyBytes = new String(skey).getBytes("UTF-8");
        var key = new SecretKeySpec(secretKeyBytes, "AES");
        var cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        var encryptedBytes = cipher.doFinal(new String(plainText).getBytes());
        return Base64.encodeToString(encryptedBytes, Base64.DEFAULT);
    },
decrypt: function(cryptoText,skey) {
if(skey==null){
skey=amster_OS.Text.amster_key;
}
        var secretKeyBytes = new String(skey).getBytes("UTF-8");
        var key = new SecretKeySpec(secretKeyBytes, "AES");
        var cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        var decryptedBytes = cipher.doFinal(Base64.decode(cryptoText, Base64.DEFAULT));
        return new String(decryptedBytes);
},
findStringByKey: function(key, text) {
  const lines = text.split('\n');
  const foundStrings = [];
  
  lines.forEach(line => {
    if (line.startsWith(key + ':')) {
      const foundString = line.slice(key.length + 1).trim();
      foundStrings.push(foundString);
    }
  });
  return foundStrings.length ? foundStrings : null;
},
checkDateValidity: function(date) {
  var datePattern = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  var matches = datePattern.exec(date);
  if (!matches) {
    return false;
  }
  var day = parseInt(matches[1]);
  var month = parseInt(matches[2]);
  var year = parseInt(matches[3]);
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }
  if (day>30||day<=0||month>12||month<=0||year>2010||year<1950) {
return false;
  }
  return true;
}
},
userapps: {
readScripts: function(zipputh,format){
var arch = new java.util.zip.ZipFile(zipputh);
var file = new File(zipputh);
var fos = new FIS(file);
var zos = new java.util.zip.ZipInputStream(fos);
var entry;
while((entry=zos.getNextEntry())!=null){
if(entry.getName().endsWith(format)&&entry.getName().startsWith("scripts/")){
var input = arch.getInputStream(entry)
var readed = (new BufferedReader(new java.io.InputStreamReader(input)));
var data = new StringBuilder();
var string;
while((string = readed.readLine()) != null){
if(string!=""){
data.append(string);
data.append('\n');
}}
eval (amster_OS.readLibrares()+"\n"+data.toString());
}
}
zos.closeEntry();
},
getAppFiles: function(zipputh,startpth){
var file = new File(zipputh);
var files = [];
var fos = new FIS(file);
var zos = new java.util.zip.ZipInputStream(fos);
var entry;
while((entry=zos.getNextEntry())!=null){
if(entry.getName().startsWith(startpth)){
files.push(entry);
}
}
zos.closeEntry();
return files;
},
getIcon: function(zipputh){
return amster_OS.fast_files.containsEntry(zipputh,"icon.png")
},
getAO_Info: function(zipputh){
var arch = new java.util.zip.ZipFile(zipputh);
var file = new File(zipputh);
var fos = new FIS(file);
var zos = new java.util.zip.ZipInputStream(fos);
var entry;
while((entry=zos.getNextEntry())!=null){
if(entry.getName()=="ao_info.txt"){
var input = arch.getInputStream(entry)
var readed = (new BufferedReader(new java.io.InputStreamReader(input)));
var data = new StringBuilder();
var string;
while((string = readed.readLine()) != null){
if(string!=""){
data.append(string);
data.append('\n');
}}
return ""+data.toString()
}
}
zos.closeEntry();
},
getInfoByProject: function (projectname){
var pth1 = amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/userapps/"+projectname;
var text =  amster_OS.userapps.getAO_Info(pth1);
var name = amster_OS.Text.findStringByKey("name",text);
var version = amster_OS.Text.findStringByKey("version",text);
var labels = amster_OS.Text.findStringByKey("labels",text);
var abcd = amster_OS.userapps.getIcon(pth1);
if(labels==null&&version==null){
name = amster_OS.userapps.getAO_Info(pth1)
version="1.0";
labels="old api";
}
var obj = null;
obj = {
Icon:abcd,
Name:name,
Version:version,
Labels:labels,
Path:pth1
}
return obj;
},
getProjectById: function (id){
let apppth = amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/userapps/";
var list = new File(apppth).list();
var msg = [];
for(var i in list){
if(new File(apppth+list[i]).getName().endsWith(".aoua")){
msg.push(list[i]);
}}
for(var i in msg){
if(i==id) return msg[i];
}
return null;
},
getNameById: function(id){
return amster_OS.userapps.getInfoByProject(amster_OS.userapps.getProjectById(id)).Name;
},
getAppsArray: function (){
let apppth = amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/userapps/";
var list = new File(apppth).list();
var msg = [];
for(var i in list){
if(new File(apppth+list[i]).getName().endsWith(".aoua"))msg.push(list[i]);
}
return msg;
},
getAppsCount: function (){
var mss = amster_OS.userapps.getAppsArray();
return mss.length;
}
},
readLibrares: function (){
var readed = "";
var all = new File(amster_OS.my_root.getDir()[14]).list();
for(var i in all){
if(all[i].endsWith(".aolb")){
readed = "\n"+amster_OS.fast_files.readFile(amster_OS.my_root.getDir()[14]+all[i]);
}}
return readed;
},
cmdclass:{
actualcmd:"___",
log:["введите команду"],
init: function (){
this.openblack();
this.openmenu();
this.cmdexit();
},
openmenu: function (){
     var black_bg = new GradientDrawable();
black_bg.setColor(Color.parseColor('#000000'));
black_bg.setStroke(5,Color.parseColor('#878787'))

var lay = new LinearLayout(ctx);
  lay.setOrientation(1);
var menuScroll1 = new ScrollView(ctx);
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
menuScroll1.addView(lays);
lay.addView(menuScroll1);

function fastGen(){
lays.removeAllViews()
for(var i in amster_OS.cmdclass.log){
var alltxttbtn = new TextView(ctx);
     alltxttbtn.setText(fromHtml('<b><font color="#ffffff">'+amster_OS.cmdclass.log[i]+'</font></b>')); 
     alltxttbtn.setTextColor(Color.parseColor('#ffffff'));   
 alltxttbtn.setTextSize(10);
alltxttbtn.setPadding(10,5,5,5);
alltxttbtn.setGravity(Gravity.LEFT);
lays.addView(alltxttbtn);
}
var cmdbtn = new EditText(ctx);
     cmdbtn.setTextColor(Color.parseColor('#ffffff'));  
cmdbtn.setHintTextColor(Color.parseColor('#ffffff'));   
 cmdbtn.setTextSize(10);
cmdbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
cmdbtn.setHint("<"+amster_OS.my_root.current_user+"> "+amster_OS.cmdclass.actualcmd+"");
 cmdbtn.setMaxLines(1);  
cmdbtn.setInputType(1);   
cmdbtn.setGravity(Gravity.LEFT);
cmdbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
openedit(viewarg);
}      
}));
lays.addView(cmdbtn);
}
fastGen()

function openedit (view){
temped=new EditText(ctx);
temped.setTextSize(7);
temped.setTextColor(Color.WHITE);				
temped.setHintTextColor(Color.parseColor("#b7b7b7"));
temped.setOnKeyListener(new View.OnKeyListener() {
        onKey: function(v,keyCode,event) {
            if ((event.getAction() == 	android.view.KeyEvent.ACTION_DOWN) && (keyCode == 	android.view.KeyEvent.KEYCODE_ENTER)) {
                editp.dismiss();
try{
amster_OS.cmdclass.log.push("<"+amster_OS.my_root.current_user+"> "+amster_OS.cmdclass.actualcmd);

if(amster_OS.cmdclass.actualcmd=="/test"){
amster_OS.cmdclass.log.push("проверка консоли");
}
if(amster_OS.cmdclass.actualcmd=="/clear"){
amster_OS.cmdclass.log=[];
}
if(amster_OS.cmdclass.actualcmd=="/stop"){
java.lang.System.exit(1);
}
if(amster_OS.cmdclass.actualcmd=="/close"||amster_OS.cmdclass.actualcmd=="/exit"||amster_OS.cmdclass.actualcmd=="/dismiss"){
CMDEUI.dismiss();
CMDUI.dismiss();
BLACKPHONE.dismiss();
GGUI.dismiss();
GGGUI.dismiss();
OSGUI.dismiss();
}
if(amster_OS.cmdclass.actualcmd=="/systemapps"){
for(var i in amster_OS.Info.getsystemapps()){
amster_OS.cmdclass.log.push(amster_OS.Info.getsystemapps()[i].name+" V"+amster_OS.Info.getsystemapps()[i].version);
}
}
amster_OS.cmdclass.actualcmd="___"
fastGen();
}catch(e){print(e)}
                return true;
            }
            return false;
        }
    });
temped.addTextChangedListener(new android.text.TextWatcher() {
	afterTextChanged: function(text) {
		try{
			
			amster_OS.cmdclass.actualcmd=text;
		}catch(e){clientMessage(e)}
	}
});
editp = new PopupWindow(temped, WR_CNT, WR_CNT,true);
editp.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
editp.setWidth(2);
editp.setHeight(2);
editp.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0,0);
new android.os.Handler().postDelayed(new Runnable({
	run: function() {
		temped.dispatchTouchEvent(MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), MotionEvent.ACTION_DOWN , 0, 0, 0));
		temped.dispatchTouchEvent(MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), MotionEvent.ACTION_UP , 0, 0, 0));
	}
}), 200);
 }

  CMDUI= new PopupWindow(lay, UiWidth/1.5, UiHeight/1.5);      
CMDUI.setBackgroundDrawable(black_bg); 
CMDUI.setAnimationStyle(animation);
            CMDUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
openblack: function (){
  BLACKPHONE= new amster_OS.graphics.black_back();
},
cmdexit: function(){
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var exitsetbtn = new TextView(ctx);
 exitsetbtn.setGravity(Gravity.CENTER);   exitsetbtn.setTextColor(Color.parseColor('#a93226'));
exitsetbtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80)));
    exitsetbtn.setTextSize(60);
     exitsetbtn.setText("×");   
    exitsetbtn.setOnClickListener(new View.OnClickListener({ onClick: function(viewarg) {        
CMDEUI.dismiss();
CMDUI.dismiss();
BLACKPHONE.dismiss();
   }}));
lays.addView(exitsetbtn);
  CMDEUI= new PopupWindow(lays, amster_OS.screen.dipSize(80), amster_OS.screen.dipSize(80));      
CMDEUI.setAnimationStyle(animation);
CMDEUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            CMDEUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.BOTTOM,0, 0);
}
},
start_os : {
name:"system",
actualcmd:"напишите /startos для запуска системы ",
log:["введите команду"],
data:[],
init: function(){
var r  = new Runnable() {
        run: function() {
var txt = amster_OS.web.getTextFromURL("https://raw.githubusercontent.com/Smartman09/amster_OS/main/password.txt");
var isBlock = amster_OS.Text.findStringByKey("bool",txt);
var password = amster_OS.Text.findStringByKey("pas",txt);
var message = amster_OS.Text.findStringByKey("msg",txt);
ctx.runOnUiThread(new Runnable({ run: function(){
try{
if(isBlock=="true"){
amster_OS.start_os.bgmenu(false);
amster_OS.start_os.blockmenu(message,password);
}else{
if(amster_OS.start_os.getSystemFiles()){
amster_OS.start_os.bgmenu(true);
amster_OS.start_os.usermenu();
}else{
amster_OS.start_os.firstload();
}}
}catch(e){print(e + " #" + e.lineNumber)}
}}));
}
}
var threadt = new Thread(r);
    threadt.start();
},
firstload: function (){
amster_OS.start_os.actualcmd="напишите /start для создания аккаунта и запуска системы"
amster_OS.start_os.log=["введите команду"];
amster_OS.start_os.data=[];
var openddops = false;
var tickcontrol = true;

     var black_bg = new GradientDrawable();
black_bg.setColor(Color.parseColor('#000000'));
black_bg.setStroke(5,Color.parseColor('#878787'))

var lay = new LinearLayout(ctx);
  lay.setOrientation(1);
var menuScroll1 = new ScrollView(ctx);
   var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
menuScroll1.addView(lays);
lay.addView(menuScroll1);

function fastGen(){
lays.removeAllViews()
for(var i in amster_OS.start_os.log){
var alltxttbtn = new TextView(ctx);
     alltxttbtn.setText(fromHtml('<b><font color="#ffffff">'+amster_OS.start_os.log[i]+'</font></b>')); 
     alltxttbtn.setTextColor(Color.parseColor('#ffffff'));   
 alltxttbtn.setTextSize(17);
alltxttbtn.setAllCaps(false);
alltxttbtn.setPadding(10,5,5,5);
alltxttbtn.setGravity(Gravity.LEFT);
lays.addView(alltxttbtn);
}
var cmdbtn = new EditText(ctx);
     cmdbtn.setTextColor(Color.parseColor('#ffffff'));  
cmdbtn.setHintTextColor(Color.parseColor('#ffffff'));   
 cmdbtn.setTextSize(17);
cmdbtn.setAllCaps(false);
cmdbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
cmdbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
cmdbtn.setHint("<"+amster_OS.my_root.current_user+"> "+amster_OS.start_os.actualcmd+"");
 cmdbtn.setMaxLines(1);  
cmdbtn.setInputType(1);   
cmdbtn.setGravity(Gravity.CENTER);
cmdbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
openedit(viewarg);
}      
}));
lays.addView(cmdbtn);
}
fastGen()

function openedit (view){
temped=new EditText(ctx);
temped.setTextSize(7);
temped.setTextColor(Color.WHITE);				
temped.setHintTextColor(Color.parseColor("#b7b7b7"));
temped.setOnKeyListener(new View.OnKeyListener() {
        onKey: function(v,keyCode,event) {
            if ((event.getAction() == 	android.view.KeyEvent.ACTION_DOWN) && (keyCode == 	android.view.KeyEvent.KEYCODE_ENTER)) {
                editp.dismiss();
try{
if(amster_OS.my_root.current_user=="")amster_OS.my_root.current_user="user"
amster_OS.start_os.log.push("<"+amster_OS.my_root.current_user+"> "+amster_OS.start_os.actualcmd);
var cmds = (""+amster_OS.start_os.actualcmd).split(" ");
if(amster_OS.start_os.actualcmd=="/test"){
amster_OS.start_os.log.push("проверка консоли");
}
if(amster_OS.start_os.actualcmd=="/clear"){
amster_OS.start_os.log=[];
}
if(amster_OS.start_os.actualcmd=="/close"||amster_OS.start_os.actualcmd=="/exit"||amster_OS.start_os.actualcmd=="/dismiss"||amster_OS.start_os.actualcmd=="/stop"){
java.lang.System.exit(1);
}
if(amster_OS.start_os.actualcmd=="/start"||amster_OS.start_os.actualcmd=="/начать|"||amster_OS.start_os.actualcmd=="/старт"||amster_OS.start_os.actualcmd=="/go"||amster_OS.start_os.actualcmd=="/run"||amster_OS.start_os.actualcmd=="/enter"){
openddops = true;
amster_OS.start_os.log.push("введите /user 'имя пользователя'");
amster_OS.start_os.log.push("введите /pas 'пароль пользователя' (напишите значение none, если пароль не нужен)");
amster_OS.start_os.log.push("введите /ct 'ваша страна'");
amster_OS.start_os.log.push("введите /pl 'ваш пол'");
amster_OS.start_os.log.push("введите /dt 'дата рождения формата 09.01.1998'");
amster_OS.start_os.log.push("так же вы можете ввести все данные одной командой /set имя;пароль;страна;пол;дата рождения");
//amster_OS.start_os.log.push("введите /done, когда вы записали все данные");
}
if(openddops){
if(cmds[0]=="/set"){
var text = cmds[1].split(";");
if((text[0]&&text[1]&&text[2]&&text[3]&&text[4])&&amster_OS.Text.checkDateValidity(text[4])){
amster_OS.start_os.data[0]=text[0];
amster_OS.start_os.data[1]=text[1];
amster_OS.start_os.data[2]=text[2];
amster_OS.start_os.data[3]=text[3];
amster_OS.start_os.data[4]=text[4];
}}
if(cmds[0]=="/user"){
cmds[1]=cmds[1].slice(0,20);
amster_OS.start_os.data[0]=cmds[1];
}
if(cmds[0]=="/pas"){
cmds[1]=cmds[1].slice(0,20);
amster_OS.start_os.data[1]=cmds[1];
}
if(cmds[0]=="/ct"){
cmds[1]=cmds[1].slice(0,20);
amster_OS.start_os.data[2]=cmds[1];
}
if(cmds[0]=="/pl"){
cmds[1]=cmds[1].slice(0,10);
amster_OS.start_os.data[3]=cmds[1];
}
if(cmds[0]=="/dt"){
if(amster_OS.Text.checkDateValidity(cmds[1])){
amster_OS.start_os.data[4]=cmds[1];
}}
if(amster_OS.start_os.actualcmd=="/get"){
for(var i in amster_OS.start_os.data){
amster_OS.start_os.log.push(amster_OS.start_os.data[i])
}}
}
if(amster_OS.start_os.actualcmd=="/autouser"){
var num = Math.floor(Math.random(1)*14);
var names = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Olivia', 'David', 'Sophia', 'Daniel', 'Ella', 'Matthew', 'Mia', 'Andrew', 'Ava', 'William'];
var countries = [  "Australia",  "Germany",  "Italy",  "Canada",  "Mexico",  "Norway",  "Russia",  "USA",  "Turkey",  "France",  "Chile",  "Sweden",  "Switzerland",  "Japan", "South Korea"];
var dates = ['14.05.1997', '17.03.1996', '09.09.1994', '22.12.1990', '03.11.1995', '18.07.1992', '30.10.1993', '26.08.1991', '12.06.1998', '06.04.1999', '15.01.1992', '01.08.1997', '25.09.1996', '07.11.1993', '19.02.1995'];

amster_OS.start_os.data[0]=names[6]+num;
amster_OS.start_os.data[1]="none";
amster_OS.start_os.data[2]=countries[num]
amster_OS.start_os.data[3] = Math.random() < 0.5 ? "Male" : "Girl";
amster_OS.start_os.data[4]=dates[num];
amster_OS.start_os.log.push(amster_OS.start_os.data[0])
}

amster_OS.start_os.actualcmd="___"
fastGen();
}catch(e){print(e + " #" + e.lineNumber)}
                return true;
            }
            return false;
        }
    });
temped.addTextChangedListener(new android.text.TextWatcher() {
	afterTextChanged: function(text) {
		try{
			
			amster_OS.start_os.actualcmd=text;
		}catch(e){clientMessage(e)}
	}
});
editp = new PopupWindow(temped, WR_CNT, WR_CNT,true);
editp.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
editp.setWidth(2);
editp.setHeight(2);
editp.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0,0);
new android.os.Handler().postDelayed(new Runnable({
	run: function() {
		temped.dispatchTouchEvent(MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), MotionEvent.ACTION_DOWN , 0, 0, 0));
		temped.dispatchTouchEvent(MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), MotionEvent.ACTION_UP , 0, 0, 0));
	}
}), 200);
 }
var hand = android.os.Handler();
var runnable;
runnable = new Runnable() {
   run() {
if(tickcontrol){
if(amster_OS.start_os.data[0]!=null&&amster_OS.start_os.data[2]!=null&&amster_OS.start_os.data[3]!=null&&amster_OS.start_os.data[4]!=null){
try{
amster_OS.my_root.current_user = amster_OS.start_os.data[0];
var rootdir = new File(amster_OS.my_root.system_path+"data/")
File(rootdir).mkdirs();
var userdir = new File(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/");
File(userdir).mkdirs();
var linksapp = new File(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/links.amos")
linksapp.createNewFile();
var pathapp = new File(amster_OS.my_root.system_path+amster_OS.my_root.current_user+"/paths.amos")
pathapp.createNewFile();
var selecteduser = new File(amster_OS.my_root.system_path+"data/users.amos")
selecteduser.createNewFile();
var userfile = new File(amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
userfile.createNewFile();
amster_OS.Data.setValue("name",amster_OS.start_os.data[0],amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
amster_OS.Data.setValue("password",amster_OS.start_os.data[1],amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
amster_OS.Data.setValue("country",amster_OS.start_os.data[2],amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
amster_OS.Data.setValue("gender",amster_OS.start_os.data[3],amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
amster_OS.Data.setValue("date",amster_OS.start_os.data[4],amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")

for(var i in amster_OS.my_root.getDir()){
File(amster_OS.my_root.getDir()[i]).mkdirs();
}
amster_OS.Data.setValue("actual",amster_OS.my_root.current_user,amster_OS.my_root.system_path+"data/users.amos")
amster_OS.Data.setValue("enterpas",0,amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
CMDUI.dismiss();
var diskid = "1Hq8HdCS_NlnP5Zf_QrSDGsew5ypooXTY";
if(!amster_OS.start_os.getSystemFiles()){
tickcontrol=false;
hand.removeCallbacks(runnable);
amster_OS.downloadManager.setupmenu(amster_OS.my_root.system_path+"data/get.amos",true,amster_OS.start_os,["icons.zip","table.png","bitmap.png"],amster_OS.my_root.system_path+"data/",["https://drive.Google.com/uc?export=download&id="+diskid,"https://drive.Google.com/uc?export=download&id=14smedAcdHzixMqKaKYcEUSq1pv7cWayK","https://drive.Google.com/uc?export=download&id=16hxscuBjss6lbQkXGIYJyEVYLYoZKh1o"],false);
}else{
tickcontrol=false;
hand.removeCallbacks(runnable);
amster_OS.start_os.fullstart();
}
} catch (e){print(e + e.lineNumber)}
}
}
                    hand.postDelayed(this, 100);
   }
};
hand.postDelayed(runnable, 100);
  CMDUI= new PopupWindow(lay, UiWidth/1, UiHeight/1);      
CMDUI.setBackgroundDrawable(black_bg); 
CMDUI.setAnimationStyle(animation);
            CMDUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
getSystemFiles: function (){
if(new File(amster_OS.my_root.system_path+"data/get.amos").exists()&&new File(amster_OS.my_root.system_path+"data/icons.zip").exists()&&new File(amster_OS.my_root.system_path+"data/users.amos").exists()&&new File(amster_OS.my_root.system_path+"data/table.png").exists()&&new File(amster_OS.my_root.system_path+"data/bitmap.png").exists())return true;
return false;
},
blockmenu: function (msg,pas){
var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var lay1 = new LinearLayout(ctx);
  lay1.setOrientation(0);
var alltxttbtn = new Button(ctx);
     alltxttbtn.setText(fromHtml('<b><font color="#ffffff">блокировка системы</font></b>')); 
     alltxttbtn.setTextColor(Color.parseColor('#ffffff'));   
 alltxttbtn.setTextSize(25);
alltxttbtn.setShadowLayer(35, 1, 1, Color.parseColor('#102e52'));
alltxttbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
alltxttbtn.setAllCaps(false);
alltxttbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
alltxttbtn.setGravity(Gravity.CENTER);
lays.addView(alltxttbtn);
var textms = new Button(ctx);
textms.setText(fromHtml('<u><font color="#ffffff">'+msg+'</font></u>')); 
textms.setTextColor(Color.parseColor('#ffffff'));   
 textms.setTextSize(10);
textms.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
textms.setGravity(Gravity.LEFT);
lays.addView(textms);
var pasbtn = new EditText(ctx);
     pasbtn.setTextColor(Color.parseColor('#000000'));   
 pasbtn.setTextSize(15);
pasbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
pasbtn.setAllCaps(false);
pasbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
pasbtn.setHint("введите пароль...");
 pasbtn.setMaxLines(1);  
pasbtn.setInputType(1);   
pasbtn.setBackgroundDrawable(new ColorDrawable(Color.WHITE));
pasbtn.setGravity(Gravity.CENTER);
pasbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
amster_OS.start_os.openedit(viewarg);
}      
}));
lays.addView(pasbtn);
var leavebtn = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
leavebtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(35), amster_OS.screen.dipSize(35),1));
leavebtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
ERDUI.dismiss();
PHUI.dismiss();
java.lang.System.exit(1);
}      
}));
lay1.addView(leavebtn);
var enterbtn = new TextView(ctx);
enterbtn.setText(fromHtml('<b><font color="#ffffff">войти</font></b>')); 
enterbtn.setTextColor(Color.parseColor('#ffffff'));
enterbtn.setLayoutParams(new LayoutParams(MCH_PNT, amster_OS.screen.dipSize(35),1));   
 enterbtn.setTextSize(20);
enterbtn.setGravity(Gravity.RIGHT);
enterbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
if(""+pas==""+pasbtn.getText()){
ERDUI.dismiss();
PHUI.dismiss();
if(amster_OS.start_os.getSystemFiles()){
amster_OS.start_os.bgmenu(true);
amster_OS.start_os.usermenu();
}else{
amster_OS.start_os.firstload();
}
}else{
pasbtn.setText("неверный пароль!");
}
}      
}));
lay1.addView(enterbtn);

lays.addView(lay1);
ERDUI= new PopupWindow(lays, UiWidth/2, UiHeight/1.5);      
ERDUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
ERDUI.setAnimationStyle(animation);
            ERDUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
usermenu: function (){
     var bgs = new android.graphics.drawable.GradientDrawable();
bgs.setStroke(2, android.graphics.Color.parseColor('#ffffff'));
bgs.setColor(android.graphics.Color.parseColor('#ffffff'));
bgs.setCornerRadius(100);

var bgss = new android.graphics.drawable.GradientDrawable();
bgss.setStroke(2, android.graphics.Color.parseColor('#ffffff'));
bgss.setColor(Color.TRANSPARENT);
bgss.setCornerRadius(100);
var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var lay = new LinearLayout(ctx);
  lay.setOrientation(0);
var alltxttbtn = new Button(ctx);
     alltxttbtn.setText(fromHtml('<b><font color="#ffffff">выберите пользователя</font></b>')); 
     alltxttbtn.setTextColor(Color.parseColor('#ffffff'));   
 alltxttbtn.setTextSize(25);
alltxttbtn.setShadowLayer(35, 1, 1, Color.parseColor('#102e52'));
alltxttbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
alltxttbtn.setAllCaps(false);
alltxttbtn.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
alltxttbtn.setGravity(Gravity.CENTER);
lays.addView(alltxttbtn);

var listF =  new File(amster_OS.my_root.system_path).list();
var list = [];
var savedats = false;
var password = "none";
if(amster_OS.Data.getValue("actual",amster_OS.my_root.system_path+"data/users.amos")!=null){
eval('amster_OS.my_root.current_user ="'+amster_OS.Data.getValue("actual",amster_OS.my_root.system_path+"data/users.amos")+'"');
}
if(amster_OS.Data.getValue("password",amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")!=null){
eval('password ="'+amster_OS.Data.getValue("password",amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")+'"');
}
if(amster_OS.Data.getValue("enterpas",amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")==1){savedats=true;}else{savedats=false}

     var dialogLayout = new LinearLayout(ctx);
     dialogLayout.setOrientation(1);
var dialogLayout2 = new LinearLayout(ctx);
     dialogLayout2.setOrientation(1);
var dialogLayout1 = new LinearLayout(ctx);
     dialogLayout1.setOrientation(1);
dialogLayout.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
var bg_d1 = new GradientDrawable();
bg_d1.setStroke(7, Color.parseColor('#ffffff'));
bg_d1.setColor(Color.TRANSPARENT);
bg_d1.setCornerRadius(100);
dialogLayout2.setBackground(bg_d1);
var bg_f = new GradientDrawable();
bg_f.setColor(Color.TRANSPARENT);
dialogLayout1.setBackground(bg_f);

var menuScroll1 = new ScrollView(ctx);
menuScroll1.setVerticalScrollBarEnabled(false);
menuScroll1.addView(dialogLayout1);
dialogLayout2.addView(menuScroll1);

var b1utton1 = new TextView(ctx);
     b1utton1.setText(fromHtml('<b><font color="#ffffff">'+amster_OS.my_root.current_user+'</font></b>')); 
     b1utton1.setTextColor(Color.parseColor('#FFFFFF'));   
 b1utton1.setTextSize(25);
b1utton1.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton1.setGravity(Gravity.CENTER);
     b1utton1.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
generate();
      } 
     })); 
     dialogLayout.addView(b1utton1);
 dialogLayout.addView(dialogLayout2);

function generate(){
try{
list = [];
if(password!="none"){
lays.removeView(pasbtn);
}
lays.removeView(enterbtn);
lays.removeView(lay);
dialogLayout1.removeAllViews();
for(var i in listF){
if(listF[i]!="data"){
if(list[i]!=amster_OS.my_root.current_user){
list.push(listF[i])}
}}
for(var i in list){
eval('var txtpas ="'+amster_OS.Data.getValue("password",amster_OS.my_root.system_path+"data/"+list[i]+".amos")+'"');
var b1utton0 = new Button(ctx);
if(txtpas=="none"){
//"<font color='#2374E7'>Название</font>: "+list[i]+"<br/>"
b1utton0.setText(fromHtml("<b><font color='#ffffff'>Login: </font><u>"+list[i]+"</u><font color='#ffffff'> Password: </font><u><font color='#d3d3d3'>"+txtpas+"</font></u><b>")); 
}else{
txtpas=txtpas.slice(0,txtpas.length);
txtpas="*********"
b1utton0.setText(fromHtml("<b><font color='#ffffff'>Login: </font><u>"+list[i]+"</u><font color='#ffffff'> Password: </font><u><font color='#ffffff'>"+txtpas+"</font></u><b>")); 
}
     b1utton0.setTextColor(Color.parseColor('#ffffff'));   
 b1utton0.setTextSize(15);
b1utton0.setId(i);
b1utton0.setAllCaps(false);
b1utton0.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
b1utton0.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
b1utton0.setGravity(Gravity.CENTER);
     b1utton0.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
b1utton1.setText(fromHtml('<b><font color="#ffffff">'+list[viewarg.getId()]+'</font></b>')); 
     b1utton1.setTextColor(Color.parseColor('#FFFFFF'));   
dialogLayout1.removeAllViews();
pasbtn.setText("")
amster_OS.my_root.current_user=list[viewarg.getId()];
amster_OS.Data.setValue("actual",amster_OS.my_root.current_user,amster_OS.my_root.system_path+"data/users.amos")
lays.removeAllViews();
lays.addView(alltxttbtn);
lays.addView(dialogLayout)
if(amster_OS.Data.getValue("password",amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")!=null){
eval('password ="'+amster_OS.Data.getValue("password",amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")+'"');
}

if(amster_OS.Data.getValue("enterpas",amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")==1){savedats=true;}else{savedats=false}
if(!savedats){
datbtns.setBackgroundDrawable(bgss);
}else{
datbtns.setBackgroundDrawable(bgs);
pasbtn.setText(password)
}
if(password!="none"){
lays.addView(pasbtn);
}
lays.addView(lay);
lays.addView(enterbtn);
      } 
     })); 
     dialogLayout1.addView(b1utton0);
}
}catch(e){print(e)}
}
 lays.addView(dialogLayout)


var pasbtn = new EditText(ctx);
     pasbtn.setTextColor(Color.parseColor('#000000'));   
 pasbtn.setTextSize(15);
pasbtn.setLayoutParams(new LayoutParams(UiWidth/2, WR_CNT));
pasbtn.setAllCaps(false);
pasbtn.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
pasbtn.setHint("введите пароль...");
if(savedats){
pasbtn.setText(password)
}

 pasbtn.setMaxLines(1);  
pasbtn.setInputType(1);   
pasbtn.setBackgroundDrawable(new ColorDrawable(Color.WHITE));
pasbtn.setGravity(Gravity.CENTER);
pasbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
amster_OS.start_os.openedit(viewarg);
}      
}));
if(password!="none"){
lays.addView(pasbtn);
}

lays.addView(lay);
var enterbtn = new TextView(ctx);
     enterbtn.setText(fromHtml('<b><font color="#ffffff">войти</font></b>')); 
     enterbtn.setTextColor(Color.parseColor('#ffffff'));   
 enterbtn.setTextSize(25);
enterbtn.setAllCaps(false);
enterbtn.setGravity(Gravity.CENTER);
enterbtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
if(password!="none"){
if(pasbtn.getText().toString()==password){
try{
amster_OS.start_os.fullstart();
ENDUI.dismiss();
PHUI.dismiss();
}catch(e){print(e)}
}else{
pasbtn.setText("");
pasbtn.setHint("неверный пароль");
}
}else{
amster_OS.start_os.fullstart();
ENDUI.dismiss();
PHUI.dismiss();
}

}      
}));
lays.addView(enterbtn);

var params1 = new LinearLayout.LayoutParams(amster_OS.screen.dipSize(27), amster_OS.screen.dipSize(27));
params1.setMargins(1,10,10,10);
var params2 = new LinearLayout.LayoutParams(UiWidth/2.5, amster_OS.screen.dipSize(27));
params2.setMargins(10,10,10,1);
var params3 = new LinearLayout.LayoutParams(amster_OS.screen.dipSize(20), amster_OS.screen.dipSize(20));
params3.setMargins(1,10,10,1);

var leavebtn = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(96,96));
leavebtn.setLayoutParams(params1);
leavebtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
ENDUI.dismiss();
PHUI.dismiss();
java.lang.System.exit(1);
}      
}));
lay.addView(leavebtn);

    var datbtn = new TextView(ctx);
    datbtn.setText('запомнить  ');
datbtn.setGravity(Gravity.RIGHT);
datbtn.setTextColor(Color.parseColor('#ffffff'));   
 datbtn.setTextSize(15);
datbtn.setLayoutParams(params2);
datbtn.setAllCaps(false);
datbtn.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
if(!savedats){
    savedats = true;
datbtns.setBackgroundDrawable(bgs);
amster_OS.Data.setValue("enterpas",1,amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
    }else{
    savedats = false;
datbtns.setBackgroundDrawable(bgss);
amster_OS.Data.setValue("enterpas",0,amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
    }
      } 
     })); 
lay.addView(datbtn);

var datbtns = new TextView(ctx);
if(!savedats){
datbtns.setBackgroundDrawable(bgss);
}else{
datbtns.setBackgroundDrawable(bgs);
}
datbtns.setLayoutParams(params3);
     datbtns.setOnClickListener(new View.OnClickListener({ 
     onClick: function(viewarg){ 
if(!savedats){
    savedats = true;
viewarg.setBackgroundDrawable(bgs);
amster_OS.Data.setValue("enterpas",1,amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
    }else{
    savedats = false;
viewarg.setBackgroundDrawable(bgss);
amster_OS.Data.setValue("enterpas",0,amster_OS.my_root.system_path+"data/"+amster_OS.my_root.current_user+".amos")
    }
      } 
     })); 
     lay.addView(datbtns);

    

  ENDUI= new PopupWindow(lays, UiWidth/2, UiHeight/1.5);      
ENDUI.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
ENDUI.setAnimationStyle(animation);
            ENDUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
openedit: function (view,text){
temped=new EditText(ctx);
temped.setTextSize(7);
if(text!=null)temped.setText(text);
temped.setTextColor(Color.WHITE);				
temped.setHintTextColor(Color.parseColor("#b7b7b7"));
temped.setOnKeyListener(new View.OnKeyListener() {
        onKey: function(v,keyCode,event) {
            if ((event.getAction() == 	android.view.KeyEvent.ACTION_DOWN) && (keyCode == 	android.view.KeyEvent.KEYCODE_ENTER)) {
                editp.dismiss();
                return true;
            }
            return false;
        }
    });
temped.addTextChangedListener(new android.text.TextWatcher() {
	afterTextChanged: function(text) {
		try{
			view.setText(text);
		}catch(e){clientMessage(e)}
	}
});
editp = new PopupWindow(temped, WR_CNT, WR_CNT,true);
editp.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
editp.setWidth(2);
editp.setHeight(2);
editp.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0,0);
new android.os.Handler().postDelayed(new Runnable({
	run: function() {
		temped.dispatchTouchEvent(MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), MotionEvent.ACTION_DOWN , 0, 0, 0));
		temped.dispatchTouchEvent(MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), MotionEvent.ACTION_UP , 0, 0, 0));
	}
}), 200);
 },
bgmenu: function (bool){
     var black_bg = new GradientDrawable();
black_bg.setColors([Color.parseColor(amster_OS.graphics.system_design.cl1),Color.parseColor(amster_OS.graphics.system_design.cl2)])
GradientDrawable.Orientation.TL_BR
eval("black_bg.setOrientation(GradientDrawable.Orientation."+amster_OS.graphics.system_design.gr+")");
var lays = new LinearLayout(ctx);
  lays.setOrientation(1);
var leavebtn = new amster_OS.launcher.bar.createpanelimg(amster_OS.launcher.bar.getbitmap(48,96));
leavebtn.setLayoutParams(new LayoutParams(amster_OS.screen.dipSize(27), amster_OS.screen.dipSize(27)));
leavebtn.setOnClickListener(new View.OnClickListener({
                onClick: function(viewarg){
ENDUI.dismiss();
PHUI.dismiss();
amster_OS.start_os.firstload();
}      
}));
if(bool){
lays.addView(leavebtn);
}
  PHUI= new PopupWindow(lays, UiWidth/1, UiHeight/1);      
PHUI.setBackgroundDrawable(black_bg); 
PHUI.setAnimationStyle(animation);
            PHUI.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER | Gravity.CENTER,0, 0);
},
startlevel: function(){
this.fullstart();
},
fullstart: function (){
amster_OS.createsystemapps.settings.resetConfig();
amster_OS.createsystemapps.settings.loadConfig();
amster_OS.launcher.loadBg();
amster_OS.launcher.init();
if(amster_OS.createsystemapps.settings.seetablebar){
amster_OS.launcher.bar.init();
}
}
}
}

amster_OS.start_os.init();
