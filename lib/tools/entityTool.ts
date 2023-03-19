export const generateForm = function <A, B>(entity: A, ...arg: string[]): B {
    const origin = new Object();
    const target = new Object();

    Object.assign(origin, entity);
    arg.forEach((key: string) => {
        Object.defineProperty(origin, key, { enumerable: false })
    })
    const keys = Object.keys(origin);

    keys.forEach((key: string) => {
        target[key] = origin[key]
    })
    return target as B;
}

export const translate = (str: string) => {
    switch (str) {
        case "addressEngland": return "英国地址";
        case "applyPurpose": return "申请目的";
        case "birthday": return "生日";
        case "birthplace": return "出生地";
        case "BRP": return "BRP号码";
        case "BRPIssue": return "BRP签发日";
        case "BRPValidity": return "BRP有效期";
        case "chineseName": return "中文名";
        case "collegeAddress": return "学校地址";
        case "collegeEmail": return "大学邮箱";
        case "collegeName": return "学校名称";
        case "collegePhone": return "学校电话";
        case "DLS_Number": return "DLS表号码";
        case "email": return "电子邮件";
        case "estDepartureTime": return "预计出发时间";
        case "estInterviewTime": return "期望面试时间";
        case "estReturnTime": return "估计返回时间";
        case "firstName": return "名拼音";
        case "handHistoryCode": return "历史递签号码";
        case "handHistoryCountry": return "历史递签国家";
        case "handHistoryDate": return "历史递签日期";
        case "handHistoryExist": return "存在递签历史(0/1)";
        case "handHistoryValidity": return "历史递签有效期";
        case "handSignCity": return "递签城市";
        case "handSignCountry": return "递签国家";
        case "lastName": return "姓拼音";
        case "mailAddress": return "邮寄地址";
        case "marriedStatus": return "婚姻状态(0/1/2)";
        case "nationality": return "国籍";
        case "nationalityPre": return "曾国籍";
        case "passportCode": return "护照代码";
        case "passportFrom": return "护照签发国";
        case "passportIssue": return "护照签发日";
        case "passportValidity": return "护照有效期";
        case "personStatus": return "个人状态(0/1/2/3/4)";
        case "phoneEngland": return "英国电话";
        case "sex": return "性别";
        case "subjectName": return "专业名";
        case "tableDLS": return "是否填写过DLS";
        case "visaType": return "签证类型(1/2/3)";
        case "wechatId": return "微信号";
        default: return str;
    }
}