<template>
<div class="r">
  <div class="register" v-if="!next">
    <div class="register-title">
      <dl>个人信息完善</dl>
      <p>以下信息是为了核实您真实身份，保障您资金和账户安全，隐私信息的重要参考，请如实填写。</p>
    </div>

    <flex>
      <flex-item>
        <bb label="中文姓" :width="86">
          <input type="text" style="width: 80px" placeholder="与身份证同" v-model="form.cnFirtName" onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')">
        </bb>
      </flex-item>
      <flex-item>
        <bb label="名" :width="40">
          <input type="text" style="width: 100%" placeholder="与身份证同" v-model="form.cnLastName" onkeyup="value=value.replace(/[\d]/g,'') ">
        </bb>
      </flex-item>
    </flex>

    <flex>
      <flex-item>
        <bb label="英文姓" :width="86">
          <input type="name" style="width: 85px" placeholder="英文名或拼音" v-model="form.enFirtName" onkeyup="value=value.replace(/[^a-zA-Z]/g,'')">
        </bb>
      </flex-item>
      <flex-item>
        <bb label="名" :width="40">
          <input type="name" style="width: 110px" placeholder="英文名或拼音" v-model="form.enLastName" onkeyup="value=value.replace(/[^a-zA-Z]/g,'')">
        </bb>
      </flex-item>
    </flex>
  
    <bb label="身份证号" :width="86">
      <input type="number" style="width: 100%" placeholder="与身份证同" v-model="form.idNo"  v-model.number="msg" onkeyup="value=value.replace(/[^\d]/g,'')">
    </bb>

    <bb label="出生日期" :width="86">
      <flex>
        <flex-item>
          <z-select :data="yList" v-model="form.year"></z-select>
        </flex-item>
        <flex-item>
          <z-select :data="mList" v-model="form.month"></z-select>
        </flex-item>
        <flex-item>
          <z-select :data="dList" v-model="form.day"></z-select>
        </flex-item>
      </flex>
    </bb>

    <bb label="性别" :width="86">
      <z-checkbox v-model="form.gender" :content="0">男</z-checkbox>
      <div style="display: inline-block;width: 50px"></div>
      <z-checkbox v-model="form.gender" :content="1">女</z-checkbox>
    </bb>

    <bb label="手机号码" :width="86" class=""><div class="phone">{{ form.phone }}</div></bb>
    <bb label="邮箱" :width="86">
      <input type="text"  name="email" style="width: 100%" placeholder="输入邮箱地址" v-model="form.email" :id="isEmail">
    </bb>
    <bb label="所在地" :width="86">
      <flex>
        <flex-item>
          <z-select :data="gList" v-model="form.country" :width="42"></z-select>
        </flex-item>
        <flex-item>
          <z-select :data="pList" v-model="form.state" :width="42"></z-select>
        </flex-item>
        <flex-item>
          <z-select :data="cList" v-model="form.city" :width="42"></z-select>
        </flex-item>
      </flex>
    </bb>
    <bb label="详细地址" :width="86">
      <input type="text"  style="width: 100%" v-model="form.address" placeholder=" " class="site">
    </bb>
    <bb label="邮编" :width="86">
      <input type="number" style="width: 240px" v-model="form.zipCode" v-model.number="code"  maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')">
    </bb>
    <div class="bt">
      <button @click="goNext()">下一步</button>
    </div>
  </div>

  <div class="register" v-else>
    <div class="register-title">
      <dl>投资信息确认</dl>
      <p>由于受最高监管的约束，需要您提供相关信息，我们只咨询与开户相关的问题。您的资料始终保密，绝不公开。</p>
    </div>

    <bb label="教育程度">
      <z-select v-model="form.educationLevel" :data="eList"></z-select>
    </bb>

    <bb label="职业">
      <z-select v-model="form.occupation" :data="xList"></z-select>
    </bb>

    <div class="border-bottom">
      <p style="line-height: 60px;padding-left: 20px">过去的十二个月是否有担任公职</p>
      <div style="padding: 8px 0 20px 0">
        <div style="display: inline-block;width: 80px"></div>
        <z-checkbox v-model="form.isPublicOfficerInTwelveMon" :content="0">是</z-checkbox>
        <div style="display: inline-block;width: 50px"></div>
        <z-checkbox v-model="form.isPublicOfficerInTwelveMon" :content="1">否</z-checkbox>
      </div>
    </div>

    <bb label="收入来源">
      <z-select v-model="form.incomeSource" :data="sList"></z-select>
    </bb>

    <bb label="资产净值">
      <z-select v-model="form.netAsset" :data="zList"></z-select>
    </bb>

    <div class="border-bottom">
      <p style="line-height: 60px;padding-left: 20px">是否有相关交易经验</p>
      <div style="padding: 8px 0 20px 0">
        <div style="display: inline-block;width: 80px"></div>
        <z-checkbox v-model="form.isHaveFinanceTradingExperience" :content="0">是</z-checkbox>
        <div style="display: inline-block;width: 50px"></div>
        <z-checkbox v-model="form.isHaveFinanceTradingExperience" :content="1">否</z-checkbox>
      </div>
    </div>

    <div class="read">
      <z-checkbox type="checkbox" v-model="agree" checkbox="">
        我已阅读并同意<a href="https://www.ifmtrade.com/cn/about-us/legal-note/">【IFM风险说明】</a>
      </z-checkbox>
    </div>
    <div class="bt">
      <button v-if="loaing" v-bind:class="{loImg:isImg}"><img src="./loading.gif" alt="">提交中，请稍后</button>
      <button @click="save()" v-else :disabled="isDisabled" v-bind:class="{disbt:isDisbt}">确认并提交</button>
    </div>
    <div class="bt return">
      <button @click="reback()">上一步</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import d from './data.json'

