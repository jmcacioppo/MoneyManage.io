define('app',['exports', 'jquery', 'bootstrap'], function (exports, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Hello World!';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = "Budget Calculator";
      config.map([{
        route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true
      }, {
        route: 'expenses', moduleId: 'expenses/expenses',
        name: 'expenses', title: 'Expenses', nav: true
      }, {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true
      }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/slider'], function (exports, _aureliaFramework, _aureliaRouter, _user, _slider) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.personalinfo = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _slider.Slider), _dec(_class = function () {
        function personalinfo(router, user, slider) {
            _classCallCheck(this, personalinfo);

            this.router = router;
            this.user = user;
            this.slider = slider;
        }

        personalinfo.prototype.allowDrop = function allowDrop(ev) {
            ev.preventDefault();
        };

        personalinfo.prototype.drag = function drag(ev) {
            ev.dataTransfer.setData("goal-name", ev.target.innerText);
            return true;
        };

        personalinfo.prototype.drop = function drop(ev) {
            if (ev.target.id == "myGoals") {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("goal-name");
                var elements = document.getElementsByClassName("current-buttons");
                this.user.personalInfo.currentGoals.push(data);

                var arr = this.user.personalInfo.goalsList;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === data) {
                        this.user.personalInfo.goalsList.splice(i, 1);
                    }
                }

                data = data.split(" ");
                var check = "check" + data[data.length - 1];
                this.user.personalInfo[check] = !this.user.personalInfo[check];
            }
        };

        personalinfo.prototype.remove = function remove(title) {
            this.user.personalInfo.goalsList.push(title);
            title = title.split(" ");
            var check = "check" + title[title.length - 1];
            this.user.personalInfo[check] = !this.user.personalInfo[check];
        };

        personalinfo.prototype.attached = function attached() {
            this.slider.createAgeSlider();
        };

        return personalinfo;
    }()) || _class);
});
define('expenses/expenses',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculateExpenses'], function (exports, _aureliaFramework, _aureliaRouter, _user, _calculateExpenses) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.expenses = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var expenses = exports.expenses = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _calculateExpenses.calculateExpenses), _dec(_class = function expenses(router, user, calculateExpenses) {
        _classCallCheck(this, expenses);

        this.router = router;
        this.user = user;
        this.calculateExpenses = calculateExpenses;
    }) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('results/results',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', 'highcharts'], function (exports, _aureliaFramework, _aureliaRouter, _user, _highcharts) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.results = undefined;

    var HighCharts = _interopRequireWildcard(_highcharts);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User), _dec(_class = function () {
        function results(router, user) {
            _classCallCheck(this, results);

            this.router = router;
            this.user = user;
        }

        results.prototype.attached = function attached() {
            this.createChart('resultsContainer');
        };

        results.prototype.createChart = function createChart(containerID) {
            Highcharts.chart(containerID, {

                title: {
                    text: 'Solar Employment Growth by Sector, 2010-2016'
                },

                subtitle: {
                    text: 'Source: thesolarfoundation.com'
                },

                yAxis: {
                    title: {
                        text: 'Number of Employees'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        pointStart: 2010
                    }
                },

                series: [{
                    name: 'Installation',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: 'Manufacturing',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: 'Sales & Distribution',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: 'Project Development',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: 'Other',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }]
            });
        };

        return results;
    }()) || _class);
});
define('utilities/calculateExpenses',['exports', 'aurelia-framework', '../services/user'], function (exports, _aureliaFramework, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.calculateExpenses = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var calculateExpenses = exports.calculateExpenses = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function calculateExpenses(user) {
            _classCallCheck(this, calculateExpenses);

            this.user = user;
        }

        calculateExpenses.prototype.homeExpenses = function homeExpenses() {
            var tempHomeTotal = parseInt(this.user.expenses.mortgage) + parseInt(this.user.expenses.propertTax) + parseInt(this.user.expenses.phone) + parseInt(this.user.expenses.internet) + parseInt(this.user.expenses.cable) + parseInt(this.user.expenses.netfix) + parseInt(this.user.expenses.groceries) + parseInt(this.user.expenses.utilities) + parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes);
            console.log(tempHomeTotal);
            if (isNaN(tempHomeTotal)) {
                alert("Please input a number");
            } else {
                this.user.expenses.totalHomeExpense = tempHomeTotal;
            }
        };

        calculateExpenses.prototype.carExpenses = function carExpenses(val) {
            this.user.expenses.totalCarExpense += parseInt(val);
        };

        calculateExpenses.prototype.healthExpenses = function healthExpenses(val) {
            this.user.expenses.totalHealthExpense += parseInt(val);
        };

        calculateExpenses.prototype.discretionaryExpenses = function discretionaryExpenses(val) {
            this.user.expenses.totalDiscretionaryExpense += parseInt(val);
        };

        return calculateExpenses;
    }()) || _class);
});
define('utilities/slider',['exports', 'aurelia-framework', '../services/user', 'ion-rangeslider'], function (exports, _aureliaFramework, _user, _ionRangeslider) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Slider = undefined;

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Slider = exports.Slider = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function Slider(user) {
            _classCallCheck(this, Slider);

            this.user = user;
        }

        Slider.prototype.createAgeSlider = function createAgeSlider() {
            var _this = this;

            $("#age").ionRangeSlider({
                grid: true,
                min: 0,
                max: 100,
                from: this.user.personalInfo.age,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.user.personalInfo.age = data.from;
                }
            });
        };

        return Slider;
    }()) || _class);
});
define('services/constants',[], function () {
  "use strict";

  var goalzzz = ["Celebration", "Saving for College", "Buy a boat"];
});
define('services/user',['exports', '../services/data/personalInfoData', '../services/data/goalsData', '../services/data/expensesData', '../services/data/resultsData'], function (exports, _personalInfoData, _goalsData, _expensesData, _resultsData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.User = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var User = exports.User = function User() {
        _classCallCheck(this, User);

        this.personalInfo = new _personalInfoData.PersonalInfoData();
        this.goals = new _goalsData.GoalsData();
        this.expenses = new _expensesData.ExpensesData();
        this.results = new _resultsData.ResultsData();
    };
});
define('services/data/expensesData',["exports"], function (exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var ExpensesData = exports.ExpensesData = function ExpensesData() {
                _classCallCheck(this, ExpensesData);

                this.totalExpense = 0;
                this.totalHomeExpense = 0;
                this.totalCarExpense = 0;
                this.totalHealthExpense = 0;
                this.totalDiscretionaryExpense = 0;

                this.mortgage = 0;
                this.propertTax = 0;
                this.phone = 0;
                this.internet = 0;
                this.cable = 0;
                this.netfix = 0;
                this.groceries = 0;
                this.utilities = 0;
                this.homeMaintenance = 0;
                this.clothes = 0;

                this.carPayment = 0;
                this.carInsurance = 0;
                this.publicTransport = 0;
                this.gas = 0;
                this.carMaintenance = 0;
                this.utilities = 0;

                this.healthInsurance = 0;
                this.medication = 0;
                this.unexpectedMedicalProblems = 0;
                this.dentalInsurance = 0;
                this.cavities = 0;
                this.eveCare = 0;
                this.braces = 0;

                this.eatingOut = 0;
                this.bars = 0;
                this.funMoney = 0;
                this.other = 0;
        };
});
define('services/data/goalsData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var GoalsData = exports.GoalsData = function GoalsData() {
        _classCallCheck(this, GoalsData);

        this.goal = 10;
    };
});
define('services/data/personalInfoData',["exports"], function (exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var PersonalInfoData = exports.PersonalInfoData = function PersonalInfoData() {
                _classCallCheck(this, PersonalInfoData);

                this.age = 30;
                this.income = 0;

                this.goalsList = ["Private School", "College", "Wedding", "Vacation", "Boat", "New Car", "Other"];
                this.checkSchool = false;
                this.privateSchool = 0;

                this.checkCollege = false;
                this.college = 0;

                this.checkWedding = false;
                this.wedding = 0;

                this.checkVacation = false;
                this.vacation = 0;

                this.checkBoat = false;
                this.boat = 0;

                this.checkCar = false;
                this.newCar = 0;

                this.checkOther = false;
                this.other = 0;

                this.currentGoals = [];
        };
});
define('services/data/resultsData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ResultsData = exports.ResultsData = function ResultsData() {
        _classCallCheck(this, ResultsData);

        this.result = 10;
    };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"highcharts/css/highcharts.css\"></require><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/style.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><h4 style=\"padding-right:15px\">MyBudget</h4></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></div></div></nav><router-view></router-view></template>"; });
