import api from './definition';
//首页
const indexApi = api.post("/Index/index");
const subList = api.post("/Commonajax/subjectList");

//题库
const treeData = api.post("/Commonajax/knowList");
const fitterData = api.post("/Commonajax/getQtpDiffGrade");
const items = api.post("/Commonajax/searchQtrunk")
        
//更多试卷
const PaperList = api.post("/Index/pagePaperList");

//试卷详情
const paperDtail = api.post("/Paper/paperInfo");              

//在线自测
const myTest = api.post("/Exam/onlineExam");
const subimtTest = api.post("/Exam/saveExam");

// 试题篮 添加试题
const additem = api.post("/Qtrunk/addSkep");
      
//测试结果    
const result = api.post("/Exam/examResult");

const resultCrad = api.post("/Exam/examResultSheet");


   


const recommend = api.post("/Index/pagePaperList");

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
    resultCrad
}