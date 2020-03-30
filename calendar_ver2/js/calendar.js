(function (list) {
    var calendarApp = function () {
        return new Vue({
            data: {
                days: [],
                year: '',
                month: '',
                weekday: [],
                m: moment(),
                chkday: 1,
                prevday: [],
                nextday: [],
                sels: [],
                selected: moment().format('YYYY'),
                dayselected: moment().format('M'),
                isHidden: false,
                dateArr: [],
                chkClick: 0
            },
            methods: {
                setLang: function () {
                    moment.lang('ko', {
                        weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
                        weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
                    });
                    for (var i = 0; i <= moment()._locale._config.week.doy; i++) {
                        this.weekday[i] = moment()._locale._config.weekdaysShort[i];
                    }
                },
                setdate: function (name) {
                    var daylen = moment(name).daysInMonth();
                    this.days.length = 0;
                    for (var i = 0; i < daylen; i++) {
                        this.days[i] = { result: i + 1, class: '', style: {} };
                    }
                    this.setday(name);

                    var year = moment().format('YYYY');
                    var month = moment().format('M') + '월';
                    if (this.year == year && this.month == month) {
                        this.chkday = 1;
                    }
                    for (var i = 0; i < daylen; i++) {
                        if (this.days[i].result == moment().format('DD') && this.chkday == 1 && this.year == year && this.month == month) {
                            this.days[i].class = 'today';
                        }
                    }
                    this.selected = moment(name).format('YYYY');
                    this.dayselected = moment(name).format('M');
                },
                prevdate: function () {
                    var prev = this.m.subtract(1, 'months').calendar('ddd/MM/YYYY');
                    this.chkday--;
                    this.setdate(prev);
                    this.pushdate(prev);
                },
                nextdate: function () {
                    var next = this.m.add(1, 'months').calendar('ddd/MM/YYYY');
                    this.chkday++;
                    this.setdate(next);
                    this.pushdate(next);
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
                },
                daySelect: function () {
                    var setSelect = moment(this.selected);
                    this.m = moment(this.selected + this.dayselected, 'YYYY/MM');
                    var daynum = this.dayselected + '/' + setSelect.format('DD') + '/' + setSelect.format('YYYY');
                    if (this.dayselected.length == 1) {
                        daynum = this.dayselected + '/' + setSelect.format('DD') + '/' + setSelect.format('YYYY');
                    } else {
                        daynum = '0' + this.dayselected + '/' + setSelect.format('DD') + '/' + setSelect.format('YYYY');
                    }
                    this.setdate(daynum);
                    this.pushdate(daynum);
                },
                reset: function () {
                    var reset = moment().calendar('ddd/MM/YYYY');
                    this.m = moment(reset, 'YYYY/MM');
                    this.setdate(reset);
                    this.pushdate(reset);
                    this.selected = moment().format('YYYY');
                    this.dayselected = moment().format('M');
                    this.dateArr.length = 0;
                    $('.cont>li').css({
                        'background-color': '#eee'
                    });
                    this.chkClick = 0;
                },
                wheel: function () {
                    var self = this;
                    $('.contents').on("mousewheel DOMMouseScroll", function (evt) {
                        evt.originalEvent.wheelDelta;
                        evt.originalEvent.detail;
                        if (evt.originalEvent.wheelDelta > 0 || evt.originalEvent.detail < 0) {
                            self.prevdate();
                        } else {
                            self.nextdate();
                        }
                    });
                },
                showDiv: function () {
                    this.isHidden = !this.isHidden;
                },
                dateSelect: function (e) {
                    this.chkClick++;
                    var date, len1 = this.dayselected.length, len2 = e.target.innerText.length;

                    if (len1 == 1 && len2 == 1) {
                        date = this.year + '-' + '0' + this.dayselected + '-' + '0' + e.target.innerText;
                    } else if (len1 == 1 && len2 == 2) {
                        date = this.year + '-' + '0' + this.dayselected + '-' + e.target.innerText;
                    } else if (len1 == 2 && len2 == 1) {
                        date = this.year + '-' + this.dayselected + '-' + '0' + e.target.innerText;
                    } else {
                        date = this.year + '-' + this.dayselected + '-' + e.target.innerText;
                    }
                    if (this.chkClick > 2) {
                        return false;
                    } else {
                        this.dateArr.push(date);
                    }
                    // e.target.style.backgroundColor = '#cd3f3e';
                    // e.target.style.color = '#fff';
                    for (var i = 0; i < this.days.length; i++) {
                        if (this.days[i].class != 'nextday' && this.days[i].class != 'prevday' && this.days[i].result == e.target.innerText) {
                            this.days[i].style = {
                                color: '#fff',
                                backgroundColor: '#cd3f3e',
                                fontWeight: '800'
                            }
                        }
                    }
                    var year = [], month = [];

                    for (var i = 0; i < this.dateArr.length; i++) {
                        year[i] = this.dateArr[i].slice(0, 4);
                        month[i] = this.dateArr[i].slice(5, 7);
                    }
                    console.log(year, month)
                }
            },
            mounted: function () {
                this.setLang();
                this.setdate();
                this.pushdate();
                this.setSelect();
                this.wheel();
            }
        });
    };

    for (var i = 0; i < list.length; ++i) {
        calendarApp().$mount(list[i]);
    };

    window.onload = function () {
        $('.cont>li.sun').prev().css('color', 'royalblue');
    };
    // })(['#app1', '#app2'])
})(['#app1'])
