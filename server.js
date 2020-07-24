const net = require('net');

var inp=`12
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
process.stdout.write(inp);

var server=net.createServer(c=>{
  console.log('client connected');
  c.on('end',()=>{console.log('client disconnected');});
  c.write(inp);
  c.pipe(process.stdout);
});
server.on('error',err=>{throw err;});
server.listen(30500,()=>{console.log('server bound');});
