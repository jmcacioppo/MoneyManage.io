import { inject } from 'aurelia-framework';
import { User } from '../services/user';
var bootbox = require('bootbox');

@inject(User)
export class calculateExpenses {
    constructor(user) {
        this.user = user;
    }


    getChartResults() {
        this.user.results.simpleChartResults = [];
        this.user.results.simpleChartResults.push(['Home', this.user.expenses.totalHomeExpense]);
        this.user.results.simpleChartResults.push(['Car', this.user.expenses.totalCarExpense]);
        this.user.results.simpleChartResults.push(['Health', this.user.expenses.totalHealthExpense]);
        this.user.results.simpleChartResults.push(['Discretionary', this.user.expenses.totalDiscretionaryExpense]);
        
        this.user.results.recommendedResults = [];
        this.user.results.recommendedResults.push(['Home', this.user.recommend.totalHomeExpense]);
        this.user.results.recommendedResults.push(['Car', this.user.recommend.totalCarExpense]);
        this.user.results.recommendedResults.push(['Health', this.user.recommend.totalHealthExpense]);
        this.user.results.recommendedResults.push(['Discretionary', this.user.recommend.totalDiscretionaryExpense]);
    }

    get5YearExpenses() {
        this.user.results.homeFiveYears = [];
        this.user.results.carFiveYears = [];
        this.user.results.healthFiveYears = [];
        this.user.results.discretionaryFiveYears = [];
        this.user.results.fiveYearExpenses = [];

        for (var i = 0; i < 5; i++) {
            //HOME 5 YEAR ESTIMATES
            var tempHomeTotal =
                (parseInt(this.user.expenses.mortgage) +
                parseFloat(this.user.expenses.propertyTax) / 12 +
                parseInt(this.user.expenses.homeownerInsurance) * Math.pow(1 + .0250, i)  +
                parseInt(this.user.expenses.phone) * Math.pow(1 - .012, i) +
                parseInt(this.user.expenses.internet) * Math.pow(1 - .018, i) +
                parseInt(this.user.expenses.cable) * Math.pow(1 + .029, i) +
                parseInt(this.user.expenses.streaming) +
                parseInt(this.user.expenses.groceries) * Math.pow(1 + 0.01, i) +
                parseInt(this.user.expenses.utilities) * Math.pow(1 + .018, i) +
                parseInt(this.user.expenses.homeMaintenance) +
                parseInt(this.user.expenses.clothes) * Math.pow(1 - 0.001, i)) * 12;
            this.user.results.homeFiveYears.push(tempHomeTotal);

            //CAR 5 YEAR ESTIMATES
            var tempCarTotal =
                (parseInt(this.user.expenses.carPayment) +
                parseInt(this.user.expenses.carInsurance) * Math.pow(1 + .052, i) +
                parseInt(this.user.expenses.publicTransport) * Math.pow(1 - .003, i) + 
                parseInt(this.user.expenses.gas) * Math.pow(1 + 0.026, i) +
                parseInt(this.user.expenses.carMaintenance)) * 12;
            this.user.results.carFiveYears.push(tempCarTotal);

            //HEALTH 5 YEAR ESTIMATES
            var tempHealthTotal =
                (parseInt(this.user.expenses.healthInsurance) * Math.pow(1 + .035, i) + 
                parseInt(this.user.expenses.medication) * Math.pow(1 + .025, i) +
                parseInt(this.user.expenses.unexpectedMedicalProblems) + 
                parseInt(this.user.expenses.visualInsurance) +
                parseInt(this.user.expenses.eyeCare) +
                parseInt(this.user.expenses.dentalInsurance) * Math.pow(1 + .02, i) +
                parseInt(this.user.expenses.cavities) * Math.pow(1 + .027, i) + 
                parseInt(this.user.expenses.braces) * Math.pow(1 + .011, i)) * 12;
            this.user.results.healthFiveYears.push(tempHealthTotal);

            //DISCRETIONARY 5 YEAR ESTIMATES
            var tempDiscretionaryTotal =
                (parseInt(this.user.expenses.eatingOut) * Math.pow(1 + .024, i) + 
                parseInt(this.user.expenses.bars) * Math.pow(1 + .02, i) +
                parseInt(this.user.expenses.funMoney) * Math.pow(1 + .003, i) + 
                parseInt(this.user.expenses.other)) * 12;
            this.user.results.discretionaryFiveYears.push(tempDiscretionaryTotal);

            //TOTAL EXPENSES
            var tempTotalExpense = tempHomeTotal + tempCarTotal + tempHealthTotal + tempDiscretionaryTotal;
            this.user.results.fiveYearExpenses.push(tempTotalExpense);
        }
    }

