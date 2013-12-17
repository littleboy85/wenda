var d3 = require('d3')
  , bootstrap = require('bootstrap')
  , _ = require('underscore')
;

var color = d3.scale.category10()
  , r = 400
  , pie = d3.layout.pie().value(function(){return 1;})
  , vis = d3.select('body').append('svg').attr({width: r*2, height: r*2})
  , g = vis.append('g').attr('transform', 'translate(' + r + ', ' + r + ')')
  , data = [
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'a'}, 
    {label: 'b'}, 
    {label: 'c'}]
;



var arcs = g.selectAll('g.slice').data(pie(data)).
  enter().append('g').attr('class', 'slice');

var arc = d3.svg.arc().outerRadius(r).innerRadius(r/2);

arcs.append('path').
  attr('fill', function(d, i){return color(i);}).
  attr('d', arc);

arcs.append('text').text(function(d, i){ return data[i].label; });

window.my = vis;

