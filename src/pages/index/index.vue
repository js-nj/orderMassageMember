<template>
  <div class="main">
    <div>
      <h3 class="title">预约按摩</h3>
      <mt-navbar v-model="selected">

        <mt-tab-item id="1">预约</mt-tab-item>
        <mt-tab-item id="2">我的预约</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">

          <div>
            <!-- <mt-field label="员工号" placeholder="请输入员工号" type="number" v-model="userid"></mt-field>
            <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="username"></mt-field> -->
            <mt-field label="日期" placeholder="日期" type="date" v-model="orderdate"></mt-field>
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

            <!-- 选择预约的时间段 -->
            <div v-on:click="chooseTimeFiled">
              <mt-field label="设置时间范围" placeholder="请输入时间" type="text" v-model="pickerValue" ></mt-field>
            </div>
            <mt-popup
              v-model="popupTimeVisible"
              position="bottom" style="width: 100%;">
              <mt-picker :slots="timeslots" @change="onTimeValuesChange"></mt-picker>
            </mt-popup>
            <mt-button type="primary" size="large" class="om-button">预约</mt-button>

          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
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
                    <td>操作</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>item.DayTime</td>
                    <td>item.timeSlot</td>
                    <td>item.Station</td>
                    <td>item.EmployeeNum</td>
                    <td>item.EmployeeName</td>
                    <td><mt-button type="danger">取消预约</mt-button></td>
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
    color: #26a2ff;
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
  .om-button {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .mint-tab-item-label {
    font-size:16px;
    font-weight: 600;
  }
  .mint-tab-container {
    margin-top: 8px;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #26a2ff;
    color: #26a2ff;
    margin-bottom: 0px;
  }
  .mint-button--primary {
    background-color:#26a2ff;
  }
  .mint-cell-wrapper {
        font-size: 15px;
        padding: 0 36px;
  }
  .mint-checklist-title,.mint-radiolist-title {
    font-size: 15px;
    color: #333;
    font-weight: 600;
  }
  .mint-radiolist {
        padding: 0 29px;
  }
  .mint-radiolist-title {
    font-weight: 400;
  }
</style>

<script>
  //import CalendarDemo from './calendar-demo.vue'
  //import { Navbar, TabItem ,Field ,Cell} from 'bh-mint-ui2';
  import moment from 'moment'
  export default {
      data(){
        return {
          selected:'1',

          orderedInfo:[],
          username:'',
          userid:'',
          orderdate:'',
          value:'ss',
          pickerValue:'',
          //时间范围
          popupTimeVisible:false,
          timeslots:[
            {
              flex: 1,
              values: ['08:00-08:30','08:30-09:00','01:00-01:30','02:00-02:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30','08:00-08:30',],
              className: 'slot1',
              textAlign: 'center'
            }
          ]
        }
      },
      computed: {
        
      },
      watch: {
        selected:function(value,oldvalue){
          if (value == 2) {
            this.selectDate();
          }
        }
      },
      methods: {
        selectDate() {
          var that= this;
          if (this.selected == 1) {
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

        onTimeValuesChange(picker, values) {
          this.pickerValue = values[0];
        },
        chooseTimeFiled(){
          this.popupTimeVisible = true;
        }
      },
      created() {
      },
      components: {
        // [TabItem.name]: TabItem,
        // [Navbar.name]: Navbar,
        // [Field.name]: Field,
        // [Cell.name]: Cell,
      }
  }
</script>

