var numStack = []; //stack of operand(number)
var tempSum = 0; //預設tempSum 為0

var operatorStack = []; //用來儲存運算子的Stack
var tempOperator = ""; //預設tempOperator為""
var pressOperator = false; // 是否有按過operator按鍵 預設為沒有
var noTempOperator = true; // default is true
var noTempSum = true;
var floatCount = 0; //since default is an integer, no decimal part

var isInt = true; //default setting is integer
var pressEqual = false; //default setting is false
var dividedByZero = false; //是否除以零 預設為false

var calProcedure = ''; //上方顯示的內容預設值

function OperatorColor() { //設定四則運算的顏色(當被按的時候)
    if (tempOperator == '+') {
        document.getElementById('tdPlus').innerHTML = `<div class="keyWidth keyItem col btn border border-dark btn-light text-primary" onclick="clickPlusOrMinus('+')">+</div>`;
        document.getElementById('tdMinus').innerHTML = `<div class="keyWidth keyItem col btn border border-dark btn-primary" onclick="clickPlusOrMinus('-')">-</div>`;
        document.getElementById('tdMult').innerHTML = `<div class="keyWidth keyItem col btn border border-dark btn-primary" onclick="clickMultOrDiv('×')">x</div>`;
        document.getElementById('tdDiv').innerHTML = `<div class="keyWidth keyItem col btn border border-dark btn-primary" onclick="clickMultOrDiv('÷')">÷</div>`;
    } else if (tempOperator == '-') {
        document.getElementById('tdPlus').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickPlusOrMinus('+')">+</div>`;
        document.getElementById('tdMinus').innerHTML = `<div class="keyWidth keyItem col btn btn-light text-primary border border-dark" onclick="clickPlusOrMinus('-')">-</div>`;
        document.getElementById('tdMult').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickMultOrDiv('×')">x</div>`;
        document.getElementById('tdDiv').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickMultOrDiv('÷')">÷</div>`;

    } else if (tempOperator == '×') {
        document.getElementById('tdPlus').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickPlusOrMinus('+')">+</div>`;
        document.getElementById('tdMinus').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickPlusOrMinus('-')">-</div>`;
        document.getElementById('tdMult').innerHTML = `<div class="keyWidth keyItem col btn btn-light text-primary border border-dark" onclick="clickMultOrDiv('×')">x</div>`;
        document.getElementById('tdDiv').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickMultOrDiv('÷')">÷</div>`;

    } else if (tempOperator == '÷') {
        document.getElementById('tdPlus').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickPlusOrMinus('+')">+</div>`;
        document.getElementById('tdMinus').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickPlusOrMinus('-')">-</div>`;
        document.getElementById('tdMult').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickMultOrDiv('×')">x</div>`;
        document.getElementById('tdDiv').innerHTML = `<div class="keyWidth keyItem col btn btn-light text-primary border border-dark" onclick="clickMultOrDiv('÷')">÷</div>`;

    } else { //default情況為全部都填滿色
        document.getElementById('tdPlus').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickPlusOrMinus('+')">+</div>`;
        document.getElementById('tdMinus').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickPlusOrMinus('-')">-</div>`;
        document.getElementById('tdMult').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickMultOrDiv('×')">x</div>`;
        document.getElementById('tdDiv').innerHTML = `<div class="keyWidth keyItem col btn btn-primary border border-dark" onclick="clickMultOrDiv('÷')">÷</div>`;

    }
}

function setBackground(num) { //設定按不同數字的背景
    document.getElementById('keyBoard').style.setProperty('background-image', `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('img/${num}.gif')`);
}

function setDefaultBackground() { //設定預設背景
    document.getElementById('keyBoard').style.setProperty('background-image', `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('img/default.gif')`);
}

