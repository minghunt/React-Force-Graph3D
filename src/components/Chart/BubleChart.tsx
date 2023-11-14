import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import { useEffect, useLayoutEffect, useRef } from "react";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
const BubleChart = () => {
    useEffect(() => {
        const chart = am4core.create(
            "chartdiv",
            am4plugins_forceDirected.ForceDirectedTree
        );
        // chart.zoomable = true;
        // chart.legend = new am4charts.Legend();
        // Create series
        const series = chart.series.push(
            new am4plugins_forceDirected.ForceDirectedSeries()
        );
        const icon = series.nodes.template.createChild(am4core.Image);
        // icon.href = "./public/assets/icons/react.svg";
        icon.horizontalCenter = "middle";
        icon.verticalCenter = "middle";
        icon.width = 40;
        icon.height = 40;

        series.dataFields.color = "color";
        // Set data
        series.dataSource.url = "./src/components/Chart/data.json";

        // Set up data fields
        //set off: true trong data
        series.dataFields.collapsed = "off";
        //----
        series.dataFields.value = "value";
        series.dataFields.name = "name";
        series.dataFields.children = "children";

        // Add labels
        series.nodes.template.label.text = "{name}";
        series.nodes.template.tooltipText = "{name}: [bold]{value}[/]";
        series.fontSize = 10;
        series.minRadius = 15;
        series.maxRadius = 40;
    }, []);
    return <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>;
};

export default BubleChart;
