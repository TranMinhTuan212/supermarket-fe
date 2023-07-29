import { FILE_FORMAT, IS_CATEGORY, IS_NUMBER, NOT_EMPTY } from "~/enum"


function nullOrUndefinedOrEmpty(value) {
    if (value === undefined || value === null) {
      return true;
    }
  
    if (typeof value === 'string') {
        if(value.trim() === ''){
            return true
        }
    }
  
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }
  
    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return true;
    }
  
    return false;
  }

function notEmpty(value){
    if(nullOrUndefinedOrEmpty(value)) return NOT_EMPTY
    return true
}

function isNumber(value){
    if(nullOrUndefinedOrEmpty(value)) return IS_NUMBER
    if(typeof(value) !== 'string') return IS_NUMBER
    if(isNaN(+value) || isNaN(Number(value))){
        return IS_NUMBER
    }
    return true
}

function isCategory(value){
    if(typeof isNumber(value) === 'string'){
        return IS_CATEGORY
    }
    return true
}

function typeFile(file){
    if(!file) return NOT_EMPTY
    if(typeof notEmpty(file.name) === "string") return NOT_EMPTY
    const arr = file.name.split('.')
    const type = arr[arr.length - 1]

    switch (type){
        case 'jpg':
            return true
        case 'png':
            return true
        // eslint-disable-next-line no-duplicate-case
        case 'jpg':
            return true
        default:
            return FILE_FORMAT
    }
}

function validateForm(value, arr){
    let flag = true
    arr.forEach(element => {
        if(typeof element(value) === "string"){
            flag = element(value)
            return
        }
    });
    return flag
}

export { nullOrUndefinedOrEmpty, notEmpty, isNumber, typeFile, validateForm, isCategory }