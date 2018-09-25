import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import classroomList from '@/views/classroom/list'
import classroomModular from '@/views/classroom/modular'

import managementModular from '@/views/management/modular'

import articleList from '@/views/article/list'

import award from '@/views/award'
import recommand from '@/views/recommand'
import aptitude from '@/views/aptitude'
import letter from '@/views/letter'

import register from '@/views/register'
import finish from '@/views/finish'
import greement from '@/views/greement'
import cooperation from '@/views/cooperation'
import bankList from '@/views/bank/bankList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/classroom',
      name: 'classroomList',
      component: classroomList
    },
    {
      path: '/classroom/modular',
      name: 'classroomModular',
      component: classroomModular
    },
    {
      path: '/article/list',
      name: 'articleList',
      component: articleList
    },
    // 资管详情
    {
      path: '/management/modular',
      name: 'managementModular',
      component: managementModular
    },
    // 注册抽奖
    {
      path: '/award',
      name: 'award',
      component: award
    },
    // 推荐得现金
    {
      path: '/recommand',
      name: 'recommand',
      component: recommand
    },
    // 服务资质
    {
      path: '/aptitude',
      name: 'aptitude',
      component: aptitude
    },
    // 给用户的一封信
    {
      path: '/letter',
      name: 'letter',
      component: letter
    },
    // 开户
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // 开户成功
    {
      path: '/finish',
      name: 'finish',
      component: finish
    },
    // 开户隐私协议
    {
      path: '/greement',
      name: 'greement',
      component: greement
    },
    // 选择经济商
    {
      path: '/cooperation',
      name: 'cooperation',
      component: cooperation
    },
    // 支持银行列表
    {
      path: '/bank/bankList',
      name: 'bankList',
      component: bankList
    }
  ]
})
