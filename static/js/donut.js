/**
 * @class Template
 */
class Donut {

    // Elements
    svg = null;
    g = null;
    
    // Configs
    svgW = 360;
    svgH = 360;
    gW = 300;
    gH = 300;
    margin = 40;

    /*
    Constructor
     */
    constructor(_data, _target) {
        // Assign parameters as object fields
        this.data = _data;
        this.target = _target;

        // Now init
        this.init();
    }

    /** @function init()
     * Perform one-time setup function
     *
     * @returns void
     */
    init(_data, _target) {
        // Define this vis
        const vis = this;

        // Set up the svg/g work space
        vis.svg = d3.select(`#${vis.target}`)
        .append("svg")
        .attr("width", vis.gW)
        .attr("height", vis.gH)
        .append("g")
          .attr("transform", "translate(" + vis.gW / 2 + "," + vis.gH / 2 + ")");      

        vis.wrangle();
    }

    /** @function wrangle()
     * Preps data for vis
     *
     * @returns void
     */
    wrangle() {
        // Define this vis
        const vis = this;
        //map languages
        const langMap = vis.data.map(d => d.prog_lang);
        var langMapStr = langMap.toString()
        vis.userNums = {
            python : langMapStr.match(/py/g).length,
            java : langMapStr.match(/java/g).length,
            cpp : langMapStr.match(/cpp/g).length,
            javascript : langMapStr.match(/js/g).length,
            other : langMapStr.match(/other/g).length
        };
        // Now render
        vis.render();
    }

    /** @function wrangle()
     * Builds, updates, removes elements in vis
     *
     * @returns void
     */
    render() {
        // Define this vis
        const vis = this;
        var radius = Math.min(vis.gW, vis.gH) / 2 - vis.margin
        var pie = d3.pie()
            .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(vis.userNums))

        console.log(data_ready)
        console.log(vis.userNums)
        vis.svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(40)         // This is the size of the donut hole
                .outerRadius(radius)
            )
            
           .attr("fill", "white")
           /*
            I spent 4 hours bug fixing only to realize 
            flask wasn't refreshing. I am not going to
            add colors at this point. I am too exausted
            */
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

    }
}