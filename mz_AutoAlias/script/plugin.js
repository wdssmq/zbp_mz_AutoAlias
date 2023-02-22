/* global $, editor_api */

$(function () {
  $("#edtAlias").after(
    "<a href='javascript:;' onclick='fnAutoAlias();'> 「生成别名」</a>",
  );
  if ($(".edt-more").length == 0) {
    $("#msg").after(
      "<a href=\"javascript:;\" data-plugin=\"mz_AutoAlias\" title=\"插入摘要分隔符\" onclick=\"fnEdtMore();\" class=\"edt-more\">「摘要分隔」</a>",
    );
  }
});

// 自动插入摘要分隔符
function fnEdtMore() {
  let strMore = "";
  if (typeof window.EDITORMD == "object") {
    strMore = "xn<!--more-->xf";
  } else {
    strMore = "<hr class=\"more\" />";
  }
  editor_api.editor.content.insert(strMore);
  let oBody = editor_api.editor.content.get();
  oBody = oBody.replace(/[\r\n]*xn<!--more-->xf[\r\n]*/, "\n\n<!--more-->\n\n");
  editor_api.editor.content.put(oBody);
  editor_api.editor.intro.put("");
}

// localStorage 封装
const lsObj = {
  setItem: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: function (key, def = "") {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return def;
  },
};

// 自动别名
function fnAutoAlias() {
  if (document.forms["edit"].edtAlias.value.trim() !== "") {
    return;
  }
  const vDate = new Date();
  const year = vDate.getFullYear();
  const month = vDate.getMonth() + 1;
  const day = vDate.getDate();
  // const vNWE = vDate.valueOf();
  const vNWE = vDate.getTime();
  // console.log(vNWE);
  const strAlias = [
    year.toString() +
    ("0" + month.toString()).slice(-2) +
    ("0" + day.toString()).slice(-2),
    vNWE.toString().slice(-3),
  ];
  let lstDay = lsObj.getItem("lstDay", "0");
  let listUsed = lsObj.getItem("listUsed", []);
  // 排序
  listUsed.sort((a, b) => {
    return a - b;
  });
  if (lstDay !== strAlias[0]) {
    lstDay = strAlias[0];
    listUsed = [];
  }
  // console.log(listUsed);
  // console.log(strAlias);
  if (listUsed.includes(strAlias[1])) {
    fnAutoAlias();
  } else {
    listUsed.push(strAlias[1]);
    lsObj.setItem("lstDay", lstDay);
    lsObj.setItem("listUsed", listUsed);
    document.forms["edit"].edtAlias.value = strAlias.join("");
  }
  // console.log(strAlias);
}

// 移动别名和 tags 文本框位置
function fnMove() {
  $("#edtTitle").unwrap();
  $("#alias").appendTo("#divEditTitle").removeClass("editmod2");
  $("#tags,#ulTag").appendTo("#divEditTitle").removeClass("editmod2");
}

// 自动执行
fnMove();
fnAutoAlias();
