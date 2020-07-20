/**
 * @class Template
 */
class Scatter {

    // Elements
    svg = null;
    g = null;
    data = [];
    // Configs
    svgW = 360;
    svgH = 360;
    gMargin = {top: 50, right: 50, bottom: 50, left: 50};
    gW = this.svgW - (this.gMargin.right + this.gMargin.left);
    gH = this.svgH - (this.gMargin.top + this.gMargin.bottom);
    domain = null;
    num = null;
    size = null;
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
    init() {
        // Define this vis
        const vis = this;

        // Set up the svg/g work space
        vis.svg = d3.select(`#${vis.target}`)
            .append('svg')
                .attr('width', vis.gW)
                .attr('height', vis.gH)
            .append("g")
                .attr("transform", "translate(" + vis.gMargin.left + "," + vis.gMargin.top + ")");

        // Now wrangle
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
        const exp = vis.data.map(d=> d.experience_yr); // x axis
        console.log(exp)
        const hw1Hrs = vis.data.map(d=> d.hw1_hrs); // y axis
        const age = vis.data.map(d=> d.age);
        vis.relData = {
            group: exp,
            variable: hw1Hrs,
            value: age
        }
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
        var myGroups = d3.range(0, Math.max(...vis.relData.group), 1);
        var myVars = d3.range(0, Math.max(...vis.relData.variable), 1);
        var x = d3.scaleBand()
            .range([ 0, vis.gW ])
            .domain(myGroups)
            .padding(0.01);
        vis.svg.append("g")
        .attr("transform", "translate(0," + vis.gH + ")")
        .call(d3.axisBottom(x))

        // Build X scales and axis:
        var y = d3.scaleBand()
        .range([ vis.gH, 0 ])
        .domain(myVars)
        .padding(0.01);
        vis.svg.append("g")
        .call(d3.axisLeft(y));

        // Build color scale
        var size = d3.scaleSqrt()
        .range([0, 9])
        .domain([0,Math.max(...vis.relData.value)]);

        var showMe=vis.svg.selectAll('.circle')
            .data(vis.data)
            .enter()
                .append('circle')
                .attr("cx", function(d) { return x(d.experience_yr) })
                .attr("cy", function(d) { return y(d.hw1_hrs) })
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .style("fill", "black")
                .style("r", function(d) { return size(d.age)} )
        console.log(showMe)
        
    }
}