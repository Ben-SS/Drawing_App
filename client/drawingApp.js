points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX = 0;
var lastY = 0;
var thickness = 1;
var strokeColor = 'black';

Meteor.startup( function() {
  canvas = new Canvas();

  Deps.autorun( function() {
    var data = points.find({}).fetch();

    if (canvas) {
      canvas.draw(data);
    }
  });
});

Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', function () {
  this.render('welcome');
});
Router.route('/Palette', function () {
  this.render('Palette');
});

Session.set("brush", "line");


Template.wall.onRendered(function() {

  var initialValue = 1; // initial slider value
  var sliderTooltip = function(event, ui) {
  var curValue = ui.value || initialValue; // current value (when sliding) or initial value (at start)
  var tooltip = '<div class="tip"><div class="tip-inner">' + curValue +"px" + '</div><div class="tip-arrow"></div></div>';

  $('#slider .ui-slider-handle').html(tooltip);
  } //attach tooltip to the slider handle

  $("#slider").slider({value: initialValue, step:1, min: 1, max: 10, create: sliderTooltip, slide: sliderTooltip
  });
    

  $('#slider').slider({change: function(event, ui) {
    thickness=(1*ui.value);
  }})

  var opacityinitialValue = 1; // initial slider value
  var opacitysliderTooltip = function(event, ui) {
  var opacitycurValue = ui.value || opacityinitialValue; // current value (when sliding) or initial value (at start)
  var opacitytooltip = '<div class="tip"><div class="tip-inner">' + opacitycurValue + '</div><div class="tip-arrow"></div></div>';
  $('#opacity-slider .ui-slider-handle').html(opacitytooltip);
  }

  $('#opacity-slider').slider({
        value: opacityinitialValue,
        min: 0.1,
        max: 1.0,
        step: 0.1,
        create: opacitysliderTooltip,
        slide: opacitysliderTooltip
    })

  $('#opacity-slider').slider({change: function(event, ui) {
    opacity=ui.value;
    }
  });

  $(".clear").click();

  $("#line").attr('src', 'line-selected.png');
  $("#circle").attr('src', 'circle.png');

})


Template.wall.helpers({
  
})

