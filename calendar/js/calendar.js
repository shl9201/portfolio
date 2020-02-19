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
            msg: ''
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
                this.month = moment(name).format('MMMM');
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
            serch: function () {
                var re = /[~!@\#$%^&*\()\-=+_']/gi;
                var eng = /[a-zA-Z]/;
                var kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

                if (this.msg.length > 4 || this.msg.length < 4 || re.test(this.msg) || eng.test(this.msg) || kor.test(this.msg)) {
                    alert('숫자 4자리로 입력해주세요.');
                    this.msg = '';
                    this.$refs.search.focus();
                } else {
                    this.m = moment(this.msg);
                    this.setdate(this.msg);
                    this.pushdate(this.msg);
                    this.today();
                }
                this.msg = '';
            }
        },
        mounted: function () {
            this.setLang();
            this.setdate();
            this.pushdate();
            this.today();
        }
    }).$mount('#app');

    window.onload = function () {
        $('.cont>li.sun').prev().css('color', 'royalblue');
    }
});
