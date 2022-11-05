<template>
  <div class="p-work-time">
    <!-- 导航栏 -->
    <van-nav-bar title="工时记录" left-arrow @click-left="onBack" class="header mb-10">
      <template #right>
        <van-popover v-model="showPopover" trigger="click" placement="left-start" :actions="actions" @select="onSelect">
          <template #reference>
            <van-icon name="add-o" size="24" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <!-- 统计与过滤面板 -->
    <van-panel
      title="工时统计（当前/必需）"
      :desc="`${status.year} / ${status.month}`"
      :status="`${curTotal} / ${curRequiredTotal}`"
    >
    </van-panel>
    <!-- 当月记录列表 -->
    <van-list>
      <van-cell @click="addItem">新增/更新记录</van-cell>
      <van-cell v-for="item in workTimeDataFilter" :key="item.date" :title="item.date" @click="editItem(item)">
        <div class="day-item">
          <span>{{ item.start }}</span>
          <span>{{ item.end }}</span>
          <span>{{ dayTotalFixed(item.start, item.end) }}</span>
        </div>
      </van-cell>
    </van-list>
    <!-- 添加和编辑 -->
    <van-dialog v-model="showEditor" show-cancel-button @confirm="onSubmit">
      <van-field
        clickable
        name="datetimePicker"
        :value="formData.date"
        label="日期"
        placeholder="点击选择日期"
        @click="showDatePicker = true"
        autocomplete="off"
        readonly
      />
      <van-field
        clickable
        name="datetimePicker"
        :value="formData.start"
        label="最早打卡时间"
        placeholder="点击选择时间"
        @click="showStartPicker = true"
        autocomplete="off"
        readonly
      />
      <van-field
        clickable
        name="datetimePicker"
        :value="formData.end"
        label="最晚打卡时间"
        placeholder="点击选择时间"
        @click="showEndPicker = true"
        autocomplete="off"
        readonly
      />
      <van-field name="checkbox" label="加班">
        <template #input>
          <van-checkbox v-model="formData.overtime" shape="square" />
        </template>
      </van-field>
      <van-field name="checkbox" label="跨天打卡">
        <template #input>
          <span class="ml-10">暂不支持</span>
        </template>
      </van-field>
      <van-field name="checkbox" label="碎片请假">
        <template #input>
          <span class="ml-10">暂不支持</span>
        </template>
      </van-field>
      <van-field name="checkbox" label=" ">
        <template #input>
          <span class="ml-10" style="color: red" @click="deleteItem">删除当前日期</span>
        </template>
      </van-field>
    </van-dialog>
    <van-popup v-model="showDatePicker" position="bottom">
      <van-datetime-picker
        :value="new Date()"
        type="date"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false"
        :min-date="new Date(2022, 0, 1)"
        :max-date="new Date(2099, 1, 1)"
      />
    </van-popup>
    <van-popup v-model="showStartPicker" position="bottom">
      <van-datetime-picker :value="'08:30'" type="time" @confirm="onStartConfirm" @cancel="showStartPicker = false" />
    </van-popup>
    <van-popup v-model="showEndPicker" position="bottom">
      <van-datetime-picker :value="'18:30'" type="time" @confirm="onEndConfirm" @cancel="showEndPicker = false" />
    </van-popup>
    <!-- 切换月份 -->
    <van-popup v-model="showYearMonthPicker" position="bottom">
      <van-datetime-picker
        :value="new Date()"
        type="year-month"
        title="选择年月"
        :min-date="new Date(2022, 0)"
        :max-date="new Date(2032, 1)"
        @change="Toast"
        @cancel="showYearMonthPicker = false"
        @confirm="confirmYM"
      />
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant'
import DAY from 'dayjs'
import { exportJsonFile } from '@/utils'
export default {
  name: 'WorkTime',
  data() {
    const disabled = true
    return {
      status: {
        year: 2022,
        month: 11,
      },
      showPopover: false,
      actions: [
        { text: '添加数据', action: () => this.addItem() },
        {
          text: '切换月份',
          action: () => {
            this.showYearMonthPicker = true
          },
        },
        { text: '导出数据', action: () => this.exportData() },
      ],
      showEditor: false,
      showDatePicker: false,
      showStartPicker: false,
      showEndPicker: false,
      showYearMonthPicker: false,
      formData: {
        date: '',
        start: '',
        end: '',
        overtime: false,
      },
      workTimeData: [
        {
          date: '2022-11-01',
          start: '08:30',
          end: '19:30',
          overtime: false, // 是否加班
        },
        {
          date: '2022-11-02',
          start: '08:10',
          end: '19:30',
          overtime: false, // 是否加班
        },
        {
          date: '2022-11-03',
          start: '08:40',
          end: '20:30',
          overtime: false, // 是否加班
        },
      ],
    }
  },
  computed: {
    // 数据过滤
    workTimeDataFilter() {
      return this.workTimeData.filter(d => {
        return DAY(d.date).format('YYYY') == this.status.year && DAY(d.date).format('MM') == this.status.month
      })
    },
    // 日工时计算
    dayTotal() {
      return (start, end) => new Date('2022-01-01 ' + end) - new Date('2022-01-01 ' + start) - 90 * 60 * 1000
    },
    dayTotalFixed() {
      return (start, end) => (this.dayTotal(start, end) / 1000 / 60 / 60).toFixed(1)
    },
    // 当前总工时
    curTotal() {
      const totalMS = this.workTimeDataFilter
        .filter(d => !d.overtime)
        .reduce((p, v) => {
          const time = this.dayTotal(v.start, v.end)
          return p + time
        }, 0)
      return (totalMS / 1000 / 60 / 60).toFixed(1)
    },
    // 当前应出勤
    curRequiredTotal() {
      return this.workTimeDataFilter.filter(d => !d.overtime).length * 8
    },
  },
  created() {
    // 本地缓存
    const localData = localStorage.getItem('workTimeData')
    if (localData) {
      this.workTimeData = JSON.parse(localData)
    }
  },
  methods: {
    // 返回
    onBack() {
      this.$router.push('/center')
    },
    // 打开扩展功能
    onSelect(item) {
      if (item.action) {
        item.action()
      } else {
        Toast(`${item.text}还在开发中`)
      }
    },
    addItem() {
      this.showEditor = true
      this.formData = {
        date: DAY().format('YYYY-MM-DD'),
        start: '08:30',
        end: '18:30',
      }
    },
    editItem(item) {
      this.showEditor = true
      this.formData = { ...item }
    },
    deleteItem() {
      const index = this.workTimeData.findIndex(d => d.date === this.formData.date)
      if (index) {
        this.workTimeData.splice(index, 1)
        this.saveLocal()
      }
      this.showEditor = false
    },
    // 选择日期
    onDateConfirm(time) {
      this.formData.date = DAY(time).format('YYYY-MM-DD')
      this.showDatePicker = false
    },
    onStartConfirm(time) {
      this.formData.start = time
      this.showStartPicker = false
    },
    onEndConfirm(time) {
      this.formData.end = time
      this.showEndPicker = false
    },
    // 选择年月
    confirmYM(val) {
      this.status.year = DAY(val).format('YYYY')
      this.status.month = DAY(val).format('MM')
      this.showYearMonthPicker = false
    },
    // 编辑完成
    onSubmit() {
      const { date, start, end } = this.formData
      // 必填判断
      if (!date || !start || !end) {
        return Toast('提交失败，请检查数据')
      }
      // 判断是否存在该日期
      const index = this.workTimeData.findIndex(d => d.date === date)
      if (index >= 0) {
        this.workTimeData[index] = { ...this.formData }
        Toast('更新完成')
      } else {
        this.workTimeData.push({ ...this.formData })
        // 排序
        this.workTimeData.sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        })
      }
      this.saveLocal()
    },
    // 本地缓存
    saveLocal() {
      localStorage.setItem('workTimeData', JSON.stringify(this.workTimeData))
      Toast('保存成功')
    },
    // 导出数据
    exportData() {
      Toast('导出数据中，请确认浏览器可以下载文件')
      exportJsonFile(this.workTimeData, `workTimeData ${DAY().format('YYYY-MM-DD HH_MM_ss')}.json`)
    },
  },
}
</script>
<style lang="less">
.p-work-time {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
  .day-item {
    display: flex;
    justify-content: space-between;
    span {
      width: 40px;
    }
  }
}
</style>
