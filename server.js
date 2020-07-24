const net = require('net');
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

var lvl_1=`10
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
var inp=[intro,lvl_1,lvl_x4][process.argv.length==3?process.argv[3]|0:0];
process.stdout.write(inp);

var say=s=>process.stdout.write('\n'+s+'\n');
var server=net.createServer(c=>{
  process.stdout.write('client connected');
  c.on('end',()=>{say('client disconnected');process.exit();});
  c.write(intro+"\n\n");
  c.pipe(process.stdout);
});
server.on('error',err=>{throw err;});
server.listen(30500,()=>{say('server bound');});
