<template>
  <div class="main">
    <div>
      <h1 class="title">预约按摩</h1>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">设置预约</mt-tab-item>
        <mt-tab-item id="2">查看预约</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <calendar :view="view" :decorate="decorate" :sub="sub" :selected="selected1" :current-view="currentView" :start-date="startDate" :indicator="indicator" :start-monday="false" @prev="prev" @next="next" @today="today" @onPropsChange="change" :mainFrom="1" @selectDate="selectDate">
              <div class="actions" slot="action">
                <div class="action" @click="changeView">{{viewName}}</div>
                <!-- <div class="action" @click="addEvent">加</div> -->
              </div>
          </calendar>
          <div>
            <div v-on:click="addTimeFiled">
              <mt-field label="设置时间范围" placeholder="请输入时间" type="text" v-model="pickerValue" ></mt-field>
            </div>
            <mt-popup
              v-model="popupTimeVisible"
              position="bottom" style="width: 100%;">
              <mt-picker :slots="timeslots" @change="onTimeValuesChange"></mt-picker>
            </mt-popup>
            <mt-radio
              title="设置地点"
              v-model="value"
              :options="[{
                      label: '金智园区',
                      value: '0'
                    },
                    {
                      label: '牛首园区',
                      value: '1'
                    }]">
            </mt-radio>
            <mt-field label="每次时长" placeholder="请输入时长" v-model="keepTime"></mt-field>
            <mt-field label="周限制次数" placeholder="请输入次数" v-model="weekMaxTime"></mt-field>
            <mt-field label="月限制次数" placeholder="请输入次数" v-model="monthMaxTime"></mt-field>

            <mt-button type="primary">保存</mt-button>
            <mt-button type="danger">发布</mt-button>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <calendar :view="view" :decorate="decorate" :sub="sub" :selected="selected1" :current-view="currentView" :start-date="startDate" :indicator="indicator" :start-monday="false" @prev="prev" @next="next" @today="today" @onPropsChange="change" :mainFrom="2" @selectDate="selectDate">
            <div class="actions" slot="action">
              <div class="action" @click="changeView">{{viewName}}</div>
              <!-- <div class="action" @click="addEvent">加</div> -->
            </div>
          </calendar>
          <div>
            <div v-for="item in orderedInfo" class="om-pv-8">
              <table>
                <thead>
                  <tr>
                    <td>日期</td>
                    <td>时间</td>
                    <td>地点</td>
                    <td>员工号</td>
                    <td>姓名</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>item.DayTime</td>
                    <td>item.timeSlot</td>
                    <td>item.Station</td>
                    <td>item.EmployeeNum</td>
                    <td>item.EmployeeName</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      
    </div>
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    -webkit-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Hiragino Sans GB', 'Microsoft Yahei', SimSun, Tahoma, Arial, Helvetica, STHeiti;
  }
  .title {
    text-align: center;
    padding: 10px;
    color: #31b29c;
  }
  .action {
    display: inline-block;
    padding: 5px;
    border-radius: 2px;
    background: #31b29c;
    color: #fff;
  }
  .om-pv-8 {
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>

<script>
  //import CalendarDemo from './calendar-demo.vue'
  //import { Navbar, TabItem ,Field ,Cell} from 'bh-mint-ui2';
  import moment from 'moment'
  import Calendar from '../../calendar.vue'
  export default {
      data(){
        return {
          selected:'1',
          view: 'month',
          decorate: {},
          sub: {
            '2016-12-22': {
              content: '休',
              color: '#31b29c'
            },
            '2016-12-27': {
              content: '班',
              color: '#eb4f04'
            }
          },
          currentView: {},
          indicator: {},
          startDate: new Date,
          selected1: new Date,
          orderedInfo:[],
          username:'',
          value:'ss',
          pickerValue:'',
          timeFiled:'',
          //时间范围
          popupTimeVisible:false,
          timeslots:[
            {
              flex: 1,
              values: ['08:00', '09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
              className: 'slot1',
              textAlign: 'right'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: ['08:00', '09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
              className: 'slot3',
              textAlign: 'left'
            }
          ],
          //时长
          keepTime:'',
          //限制次数
          weekMaxTime:'',
          monthMaxTime:''
        }
      },
      computed: {
        viewName: {
          get() {
            if (this.view === 'week') {
              return '月'
            } else if (this.view === 'month') {
              return '日'
            }else if (this.view === 'month2') {
              return '月'
            }
          }
        },
        values:{
          get(){
            
          },
          set(){

          }
        }
      },
      watch: {
        startDate(startDate) {
          this.dealWithIndicator(startDate)
        }
      },
      methods: {
        change(propName,newVal,oldVal){
          this[propName]=newVal;
        },
        dealWithIndicator(startDate) {
          let indicator = {}
          if (startDate.getMonth() <= 6) {
            indicator.title = startDate.getFullYear();// + '上学期'
          } else {
            indicator.title = startDate.getFullYear();// + '下学期'
          }
          this.indicator = indicator
        },
        changeView() {
          //默认为日(month),点日切换为周(week),点周切换为月(month2),点月切换为日(month)
          if (this.view == 'month') {
            this.view = 'week'
          }else if (this.view === 'week') {
            this.view = 'month2'
          } else if (this.view === 'month2') {
            this.view = 'month'
          }
        },
        addEvent() {
          let flag = window.confirm('是否给明天添加一条事件')
          let today = new Date()
          if (flag) {
            this.decorate = Object.assign({}, this.decorate, {
              [moment(new Date()).add(1, 'day').format('YYYY-MM-DD')]: true
            })
          }
        },
        prev() {
          console.log('prev clicked')
        },
        next() {
          console.log('next clicked')
        },
        today() {
          console.log('today clicked')
        },
        selectDate() {
          var that= this;
          if (this.selected == 2) {
            that.orderedInfo = [];
            //已经预约的信息
            axios({
                method:"POST",
                url:api.appsCount,
                params:{
                }
            }).then(function(response){
              var responseData = response.data.datas.appscount.rows;
              if (response.data.code == 0) {
                  if (responseData && responseData.length>0) {
                    responseData.map(function(item){
                      var itemObj = item;
                      itemObj.time='xxx';
                      itemObj.name = 'xxx';
                      that.orderedInfo.push(itemObj);
                    });
                  }
              }else {
                Toast('获取预约信息失败');
              }
            }).catch(function(err){
              Toast(err);
            });
          }
        },
        addTimeFiled() {
          this.popupTimeVisible = true;
          //this.$refs.datetimepicker.open();
        },
        handleConfirm(){

        },
        onTimeValuesChange(picker, values) {
          // if (values[0] > values[1]) {
            
          // }
          if (!values[0]) {
            values[0] = '08:00';
          }
          if (!values[1]) {
            values[1] = '08:00';
          }
          this.pickerValue = values[0] + '-' + values[1];
        }
      },
      created() {
        this.dealWithIndicator(this.startDate)
      },
      components: {
        // [TabItem.name]: TabItem,
        // [Navbar.name]: Navbar,
        // [Field.name]: Field,
        // [Cell.name]: Cell,
        Calendar
      }
  }
</script>