function keyDown(e) { //按鍵盤對應相對計算機按鈕
    let keyCode = window.event ? e.keyCode : e.which;
    console.log(`進入keyDown function, 目前key code: ${keyCode}`);

    switch (keyCode) {
        case 48: case 96: clickNum(0); break; //0
        case 49: case 97: clickNum(1); break; //1
        case 50: case 98: clickNum(2); break; //2
        case 51: case 99: clickNum(3); break; //3
        case 52: case 100: clickNum(4); break; //4
        case 53: case 101: clickNum(5); break; //5
        case 54: case 102: clickNum(6); break; //6
        case 55: case 103: clickNum(7); break; //7
        case 56: case 104: clickNum(8); break; //8
        case 57: case 105: clickNum(9); break; //9
        case 110: case 190: clickDot(); break; //.
        case 13: clickEqual(); break; //=
        case 106: clickMultOrDiv('×'); break; //*
        case 111: clickMultOrDiv('÷'); break; ///
        case 109: clickPlusOrMinus('-'); break; //-
        case 107: clickPlusOrMinus('+'); break; //+
    }
}

function clickPercent() {
    console.groupCollapsed('回傳當前數字tempSum的百分比%');
    console.log(`讀入尚未動作時 tempSum: ${tempSum}, 資料型態為 ${typeof tempSum}`);
    tempSum /= 100;
    console.log(`運算完回傳前   tempSum: ${tempSum}, 資料型態為 ${typeof tempSum}`);
    console.groupEnd();
    document.getElementById('displayResult').innerHTML = tempSum;
}

function clickPlusAndMinusSign() {
    console.groupCollapsed('正負號改變');
    console.log(`正負號改變, 改變前tempSum: ${tempSum}, 資料型態為 ${typeof tempSum}`);
    tempSum *= -1;
    console.log(`正負號改變 回傳tempSum, 改變後tempSum: ${tempSum}, 資料型態為 ${typeof tempSum}`);
    console.groupEnd();
    document.getElementById('displayResult').innerHTML = tempSum;
}

function clickAllClear() { //預設為AC 有輸入數字之後轉變成C C按一次之後C->AC 但此時會有operator 再按一次完全歸零
    setDefaultBackground();
    console.groupCollapsed(`clickAllClear, 將所有參數調回預設`);
    console.log(`numStack 調整前為 ${numStack}, tempSum 調整前為 ${tempSum},operatorStack 調整前為 ${operatorStack},tempOperator 調整前為 ${tempOperator},pressOperator 調整前為 ${pressOperator},noTempOperator 調整前為 ${noTempOperator},floatCount 調整前為 ${floatCount},isInt 調整前為 ${isInt},pressEqual 調整前為 ${pressEqual},`);
    numStack = []; //stack of operand(number)
    tempSum = 0; //default num is 0

    operatorStack = []; //stack of operator
    tempOperator = ""; //default no operator
    OperatorColor();
    pressOperator = false; // 是否有按過operator按鍵 預設為沒有
    noTempOperator = true; // default is true

    floatCount = 0; //since default is an integer, no decimal part

    isInt = true; //default setting is integer
    pressEqual = false; //default setting is false
    var dividedByZero = false;

    console.log(`numStack 調整後為 ${numStack}, tempSum 調整後為 ${tempSum},operatorStack 調整後為 ${operatorStack},tempOperator 調整後為 ${tempOperator},pressOperator 調整後為 ${pressOperator},noTempOperator 調整後為 ${noTempOperator},floatCount 調整後為 ${floatCount},isInt 調整後為 ${isInt},pressEqual 調整後為 ${pressEqual},`);
    console.groupEnd();
    document.getElementById('displayResult').innerHTML = tempSum;
    document.getElementById('displayPrecedure').innerHTML = '';
}

function clickClear() {
    console.groupCollapsed(`按了clear, 清除前tempSum = ${tempSum}, floatCount = ${floatCount}`);
    tempSum = 0;
    floatCount = 0;
    document.getElementById('displayResult').innerHTML = tempSum;
    //document.getElementById('displayPrecedure').innerHTML = '';
    console.groupCollapsed(`按了clear, 清除前tempSum = ${tempSum}, floatCount = ${floatCount}`);
    document.getElementById('tdClearAndAllClear').innerHTML = '<div class="keyWidth keyItem col btn btn-light border border-dark" onclick="clickAllClear()">AC</div>';
    console.groupEnd();
}

function clickDot() {
    if (isInt) {
        console.log(`點擊小數點, 目前isInt為 ${isInt} floatCount為 ${floatCount}`);
        isInt = false;
        floatCount++;
        console.log(`將isInt轉為false並且floatCount++, 目前isInt為 ${isInt} floatCount為 ${floatCount}`);
    }
}