export default {
  name: 'register',
  data() {
    return {
      isSite: true,
      msg: true,
      code: true,
      isEmail: true,
      loaing: false,
      isDisbt: false,
      isDisabled: false,
      isImg: false,
      next: 0,
      bb: 0,
      zz: 0,
      gList: [{
        label: '中国',
        value: '中国',
      }],
      // 教育程度
      //1 MiddleSchool 初中, 2 HighSchool 高中, 3 College 大学专科, 4 University 学士学位, 5 Master 硕士学位, 6 Doctor 博士学位, 7 Others 其他
      eList:[
        {
          label: '初中',
          value: 1,
        },
        {
          label: '高中',
          value: 2,
        },
        {
          label: '大学专科',
          value: 3,
        },
        {
          label: '学士学位',
          value: 4,
        },
        {
          label: '硕士学位',
          value: 5,
        },
        {
          label: '博士学位',
          value: 6,
        },
        {
          label: '其他',
          value: 7,
        },
      ],
      // 职业
      // 1 Administrtor 管理人员/行政人员, 2 Clerk 文员, 3 Employment 公司职员, 4 Farmer 农民, 5 Housewife 家庭主妇, 6 Student 学生, 7 Teacher 教师, 8 Retirement 离退休人员, 9 SelfEmployment自雇, 10 NonEmploymentFreelance 未受雇用的自由职业
      xList: [
        {
          label: '管理人员/行政人员',
          value: 1,
        },
        {
          label: '文员',
          value: 2,
        },
        {
          label: '公司职员',
          value: 3,
        },
        {
          label: '农民',
          value: 4,
        },
        {
          label: '家庭主妇',
          value: 5,
        },
        {
          label: '学生',
          value: 6,
        },
        {
          label: '教师',
          value: 7,
        },
        {
          label: '离退休人员',
          value: 8,
        },
        {
          label: '自雇',
          value: 9,
        },
        {
          label: '未受雇用的自由职业',
          value: 10,
        },
      ],
      // 收入来源
      // 1 Salary 工资收入, 2 SelfEmployment 个体经营, 3 InvestmentBonus 投资红利,4  Pension 退休养老金, 5 DepositSavings 存款储蓄金, 6 Others 其他来源
      sList: [
        {
          label: '工资收入',
          value: 1,
        },
        {
          label: '个体经营',
          value: 2,
        },
        {
          label: '投资红利',
          value: 3,
        },
        {
          label: '退休养老金',
          value: 4,
        },
        {
          label: '存款储蓄金',
          value: 5,
        },
        {
          label: '其他来源',
          value: 6,
        },
      ],
      // 净资产
      // 1 FirstGear 少于 $100,000, 2 SecondGear $100,001 - $250,000, 3 ThirdGear $250,001 - $1,000,000,  4 FourthGear 超过 $1,000,000
      zList: [
        {
          label: '少于$100,000',
          value: 1,
        },
        {
          label: '$100,001 - $250,000',
          value: 2,
        },
        {
          label: '$250,001 - $1,000,000',
          value: 3,
        },
        {
          label: '超过$1,000,000',
          value: 4,
        },
      ],
      form: {},
      agree: true,
      yList: [],
      mList: [],
      dList: [],
    }
  },
  created() {
    console.log(d)
    this.form.phone = this.$route.query.phone
    for (let year = 1950; year < 2019; year++) {
      this.yList.push({
        label: year,
        value: year,
      })
    }
    for (let month = 1; month < 13; month++) {
      this.mList.push({
        label: month,
        value: month,
      })
    }
    for (let day = 1; day < 32; day++) {
      this.dList.push({
        label: day,
        value: day,
      })
    }
  },
  computed: {
    pList() {
      const list = []
      d.forEach(payload => {
        const item = {}
        item.label = payload.state
        item.value = payload.state
        list.push(item)
      })

      return list
    },
    cList() {
      let list = []
      const state = this.form.state
      if (state) {
        let tmp = []
        d.forEach(payload => {
          if (payload.state === state) tmp = payload.cities
        })

        list = []

        tmp.forEach(name => {
          const item = {}
          item.label = name
          item.value = name
          list.push(item)
        })
      }
      return list
    }
  },
  methods: {
    save() {
      this.loaing = true
      this.isImg = true
      const url = '/User/openMt4Account'
      const formdata = this.form
      formdata.sessionId = this.$route.query.sessionId
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      axios.post(url, formdata).then(response => {
        console.log(response.data)
        this.loading = true
        this.$router.replace({ name: 'finish' })
      }).catch(res => {
        this.isDisbt = true 
        this.isDisabled = true
        window.alert(res)
      })
    },
    goNext() {
      const {
        cnFirtName,
        cnLastName,
        enFirtName,
        enLastName,
        idNo,
        year,
        month,
        day,
        gender,
        email,
        phone,
        country,
        state,
        city,
        address,
        zipCode,
      } = this.form

      if (
        cnFirtName &&
        cnLastName &&
        enFirtName &&
        enLastName &&
        idNo &&
        year &&
        month &&
        day &&
        email &&
        phone &&
        country &&
        state &&
        city &&
        address &&
        zipCode
      ) {
        if (gender === '' || gender === void 0) {
          window.alert('请检查填写内容')
        } else {
          this.next = 1
        }
      } else {
        window.alert('请检查填写内容')
      }
    },
    reback() {
      this.next = 0
    }

  },
}
</script>

<style lang="sass">
.r
  height: 100%
  min-height: 100%
.register
  height: 100%
  min-height: 100%
  background-color: #fff
  .bb
    .c
      .site
        resize: none
        padding: 20px 15px 20px 0
        line-height: 20px
        border: none
        position: relative
  .register-title
    dl
      font-size: 14px
      color: #333
      padding: 0 10px
      padding-top: 9px
    p
      padding: 0 10px
      font-size: 12px
      color: #9B9B9B
      line-height: 14px
      padding-top: 4px
      padding-bottom: 9px

  .read
    padding: 20px
    padding-left: 20px
    color: #666
    a
      color: #1B2B84
  .return
  .bt
    padding: 0 20px 20px 20px 
    background-color: #fff
    .loImg
      background-color: #4a7cca
      box-shadow: 0 2px 4px 0 #4a7cca
      -webkit-box-shadow: 0 2px 4px 0 #4a7cca
      img
        width: 24px
        height: 24px
        display: inline-block
        vertical-align: top
        margin: 10px 10px 10px 0
  .disbt
     background-color: #5f647b
     box-shadow: 0 2px 4px 0 #5f647b
     -webkit-box-shadow: 0 2px 4px 0 #5f647b
  


</style>
