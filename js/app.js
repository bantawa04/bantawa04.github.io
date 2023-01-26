function myFunction(_) {
  let x = document.getElementById("ham");
  x.classList.toggle("change");
  let el = document.getElementById("mbl-header");
  el.classList.toggle("block");
}
$(document).ready(function () {
  AOS.init({
    duration: 700,
    once: true,
  });

  // adding active class to navitem
  const navbarItem = $(".navbar__item");
  navbarItem.click(function (e) {
    $(".navbar__item").removeClass("active");
    $(this).addClass("active");
  });

  // adding scrolling effect to the nav link
  const navbarLink = $(".navbar__link");
  navbarLink.click(function (e) {
    const hash = this.hash;
    if (hash !== "") {
      var decodeHash = decodeURI(hash);
      $("html, body").animate(
        {
          scrollTop: $(decodeHash).offset().top - 75,
        },
        100,
        function () {}
      );
    }
  });

  //scroll to inquiry
  $("#banner-button").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $("#contactus").offset().top - 75,
      },
      100
    );
  });

  // submit the contact us form
  var nameErrorElement = document.getElementById("name_error");
  var companyErrorElement = document.getElementById("company_error");
  var emailErrorElement = document.getElementById("email_error");
  var inquiryTypeErrorElement = document.getElementById("inquiry_type_error");
  var messageErrorElement = document.getElementById("message_error");
  var telTypeErrorElement = document.getElementById("tel_error");

  $("#submit_button").on("click", function (e) {
    e.preventDefault();
    nameErrorElement.textContent = "";
    companyErrorElement.textContent = "";
    emailErrorElement.textContent = "";
    messageErrorElement.textContent = "";
    var hasError = false;
    //display error methods
    const setError = (element, errElement, message) => {
      const inputControl = element.parentElement;
      errElement.textContent = message;
      message
        ? inputControl.classList.add("error")
        : inputControl.classList.remove("error");
    };
    var nameElement = document.getElementById("name");
    var name = nameElement.value.trim();
    if (!name) {
      hasError = true;
      setError(nameElement, nameErrorElement, "お名前必須");
    } else {
      setError(nameElement, nameErrorElement, "");
      hasError = false;
    }

    var companyElement = document.getElementById("company");
    var company = companyElement.value.trim();
    if (!company) {
      hasError = true;
      setError(companyElement, companyErrorElement, "会社名必須");
    } else {
      setError(companyElement, companyErrorElement, "");
      hasError = false;
    }

    var telElement = document.getElementById("tel");
    var tel = telElement?.value.trim();

    if (!tel) {
      setError(telElement, telTypeErrorElement, "電話番号必須");
      hasError = true;
    } else if (!validPhoneNumber(tel)) {
      setError(telElement, telTypeErrorElement, "無効な電話番号");
      hasError = true;
    } else {
      setError(telElement, telTypeErrorElement, "");
      hasError = false;
    }

    var messageElement = document.getElementById("message");
    var message = messageElement.value.trim();
    if (!message) {
      setError(messageElement, messageErrorElement, "メッセージが必要です");
      hasError = true;
    } else {
      setError(messageElement, messageErrorElement, "");
      hasError = false;
    }
    var emailElement = document.getElementById("email");
    var email = emailElement.value.trim();
    if (!email) {
      hasError = true;
      setError(emailElement, emailErrorElement, "メールアドレス必須");
    } else if (!ValidateEmail(email)) {
      hasError = true;
      setError(
        emailElement,
        emailErrorElement,
        "メールアドレスが正しくありません"
      );
    } else {
      setError(emailElement, emailErrorElement, "");
      hasError = false;
    }

    var inquiryTypeElement = document.getElementById("inquiry-type");
    var inquiryType = inquiryTypeElement.value;

    if (
      nameErrorElement.textContent == "" &&
      companyErrorElement.textContent == "" &&
      emailErrorElement.textContent == "" &&
      messageErrorElement.textContent == ""
    ) {
      hasError = false;
    } else {
      hasError = true;
    }

    if (!hasError) {
      //firebase app in production mode
      var config = {
        apiKey: "AIzaSyC1PRfsNWXoJ6LS4XMPgyXU3566kAq3ptY",
        authDomain: "ready-to-work-d1465.firebaseapp.com",
        databaseURL: "https://ready-to-work-d1465.firebaseio.com",
        projectId: "ready-to-work-d1465",
        storageBucket: "ready-to-work-d1465.appspot.com",
        messagingSenderId: "882070407181",
        appId: "1:882070407181:web:55e017a0cfede34b",
      };

      firebase.initializeApp(config);
      var db = firebase.firestore();

      db.collection("CompanyContact")
        .add({
          email: email,
          name: name,
          company: company,
          tel: tel,
          inquiryType: inquiryType,
          message: message,
          from: "company_website",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          $("#contactForm").hide();
          $("#success__msg").text(
            "お問い合わせいただきありがとうございます。担当者よりご連絡致します。"
          );
          alert("成功");
        })
        .catch(function (err) {
          var errorMessage = err && err.message ? err.message : "";
          alert(
            "お問い合わせの登録に失敗しました。お手数をおかけしますが、しばらくしてから再度お試しください。" +
              errorMessage
          );
        });
    }

    return false;
  });
  const validPhoneNumber = (phone) => {
    if (/([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(phone)) {
      return true;
    }
    return false;
  };
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  $("#name").on("keyup", function () {
    if ($(this).val().length > 0) {
      nameErrorElement.textContent = "";
    }
  });

  $("#company").on("keyup", function () {
    if ($(this).val().length > 0) {
      companyErrorElement.textContent = "";
    }
  });

  $("#email").on("keyup", function () {
    if ($(this).val().length > 0) {
      emailErrorElement.textContent = "";
    }
  });
  $("#tel").on("keyup", function () {
    if ($(this).val().length > 0) {
      telTypeErrorElement.textContent = "";
    }
  });
  $("#inquiry-type").on("change", function () {
    if ($(this).val().length > 0) {
      inquiryTypeErrorElement.textContent = "";
    }
  });

  $("#message").on("keyup", function () {
    if ($(this).val().length > 0) {
      messageErrorElement.textContent = "";
    }
  });

  $("#name").on("blur", function () {
    var $this = $(this);
    if ($this.val().length > 0) {
      $this.parent().find("label").css("opacity", 0);
    } else {
      $this.parent().find("label").css("opacity", 1);
    }
  });
  $("#email").on("blur", function () {
    var $this = $(this);
    if ($this.val().length > 0) {
      $this.parent().find("label").css("opacity", 0);
    } else {
      $this.parent().find("label").css("opacity", 1);
    }
  });
  $("#message").on("blur", function () {
    var $this = $(this);
    if ($this.val().length > 0) {
      $this.parent().find("label").css("opacity", 0);
    } else {
      $this.parent().find("label").css("opacity", 1);
    }
  });

  // textarea count validation

  $("#message").keyup(function () {
    var characterCount = $(this).val().length,
      current = $("#current"),
      maximum = $("#maximum"),
      theCount = $("#the-count");
    current.text(characterCount);

    if (characterCount >= 350) {
      maximum.css("color", "#8f0001");
      current.css("color", "#8f0001");
      theCount.css("font-weight", "bold");
    } else {
      maximum.css("color", "#666");
      theCount.css("font-weight", "normal");
    }
  });
});

