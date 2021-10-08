
// import monthlyCalendar from '@/components/find/monthlyCalendar.vue'
// import cssIcon_hamburger from '@/components/public/cssIcon_hamburger.vue'
// import cssIcon_add from '@/components/public/cssIcon_add.vue'
// import moment from 'moment'
// import router from '@/router'
export default {
  name: 'index',
  data() {
    return {
        calendar: {
            selectDay: 3,
            allDays: [
                // {done: false, text: 'AAAAAA'}
            ],
            addTaskPage: {
                isOpen: false,
                text: '',
            },
        },
        speedTaskList: {
            list: [
                {done: false, text: 'AAAAAA'},
                {done: true, text: 'BBBBBB'},
                {done: false, text: 'CCCCCC'},
            ],
            isOpen: false,
            editIndex: -1,
        },
        calendar_task_list: {
            isOpen: false,
            editIndex: -1,
        },
        speedTaskInput: '',
        addTaskPage: {
            text: '',
            isOpen: false,
        },
        btns: {
            add: {
                reverse_color: false,
            },
            other: {
                reverse_color: false,
                close: false,
            }
        }
    }
  },
  created(){
      this.init();
  },
  computed: {
    today(){
        let date = new Date();
        let year = date.getFullYear();
        return {
            year: [year.toString().slice(0, 2), year.toString().slice(2, 4)],
            month: date.getMonth(),
            day: date.getDate()
        }
    },
    NumberOfDays(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    },
    firstDayOfTheWeek(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        return new Date(year +'/'+ (month + 1) +'/1').getDay();
    },
    selectMonth(){
    //   return this.$store.state.selectMonth;
    },
  },
  methods: {
    init(){
        for(let d = 0; d < this.NumberOfDays; d++){
            this.calendar.allDays.push([]);
        }
        this.calendar.selectDay = this.today.day;
    },
    editSpeedTask(itemIndex){
        this.speedTaskList.editIndex = itemIndex;
    },
    speedTaskIsDone(itemIndex){
        this.speedTaskList.list[itemIndex].done = !this.speedTaskList.list[itemIndex].done;
    },
    selectDayInCalendar(dayIndex){
        this.calendar.selectDay = dayIndex + 1;
    },
    addNewSpeedTask(){
        this.speedTaskList.list.push({done: false, text: ''});
    },
    addTaskPageInCalendar(){
        if(this.calendar.addTaskPage.isOpen){
            this.calendar.addTaskPage.isOpen = false;
            this.calendar.allDays[this.calendar.selectDay - 1].push({
                done: false, 
                text: this.calendar.addTaskPage.text
            })
        } else {
            this.calendar.addTaskPage.isOpen = true;
        }
    },
    changeDayBeforeAddATask(dayIndex){
        this.calendar.selectDay = dayIndex + 1;
    },
    togglePage(){
        if(this.calendar.addTaskPage.isOpen){
            this.calendar.addTaskPage.isOpen = false;
        } else if(this.calendar_task_list.isOpen){
            this.calendar_task_list.isOpen = false;
        } else {
            if(this.addTaskPage.isOpen){
                this.speedTaskList.isOpen = !this.speedTaskList.isOpen;
            } else {
                this.speedTaskList.isOpen = !this.speedTaskList.isOpen;
            }
        }
    },
    openTaskList(){
        this.calendar_task_list.isOpen = true;
    },
    taskIsDoneInCalendar(itemIndex){
        // console.log(this.calendar.allDays[this.calendar.selectDay - 1][itemIndex]);
        let task = this.calendar.allDays[this.calendar.selectDay - 1][itemIndex];
        task.done = !task.done;
    },
    editCalendarTask(itemIndex){
        this.calendar_task_list.editIndex = itemIndex;
    },
  },
}