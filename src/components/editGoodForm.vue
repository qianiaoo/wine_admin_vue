<template>
  <el-form ref="form" :model="formModel" :rules='rules' label-width="120px">
    <el-form-item label="品牌名" prop="brand">
      <el-input v-model="formModel.brand"></el-input>
    </el-form-item>
    <!--    <el-form-item label="分类名" prop="category_name">-->
    <!--      <el-select v-model="formModel.category_name" placeholder="请选择分类">-->
    <!--        <el-option label="白酒" value="白酒"></el-option>-->
    <!--        <el-option label="啤酒" value="啤酒"></el-option>-->
    <!--        <el-option label="红酒" value="红酒"></el-option>-->
    <!--        <el-option label="米酒" value="米酒"></el-option>-->
    <!--        <el-option label="梅酒" value="梅酒"></el-option>-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->
    <el-form-item label="分类名" prop="category_name">
      <el-select v-model="formModel.category_name" @change="selectCategoryChanged" filterable placeholder="请选择">
        <el-option
            v-for="item in categoryList"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="售价" prop="price">
      <el-input v-model.number="formModel.price" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="包装费" prop="packingsPrice">
      <el-input v-model.number="formModel.packingsPrice" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="市场价" prop="marketPrice">
      <el-input v-model.number="formModel.marketPrice" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="销售量" prop="sale_count">
      <el-input v-model.number="formModel.sale_count" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="原产地" prop="origin">
      <el-input v-model="formModel.origin"></el-input>
    </el-form-item>
    <el-form-item label="首页推荐" prop="isShowHP">
      <el-switch
          v-model="formModel.isShowHP">
      </el-switch>
    </el-form-item>
    <el-form-item label="商品名" prop="item">
      <el-input v-model="formModel.item"></el-input>
    </el-form-item>
    <el-form-item label="店铺名" prop="shop">
      <el-select v-model="formModel.shop" @change="selectShopChanged" filterable placeholder="请选择">
        <el-option
            v-for="(item, index) in shopNames"
            :key="shopIds[index]"
            :label="item"
            :value="shopIds[index]">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="formModel.description" placeholder="请输入酒精度数和容量等描述"></el-input>
    </el-form-item>
    <el-form-item label="库存" prop="stock">
      <el-input v-model="formModel.stock" placeholder="库存数量"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="formModel.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="上传图片列表">
      <el-upload
          accept="image/jpeg,image/gif,image/png"
          :action="baseUrl+'/api/uploadpics?shop_id='+formModel.shop"
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
          :action="baseUrl+'/api/uploadpics?shop_id='+formModel.shop"
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
          :on-remove="handleRemove"
          :on-success="uploadImg"
          :before-upload="beforeImgUpload">
        <img v-if="thumbPic" :src="thumbPic" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {addGoods, getShopList, shopPic} from "../utils/api";

const {baseUrl} = require("../utils/api");

