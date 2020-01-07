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
        <div class="until">
          <div class="until_div">
            <el-input v-model="input1" placeholder="选择时间间隔" class="input-with-select" style="margin-top: 5px">
              <el-select slot="append" v-model="select" placeholder="选择时间间隔">
                <el-option label="一天" value="1" />
                <el-option label="三天" value="2" />
                <el-option label="一周" value="3" />
              </el-select>
            </el-input>
          </div>
          <div class="until_div">
            <div class="date_text">
              <span>开始时间:</span>
            </div>
            <el-date-picker
              v-model="start_date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              class="date" />
          </div>
          <div class="until_div">
            <div class="date_text">
              <span>结束时间:</span>
            </div>
            <el-date-picker
              v-model="end_date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              class="date" />
          </div>
        </div>
        <div class="img_div">
          <div class="img_style" v-for="(item, index) in ImageData" :key="index">
            <el-image :src="item.cropsMonitor.picPath" :preview-src-list="srcList">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div>
              <div class="flag_style"></div>
              <div class="img_word">
                <span>正常</span>
              </div>
              <div class="img_tianqi">
                <span>{{'天气：' + item.weatherDTO.info}}</span>
                <span style="margin-left: 5px">{{'温度：' + item.weatherDTO.temperature + '℃'}}</span>
                <span style="margin-left: 5px">{{'风力：' + item.weatherDTO.windPower}}</span>
                <!--<span>{{item.weatherDTO.date}}</span>-->
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ImageData } from '@/api/getData'
export default {
  name: 'ImgMonitor',
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
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getImage()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getImage() {
      ImageData().then((res) => {
        this.ImageData = res.data.data
        var list = []
        for (var i = 0; i < res.data.data.length; i++) {
          list.push(res.data.data[i].cropsMonitor.picPath)
        }
        this.srcList = list
      })
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
  .until {
    display: flex;
    height: 50px;
    margin-left: 50px;
    max-width: 1200px;
  }
  .until .until_div {
    flex: 1;
    margin-left: 50px;
  }
  .img_div {
    margin-left: 50px;
    max-width: 1100px;
    height: 500px;
    margin: 0 auto;
  }
  .img_style {
    width: 300px;
    height: 200px;
    margin-left: 50px;
    margin-top: 10px;
    float: left;
  }
  .img_style el-image {
    width: 100%;
  }
  .input-with-select {
    width: 70%;
  }
  .date_text {
    float: left;
    line-height: 50px;
  }
  .date {
    float: right;
    line-height: 50px;
  }
  .flag_style {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #67C23A;
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
</style>
