import api from './definition';
//首页
const indexApi = api.post("/Index/index");
const subList = api.post("/Commonajax/subjectList");

//题库
const treeData = api.post("/Commonajax/knowList");
const fitterData = api.post("/Commonajax/getQtpDiffGrade");
const items = api.post("/Commonajax/searchQtrunk")
        
//更多试卷
const PaperList = api.post("/Index/pagePaperList")


const recommend = api.post("/Index/pagePaperList");

export  {
	indexApi,
    recommend,
    subList,
    treeData,
    fitterData,
    items,
    PaperList
}