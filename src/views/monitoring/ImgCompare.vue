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
              <span>保单信息</span>
            </div>
          </div>
          <div class="card_text">
            <el-card shadow="hover" style="height: 250px;min-width: 1000px">
              <div class="card_content1">
                <span style="font-weight: bold;"><i class="iconfont ymq-iconbianhao"></i> 保险单号：</span>
                <span>234231029431</span>
                <div class="card_button">
                  <el-button type="primary">图像对比</el-button>
                  <el-button type="info">保单详情</el-button>
                </div>
              </div>
              <div class="card_content2">
                <div  style="float: left">
                  <div class="card_word">
                    <span style="font-weight: bold">服务单号：</span>
                    <span style="color: #A69999">77025824102</span>
                  </div>
                  <div class="card_word">
                    <span style="font-weight: bold">保险时长：</span>
                    <span style="color: #A69999">质量问题</span>
                  </div>
                  <div class="card_word">
                    <span style="font-weight: bold">签约时间：</span>
                    <span style="color: #A69999">2018-06-20 12:41:50</span>
                  </div>
                </div>
                <div style="float: left;margin-left: 100px">
                  <div class="card_word">
                    <span style="font-weight: bold">联系人：</span>
                    <span style="color: #A69999">肖远涛</span>
                  </div>
                  <div class="card_word">
                    <span style="font-weight: bold">用户账号：</span>
                    <span style="color: #A69999">Windir</span>
                  </div>
                  <div class="card_word">
                    <span style="font-weight: bold">电话号码：</span>
                    <span style="color: #A69999">1803344 ****</span>
                  </div>
                </div>
                <div style="float: left;margin-left: 150px;margin-top: 20px">
                  <div style="float: left">
                    <div>
                      <span style="color: #A69999">当前状态</span>
                    </div>
                    <div style="margin-top: 10px">
                      <span style="font-size: 20px;">待处理</span>
                    </div>
                  </div>
                  <div style="float: left;margin-left: 50px">
                    <div>
                      <span style="color: #A69999">订单金额</span>
                    </div>
                    <div style="margin-top: 10px">
                      <span style="font-size: 20px;">¥1000.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
          <div class="img_info">
            <div>
              <el-radio-group v-model="radio2" @change="radio_change">
                <el-radio-button label="两图对比" style="border-radius: 4px"></el-radio-button>
                <el-radio-button label="四图对比" class="radio_style"></el-radio-button>
                <el-radio-button label="六图对比" class="radio_style"></el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <div class="imgs">
                <el-date-picker
                  v-model="date_value1"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions" class="date">
                </el-date-picker>
                <el-image :src="ImgList[0]" :preview-src-list="ImgList"></el-image>
              </div>
              <div class="imgs">
                <el-date-picker
                  v-model="date_value2"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions" class="date">
                </el-date-picker>
                <el-image :src="ImgList[1]" :preview-src-list="ImgList"></el-image>
              </div>
              <div class="imgs" v-if="fourImg">
                <el-date-picker
                  v-model="date_value3"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions" class="date">
                </el-date-picker>
                <el-image :src="ImgList[2]" :preview-src-list="ImgList"></el-image>
              </div>
              <div class="imgs" v-if="fourImg">
                <el-date-picker
                  v-model="date_value4"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions" class="date">
                </el-date-picker>
                <el-image :src="ImgList[3]" :preview-src-list="ImgList"></el-image>
              </div>
              <div class="imgs" v-if="sixImg">
                <el-date-picker
                  v-model="date_value5"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions" class="date">
                </el-date-picker>
                <el-image :src="ImgList[4]" :preview-src-list="ImgList"></el-image>
              </div>
              <div class="imgs" v-if="sixImg">
                <el-date-picker
                  v-model="date_value6"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions" class="date">
                </el-date-picker>
                <el-image :src="ImgList[5]" :preview-src-list="ImgList"></el-image>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "PolicyInfo",
      data() {
          return {
            radio1: '资源组树',
            radio2: '两图对比',
            filterText: '',
            fourImg: false,
            sixImg: false,
            ImgList: ['http://zhongkeruitong.top/cropsImg/2019-12-20/正定县南楼村_1576830568884.png','http://zhongkeruitong.top/cropsImg/2019-12-20/正定县南楼村_1576831738866.png', 'http://zhongkeruitong.top/cropsImg/2019-12-20/正定县南楼村_1576831617209.png',  'http://zhongkeruitong.top/cropsImg/2019-12-20/正定县南楼村_1576831617209.png', 'http://zhongkeruitong.top/cropsImg/2019-12-20/正定县南楼村_1576831827133.png','http://zhongkeruitong.top/cropsImg/2019-12-16/井荆县魏楼村_1576478971650.png', ],
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
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
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
            date_value1: '',
            date_value2: '',
            date_value3: '',
            date_value4: '',
            date_value5: '',
            date_value6: ''
          }
      },
      methods: {
        handleNodeClick(data) {
          console.log(data)
        },
        filterNode(value, data) {
          if (!value) return true
          return data.label.indexOf(value) !== -1
        },
        radio_change() {
          if (this.radio2 === '两图对比') {
            this.fourImg = false
            this.sixImg = false
          } else if (this.radio2 === '四图对比') {
            this.fourImg = true
            this.sixImg = false
          } else if (this.radio2 === '六图对比') {
            this.fourImg = true
            this.sixImg = true
          }
          console.log(val)
        }
      }
    }
</script>

<style scoped>
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
    height: 500px;
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
  .card_text {
    margin-left: 50px;
    margin-top: 20px;
  }
  .img_info {
    margin-left: 50px;
    margin-top: 20px;
  }
  .card_content1 {
    margin-top: 50px;
    margin-left: 30px;
    font-size: 20px;
    color: #666666;
  }
  .card_button {
    float: right;
    margin-right: 50px;
  }
  .card_content2 {
    margin-top: 20px;
    margin-left: 52px;
    color: #666666;
  }
  .card_word {
    margin-top: 15px;
  }
  .radio_style {
    margin-left: 50px;border-left: 1px solid #DCDFE6;border-radius: 4px
  }
  .imgs {
    width: 450px;
    height: 300px;
    margin-right: 20px;
    float: left;
    margin-top: 10px;
  }
  .date {
    margin-bottom: 10px;
  }
</style>
