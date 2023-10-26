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
import { styled } from "@superset-ui/core";
import { GraphChartProps, ChartStylesProps } from "../types";
import { OrganizationalGraph } from "@ant-design/charts";

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

// const Styles = styled.div<OrganizationGraphStylesProps>`
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

export default function OrganizationGraph(props: GraphChartProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width } = props;

  const getTextStyle = (level: any) => {
    switch (level) {
      case 1:
        return 18;
      case 2:
        return 12;
      default:
        return 12;
    }
  };

  const getRootTextAttrs = () => {
    return {
      fontSize: getTextStyle(1),
      fontWeight: "bold",
      fill: "#fff",
    };
  };

  const getSecondTextStyle = () => {
    return {
      fontSize: getTextStyle(2),
      color: "#000",
    };
  };

  const getRootNodeStyle = () => {
    return {
      fill: "#1E88E5",
      stroke: "#1E88E5",
      radius: 5,
    };
  };

  const getSecondNodeStyle = () => {
    return {
      fill: "#e8e8e8",
      stroke: "#e8e8e8",
      radius: 5,
    };
  };

  const calcStrLen = function calcStrLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  };
  console.log(data, "alizeh");

  const config = {
    data,
    nodeCfg: {
      size: [40, 40],
      autoWidth: true,
      padding: 10,
      style: (item: any) => {
        const { level } = item.value;
        return {
          fill: "transparent",
          stroke: "transparent",
          radius: 4,
          cursor: "pointer",
          ...(level === 1 ? getRootNodeStyle() : {}),
          ...(level === 2 ? getSecondNodeStyle() : {}),
        };
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 2,
          stroke: "#96DEFF",
        },
      },
      label: {
        style: (cfg: any, group: any, type: any) => {
          const { level, href } = cfg.value;

          if (type !== "name") {
            return {};
          }
          return {
            // fontSize: getTextStyle(),
            cursor: "pointer",
            fill: href ? "#1890ff" : "#000",
            ...(level === 1 ? getRootTextAttrs() : {}),
            ...(level === 2 ? getSecondTextStyle() : {}),
          };
        },
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    edgeCfg: {
      type: "polyline",
      style: {
        stroke: "#000",
        endArrow: false,
      },
    },
    markerCfg: (cfg: any) => {
      const { level, direction } = cfg.value;
      const show = level !== 1 && cfg.children && cfg.children.length > 0;
      return {
        position: direction,
        show,
      };
    },
    autoFit: true,
    fitCenter: true,
    animate: false,
    behaviors: ["drag-canvas", "zoom-canvas"],
    onReady: (graph: any) => {
      graph.on("node:click", (evt: any) => {
        const { item, target } = evt;
        const { value } = item.get("model");
        if (value.href) {
          window.open(value.href);
        }
      });
    },
  };

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log("Plugin element", root);
  });

  console.log("Plugin props", props);

  return <OrganizationalGraph {...config} />;
}
