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
              <el-option v-for="item in form.category"
              :key="item"
              :label="item"
              :value="item"></el-option>
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
<!--          <el-form-item label="销售量" prop="sale_count">-->
<!--            <el-input  v-model.number="form.sale_count"   oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>-->
<!--          </el-form-item>-->
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
            <el-select v-model="form.shop" @change="selectShopChanged" filterable placeholder="请选择">
              <el-option
                  v-for="(item, index) in shopNames"
                  :key="shopIds[index]"
                  :label="item"
                  :value="shopIds[index]">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="specification">
            <el-input v-model="form.specification" placeholder="请输入酒精度数和容量等描述"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input v-model="form.stock" placeholder="库存数量" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="上传图片列表">
            <el-upload
                accept="image/jpeg,image/gif,image/png"
                :action="baseUrl+'/api/uploadpics?shop_id='+form.shop"
                :on-preview="handlePreview"
                :on-remove="handleRemove1"
                :on-success="uploadSuccess1"

                :file-list="picList1"
                list-type="picture"
            :before-upload="onBeforeUpload"
                multiple>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>

            </el-upload>
          </el-form-item>
          <el-form-item label="上传图片列表2">
            <el-upload
                accept="image/jpeg,image/gif,image/png"
                :action="baseUrl+'/api/uploadpics?shop_id='+form.shop"
                :on-preview="handlePreview"
                :on-remove="handleRemove2"
                :on-success="uploadSuccess2"

                :file-list="picList2"
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
                :action="baseUrl + '/api/uploadpics'"
                :show-file-list="false"
                :on-success="uploadImg"
                :before-upload="beforeImgUpload">
              <img v-if="thumbPic" :src="thumbPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