export default {
  name: "editGoodForm",
  props: ['formModel'],
  data() {
    return {
      picList1: [],
      shopNames: [],
      shopIds: [],
      categoryList: [],
      thumbPic: '',
      picList2: [],
      baseUrl,
      rules: {
        brand: [
          {required: true, message: '请输入品牌名', trigger: 'blur'},
        ],
        category_name: [
          {required: true, message: '请选择分类', trigger: 'blur'},
        ],
        price: [{required: true, message: '请输入售价', trigger: 'blur'}],
        packingsPrice: [{required: true, message: '请输入批发价', trigger: 'blur'}],
        marketPrice: [{required: true, message: '请输入市场价', trigger: 'blur'}],
        origin: [{required: true, message: '请输入原产地', trigger: 'blur'}],
        item: [{required: true, message: '请输入商品名', trigger: 'blur'}],
        description: [{required: true, message: '请输入度数及容量描述', trigger: 'blur'}],
        stock: [{required: true, message: '请输入库存', trigger: 'blur'}],
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        shop: [{required: true, message: '请选择店铺', trigger: 'blur'}],


      },
    }
  },
  methods: {
    handlePreview(file) {
      console.log(file)
    },
    async onSubmit() {
      try {
        const res = await addGoods(JSON.stringify(this.formModel));
        console.log(res)
        if (res.data.errcode === 0) {
          this.$message({
            type: 'success',
            message: '更新店铺信息成功'
          });
          this.$emit("updateSuccess");
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleRemove1(file) {
      console.log("remove::", file)
      for (var i = 0; i < this.picList1.length; i++) {
        if (this.picList1[i].name === file.name) {
          this.picList1[i] = null
          this.formModel.pic_array1[i] = null;
          this.picList1 = this.picList1.filter(n => n)
          break
        }
      }
      console.log(this.picList1)
    },
    handleRemove2(file) {
      console.log("remove::", file)

      //deletePic({pic:file.response.name})
      for (var i = 0; i < this.picList2.length; i++) {
        if (this.picList2[i].name === file.name) {
          this.picList2[i] = null
          this.formModel.pic_array2 = null;
          this.picList2 = this.picList2.filter(n => n)
          break
        }
      }
      console.log(this.picList2)
    },
    handleRemove(file) {
      //deletePic({pic:file.response.name})
      console.log(file)
      this.formModel.thumb_url = ""
    },

    getPicParam(arr) {
      let picarrParam = "";
      arr.forEach(item => {
        picarrParam += item + ',';
      })
      return picarrParam.substr(0, picarrParam.length - 1);
    },
    async initPic() {
      if (this.formModel.pic_array1) {
        const res = await shopPic({pic: this.getPicParam(this.formModel.pic_array1)})
        for (const item of res.data.file_list) {
          const filename = item.fileid.split('/').pop()

          const picUrl = await shopPic({pic: item.fileid})

          this.picList1.push({name: filename, url: picUrl.data.file_list[0].download_url})
        }
      }
      if (this.formModel.pic_array2) {
        const res = await shopPic({pic: this.getPicParam(this.formModel.pic_array2)})
        for (const item of res.data.file_list) {
          const filename = item.fileid.split('/').pop()

          const picUrl = await shopPic({pic: item.fileid})

          this.picList2.push({name: filename, url: picUrl.data.file_list[0].download_url})
        }
      }
      if (this.formModel.thumb_url) {
        const res = await shopPic({pic: this.formModel.thumb_url})
        this.thumbPic = res.data.file_list[0].download_url;
        console.log("存在封面", this.thumbPic);
      }
    },
    getShopNameById(id) {
      for (let i = 0; i < this.shopIds.length; i++) {
        if (this.shopIds[i] === id) {
          return this.shopNames[i];
        }
      }
    },
    async uploadSuccess1(file) {
      const filename = file['name'].split('/').pop()
      this.formModel.pic_array1.push(file['name'])
      const picUrl = await shopPic({pic: file['name']})

      this.picList1.push({name: filename, url: picUrl.data.file_list[0].download_url})
      console.log("uploadSuccess1", this.picList1);
    },
    async uploadSuccess2(file) {
      console.log(file)
      const filename = file['name'].split('/').pop()
      const picUrl = await shopPic({pic: file['name']})

      this.formModel.pic_array2.push(file['name'])
      this.picList2.push({name: filename, url: picUrl.data.file_list[0].download_url})

    },
    beforeImgUpload() {

    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }
      return isIMAGE && isLt2M;
    },
    selectShopChanged(val) {
      console.log("selsectShop:", this.formModel.shop);
      this.formModel.shop = val;
      this.initCategory();
    },
    selectCategoryChanged(val) {
      console.log("changgg:list:", this.categoryList);
      console.log("changgg:val::", val);
      this.formModel.category_name = val;
      console.log("changgg:cateName::", this.formModel.category_name);

    },
    async uploadImg(file) {
      console.log("上传成功后的file::", file);
      console.log("上传成功后的thumbUrl::", this.form.thumb_url);
      const res = await shopPic({pic: file['name']});
      if (res.status === 200) {
        console.log("上传成功后，转换成功后的res", res);
        this.thumbPic = res.data.file_list[0].download_url;
        this.form.thumb_url = file['name'];
        console.log("上传成功后，图片URL：", this.form.thumb_url);
      }
    },
    async initCategory() {
      const shopData = await getShopList({offset: 0, limit: 100})
      if (shopData.status === 200) {

        this.categoryList = [];
        shopData.data.data.forEach(item => {
          item = JSON.parse(item);
          if (this.formModel.shop == item._id) {
            this.categoryList = item.category;
          }
        });
        if (this.categoryList.indexOf(this.formModel.category_name) === -1) {
          this.formModel.category_name = this.categoryList[0];
        }
      }
    },
    async initShopData() {
      const shopData = await getShopList({offset: 0, limit: 100})
      if (shopData.status === 200) {
        this.shopNames = [];
        this.shopIds = [];
        this.categoryList = [];
        shopData.data.data.forEach(item => {
          item = JSON.parse(item);
          this.shopNames.push(item.name);
          this.shopIds.push(item._id);
          console.log("item:", item._id)
          console.log("shop:", this.formModel.shop)
          if (this.formModel.shop == item._id) {
            this.categoryList = item.category;
          }
        });
        console.log("shopData::200", shopData)
      }
    },


  },

  created() {
    this.initShopData();
    this.initPic();
  }
}
</script>

<style scoped>

</style>