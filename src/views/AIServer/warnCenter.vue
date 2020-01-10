<template>
    <div class="app-container">
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
          <div class="warn-information">
            <el-row>
              <el-col :span="12">
                <div><img src="../../assets/picture/one.png" style="width: 370px;height: 200px"></div>
                <div style="margin-top: 10px">
                  <div class="flag_style"></div>
                  <div class="img_word">
                    <span>受灾</span>
                    <span>天气：雨     </span>
                  </div>
                  <div class="img_tianqi">
                    <span>2019-11-20</span>
                    <!--<span>{{item.weatherDTO.date}}</span>-->
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="text-align: center">
                  <span style="font-weight: bolder;color: #8c8c8c">地块报警信息</span>
                </div>
                <div class="info">
                  <span>受灾保单号：</span>
                  <span>SJZ012546850</span>
                </div>
                <div class="info">
                  <span>保单地址：</span>
                  <span>石家庄市长安区东陇</span>
                </div>
                <div class="info">
                  <span>保单状态：</span>
                  <span>监控受灾   未报案</span>
                </div>
                <div class="info">
                  <span>种植农作物：</span>
                  <span>棉花</span>
                </div>
                <div class="info">
                  <span>种植面积：</span>
                  <span>16亩</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="warn-information">
            <el-row>
              <el-col :span="12">
                <div><img src="../../assets/picture/two.png" style="width: 370px;height: 200px"></div>
                <div style="margin-top: 10px">
                  <div class="flag_style"></div>
                  <div class="img_word">
                    <span>受灾</span>
                    <span>天气：雨     </span>
                  </div>
                  <div class="img_tianqi">
                    <span>2019-11-20</span>
                    <!--<span>{{item.weatherDTO.date}}</span>-->
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="text-align: center">
                  <span style="font-weight: bolder;color: #8c8c8c">地块报警信息</span>
                </div>
                <div class="info">
                  <span>受灾保单号：</span>
                  <span>SJZ0125683929</span>
                </div>
                <div class="info">
                  <span>保单地址：</span>
                  <span>石家庄市正定县东杨庄村西陇</span>
                </div>
                <div class="info">
                  <span>保单状态：</span>
                  <span>监控受灾   已报案</span>
                </div>
                <div class="info">
                  <span>种植农作物：</span>
                  <span>油菜</span>
                </div>
                <div class="info">
                  <span>种植面积：</span>
                  <span>23亩</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="fenye">
            <el-pagination
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: "warnCenter",
  data() {
        return {
          filterText: '',
          end_date: '',
          ImageData: [],
          srcList: [],
          input1: '',
          start_date: '',
          select: '',
          radio1: '资源组树',
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
          }
        }
      },
}
</script>

<style scoped>
  .warn-information {
    margin-top: 50px;
    margin-left: 70px;
    padding: 30px;
    border-style: solid;
    border-width: 1px;
    border-color: #e0e0e0;
    border-radius: 10px;
  }
  .flag_style {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #c22620;
    float: left;
  }
  .img_word {
    font-size: 14px;
    line-height: 15px;
    float: left;
    margin-left: 8px;
  }
  .img_tianqi {
    font-size: 14px;
    line-height: 15px;
    float: left;
    margin-left: 10px;
  }
  .info {
    margin-top: 25px;
    margin-bottom: 15px;
  }
  .info span {
    font-size: 15px;
  }
  .fenye {
    margin-top: 40px;
    text-align: center;
  }
</style>
