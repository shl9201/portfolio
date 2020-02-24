$(function () {
    new Vue({
        data: {
            days: [],
            year: '',
            month: '',
            weekday: ["일", "월", "화", "수", "목", "금", "토"],
            m: moment(),
            chkday: 1,
            prevday: [],
            nextday: [],
            msg: '',
            daymsg: '',
            sels: [],
            selected: moment().format('YYYY'),
            dayselected: moment().format('M')
        },
        methods: {
            setLang: function () {
                moment.lang('ko', {
                    weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
                    weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
                });
            },
            setdate: function (name) {
                var daylen = moment(name).daysInMonth();
                this.days.length = 0;
                for (var i = 0; i < daylen; i++) {
                    this.days[i] = { result: i + 1, class: '' };
                }
                this.setday(name);
            },
            prevdate: function () {
                var prev = this.m.subtract(1, 'months').calendar('ddd/MM/YYYY');
                this.setdate(prev);
                this.pushdate(prev);
                this.chkday--;
                this.today();
            },
            nextdate: function () {
                var next = this.m.add(1, 'months').calendar('ddd/MM/YYYY');
                this.setdate(next);
                this.pushdate(next);
                this.chkday++;
                this.today();
            },
            setday: function (name) {
                this.year = moment(name).format('YYYY');
                this.month = moment(name).format('MMM');
            },
            pushdate: function (name) {
                var prevMonth = moment(name).subtract(1, 'months').calendar('ddd/MM/YYYY');
                var lastlen = moment(prevMonth).endOf('months').day();
                var num = moment(prevMonth).daysInMonth();
                var key = 42;
                this.nextday.length = 0;
                this.prevday.length = 0;
                for (var i = 0; i <= lastlen; i++) {
                    if (lastlen == 6) {

                    } else {
                        this.prevday[i] = { result: num, class: 'prevday' };
                        num--;
                        this.days.unshift(this.prevday[i]);
                    }
                }
                var next = key - moment(name).daysInMonth() - this.prevday.length;
                for (var i = 1; i <= next; i++) {
                    this.nextday[i] = { result: i, class: 'nextday' };
                    this.days.push(this.nextday[i])
                }
                for (var i = 0; i < this.days.length; i++) {
                    if (i % 7 == 0) {
                        if (this.days[i].class == 'prevday' || this.days[i].class == 'nextday' || this.days[i].class == 'today') {
                            this.days[i].class += ' sun';
                        } else {
                            this.days[i].class = 'sun';
                        }
                    }
                }
                $('.cont>li.sun').prev().css('color', 'royalblue');
            },
            today: function () {
                var daylen = moment().daysInMonth();
                var year = moment().format('YYYY');
                var month = moment().format('M');
                if (this.year == year && this.month == month + '월') {
                    this.chkday = 1;
                }
                for (var i = 0; i < daylen; i++) {
                    if (this.days[i].result == moment().format('DD') && this.chkday == 1 && this.year == year && this.month == month + '월') {
                        this.days[i].class = 'today';
                    }
                }
            },
            setSelect: function () {
                var m = moment();
                var date1 = moment().format('YYYY');
                var date2 = Number(date1) - 100;
                var diffmiuns = Number(date1) - Number(date2);
                for (var i = 0; i <= diffmiuns; i++) {
                    this.sels.unshift(date1 + '')
                    date1--;
                }

                date1 = Number(moment().format('YYYY'));
                var date3 = Number(date1) + 100;
                var diffplus = Number(date3) - Number(date1);
                for (var i = 0; i < diffplus; i++) {
                    this.sels.push(date1 + 1 + '')
                    date1++;
                }
            },
            yearSelect: function () {
                this.m = moment(this.selected);
                this.setdate(this.selected);
                this.pushdate(this.selected);
                this.today();
            },
            daySelect: function () {
                this.m = moment(this.selected + this.dayselected, 'YYYYMM');
                var daynum = this.dayselected + '/' + moment(this.selected).format('DD') + '/' + moment(this.selected).format('YYYY');
                if (this.dayselected.length == 1) {
                    daynum = this.dayselected + '/' + moment(this.selected).format('DD') + '/' + moment(this.selected).format('YYYY');
                } else {
                    daynum = this.dayselected + '/' + moment(this.selected).format('DD') + '/' + moment(this.selected).format('YYYY');
                }
                this.setdate(daynum);
                this.pushdate(daynum);
                this.today();
            }
        },
        mounted: function () {
            this.setLang();
            this.setdate();
            this.today();
            this.pushdate();
            this.setSelect();
        }
    }).$mount('#app');

    window.onload = function () {
        $('.cont>li.sun').prev().css('color', 'royalblue');
    }
});
