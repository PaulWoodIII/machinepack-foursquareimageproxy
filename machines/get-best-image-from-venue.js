var Foursquare = require('machinepack-foursquare');

module.exports = {

  friendlyName: 'get best image from venue',

  description: 'get the best image of a venue based on the foursqaure id',

  extendedDescription: 'This function will take the Foursquare venue ID as input and query the foursquare API on the user\'s behalf to get the JSON response of the venue detail, then return the image url of the best image',

  cacheable: false,

  sync: false,

  inputs: {
    id: {
      description: 'The unique id for a Venue',
      example: '40b28c80f964a5204df81ee3',
      required: true
    },
    client_id: {
      example: 'XYRA11GEUJ0GQSS4APL0VXCI1GZIHVRBQQIR0XB32GIEDUYT',
      description: 'Your Foursquare app CLIENT_ID',
      required: true
    },
    client_secret: {
      example: 'H4JII1UI2AQK5VH4G1CASEN3XWFXM2KTY0OUWVKYZSZERR30',
      description: 'Your Foursquare app CLIENT_SECRET',
      required: true
    },
    size: {
      example:'width640',
      description: 'size string',
      required: false
    }
  },

  exits: {
    success: {
      variableName: 'result',
      description: 'Done.',
    }
  },

  fn: function(inputs, exits) {
    /**  
    Control Flow:
    * Verify Inputs -> Return if there is an error
    * Connect to foursquare API to get the venue response
    * parse and return the URL string
    */

    Foursquare.getVenue(inputs).exec({
      // An unexpected error occurred.
      error: function(err) {
        return exits.error(err);
      },
      // OK.
      success: function(output) {
        var venue = output.venue;
        var returnValue = venue.bestPhoto.prefix + "width640" + venue.bestPhoto.suffix
        return exits.success(returnValue);
      },
    });
  },
};
