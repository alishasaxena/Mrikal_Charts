/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from "react";
// import { styled } from "@superset-ui/core";
// import { GraphChartProps, ChartStylesProps } from "../types";
import { RadialGraph } from "@ant-design/graphs";

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

// const Styles = styled.div<RadialChartStylesProps>`
//   background-color: ${({ theme }) => theme.colors.secondary.light2};
//   padding: ${({ theme }) => theme.gridUnit * 4}px;
//   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
//   height: ${({ height }) => height}px;
//   width: ${({ width }) => width}px;

//   h3 {
//     /* You can use your props to control CSS! */
//     margin-top: 0;
//     margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
//     font-size: ${({ theme, headerFontSize }) =>
//       theme.typography.sizes[headerFontSize]}px;
//     font-weight: ${({ theme, boldText }) =>
//       theme.typography.weights[boldText ? 'bold' : 'normal']};
//   }

//   pre {
//     height: ${({ theme, headerFontSize, height }) =>
//       height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
//   }
// `;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function RadialChart(props: any) {
  // const chartRef = useRef();

  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data } = props;
  const nodeBack = props.color;
  const text = props.textColor;
  // const { edgeMax } = props;
  // const { edgeMin } = props;

  const { nodeMax } = props;
  const { nodeMin } = props;
  const node_strength = props.nodeStrength;
  // const edge_strength = props.edgeStrength;

  console.log(text);

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log("Plugin element", root);
  });

  console.log(data, "alizeh");
  const config: any = {
    data,
    autoFit: false,
    layout: {
      unitRadius: 80,
      nodeSize: 20,
      nodeSpacing: 10,
    },
    labelCfg: {
      style: {
        fontSize: 5,
        fill: "#000",
      },
    },
    edgeCfg: {
      style: {
        lineWidth: 1,
      },
      endArrow: {
        d: 10,
        size: 2,
      },
    },

    nodeCfg: {
      data,
      size: 20,
      style: {
        fill: `rgba(${text.r}, ${text.g}, ${text.b}, ${text.a})`,
        stroke: '#6CE8DC',
      },
      labelCfg: {
        style: {
          fontSize: 5,
          fill: "#000",
        },
      },
    },

    // nodeCfg: {
    //   type: "fund-card",
    //   label: {
    //     style: (node: any) => {
    //       if (node.id === "start") {
    //         return {
    //           fill: "green",
    //         };
    //       }
    //       if (node.id === "end") {
    //         return {
    //           fill: "red",
    //         };
    //       }
    //       if (node.label === "") {
    //         return {
    //           text: `${node.label}`,
    //           fill: `rgba(${text.r}, ${text.g}, ${text.b}, ${text.a})`,
    //         };
    //       }
    //       return {
    //         text: `${node.label}`,
    //         fill: `rgba(${text.r}, ${text.g}, ${text.b}, ${text.a})`,
    //       };
    //     },
    //   },
    //   style: (node: any) => {
    //     let opacity = nodeBack.a;
    //     if (node.label !== undefined && node_strength) {
    //       opacity = (node.label - nodeMin) / (nodeMax - nodeMin);
    //     }

    //     if (node.id === "start") {
    //       return {
    //         stroke: "green",
    //         lineWidth: 5,
    //       };
    //     }
    //     if (node.id === "end") {
    //       return {
    //         stroke: "red",
    //         lineWidth: 5,
    //       };
    //     }

    //     return {
    //       fill: `rgba(${nodeBack.r}, ${nodeBack.g}, ${nodeBack.b}, ${opacity})`,
    //       lineWidth: 2,
    //     };
    //   },

    //   size: [10, 7],
    // },

    // edgeCfg: {
    //   style: (edge: any) => {
    //     let val = 1;
    //     if (edge.value.metric !== undefined && edge_strength)
    //       val = (edge.value.metric - edgeMin) / (edgeMax - edgeMin);

    //     return {
    //       lineWidth: 2 * val,
    //       stroke: "#1890ff",
    //     };
    //   },
    //   edgeStateStyles: {
    //     hover: {
    //       stroke: "#1890ff",
    //       lineWidth: 5,
    //       endArrow: {
    //         fill: "#1890ff",
    //       },
    //     },
    //   },
    // },

    // markerCfg: (cfg: any) => {
    //   const { edges } = data;
    //   return {
    //     position: "right",
    //     show: edges.find((item: any) => item.source === cfg.id),
    //   };
    // },
  };

  console.log("Plugin props", props);

  return <RadialGraph {...config} />;
}
