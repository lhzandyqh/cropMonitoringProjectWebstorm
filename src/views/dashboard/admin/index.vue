<template>
  <div class="containers">
    <div id="mycharts" style="width: 100%;height: 500px;"></div>
<!--    <div id="BaiduContainer" style="height: 600px;width: 50%;float: left;margin-top: 50px"></div>-->
    <div id="myMap" style="height: 600px;width: 50%;float: left;margin-top: 50px"></div>
    <div style="float: left;width: 50%;margin-top: 50px">
      <div class="mychart" style="width: 100%;height: 300px;">
        <div style="text-align: center">
          <span style="color: #008acd;font-weight:normal;font-size: 18px">保单统计信息</span>
        </div>
        <div style="margin-top: 40px">
          <span style="margin-left: 40px;font-weight: bolder">全部保单：8426单</span>
        </div>
        <div style="margin-top: 20px">
          <el-row>
            <el-col :span="10">
              <div>
                <span style="margin-left: 40px;font-size: 15px;color: #6f6f6f">正在理赔保单：425单</span>
              </div>
            </el-col>
            <el-col :span="14">
              <el-progress stroke-width="9" :percentage="50"></el-progress>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 20px">
          <el-row>
            <el-col :span="10">
              <div>
                <span style="margin-left: 40px;font-size: 15px;color: #6f6f6f">预警理赔保单：245单</span>
              </div>
            </el-col>
            <el-col :span="14">
              <el-progress stroke-width="9" :percentage="23":color="warnColor" ></el-progress>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 20px">
          <el-row>
            <el-col :span="10">
              <div>
                <span style="margin-left: 40px;font-size: 15px;color: #6f6f6f">理赔完成保单：825单</span>
              </div>
            </el-col>
            <el-col :span="14">
              <el-progress stroke-width="9" :percentage="67" :color="doneColor"></el-progress>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 20px">
          <el-row>
            <el-col :span="10">
              <div>
                <span style="margin-left: 40px;font-size: 15px;color: #6f6f6f">报案保单：505单</span>
              </div>
            </el-col>
            <el-col :span="14">
              <el-progress stroke-width="9" :percentage="70":color="upColor"></el-progress>
            </el-col>
          </el-row>
        </div>
      </div>
      <div id="mychart2" style="width: 100%;height: 300px;margin-left: 30px"></div>
    </div>
  </div>
</template>

