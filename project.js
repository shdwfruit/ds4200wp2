// Prepare you data and load the data again. 
// This data should contains three columns, platform, post type and average number of likes. 
const colorPriceAvg = d3.csv("colorPriceAvg.csv");

colorPriceAvg.then(function(data) {
    // Convert string values to numbers
    data.forEach(function(d) {
      d.average_price = +d.average_price;
    });


    // Define the dimensions and margins for the SVG
    let 
      width = 800, 
      height = 400;

    let margin = {
      top: 50,
      bottom: 50, 
      left: 60, 
      right: 50
    };

    // Create the SVG container
    let svg = d3.select('#colorplot')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background', 'white');
    

    // Define four scales
    // Scale x0 is for the platform, which divide the whole scale into 4 parts
    // Scale x1 is for the post type, which divide each bandwidth of the previous x0 scale into three part for each post type
    // Recommend to add more spaces for the y scale for the legend
    // Also need a color scale for the post type

    const x0 = d3.scaleBand()
                 .domain([...new Set(data.map(d => d.cut))])
                 .range([margin.left, width - margin.right - 100])
                 .padding(0.2); 

    const x1 = d3.scaleBand()
                 .domain([...new Set(data.map(d => d.color))])
                 .range([0, x0.bandwidth()])
                 .padding(0.05);  

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.average_price)])
                .range([height - margin.bottom, margin.top]);

    const redGradient = [
      '#fcbba1',
      '#fc9272',
      '#fb6a4a',
      '#ef3b2c',
      '#cb181d',
      '#a50f15',
      '#67000d'
    ];
    const color = d3.scaleOrdinal()
                    .domain([...new Set(data.map(d => d.color))])
                    .range(redGradient);   
         
    // Add scales x0 and y  
    let x0scale = d3.scaleBand()
                  .domain([...new Set(data.map(d => d.cut))])
                  .range([margin.left, width - margin.right - 100])
                  .padding(0.2);

    let yscale = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.average_price)])
                  .range([height - margin.bottom, margin.top]);

    // Add x-axis label
    let x0axis = svg.append('g')
                  .call(d3.axisBottom().scale(x0scale))
                  .attr('transform', `translate(0, ${height - margin.bottom})`);

    // Add y-axis label
    let yaxis = svg.append('g')
                  .call(d3.axisLeft().scale(yscale))
                  .attr('transform', `translate(${margin.left},0)`);

    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height - 15)
       .attr("text-anchor", "middle")
       .text("Cut");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - height / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("Average Price");

    // Add a title to the bar plot
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", margin.top / 2)
       .attr("text-anchor", "middle")
       .attr("font-size", "20px")
       .attr("font-weight", "bold")
       .text("Average Diamond Price by Cut and Color");

  // Group container for bars
  const barGroups = svg.selectAll("bar")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${x0(d.cut)},0)`);

  // Draw bars
    barGroups.append("rect")
              .attr("x", d => x1(d.color))
              .attr("y", d => y(d.average_price))
              .attr("width", x1.bandwidth())
              .attr("height", d => height - margin.bottom - y(d.average_price))
              .attr("fill", d => color(d.color));
      

    // Add the legend
    const legend = svg.append("g")
                      .attr("transform", `translate(${width - 150}, ${margin.top})`);

    const types = [...new Set(data.map(d => d.color))];
 
    types.forEach((type, i) => {

    // Alread have the text information for the legend. 
    // Now add a small square/rect bar next to the text with different color.
      legend.append("text")
          .attr("x", 20)
          .attr("y", i * 20 + 12)
          .text(type)
          .attr("alignment-baseline", "middle");

      legend.append("rect")
          .attr("x", 0)
          .attr("y", i * 20)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", color(type));

      legend.append("text")
            .attr("x", 0)
            .attr("y", -10)
            .text("Color Grade")
            .attr("text-anchor", "middle");
  // Select the tooltip div
  const tooltip = d3.select("#colortooltip");

  // Add tooltip events to bars
  barGroups.selectAll("rect")
    .on("mouseover", function(event, d) {
      tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
      tooltip.html(`<strong>Color:</strong> ${d.color}<br><strong>Price:</strong> $${d3.format(",.2f")(d.average_price)}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
      d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", 1.5);
    })
    .on("mouseout", function() {
      tooltip.transition()
            .duration(300)
            .style("opacity", 0);
      d3.select(this)
        .style("stroke", "none");
    });

  });

});

