var d3 = require('d3')
  , bootstrap = require('bootstrap')
  , _ = require('underscore')
  , data = require('./data.js')
;

var color = d3.scale.category10()
  , r = 400
  , pie = d3.layout.pie().value(function(){return 1;})
  , vis = d3.select('body').append('svg').attr({width: r*2, height: r*2})
  , g  = vis.append('g').attr('transform', 'translate('+r+', '+r+')')
  , gOuter  = g.append('g').attr('class', 'roll')
  , gInner = g.append('g').attr('class', 'roll')
  , arcsOuter = gOuter.selectAll('g.slice')
  , arcsInner = gInner.selectAll('g.slice')
  , indicator = g.append("path")
;

indicator.attr({
  d: d3.svg.symbol().type('triangle-down'),
  transform: 'translate(0, -'+r+') scale(4, 5)'
});

function createArcs(arcs, data, outerRadius, innerRadius) {
  var arc = d3.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius);
  arcs = arcs.data(data);
  var arcsEnter = arcs.enter().append('g').attr('class', 'slice');
  if (arcs.exit) arcs.exit().remove();

  arcs.selectAll('path').remove();
  arcs.selectAll('text').remove();

  arcs.append('path').attr({ 
    fill: function(d, i){return color(i);},
    d: arc
  });

  arcs.append('text').attr('transform', function(d){
    var angle = (d.startAngle + d.endAngle) * 180 / (2*Math.PI);
    d.innerRadius = 0;
    d.outerRadius = r;
    return 'translate(' + arc.centroid(d) + ') rotate('+angle+')';
  }).attr('text-anchor', 'middle').text(function(d, i){return d.data.name; });


  return arcs;
}

var questions = data.questions;
var users = pie(data.users).sort(null);
arcsOuter = createArcs(arcsOuter, users, r, r*2/3);
arcsInner = createArcs(arcsInner, pie(questions).sort(null), r*2/3, r/3);

var base = 0;
var next = d3.select('.btn.next');
next.on('click', function(){
  var angleInner = (360 * Math.random());
  var angleOuter = (360 * Math.random());
  var q = parseInt(angleInner * questions.length / 360);
  var u = parseInt((360 - angleOuter) * users.length / 360);
  console.log(q);
  base += 720;
  gInner.style('-webkit-transform', 
               'rotate(-'+ (base + angleInner) +'deg)');
  gOuter.style('-webkit-transform', 
               'rotate('+ (base + angleOuter) +'deg)');
  next.attr('disabled', 'true');
  setTimeout(function(){
    next.attr('disabled', null);
    $('#question').modal('toggle');
    $('.modal-title').text('请' +users[u].data.name+ '回答: ');
    $('.modal-body .qus').text(questions[q].q);
    $('.modal-body .ans').hide().text('答案: ' + questions[q].ans);
    questions.splice(q, 1);
    arcsInner = createArcs(arcsInner, pie(questions).sort(null), r*2/3, r/3);
    if (questions.length === 0){
      next.attr('disabled', 'true');
    }
  }, 5000);
});

$('.btn.ans').click(function(){
  $('.ans').show();
});

function roll(g, trans){
  return g.attr('transform', 'translate(' + r + ', ' + r + ') ' + trans);
}



