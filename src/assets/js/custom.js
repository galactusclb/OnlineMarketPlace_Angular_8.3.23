// function hide_open() {
//     var gg = document.getElementById("kok");

//     console.log(gg)
//     gg.classList.remove("hide");

    
    

    
// }
// $(document).ready(function(){
//     $("button").click(function(){
//       alert($("p").hasClass("intro"));
//     });
//   });



// $(document).ready(function(){
//   $(".dropdown, .btn-group").hover(function(){
//       var dropdownMenu = $(this).children(".dropdown-menu");

//       if(dropdownMenu.is(":visible")){
//           dropdownMenu.parent().toggleClass("open");
//       }
//   });
// });


  $(document).ready(function(){
    $(".expand-icon").click(function(){
        //alert($(this).children("ul").hasClass("hide"));

        if ($(this).children("ul").hasClass("hide")) {
            $(this).children("ul").removeClass("hide") .addClass("block");
            $(this).children("span").removeClass("slideUp").addClass("slideDown")
        } else {
            $(this).children("ul").removeClass("block") .addClass("hide")
            $(this).children("span").removeClass("slideDown").addClass("slideUp")
        }
    });
  });

  $(document).ready(function(){
    $(".make-heart").click(function(){
      if ($(this).children(".remove-heart").hasClass("block")) {
        $(this).children(".remove-heart").removeClass("block").addClass("hide");
        $(this).children(".heart").removeClass("hide").addClass("block");
      }else{
        $(this).children(".remove-heart").removeClass("hide").addClass("block");
        $(this).children(".heart").removeClass("block").addClass("hide");
      }
    })
  });

  $(document).ready(function(){
    $(".minus").mousedown(function(){
    //  var x = $(this).parent();
    //  var y = $(this).parent()[0].children[2].value
    //  console.log(x)
    //  console.log(y)
        var val =parseInt( $(this).parent()[0].children[2].value );

        if(val != 0 ){
          val = val - 1 ;
          $(this).parent()[0].children[2].value = val;
        }
      })
  })

  $(document).ready(function(){
    $(".plus").click(function(){
      var val = parseInt($(this).parent()[0].children[2].value);
      var max = parseInt($(this).parent()[0].children[0].value);

      if (max > val) {
        val = val + 1 ;
        $(this).parent()[0].children[2].value = val;
      }
    })
  })