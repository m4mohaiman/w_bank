document.addEventListener("change", function (event) {
    if (event.target.classList.contains("uploadProfileInput")) {
      var triggerInput = event.target;
      var currentImg = triggerInput.closest(".pic-holder").querySelector(".pic")
        .src;
      var holder = triggerInput.closest(".pic-holder");
      var wrapper = triggerInput.closest(".profile-pic-wrapper");
  
      var alerts = wrapper.querySelectorAll('[role="alert"]');
      alerts.forEach(function (alert) {
        alert.remove();
      });
  
      triggerInput.blur();
      var files = triggerInput.files || [];
      if (!files.length || !window.FileReader) {
        return;
      }
  
      if (/^image/.test(files[0].type)) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
  
        reader.onloadend = function () {
          holder.classList.add("uploadInProgress");
          holder.querySelector(".pic").src = this.result;
  
          var loader = document.createElement("div");
          loader.classList.add("upload-loader");
          loader.innerHTML =
            '<div class="spinner-border text-primary" role="status"><span class="sr-only"> ...تحميل </span></div>';
          holder.appendChild(loader);
  
          setTimeout(function () {
            holder.classList.remove("uploadInProgress");
            loader.remove();
  
            var random = Math.random();
            if (random < 0.9) {
              wrapper.innerHTML +=
                '<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> تم تحديث صورة الملف الشخصي بنجاح</div>';
              triggerInput.value = "";
              setTimeout(function () {
                wrapper.querySelector('[role="alert"]').remove();
              }, 3000);
            } else {
              holder.querySelector(".pic").src = currentImg;
              wrapper.innerHTML +=
                '<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> هناك خطأين أثناء الترقية! الرجاء معاودة المحاولة في وقت لاحق. </div>';
              triggerInput.value = "";
              setTimeout(function () {
                wrapper.querySelector('[role="alert"]').remove();
              }, 3000);
            }
          }, 1500);
        };
      } else {
        wrapper.innerHTML +=
          '<div class="alert alert-danger d-inline-block p-2 small" role="alert"> الرجاء اختيار صورة صالحة </div>';
        setTimeout(function () {
          var invalidAlert = wrapper.querySelector('[role="alert"]');
          if (invalidAlert) {
            invalidAlert.remove();
          }
        }, 3000);
      }
    }
  });