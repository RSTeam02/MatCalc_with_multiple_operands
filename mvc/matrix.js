/**
 * @sakaijun
 * JS Version of matrix calculation for +,-,*, with method chaining
 * Model 
 */

export class Matrix{

	constructor(matrix = []){
		this.matrix = matrix;
	}

	getMatrix(){
		return this.matrix;
	}

	matrixMult(matrixB){
		var matA = this.matrix;
		var matB = matrixB.getMatrix();
	
		try{
			if(matA[0].length === matB.length){
				var result = new Array(matA.length);
				for(var i = 0; i < matA.length; i++){
					result[i] = new Array(matB[0].length);
					matA[i] = matA[i].map(Number);					
					for(var j = 0; j < matB[0].length; j++){						
						result[i][j]=0;
						for(var k = 0; k < matA[i].length; k++){
							matB[k] = matB[k].map(Number);
							result[i][j] += matA[i][k] * matB[k][j];
						}
					}
				}
			}else{
				throw "Number of MatA-columns has to be equal with MatB-rows.";
			}
		}catch(e){
			alert(e);
		}
		return new Matrix(result);
	}	

	matrixAddSub(op, matrixB){
		var matA = this.matrix;
		var matB = matrixB.getMatrix();
		try{
			if(matA.length === matB.length && matA[0].length === matB[0].length){
				var result = [];
				for(var i = 0; i < matA.length; i++){
					matA[i] = matA[i].map(Number);
					matB[i] = matB[i].map(Number);
					result[i] = [];
					for(var j = 0; j < matB[i].length; j++){								
						result[i][j] = (op === '-')	? matA[i][j] - matB[i][j] : matA[i][j] + matB[i][j];				
					}
				}
			}else{
				throw "Number of rows and cols of both matrices has to be equal.";
			}
		}catch(e){
			alert(e);
		}	
		return new Matrix(result);
	} 
}