// Prepare you data and load the data again. 
// This data should contains three columns, platform, post type and average number of likes. 
const clarityPriceAvg = d3.csv("clarityPriceAvg.csv");

clarityPriceAvg.then(function(data) {
    // Convert string values to numbers
    data.forEach(function(d) {
      d.average_price = +d.average_price;
    });


    // Define the dimensions and margins for the SVG
    let 
      width = 800, 
      height = 400;

    let margin = {
      top: 50,
      bottom: 50, 
      left: 60, 
      right: 50
    };

    // Create the SVG container
    let svg = d3.select('#clarityplot')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background', 'white');
    

    // Define four scales
    // Scale x0 is for the platform, which divide the whole scale into 4 parts
    // Scale x1 is for the post type, which divide each bandwidth of the previous x0 scale into three part for each post type
    // Recommend to add more spaces for the y scale for the legend
    // Also need a color scale for the post type

    const x0 = d3.scaleBand()
                 .domain([...new Set(data.map(d => d.cut))])
                 .range([margin.left, width - margin.right - 100])
                 .padding(0.2); 

    const x1 = d3.scaleBand()
                 .domain([...new Set(data.map(d => d.clarity))])
                 .range([0, x0.bandwidth()])
                 .padding(0.05);  

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.average_price)])
                .range([height - margin.bottom, margin.top]);

    const purpleGradient = [
      '#c0a2e4',
      '#aa89db',
      '#9670d2',
      '#8155c7',
      '#6e3fb5',
      '#5a2a91',
      '#47126b',
      '#2e004d'
    ];
    const color = d3.scaleOrdinal()
                    .domain([...new Set(data.map(d => d.clarity))])
                    .range(purpleGradient);   
         
    // Add scales x0 and y  
    let x0scale = d3.scaleBand()
                  .domain([...new Set(data.map(d => d.cut))])
                  .range([margin.left, width - margin.right - 100])
                  .padding(0.2);

    let yscale = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.average_price)])
                  .range([height - margin.bottom, margin.top]);

    // Add x-axis label
    let x0axis = svg.append('g')
                  .call(d3.axisBottom().scale(x0scale))
                  .attr('transform', `translate(0, ${height - margin.bottom})`);

    // Add y-axis label
    let yaxis = svg.append('g')
                  .call(d3.axisLeft().scale(yscale))
                  .attr('transform', `translate(${margin.left},0)`);

    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height - 15)
       .attr("text-anchor", "middle")
       .text("Cut");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - height / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("Average Price");

    // Add a title to the bar plot
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", margin.top / 2)
       .attr("text-anchor", "middle")
       .attr("font-size", "20px")
       .attr("font-weight", "bold")
       .text("Average Diamond Price by Cut and Clarity");


  // Group container for bars
  const barGroups = svg.selectAll("bar")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${x0(d.cut)},0)`);

  // Draw bars
    barGroups.append("rect")
              .attr("x", d => x1(d.clarity))
              .attr("y", d => y(d.average_price))
              .attr("width", x1.bandwidth())
              .attr("height", d => height - margin.bottom - y(d.average_price))
              .attr("fill", d => color(d.clarity));
      

    // Add the legend
    const legend = svg.append("g")
                      .attr("transform", `translate(${width - 150}, ${margin.top})`);

    const types = [...new Set(data.map(d => d.clarity))];
 
    types.forEach((type, i) => {

    // Alread have the text information for the legend. 
    // Now add a small square/rect bar next to the text with different color.
      legend.append("text")
          .attr("x", 20)
          .attr("y", i * 20 + 12)
          .text(type)
          .attr("alignment-baseline", "middle");

      legend.append("rect")
          .attr("x", 0)
          .attr("y", i * 20)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", color(type));

      legend.append("text")
            .attr("x", 0)
            .attr("y", -10)
            .text("Clarity")
            .attr("text-anchor", "middle");
  // Select the tooltip div
  const tooltip = d3.select("#claritytooltip");

  // Add tooltip events to bars
  barGroups.selectAll("rect")
    .on("mouseover", function(event, d) {
      tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
      tooltip.html(`<strong>Clarity:</strong> ${d.clarity}<br><strong>Price:</strong> $${d3.format(",.2f")(d.average_price)}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
      d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", 1.5);
    })
    .on("mouseout", function() {
      tooltip.transition()
            .duration(300)
            .style("opacity", 0);
      d3.select(this)
        .style("stroke", "none");
    });

  });

});