<script>
import BMap from 'BaiduMap'
import echarts from 'echarts'
import JSON from '../../../assets/shijiazhuang.json'
import  'echarts/theme/macarons.js'
// require('echarts/theme/macarons')
export default {
  name: 'DashboardAdmin',
  data() {
    return {
      warnColor: '#ee1521',
      doneColor: '#50d92d',
      upColor: '#e4c25f',
      option: {
        title: {
          top: '3%',
          left: '5%',
          textStyle: {
            fontSize: 18,
            fontWeight: 300,
            color: '#b6d7ff'
          }
        },
        // tooltip: {
        //   padding: 0,
        //   backgroundColor: 'transparent',
        // },
        // legend: {
        //   orient: 'vertical',
        //   top: '9%',
        //   left: '5%',
        //   icon: 'circle',
        //   data: [],
        //   selectedMode: 'single',
        //   selected: {},
        //   itemWidth: 12,
        //   itemHeight: 12,
        //   itemGap: 30,
        //   inactiveColor: '#b6d7ff',
        //   textStyle: {
        //     color: '#ec808d',
        //     fontSize: 14,
        //     fontWeight: 300,
        //     padding: [0, 0, 0, 15]
        //   }
        // },
        // visualMap: {
        //   min: 0,
        //   max: 500,
        //   show: false,
        //   splitNumber: 5,
        //   inRange: {
        //     color: ['#FACD91', '#74DFB2', '#81D3F8', '#768FDE', '#e9969f'].reverse()
        //   },
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        geo: {
          map: '河北',
          label: {
            normal: {
              show: true,
              color: '#000'
            },
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#1ea7ff',
              borderColor: '#6367ad',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#9ea3fe' // hover效果
            }
          },
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%'
        },
        // series: [{
        //   name: '年度总项目数据查询',
        //   type: 'map',
        //   geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
        //   data: []
        // }]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 200)
    this.initMap()
    // this.initechart()
    this.initechart2()
    this.initechart3()
  },
  methods: {
    init() {
      var map = new BMap.Map('BaiduContainer') // 创建地图实例
      var point = new BMap.Point(114.25, 37.87) // 创建点坐标
      map.centerAndZoom(point, 12)
      map.enableScrollWheelZoom(true)
      map.addControl(new BMap.NavigationControl())
      map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.OverviewMapControl())
      map.addControl(new BMap.MapTypeControl())
      map.setCurrentCity('石家庄') // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
      function addMarker(point) {
        var marker = new BMap.Marker(point)
        map.addOverlay(marker)
      }
      map.setMapType(BMAP_HYBRID_MAP);//在某个时刻,得到map对象,调用api设置为混合地图

      var bounds = map.getBounds()
      var sw = bounds.getSouthWest()
      var ne = bounds.getNorthEast()
      var lngSpan = Math.abs(sw.lng - ne.lng)
      var latSpan = Math.abs(ne.lat - sw.lat)
      for (var i = 0; i < 9; i++) {
        var points = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7))
        addMarker(points)
      }
    },
    initechart() {
      var myChart = echarts.init(document.getElementById('mychart'), 'macarons')

      var colors = ['#5793f3', '#d14a61', '#675bba'];

      var option = {
        color: colors,

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data:['蒸发量','降水量','平均温度']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '蒸发量',
            min: 0,
            max: 250,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '降水量',
            min: 0,
            max: 250,
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name:'降水量',
            type:'bar',
            yAxisIndex: 1,
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name:'平均温度',
            type:'line',
            yAxisIndex: 2,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      };
      myChart.setOption(option)
    },
    initechart2() {
      var myChart = echarts.init(document.getElementById('mycharts'), 'macarons')
      var dataMap = {};
      function dataFormatter(obj) {
        var pList = ['井陉县','正定县','行唐县','灵寿县','高邑县','深泽县','赞皇县','无极县','平山县','元氏县','赵县','晋州市','新乐市'];
        var temp;
        for (var year = 2010; year <= 2019; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name : pList[i],
              value : temp[i]
            }
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      dataMap.dataGDP = dataFormatter({
        //max : 60000,
        2019:[16251.93,11307.28,24515.76,11237.55,14359.88,22226.7,10568.83,12582,19195.69,49110.27,32318.85,15300.65,17560.18],
        2018:[14113.58,9224.46,20394.26,9200.86,11672,18457.27,8667.58,10368.6,17165.98,41425.48,27722.31,12359.33,14737.12],
        2017:[12153.03,7521.85,17235.48,7358.31,9740.25,15212.49,7278.75,8587,15046.45,34457.3,22990.35,10062.82,12236.53],
        2016:[11115,6719.01,16011.97,7315.4,8496.2,13668.58,6426.1,8314.37,14069.87,30981.98,21462.69,8851.66,10823.01],
        2015:[9846.81,5252.76,13607.32,6024.45,6423.18,11164.3,5284.69,7104,12494.01,26018.48,18753.73,7360.92,9248.53],
        2014:[8117.78,4462.74,11467.6,4878.61,4944.25,9304.52,4275.12,6211.8,10572.24,21742.05,15718.47,6112.5,7583.85],
        2013:[6969.52,3905.64,10012.11,4230.53,3905.03,8047.26,3620.27,5513.7,9247.66,18598.69,13417.68,5350.17,6554.69],
        2012:[6033.21,3110.97,8477.63,3571.37,3041.07,6672,3122.01,4750.6,8072.83,15003.6,11648.7,4759.3,5763.35],
        2011:[5007.21,2578.03,6921.29,2855.23,2388.38,6002.54,2662.08,4057.4,6694.23,12442.87,9705.02,3923.11,4983.67],
        2010:[4315,2150.76,6018.28,2324.8,1940.94,5458.22,2348.54,3637.2,5741.03,10606.85,8003.67,3519.72,4467.55]
      });

      dataMap.dataPI = dataFormatter({
        //max : 4000,
        2019:[136.27,159.72,2905.73,641.42,1306.3,1915.57,1277.44,1701.5,124.94,3064.78,1583.04,2015.31,1612.24],
        2018:[124.36,145.58,2562.81,554.48,1095.28,1631.08,1050.15,1302.9,114.15,2540.1,1360.56,1729.02,1363.67],
        2017:[118.29,128.85,2207.34,477.59,929.6,1414.9,980.57,1154.33,113.82,2261.86,1163.08,1495.45,1182.74],
        2016:[112.83,122.58,2034.59,313.58,907.95,1302.02,916.72,1088.94,111.8,2100.11,1095.96,1418.09,1158.17],
        2015:[101.26,110.19,1804.72,311.97,762.1,1133.42,783.8,915.38,101.84,1816.31,986.02,1200.18,1002.11],
        2014:[88.8,103.35,1461.81,276.77,634.94,939.43,672.76,750.14,93.81,1545.05,925.1,1011.03,865.98],
        2013:[88.68,112.38,1400,262.42,589.56,882.41,625.61,684.6,90.26,1461.51,892.83,966.5,827.36],
        2012:[87.36,105.28,1370.43,276.3,522.8,798.43,568.69,605.79,83.45,1367.58,814.1,950.5,786.84],
        2011:[84.11,89.91,1064.05,215.19,420.1,615.8,488.23,504.8,81.02,1162.45,717.85,749.4,692.94],
        2010:[82.44,84.21,956.84,197.8,374.69,590.2,446.17,474.2,79.68,1110.44,685.2,783.66,664.78]
      });

      dataMap.dataSI = dataFormatter({
        //max : 26600,
        2019:[3752.48,5928.32,13126.86,6635.26,8037.69,12152.15,5611.48,5962.41,7927.89,25203.28,16555.58,8309.38,9069.2],
        2018:[3388.38,4840.23,10707.68,5234,6367.69,9976.82,4506.31,5025.15,7218.32,21753.93,14297.93,6436.62,7522.83],
        2017:[2855.55,3987.84,8959.83,3993.8,5114,7906.34,3541.92,4060.72,6001.78,18566.37,11908.49,4905.22,6005.3],
        2016:[2626.41,3709.78,8701.34,4242.36,4376.19,7158.84,3097.12,4319.75,6085.84,16993.34,11567.42,4198.93,6005.3],
        2015:[2509.4,2892.53,7201.88,3454.49,3193.67,5544.14,2475.45,3695.58,5571.06,14471.26,10154.25,3370.96,4198.93],
        2014:[2191.43,2457.08,6110.43,2755.66,2374.96,4566.83,1915.29,3365.31,4969.95,12282.89,8511.51,2711.18,11567.42],
        2013:[2026.51,2135.07,5271.57,2357.04,1773.21,3869.4,1580.83,2971.68,4381.2,10524.96,7164.75,2245.9,10154.25],
        2012:[1853.58,1685.93,4301.73,1919.4,1248.27,3061.62,1329.68,2487.04,3892.12,8437.99,6250.38,1844.9,2245.9],
        2011:[1487.15,1337.31,3417.56,1463.38,967.49,2898.89,1098.37,2084.7,3209.02,6787.11,5096.38,1535.29,1844.9],
        2010:[1249.99,1069.08,2911.69,1134.31,754.78,2609.85,943.49,1843.6,2622.45,5604.49,4090.48,1337.04,1535.29]
      })

      dataMap.dataTI = dataFormatter({
        //max : 25000,
        2019:[12363.18,5219.24,8483.17,3960.87,5015.89,8158.98,3679.91,4918.09,11142.86,20842.21,14180.23,4975.96,6878.74,3921.2,17370.89,7991.72,7247.02,7539.54,24097.7,3998.33,1148.93,3623.81,7014.04,2781.29,3701.79,322.57,4355.81,1963.79,540.18,861.92,2245.12],
        2018:[10600.84,4238.65,7123.77,3412.38,4209.03,6849.37,3111.12,4040.55,9833.51,17131.45,12063.82,4193.69,5850.62,3121.4,14343.14,6607.89,6053.37,6369.27,20711.55,3383.11,953.67,2881.08,6030.41,2177.07,2892.31,274.82,3688.93,1536.5,470.88,702.45,1766.69],
        2017:[9179.19,3405.16,6068.31,2886.92,3696.65,5891.25,2756.26,3371.95,8930.85,13629.07,9918.78,3662.15,5048.49,2637.07,11768.18,5700.91,5127.12,5402.81,18052.59,2919.13,748.59,2474.44,5198.8,1885.79,2519.62,240.85,3143.74,1363.27,398.54,563.74,1587.72],
        2016:[8375.76,2886.65,5276.04,2759.46,3212.06,5207.72,2412.26,2905.68,7872.23,11888.53,8799.31,3234.64,4346.4,2355.86,10358.64,5099.76,4466.85,4633.67,16321.46,2529.51,643.47,2160.48,4561.69,1652.34,2218.81,218.67,2699.74,1234.21,355.93,475,1421.38],
        2015:[7236.15,2250.04,4600.72,2257.99,2467.41,4486.74,2025.44,2493.04,6821.11,9730.91,7613.46,2789.78,3770,1918.95,8620.24,4511.97,3812.34,3835.4,14076.83,2156.76,528.84,1825.21,3881.6,1312.94,1896.78,188.06,2178.2,1037.11,294.91,366.18,1246.89],
        2014:[5837.55,1902.31,3895.36,1846.18,1934.35,3798.26,1687.07,2096.35,5508.48,7914.11,6281.86,2390.29,3022.83,1614.65,7187.26,3721.44,3111.98,3229.42,11585.82,1835.12,433.57,1649.2,3319.62,989.38,1557.91,159.76,1806.36,900.16,249.04,294.78,1058.16],
        2013:[4854.33,1658.19,3340.54,1611.07,1542.26,3295.45,1413.83,1857.42,4776.2,6612.22,5360.1,2137.77,2551.41,1411.92,5924.74,3181.27,2655.94,2882.88,9772.5,1560.92,377.17,1440.32,2836.73,815.32,1374.62,137.24,1546.59,787.36,213.37,259.49,929.41],
        2012:[4092.27,1319.76,2805.47,1375.67,1270,2811.95,1223.64,1657.77,4097.26,5198.03,4584.22,1963.9,2206.02,1225.8,4764.7,2722.4,2292.55,2428.95,8335.3,1361.92,335.3,1229.62,2510.3,661.8,1192.53,123.3,1234.6,688.41,193.7,227.73,833.36],
        2011:[3435.95,1150.81,2439.68,1176.65,1000.79,2487.85,1075.48,1467.9,3404.19,4493.31,3890.79,1638.42,1949.91,1043.08,4112.43,2358.86,2003.08,1995.78,7178.94,1178.25,293.85,1081.35,2189.68,558.28,1013.76,96.76,1063.89,589.91,169.81,195.46,753.91],
        2010:[2982.57,997.47,2149.75,992.69,811.47,2258.17,958.88,1319.4,3038.9,3891.92,3227.99,1399.02,1765.8,972.73,3700.52,1978.37,1795.93,1780.79,6343.94,1074.85,270.96,956.12,1943.68,480.37,914.5,89.56,963.62,514.83,148.83,171.14,704.5]
      })

      dataMap.dataEstate = dataFormatter({
        //max : 3600,
        2019:[1074.93,411.46,918.02,224.91,384.76,876.12,238.61,492.1,1019.68,2747.89,1677.13,634.92,911.16,402.51,1838.14,987,634.67,518.04,3321.31,465.68,208.71,396.28,620.62,160.3,222.31,17.44,398.03,134.25,29.05,79.01,176.22],
        2018:[1006.52,377.59,697.79,192,309.25,733.37,212.32,391.89,1002.5,2600.95,1618.17,532.17,679.03,340.56,1622.15,773.23,564.41,464.21,2813.95,405.79,188.33,266.38,558.56,139.64,223.45,14.54,315.95,110.02,25.41,60.53,143.44],
        2017:[1062.47,308.73,612.4,173.31,286.65,605.27,200.14,301.18,1237.56,2025.39,1316.84,497.94,656.61,305.9,1329.59,622.98,546.11,400.11,2470.63,348.98,121.76,229.09,548.14,136.15,205.14,13.28,239.92,101.37,23.05,47.56,115.23],
        2016:[844.59,227.88,513.81,166.04,273.3,500.81,182.7,244.47,939.34,1626.13,1052.03,431.27,506.98,281.96,1104.95,512.42,526.88,340.07,2057.45,282.96,95.6,191.21,453.63,104.81,195.48,15.08,193.27,93.8,19.96,38.85,89.79],
        2015:[821.5,183.44,467.97,134.12,191.01,410.43,153.03,225.81,958.06,1365.71,981.42,366.57,511.5,225.96,953.69,447.44,409.65,301.8,2029.77,239.45,67.19,196.06,376.84,93.19,193.59,13.24,153.98,83.52,16.98,29.49,91.28],
        2014:[658.3,156.64,397.14,117.01,136.5,318.54,131.01,194.7,773.61,1017.91,794.41,281.98,435.22,184.67,786.51,348.7,294.73,254.81,1722.07,192.2,44.45,158.2,336.2,80.24,165.92,11.92,125.2,73.21,15.17,25.53,68.9],
        2013:[493.73,122.67,330.87,106,98.75,256.77,112.29,163.34,715.97,799.73,688.86,231.66,331.8,171.88,664.9,298.19,217.17,215.63,1430.37,165.05,38.2,143.88,286.23,76.38,148.69,10.02,108.62,63.78,14.1,22.97,55.79],
        2012:[436.11,106.14,231.08,95.1,73.81,203.1,97.93,137.74,666.3,534.17,587.83,188.28,248.44,167.2,473.27,236.44,204.8,191.5,1103.75,122.52,30.64,129.12,264.3,68.3,116.54,5.8,95.9,56.84,13,20.78,53.55],
        2011:[341.88,92.31,185.19,78.73,61.05,188.49,91.99,127.2,487.82,447.47,473.16,162.63,215.84,138.02,418.21,217.58,176.8,186.49,955.66,100.93,25.14,113.69,231.72,59.86,103.79,4.35,83.9,48.09,11.41,16.85,47.84],
        2010:[298.02,73.04,140.89,65.83,51.48,130.94,76.11,118.7,384.86,371.09,360.63,139.18,188.09,125.27,371.13,199.31,145.17,165.29,808.16,82.83,21.45,90.48,210.82,53.49,95.68,3.42,77.68,41.52,9.74,13.46,43.04]
      });

      dataMap.dataFinancial = dataFormatter({
        //max : 3200,
        2019:[2215.41,756.5,746.01,519.32,447.46,755.57,207.65,370.78,2277.4,2600.11,2730.29,503.85,862.41,357.44,1640.41,868.2,674.57,501.09,2916.13,445.37,105.24,704.66,868.15,297.27,456.23,31.7,432.11,145.05,62.56,134.18,288.77],
        2018:[1863.61,572.99,615.42,448.3,346.44,639.27,190.12,304.59,1950.96,2105.92,2326.58,396.17,767.58,241.49,1361.45,697.68,561.27,463.16,2658.76,384.53,78.12,496.56,654.7,231.51,375.08,27.08,384.75,100.54,54.53,97.87,225.2],
        2017:[1603.63,461.2,525.67,361.64,291.1,560.2,180.83,227.54,1804.28,1596.98,1899.33,359.6,612.2,165.1,1044.9,499.92,479.11,402.57,2283.29,336.82,65.73,389.97,524.63,194.44,351.74,23.17,336.21,88.27,45.63,75.54,198.87],
        2016:[1519.19,368.1,420.74,290.91,219.09,455.07,147.24,177.43,1414.21,1298.48,1653.45,313.81,497.65,130.57,880.28,413.83,393.05,334.32,1972.4,249.01,47.33,303.01,411.14,151.55,277.66,22.42,287.16,72.49,36.54,64.8,171.97],
        2015:[1302.77,288.17,347.65,218.73,148.3,386.34,126.03,155.48,1209.08,1054.25,1251.43,223.85,385.84,101.34,734.9,302.31,337.27,260.14,1705.08,190.73,34.43,247.46,359.11,122.25,168.55,11.51,231.03,61.6,27.67,51.05,149.22],
        2014:[982.37,186.87,284.04,169.63,108.21,303.41,100.75,74.17,825.2,653.25,906.37,166.01,243.9,79.75,524.94,219.72,174.99,204.72,899.91,129.14,16.37,213.7,299.5,89.43,143.62,6.44,152.25,50.51,23.69,36.99,99.25],
        2013:[840.2,147.4,213.47,135.07,72.52,232.85,83.63,35.03,675.12,492.4,686.32,127.05,186.12,69.55,448.36,181.74,127.32,162.37,661.81,91.93,13.16,185.18,262.26,73.67,130.5,7.57,127.58,44.73,20.36,32.25,80.34],
        2012:[713.79,136.97,209.1,110.29,55.89,188.04,77.17,32.2,612.45,440.5,523.49,94.1,171,65.1,343.37,170.82,118.85,118.64,602.68,74,11.56,162.38,236.5,60.3,118.4,5.4,90.1,42.99,19,27.92,70.3],
        2011:[635.56,112.79,199.87,118.48,55.89,145.38,73.15,32.2,517.97,392.11,451.54,87.45,150.09,64.31,329.71,165.11,107.31,99.35,534.28,61.59,10.68,147.04,206.24,48.01,105.48,4.74,77.87,42.31,17.98,24.8,64.92],
        2010:[561.91,76.86,179.6,124.1,48.39,137.18,75.45,31.6,485.25,368.86,347.53,81.85,138.28,76.51,310.07,158.77,96.95,92.43,454.65,35.86,10.08,134.52,183.13,41.45,102.39,2.81,67.3,42.08,16.75,21.45,52.18]
      })
     var option = {
        baseOption: {
          timeline: {
            // y: 0,
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 1000,
            // controlStyle: {
            //     position: 'left'
            // },
            data: [
              '2010-01-01','2011-01-01','2012-01-01',
              {
                value: '2013-01-01',
                tooltip: {
                  formatter: '{b} 投保达到一个高度'
                },
                symbol: 'diamond',
                symbolSize: 16
              },
              '2014-01-01', '2015-01-01','2016-01-01','2017-01-01','2018-01-01',
              {
                value: '2019-01-01',
                tooltip: {
                  formatter: function (params) {
                    return params.name + '投保达到又一个高度';
                  }
                },
                symbol: 'diamond',
                symbolSize: 18
              },
            ],
            label: {
              formatter : function(s) {
                return (new Date(s)).getFullYear();
              }
            }
          },
          title: {
            subtext: ''
          },
          tooltip: {
          },
          legend: {
            x: 'right',
            data: [ '农作物理赔量','投保量'],
            selected: {
              'GDP': false, '金融': false, '房地产': false, '第三产业': false
            }
          },
          calculable : true,
          grid: {
            top: 80,
            bottom: 100,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value.replace('\n', '');
                  }
                }
              }
            }
          },
          xAxis: [
            {
              'type':'category',
              'axisLabel':{'interval':0},
              'data':[
                '井陉县','\n正定县','行唐县','\n灵寿县','高邑县','\n深泽县','赞皇县','\n无极县',
                '平山县','\n元氏县','赵县','\n晋州市','新乐市'
              ],
              splitLine: {show: false}
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '（例）'
            }
          ],
          series: [
            {name: 'GDP', type: 'bar'},
            {name: '金融', type: 'bar'},
            {name: '房地产', type: 'bar'},
            {name: '投保量', type: 'bar'},
            {name: '农作物理赔量', type: 'bar'},
            {name: '第三产业', type: 'bar'},
            {
              name: '投保理赔占比',
              type: 'pie',
              center: ['85%', '30%'],
              radius: '28%',
              z: 100
            }
          ]
        },
        options: [
          {
            title: {text: '2010石家庄市农作物投保与理赔统计情况'},
            series: [
              {data: dataMap.dataGDP['2010']},
              {data: dataMap.dataFinancial['2010']},
              {data: dataMap.dataEstate['2010']},
              {data: dataMap.dataPI['2010']},
              {data: dataMap.dataSI['2010']},
              {data: dataMap.dataTI['2010']},
              // {data: [
              //     {name:'农作物理赔量', value: dataMap.dataPI['2010sum']},
              //     {name: '投保量', value: dataMap.dataSI['2010sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2010sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2011石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2011']},
              {data: dataMap.dataFinancial['2011']},
              {data: dataMap.dataEstate['2011']},
              {data: dataMap.dataPI['2011']},
              {data: dataMap.dataSI['2011']},
              {data: dataMap.dataTI['2011']},
              // {data: [
              //     {name: '农作物理赔量', value: dataMap.dataPI['2011sum']},
              //     {name:  '投保量',value: dataMap.dataSI['2011sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2011sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2012石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2012']},
              {data: dataMap.dataFinancial['2012']},
              {data: dataMap.dataEstate['2012']},
              {data: dataMap.dataPI['2012']},
              {data: dataMap.dataSI['2012']},
              {data: dataMap.dataTI['2012']},
              // {data: [
              //     {name: '农作物理赔量', value: dataMap.dataPI['2012sum']},
              //     {name:  '投保量',value: dataMap.dataSI['2012sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2012sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2013石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2013']},
              {data: dataMap.dataFinancial['2013']},
              {data: dataMap.dataEstate['2013']},
              {data: dataMap.dataPI['2013']},
              {data: dataMap.dataSI['2013']},
              {data: dataMap.dataTI['2013']},
              // {data: [
              //     {name: '农作物理赔量',value: dataMap.dataPI['2013sum']},
              //     {name: '投保量', value: dataMap.dataSI['2013sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2013sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2014石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2014']},
              {data: dataMap.dataFinancial['2014']},
              {data: dataMap.dataEstate['2014']},
              {data: dataMap.dataPI['2014']},
              {data: dataMap.dataSI['2014']},
              {data: dataMap.dataTI['2014']},
              // {data: [
              //     {name: '农作物理赔量', value: dataMap.dataPI['2014sum']},
              //     {name: '投保量', value: dataMap.dataSI['2014sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2014sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2015石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2015']},
              {data: dataMap.dataFinancial['2015']},
              {data: dataMap.dataEstate['2015']},
              {data: dataMap.dataPI['2015']},
              {data: dataMap.dataSI['2015']},
              {data: dataMap.dataTI['2015']},
              // {data: [
              //     {name: '农作物理赔量', value: dataMap.dataPI['2015sum']},
              //     {name:  '投保量',value: dataMap.dataSI['2015sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2015sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2016石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2016']},
              {data: dataMap.dataFinancial['2016']},
              {data: dataMap.dataEstate['2016']},
              {data: dataMap.dataPI['2016']},
              {data: dataMap.dataSI['2016']},
              {data: dataMap.dataTI['2016']},
              // {data: [
              //     {name: '农作物理赔量', value: dataMap.dataPI['2016sum']},
              //     {name:  '投保量',value: dataMap.dataSI['2016sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2016sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2017石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2017']},
              {data: dataMap.dataFinancial['2017']},
              {data: dataMap.dataEstate['2017']},
              {data: dataMap.dataPI['2017']},
              {data: dataMap.dataSI['2017']},
              {data: dataMap.dataTI['2017']},
              // {data: [
              //     {name: '农作物理赔量', value: dataMap.dataPI['2017sum']},
              //     {name: '投保量', value: dataMap.dataSI['2017sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2017sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2018石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2018']},
              {data: dataMap.dataFinancial['2018']},
              {data: dataMap.dataEstate['2018']},
              {data: dataMap.dataPI['2018']},
              {data: dataMap.dataSI['2018']},
              {data: dataMap.dataTI['2018']},
              // {data: [
              //     {name: '农作物理赔量', value: dataMap.dataPI['2018sum']},
              //     {name: '投保量', value: dataMap.dataSI['2018sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2018sum']}
              //   ]}
            ]
          },
          {
            title : {text: '2019石家庄市农作物投保与理赔统计情况'},
            series : [
              {data: dataMap.dataGDP['2019']},
              {data: dataMap.dataFinancial['2019']},
              {data: dataMap.dataEstate['2019']},
              {data: dataMap.dataPI['2019']},
              {data: dataMap.dataSI['2019']},
              {data: dataMap.dataTI['2019']},
              // {data: [
              //     {name: '农作物理赔量', value: dataMap.dataPI['2019sum']},
              //     {name: '投保量', value: dataMap.dataSI['2019sum']},
              //     // {name: '第三产业', value: dataMap.dataTI['2019sum']}
              //   ]}
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    initechart3 () {
      var myChart = echarts.init(document.getElementById('mychart2'),'macarons')
      // var base = +new Date(2010, 9, 3);
      // var oneDay = 24 * 3600 * 1000;
      // var date = [];
      //
      // var data = [Math.random() * 300];
      //
      // for (var i = 1; i < 2000; i++) {
      //   var now = new Date(base += oneDay);
      //   date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
      //   data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      // }

      // var option = {
      //   tooltip: {
      //     trigger: 'axis',
      //     position: function (pt) {
      //       return [pt[0], '10%'];
      //     }
      //   },
      //   title: {
      //     left: 'center',
      //     text: '农作物受灾面积统计',
      //   },
      //   toolbox: {
      //     feature: {
      //       dataZoom: {
      //         yAxisIndex: 'none'
      //       },
      //       restore: {},
      //       saveAsImage: {}
      //     }
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: date
      //   },
      //   yAxis: {
      //     type: 'value',
      //     boundaryGap: [0, '100%']
      //   },
      //   dataZoom: [{
      //     type: 'inside',
      //     start: 0,
      //     end: 10
      //   }, {
      //     start: 0,
      //     end: 10,
      //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      //     handleSize: '80%',
      //     handleStyle: {
      //       color: '#fff',
      //       shadowBlur: 3,
      //       shadowColor: 'rgba(0, 0, 0, 0.6)',
      //       shadowOffsetX: 2,
      //       shadowOffsetY: 2
      //     }
      //   }],
      //   series: [
      //     {
      //       name:'模拟数据',
      //       type:'line',
      //       smooth:true,
      //       symbol: 'none',
      //       sampling: 'average',
      //       itemStyle: {
      //         color: 'rgb(255, 70, 131)'
      //       },
      //       areaStyle: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //           offset: 0,
      //           color: 'rgb(255, 158, 68)'
      //         }, {
      //           offset: 1,
      //           color: 'rgb(255, 70, 131)'
      //         }])
      //       },
      //       data: data
      //     }
      //   ]
      // }
      var option = {
          title: {
            left: 'center',
            text: '理赔信息',
          },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['油菜花', '棉花', '其他']
        },
        series: [
          {
            name: '农作物',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['25%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter:function (argument) {
                  var html;
                  html='理赔总面积\r\n\r\n'+'300亩';
                  return html;
                },
                textStyle:{
                  fontSize: 17,
                  color:'#000'
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 100, name: '油菜花'},
              {value: 146, name: '棉花'},
              {value: 54, name: '其他'}
            ]
          },
          {
            name: '农作物',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['70%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter:function (argument) {
                  var html;
                  html='理赔总金额\r\n\r\n'+'200万';
                  return html;
                },
                textStyle:{
                  fontSize: 17,
                  color:'#000'
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 100, name: '油菜花'},
              {value: 146, name: '棉花'},
              {value: 54, name: '其他'}
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    initMap:function () {
      var myMap = echarts.init(document.getElementById('myMap'))
      echarts.registerMap('河北', JSON)
      myMap.setOption(this.option)
    }
  }
}
</script>

<style scoped>
/*.dashboard-editor-container {*/
  /*padding: 32px;*/
  /*background-color: rgb(240, 242, 245);*/
  /*.chart-wrapper {*/
    /*background: #fff;*/
    /*padding: 16px 16px 0;*/
    /*margin-bottom: 32px;*/
  /*}*/
/*}*/
  .containers {
    padding: 10px;
  }
</style>
