var net=require('net');
var fs=require('fs');
var getDateTime=t=>{
  var now     = typeof t==='number'?new Date(t):new Date();
  var year    = now.getFullYear();
  var f=v=>(v.toString().length==1?'0':'')+v;
  var month   = f(now.getMonth()+1); 
  var day     = f(now.getDate());
  var hour    = f(now.getHours());
  var minute  = f(now.getMinutes());
  var second  = f(now.getSeconds()); 
  var dateTime = year+'.'+month+'.'+day+' '+hour+':'+minute+':'+second;   
  return dateTime;
}

var qap_add_time=s=>"["+getDateTime()+"] "+s;
var qap_log=s=>console.log(qap_add_time(s));

var lvl_x4=`12
####################
#   #    #   #   #@#
# $      $   $   # #
## ###..## ###     #
#   #....#$#  $### #
# $ #....#  $  $ $ #
#   #....# # # $ $ #
#   ##..##   #$#   #
##$##    ##  #  #$##
#   $  $     #  #  #
#   #    #   #     #
####################
{"url":"http://borgar.net/programs/sokoban/levels/Xsokoban.txt","level_id":4}`;

var lvl_1=`11
    #####
    #   #
    #$  #
  ###  $##
  #  $ $ #
### # ## #   ######
#   # ## #####  ..#
# $  $          ..#
##### ### #@##  ..#
    #     #########
    #######
{"url":"http://borgar.net/programs/sokoban/levels/Sokoban.txt","level_id":1}`

var intro=`5
#####
#@  #
# #$###
# $ ..#
#######
{"url":"http://borgar.net/programs/sokoban/levels/Intro.txt","level_id":1}`;

var abs=`9
 ###### 
 #    # 
##. * ##
# . $  #
# #**# #
#  *+* #
## $$ ##
 #    # 
 ###### 
{"url":"http://borgar.net/programs/sokoban/levels/David%20Holland%201.txt","level_id:"Abstract"}`;
var arr=[intro,lvl_1,lvl_x4,abs];
var inp=arr[0];
if(process.argv.length==3){
  var p2=process.argv[2];
  var id=(p2|0);
  if((id+"")==p2){inp=id in arr?arr[id]:inp;}else{
    var lines=(fs.readFileSync(p2)+"").split("\r").join("").split("\n");
    inp=[lines.length+"",...lines,JSON.stringify({fn:p2})].join("\n");
  }
}
process.stdout.write(inp);

var say=s=>qap_log('\n'+s+'\n');
var server=net.createServer(c=>{
  say('client connected');
  c.on('end',()=>{say('client disconnected');process.exit();});
  c.write(inp+"\n\n");
  c.pipe(process.stdout);
});
server.on('error',err=>{throw err;});
server.listen(30500,()=>{say('server bound');});
