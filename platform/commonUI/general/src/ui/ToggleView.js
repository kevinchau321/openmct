/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define([
    'angular',
    'text!../../res/templates/tree/toggle.html'
], function (angular, toggleTemplate) {
    function ToggleView(state) {
        this.expanded = !!state;
        this.callbacks = [];
        this.el = angular.element(toggleTemplate);
        this.el.on('click', function () {
            this.model(!this.expanded);
        }.bind(this));
    }

    ToggleView.prototype.model = function (state) {
        this.expanded = state;

        if (state) {
            this.el.addClass('expanded');
        } else {
            this.el.removeClass('expanded');
        }

        this.callbacks.forEach(function (callback) {
            callback(state);
        });
    };

    ToggleView.prototype.observe = function (callback) {
        this.callbacks.push(callback);
        return function () {
            this.callbacks = this.callbacks.filter(function (c) {
                return c !== callback;
            });
        }.bind(this);
    };

    ToggleView.prototype.elements = function () {
        return this.el;
    };

    return ToggleView;
});