    get5YearEarnings() {
        this.user.results.fiveYearEarnings = [];
        this.user.results.fiveYearIncome = [];
        this.user.results.fiveYearSavings = [];

        for (var i = 0; i < 5; i++) {    
            //EXPENSES
            var tempTotalExpense = this.user.results.fiveYearExpenses[i];
            
            //INCOME
            var tempIncome = parseInt(this.user.personalInfo.income) * Math.pow(1.025, i);
            tempIncome -= parseInt(this.user.personalInfo.savingsPerMonth) * 12 * Math.pow(1.0199, i);
            this.user.results.fiveYearIncome.push(tempIncome);
            var tempDifferenceIncomeExpense = tempIncome - tempTotalExpense; 

            //SAVINGS
            var tempSavings = 0;
            if(i > 0) tempSavings = parseFloat(this.user.results.fiveYearSavings[i-1]);
            tempSavings += parseInt(this.user.personalInfo.savingsPerMonth) * 12;
            tempSavings *= 1.0199;
            tempSavings += tempDifferenceIncomeExpense;
            this.user.results.fiveYearSavings.push(tempSavings);

            //EARNINGS
            var tempEarnings = 0;
            if(i > 0) tempEarnings = parseFloat(this.user.results.fiveYearEarnings[i-1]);
            tempEarnings += tempIncome;
            tempEarnings += tempSavings;
            tempEarnings -= tempTotalExpense;

            this.user.results.fiveYearEarnings.push(tempEarnings);
        }
    }

    get5YearGoals() {
        this.user.results.fiveYearPrivateSchoolGoal = [];
        this.user.results.fiveYearCollegeGoal = [];
        this.user.results.fiveYearWeddingGoal = [];
        this.user.results.fiveYearVacationGoal = [];
        this.user.results.fiveYearBoatGoal = [];
        this.user.results.fiveYearNewCarGoal = [];
        this.user.results.fiveYearOtherGoal = [];

        this.user.results.chartGoals = [];

        for (var i = 0; i < 5; i++) {    
            var tempGoal = 0;
            var temp = [];
            
            for(var j = 0; j < this.user.personalInfo.currentGoalsRanks.length; j++) {
                var color;
                tempGoal += parseInt(this.user.personalInfo[this.user.personalInfo.currentGoalsRanks[j][1]]);

                //CHECK IF GOAL IS MET
                if(tempGoal > this.user.results.fiveYearSavings[i]) {
                    this.user.results[this.user.personalInfo.currentGoalsRanks[j][1] + 'MetGoal'] = false;
                    color = '#dff0d8';
                }
                else {
                    this.user.results[this.user.personalInfo.currentGoalsRanks[j][1] + 'MetGoal'] = true;
                    color = '#f2dede';
                }

                this.user.results['fiveYear' + this.user.personalInfo.currentGoalsRanks[j][1] + 'Goal'] = tempGoal;
                temp.push({
                    name: this.user.personalInfo.currentGoalsRanks[j][1],
                    data: tempGoal,
                    color: color
                });
            }
            this.user.results.chartGoals.push(temp);
        }
    }

    //Gets 5 year estimates
    get5YearEstimates() {
        this.get5YearExpenses();
        this.get5YearEarnings();
        this.get5YearGoals();
    }


    homeExpenses() {
        var tempHomeTotal =
            (parseInt(this.user.expenses.mortgage) + 
            parseFloat(this.user.expenses.propertyTax / 12) +
            parseInt(this.user.expenses.homeownerInsurance) +
            parseInt(this.user.expenses.phone) + 
            parseInt(this.user.expenses.internet) +
            parseInt(this.user.expenses.cable) + 
            parseInt(this.user.expenses.streaming) +
            parseInt(this.user.expenses.groceries) + 
            parseInt(this.user.expenses.utilities) +
            parseInt(this.user.expenses.homeMaintenance) + 
            parseInt(this.user.expenses.clothes)) * 12;

        if(isNaN(tempHomeTotal)) {
            bootbox.alert({
                title: "MoneyManage",
                message: "Please enter valid inputs.",
                backdrop: true
            });            
            this.user.expenses.homeCanGoToNext = false;
        }
        else {
            //Check if expenses are more than average spending
            //MORTGAGE
            if (this.user.expenses.mortgage > this.user.expenses.homeExpenseConstants["Mortgage"]) this.user.expenses.mortgagecheck = false;
            else this.user.expenses.mortgagecheck = true;

            //CABLE
            if(this.user.expenses.cable > this.user.expenses.homeExpenseConstants["CableMax"]) this.user.expenses.cablecheck = false;
            else this.user.expenses.cablecheck = true;

            //STREAMING
            if(this.user.expenses.streaming > this.user.expenses.homeExpenseConstants["Streaming"]) this.user.expenses.streamingcheck = false;
            else this.user.expenses.streamingcheck = true;
            
            //GROCERIES
            if(this.user.expenses.groceries > this.user.expenses.homeExpenseConstants["GroceryLiberal"]) this.user.expenses.groceriescheck = false;
            else this.user.expenses.groceriescheck = true;

            //UTILITIES
            if(this.user.expenses.utilities > this.user.expenses.homeExpenseConstants["Utilities"]) this.user.expenses.utilitiescheck = false;
            else this.user.expenses.utilitiescheck = true;

            //HOME MAINTENANCE
            if(this.user.expenses.homeMaintenance > this.user.expenses.homeExpenseConstants["Maintenance"]) this.user.expenses.homeMaintenancecheck = false;
            else this.user.expenses.homeMaintenancecheck = true;

            //CLOTHES
            if (this.user.expenses.clothes > this.user.expenses.homeExpenseConstants["Clothes"]) this.user.expenses.clothescheck = false;
            else this.user.expenses.clothescheck = true;

            this.user.expenses.homeCanGoToNext = true;
            this.user.expenses.totalHomeExpense = tempHomeTotal;

            return tempHomeTotal;
        }
    }

