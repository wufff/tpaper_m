import api from './definition';
//首页
const indexApi = api.post("/Index/index");
const subList = api.post("/Commonajax/subjectList");

//题库
const treeData = api.post("/Commonajax/knowList");
const fitterData = api.post("/Commonajax/getQtpDiffGrade");
const items = api.post("/Commonajax/searchQtrunk")
        
//更多试卷
const recommend = api.post("/Index/pagePaperList");
const PaperList = api.post("/Index/pagePaperList");

//试卷详情
const paperDtail = api.post("/Paper/paperInfo");              

//在线自测
const myTest = api.post("/Exam/onlineExam");
const subimtTest = api.post("/Exam/saveExam");

// 试题篮 添加试题

      
//测试结果    
const result = api.post("/Exam/examResult");
const resultCrad = api.post("/Exam/examResultSheet");

//试题详情
const  analysis = api.post("/Qtrunk/qtrunkInfo");

//试题篮
const cart = api.post("/Qtrunk/skep");
const cartNum = api.post("/Qtrunk/skepCount");
const savaCart = api.post("/Qtrunk/saveSkep"); 
const additem = api.post("/Qtrunk/addSkep");
const deleItems = api.post("/Qtrunk/deleteSkep");
const deleAll = api.post("/Qtrunk/deleteAllSkep");              

//个人中心
const MY = api.post("/Usercenter/userCenter");
const history_zj = api.post("/Paper/paperList")
const delePaper = api.post("/Paper/deletePaper")  
const history_xz = api.post("/Paper/paperDownloadList")
const deledown = api.post("/Paper/deletePaperDownload")              
const history_ct =  api.post("/Papererrorrecord/paperErrorRecordList")        


//下载试卷
const myDwon = api.post("/Paper/downloadPaper");
const down = api.post("/Paper/postDownloadPaper")

//登录
const getCode = api.login("/Userlogin/sendCode");
const LOGIN = api.login("/Userlogin/postCodeLogin");
const SETPWD = api.post("/Userlogin/postSetPwd");
const OUT = api.post("/Usercenter/loginOut");



export  {
	indexApi,
    recommend,
    subList,
    treeData,
    fitterData,
    items,
    PaperList,
    paperDtail,
    myTest,
    subimtTest,
    additem,
    result,
    resultCrad,
    analysis,
    deleItems,
    cart,
    cartNum,
    deleAll,
    savaCart,
    history_zj,
    delePaper,
    myDwon,
    down,
    history_xz,
    deledown,
    history_ct,
    getCode,
    LOGIN,
    MY,
    SETPWD,
    OUT
}