<template>
    <div class="app-container">
      <div class="app-container">
        <el-row>
          <el-col :span="4">
            <div class="left_tree">
              <!--<el-button type="info">资源组树</el-button>-->
              <!--<el-button type="info">收藏夹</el-button>-->
              <el-radio-group v-model="radio1" style="margin-bottom: 10px">
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
            <div class="policy_info_con">
              <div class="button clearfix">
                <div style="float: right">
                  <el-button type="primary">上传保单</el-button>
                  <el-button type="success">打印保单</el-button>
                </div>
              </div>
              <div style="margin-left: 30px">
                <el-divider></el-divider>
              </div>
              <div class="policy_content">
                <el-row>
                  <el-col :span="8">
                    <div class="policy_item">
                      <div class="head">
                        <span style="font-size: 14px">石家庄市正定县东杨庄村</span>
                        <span style="font-size: 14px;float: right">张三</span>
                        <div class="policy_picture">
                          <div style="text-align: center;padding-top: 50px">
                            <span style="font-size: 14px">保单信息</span>
                          </div>
                        </div>
                      </div>
                      <div class="policy_body">
                        <span style="margin-left: 10px;font-size: 14px;line-height: 40px">图片(入保所拍照片)</span>
                        <img style="width: 40px;height: 40px;float: right;background-color: #e0e0e0;cursor: pointer">
                      </div>
                      <div class="policy_last">
                        <div style="margin-top: 10px">
                          <span style="font-size: 13px;font-weight: bolder;margin-left: 20px">查看详情</span>
                          <img style="width: 20px;height: 20px;float: right;cursor: pointer" src="../../assets/picture/right.png">
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="policy_item">
                      <div class="head">
                        <span style="font-size: 14px">石家庄市正定县东杨庄村</span>
                        <span style="font-size: 14px;float: right">李四</span>
                        <div class="policy_picture">
                          <div style="text-align: center;padding-top: 50px">
                            <span style="font-size: 14px">保单信息</span>
                          </div>
                        </div>
                      </div>
                      <div class="policy_body">
                        <span style="margin-left: 10px;font-size: 14px;line-height: 40px">图片(入保所拍照片)</span>
                        <img style="width: 40px;height: 40px;float: right;background-color: #e0e0e0;cursor: pointer">
                      </div>
                      <div class="policy_last">
                        <div style="margin-top: 10px">
                          <span style="font-size: 13px;font-weight: bolder;margin-left: 20px">查看详情</span>
                          <img style="width: 20px;height: 20px;float: right;cursor: pointer" src="../../assets/picture/right.png">
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="policy_item">
                      <div class="head">
                        <span style="font-size: 14px">石家庄市正定县东杨庄村</span>
                        <span style="font-size: 14px;float: right">王五</span>
                        <div class="policy_picture">
                          <div style="text-align: center;padding-top: 50px">
                            <span style="font-size: 14px">保单信息</span>
                          </div>
                        </div>
                      </div>
                      <div class="policy_body">
                        <span style="margin-left: 10px;font-size: 14px;line-height: 40px">图片(入保所拍照片)</span>
                        <img style="width: 40px;height: 40px;float: right;background-color: #e0e0e0;cursor: pointer">
                      </div>
                      <div class="policy_last">
                        <div style="margin-top: 10px">
                          <span style="font-size: 13px;font-weight: bolder;margin-left: 20px">查看详情</span>
                          <img style="width: 20px;height: 20px;float: right;cursor: pointer" src="../../assets/picture/right.png">
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                  <el-col :span="8">
                    <div class="policy_item">
                      <div class="head">
                        <span style="font-size: 14px">石家庄市正定县东杨庄村</span>
                        <span style="font-size: 14px;float: right">张三</span>
                        <div class="policy_picture">
                          <div style="text-align: center;padding-top: 50px">
                            <span style="font-size: 14px">保单信息</span>
                          </div>
                        </div>
                      </div>
                      <div class="policy_body">
                        <span style="margin-left: 10px;font-size: 14px;line-height: 40px">图片(入保所拍照片)</span>
                        <img style="width: 40px;height: 40px;float: right;background-color: #e0e0e0;cursor: pointer">
                      </div>
                      <div class="policy_last">
                        <div style="margin-top: 10px">
                          <span style="font-size: 13px;font-weight: bolder;margin-left: 20px">查看详情</span>
                          <img style="width: 20px;height: 20px;float: right;cursor: pointer" src="../../assets/picture/right.png">
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="policy_item">
                      <div class="head">
                        <span style="font-size: 14px">石家庄市正定县东杨庄村</span>
                        <span style="font-size: 14px;float: right">李四</span>
                        <div class="policy_picture">
                          <div style="text-align: center;padding-top: 50px">
                            <span style="font-size: 14px">保单信息</span>
                          </div>
                        </div>
                      </div>
                      <div class="policy_body">
                        <span style="margin-left: 10px;font-size: 14px;line-height: 40px">图片(入保所拍照片)</span>
                        <img style="width: 40px;height: 40px;float: right;background-color: #e0e0e0;cursor: pointer">
                      </div>
                      <div class="policy_last">
                        <div style="margin-top: 10px">
                          <span style="font-size: 13px;font-weight: bolder;margin-left: 20px">查看详情</span>
                          <img style="width: 20px;height: 20px;float: right;cursor: pointer" src="../../assets/picture/right.png">
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="policy_item">
                      <div class="head">
                        <span style="font-size: 14px">石家庄市正定县东杨庄村</span>
                        <span style="font-size: 14px;float: right">王五</span>
                        <div class="policy_picture">
                          <div style="text-align: center;padding-top: 50px">
                            <span style="font-size: 14px">保单信息</span>
                          </div>
                        </div>
                      </div>
                      <div class="policy_body">
                        <span style="margin-left: 10px;font-size: 14px;line-height: 40px">图片(入保所拍照片)</span>
                        <img style="width: 40px;height: 40px;float: right;background-color: #e0e0e0;cursor: pointer">
                      </div>
                      <div class="policy_last">
                        <div style="margin-top: 10px">
                          <span style="font-size: 13px;font-weight: bolder;margin-left: 20px">查看详情</span>
                          <img style="width: 20px;height: 20px;float: right;cursor: pointer" src="../../assets/picture/right.png">
                        </div>
                      </div>
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
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
export default {
  name: "policyInformation",
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
  .clearfix {
    overflow: auto;
    zoom: 1;
  }
  .policy_item {
    margin-left: 30px;
    width: 300px;
    height: 280px;
    /*background-color: pink;*/
    border-style: solid;
    border-color: #e0e0e0;
    border-width: 1px;
  }
  .head {
    padding: 15px;
  }
  .policy_picture {
    width: 265px;
    height: 130px;
    background-color: #c4c4c4;
  }
  .policy_body {
    height: 60px;
    padding: 10px;
    border-top-style:solid ;
    border-bottom-style: solid;
    border-top-color: #e0e0e0;
    border-top-width: 1px;
    border-bottom-color: #e0e0e0;
    border-bottom-width: 1px;
  }
  .fenye {
    margin-top: 30px;
    text-align: center;
  }
</style>
