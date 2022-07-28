let main = document.getElementsByClassName('calculator')[0], inp = document.getElementById('screen');
let clrScreen = false, err = 'Error', prevans = [];
let calc = '';
function number(num) {
    let input = inp.value;
    if(input == err) inp.value = '';
    let val = input.substring(input.length -1);
    if(val == ')') return;
    if(num == '.') {
       if(val == num || /\d*[\.]\w*$/g.test(input) || /[²³)]/.test(val)) { return; }
       if (clrScreen && input != err) { 
           clrScreen = false; inp.value += num;
           calc = inp.value;  return; 
        }
        inp.value += num;
        calc += num; console.log(calc); return;           
   }
    if(clrScreen == true) {
       inp.value = num; calc = ''; calc += num; console.log(calc);
      clrScreen = false;
      return;
   }
   inp.value += num;
   calc += num; console.log(calc);
}
function operator(operator) {
    if (clrScreen && inp.value != err) { clrScreen = false; calc = inp.value; }
    let val = inp.value.substring(inp.value.length -1), val2 = inp.value.substring(inp.value.length -2);
    if(inp.value == err) inp.value = '';
    if(operator == '+') {
        if(/[(÷×+^]/.test(val)) {
            return;
        }else if(/--|\^-|\+-/.test(val2)) {
            return;
        }else inp.value += operator; calc += operator; return;
    }else if(operator == '-') {
        if(/[÷×]/.test(val)) {
            return;
        }else if( /--|\^-|\+-/.test(val2) || /-+/.test(val2)) {
            return;
        }else inp.value += operator; calc += operator; return;
    }else if(operator == '×') {
        if(!val || /[(÷×\-+^]/.test(val)) {
            return;
        }else inp.value += operator; calc += '*'; return;
    }else if(operator == '÷') {
        if(!val || /[(÷×\-+^]/.test(val)) return;
        inp.value += operator; calc += '/'; return;
    }else if(operator == '^') {
        if(!val || /[(÷×\-+^]/.test(val)) return;
        inp.value += '^'; calc += '**'; return;
    }else if(operator == '(') {
        if(/[0-9)²³^]/.test(val)) return;
        inp.value += operator; calc += operator; return;
    }else if(operator == ')') {
        let inpV = inp.value, openBMatch = inpV.match(/\(/g);
        let count = openBMatch ? openBMatch.length : 0;
        let closeBMatch = inpV.match(/\)/g);
        let count2 = closeBMatch ? closeBMatch.length: 0;
        if(!val || /[÷×\-+^]/.test(val) || count2 >= count) {
            return;
        }else inp.value += operator; calc += operator; return;
    }else if(operator == 'e') {
        if(!val || /[÷(×)\-+^]/.test(val)) return;
        inp.value += operator; calc += operator; return;
    }
}
function del() {
    let valueH = inp.value;
    if(valueH.length == 0) return;
    if(valueH == err) { inp.value = ''; return; }
    if(calc.substring(calc.length-2, calc.length) == '**') {
        calc = calc.slice(0, calc.length-2); 
        inp.value = valueH.substring(0, valueH.length -1);
        console.log(calc); return;
    }else if(/n\(|s\(|g\(/.test(calc.substring(calc.length-2, calc.length))) {
        calc = calc.substring(0, calc.length-9); 
        inp.value = valueH.substring(0, valueH.length -4);
        console.log(calc); return;
    }else if(/t\(/.test(calc.substring(calc.length-2, calc.length))) {
        calc = calc.substring(0, calc.length-10); 
        inp.value = valueH.substring(0, valueH.length -4);
        console.log(calc); return;
    }else if(valueH.substring(valueH.length-1) == '²' || valueH.substring(valueH.length-1) == '³') {
        inp.value = valueH.substring(0, valueH.length -1);
        calc = calc.slice(0, calc.length-3); return;
    }else if(valueH.substring(valueH.length-1) == 'ռ') {
        inp.value = valueH.substring(0, valueH.length -1);
        calc = calc.slice(0, calc.length-17); return;
    }
    inp.value = valueH.substring(0, valueH.length -1);
    calc = calc.slice(0, calc.length-1); console.log(calc);
    if(clrScreen) {
        clrScreen = false;
        calc = inp.value;
    } 
}
function clr() {
     inp.value = ''; calc = '';
}
function equalTo() {
    let input = inp.value;
    try {
        if(input == err || input == '') return;
        let ans =  eval(calc); 
        inp.value = ans;
        clrScreen = true; prevans.unshift(ans);
    } catch (e) {
        inp.value = err;  calc = ''; prevans.unshift(err);
    }
}
function prevAns() {
    inp.value = prevans[1] || null;
    if(prevans.length > 2) prevans.pop();
}

function scienfic(str) {
    let val = inp.value.substring(inp.value.length -1);
    if(str == '³') {
        if (clrScreen && inp.value != err) { 
            clrScreen = false; calc = inp.value + '**3'; inp.value += '³'; return; 
        }
        if (!val || /\D/.test(val) && val != ')') return;
        inp.value += '³'; calc += '**3'; return;
    }else if(str == '²') {
        if (clrScreen && inp.value != err) { 
            clrScreen = false; calc = inp.value + '**2'; inp.value += '²'; return; 
        }
        if (!val || /\D/.test(val) && val != ')') return;
        inp.value += '²'; calc += '**2'; return;
    }else if(str == '3.142') {
        if (/[\d)²³]/.test(val)) return;
        inp.value += 'ռ'; calc += '3.141592653589793'; return;
    }else if(str == 'sin') {
        if (clrScreen && inp.value != err) { 
            clrScreen = false; calc = `Math.sin(${inp.value}*3.141592653589793/180)`;
            inp.value = `sin(${inp.value})`; equalTo(); return; 
        }
        if (/[\d)²³]/.test(val)) return;
        inp.value += 'sin('; calc += 'Math.sin('; return;
    }else if(str == 'cos') {
        if (clrScreen && inp.value != err) { 
            clrScreen = false; calc = `Math.cos(${inp.value}`; inp.value = `cos(${inp.value})`; return; 
        }
        if (/[\d)²³]/.test(val)) return;
        inp.value += 'cos('; calc += 'Math.cos('; return;
    }else if(str == 'tan') {
        if (clrScreen && inp.value != err) { 
            clrScreen = false; calc = `Math.tan(${inp.value})`; inp.value = `tan(${inp.value})`; return; 
        }
        if (/[\d)²³]/.test(val)) return;
        inp.value += 'tan('; calc += 'Math.tan('; return;
    }else if(str == 'log') {
        if (clrScreen && inp.value != err) { 
            clrScreen = false; calc = `Math.log(${inp.value})`; inp.value = `log(${inp.value})`; return; 
        }
        if (/[\d)²³]/.test(val)) return;
        inp.value += 'log('; calc += 'Math.log('; return;
    }else if(str == 'sqrt') {
        if (clrScreen && inp.value != err) { 
            clrScreen = false; calc = `Math.sqrt(${inp.value})`; inp.value = `sqr(${inp.value})`; return; 
        }
        if (/[\d)²³]/.test(val)) return;
        inp.value += 'sqr('; calc += 'Math.sqrt('; return;
    }
}
/*  Math.sin(30 *3.141592653589793/180) */
parseInt