function clickEqual() { //怪怪的要改
    console.log(`按了等號, 進入等號function當中, 此時pressEqual: ${pressEqual}`);
    // 可能要拆成有按過跟沒按過處理
    if (!pressEqual) {
        console.log(`尚未按過等號, 此時的 tempSum = ${tempSum}`);
        pressEqual = true;
        console.log(`設定pressEuqal狀態, 此時pressEqual: ${pressEqual}`);
        if (tempSum == 0 && noTempSum == true) { //如果按了數字+運算子就按等號 從numStack複製一個數字給暫存數字用
            console.log(`因為沒有tempSum, 進入迴圈 tempSum = ${tempSum}`);

            tempSum = numStack[0];
            console.log(`複製numStack[0]至tempSum 迴圈結束 tempSum = ${tempSum}`);
            operatorStack.push(tempOperator);
        }
        //下方兩行是關於計算過程顯示
        document.getElementById('displayPrecedure').innerHTML += tempSum;
        document.getElementById('displayPrecedure').innerHTML += ' =';
        console.log(`tempSum目前為 ${tempSum}, 資料型態為 ${typeof tempSum}`);
        numStack.push(tempSum); //將tempSum push至numStack
        tempSum = 0; //並且將暫存歸零
        console.log(`tempSum目前為 ${tempSum}, 資料型態為 ${typeof tempSum}`);
        console.log(`numStack的長度為: ${numStack.length} operatorStack的長度為: ${operatorStack.length}`);
        if (numStack.length >= 2 && operatorStack.length >= 1) { //也許後面那個條件可以移除 再測試
            if (operatorStack[operatorStack.length - 1] == "×") {
                console.log(`在operatorStack最上層的運算子為"×", 將前面兩個暫存數字做乘法運算`);
                let temp2 = numStack.pop(); //在上面的是被×的
                let temp2_d = 0;
                if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
                console.log(`temp2目前為${temp2}, 小數點位數是 ${temp2_d}`);
                let temp1 = numStack.pop();
                let temp1_d = 0;
                if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
                console.log(`temp1目前為${temp1}, 小數點位數是 ${temp1_d}`);
                let result = parseFloat((temp1 * temp2).toFixed(temp1_d + temp2_d));
                tempSum = temp2;
                numStack.push(result); //運算完放回numStack
                document.getElementById("displayResult").innerHTML = result;
                tempOperator = operatorStack.pop(); //運算完移除"×"
                OperatorColor();
            } else if (operatorStack[operatorStack.length - 1] == "÷") {
                console.log(`在operatorStack最上層的運算子為"÷", 將前面兩個暫存數字做除法運算`);
                let temp2 = numStack.pop() * 1; //在上面的是被除的
                let temp1 = numStack.pop() * 1;
                tempSum = temp2 * 1;
                if (temp2 == 0) {
                    console.log('除數為零 錯誤');
                    document.getElementById("displayResult").innerHTML = "錯誤, 無法除以零"; //可能還要補其他東西
                    dividedByZero = true;
                } else {
                    let result = (temp1 * 10) / (temp2 * 10);
                    numStack.push(result); //運算完放回numStack
                    document.getElementById("displayResult").innerHTML = parseFloat(result.toFixed(12));
                    tempOperator = operatorStack.pop(); //運算完移除"÷"
                    OperatorColor();
                }
            } else if (operatorStack[operatorStack.length - 1] == "+") {
                console.log(`在operatorStack最上層的運算子為"+", 將前面兩個暫存數字做加法運算`);
                let temp2 = numStack.pop() * 1; //在上面的是被+的
                let temp2_d = 0;
                if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
                console.log(`temp2目前是${temp2} 小數點位數是 ${temp2_d}`);
                let temp1 = numStack.pop() * 1;
                let temp1_d = 0;
                if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
                console.log(`temp1目前是${temp1} 小數點位數是 ${temp1_d}`);
                tempSum = temp2 * 1;
                let result = parseFloat((temp1 + temp2).toFixed(temp1_d > temp2_d ? temp1_d : temp2_d));
                numStack.push(result); //運算完放回numStack
                document.getElementById("displayResult").innerHTML = result;
                tempOperator = operatorStack.pop(); //運算完移除"+"
                OperatorColor();
            } else if (operatorStack[operatorStack.length - 1] == "-") {
                console.log(`在operatorStack最上層的運算子為"+", 將前面兩個暫存數字做減法運算`);
                let temp2 = numStack.pop() * 1; //在上面的是被減的
                let temp2_d = 0;
                if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
                console.log(`temp2目前為${temp2}, 小數點位數是 ${temp2_d}`);
                let temp1 = numStack.pop() * 1;
                let temp1_d = 0;
                if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
                console.log(`temp1目前為${temp1}, 小數點位數是 ${temp1_d}`);
                tempSum = temp2 * 1;
                let result = parseFloat((temp1 - temp2).toFixed((temp1_d > temp2_d) ? temp1_d : temp2_d));
                numStack.push(result); //運算完放回numStack
                document.getElementById("displayResult").innerHTML = result;
                tempOperator = operatorStack.pop(); //運算完移除"-"
                OperatorColor();
            }
        }
        console.log(`運算完畢, numStack目前裡面有: ${numStack}, operatorStack目前裡面有: ${operatorStack}`);
        pressOperator = false; //此時的運算子已經被按過了
        console.log(`判斷暫存運算子原本為 noTempOperator: ${noTempOperator}, tempOperator = ${tempOperator}`);
        noTempOperator = true; //且暫存運算子是空白
        //tempOperator = ''; //此時的暫存運算子為""
        console.log(`判斷暫存運算子現在為 noTempOperator: ${noTempOperator}, tempOperator = ${tempOperator}`);
        console.groupEnd();
    } else { //如果已經按過等號
        //下方兩行是關於計算過程顯示
        document.getElementById('displayPrecedure').innerHTML = numStack[numStack.length - 1];
        document.getElementById('displayPrecedure').innerHTML += ` ${tempOperator} ${tempSum} =`;
        console.log(`tempSum目前為 ${tempSum}, 資料型態為 ${typeof tempSum}`);
        numStack.push(tempSum); //將tempSum push至numStack
        tempSum = 0; //並且將暫存歸零
        console.log(`tempSum目前為 ${tempSum}, 資料型態為 ${typeof tempSum}`);
        console.log(`numStack的長度為: ${numStack.length} operatorStack的長度為: ${operatorStack.length}`);
        if (tempOperator == "×") {
            console.log(`在operatorStack最上層的運算子為"×", 將前面兩個暫存數字做乘法運算`);
            let temp2 = numStack.pop() * 1; //在上面的是被×的
            let temp2_d = 0;
            if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
            console.log(`temp2目前為${temp2}, 小數點位數是 ${temp2_d}`);
            let temp1 = numStack.pop() * 1;
            let temp1_d = 0;
            if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
            console.log(`temp1目前為${temp1}, 小數點位數是 ${temp1_d}`);
            let result = parseFloat((temp1 * temp2).toFixed(temp1_d + temp2_d));
            tempSum = temp2;
            numStack.push(result); //運算完放回numStack
            document.getElementById("displayResult").innerHTML = result;
        } else if (tempOperator == "÷") {
            console.log(`在operatorStack最上層的運算子為"÷", 將前面兩個暫存數字做除法運算`);
            let temp2 = numStack.pop() * 1; //在上面的是被除的
            let temp1 = numStack.pop() * 1;
            tempSum = temp2 * 1;
            if (temp2 == 0) {
                console.log('除數為零 錯誤');
                document.getElementById("displayResult").innerHTML = "錯誤, 無法除以零"; //可能還要補其他東西
            } else {
                let result = (temp1 * 10) / (temp2 * 10);
                numStack.push(result); //運算完放回numStack
                document.getElementById("displayResult").innerHTML = parseFloat(result.toFixed(12));
            }
        } else if (tempOperator == "+") {
            console.log(`在operatorStack最上層的運算子為"+", 將前面兩個暫存數字做加法運算`);
            let temp2 = numStack.pop() * 1; //在上面的是被+的
            let temp2_d = 0;
            if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
            console.log(`temp2目前為${temp2}, 小數點位數是 ${temp2_d}`);
            let temp1 = numStack.pop() * 1;
            let temp1_d = 0;
            if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
            console.log(`temp1目前為${temp1}, 小數點位數是 ${temp1_d}`);
            tempSum = temp2 * 1;
            let result = parseFloat((temp1 + temp2).toFixed(temp1_d > temp2_d ? temp1_d : temp2_d));
            numStack.push(result); //運算完放回numStack
            document.getElementById("displayResult").innerHTML = result;
        } else if (tempOperator == "-") {
            console.log(`在operatorStack最上層的運算子為"+", 將前面兩個暫存數字做減法運算`);
            let temp2 = numStack.pop() * 1; //在上面的是被減的
            let temp2_d = 0;
            if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
            console.log(`temp2目前為${temp2}, 小數點位數是 ${temp2_d}`);
            let temp1 = numStack.pop() * 1;
            let temp1_d = 0;
            if (!Number.isInteger(temp1)) temp1.toString().split('.')[1].length;
            console.log(`temp1目前為${temp1}, 小數點位數是 ${temp1_d}`);
            tempSum = temp2 * 1;
            let result = parseFloat((temp1 - temp2).toFixed(temp1_d > temp2_d ? temp1_d : temp2_d));
            numStack.push(result); //運算完放回numStack
            document.getElementById("displayResult").innerHTML = result;
        }
    }
}
function clickMultOrDiv(str) {
    noTempSum = true;
    isInt = true; //先重置小數點的兩個屬性
    floatCount = 0;
    if (tempOperator) { //如果按了等於再按乘法或是除法 因為tempOperator !='' 為真
        //下方兩行是關於計算過程顯示
        document.getElementById('displayPrecedure').innerHTML = numStack[numStack.length - 1];
        document.getElementById('displayPrecedure').innerHTML += ` ${str}`;
        pressOperator = true; //此時的運算子已經被按過了
        console.log(`判斷暫存運算子原本為 noTempOperator: ${noTempOperator}, tempOperator = ${tempOperator}`);
        noTempOperator = false;
        tempOperator = str;
        OperatorColor();
        tempSum = 0;
        pressEqual = false;
    }
    if (!pressOperator) { //當還沒有按過運算子的時候
        document.getElementById('displayPrecedure').innerHTML += tempSum;
        document.getElementById('displayPrecedure').innerHTML += ` ${str}`;
        console.groupCollapsed('尚未按過運算子, 按Xor/, 將tempSum psuh至numStack');
        console.log(`tempSum目前為 ${tempSum}, 資料型態為 ${typeof tempSum}`);
        numStack.push(tempSum); //將tempSum push至numStack
        tempSum = 0; //並且將暫存歸零
        console.log(`tempSum目前為 ${tempSum}, 資料型態為 ${typeof tempSum}`);
        console.log(`numStack的長度為: ${numStack.length} operatorStack的長度為: ${operatorStack.length}`);
        //這裡要做運算 並將結果丟到displayResult
        if (numStack.length >= 2 && operatorStack.length >= 1) { //也許後面那個條件可以移除 再測試
            if (operatorStack[operatorStack.length - 1] == "×") {
                console.log(`在operatorStack最上層的運算子為"×", 將前面兩個暫存數字做乘法運算`);
                let temp2 = numStack.pop(); //在上面的是被×的
                let temp2_d = 0;
                if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
                console.log(`temp2目前是${temp2}, 小數點位數是 ${temp2_d}`);
                let temp1 = numStack.pop();
                let temp1_d = 0;
                if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
                console.log(`temp1目前是${temp1}小數點位數是 ${temp1_d}`);
                let result = parseFloat((temp1 * temp2).toFixed(temp1_d + temp2_d));
                numStack.push(result); //運算完放回numStack
                document.getElementById("displayResult").innerHTML = result;
                operatorStack.pop(); //運算完移除"×"
            } else if (operatorStack[operatorStack.length - 1] == "÷") {
                console.log(`在operatorStack最上層的運算子為"÷", 將前面兩個暫存數字做除法運算`);
                let temp2 = numStack.pop() * 1; //在上面的是被除的
                let temp2_d = 0;
                if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
                console.log(`temp2目前是${temp2}, 小數點位數是 ${temp2_d}`);
                let temp1 = numStack.pop() * 1;
                let temp1_d = 0;
                if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
                console.log(`temp1目前是${temp1}小數點位數是 ${temp1_d}`);

                if (temp2 == 0) {
                    console.log('除數為零 錯誤');
                    document.getElementById("displayResult").innerHTML = "錯誤, 無法除以零"; //可能還要補其他東西
                    dividedByZero = true;
                } else {
                    let result = (temp1 * 10) / (temp2 * 10);
                    numStack.push(result); //運算完放回numStack
                    document.getElementById("displayResult").innerHTML = parseFloat(result.toFixed(12));
                    operatorStack.pop(); //運算完移除"÷"
                }
            }
        }
        console.log(`運算完畢, numStack目前裡面有: ${numStack}, operatorStack目前裡面有: ${operatorStack}`);
        pressOperator = true; //此時的運算子已經被按過了
        console.log(`判斷暫存運算子原本為 noTempOperator: ${noTempOperator}, tempOperator = ${tempOperator}`);
        noTempOperator = false; //且暫存運算子不是空白
        tempOperator = str; //此時的暫存運算子為"str"
        OperatorColor();
        console.log(`判斷暫存運算子現在為 noTempOperator: ${noTempOperator}, tempOperator = ${tempOperator}`);
        console.groupEnd();
    } else { //如果已經按過其他運算子
        console.log('目前在"+"運算子裡面else(已經按過運算子)');
        tempOperator = str;
        OperatorColor();
        // 以下部分關於displayProcedure顯示內容
        calProcedure = document.getElementById('displayPrecedure').innerHTML;
        document.getElementById("displayPrecedure").innerHTML = calProcedure.slice(0, calProcedure.length - 1) + `${str}`;
        calProcedure = ''; //清空calProcedure暫存
        //
    }
}

