
function tb8_makeArray(n){
  this.length = n;
  return this.length;
  }
  tb8_messages = new tb8_makeArray(4);
  tb8_messages[0] = ": Shunde Zhang Game Development Portfolio Website :";
  tb8_rptType = 'infinite';
  tb8_rptNbr = 5;
  tb8_speed = 60;
  tb8_delay = 2000;
  var tb8_counter=1;
  var tb8_currMsg=0;
  var tb8_tekst ="";
  var tb8_i=0;
  var tb8_TID = null;
  function tb8_pisi(){
  tb8_tekst = tb8_tekst + tb8_messages[tb8_currMsg].substring(tb8_i, tb8_i+1);
  document.title = tb8_tekst;
  tb8_sp=tb8_speed;
  tb8_i++;
  if (tb8_i==tb8_messages[tb8_currMsg].length){
  tb8_currMsg++; tb8_i=0; tb8_tekst="";tb8_sp=tb8_delay;
  }
  if (tb8_currMsg == tb8_messages.length){
  if ((tb8_rptType == 'finite') && (tb8_counter==tb8_rptNbr)){
  clearTimeout(tb8_TID);
  return;
  }
  tb8_counter++;
  tb8_currMsg = 0;
  }
  tb8_TID = setTimeout("tb8_pisi()", tb8_sp);
  }
  tb8_pisi()