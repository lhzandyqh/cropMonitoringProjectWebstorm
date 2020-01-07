<template>
  <div class="containers">
    <!--<el-button type="primary" @click="open_import">上传图片</el-button>-->
    <div class="bg_content">
      <el-row>
        <el-col :span="12">
          <div class="bg_text">
            <div class="icon_bg"></div>
            <div class="bg_title">
              <span>图片上传</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="bg_text">
            <div class="icon_bg"></div>
            <div class="bg_title">
              <span>识别结果</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="upload_text">
            <el-upload
              action="http://zhongkeruitong.top/crops/crops/uploadCropsPic"
              list-type="picture-card"
              name="file"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
              <el-dialog :visible.sync="dialogVisible2">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="12">
          <el-card style="height: 200px;width: 300px;margin-top: 50px;margin-left: 100px;background-color: rgba(51,51,51, 0.8)">
            <div slot="header" class="clearfix">
              <span>识别结果</span>
            </div>
            <div>
              <div v-if="show_word" style="margin-top: 10px;color: white">
                <span>{{ return_word }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!--<el-dialog-->
    <!--title="请上传图片"-->
    <!--width="30%"-->
    <!--:visible.sync="dialogVisible"-->
    <!--&gt;-->
    <!--<el-upload-->
    <!--action="http://zhongkeruitong.top/crops/crops/uploadCropsPic"-->
    <!--list-type="picture-card"-->
    <!--name="file"-->
    <!--:before-upload="beforeUpload"-->
    <!--:on-success="handleSuccess"-->
    <!--:on-error="handleError"-->
    <!--:on-preview="handlePictureCardPreview"-->
    <!--:on-remove="handleRemove"-->
    <!--&gt;-->
    <!--<i class="el-icon-plus"></i>-->
    <!--</el-upload>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  export default {
      name: "BuildingIdentification",
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl: '',
        dialogVisible2: false,
        show_word: false,
        return_word: ''
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible2 = true
      },
      // beforeUpload(file) {
      //   console.log(file, '文件')
      //   const isJPG = file.type === 'image/jpeg'
      //   const isGIF = file.type === 'image/gif'
      //   const isPNG = file.type === 'image/png'
      //   const isBMP = file.type === 'image/bmp'
      //   // const isLt2M = file.size / 1024 / 1024 < 2;
      //
      //   if (!isJPG && !isGIF && !isPNG && !isBMP) {
      //     this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
      //   }
      //   // if (!isLt2M) {
      //   //     this.$message.error('上传图片大小不能超过 2MB!');
      //   // }
      //   return (isJPG || isBMP || isGIF || isPNG)
      // },
      handleSuccess(res, file, fileList) {
        this.$message({
          type: 'info',
          message: '图片上传成功',
          duration: 6000
        })
        console.log(res)
        // console.log(fileList)
        this.return_word = res.data.cropType
        this.show_word = true
        this.dialogVisible = false
      },
      handleError(res, file) {
        this.$message({
          type: 'error',
          message: '图片上传失败',
          duration: 6000
        })
        console.log(res)
      }
    }
  }
</script>

<style scoped>
  .containers {
    margin: 10px;
  }
  .bg_content {
    /*height: 500px;*/
    max-width: 1200px;
    margin: 0 auto;
  }
  .bg_text {
    margin-top: 50px;
  }
  .icon_bg {
    float: left;
    height: 35px;
    width: 5px;
    background-color: #409EFF;
    margin-left: 50px;
  }
  .bg_title {
    float: left;
    line-height: 35px;
    margin-left: 20px;
    font-weight: bold;
    font-size: 20px;
  }
  .upload_text {
    margin-left: 100px;
    margin-top: 100px;
  }
  .reslut_text {
    float: left;
    width: 50%;
  }
  /*.upload_img >>> .el-upload--picture-card {*/
  /*height: 250px;*/
  /*width: 250px;*/
  /*}*/
  /*.upload_img >>> .el-icon-plus:before {*/
  /*line-height: 250px;*/
  /*font-size: 50px;*/
  /*}*/
  .clearfix {
    color: white;
  }
</style>
