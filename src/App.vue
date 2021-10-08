<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <!-- <router-view/> -->
  <main>
    <div class="calendar">
      <div class="title">
        <span>{{ today.year[0] }}<br>{{ today.year[1] }}</span>
        <span>{{ ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'][today.month] }}</span>
      </div>
      <ol class="week">
        <li v-for="d in ['S', 'M', 'T', 'W', 'T', 'F', 'S']">{{ d }}</li>
      </ol>
      <ol class="month">
        <li v-for="d in firstDayOfTheWeek"></li>
        <li v-for="(d, index) in calendar.allDays"
            @click="selectDayInCalendar(index)"
            :class="[
              {'today': (index + 1) == today.day}, 
              {'event': calendar.allDays[index].length > 0},
              {'selectDay': calendar.selectDay == index + 1}
            ]">{{ index + 1 }}</li>
      </ol>
    </div>
    <div class="tasksQuantity" @click="openTaskList">{{ calendar.allDays[calendar.selectDay - 1].length }} TASKS</div>
    <div class="lightbox list speed_task_list" :class="{'show': speedTaskList.isOpen}">
      <div class="container">
        <h2>快速記錄</h2>
        <ul>
          <li v-for="(item, index) in speedTaskList.list" :class="{'done': item.done}">
            <div class="checkbox" @click="speedTaskIsDone(index)"><span></span></div>
            <input type="text" v-model="item.text" @focus="editSpeedTask(index)" @blur="editSpeedTask(-1)">
            <div class="remove" :class="{'show': index == speedTaskList.editIndex}"><span></span></div>
          </li>
        </ul>
        <div @click="addNewSpeedTask">+添加新事項</div>
      </div>
    </div>
    <div class="lightbox list calendar_task_list" :class="{'show': calendar_task_list.isOpen}">
      <div class="container">
        <h2>{{today.month}}/{{today.day}}</h2>
        <ul>
          <li v-for="(i, index) in calendar.allDays[calendar.selectDay - 1]" :class="{'done': i.done}">
            <div class="checkbox" @click="taskIsDoneInCalendar(index)"><span></span></div>
            <input type="text" @focus="editCalendarTask(index)" v-model="i.text"  @blur="editCalendarTask(-1)">
            <div class="remove" :class="{'show': index == calendar_task_list.editIndex}"><span></span></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="add_tasks" :class="{'show': calendar.addTaskPage.isOpen}">
      <div class="container">
        <h2>增加待辦事項</h2>
        <div class="select_date">
          <ol class="week">
            <li v-for="d in ['S', 'M', 'T', 'W', 'T', 'F', 'S']">{{ d }}</li>
          </ol>
          <ol class="month">
            <li v-for="i in firstDayOfTheWeek" class="null"></li>
            <li v-for="(d, index) in NumberOfDays"
                @click="changeDayBeforeAddATask(index)"
                :class="[{'select': d == calendar.selectDay}, {'today': d == today.day}]">{{ d }}</li>
          </ol>
        </div>
        <input type="text" v-model="calendar.addTaskPage.text" placeholder="輸入項目">
      </div>
    </div>
  </main>
  <div class="btns">
    <div class="add" :class="{'reverse_color': calendar.addTaskPage.isOpen}" @click="addTaskPageInCalendar"></div>
    <div class="other" 
         :class="[
            {'reverse_color': calendar.addTaskPage.isOpen}, 
            {'close': speedTaskList.isOpen || calendar.addTaskPage.isOpen || calendar_task_list.isOpen}
          ]"
         @click="togglePage()">
      <!-- <span></span> -->
    </div>
  </div>
</template>
<script src="@/js/index.js"></script>
<style lang="scss" src="@/scss/index.scss"></style>
