var exit = 0;

function disableText(id) {
	document.getElementById(id).disabled = true;
}

function enableText(id) {
	document.getElementById(id).disabled = false;
}

function add(char, num) {
    
	if (char>='a' && char<='d'){
    	num.Value+=1;
    } else if (char>='e' && char<='h') {
    	num.Value+=2;
    } else if ((char>='i' && char<='n') || char=='2' || char=='4' || char=='6') {
    	num.Value+=3;
    } else if ((char>='o' && char<='r') || char=='3' || char=='5' || char=='7') {
    	num.Value+=4;
    } else if ((char>='s' && char<='v') || char=='8' || char=='0') {
    	num.Value+=5;
    } else if ((char>='w' && char<='z') || char=='9' || char=='1') {
    	num.Value+=6;
    }
    
}

function color(name) {
	var num = {Value: 0}, hex;
    
	//make name lowercase and remove symbols
    for (var i=0; i<name.length; ++i) {
    	if (name[i]>='A' && name[i]<='Z') {
        	name = name.replace(name[i],name[i].toLowerCase());
        } else if (name[i]>='a' && name[i]<='z') {
        	continue;
        } else if (name[i]>='0' && name[i]<='9') {
        	continue;
        } else {
        	name = name.replace(name[i],"");
            --i;
        }
    }
   
    var len = name.length;
    
    if (len==0) {
    	++exit;
        return;
    }
    
    var first = name[0];
    
    add(first, num);
    
    
    if (len>1) {
    	
    	var last = name[len-1];
        add(last, num);
    
    }
    
    
    if (len>3) {
    	
  		var third = name[2];
        add(third, num);
    	
    }
    
    if (num.Value<1 || num.Value>18) {
        ++exit;
        return;
    }
    
    if (num.Value==3 || num.Value==9 || num.Value==16) {
		hex="19afab";
	} else if (num.Value==4 || num.Value==10 || num.Value==15 || num.Value==12) {
		hex="949beb";
	} else if (num.Value==5 || num.Value==11 || num.Value==17) {
		hex="b0d5ef";
	} else if (num.Value==6 || num.Value==13 || num.Value==18) {
		hex="0589b9";
	} else if (num.Value==7 || num.Value==14 || num.Value==2) {
		hex="ef8686";
	} else {
		hex="f0b3ee";
	}
    
    return hex;
    
}

function createImage() {
     var r1 = document.getElementsByName("row1");
     var r2 = document.getElementsByName("row2");
     var r3 = document.getElementsByName("row3");
     var c1 = document.getElementsByName("col1");
     var c2 = document.getElementsByName("col2");
     var c3 = document.getElementsByName("col3");
     var arr = [r1, r2, r3, c1, c2, c3];
     var rChecked = ["empty", "empty", "empty"];
     var cChecked = ["empty", "empty", "empty"];
     for (var i=0; i<arr.length; i++) {
        for (var j=0; j<arr[i].length; j++) {
        	if (arr[i][j].checked) {
           		if (i<3) {
                	if (arr[i][j].value=="name") {
                    	rChecked[i] = document.getElementById(arr[i][j].name).value;
                    } else {
                      	rChecked[i] = arr[i][j].value;
                    }
            	} else {
                	if (arr[i][j].value=="name") {
                    	cChecked[i-3] = document.getElementById(arr[i][j].name).value;
                    } else {
                      	cChecked[i-3] = arr[i][j].value;
                    }
                }
        	}
        }
     }
     
     var k = 0;
     var t = 0;
     while (rChecked[k]) {
     	if (rChecked[k] == "empty") {
        	rChecked.splice(k,1);
        } else {
        	++k;
        }
        
     }
     while (cChecked[t]) {
     	if (cChecked[t] == "empty") {
        	cChecked.splice(t,1);
        } else {
        	++t;
        }
        
     }
     
     var tbl = document.createElement("table");
	 tbl.cellSpacing = "0";
	 var rLen = rChecked.length;
     
     if (rLen==0) {
     	alert("Must have at least 1 row.");
		return;
	}
     
     var cLen = cChecked.length;
     
     if (cLen==0) {
     	alert("Must have at least 1 column.");
        return;
     } 
     
     for (i=0; i<=cLen; i++) {
     	var tr = document.createElement("tr");
        for (j=0; j<=rLen; j++) {
        	var td = document.createElement("td");
            if (i<cLen) {
            	if (j<rLen) {
                	td.style.backgroundColor = "transparent";
                    if (rLen==1) {
                    	td.width = "60";
                    } else if (rLen==2) {
                    	td.width = "30";
                    } else if (rLen==3) {
                    	td.width = "20";
                    }
                    if (cLen==1) {
                    	td.height = "45";
                    } else if (cLen==2) {
                    	td.height = "22.6";
                    } else if (cLen==3) {
                    	td.height = "13.6";
                    }
                } else {
                	if (cChecked[i]=="geo") {
                    	td.style.backgroundColor = "#ffc390";
               		} else if (cChecked[i]=="time") {
                   		td.style.backgroundColor = "#efd873";
                	} else if (cChecked[i]=="measures") {
                    	td.style.backgroundColor = "#afe0a5";
                	} else {
                    	td.style.backgroundColor = color(cChecked[i]);
                    }
                    td.width = "160";
                }
            } else {
                if (rChecked[j]=="geo") {
                  	td.style.backgroundColor = "#ffc390";
               	} else if (rChecked[j]=="time") {
               		td.style.backgroundColor = "#efd873";
               	} else if (rChecked[j]=="measures") {
                   	td.style.backgroundColor = "#afe0a5";
               	} else if (j==rLen) {
                	td.style.backgroundColor = "bbbdbf";
                } else {
                	td.style.backgroundColor = color(rChecked[j]);
                }
                td.height = "75.2";
            }
            
        	tr.appendChild(td);
        }
        tbl.appendChild(tr);
     }
     
     /*if (exit>0) {
     
        exit = 0;
    	alert("Invalid input. Please check your data names.");
        return;
        
     }*/
     
     document.body.appendChild(tbl);
        
}
