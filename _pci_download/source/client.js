var doctorUrl = 'https://www.qcxin.com/pci-doctor/';//医生端接口
var userUrl = 'https://www.qcxin.com/pci-user/'; //用户端接口
var Statistics = 'https://www.qcxin.com/pci-operation';//统计接口
var download = 'https://www.qcxin.com/pci-operation/api/version/download';//下载包地址
var iosDoctor = "";
var iosUser = "";
var androidDoctor = "";
var androidUser = "";

//请求下载安装包地址
$.get(download, function(data) {
  if (data.code === 0) {
    iosDoctor = data.data.iosDoctor;
    iosUser = data.data.iosUser;
    androidDoctor = data.data.androidDoctor;
    androidUser = data.data.androidUser;
  }
})

$(document).ready(function(){
   StatisticsVisit(0);//进入页面调用统计接口
  //表单验证
  $(".invitation").Validform({
    tiptype:function(msg,o,cssctl){
      if(!o.obj.is("form")){
        var objtip=o.obj.parents(".content").next(".Validform_checkti");
        cssctl(objtip,o.type);
        $(objtip).css({
          "display":"block"
        });
        objtip.text(msg);
      }
    },
    datatype: {
      "tel":/^1[34578]\d{9}$/,
      "number": /^\d{6}$/,
    },
  });

  //请求验证码
  $(".getVerification").on("click",function(){
    var typeId = GetQueryString("typeId");
    var type = GetQueryString("type");
    var url ;
    if((typeId && typeId == 0) || (type && type == 0)){
      url = userUrl+"api/verification_code";
    }else if(typeId && typeId == 1){
      url = doctorUrl+"api/verification_code";
    }
    var tel = $("#mobile").val();
    if((/^1[34578]\d{9}$/).test(tel)){
      timedCount(true);
      $.ajax({
        url:url,
        data:JSON.stringify({mobile:tel}),
        type:'POST',
        contentType: 'application/json',
        success:function(result){
          if(result.code == 0){
            $('#message').text("验证码发送成功");
            $('#modal').css('display', 'block');
          }else{
            $('.getVerification').text('获取验证码');
            $('.getVerification').removeAttr('disabled');
            clearTimeout(t);
            count = 60;
            $('#Validform_checkti').html(result.msg);
            $('#Validform_checkti').css({
              display:'block'
            })
          }
        },
        error: function(){
          $('#message').text("服务器请求错误");
          $('#modal').css('display', 'block');
          $('.getVerification').text('获取验证码');
          $('.getVerification').removeAttr('disabled');
          clearTimeout(t);
          count = 60;
        }
     });
    }
  });
  
  //在浏览器中打开
  if (isWeixinBrowser()) {
    $('.cover').css('display', 'block');
  }

  $("#mobile").keyup(function(){
    $('#Validform_checkti').css({
      display:'none'
    })
  })

  //直接下载
  $(".cnet").on("click",function(){
    if (isWeixinBrowser()) {
      $('.cover').css('display', 'block');
    }else{
      var typeId = GetQueryString("typeId");
      var type = GetQueryString("type");
      if(typeId){
        if (isAndroid() && typeId == 0) {
          StatisticsVisit(2)
          window.location.href = androidUser; 
        }
        if (isIOS() && typeId == 0) {
          StatisticsVisit(1)
          window.location.href = iosUser;
        }
        if (isAndroid() && typeId == 1) {
          StatisticsVisit(2)
          window.location.href = androidDoctor;  
        }
        if (isIOS() && typeId == 1) {
          StatisticsVisit(1)
          window.location.href = iosDoctor;
        }
      }else{
        if (isAndroid()) {
          StatisticsVisit(2)
          window.location.href = androidUser;
        }
        if (isIOS()) {
          StatisticsVisit(1)
          window.location.href = iosUser;
        }
      }
    }
  });
});

//统计访问量
function StatisticsVisit(type){
  var data = {};
  var typeId = Number(GetQueryString("typeId"));
  if(typeId){
    data.product = typeId
  }else{
    data.product = Number(GetQueryString("type"));
  }
  data.type = type;
  data.qd = GetQueryString("qd") || "";
  $.ajax({
    url:Statistics + '/api/operational/pv',
    data:JSON.stringify(data),
    contentType:'application/json',
    type:'POST',
    success:function(result){
      if(result.code == 0){
        console.log("请求成功")
      }else{
        console.log('请求失败');
      }
    }
 });
}

/**
 * 获取链接地址后的参数
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}
   
//定时设置
var count = 60;
var t;
function timedCount(status) {
  $('.getVerification').attr('disabled', 'true');
  $('.getVerification').text(count + '秒后重新获取');
  count--;
  t = setTimeout("timedCount()", 1000);
  if (count < 0 ) {
    count = 60;
    $('.getVerification').text('获取验证码');
    $('.getVerification').removeAttr('disabled');
    clearTimeout(t);
  }
};

//提示信息消失
function verifyPhone(){
  $('#toast').css('display', 'none');
};

//下载医生端
$("#doctordownload").on("click",function(){
  verification(1);
});

// 关闭信息提示框
$("#close").on("click",function(){
  $("#modal").css('display', 'none')
});

//下载用户端
$("#userdownload").on("click",function(){
  if(isWeixinBrowser()) {
      $('.cover').css('display', 'block');
    }else{
      verification(0);
  }
});

//验证手机号和验证码
function verification(number){
  var verification = $("#verification").val();
  var tel = $("#mobile").val();
  if(tel && (/^1[34578]\d{9}$/).test(tel) && (/^\d{6}$/).test(verification)){
    toDownload(number);
  }else if(!tel){
    $('#toast').css({
      display:"block"
    });
    $('#toast p').html("请填写手机号");
    setTimeout("verifyPhone()",1500);
  }else if(!verification){
    $('#toast').css({
      display:"block"
    });
    $('#toast p').html("请填写验证码");
    setTimeout("verifyPhone()",1500);
  }
}

//请求下载
function toDownload(dlType) {
  var data = {};
  var tel = GetQueryString("tel");
  var type = GetQueryString("type");
  data.inviterTel = tel || "";
  data.inviterTypeIdx = type || "";
  data.inviteeTel = $("#mobile").val();
  data.inviteeTypeIdx = dlType;
  data.captcha = $("#verification").val();
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType:'application/json',
    processData:false,
    headers:{
      "version":"1.3"
    },
    url: doctorUrl + 'api/invite/relations/generate',
    success: function(data) {
      if (isAndroid() && dlType == 0 && data.code == 0) {
        StatisticsVisit(2);
        window.location.href = androidUser;
      }else if (isIOS() && dlType == 0 && data.code == 0) {
        StatisticsVisit(1);
        window.location.href = iosUser;
      }else if (isAndroid() && dlType == 1 && data.code == 0) {
        StatisticsVisit(2);
        window.location.href = androidDoctor;
      }else if (isIOS() && dlType == 1 && data.code == 0) {
        StatisticsVisit(1);
        window.location.href = iosDoctor;
      }else{
        $('#message').text(data.msg);
        $('#modal').css('display', 'block');
      }
    },
    error: function(){
      $('#message').text("服务器请求错误");
      $('#modal').css('display', 'block');
    }
  })
};



//判断安卓客户端
function isAndroid() {
  var u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

//判断IOS客户端
function isIOS() {
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

//判断是否微信浏览器
function isWeixinBrowser() {
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false;
}