<!--            <el-button>取消</el-button>-->
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import {baseUrl, baseImgPath, addGoods, shopPic, getShopList} from "../utils/api";
export default {
  data() {

    return {
      shopNames: [],
      shopData: [],
      baseImgPath,
      picList1 : [],
      picList2 : [],
      thumbPic: '',
      shopIds: [],
      shopCategory: [],

      baseUrl,
      form: {
        isShowHP:false,
        brand : "",
        category_name: "",
        item: '',
        marketPrice: '',
        origin: '',
        packingsPrice: '',
        pic_array1: [],
        pic_array2: [],
        price: '',
        // sale_count: '',
        shop: '',
        shop_name:'',
        stock: '',
        thumb_url: '',
        specification:'',
        title: '',
        degrees: '',
        capacity:'',

      },
      rules: {
        brand: [
          { required: true, message: '请输入品牌名', trigger: 'blur' },
        ],
        category_name: [
          { required: true, message: '请选择分类', trigger: 'blur' },
        ],
        price: [{required: true,  message: '请输入售价',trigger: 'blur'}],
        packingsPrice: [{required: true,  message: '请输入批发价', trigger: 'blur'}],
        marketPrice: [{required: true, message: '请输入市场价', trigger: 'blur'}],
        origin: [{required: true, message: '请输入原产地', trigger: 'blur'}],
        item: [{required: true, message: '请输入商品名', trigger: 'blur'}],
        specification: [{required: true, message: '请输入度数及容量描述', trigger: 'blur'}],
        stock: [{required: true, message: '请输入库存', trigger: 'blur'}],
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        shop: [{required: true, message: '请选择店铺', trigger: 'blur'}],


      },

    }
  },
  computed: {
  },
  name: "addGoods",
  components: {
    headTop
  },
  methods: {
    getShopNameById(id) {
      for (let i = 0; i < this.shopIds.length; i++) {
        if (this.shopIds[i] === id) {
          return this.shopNames[i];
        }
      }
    },
    async onSubmit() {
      try {
        const res = await addGoods(JSON.stringify(this.form));
        console.log(res)
        if (res.data.errcode === 0) {
          this.$message({
            type: 'success',
            message: '成功上架商品！'
          });
          this.$emit("updateSuccess");
        }else{
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      }catch (e) {
        console.log(e);
      }
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove1(file) {
      console.log("remove::",file)
      for(var i=0;i<this.picList1.length;i++){
        if(this.picList1[i].name===file.name){
          this.picList1[i]=null
          this.form.pic_array1[i] = null;
          this.picList1=this.picList1.filter(n => n)
          break
        }
      }
      console.log(this.picList1)
    },
    handleRemove2(file) {
      console.log("remove::",file)

      //deletePic({pic:file.response.name})
      for(var i=0;i<this.picList2.length;i++){
        if(this.picList2[i].name===file.name){
          this.picList2[i]=null
          this.form.pic_array2 = null;
          this.picList2=this.picList2.filter(n => n)
          break
        }
      }
      console.log(this.picList2)
    },
    handleRemove(file){
     //deletePic({pic:file.response.name})
     console.log(file)
      this.form.thumb_url=""
    },
    async uploadImg(file) {
      console.log("上传成功后的file::", file);
      console.log("上传成功后的thumbUrl::", this.form.thumb_url);
      const res = await shopPic({pic: file['name']});
      if (res.status === 200) {
        console.log("上传成功后，转换成功后的res", res);
        this.thumbPic = res.data.file_list[0].download_url;
        this.form.thumb_url = file['name'];
        console.log("上传成功后，图片URL：",this.form.thumb_url);
      }

    },
    async uploadSuccess1(file) {
      console.log(file)
      console.log(this.form)
      const filename = file['name'].split('/').pop()
      this.form.pic_array1.push(file['name'])
      const picUrl = await shopPic({pic: file['name']})

      this.picList1.push({name: filename, url: picUrl.data.file_list[0].download_url})
      console.log("uploadSuccess1", this.picList1);
    },
    async uploadSuccess2(file) {
      console.log(file)
      const filename = file['name'].split('/').pop()
      const picUrl = await shopPic({pic: file['name']})

      this.form.pic_array2.push(file['name'])
      this.picList2.push({name: filename, url: picUrl.data.file_list[0].download_url})

      console.log(this.form.pic_array2)
    },
    beforeImgUpload(){

    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }
      return isIMAGE && isLt2M;
    },
    async initShopData() {
      const shopData = await getShopList({offset: 0, limit: 100})
      if (shopData.status === 200) {
        this.shopNames = [];
        this.shopIds = [];
        this.shopCategory = [];
        shopData.data.data.forEach(item => {
          item = JSON.parse(item);
          this.shopNames.push(item.name);
          this.shopIds.push(item._id)
          this.shopCategory.push(item.category)
        });
        console.log("shopData::200", this.shopNames)
      }
    },
    findCategoryById(id) {
      for (let i = 0; i < this.shopIds.length; i++) {
        if (this.shopIds[i] === id) {
          return this.shopCategory[i];
        }
      }
    },
    selectShopChanged(val) {
      this.form.shop = val;
      console.log("selsectShop:", this.form.shop);
      this.form.category = this.findCategoryById(val)
    },
  },
  created() {
    this.initShopData();
    if (this.$route.query.shop_id && this.$route.query.shop_name) {
      console.log(this.$route.query.shop)
      this.form.shop=this.$route.query.shop_id;
      this.form.shop_name=this.$route.query.shop_name
      // console.log(this.$route.query.shop_name)

      this.$message({
        message: '您正在为'+this.form.shop_name+"店铺添加商品。",
        type: 'success'
      });
    }else{
      console.log('here')
      // this.shop_id = Math.ceil(Math.random()*10);
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
  },
  watch: {
  $route: {
    handler: function(val){
      console.log(val)
      this.$data.form.shop=val.query.shop_id
      this.$data.form.shop_name=val.query.shop_name
      this.$data.form.category=val.query.category
    }
  }
}

}
</script>

<style lang="less">
@import '../style/mixin';
.form{
  min-width: 400px;
  margin-bottom: 30px;
  &:hover{
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.food_form{
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header{
  text-align: center;
  margin-bottom: 10px;
}
.category_select{
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.add_category_row{
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.showEdit{
  height: 185px;
}
.add_category{
  background: #f9fafc;
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.add_category_button{
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  &:hover{
    background: #f9fafc;
    span, .edit_icon{
      color: #20a0ff;
    }
  }
  span{
    .sc(14px, #999);
    transition: all 400ms;
  }
  .edit_icon{
    color: #ccc;
    transition: all 400ms;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.cell{
  text-align: center;
}
</style>
