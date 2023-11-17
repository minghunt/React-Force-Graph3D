import React, { SyntheticEvent } from "react";
import { AnimatedTree } from "react-tree-graph";
// import "./Chart.css"
import "react-tree-graph/dist/style.css";
function TreeGrap() {
    const customText = (
        <>
            <text dx="30" className="!fill-[red]">
                AB
            </text>
            <text>BBBB</text>
        </>
    );
    const styleSVG = {
        nodeParent: "fill-[#01bcfa] font-semibold",
        globalPath: "stroke-[#2593B8] stroke-2 fill-none ",
        globalText: "text-xs text-gray-300 font-semibold",
        globalG: "cursor-pointer fill-[#fff]",
    };
    const data = {
        name: "Parent",
        label: "Parent",
        gProps: {
            className: styleSVG.nodeParent,
        },
        textProps: {
            dy: 20,
            dx: -6.5,
            className: "text-md",
        },
        children: [
            {
                label: customText,
                name: "Child 1",
            },
            {
                label: "child 2",
                name: "Child 2",
                children: [
                    {
                        label: "child 7",
                        name: "Child 7",
                    },
                    {
                        label: "child 8",
                        name: "Child 8",
                    },
                ],
            },
            {
                label: "child 3",
                name: "Child 3",
            },
            {
                label: "child 4",
                name: "Child 4",
            },
            {
                label: "child 5",
                name: "Child 5",
            },
        ],
    };

    const ClickMe = (e: SyntheticEvent, nameNode: string) => {
        console.log("node ", e.type);
        if (e.type == "click") {
            alert(`Chuột trái ${nameNode}`);
        } else {
            alert(`Chuột phải ${nameNode}`);
        }
    };
    return (
        <AnimatedTree
            pathProps={{ className: styleSVG.globalPath }}
            gProps={{
                onClick: (e: any, nodeKey: any) => ClickMe(e, nodeKey),
                onContextMenu: (e: any, nodeKey: any) => ClickMe(e, nodeKey),
                className: styleSVG.globalG,
            }}
            steps={30}
            labelProp="label"
            textProps={{
                className: styleSVG.globalText,
            }}
            // nodeProps={{
            //     className:'cursor-pointer'
            // }}

            data={data}
            height={400}
            width={500}
        />
    );
}

export default TreeGrap;
