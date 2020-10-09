module.exports = function check(str, bracketsConfig) {
    const breakException = {};
    const stack = [];

    if (!str || !Array.isArray(bracketsConfig) || bracketsConfig.length === 0) {
        return false;
    }
    
    try {
        [...str].forEach(char => {
            const findBracket = element => element.includes(char);
            const configIndex = bracketsConfig.findIndex(findBracket);

            if (configIndex === -1) {
                throw breakException;
            }
            /*bracketType 
            //0 - open bracket, 
            //1 - close bracket
            */
            let bracketType = bracketsConfig[configIndex].indexOf(char);
            const sameBrackets = bracketsConfig[configIndex][0] === bracketsConfig[configIndex][1]; 

            //analyze the same brackets before push
            if (sameBrackets) {
                if (stack.length > 0) {
                    const previousChar = stack[stack.length-1];
                    bracketType = previousChar.char !== char ? 0 : 1;   //if previous char is not the same it means than current char is open bracket
                } else {
                    bracketType = 0;    //it's open bracket if stack is empty
                }
            }
            
            if (bracketType === 0) {
                stack.push({ configIndex, bracketType, char });
            } else {
                //compare open brackets
                const openBracket = stack.pop();
                if( !openBracket || 
                    ((configIndex !== openBracket.configIndex || openBracket.bracketType !== 0)) && !sameBrackets) {
                    
                    throw breakException;
                }
            }
        });
    } catch(e) {
        if (e !== breakException) { 
            throw e;
        } else {
            return false;
        }
    }
    
    if (stack.length > 0) {
        return false;
    }
    return true;
}
