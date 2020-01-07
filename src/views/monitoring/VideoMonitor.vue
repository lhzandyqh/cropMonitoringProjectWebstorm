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
              <span>保单详情</span>
            </div>
          </div>
          <div style="margin-top: 10px;margin-left: 150px">
            <div class="title_word">
              <div>
                <span class="word_info1">保险单号：</span>
                <span class="word_info2">77025824102</span>
              </div>
              <div style="margin-top: 20px">
                <span class="word_info1">保险时长：</span>
                <span class="word_info2">质量问题</span>
              </div>
              <div style="margin-top: 20px">
                <span class="word_info1">签约时间：</span>
                <span class="word_info2">2018-06-20 12:41:50</span>
              </div>
            </div>
            <div class="title_word" style="margin-left: 100px">
              <div>
                <span class="word_info1">联系人：</span>
                <span class="word_info2">肖远涛</span>
              </div>
              <div style="margin-top: 20px">
                <span class="word_info1">用户账号：</span>
                <span class="word_info2">Windir</span>
              </div>
              <div style="margin-top: 20px">
                <span class="word_info1">电话号码：</span>
                <span class="word_info2">1803344 ****</span>
              </div>
            </div>
          </div>
        </div>
        <div class="video">
          <video id="video1" width="900" controls="controls" loop>
            <source src="../../assets/bg.mp4" type="video/mp4" />
          </video>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
      name: "VideoMonitor",
    data() {
        return {
          radio1: '资源组树',
          radio2: '两图对比',
          filterText: '',
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
  .left_tree {
    margin-top: 40px;
  }
  .input_tree {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .card_info {
    height: 200px;
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
    float: left;
  }
  .word_info1 {
    color: #666666;
    font-size: 16px;
    font-weight: bold;
  }
  .word_info2 {
    color: rgb(153,153,153);
    font-size: 16px;
  }
  .video {
    height: 500px;
    /*max-width: 900px;*/
    /*min-width: 800px;*/
    margin: 10px auto;
    text-align: center;
    position: relative;
  }
</style>
