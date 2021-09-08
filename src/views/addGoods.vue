<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <el-form ref="form" :model="form" :rules='rules' label-width="120px">
          <el-form-item label="品牌名" prop="brand">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item label="分类名" prop="category_name">
            <el-select v-model="form.category_name" placeholder="请选择分类">
              <el-option label="白酒" value="白酒"></el-option>
              <el-option label="啤酒" value="啤酒"></el-option>
              <el-option label="红酒" value="红酒"></el-option>
              <el-option label="米酒" value="米酒"></el-option>
              <el-option label="梅酒" value="梅酒"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="售价" prop="price">
            <el-input  v-model.number="form.price"   oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="包装费" prop="packingsPrice">
            <el-input  v-model.number="form.packingsPrice"  oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="市场价" prop="marketPrice">
            <el-input  v-model.number="form.marketPrice"   oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="销售量" prop="sale_count">
            <el-input  v-model.number="form.sale_count"   oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="原产地" prop="origin">
            <el-input v-model="form.origin"></el-input>
          </el-form-item>
          <el-form-item label="首页推荐" prop="isShowHP">
            <el-switch
                v-model="form.isShowHP" >
            </el-switch>
          </el-form-item>
          <el-form-item label="商品名" prop="item">
            <el-input v-model="form.item"></el-input>
          </el-form-item>
          <el-form-item label="店铺名" prop="shop">
            <el-input v-model="form.shop"></el-input>
          </el-form-item>
            <el-form-item label="度数">
              <el-input v-model="form.degrees" placeholder="酒精度数"></el-input>
            </el-form-item>
            <el-form-item label="容量">
              <el-input v-model="form.capacity" placeholder="容量"></el-input>
            </el-form-item>
          <el-form-item label="库存">
            <el-input v-model="form.stock" placeholder="库存数量"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="上传图片列表">
            <el-upload
                accept="image/jpeg,image/gif,image/png"
                :action="baseUrl+'/api/uploadpics'"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"

                :file-list="form.pic_array"
                list-type="picture"
            :before-upload="onBeforeUpload"
                multiple>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>

            </el-upload>
          </el-form-item>

          <el-form-item label="上传封面">
            <el-upload
                class="avatar-uploader"
                :action="baseUrl + '/v1/addimg/food'"
                :show-file-list="false"
                :on-success="uploadImg"
                :before-upload="beforeImgUpload">
              <img v-if="form.thumb_url" :src="baseImgPath + form.thumb_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from '../components/headTop'
// import {addGoods} from "../utils/api";
import {baseUrl, baseImgPath} from "../utils/api";
export default {
  data() {

    return {
      baseImgPath,
      fileList : [],
      baseUrl,
      form: {
        isShowHP:false,
        brand : "",
        category_name: "",
        item: '',
        marketPrice: '',
        origin: '',
        packingsPrice: '',
        pic_array: [],
        price: '',
        sale_count: '',
        shop: '',
        stock: '',
        thumb_url: '',
        title: '',
        degrees: '',
        capacity:'',

      },
      rules: {
        brand: [
          { required: true, message: '请输入品牌名', trigger: 'blur' },
        ],
        category_name: [
          { required: true, message: '请输入品牌名', trigger: 'blur' },
        ],
        price: [{required: true,  message: '请输入售价',trigger: 'blur'}],
        packingsPrice: [{required: true,  message: '请输入批发价', trigger: 'blur'}],
        marketPrice: [{required: true, message: '请输入市场价', trigger: 'blur'}]
      },

    }
  },
  computed: {
    specification: function () {
      return this.degrees + "°，" + this.capacity + "mL"
    }
  },
  name: "addGoods",
  components: {
    headTop
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.form,
            specification: this.specification
          }
          console.log(params)
          console.log("hhhhh")
          // const res = await addGoods(params)
          // console.log(res)
        }
      })
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file,fileList) {
      console.log(file,fileList)
    },
    uploadImg() {

    },
    uploadSuccess(file) {
      console.log(file)
      console.log(this.form.pic_array)
    },
    beforeImgUpload(){

    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }
      return isIMAGE && isLt2M;
    }

  },
  created() {
    if (this.$route.query.shop_id) {
      this.shop_id = this.$route.query.shop_id;
    }else{
      this.shop_id = Math.ceil(Math.random()*10);
      this.$msgbox({
        title: '提示',
        message: '添加食品需要选择一个商铺，先去就去选择商铺吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.$router.push('/shopList');
            done();
          } else {
            this.$message({
              type: 'info',
              message: '取消'
            });
            done();
          }
        }
      })
    }
    this.initData();
  }

}
</script>

<style scoped>

</style>