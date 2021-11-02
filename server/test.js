process.on('tick', function(count){
    console.log('tick 이벤트 발생 : %s', count);
  });
  
  setTimeout(function(){
    console.log('2초 후에 tick 이벤트 실행');
  
    process.emit('tick', '777');
  }, 2000);