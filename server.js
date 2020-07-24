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
/*
//usage in http://borgar.net/programs/sokoban/#Xsokoban
var kb={
  'U':()=>sok.move(-1,00),
  'D':()=>sok.move(+1,00),
  'L':()=>sok.move(00,-1),
  'R':()=>sok.move(00,+1)
};
var cmd="L  UU LUURRRDDRDD L DDLL UU DDRRU LL RRURUULUULLLDDR DD  R LUULLDD R LUURUURRRDD L  DD UURUULLLDD R DRD L UULUURRRDDRDD L DDLL UU DDRRUURUULUULLLDDLDD R LUURUURRRDDRDDLD L  U RRUUL L  DD UURUUL DD UULLDD R LU R LDLDDR RR LLLUURUURRRDD L RUULLDLDLDDRRR U DLLLUURUR R LLDLDDRRRU U  L RDDL UU DDLLUU R UURR DD RRDD LL RRUULLUULLD R  D LLDDR RR L UU RRRDD LLL RRDDLL UU RRRUULLLLLDD R LUURRRRRDDLDDLLU R URRUULL DD UULLUURR DD LLU R LDLDDR RR LDDL U RU UU LLDD R LUURRD D UURRRDD LL  U LULLDDRDDRR UU DDLLU R LULUURRD D UULUUR DD LLDDRRRRRUUL LL RRRDDLLLLDDRRR U DLLLUUR UU RRRDD LL RDDLLLUULUU RRR LLUUR DD LLDDRDDRRRUURUU LL RRDDLDDLLLUULUUR R LLDDR R  UU DDLDDR UU DDRRUU L RD L DLLUULUURR R  DD RRUU L  L DDRDDLLLUULUURUURR DD U L RDRRDDLL UU DDRDDLLLUULUUR R UURR D  L  D LLLDDRDDRRRUURUU LL RRDDLL UU DDRDDL UU DDLLU R LULUUR R LLDDRDDRRRU L DLLUU R LLUURR D ULLDDRDDRRURURUULUULL DD LLDDRD RR DR U LLLULUURRUURRDD LL RRUU  ";
cmd=cmd.split("").filter(e=>e!=" ");
var pos=0;
var cur_int=setInterval(()=>{if(pos>=cmd.length)return clearInterval(cur_int)+console.log("done");kb[cmd[pos++]]();},100);*/