function clickPlusOrMinus(str) {
    noTempSum = true;
    isInt = true; //先重置小數點的兩個屬性
    floatCount = 0;
    if (tempOperator) { //如果按了等於再按加法或是減法
        //下方兩行是關於計算過程顯示
        document.getElementById('displayPrecedure').innerHTML = numStack[numStack.length - 1];
        document.getElementById('displayPrecedure').innerHTML += ` ${str}`;
        pressOperator = true; //此時的運算子已經被按過了
        console.log(`判斷暫存運算子原本為 noTempOperator: ${noTempOperator}, tempOperator = ${tempOperator}`);
        noTempOperator = false;
        tempOperator = str;
        OperatorColor();
        tempSum = 0;
        pressEqual = false;
    }
    if (!pressOperator) { //當還沒有按過運算子的時候
        document.getElementById('displayPrecedure').innerHTML += tempSum;
        document.getElementById('displayPrecedure').innerHTML += ` ${str}`;
        console.groupCollapsed('尚未按過運算子, 按＋or-, 將tempSum psuh至numStack');
        console.log(`tempSum目前為 ${tempSum}, 資料型態為 ${typeof tempSum}`);
        numStack.push(tempSum); //將tempSum push至numStack
        tempSum = 0; //並且將暫存歸零
        console.log(`tempSum目前為 ${tempSum}, 資料型態為 ${typeof tempSum}`);
        console.log(`numStack的長度為: ${numStack.length} operatorStack的長度為: ${operatorStack.length}`);
        //這裡要做運算 並將結果丟到displayResult
        if (numStack.length >= 2 && operatorStack.length >= 1) { //也許後面那個條件可以移除 再測試
            if (operatorStack[operatorStack.length - 1] == "×") {
                console.log(`在operatorStack最上層的運算子為"×", 將前面兩個暫存數字做乘法運算`);
                let temp2 = numStack.pop() * 1; //在上面的是被×的
                let temp2_d = 0;
                if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
                console.log(`temp2目前是${temp2}, 小數點位數是 ${temp2_d}`);
                let temp1 = numStack.pop();
                let temp1_d = 0;
                if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
                console.log(`temp1目前是${temp1}, 小數點位數是 ${temp1_d}`);
                let result = parseFloat((temp1 * temp2).toFixed(temp1_d + temp2_d)); //parseFloat去掉後面的零
                numStack.push(result); //運算完放回numStack
                document.getElementById("displayResult").innerHTML = result;
                operatorStack.pop(); //運算完移除"×"
            } else if (operatorStack[operatorStack.length - 1] == "÷") {
                console.log(`在operatorStack最上層的運算子為"÷", 將前面兩個暫存數字做除法運算`);
                let temp2 = numStack.pop() * 1; //在上面的是被除的
                let temp1 = numStack.pop() * 1;
                if (temp2 == 0) {
                    console.log('除數為零 錯誤');
                    document.getElementById("displayResult").innerHTML = "錯誤, 無法除以零"; //可能還要補其他東西
                    dividedByZero = true;
                } else {
                    let result = (temp1 * 10) / (temp2 * 10);
                    numStack.push(result); //運算完放回numStack
                    document.getElementById("displayResult").innerHTML = parseFloat(result.toFixed(12));
                    operatorStack.pop(); //運算完移除"÷"
                }
            }
            if (numStack.length >= 2 && operatorStack.length >= 1) { //如果沒有乘除或是運算完之後仍符合條件
                console.log('進行加減運算');
                if (operatorStack[operatorStack.length - 1] == "+") {
                    console.log(`在operatorStack最上層的運算子為"+", 將前面兩個暫存數字做加法運算`);
                    console.log(`此時的floatCount為 ${floatCount}`);
                    let temp2 = numStack.pop() * 1; //在上面的是被+的
                    let temp2_d = 0;
                    if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
                    console.log(`temp2目前是${temp2}, 小數點位數是 ${temp2_d}`);
                    let temp1 = numStack.pop() * 1;
                    let temp1_d = 0;
                    if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
                    console.log(`temp1目前是${temp1}, 小數點位數是 ${temp1_d}`);
                    let result = parseFloat((temp1 + temp2).toFixed((temp1_d > temp2_d) ? temp1_d : temp2_d));
                    numStack.push(result); //運算完放回numStack
                    document.getElementById("displayResult").innerHTML = result;
                    operatorStack.pop(); //運算完移除"+"
                } else if (operatorStack[operatorStack.length - 1] == "-") {
                    console.log(`在operatorStack最上層的運算子為"+", 將前面兩個暫存數字做減法運算`);
                    let temp2 = numStack.pop() * 1; //在上面的是被減的
                    let temp2_d = 0;
                    if (!Number.isInteger(temp2)) temp2_d = temp2.toString().split('.')[1].length;
                    console.log(`temp2目前是${temp2}, 小數點位數是 ${temp2_d}`);
                    let temp1 = numStack.pop() * 1;
                    let temp1_d = 0;
                    if (!Number.isInteger(temp1)) temp1_d = temp1.toString().split('.')[1].length;
                    console.log(`temp1目前是${temp1}, 小數點位數是 ${temp1_d}`);
                    let result = parseFloat((temp1 - temp2).toFixed((temp1_d > temp2_d) ? temp1_d : temp2_d));
                    numStack.push(result); //運算完放回numStack
                    document.getElementById("displayResult").innerHTML = result;
                    operatorStack.pop(); //運算完移除"-"
                }
            }
        }
        console.log(`運算完畢, numStack目前裡面有: ${numStack}, operatorStack目前裡面有: ${operatorStack}`);
        pressOperator = true; //此時的運算子已經被按過了
        console.log(`判斷暫存運算子原本為 noTempOperator: ${noTempOperator}, tempOperator = ${tempOperator}`);
        noTempOperator = false; //且暫存運算子不是空白
        tempOperator = str; //此時的暫存運算子為"str"
        OperatorColor();
        console.log(`判斷暫存運算子現在為 noTempOperator: ${noTempOperator}, tempOperator = ${tempOperator}`);
        console.groupEnd();
    } else { //如果已經按過其他運算子
        console.log('目前在"+"運算子裡面else(已經按過運算子)');
        tempOperator = str;
        OperatorColor();
        // 以下部分關於displayProcedure顯示內容
        calProcedure = document.getElementById('displayPrecedure').innerHTML;
        document.getElementById("displayPrecedure").innerHTML = calProcedure.slice(0, calProcedure.length - 1) + `${str}`;
        calProcedure = ''; //清空calProcedure暫存
        //
    }
}

