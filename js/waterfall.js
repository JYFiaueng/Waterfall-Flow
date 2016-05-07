var pinHArr=[];
var num = null;
var iPinW = null;
var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
window.onload=function(){
    var main = document.getElementById("main");
    Init(main,'pin');
    createimg();
    window.onscroll=function(){
        createimg();
    };
};
function createimg(){
    while(checkscrollside(main)){
        for(var i=0;i<dataInt.data.length;i++){
            var oPin=document.createElement('div');
            oPin.className='pin';
            main.appendChild(oPin);
            var oBox=document.createElement('div');
            oBox.className='box';
            oPin.appendChild(oBox);
            var oImg=document.createElement('img');
            oImg.src='./images/'+dataInt.data[i].src;
            oBox.appendChild(oImg);
        }
        addimg(main,'pin');
    }
}
//为新增的图片定位
function addimg(oParent, pin){
    var aPin=oParent.getElementsByClassName(pin);
    var tianjia = aPin.length - dataInt.data.length;
    for(var i=0;i<dataInt.data.length;i++){
        var minH=Math.min.apply(null,pinHArr);
        var minHIndex=getminHIndex(pinHArr,minH);
        aPin[tianjia+i].style.position='absolute';
        aPin[tianjia+i].style.top=minH+'px';
        aPin[tianjia+i].style.left=aPin[minHIndex].offsetLeft+'px';
        pinHArr[minHIndex]+=aPin[i].offsetHeight;
    }
}
//页面首次加载时初始化的方法
function Init(oParent,pin){
    var aPin=oParent.getElementsByClassName(pin);
    iPinW=aPin[0].offsetWidth;
    num=Math.floor(document.documentElement.clientWidth/iPinW);
    oParent.style.cssText='width:'+iPinW*num+'px;margin:0 auto;';
    for(var i=0;i<aPin.length;i++){
        var pinH=aPin[i].offsetHeight;
        if(i<num){
            pinHArr[i]=pinH;
        }else{
            var minH=Math.min.apply(null,pinHArr);
            var minHIndex=getminHIndex(pinHArr,minH);
            aPin[i].style.position='absolute';
            aPin[i].style.top=minH+'px';
            aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
            pinHArr[minHIndex]+=aPin[i].offsetHeight;
        }
    }
}
//找到minH在数组arr中的位置
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}
//如果最后一张图片中部到页面顶部的距离小于页面可视区底部到页面顶部的距离就返回true
function checkscrollside(oParent){
    var aPin=oParent.getElementsByClassName('pin');
    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;
    return lastPinH<scrollTop+documentH;
}