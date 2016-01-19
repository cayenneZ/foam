/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

CLASS({
  package: 'foam.core',
  name: 'Enum',
  requires: [
    'foam.core.EnumValue'
  ],
  properties: [
    {
      name: 'name',
      defaultValueFn: function() {
        return this.id.split('.').pop();
      }
    },
    {
      name: 'package',
      defaultValueFn: function() {
        return this.id.split('.').slice(0, -1).join('.');
      }
    },
    {
      name: 'id',
    },
    {
      name: 'values',
      adapt: function(_, a) {
        // TODO: this should be a custom Property.fromJson implementation
        for ( var i = 0 ; i < a.length ; i++ ) {
          if ( ! this.EnumValue.isInstance(a[i]) ) {
            a[i] = this.EnumValue.create(a[i]);
          }
        }
        return a;
      }
    }
  ],
  methods: [
    function init() {
      for ( var i = 0 ; i < this.values.length ; i++ ) {
        var value = this.values[i];
        this[value.name] = value.value;
      }
    },
  ]
});
