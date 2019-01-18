const apiUrl = `http://10.2.97.117:8080/data/get/6/60`; // 接口URL
const title = ''; // 图表标题

$(document).ready(function() {
  fetchOriginData();
});

// 获取初始化数据
function fetchOriginData() {
  $.getJSON(apiUrl, function(res) {
    if (res) {
      setMyChart(res);
    }
  });
  
  // 异常值测试数据
  // setMyChart({
  //   "-1": [
  //       {
  //           "userName": "俞国伟",
  //           "datas": [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960]
  //       },
  //       {
  //           "userName": "相品堂",
  //           "datas": [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840]
  //       }
  //   ],
  //   "-3": [
  //       {
  //           "userName": "相品堂",
  //           "datas": [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840]
  //       }
  //   ],
  //   "-5": [
  //       {
  //           "userName": "黄炳昌",
  //           "datas": [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780]
  //       }
  //   ],
  //   "-6": [
  //       {
  //           "userName": "梁赞明",
  //           "datas": [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
  //       }
  //   ]
  // });
}

// 用户列表
let userArr = [];
// x 轴数据
let xAxisArr = [];
// 图表数据
let data = [];

// 生成图表 
function setMyChart(originData) {
  // 获取页面上的 div 用于渲染图标
  const dom = document.getElementById("container");
  // 创建图表对象
  const myChart = echarts.init(dom);

  // 生成图表数据
  generateChartData(originData);
  // 配置图表选项
  const option = configChartOption(data, xAxisArr, userArr);
  // 若配置成功，则渲染图标
  if (option) {
    myChart.setOption(option, true);
  }
};

// 生成图表数据
function generateChartData(originData) {
  // 从原始数据获取 x 轴数据
  // x 轴数据即为原始数据对象的所有 key
  xAxisArr = Object.keys(originData);

  // 从原始数据中获取所有用户姓名列表
  const userNames = xAxisArr.reduce((pre, key) => {
    return [...pre, ...originData[key]]
  }, []).reduce((pre, curr) => {
    return [...pre, curr.userName]
  }, []);
  // 注：从每个对象获取的数据列表会存在重复用户，故需要去重
  userArr = Array.from(new Set(userNames));

  // 遍历用户 生成图表数据
  userArr.forEach(user => {
    let userData = [];
    xAxisArr.forEach(key => {
      // 判断列表中是否存在该用户数据 存在即保存数据 不存在即保存空数组
      let exitData = originData[key].filter(data => data.userName === user);
      if (exitData.length > 0) {
        userData.push(exitData[0].datas);
      } else {
        userData.push([]);
      }
    });
    console.log(userData);
    data.push(echarts.dataTool.prepareBoxplotData(userData));
  });
  console.log(JSON.stringify(data));
}

// 配置 config
function configChartOption(data, xAxisArr, userArr) {
  let config = null;
  if (checkNotNullArray(data) && checkNotNullArray(xAxisArr) && checkNotNullArray(userArr)) {
    config = {
      title: {
        text: title,
        left: 'center',
      },
      legend: {
        y: '10%',
        data: userArr
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '5%',
        top: '30%',
        right: '5%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: xAxisArr,
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: true
        },
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        // name: 'Value',
        splitArea: {
          show: false
        }
      },
      dataZoom: [{
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          show: true,
          height: 20,
          type: 'slider',
          top: '90%',
          xAxisIndex: [0],
          start: 0,
          end: 20
        }
      ],
      series: userArr.map((user, i) => [
        {
          name: user,
          type: 'boxplot', // 箱线图
          data: data[i].boxData,
          tooltip: { formatter: formatter }
        }, 
        {
          name: user,
          type: 'scatter', // 异常值点图
          data: data[i].outliers,
        }
      ]).reduce((pre, curr) => [...pre, ...curr], [])
    };
  }
  return config;
}

// tooltip 数据格式化 
function formatter(param) {
  console.log(param);
  return [
    param.seriesName + ': ',
    '下限: ' + param.data[1],
    'Q1: ' + param.data[2],
    '中位数: ' + param.data[3],
    'Q3: ' + param.data[4],
    '上限: ' + param.data[5]
  ].join('<br/>')
}

// 判断非空数组
function checkNotNullArray(array) {
  return array && Array.isArray(array) && array.length > 0;
}
