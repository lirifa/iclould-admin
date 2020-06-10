<template>
  <div v-loading="loading" class="app-container">
    <el-card class="basicInfos" style="margin-bottom: 20px;">
      <label slot="header">基本信息</label>
      <el-form label-width="100px">
        <el-form-item label="公司名称:">
          <span>{{ basicInfo.merName }}</span>
        </el-form-item>
        <el-form-item label="公司地址:">
          <span>{{ basicInfo.address }}</span>
        </el-form-item>
        <el-form-item label="联系人:">
          <span>{{ basicInfo.linkman }}</span>
        </el-form-item>
        <el-form-item label="联系电话:">
          <span>{{ basicInfo.phoneNo }}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bankCardInfos">
      <label slot="header">银行卡信息</label>
      <el-form label-width="100px">
        <el-form-item label="开户名:">
          <span>{{ basicInfo.accountName }}</span>
        </el-form-item>
        <el-form-item label="开户行:">
          <span>{{ basicInfo.bankName }}</span>
        </el-form-item>
        <el-form-item label="银行卡号:">
          <span>{{ basicInfo.bankCard }}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { findMerchantBasicInfo } from '@/api/operatorInfo'

export default {
  name: 'BasicInfo',
  filters: {
    brandNamesInit(arr) {
      if (arr) {
        let brandNamesStr = ''
        for (const brand of arr) {
          brandNamesStr += brand['brandName'] + '、'
        }
        return brandNamesStr.substr(0, brandNamesStr.length - 1)
      }
    }
  },
  data() {
    return {
      loading: false, // 加载中
      basicInfo: {
        merName: '',
        categoryName: '',
        brandNames: '',
        linkman: '',
        phoneNo: '',
        address: '',
        accountName: '',
        bankName: '',
        bankCard: ''
      }
    }
  },
  created() {
    this.getBasicInfo(this.$store.getters.merchantId)
  },
  methods: {
    getBasicInfo(id) {
      this.loading = true
      findMerchantBasicInfo(id).then((response) => {
        this.basicInfo = response.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
