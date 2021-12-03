//Delgetstei ajillah controller
var uiController = (function () {
  //html-es avch bgaa utguudiig ingej hiij ugvul daraa zasvar hiihed amar ner ntr uurchlugdsun uyed. private data
  var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tosovLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
  };

  // public -return hiigdej bgaa uchir
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        desc: document.querySelector(DOMstrings.inputDesc).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDesc + "," + DOMstrings.inputValue
      ); // ingej avch bgaa ni list yum massivtai tustei uuniig array bolgono

      //convert list to array
      var fieldsArr = Array.prototype.slice.call(fields);

      for (var i = 0; i < fieldsArr.length; i++) {
        fieldsArr[i].value = "";
      } //ene bichigleliig tovchloh uur negen arga ni forEACH

      /*
      fieldsArr.forEach(function (el, index, array) {
        el.value = " ";
      });   miniii nuhtsuld add description gesn placeholder ug maani alga bolood bgaa uchir huuchnaar ni yavuullaa
      */

      //mouse -g descriptin deer ochuulah
      fieldsArr[0].focus();
    },

    addListItem: function (item, type) {
      //Orlogiin zarlagiin elemntiig aguulsan html-g beltgene
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Ter Html dotroo utguudiig nireplace ashiglaj uurhcilj ugnu
      html = html.replace("%id%", item.id);
      html = html.replace("%desc%", item.desc);
      html = html.replace("%value%", item.value);

      // beltgesn html-ee domruu hiij ugnu
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },

    tosviigUzuuleh: function (tosov) {
      document.querySelector(DOMstrings.tosovLabel).textContent = tosov.tosov;
      document.querySelector(DOMstrings.incomeLabel).textContent = tosov.inc;
      document.querySelector(DOMstrings.expenseLabel).textContent = tosov.exp;
      if (tosov.huvi === 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = "";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tosov.huvi + "%";
      }
    },
  };
})();

//Sanhuutei ajillah controller
var financeController = (function () {
  //private construction function Income and Expense
  var Income = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var Expense = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;

    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
  };

  //private data
  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },

    tosov: 0,

    huvi: 0,
  };

  // pUblic data
  return {
    addItem: function (type, desc, value) {
      console.log(type, desc, value);
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, value);
      } else {
        item = new Expense(id, desc, value);
      }

      data.items[type].push(item);

      return item;
    },

    seeData: function () {
      return data;
    },

    tosovTootsooloh: function () {
      // niit orlogo
      calculateTotal("inc");

      //niit zarlaga
      calculateTotal("exp");

      // tosviig tootsno
      data.tosov = data.totals.inc - data.totals.exp;

      // huviig bodno
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tosovAvah: function () {
      return {
        tosov: data.tosov,
        huvi: data.huvi,
        inc: data.totals.inc,
        exp: data.totals.exp,
      };
    },
  };
})();

// programiin holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Oruulah ugugdliig delgetsees avna. delgetstei handaj bgaa uchir dalgetsiin controloos avna
    var input = uiController.getInput();

    if (input.desc !== "" && input.value !== "") {
      // 2. Olj avsan ugudluudee canhuugiin controllert damjuulj tend hadgalna
      var item = financeController.addItem(input.type, input.desc, input.value);

      // 3. Olj avsan ugugdluudee web deeree tohiroh hesegt gargana
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      // 4. Tusviig tootsoolno
      financeController.tosovTootsooloh();

      // 5. Etssiin uldegdliig tootsno
      var tosov = financeController.tosovAvah();

      // 6. Tootsoog delgetsend gargana
      uiController.tosviigUzuuleh(tosov);
      console.log(tosov);
    }
  };

  var setupListeners = function () {
    var DOM = uiController.getDOMstrings();

    // tuhain add btn - dr darahar hiigdeh uilsees gadna enter darah uyed mun utgiig avdag bhar shiidej ugnu. keyboard events--- gesn ug. keypress-tovchiig daraad avah uyed uuniiig ashiglana.
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    //keycode-g ahiglan enter darlaa gej uzne keyboardnaas darsan eventeer console hiin, avan hevlej uzeed medeh bolomjtoi enter-n keycode - 13.
    //http://keycodes.atjayjo.com/ uunees harah bolomjtoi
    // deer uyiin browser deer keycode ni bgdaggui uchir  event.which === 13 which--g ashigladag ene ni ajilladag.
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log(" Programm started .....");
      uiController.tosviigUzuuleh({
        tosov: 0,
        huvi: 0,
        inc: 0,
        exp: 0,
      });
      setupListeners();
    },
  };
})(uiController, financeController);

appController.init();

/* 
var uiController = (function () {
  var x = 100;

  // daldlagdsan function gadnaas handaj bolohgui uchir ni return hiigdeegui gadnaas handaj chadahgui
  function add(y) {
    return x + y;
  }

  // piblic handaj  bna. gadnaas handaj chadna. uchir ni return hiigdsen ug functioniig object bolgon bichdeg.
  return {
    publicAdd: function (a) {
      a = add(a);
      console.log("bolovsruulagdsan " + a);
    },
  };
  // console.log("hello");
})(); // anymomous function bicheed iife ashiglan ter dor ni duudaj bna . ingesneer ug function dotorhi ugugduld gadnaas handah bolomjgui.

var financeController = (function () {})();

var appController = (function (uiController, financeController) {
  uiController.publicAdd(500);
})(uiController, financeController);
*/
