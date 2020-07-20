/**
 * @class bars
 */
class Bars {

    // Elements
    data_bins = [];
    svg = null;
    g = null;
    axisXG = null;
    axisYG = null;
    // Configs
    svgW = 360;
    svgH = 360;
    gMargin = {top: 50, right: 50, bottom: 50, left: 50};
    gW = this.svgW - (this.gMargin.right + this.gMargin.left);
    gH = this.svgH - (this.gMargin.top + this.gMargin.bottom);

    //tools
    histogram = d3.histogram();
    
    scX = d3.scaleLinear()
        .range([0, this.gW]);
    scY = d3.scaleLinear()
        .range(this.gH, 0);
    axisX = d3.axisBottom();
    axisY = d3.axisLeft();
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
            .append('svg')
            .attr('width', vis.svgW)
            .attr('height', vis.svgH);
        vis.g = vis.svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${vis.gMargin.left}px, ${vis.gMargin.top}px)`);

        vis.scX = d3.scaleLinear()
            .range([0, this.gW])
        vis.scY = d3.scaleLinear()
            .range([0, this.gH])


        vis.axisXG = vis.g.append('g')
            .attr('class', 'axis axisX')
            .style('transform', `translateY(${vis.gH + 15}px)`);
        vis.axisYG = vis.g.append('g')
            .attr('class', 'axis axisY')
            .style('transform', `translateX(${-15}px)`);

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
        // map ages
        const ageMap = vis.data.map(d => d.age);

        //Histogram

        vis.data_bins = vis.histogram(ageMap);
        //update scale
        vis.scX.domain(d3.extent(ageMap, d=> d));
        vis.scY.domain([0, d3.max(vis.data_bins, d=> d.length)]);
        vis.axisX.scale(vis.scX);
        vis.axisY.scale(vis.scY);
        console.log(vis.scX.range() + ' / ' + vis.scX.domain());
        
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
        //create bars / bind data
        const showMe = vis.g.selectAll('.barG')
            .data(vis.data_bins)
            vis.g.selectAll('.barG')
                .data(vis.data_bins)
                .join(
                    // Enter - adding new elements/data
                    enter => enter
                        .append('g')
                        .attr('class', 'barG')
                        .each(function(d, i) {
                            // Define this
                            const g = d3.select(this);

                            //
                            const w = Math.round(vis.gW / vis.data_bins.length);
                            const h = vis.gH - vis.scY(d.length);

                            // Position
                            g.style('transform', `translate(${w * i}px, ${vis.gH - h}px)`);

                            // Create rectangles
                            g.append('rect')
                                .attr('width', Math.floor(w*0.8))
                                .attr('height', h)
                                .attr('x', Math.floor(w*0.1))
                                .attr('fill', 'rgba(0 , 0, 100, 1)')
                        })
                );

        //update axes
        vis.axisXG.call(vis.axisX);
        vis.axisYG.call(vis.axisY);        
    }
    

}