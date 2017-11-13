/**
 * @sakaijun
 * pass or print 2d array via html/DOM 
 *
 */


export class View{

    printStr(op, arr){
    	var str = "";
    
    	for(var i = 0; i < arr.length; i++){		   		
			for(var j = 0; j < arr[i].length; j++){				
				for(var k = 0; k < arr[i][j].length; k++){
					if(k === 0){
						str += `(${arr[i][j][k]}\u0020`;	
					}else if(k === arr[i][j].length-1){
						str += `${arr[i][j][k]})`;		
					}else{						
						str += `${arr[i][j][k]}\u0020`;
					}											
					if(k === arr[i][j].length-1){
						str += "\r\n";						
					}								
				}			
			}
			if(i < arr.length-1){
				str += op[i]+"\r\n";
			}			
		}
		return str;
    }

    printHtml(op, arr){
		var str = "";    
    	for(var i = 0; i < arr.length; i++){
    		str +="<td><table>";    		
			for(var j = 0; j < arr[i].length; j++){				
				str += "<tr>"
				for(var k = 0; k < arr[i][j].length; k++){
					if(k === 0){
						str += `<td>(${arr[i][j][k]}</td>`;	
					}else if(k === arr[i][j].length-1){
						str += `<td>${arr[i][j][k]})</td>`;		
					}else{						
						str += `<td>${arr[i][j][k]}</td>`;
					}																	
				}				
				str += "</tr>";		
			}
			str += "</table></td>";
			if(i < arr.length-1){
				str +=`<td><table><tr>${op[i]}</tr></table></td>`;
			}	
		}
		return str;
    }

    inputHtml(m2d, k) {
        let res = "";                
        for (let i = 0; i < m2d.row; i++) {            
            for (let j = 0; j < m2d.col; j++) {                
                res += `<input type = text class = "fieldUI" id = "${k}x${i}x${j}" maxlength="4" size="1"/>`;
            }
            res += "<br>";            
        }       
        return res;
    }

}
