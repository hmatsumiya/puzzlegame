const MAPLIST = [ "3x3", "5x5", "10x10", "15x15" ];
const TITLE = "イラストロジック";

function Top() {
    const Display = document.getElementById("display");
    const Info = document.getElementById("info");
    const ButtonCont = document.getElementById("button_cont");
    InitChild(Display);
    InitChild(Info);
    InitChild(ButtonCont);
    AddElement(Display, "div", "Top", null, null, null, null, null);
    AddElement(Info, "div", null, null, null, null, null, null);
    AddElement(ButtonCont, "div", null, null, null, null, null, null);
    const Top = document.getElementById("Top");
    AddElement(Top, "h2", null, null, null, null, null, TITLE);
    AddElement(Top, "button", null, "top_button", "button", null,
               "SelectSize()", "スタート");
}

function SelectSize() {
    const Top = document.getElementById("Top");
    InitChild(Top);
    AddElement(Top, "p", null, null, null, null, null, "サイズを選んでね");
    AddElement(Top, "button", null, "top_button", "button", null,
               "SelectMap(0)", "3x3");
    AddElement(Top, "button", null, "top_button", "button", null,
               "SelectMap(1)", "5x5");
    AddElement(Top, "button", null, "top_button", "button", null,
               "SelectMap(2)", "10x10");
    AddElement(Top, "button", null, "top_button", "button", null,
               "SelectMap(3)", "15x15");
}

function SelectMap(num) {
    const Top = document.getElementById("Top");
    InitChild(Top);
    AddElement(Top, "p", null, null, null, null, null, "サイズ" + MAPLIST[num]);
    AddElement(Top, "p", null, null, null, null, null, "問題を選んでね");
    for (let i = 0; i < MAPDATA[num].length; ++i) {
        AddElement(Top, "button", null, "top_button", "button", null,
                   "InitMap(" + num + "," + i + ")", "問題" + (i + 1));
    }
}