    carExpenses() {
        var tempCarTotal =
            (parseInt(this.user.expenses.carPayment) + 
            parseInt(this.user.expenses.carInsurance) +
            parseInt(this.user.expenses.publicTransport) + 
            parseInt(this.user.expenses.gas) +
            parseInt(this.user.expenses.carMaintenance)) * 12;

        if(isNaN(tempCarTotal)) {
            bootbox.alert({
                title: "MoneyManage",
                message: "Please enter valid inputs.",
                backdrop: true
            });
            this.user.expenses.carCanGoToNext = false;
        }
        else {
            //Check if expenses are more than average spending
            //CAR PAYMENT
            if(this.user.expenses.carPayment > this.user.expenses.carExpenseConstants["Payment"]) this.user.expenses.carPaymentcheck = false;
            else this.user.expenses.carPaymentcheck = true;

            //GAS
            if(this.user.expenses.gas > this.user.expenses.carExpenseConstants["GasMax"]) this.user.expenses.gascheck = false;
            else this.user.expenses.gascheck = true;

            //GAS
            if(this.user.expenses.publicTransport > this.user.expenses.carExpenseConstants["PublicTransport"]) this.user.expenses.publicTransportcheck = false;
            else this.user.expenses.publicTransportcheck = true;

            //CAR MAINTENANCE
            if(this.user.expenses.carMaintenance > this.user.expenses.carExpenseConstants["Maintenance"]) this.user.expenses.carMaintenancecheck = false;
            else this.user.expenses.carMaintenancecheck = true;

            this.user.expenses.carCanGoToNext = true;
            this.user.expenses.totalCarExpense = tempCarTotal;
        }

    }
    
    healthExpenses() {
        var tempHealthTotal =
            (parseInt(this.user.expenses.healthInsurance) + 
            parseInt(this.user.expenses.medication) +
            parseInt(this.user.expenses.unexpectedMedicalProblems) + 
            parseInt(this.user.expenses.visualInsurance) +
            parseInt(this.user.expenses.eyeCare) +
            parseInt(this.user.expenses.dentalInsurance) +
            parseInt(this.user.expenses.cavities) + 
            parseInt(this.user.expenses.braces)) * 12;

        if(isNaN(tempHealthTotal)) {
            bootbox.alert({
                title: "MoneyManage",
                message: "Please enter valid inputs.",
                backdrop: true
            });
            this.user.expenses.healthCanGoToNext = false;
        }
        else {
            //Check if expenses are more than average spending
            //UNEXPECTED MEDICAL PROBLEMS
            if(this.user.expenses.unexpectedMedicalProblems > this.user.expenses.healthExpenseConstants["Emergency"]) this.user.expenses.unexpectedMedicalProblemscheck = false;
            else this.user.expenses.unexpectedMedicalProblemscheck = true;

            //BRACES
            if(this.user.expenses.braces > this.user.expenses.healthExpenseConstants["Braces"]) this.user.expenses.bracescheck = false;
            else this.user.expenses.bracescheck = true;

            this.user.expenses.healthCanGoToNext = true;
            this.user.expenses.totalHealthExpense = tempHealthTotal;
        }
    }

    discretionaryExpenses() {
        var tempDiscretionaryTotal =
            (parseInt(this.user.expenses.eatingOut) + 
            parseInt(this.user.expenses.bars) +
            parseInt(this.user.expenses.funMoney) + 
            parseInt(this.user.expenses.other)) * 12;

        if(isNaN(tempDiscretionaryTotal)) {
            bootbox.alert({
                title: "MoneyManage",
                message: "Please enter valid inputs.",
                backdrop: true
            });
            this.user.expenses.discretionaryCanGoToNext = false;
        }
        else {
            //Check if expenses are more than average spending
            //EATING OUT
            if(this.user.expenses.eatingOut > this.user.expenses.discretionaryExpenseConstants["Eating"]) this.user.expenses.eatingOutcheck = false;
            else this.user.expenses.eatingOutcheck = true;

            //BARS
            if(this.user.expenses.bars > this.user.expenses.discretionaryExpenseConstants["Club"]) this.user.expenses.barscheck = false;
            else this.user.expenses.barscheck = true;

            this.user.expenses.discretionaryCanGoToNext = true;
            this.user.expenses.totalDiscretionaryExpense = tempDiscretionaryTotal;
        }
    }
}