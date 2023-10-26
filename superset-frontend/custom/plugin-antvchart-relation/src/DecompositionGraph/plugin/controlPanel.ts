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
import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  sections,
  sharedControls,
} from '@superset-ui/chart-controls';

const requiredEntity = {
  ...sharedControls.entity,
  clearable: false,
};

const requiredMetric = {
  ...sharedControls.metrics,
  clearable: false,
};

const optionalEntity = {
  ...sharedControls.entity,
  clearable: true,
  validators: [],
};

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (translated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an integer or decimal value
   */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'sourceID',
            config: {
              ...requiredEntity,
              label: t('Source Node'),
              description: t('Name of the source column'),
            },
          },
        ],
        [
          {
            name: 'targetID',
            config: {
              ...requiredEntity,
              label: t('Target Node'),
              description: t('Name of the Target column'),
            },
          },
        ],
        [
          {
            name: 'nodeLabel',
            config: {
              ...optionalEntity,
              label: t('Node Label'),
              description: t('Optional Label of the Node column.'),
            },
          },
        ],
        [
          {
            name: 'edgeLabel',
            config: {
              ...optionalEntity,
              label: t('Edge Label'),
              description: t('Optional Label of the Edge column.'),
            },
          },
        ],
        [
          {
            name: 'metrics',
            config: {
              ...sharedControls.metrics,
              label: t('Node Metric'),
              description: t('Metric for the Node column.'),
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],
        [
          {
            name: 'edgeMetric',
            config: {
              ...requiredMetric,
              label: t('Edge Metric'),
              description: t('Metric for the Edge column.'),
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },
    {
      label: t('Chart Controls'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'textColor',
            config: {
              type: 'ColorPickerControl',
              default: { r: 0, g: 0, b: 0, a: 1 },
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Text Color'),
              description: t('The color you want to see for text in the Node'),
            },
          },
        ],
        [
          {
            name: 'nodeColor',
            config: {
              type: 'ColorPickerControl',
              default: { r: 49, g: 72, b: 245, a: 1 },
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Node Color '),
              description: t('The color you want to see in the Node'),
            },
          },
        ],
        [
          {
            name: 'edgeColor',
            config: {
              type: 'ColorPickerControl',
              default: { r: 49, g: 72, b: 245, a: 1 },
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Edge Color '),
              description: t('The color you want to see in the Edge'),
            },
          },
        ],
        [
          {
            name: 'header_font_size',
            config: {
              type: 'SelectControl',
              label: t('Font Size'),
              default: 'xl',
              choices: [
                // [value, label]
                ['xxs', 'xx-small'],
                ['xs', 'x-small'],
                ['s', 'small'],
                ['m', 'medium'],
                ['l', 'large'],
                ['xl', 'x-large'],
                ['xxl', 'xx-large'],
              ],
              renderTrigger: true,
              description: t('The size of your header font'),
            },
          },
        ],
        [
          {
            name: 'edgeType',
            config: {
              type: 'SelectControl',
              default: 'cubic-horizontal',
              choices: [
                ['line', 'Line'],
                ['polyline', 'Polyline'],
                ['arc', 'Arc'],
                ['quadratic', 'Quadratic'],
                ['cubic', 'Cubic'],
                ['cubic-vertical', 'Cubic-vertical'],
                ['cubic-horizontal', 'Cubic-horizontal'],
                ['loop', 'Loop'],
              ],
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Edge Type'),
              description: t('The edge type you want to see in the Node'),
            },
          },
        ],
         [
          {
            name: 'nodeType',
            config: {
              type: 'SelectControl',
              default: 'Card',
              choices: [
                ['icon-node', 'Node'],
                ['indicator-card', 'Card'],
                ['circle', 'Circle'],
                ['rect', 'Rectangle'],
                ['ellipse', 'Ellipse'],
                ['diamond', 'Diamond'],
                ['triangle', 'Triangle'],
                ['star', 'Star'],
                ['image', 'Image'],
                ['modelRect', 'ModelRect'],
                ['donut', 'Donut'],
              ],
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Node Type'),
              description: t('The edge type you want to see in the Node'),
            },
          },
        ],
      ],
    },
  ],
};

export default config;
