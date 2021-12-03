//Delgetstei ajillah controller
var uiController = (function () {
  //html-es avch bgaa utguudiig ingej hiij ugvul daraa zasvar hiihed amar ner ntr uurchlugdsun uyed. private data
  var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  // public -return hiigdej bgaa uchir
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        desc: document.querySelector(DOMstrings.inputDesc).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

//Sanhuutei ajillah controller
var financeController = (function () {
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

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

// programiin holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Oruulah ugugdliig delgetsees avna. delgetstei handaj bgaa uchir dalgetsiin controloos avna
    console.log(uiController.getInput());
    // 2. Olj avsan ugudluudee canhuugiin controllert damjuulj tend hadgalna
    // 3. Olj avsan ugugdluudee web deeree tohiroh hesegt gargana
    // 4. Tusviig tootsoolno
    // 5. Etssiin uldegdliig tootsoj gargana
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