// Header Loader
window.onscroll = function () {
  loadHeader();
  myLoadeHeader();
  // Trigger animation

  var t = document.getElementById("partner-logo-section");
  const top = t.getBoundingClientRect().top;
  if (top < 200) {
    triggerAnim();
  }
};
var secondHeader = document.getElementById("my-buttons");
var header = document.getElementById("header");

function loadHeader() {
  var t = document.getElementById("our-tag");
  const top = t.getBoundingClientRect().top;
  if (top <= 0) {
    secondHeader.classList.add("sticky");
    header.classList.add("non-sticky");
  } else {
    secondHeader.classList.remove("sticky");
    header.classList.remove("non-sticky");
  }
}

function myLoadeHeader() {
  var b = document.getElementById("board-member");
  const board = b.getBoundingClientRect().top;
  if (board <= 0) {
    secondHeader.classList.remove("sticky");
    header.classList.remove("non-sticky");
  }
}
function triggerAnim() {
  var mainC = document.getElementById("main-circle");
  var leftC = document.getElementById("left-circle");
  var rightC = document.getElementById("right-circle");
  var partnerSec = document.getElementById("partner-logo-section");

  [mainC, leftC, rightC, partnerSec].forEach((ele) => {
    // if (ele.classList.contains("anim")) ele.classList.remove("anim");
    ele.classList.add("anim");
  });
}