define('text!css/style.css', ['module'], function(module) { module.exports = "#personalinfo, #expenses, #results {\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    width: 60%;\r\n}\r\n"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><div id=\"personalinfo\"><h2>Personal Info</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"age\"></div><div class=\"form-group\"><label for=\"salary\">Income</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.income\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div><hr><h2>Goals</h2><div id=\"drag-and-drop-container\" style=\"clear:both\"><div id=\"availableGoals\" style=\"height:500px;background-color:orange;border:solid 1px\" class=\"col-md-6\"><h1>Wishes</h1><hr><div class=\"row col-md-4 col-md-push-4\" dragstart.trigger=\"drag($event)\"><div repeat.for=\"goal of user.personalInfo.goalsList\" class=\"row\"><div class=\"current-buttons btn btn-primary\" draggable=\"true\">${goal}</div><br><br></div></div></div><div id=\"myGoals\" style=\"height:500px;background-color:orange;border:solid 1px;overflow-y:scroll\" class=\"col-md-6\" drop.trigger=\"drop($event)\" dragstart.trigger=\"drag($event)\" dragover.trigger=\"allowDrop($event)\"><h1>My Wishes</h1><hr><div show.bind=\"user.personalInfo.checkSchool\"><h3>Private School</h3><button click.delegate=\"remove('Private School')\" class=\"btn btn-danger\">X</button><div class=\"form-group\"><label for=\"privateSchool\">Amount for Private School</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.privateSchool\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></div><div show.bind=\"user.personalInfo.checkCollege\"><h3>College</h3><button click.delegate=\"remove('College')\" class=\"btn btn-danger\">X</button><div class=\"form-group\"><label for=\"college\">Amount for College</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.college\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></div><div show.bind=\"user.personalInfo.checkWedding\"><h3>Wedding</h3><button click.delegate=\"remove('Wedding')\" class=\"btn btn-danger\">X</button><div class=\"form-group\"><label for=\"college\">Amount for Wedding</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.wedding\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></div><div show.bind=\"user.personalInfo.checkVacation\"><h3>Vacation</h3><button click.delegate=\"remove('Vacation')\" class=\"btn btn-danger\">X</button><div class=\"form-group\"><label for=\"college\">Amount for Vacation</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.vacation\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></div><div show.bind=\"user.personalInfo.checkBoat\"><h3>Boat</h3><button click.delegate=\"remove('Boat')\" class=\"btn btn-danger\">X</button><div class=\"form-group\"><label for=\"college\">Amount for Boat</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.boat\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></div><div show.bind=\"user.personalInfo.checkCar\"><div style=\"background-color:#d4d4d4;padding:4px\"><h3>New Car</h3><button click.delegate=\"remove('New Car')\" class=\"btn btn-danger\">X</button><div class=\"form-group\"><label for=\"college\">Amount for New Car</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.newCar\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></div><br><br></div><div show.bind=\"user.personalInfo.checkOther\"><div style=\"background-color:#d4d4d4;padding:4px\"><h3>Other</h3><button click.delegate=\"remove('Other')\" class=\"btn btn-danger\">X</button><div class=\"form-group\"><label for=\"college\">Amount for Other</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.personalInfo.other\" class=\"form-control\" id=\"inlineFormInputGroup\"></div></div></div><br><br></div><div id=\"myGoals\" style=\"width:100%;height:30%;background-color:gray\"><div style=\"text-align:center;vertical-align:middle;line-height:150px\">Add Wish Here</div></div></div></div></div></template>"; });
define('text!expenses/expenses.html', ['module'], function(module) { module.exports = "<template><div id=\"expenses\"><h1>Expenses</h1></div><head><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script><script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script></head><body><div class=\"container\"><p><strong>Note:</strong> Get <strong>CA$H</strong> money evverydayy</p><div class=\"panel-group\" id=\"accordion\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\">Home<div style=\"float:right\">Total: $${user.expenses.totalHomeExpense}</div></a></h4></div><div id=\"collapse1\" class=\"panel-collapse collapse in\"><div class=\"panel-body\"><div class=\"form-group\"><label for=\"income\">Mortgage/Rent monthly payment:</label><input type=\"text\" value.bind=\"user.expenses.mortgage\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Property tax (per year):</label><input type=\"text\" value.bind=\"user.expenses.propertTax\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Phone payment:</label><input type=\"text\" value.bind=\"user.expenses.phone\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Internet:</label><input type=\"text\" value.bind=\"user.expenses.internet\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Cable:</label><input type=\"text\" value.bind=\"user.expenses.cable\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Netflix:</label><input type=\"text\" value.bind=\"user.expenses.netfix\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Groceries:</label><input type=\"text\" value.bind=\"user.expenses.groceries\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Utilities:</label><input type=\"text\" value.bind=\"user.expenses.utilities\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Maintenance:</label><input type=\"text\" value.bind=\"user.expenses.homeMaintenance\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Clothes (per year):</label><input type=\"text\" value.bind=\"user.expenses.clothes\" change.delegate=\"calculateExpenses.homeExpenses()\" class=\"form-control\" placeholder=\"10\"></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\">Car/Transportation<div style=\"float:right\">Total: $0</div></a></h4></div><div id=\"collapse2\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><label for=\"income\">Car payment:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Car insurance:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Public transport:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Gas:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Maintenance:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse3\">Health<div style=\"float:right\">Total: $0</div></a></h4></div><div id=\"collapse3\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><label for=\"income\">Health Insurance:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Medication:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Unexpected medical problems:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Eye Care:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Dental Insurance:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Cavities/dental work:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Braces:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse4\">Discretionary Expenses<div style=\"float:right\">Total: $0</div></a></h4></div><div id=\"collapse4\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><label for=\"income\">Eating out:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Bars/drinks:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Fun money (golf, movies, etc.):</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"><br><label for=\"income\">Other:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div></div></div></div></div></div></body></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><div id=\"resultsContainer\"></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map