<template>
  <div class="about">
    <div class="about-header">
      <div>2019-10-21</div>
      <div>
        <button @click="onDay">今天</button>
        <button>本周</button>
        <button @click="onMonth">本月</button>
      </div>
    </div>
    <div class="about-wrapper">
      <div v-for="(item,index) in tabVal" :key="index">
        <p v-show="!isShowArr[index].isShow">
          <span>{{item.name}}</span>
          <span @click="add(index)">+</span>
        </p>
        <div class="none" v-show="isShowArr[index].isShow">
          <div class="top">
            <input type="text" v-model="conValue[index].val" />
            <button @click="sure(index)">确定</button>
          </div>
          <div class="bottom">
            <div class="block">
              <el-date-picker
                v-model="dateValueArr[index].one"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div class="list">
          <b v-for="(ite,i) in item.arr" :key="i" @click="onDrawer(ite,i,index)">
            <span>{{ite.value}}</span>
            <span>{{ite.currDate[0].toLocaleDateString()}}</span>
          </b>
        </div>
      </div>
    </div>
    <el-drawer
      title="项目信息"
      :showClose="false"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <h3>{{resetData.value}}</h3>
      <button
        v-for="(item,i) in tabVal"
        :key="i"
        :class="index==i?'active':''"
        @click="changeType(item,i)"
      >{{item.name.slice(item.name.indexOf('-')+1)}}</button>
      <br />
      <br />
      <input type="text" v-model="resetData.value" />
      <button @click="resetName">修改</button>
      <br />
      <br />
      <div class="block">
        <el-date-picker
          v-model="resetData.currDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <br />
      <br />
      <div>
        <i v-for="(item,index) in tabVal[this.index].smallArr" :key="index">{{item}}</i>
      </div>
      <br />
      <br />
      <br />
      <input type="text" placeholder="标签" v-model="bqValue" />
      <button @click="addBBQ">确定添加</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button @click="remove">删除项目</button>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bqValue: "", //input框双向绑定
      index: 0, //大盒子下标
      dialogIndex: "", //遮罩
      tabVal: [
        //数据
        {
          name: "很重要-很紧急",
          arr: [],
          smallArr: []
        },
        {
          name: "重要-不紧急",
          arr: [],
          smallArr: []
        },
        {
          name: "不重要-紧急",
          arr: [],
          smallArr: []
        },
        {
          name: "不重要-特紧急",
          arr: [],
          smallArr: []
        }
      ],
      conValue: [{ val: "" }, { val: "" }, { val: "" }, { val: "" }], //input框双向绑定
      dateValueArr: [
        {
          one: [new Date(2019, 9, 30, 10, 10), new Date("2019-12-1")]
        },
        {
          one: [new Date(2019, 9, 30, 10, 10), new Date("2019-12-1")]
        },
        {
          one: [new Date(2019, 9, 30, 10, 10), new Date("2019-12-1")]
        },
        {
          one: [new Date(2019, 9, 30, 10, 10), new Date("2019-12-1")]
        }
      ],
      isShowArr: [
        { isShow: false },
        { isShow: false },
        { isShow: false },
        { isShow: false }
      ],
      drawer: false, //遮罩开关
      direction: "rtl", //遮罩
      resetData: {}, //重置数据
      dialogDate: [] //遮罩数组
    };
  },
  methods: {
    changeType(item, i) {
      ///切换项目类型的方法
      let obj = this.tabVal[this.index].arr[this.resetData.index];
      this.tabVal[this.index].arr.splice(this.resetData.index, 1);
      this.index = i;
      item.arr.push(obj);
    },
    addBBQ() {
      //添加标签的方法
      this.tabVal[this.index].smallArr.push(this.bqValue);
      this.bqValue = "";
    },
    add(type) {
      //添加按钮的方法
      this.isShowArr[type].isShow = !this.isShowArr[type].isShow;
      this.index = type;
    },
    sure(type) {
      //添加后确定按钮  //添加项目用
      this.isShowArr[type].isShow = !this.isShowArr[type].isShow;
      if (this.conValue[type].val.trim() != "") {
        this.tabVal[type].arr.push({
          value: this.conValue[type].val,
          currDate: this.dateValueArr[type].one
        });
      }
      this.conValue[type].val = ""; //添加完之后清空输入框
    },
    onDrawer(item, i, index) {
      //给蔗渣里边的元素赋值
      this.drawer = true;
      this.index = index;
      this.resetData = {
        value: item.value,
        currDate: item.currDate,
        index: i
      };
    },
    handleClose(done) {
      //关闭遮罩
      done();
    },
    resetName() {
      //重置名称
      this.tabVal[this.index].arr[this.resetData.index] = this.resetData;
      this.drawer = false;
    },
    remove() {
      //删除项目
      this.tabVal[this.index].arr.splice(this.resetData.index, 1);
      this.drawer = false;
    },
    onDay() {
    this.tabVal.forEach(item => {
        item.arr.filter(ite => ite.currDate[0].getDay() == new Date().getDay());
      });
    },
    onMonth() {
      this.tabVal.forEach(item => {
        item.arr.filter(ite => ite.currDate[0].getMonth() == new Date().getMonth());
      });
    }
  }
};
</script>
<style lang="scss">
i {
  font-style: normal;
  width: 60px;
  height: 30px;
  border: solid 1px #ccc;
  font-size: 13px;
  text-align: center;
  line-height: 30px;
  display: inline-block;
  margin: 0px 5px;
}
.active {
  background: red;
  color: white;
  outline: none;
  border: solid 1px red;
}
.el-drawer__body {
  h3 {
    margin-bottom: 20px;
    text-align: center;
  }
  button {
    margin: 0px 10px;
    padding: 0px 8px;
  }
  input {
    margin-left: 10px;
    height: 30px;
  }
}
.about-wrapper {
  width: 100%;
  height: 667px;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 50%;
    height: 50%;
    &:nth-child(1),
    &:nth-child(3) {
      border-right: 1px solid #ccc;
    }
    &:nth-child(1),
    &:nth-child(2) {
      border-bottom: solid 1px #ccc;
    }
    p {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0px 15px;
      span:nth-child(1) {
        float: left;
      }
      span:nth-child(2) {
        float: right;
        font-size: 30px;
        font-weight: bold;
      }
      &:nth-child(1) {
        background: salmon;
      }
    }
  }
  .list {
    width: 100%;
    b {
      font-weight: normal;
      margin: 15px 0px;
      width: 100%;
      height: 25px;
      display: block;
      line-height: 25px;
      color: red;
      background: skyblue;
      span:nth-child(1) {
        float: left;
        margin-left: 15px;
      }
      span:nth-child(2) {
        float: right;
        margin-right: 15px;
      }
    }
  }
  .none {
    width: 100%;
    .block {
      width: 100%;
      .el-date-editor {
        width: 100%;
      }
    }
    .top {
      width: 100%;
      display: flex;
      height: 30px;
      line-height: 30px;
      input {
        width: 80%;
      }
      button {
        width: 20%;
      }
    }
  }
}
.about-header {
  width: 100%;
  height: 55px;
  border-bottom: solid 1px #ccc;
  div {
    display: inline-block;
    height: 100%;
    line-height: 55px;
    &:nth-child(1) {
      margin: 0px 25px;
    }
    button {
      margin: 0px 10px;
      padding: 0px 8px;
    }
  }
}
</style>
