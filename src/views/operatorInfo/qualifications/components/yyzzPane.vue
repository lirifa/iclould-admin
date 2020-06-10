<template>
  <el-form v-loading="loading" label-width="140px">
    <el-form-item label="营业执照:">
      <viewer v-show="licenses.imageUrl" style="display: inline-block;">
        <img :src="licenses.imageUrl" style="display: inline-block;width: 200px;height: 200px;cursor: pointer;margin-left: 10px;">
      </viewer>
    </el-form-item>
    <el-form-item label="营业执照注册号:">
      <span>{{ licenses.licenseNo }}</span>
    </el-form-item>
    <el-form-item label="公司名称:">
      <span>{{ licenses.companyName }}</span>
    </el-form-item>
    <el-form-item label="法定代表人/经营者:">
      <span>{{ licenses.legalPerson }}</span>
    </el-form-item>
    <el-form-item label="地址:">
      <span>{{ licenses.address }}</span>
    </el-form-item>
    <el-form-item label="经营范围:">
      <span>{{ licenses.scope }}</span>
    </el-form-item>
    <el-form-item label="营业执照有效期:">
      <span>{{ licenses.expiryDate }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
import { getMerchantBusinessLicenses } from '@/api/operatorInfo'
export default {
  name: 'Yyzz',
  data() {
    return {
      dialogVisible: false, // 营业执照放大查看
      loading: true,
      licenses: {
        imageUrl: '',
        licenseNo: '',
        legalPerson: '',
        address: '',
        companyName: '',
        scope: '',
        expiryDate: ''
      }
    }
  },
  created() {
    this.getLicenseInfo(this.$store.getters.merchantId)
  },
  methods: {
    getLicenseInfo(id) {
      this.loading = true
      getMerchantBusinessLicenses(id).then((response) => {
        this.licenses = response.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