Template.wall.events({  

  // When the user clicks on the button, open the modal 
  "click #colorBtn": function() {
    $(".modal-content").removeClass("fadeOut");
    $(".modal-content").addClass("fadeIn");
    $(".modal").css({"display":"block"});
  },

  // When the user clicks on <span> (x), close the modal
  "click #colorModal": function() {
    $(".modal-content").removeClass("fadeIn");
    $(".modal-content").addClass("fadeOut");
    $('.modal').fadeOut(400);
  },

  "click .paint":function(){
    $(".modal-content").removeClass("fadeIn");
    $(".modal-content").addClass("fadeOut");
    $('.modal').fadeOut(400);
  },

  "click .clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },

  "click #circle": function () {    
    Session.set("brush", "circle");
    $("#circle").attr('src', 'circle-selected.png');
    $("#line").attr('src', 'line.png');
  },

  "click #line": function () {
    Session.set("brush", "line");
    $("#line").attr('src', 'line-selected.png');
    $("#circle").attr('src', 'circle.png');
  },

  //choose a color. Initialise the last vals, otherwise a stray line will appear.

  "click .red": function () {
    lastX=0;
    lastY=0;
    strokeColor = "red";
    return false;
  },

  "click .pink": function () {
    lastX=0;
    lastY=0;
    strokeColor = "pink";
    return false;
  },

  "click .grey": function () {
    lastX=0;
    lastY=0;
    strokeColor = "gray";
    return false;
  },

  "click .lightgrey": function () {
    lastX=0;
    lastY=0;
    strokeColor = "#aeaeae";
    return false;
  },

  "click .black": function () {
    lastX=0;
    lastY=0;
    strokeColor = "black";
    return false;
  },

  "click .white": function () {
    lastX=0;
    lastY=0;
    strokeColor = "white";
    return false;
  },

  "click .blue": function () {
    lastX=0;
    lastY=0;
    strokeColor = "blue";
    return false;
  },

  "click .lightblue": function () {
    lastX=0;
    lastY=0;
    strokeColor = "#00baff";
    return false;
  },

  "click .lightgreen": function () {
    lastX=0;
    lastY=0;
    strokeColor = "#0dbf00";
    return false;
  },

  "click .green": function () {
    lastX=0;
    lastY=0;
    strokeColor = "green";
    return false;
  },

  "click .orange": function () {
    lastX=0;
    lastY=0;
    strokeColor = "orange";
    return false;
  },

  "click .yellow": function () {
    lastX=0;
    lastY=0;
    strokeColor = "yellow";
    return false;
  },

  "click .lilac": function () {
    lastX=0;
    lastY=0;
    strokeColor = "#c000ff";
    return false;
  },

  "click .purple": function () {
    lastX=0;
    lastY=0;
    strokeColor = "purple";
    return false;
  },

  "click .turqoise": function () {
    lastX=0;
    lastY=0;
    strokeColor = "#00c0ff";
    return false;
  },

  "click .coral": function () {
    lastX=0;
    lastY=0;
    strokeColor = "#01ff9c";
    return false;
  },


//  "click .coralbg": function () {
//    $("#canvas").css({"background": "#aeffc9"});
//    return false;
//  },

//  "click .yellowbg": function () {
//    $("#canvas").css({"background": "#fcffaa"});
//    return false;
//  },

//  "click .whitebg": function () {
//    $("#canvas").css({"background": "white"});
//    return false;
//  },



  "click button.save": function(){
    var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

    //console.log(html);
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
    var img = '<img class="thumbnail" src="'+imgsrc+'">'; 
    d3.select("#thumbnail").html(img);
  },

  "click button.export": function(){
    var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
    var img = '<img class="thumbnail" src="'+imgsrc+'">'; 

    var canvas = document.getElementById("canvas_html"),
    context = canvas.getContext("2d");
    console.log(canvas);

    var image = new Image;
    image.src = imgsrc;
    image.onload = function() {
      context.drawImage(image, 0, 0);

      var canvasdata = canvas.toDataURL("image/png");

      var pngimg = '<img src="'+canvasdata+'">'; 
        d3.select("#pngdataurl").html(pngimg);

      var a = document.createElement("a");
      a.download = "svg.png";
      a.href = canvasdata;
      a.click();
    }
  },

})

var markPoint = function() {

    var offset = $('#canvas').offset();

    // In the first frame, lastX and lastY are 0.
    // This means the line gets drawn to the top left of the screen
    // Which is annoying, so we test for this and stop it happening.

    if (lastX == 0) { // check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
    }

    var pointData = {
        // this draws a point exactly where you click the mouse
        // x: (event.pageX - offset.left),
        // y: (event.pageY - offset.top)});


        // We can do more interesting stuff
        // We need to input data in the right format
        // Then we can send this to d3 for drawing


        // 1) Algorithmic mouse follower
        // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
        // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        // 2) draw a line - requires you to change the code in drawing.js
        x2: (event.pageX - offset.left),
        y2: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,

        // We could calculate the line thickness from the distance
        // between current position and last position
        // w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
        //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
        // Or we could just set the line thickness using buttons and variable
        w: thickness,
        // stroke opacity
        opacity: opacity,
        // We can also use strokeColor, defined by a selection
        c: strokeColor,
        x: lastX,
        y: lastY,
        r: (thickness*2.5)
    };

    Meteor.call('insertPoint', pointData, function(error, result) {
        if (error) {
            console.log(error.reason);
        }
    });

      // update last coordinates
    lastX = (event.pageX - offset.left);
    lastY = (event.pageY - offset.top);
  }

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});
