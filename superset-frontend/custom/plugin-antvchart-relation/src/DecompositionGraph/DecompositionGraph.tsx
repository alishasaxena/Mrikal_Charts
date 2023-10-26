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
import React, { useEffect, createRef } from 'react';
// import { styled } from "@superset-ui/core";
import { DecompositionTreeGraph } from '@ant-design/charts';
import { GraphChartProps, ChartStylesProps } from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function DecompositionGraph(props: GraphChartProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const {
    data,
    textColor,
    nodeColor,
    edgeType,
    edgeColor,
    nodeType,
    height,
    width,
  } = props;
  console.log(edgeType, 'textz');
  const config = {
    data,
    nodeCfg: {
      type: nodeType,
      size: [140, 25],
      items: {
        containerStyle: {
          fill: '#fff',
        },
        padding: 6,
        style: (cfg, group, type) => {
          const styles = {
            icon: {
              width: 12,
              height: 12,
            },
            value: {
              fill: `rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`,
            },
            text: {
              fill: `rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`,
            },
          };
          return styles[type];
        },
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 2,
        },
      },
      title: {
        containerStyle: {
          fill: `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, ${nodeColor.a})`,
        },
        style: {
          fill: `rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`,
          fontSize: 12,
        },
      },
      style: (arg: any) => ({
        fill: '#fff',
        radius: 2,
        stroke:
          arg.value.percent > 0.3
            ? stroke
            : `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, ${nodeColor.a})`,
      }),
    },
    edgeCfg: {
      type: edgeType,
      label: {
        style: {
          fill: '#aaa',
          fontSize: 12,
          fillOpacity: 1,
        },
      },
      style: (edge: any) => ({
        stroke: `rgba(${edgeColor.r}, ${edgeColor.g}, ${edgeColor.b}, ${edgeColor.a})`,
        strokeOpacity: 0.5,
      }),
      endArrow: {
        fill: `rgba(${edgeColor.r}, ${edgeColor.g}, ${edgeColor.b}, ${edgeColor.a})`,
      },
      edgeStateStyles: {
        hover: {
          strokeOpacity: 1,
        },
      },
    },
    markerCfg: (cfg: any) => ({
      position: 'right',
      show: cfg.children?.length,
      style: arg => ({
        stroke: arg.value.percent > 0.3 ? stroke : '#fff',
      }),
    }),
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };
  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);

  return <DecompositionTreeGraph {...config} />;
}
