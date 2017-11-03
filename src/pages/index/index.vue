<template>
  <div class="main">
    <div>
      <!-- <h3 class="title">预约推拿</h3> -->
      <mt-navbar v-model="tabselected">

        <mt-tab-item id="1">预约</mt-tab-item>
        <mt-tab-item id="2">我的预约</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="tabselected">
        <mt-tab-container-item id="1">

          <div>
            <mt-radio
              title="选择预约地点"
              v-model="stationValue"
              :options="[{
                      label: '金智园区',
                      value: '0'
                    },
                    {
                      label: '牛首园区',
                      value: '1'
                    }]">
            </mt-radio>
            <!-- <mt-field label="员工号" placeholder="请输入员工号" type="number" v-model="userid"></mt-field>
            <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="username"></mt-field> -->
            <!-- <mt-field label="日期" placeholder="日期" type="date" v-model="orderdate"></mt-field> -->
            <div v-if="dayslots[0].values.length">
              <!-- 选择预约的日期 -->
              <div v-on:click="chooseDay" style="position:relative;">
                <div style="width:100%;height:48px;z-index:9;position:absolute;"></div>
                <mt-field label="设置日期" placeholder="请选择日期" type="text" v-model="pickerDayValue" ></mt-field>
              </div>
              <mt-popup
                v-model="popupDayVisible"
                position="bottom" style="width: 100%;">
                <div class="" style="font-size:14px;">
                  <span class="" @click="cancelDayValue" style="float:left;display:inline-block;padding: 4px 16px;">取消</span>
                  <span class="" @click="okDayValue" style="float:right;color:#26a2ff;display:inline-block;padding: 4px 16px;">确定</span>
                  <div class="" style="clear:both;"></div>
                </div>
                <mt-picker :slots="dayslots" @change="onDaysValuesChange"></mt-picker>
              </mt-popup>

              <!-- 选择预约的时间段 -->
              <div v-on:click="chooseTimeFiled" style="position:relative;">
                <div style="width:100%;height:48px;z-index:9;position:absolute;"></div>
                <mt-field label="设置时间范围" placeholder="请输入时间" type="text" v-model="pickerValue" ></mt-field>
              </div>
              <mt-popup
                v-model="popupTimeVisible"
                position="bottom" style="width: 100%;">
                <div class="" style="font-size:14px;">
                  <span class="" @click="cancelPickerValue" style="float:left;display:inline-block;padding: 4px 16px;">取消</span>
                  <span class="" @click="okPickerValue" style="float:right;color:#26a2ff;display:inline-block;padding: 4px 16px;">确定</span>
                  <div class="" style="clear:both;"></div>
                </div>
                <mt-picker :slots="timeslots" @change="onTimeValuesChange"></mt-picker>
              </mt-popup>
              <mt-button type="primary" size="large" class="om-button" @click="saveHealthOrder">预约</mt-button>
            </div>
            <div v-else style="padding: 16px 36px;color: #e24034;">
              本周可预约已全部预约完毕，请等待HR小姐姐开放下次预约机会哦~
            </div>

          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div>
            <div  class="om-pv-8 om-ph-8" style="overflow:auto;" :style="{height:tab2ContentHeight}">
             <table style="width:100%;text-align:center;" >
                <thead>
                  <tr>
                    <!-- <td>预约编号</td> -->
                    <td style="width:20%;">日期</td>
        
                    <td style="width:20%;">地点</td>
                    <td style="width:20%;">时间</td>
                    <td>姓名</td>
                    <td>员工号</td>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in orderedInfo" style="height:24px;font-size:14px;line-height:26px;" class="">
                    <!-- <td v-text="item.id"></td> -->
                    <td v-text="item.dayTime"></td>
                    <td v-text="item.station"></td>
                    <td v-text="item.timeSlot"></td>
                    
                    <td v-text="item.employeeName"></td>
                    <td v-text="String(item.employeeId)"></td>
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
  .om-ph-8 {
    padding-left: 8px;
    padding-right: 8px;
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
  /*.mint-radiolist {
        padding: 0 29px;
  }*/
  .mint-radiolist-title {
    font-weight: 400;
    padding-left: 28px;
  }
  .mint-radio-input:checked + .mint-radio-core {
    background-color: #26a2ff;
    border-color:#26a2ff;
  }
  .mint-radiolist .mint-cell {
    border-top: solid 1px #d9d9d9 !important;
    /* background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%); */
  }
</style>

<script>
  //import CalendarDemo from './calendar-demo.vue'
  import { Toast,MessageBox } from 'bh-mint-ui2';
  import api from '../../api.js';
  import axios from 'axios';
  import moment from 'moment';
  import lodash from 'lodash';
  export default {
      data(){
        return {
          tabselected:'1',

          orderedInfo:[
          ],
          // username:'',
          // userid:'',
          orderdate:'',
          stationValue:'0',
          pickerValue:'',
          pickerDayValue:'',
          tab2ContentHeight:'',
          //时间范围
          popupTimeVisible:false,
          popupDayVisible:false,
          dayslots:[
            {
              flex: 1,
              values: [],
              className: 'slot2',
              textAlign: 'center'
            }
          ],
          timeslots:[
            {
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }
          ]
        }
      },
      computed: {
        
      },
      watch: {
        tabselected:function(value,oldvalue){
          if (value == 1) {
            this.getDay();
            //this.getTimeOrder();
          }else if(value == 2){
            this.tab2ContentHeight = (document.body.clientHeight - 50 - 53 - 10) + 'px';
            this.getOrderInfo();
          }
        },
        stationValue:function(value,oldvalue){
          //this.getTimeOrder();
          this.getDay();
        }
      },
      methods: {
        onTimeValuesChange(picker, values) {
          this.pickerValue = values[0];
        },
        chooseTimeFiled(){
          this.popupTimeVisible = true;
          //this.getTimeOrder();
        },
        chooseDay() {
          this.popupDayVisible = true;
        },
        onDaysValuesChange(picker, values){
          this.pickerDayValue = values[0];
          this.timeslots[0].values = [];
        },
        cancelDayValue(){
          //this.pickerDayValue = ''; 
          this.popupDayVisible = false;
        },
        okDayValue(){
          this.getTimeOrder();
          this.popupDayVisible = false;
        },
        cancelPickerValue(){
          this.pickerValue = '';
          this.popupTimeVisible = false;
        },
        okPickerValue(){
          this.popupTimeVisible = false;
        },
        getTimeOrder(){
          var that = this;
          that.timeslots[0].values = [];
          var arr = JSON.parse(localStorage.getItem('dayTimeDatas'));
          var targetStationDayDatas = [];
          //根据stationValue与dayTime 过滤出某地某天的时间段
          if (that.stationValue == '0') {
            targetStationDayDatas = arr.yq;
          }else if(that.stationValue == '1') {
            targetStationDayDatas = arr.ns;
          }
          var datTimeDatas = _.filter(targetStationDayDatas, function(n) {
            var formatItem = that.formatDate(new Date(n.dayTime));
            return ((formatItem == that.pickerDayValue) && (Number(n.column1) > 0));
          });
          datTimeDatas.forEach(function(item){
            that.timeslots[0].values.push(item.timeSlot);
          });
          // axios({
          //     method:"POST",
          //     url:api.getTimeOrder,
          //     params:{
          //       day_time:that.pickerDayValue,
          //       station:that.stationValue
          //     }
          // }).then(function(response){
          //   if (response.data.rescode == 0) {
          //       if (response.data.resMessage && response.data.resMessage.length>0) {
          //         response.data.resMessage.map(function(item){
          //           that.timeslots[0].values.push(item.timeSlot);
          //         });
          //       }
          //   }else {
          //     Toast('获取预约信息失败');
          //   }
          // }).catch(function(err){
          //   Toast(err);
          // });
        },
        getDay(){
          var that = this;
          var tmpResult = '';
          // if (localStorage.getItem('dayTimeDatas')){
          //   tmpResult = JSON.parse(localStorage.getItem('dayTimeDatas'));
          // }
          // console.log('tmpResult:'+tmpResult);
          // if (localStorage.getItem('dayTimeDatas') && tmpResult && tmpResult.yq && tmpResult.ns) {
          //   that.dayTimeFormate(tmpResult);
          // }else {
            // var response = {"resMessage":{"ns":[{"column1":"2","timeSlot":"12:00-12:30","station":"1","dayTime":"Thu Sep 21 00:00:00 CST 2017"},{"column1":"1","timeSlot":"12:30-13:00","station":"1","dayTime":"Thu Sep 21 00:00:00 CST 2017"},{"column1":"1","timeSlot":"13:00-13:30","station":"1","dayTime":"Thu Sep 21 00:00:00 CST 2017"}],"yq":[{"column1":"1","timeSlot":"13:30-14:00","station":"0","dayTime":"Thu Sep 21 00:00:00 CST 2017"}]},"rescode":0};
            // localStorage.setItem('dayTimeDatas',JSON.stringify(response.resMessage));
            // that.dayTimeFormate(response.resMessage);
            axios({
                method:"POST",
                url:api.getDay,
                params:{
                  //station:that.stationValue
                }
            }).then(function(response){
              if (response.data.rescode == 0) {
                  if (response.data.resMessage && response.data.resMessage.yq && response.data.resMessage.ns) {
                    localStorage.setItem('dayTimeDatas',JSON.stringify(response.data.resMessage));
                    that.getDayAndTime(that.dayTimeFormate);
                  }
              }else {
                Toast('获取预约信息失败');
              }
            }).catch(function(err){
              Toast(err);
            });
          //}
        },
        getDayAndTime:function(cb){
          var that = this;
          axios({
              method:"POST",
              url:api.getDay,
              params:{
                //station:that.stationValue
              }
          }).then(function(response){
            if (response.data.rescode == 0) {
                if (response.data.resMessage && response.data.resMessage.yq && response.data.resMessage.ns) {
                  localStorage.setItem('dayTimeDatas',JSON.stringify(response.data.resMessage));
                  cb && cb(response.data.resMessage);
                }
            }else {
              Toast('获取预约信息失败');
            }
          }).catch(function(err){
            Toast(err);
          });
        },
        dayTimeFormate:function(arr){
          var that = this;
          //置空
          that.dayslots[0].values = [];
          var targetStationDatas = [];
          if (that.stationValue == '0') {
            targetStationDatas = arr.yq;
          }else if(that.stationValue == '1') {
            targetStationDatas = arr.ns;
          }
          targetStationDatas.forEach(function(item){
            //判断可预约数是否为零
            if (Number(item.column1)) {
              var formatItem = that.formatDate(new Date(item.dayTime));
              //检查日期是否已经加入数组
              var targetItemIndex = _.indexOf(that.dayslots[0].values, formatItem);
              if (targetItemIndex == -1) {
                that.dayslots[0].values.push(formatItem);
              }
            }
          });
          setTimeout(function(){
            that.getTimeOrder();
          },50); 
        },
        saveHealthOrder(){
          var that = this;
          // MessageBox.confirm('确定提交吗？').then(action => {
          //   console.log(action);
            axios({
                method:"POST",
                url:api.saveHealthOrder,
                params:{
                  day_time:that.pickerDayValue,
                  time_slot:that.pickerValue,
                  station:that.stationValue,
                  employeeId:global.employeeId
                }
            }).then(function(response){
              if (response.data.rescode == 0) {
                Toast('预约成功啦~')
                that.tabselected = '2';
                //预约成功后，把相应地区，日期，时间段的数量减 1
                // var tmpResult = JSON.parse(localStorage.getItem('dayTimeDatas'));
                // var tmpArray = [];
                // if (that.stationValue == '0') {
                //   tmpArray = tmpResult.yq;
                // }else if (that.stationValue == '1'){
                //   tmpArray = tmpResult.ns;
                // }
                // var targetItemIndex = _.findIndex(tmpArray, function(chr) {
                //   var formatItem = that.formatDate(new Date(chr.dayTime));
                //   return ((formatItem == that.pickerDayValue) && (chr.timeSlot == that.pickerValue));
                // });
                // if (Number(tmpArray[targetItemIndex].column1)) {
                //   tmpArray[targetItemIndex].column1 = Number(tmpArray[targetItemIndex].column1) - 1;
                // }
                // localStorage.setItem('dayTimeDatas',JSON.stringify(tmpResult));
              }else if(response.data.rescode == 1) {
                Toast(response.data.resMessage);
              }else {
                Toast('预约失败，下次早点预约奥~');
              }
              //更新本地的日期，时间段，预约数量的数据
              //that.getDayAndTime();
            }).catch(function(err){
              Toast('预约失败，下次早点预约奥~')
            });
          // }); 
        },
        getOrderInfo() {
          var that= this;
          that.orderedInfo = [];
          var paramsObj = {
              method:"POST",
              url:api.getOrderInfo,
              params:{
                employeeId:global.employeeId
              }
          };
          //保存的信息
          axios(paramsObj).then(function(response){
            var responseData = response.data;
            if (responseData.rescode == 0) {
              if (responseData.resMessage) {
                responseData.resMessage.forEach(function(item){
                  item.dayTime = that.formatDate(new Date(item.dayTime));
                  if (item.station == '0') {
                    item.station = '金智园区';
                  }
                  if (item.station == '1') {
                    item.station = '牛首园区';
                  }
                  that.orderedInfo.push(item);
                });
              }
            }else {
              Toast('获取自己已经预约信息失败');
            }
          }).catch(function(err){
            Toast(err);
          }); 
        },
        //格局化日期：yyyy-MM-dd 
        formatDate: function(date) { 
            var myyear = date.getFullYear(); 
            var mymonth = date.getMonth()+1; 
            var myweekday = date.getDate(); 

            if(mymonth < 10){ 
            mymonth = "0" + mymonth; 
            } 
            if(myweekday < 10){ 
            myweekday = "0" + myweekday; 
            } 
            return (myyear + "-" + mymonth + "-" + myweekday); 
        }
      },
      created() {
        this.getDay();
      },
      components: {
        [MessageBox.name]: MessageBox,
        // [Navbar.name]: Navbar,
        // [Field.name]: Field,
        // [Cell.name]: Cell,
      }
  }
</script>

