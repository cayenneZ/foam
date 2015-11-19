/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

CLASS({
  package: 'com.google.nbuEDU',
  name: 'ClientSignup',

  requires: [
    'foam.u2.Element',
    'foam.u2.md.Select',
  ],

  imports: [
    'currentUser',
    'streamDAO',
    'createStreamItem',
    'stack',
  ],

  properties: [
    {
      name: 'sid',
    },
    {
      model_: 'StringProperty',
      name: 'titleText',
      defaultValue: 'EDU-Connect Sign Up',
    },
    {
      model_: 'StringProperty',
      name: 'description',
      defaultValue: 'Please choose your location and school board:',
    },
    {
      name: 'language',
      defaultValue: 'English',
      toPropertyE: function(X) {
        return X.data.Select.create({ choices: X.data.languageDAO }, X);
      }
    },
    {
      model_: 'IntProperty',
      name: 'age',
      label: 'How many years old are you?',
    },
    {
      name: 'location',
      toPropertyE: function(X) {
        return X.data.Select.create({ choices: X.data.locationDAO }, X);
      }
    },
    {
      name: 'schoolBoard',
      toPropertyE: function(X) {
        return X.data.Select.create({ choices: X.data.schoolBoardDAO }, X);
      }
    },

    {
      model_: 'StringArrayProperty',
      name: 'languageDAO',
      hidden: true,
      lazyFactory: function() {
        return [
          'English',
          'Hindi',
        ];
      },
    },
    {
      model_: 'StringArrayProperty',
      name: 'schoolBoardDAO',
      hidden: true,
      lazyFactory: function() {
        return [
          'Board A',
          'Board B',
          'Board C',
        ];
      },
    },
    {
      model_: 'StringArrayProperty',
      name: 'locationDAO',
      hidden: true,
      lazyFactory: function() {
        return [
          'District 7',
          'District 8',
          'District 9',
        ];
      },
    }
  ],

  actions: [
    {
      name: 'done',
      code: function() {
        // save 'this' to the streamDAO for sync to the server.
        // Something on the server should be listening for the sid that
        // was set on this.
        this.streamDAO.put(this.createStreamItem(this.sid, this, this.sid));
        this.stack && this.stack.popView();
      }
    },
  ],

  methods: [
    // TODO(markdittmer): We should use model-for-model or similar here.
    function toDetailE(X) {
      var Y = X || this.Y;
      return this.Element.create(null, Y.sub({data: this}))
        .start().style({
          'display': 'flex',
          'flex-direction': 'column',
        })
          .start().style({ 'margin': '16px', 'overflow-y': 'auto' })
            .start().add(this.titleText$).cls('md-title').end()
            .start().add(this.description$).cls('md-subhead').end()
            .start().add(this.LANGUAGE).end()
            .start().add(this.AGE.label).add(this.AGE).cls('md-style-trait-standard').end()
            .start().add(this.LOCATION).end()
            .start().add(this.SCHOOL_BOARD).end()
            .add(this.DONE)
          .end()
        .end();
    },
  ],
});