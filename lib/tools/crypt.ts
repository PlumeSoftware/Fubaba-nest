const salt = 89;//加盐
export const generateToken = function (openid: string): string {
    let sum = 0;//各位之和，结果介于1152-3416
    let token = ''
    const len = openid.length

    for (let i = 0; i < len; i++) {
        //获得某一位字符的ascii
        const code = openid.charCodeAt(i)
        token = token + code;
        sum += code;
    }

    //使最后两位作为校验位
    return token = openid + (sum % salt + 10);
}

export const checkToken = function (token: string): string | null {
    let openid = token.slice(0, -2);
    let sum = 0;
    const len = openid.length
    for (let i = 0; i < len; i++) {
        //获得某一位字符的ascii
        const code = openid.charCodeAt(i)
        sum += code;
    }
    if (String(sum % salt + 10) == token.slice(-2)) {
        return openid
    } else {
        return null
    }
}

//十进制转二进制
export const dtb = (number: number): string => {
    const remSatck = []
    let binaryString = '';
    while (number > 0) {
        let rem = Math.floor(number % 2);
        remSatck.push(rem)
        number = Math.floor(number / 2);
    }
    while (remSatck.length) binaryString += remSatck.pop()
    return binaryString
}

//二进制转10进制
export const btd = (string: string): number => {
    let result = 0;
    let len = string.length
    for (let i = 0; i < len; i++)result += Number(string[i]) * (2 ** (len - i - 1))
    return result;
}


//若不填时间参数,则获取时间为当前
export const getHour = (month?: number, date?: number, hour?: number): number => {
    //若不提供
    const time = new Date();
    month = month || (time.getMonth() + 1) 
    date = date || time.getDate();
    hour = hour || time.getHours()
    //用两位32进制符可表示1024个十进制数字，而时间数与生成的随机数的和保持在1000以内
    switch (month) {
        case 12: date += 30; case 11: date += 31; case 10: date += 30; case 9: date += 30; case 8: date += 30; case 7: date += 30;
        case 6: date += 30; case 5: date += 30; case 4: date += 30; case 3: date += 30; case 2: date += 30
    }
    return (date - 1) * 24 + hour
};