function clickNum(i) {
    setBackground(i);
    noTempSum = false; //有數字會到暫存tempSum
    if (pressEqual || dividedByZero) {
        pressEqual = false;
        dividedByZero = false;
        clickAllClear();
    }
    if (noTempOperator == true) { //當還沒有按運算子的時候
        if (isInt == true) { //當還是整數時的數字
            console.groupCollapsed(`目前還是整數, isInt = ${isInt}`);
            console.log(`在存取innerHTML之前 目前tempSum是 ${tempSum}, 資料型態為${typeof tempSum}`);
            tempSum = document.getElementById('displayResult').innerHTML;
            console.log(`在存取innerHTML之後 目前tempSum是 ${tempSum}, 資料型態為${typeof tempSum}`);
            tempSum = tempSum * 10 + i;
            console.log(`做完運算 目前tempSum是 ${tempSum}, 資料型態為${typeof tempSum}`);
            document.getElementById('displayResult').innerHTML = tempSum;
            console.groupEnd();
            document.getElementById('tdClearAndAllClear').innerHTML = '<div class="keyWidth keyItem col btn btn-light border border-dark" onclick="clickClear()"> C </div>';  //按了數字之後AC -> C
        } else if (isInt == false) { //當按了小數點或是已經是小數時的數字
            console.groupCollapsed(`目前進入小數部分, isInt = ${isInt}`);
            console.log(`在存取innerHTML之前 目前tempSum是 ${tempSum}, 資料型態為${typeof tempSum}`);
            tempSum = document.getElementById('displayResult').innerHTML * 1; // string to number
            console.log(`在存取innerHTML之後 目前tempSum是 ${tempSum}, 資料型態為${typeof tempSum}`);
            let tempAdded = i;
            console.log(`準備做小數運算 目前tempAdded = ${tempAdded}, floatCount = ${floatCount}`);
            for (let i = 0; i < floatCount; i++) {
                let j = tempAdded * 10 / 100; //修正小數炸裂的運算 以下兩行同tempAdded *= 0.1;
                tempAdded = j;
            }
            console.log(`小數運算中 目前tempAdded = ${tempAdded}, 資料型態為${typeof tempAdded}`);
            console.log(`目前tempSum為${tempSum} 資料型態為${typeof tempSum}`);
            let tempSum_d = 0;
            if (!Number.isInteger(tempSum)) tempSum_d = tempSum.toString().split('.')[1].length;
            let tempAdded_d = floatCount; //tempAdded_d的位數剛好為上面floatCount
            console.log(`tempSum 目前為${tempSum} 小數位數為${tempSum_d}, tempAdded目前為${tempAdded} 小數位是為${tempAdded_d}`);
            tempSum = (tempSum + tempAdded).toFixed((tempSum_d > tempAdded_d) ? tempSum_d : tempAdded_d);
            console.log(`做完小數運算 目前tempSum是 ${tempSum}, 資料型態為${typeof tempSum}`);
            document.getElementById('displayResult').innerHTML = tempSum;
            floatCount++;
            console.groupEnd();
        }
    } else if (noTempOperator == false) { //當我們已經按了運算子又按數字時
        console.log('按了數字且之前有按過的operator, 將operator加入stack當中');
        operatorStack.push(tempOperator);//先將前面的運算子存入opStack
        console.log('此時的operatorStack裡面有: ' + operatorStack);
        tempOperator = ''; //清空暫存op
        OperatorColor();
        noTempOperator = true; //清空之後沒有暫存op
        pressOperator = false; //可以按下一次的運算子且不會被干擾
        console.log('tempSum在按按鍵之前為: ' + tempSum);
        console.log('tempSum type為: ' + typeof tempSum);
        document.getElementById('displayResult').innerHTML = tempSum;

        console.log('tempSum在這應該要等於0: ' + tempSum);
        console.log('tempSum type為: ' + typeof tempSum);
        //isInt = true; 這個逗點重置改放在四則運算前面
        //floatCount = 0;

        clickNum(i);
    }
}
