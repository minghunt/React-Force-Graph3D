/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// @ts-ignore
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import "./ActtackMap.css";

const Map = () => {
    // ===== data test start ========
    const cities = [
        {
            title: "Brussels",
            type: "oas",
            latitude: 50.8371,
            longitude: 4.3676,
        },
        {
            title: "Copenhagen",
            type: "ods",
            latitude: 55.6763,
            longitude: 12.5681,
        },
        {
            title: "Paris",
            type: "bad",
            latitude: 48.8567,
            longitude: 2.351,
        },
        {
            title: "Reykjavik",
            type: "mav",
            latitude: 64.1353,
            longitude: -21.8952,
        },
        {
            title: "Moscow",
            type: "wav",
            latitude: 55.7558,
            longitude: 37.6176,
        },
        {
            title: "Madrid",
            type: "ids",
            latitude: 40.4167,
            longitude: -3.7033,
        },
        {
            title: "London",
            type: "vul",
            latitude: 51.5002,
            longitude: -0.1262,
        },
        {
            title: "Peking",
            type: "kas",
            latitude: 39.9056,
            longitude: 116.3958,
        },
        {
            title: "New Delhi",
            type: "rmw",
            latitude: 28.6353,
            longitude: 77.225,
        },
        {
            title: "Tokyo",
            type: "vul",
            latitude: 35.6785,
            longitude: 139.6823,
            url: "http://www.google.co.jp",
        },
        {
            title: "Ankara",
            type: "bad",
            latitude: 39.9439,
            longitude: 32.856,
        },
        {
            title: "Buenos Aires",
            latitude: -34.6118,
            longitude: -58.4173,
        },
        {
            title: "Brasilia",
            latitude: -15.7801,
            longitude: -47.9292,
        },
        {
            title: "Washington",
            latitude: 38.8921,
            longitude: -77.0241,
        },
        {
            title: "Kinshasa",
            latitude: -4.3369,
            longitude: 15.3271,
        },
        {
            title: "Cairo",
            latitude: 30.0571,
            longitude: 31.2272,
        },
        {
            title: "Pretoria",
            latitude: -25.7463,
            longitude: 28.1876,
        },
        {
            title: "hurae",
            latitude: -21,
            longitude: 24.4645,
        },
        {
            title: "kalan",
            latitude: -24.7463,
            longitude: 19.1876,
        },
        {
            title: "wanta",
            latitude: -14.7463,
            longitude: 17.1876,
        },
    ];

    /*  const changeMap=true; */

    // ============ data test end ============
    const vietnamCoords = { latitude: 10.762622, longitude: 106.660172 };
    useEffect(() => {
        var AttackMap = am4core.create("map", am4maps.MapChart); // ==== create chart root : name chartdiv

        // Set map definition
        AttackMap.geodata = am4geodata_worldLow;

        // Set projection
        AttackMap.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = AttackMap.series.push(
            new am4maps.MapPolygonSeries()
        );

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#00004680");
        polygonTemplate.fillOpacity = 1;
        polygonTemplate.strokeWidth = 0.4;

        // Remove Antarctica
        polygonSeries.exclude = ["AQ"];

        //===== hover polygon start ==========
        let hoverChart = polygonTemplate.states.create("hover");
        //===== hover polygon end ==========

        // Create image series

        var imageSeries = AttackMap.series.push(new am4maps.MapImageSeries());
        var imageSeriesTemplate = imageSeries.mapImages.template;
        // var circle = imageSeriesTemplate.createChild(am4core.Circle);
        // circle.radius = 5;
        // circle.fill = am4core.color("#ff0000");
        // circle.stroke = am4core.color("#000000");
        // circle.strokeWidth = 1;
        // circle.nonScaling = true;
        // circle.tooltipText = "{title}";
        // circle.strokeOpacity = 0;

        // Set property fields
        imageSeriesTemplate.propertyFields.latitude = "latitude";
        imageSeriesTemplate.propertyFields.longitude = "longitude";

        // ==== effect circle ( scale && strokeopacity) ====
        var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle.radius = 3;
        // circle.propertyFields.fill = "color";
        circle.nonScaling = true;

        var circle2 = imageSeries.mapImages.template.createChild(
            am4core.Circle
        );
        circle2.radius = 3;
        // circle2.propertyFields.fill = "color";

        circle2.events.on("inited", function (event) {
            animateBullet(event.target);
        });

        function animateBullet(circle: any) {
            var animation = circle.animate(
                [
                    {
                        property: "scale",
                        from: 1 / AttackMap.zoomLevel,
                        to: 15 / AttackMap.zoomLevel,
                    },
                    { property: "opacity", from: 1, to: 0 },
                ],
                1000,
                am4core.ease.circleOut
            );
            animation.events.on("animationended", function (event: any) {
                animateBullet(event.target.object);
            });
        }

        // Add line series
        var lineSeries = AttackMap.series.push(new am4maps.MapLineSeries());
        lineSeries.mapLines.template.strokeWidth = 1.5;
        // lineSeries.mapLines.template.stroke = am4core.color("#ff0000");
        lineSeries.mapLines.template.nonScalingStroke = true;
        lineSeries.mapLines.template.shortestDistance = true; //=== độ cong của line theo map

        var line = lineSeries.mapLines.create();
        line.stroke = am4core.color("#00ffff");
        line.id = "myline";
        line.setClassName();

        //==== set gradiient start ====
        // let gradient = new am4core.LinearGradient();
        // gradient.addColor(am4core.color("#ee82ee"))
        // gradient.addColor(am4core.color("#ee82ee80"))

        //==== set gradiient end ====
        // ====== test data ========
        const intervelId = setInterval(() => {
            let idCity = Math.floor(Math.random() * cities.length);
            var randomCity = cities[idCity];
            addCityLine(randomCity);
            addCity(randomCity);
            switch (randomCity.type) {
                case "oas":
                    line.stroke = am4core.color("#ff0000");
                    circle2.propertyFields.fill = am4core.color(
                        "#ff0000"
                    ) as any;
                    circle.propertyFields.fill = am4core.color(
                        "#ff0000"
                    ) as any;

                    break;
                case "osd":
                    line.stroke = am4core.color("#008000");
                    circle2.propertyFields.fill = am4core.color(
                        "#008000"
                    ) as any;
                    circle.propertyFields.fill = am4core.color(
                        "#008000"
                    ) as any;

                    break;
                case "bad":
                    line.stroke = am4core.color("#ffd700");
                    circle2.fill = am4core.color("#ffd700");
                    circle.fill = am4core.color("#ffd700");

                    break;
                case "mav":
                    line.stroke = am4core.color("#00ffff");
                    circle2.fill = am4core.color("#00ffff");
                    circle.fill = am4core.color("#00ffff");

                    break;
                case "wav":
                    line.stroke = am4core.color("#d2691e");
                    circle2.fill = am4core.color("#d2691e");
                    circle.fill = am4core.color("#d2691e");

                    break;
                case "ids":
                    line.stroke = am4core.color("#ff69b4");
                    circle2.fill = am4core.color("#ff0000");
                    circle.fill = am4core.color("#ff0000");

                    break;
                case "vul":
                    line.stroke = am4core.color("#808000");
                    circle2.fill = am4core.color("#808000");
                    circle.fill = am4core.color("#808000");

                    break;
                case "kas":
                    line.stroke = am4core.color("#4682b4");
                    circle2.fill = am4core.color("#4682b4");
                    circle.fill = am4core.color("#4682b4");

                    break;
                case "rmw":
                    line.stroke = am4core.color("#ee82ee");
                    circle2.fill = am4core.color("#ee82ee");
                    circle.fill = am4core.color("#ee82ee");

                    break;

                default:
                    // circle.fill = am4core.color("#ee82ee");
                    line.stroke = am4core.color("#ee82ee");
                    circle2.fill = am4core.color("#ff0000");
                    circle.fill = am4core.color("#ff0000");

                    break;
            }
        }, 3000);

        function addCity(city: any) {
            imageSeries.data = [
                city,
                {
                    latitude: vietnamCoords.latitude,
                    longitude: vietnamCoords.longitude,
                },
            ];

            imageSeries.mapImages.each((image) => {
                let circle: any = image.children.getIndex(0);
                circle.radius = 3;
                animateBullet(circle);
            });
        }
        // ==== funct add 2 point end ====

        // ==== funct add line start ====
        function addCityLine(city: any) {
            line.multiGeoLine = [
                [
                    { latitude: city.latitude, longitude: city.longitude },
                    {
                        latitude: vietnamCoords.latitude,
                        longitude: vietnamCoords.longitude,
                    },
                ],
            ];
        }
        // ==== funct add line end ====

        //=== button change map =====
        let button: any = AttackMap.createChild(am4core.SwitchButton);
        button.align = "right";
        button.marginTop = 20;
        button.marginRight = 20;
        button.valign = "top";
        button.leftLabel!.text = "Map";
        button.leftLabel.fill = "white";
        button.rightLabel!.text = "Globe";
        button.rightLabel.fill = "white";

        button.events.on("toggled", function () {
            AttackMap.deltaLatitude = 0;
            AttackMap.deltaLongitude = 0;
            AttackMap.deltaGamma = 0;

            if (button.isActive) {
                AttackMap.projection = new am4maps.projections.Orthographic();
                AttackMap.panBehavior = "rotateLongLat";
            } else {
                AttackMap.projection = new am4maps.projections.Miller();
                AttackMap.panBehavior = "move";
            }
        });

        // polygonSeries.events.on("datavalidated", function () {
        //     labelSeries.data = polygonSeries.data;
        // })

        AttackMap.appear();
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#192655ab");
        polygonTemplate.fillOpacity = 1;
        polygonTemplate.strokeWidth = 1.5;
        polygonTemplate.stroke = am4core.color("#36b7ff");
        hoverChart.properties.fill = am4core.color("#0C356A");

        // Thêm adapter để thay đổi màu sắc dựa trên định danh quốc gia
        polygonTemplate.adapter.add("fill", function (fill, target) {
            if (target.dataItem && target.dataItem.dataContext) {
                var id = target.dataItem.dataContext.id;
                if (id === "VN") {
                    // Mã ISO của Việt Nam
                    return am4core.color("#ff0000ab"); // Màu đỏ
                }
            }
            return fill;
        });
        return () => {
            AttackMap.dispose();
            clearInterval(intervelId);
            // butt_switch_map.removeEventListener("click", changeMapAttack);
        };
    }, []);

    return (
        <>
            <div className="container-fluid h-full">
                <div id="map" style={{ width: "100%", height: "100%" }}></div>
            </div>
        </>
    );
};

export default Map;
