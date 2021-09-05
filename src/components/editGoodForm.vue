<template>
  <el-form ref="form" :model="formModel" :rules='rules' label-width="120px">
    <el-form-item label="品牌名" prop="brand">
      <el-input v-model="formModel.brand"></el-input>
    </el-form-item>
    <el-form-item label="分类名" prop="category_name">
      <el-select v-model="formModel.category_name" placeholder="请选择分类">
        <el-option label="白酒" value="白酒"></el-option>
        <el-option label="啤酒" value="啤酒"></el-option>
        <el-option label="红酒" value="红酒"></el-option>
        <el-option label="米酒" value="米酒"></el-option>
        <el-option label="梅酒" value="梅酒"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="售价" prop="price">
      <el-input  v-model.number="formModel.price"   oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="包装费" prop="packingsPrice">
      <el-input  v-model.number="formModel.packingsPrice"  oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="市场价" prop="marketPrice">
      <el-input  v-model.number="formModel.marketPrice"   oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="销售量" prop="sale_count">
      <el-input  v-model.number="formModel.sale_count"   oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="原产地" prop="origin">
      <el-input v-model="formModel.origin"></el-input>
    </el-form-item>
    <el-form-item label="商品名" prop="item">
      <el-input v-model="formModel.item"></el-input>
    </el-form-item>
    <el-form-item label="店铺名" prop="shop">
      <el-input v-model="formModel.shop"></el-input>
    </el-form-item>
    <el-form-item label="度数">
      <el-input v-model="formModel.degrees" placeholder="酒精度数"></el-input>
    </el-form-item>
    <el-form-item label="容量">
      <el-input v-model="formModel.capacity" placeholder="容量"></el-input>
    </el-form-item>
    <el-form-item label="库存">
      <el-input v-model="formModel.stock" placeholder="库存数量"></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="formModel.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="上传图片列表">
      <el-upload
          accept="image/jpeg,image/gif,image/png"
          :action="baseUrl+'/api/uploadpics'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"

          :file-list="formModel.pic_array"
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
        <img v-if="formModel.thumb_url" :src="baseImgPath + formModel.thumb_url" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "editGoodForm",
  props: ['formModel']
}
</script>

<style scoped>

</style>