/**
 * @sakaijun
 * JS Version of matrix calculation for +,-,*, with method chaining
 * Control unit with GUI
 * + all matrices are stored in a 3 dim arr
 * + all operations in a single array 
 * + result of calculations are concateable with continuous operations 
 * 
 *  
 */

import { View } from "./view.js";
import { Matrix } from "./matrix.js";

export class Controller {

    constructor() {

        this.domIO = new View();
        this.arr = [];
        this.op = [];
        this.numOfMat = 0;
        this.onceChecked = false;
        this.initNewMat();
        this.dimInfo();
        this.rangeListener();
        this.btnListener();
        $("#rnd").prop('disabled', true);
        $('#rndCb').prop('checked', false);

    }

    //select row, col dim (range slider)
    rangeListener() {
        $(".inputUI").on("input", (event) => {
            this.initNewMat();
            this.dimInfo();
        });
    }

    //getter for selected row, col, show dim info via DOM 
    get2d() {

        let mat = {
            row: parseInt($("#rowSlider").val()),
            col: parseInt($("#colSlider").val())
        }
        //flip row, col when second random mat is generated and multiplied
        if (document.getElementById("rndCb").checked) {
            if (this.op[this.numOfMat - 1] === "*") {
                [mat.row, mat.col] = [mat.col, mat.row];
            }
        }
        return mat;
    }



    dimInfo() {
        $("#infoRow").html(`Rows: ${this.get2d().row}`);
        $("#infoCol").html(`Cols: ${this.get2d().col}`);
    }

    //used to set sliders of result dim 
    setRangeSlider(mat) {
        $("#rowSlider").val(mat.length);
        $("#colSlider").val(mat[0].length);
    }

    //init dim values when app starts
    initNewMat() {
        let res = "";
        //super.saveSetting("lastSettingMatCalcRange", inputUI);                  
        $("#inputField").html(this.domIO.inputHtml(this.get2d(), this.numOfMat));
        this.nullMatrix();
        this.fieldListener();
    }

    //init row, col and fill mat with 0 
    nullMatrix() {
        this.arr[this.numOfMat] = new Array(this.get2d().row).fill(0);
        for (let j = 0; j < this.get2d().row; j++) {
            this.arr[this.numOfMat][j] = new Array(this.get2d().col).fill(0);
        }
    }

    btnListener() {

        /*            
            each calculation consists of 2 operands, calculation-pairs are concateable 
            (e.g. A+B = C-D = E*F = G...etc.)
            operand + selected operator + operand = result + selected operator + operand...etc
        */
        $(".evalBtn").on("click", (event) => {
            this.numOfMat++;
            if (this.numOfMat % 2 === 0) {
                this.op[this.numOfMat - 1] = "=";
                this.calc(true);
                this.numOfMat++;
            }
            this.onceChecked = false;
            this.op[this.numOfMat - 1] = event.currentTarget.value;
            this.initNewMat();
            this.dimInfo();
        });

        /* 
            remove last result (and pop preinit array, when last action was +,- or *), 
            optional swap last 2 operands (A o B => B o A), recalculate result of swapped AB
        */
        $("#swapAB").click(() => {
            if (!this.onceChecked) {
                this.arr.pop();
                this.numOfMat--;
                this.onceChecked = true;
            }
            this.arr.pop();
            [this.arr[this.arr.length - 2], this.arr[this.arr.length - 1]] = [this.arr[this.arr.length - 1], this.arr[this.arr.length - 2]];
            this.result = new Matrix(this.arr[this.arr.length - 2]);
            this.calc(false, this.arr.length - 2);
        });

        //enable or disable random btn with checkbox
        $("#rndCb").click(() => {
            if (document.getElementById("rndCb").checked) {
                $("#rnd").prop('disabled', false);
                $("#inputField").hide();
            } else {
                $("#rnd").prop('disabled', true);
                $("#inputField").show();
            }
        });

        //listener for random generator and clear btn
        $("#clear").on("click", () => {
            this.arr = [];
            this.op = [];
            this.numOfMat = 0;
            this.onceChecked = false;
            this.initNewMat();
            $("#matInfo").html("");
        });

        //generate random matrix with selected rows, cols (0 - 99)
        $("#rnd").on("click", () => {
            var initOnce = false;
            this.nullMatrix();
            for (let j = 0; j < this.get2d().row; j++) {
                for (let k = 0; k < this.get2d().col; k++) {
                    this.arr[this.numOfMat][j][k] = Math.floor(Math.random() * 100);
                }
            }
            $("#matInfo").html(this.domIO.printHtml(this.op, this.arr));
        });
    }

    //startIdx for calculations depends on number of concatenated calculations
    calc(equals, startIdx = 0) {

        if (equals) {
            //first calculation begins by idx 0           
            startIdx = (this.numOfMat === 2) ? 0 : this.arr.length - 2;
            this.result = new Matrix(this.arr[startIdx]);
        }

        for (let i = 0 + startIdx; i < this.numOfMat - 1; i++) {
            this.result = (this.op[i] === "-" || this.op[i] === "+")
                ? this.result.matrixAddSub(this.op[i], new Matrix(this.arr[i + 1]))
                : this.result.matrixMult(new Matrix(this.arr[i + 1]));
        }
        this.setRangeSlider(this.result.getMatrix());
        this.arr.push(this.result.getMatrix());
        let html = this.domIO.printHtml(this.op, this.arr)
        let str = this.domIO.printStr(this.op, this.arr)
        $("#matInfo").html(html);
    }

    //input field listener for mats, store all entered matrices in a 3-dim array
    fieldListener() {
        $(".fieldUI").on("click keyup", (event) => {
            if (!isNaN(parseInt($(event.currentTarget).val()))) {
                let currId = event.currentTarget.id.split("x");
                this.arr[this.numOfMat][currId[1]][currId[2]] = $(event.currentTarget).val();
                $("#matInfo").html(this.domIO.printHtml(this.op, this.arr));
            }
        });
    }

}
