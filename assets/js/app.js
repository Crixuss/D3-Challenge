var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
// console.log(svgHeight);
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv")
  .then(function(scatterData) {

    scatterData.forEach(d => {
      d.healthcare = +d.healthcare;
      d.poverty = +d.poverty;
   
    //   console.log(d.smokes, d.age);
    });

    var xLinearScale= d3.scaleLinear()
                        .range([0, width])
                        .domain(d3.extent(scatterData, d => d.poverty));
    var yLinearScale = d3.scaleLinear()
                          .range([height, 0])
                          .domain(d3.extent(scatterData, d => d.healthcare));

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    chartGroup.append('g')
              .call(leftAxis);
    chartGroup.append('g')
              .attr('transform', `translate(0, ${height})`)
              .call(bottomAxis);

    var circles = chartGroup.selectAll('circle')
                            .data(scatterData)
                            .enter()
                            .append('circle')
                            .attr('cx', d => xLinearScale(+d.poverty))
                            .attr('cy', d => yLinearScale(+d.healthcare))
                            .attr('r', '10')
                            .attr('fill', 'lightblue')
                            .attr('opacity', '.5');

    
    chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (height/2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Healthcare (%)");
                    
    chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("In Poverty (%)");

    
  
  });
