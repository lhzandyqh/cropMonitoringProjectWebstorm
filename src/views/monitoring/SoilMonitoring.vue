<template>
  <div class="containers">
    <el-row>
      <el-col :span="4">
        <div class="left_tree">
          <!--<el-button type="info">资源组树</el-button>-->
          <!--<el-button type="info">收藏夹</el-button>-->
          <el-radio-group v-model="radio1">
            <el-radio-button label="资源组树"></el-radio-button>
            <el-radio-button label="收藏夹"></el-radio-button>
          </el-radio-group>
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
            class="input_tree"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-tree
            ref="tree"
            :data="data"
            :props="defaultProps"
            show-checkbox
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20">
        <div class="card_info">
          <div class="title_info">
            <div class="title_icon"></div>
            <div class="title_text">
              <span>土壤检测</span>
            </div>
          </div>
          <div class="title_word">
            <span>土壤质量检测是对土壤的有机质、矿物质、PH值、养分、肥力、肥料、农药残留、微生物指标、重金属元素、放射性元素、全成分、理化性质等物质进行检测。</span>
          </div>
        </div>
        <div class="content">
          <div style="margin-left: 20px">
            <div class="date_word">
              <span>监测时间：</span>
            </div>
            <div>
              <el-date-picker
                v-model="date_value"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
          <div class="date_img">
            <el-image :src="srcList[0]" :preview-src-list="srcList" style="height: 100%;width: 100%"></el-image>
          </div>
          <div class="date_card">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>检测标准</span>
              </div>
              <div class="card_text">
                <span>GB 15618-1995 土壤环境质量标准</span>
              </div>
              <div class="card_text">
                <span>GB 15618-2008 土壤环境质量标准</span>
              </div>
              <div class="card_text">
                <span>
                  HJ/T 166-2004 土壤环境监测技术规范
                </span>
              </div>
            </el-card>
          </div>
        </div>
        <div class="cards">
          <div class="card_list">
            <el-card class="box-cards">
              <div slot="header" class="clearfix">
                <span>理化指标检测</span>
              </div>
              <div class="card_text">
                <span>PH： 7.92</span>
              </div>
              <div class="card_text">
                <span>粘粒含量： 57.8 g/kg</span>
              </div>
              <div class="card_text">
                <span>
                  水分： 1.5 g/cm2
                </span>
              </div>
            </el-card>
          </div>
          <div class="card_list">
            <el-card class="box-cards">
              <div slot="header" class="clearfix">
                <span>金属指标检测</span>
              </div>
              <div class="card_text">
                <span>Cu  32.63 mg/kg</span>
              </div>
              <div class="card_text">
                <span>Pb   42.54 mg/kg</span>
              </div>
              <div class="card_text">
                <span>
                  Hg  0.32 mg/kg
                </span>
              </div>
              <div class="card_text">
                <span>
                  As  3.69 mg/kg
                </span>
              </div>
              <div class="card_text">
                <span>
                  Zn  53.40 mg/kg
                </span>
              </div>
            </el-card>
          </div>
          <div class="card_list">
            <el-card class="box-cards">
              <div slot="header" class="clearfix">
                <span>有机指标检测</span>
              </div>
              <div class="card_text">
                <span>挥发性卤代烃</span>
              </div>
              <div class="card_text">
                <span>挥发性总石油类烃</span>
              </div>
              <div class="card_text">
                <span>
                  多氯联苯
                </span>
              </div>
              <div class="card_text">
                <span>
                  环芳径
                </span>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
      name: "SoilMonitoring",
    data() {
      return {
        radio1: '资源组树',
        radio2: '两图对比',
        filterText: '',
        date_value: '',
        srcList: ['http://zhongkeruitong.top/cropsImg/2019-12-20/正定县南楼村_1576831617209.png'],
        data: [{
          label: '石家庄市',
          children: [{
            label: '长安区',
            children: [{
              label: '东兆通北',
              children: [{
                label: '东兆通北1'
              }, {
                label: '东兆通北2'
              }]
            }, {
              label: '南杨庄'
            }]
          }, {
            label: '正定县',
            children: [{
              label: '东杨庄',
              children: [{
                label: '东杨庄1'
              }, {
                label: '东杨庄2'
              }]
            }, {
              label: '固营'
            }, {
              label: '东平乐村'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
    }
  }
</script>

<style scoped>
  .containers {
    padding: 10px;
  }
  .containers {
    padding: 10px;
  }
  .containers {
    padding: 10px;
  }
  .left_tree {
    margin-top: 40px;
  }
  .input_tree {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .card_info {
    height: 150px;
    margin: 0 auto;
    /*margin-left: 50px;*/
    /*margin-right: 10px;*/
    max-width: 1100px;
    min-width: 1000px;
    padding: 20px;
  }
  .title_info {
    height: 30px;
    margin-top: 15px;
    margin-left: 50px;
  }
  .title_icon {
    width: 5px;
    height: 100%;
    background-color: #409EFF;
    float: left;
  }
  .title_text {
    float: left;
    line-height: 30px;
    font-size: 20px;
    margin-left: 10px;
    font-weight: bold;
  }
  .title_word {
    margin-left: 100px;
    margin-top: 20px;
    width: 900px;
    color: rgb(153,153,153);
  }
  .content {
    max-width: 1000px;
    height: 350px;
    margin: 0 auto;
  }
  .date_word {
    float: left;
    margin-top: 10px;
  }
  .date_img {
    width: 500px;
    height: 280px;
    margin-left: 20px;
    margin-top: 10px;
    float: left;
  }
  .date_card {
    float: right;
    margin-top: 10px;
  }
  .box-card {
    width: 300px;
    height: 280px;
    background: #ECE9E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .clearfix {
    text-align: center;
  }
  .card_text {
    text-align: center;
    margin-top: 20px;
  }
  .cards {
    max-width: 1000px;
    margin: 0 auto;
  }
  .card_list {
    float: left;
    margin-left: 20px;
    width: 300px;
  }
  .box-cards {
    width: 300px;
    height: 280px;
    background: #ECE9E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .box-card >>> .el-card__header {
    /*background: #D3CCE3;  !* fallback for old browsers *!*/
    /*background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  !* Chrome 10-25, Safari 5.1-6 *!*/
    /*background: linear-gradient(to right, #E9E4F0, #D3CCE3); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
    /*background: #ECE9E6;  !* fallback for old browsers *!*/
    /*background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  !* Chrome 10-25, Safari 5.1-6 *!*/
    /*background: linear-gradient(to right, #FFFFFF, #ECE9E6); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/

  }
  .box-card >>> .el-card__body {
    /*background: #ECE9E6;  !* fallback for old browsers *!*/
    /*background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  !* Chrome 10-25, Safari 5.1-6 *!*/
    /*background: linear-gradient(to right, #FFFFFF, #ECE9E6); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
  }
</style>
