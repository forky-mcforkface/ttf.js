/**
 * @license Released under the MIT license.
 *
 * <pre>
 * Copyright (c) 2013 ynakajima <yuhta.nakajima@gmail.com>
 *
 * Includes zocial-regular-webfont.ttf
 * https://github.com/samcollins/css-social-buttons/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * </pre>
 *
 * @fileoverview Spec of Table Class.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../src/Table.js') :
    global.ttfjs;

  if (typeof ttfjs.util === 'undefined') {
    ttfjs.util = {};
  }
  
  ttfjs.util.TTFDataView = (typeof require !== 'undefined') ?
    require('../../src/util/TTFDataView.js').util.TTFDataView :
    global.ttfjs.util.TTFDataView

  var jDataView = (typeof global.jDataView === 'undefined') ?
  require('../../vendor/jdataview') :
  global.jDataView;

  // test table
  function TestTable() {
     
    this.specs = [
      {
        name: 'v1_0',
        dataSpec: [
          {name: 'tableVersion', type: 'Fixed'},
          {name: 'numGlyphs', type: 'USHORT'},
          {name: 'flags', type: 'USHORT', isFlags: true}
        ]
      },
      {
        name: 'v2_0',
        dataSpec: [
          {name: 'tableVersion', type: 'Fixed'},
          {name: 'numGlyphs', type: 'USHORT'},
          {name: 'flags', type: 'USHORT', isFlags: true},
          {name: 'maxPoints', type: 'USHORT'},
          {name: 'maxContours', type: 'USHORT'}
        ]
      }
    ];

    ttfjs.Table.call(this)

  };
  TestTable.prototype = new ttfjs.Table();

  // spec
  describe('ttfjs.Table', function() {

    it('is Coonstructor', function() {
      expect(ttfjs.Table).toEqual(jasmine.any(Function));
    });

    describe('ttfjs.Table.createFromDataView_()', function() {

      var testData = jDataView.createBuffer(
        0x00, 0x01, 0x00, 0x00, // FIXED: 1.0
        0x0b, 0x4a, // USHORT: 2890
        0x00, 0x06, // SHORT: 00000000 00000110
        0x02, 0x9f, // USHORT: 671
        0x00, 0xb2  // USHORT: 178
      );
      var testDataView = new ttfjs.util.TTFDataView(new jDataView(testData));
      var tableOffset = 0;

      it('is method.', function() {
        expect(ttfjs.Table.createFromDataView_).toEqual(jasmine.any(Function));
      });

      it('create incetance from ttfDataView.', function() {
        var testTable = ttfjs.Table.createFromDataView_(TestTable, testDataView, tableOffset);
        expect(testTable.tableVersion).toEqual(1.0);
        expect(testTable.numGlyphs).toEqual(2890);
      });

    });

    describe('ttfjs.Table.isRequired()', function() {

      var table = new ttfjs.Table();

      it('is method', function() {
        expect(table.isRequired).toEqual(jasmine.any(Function));
      });

      it('default value is false', function() {
        expect(table.isRequired()).toEqual(false);
      });

    });

    describe('ttfjs.Table.getLongName', function() {

      it('is Function', function() {
        expect(ttfjs.Table.getLongName).toEqual(jasmine.any(Function));
      });

      it('has cmap that value is "CMap"', function() {
        expect(ttfjs.Table.getLongName('cmap')).toEqual('CMap');
      });

      it('has glyf that value is "GlyphData"', function() {
        expect(ttfjs.Table.getLongName('glyf')).toEqual('GlyphData');
      });

      it('has head that value is "FontHeader"', function() {
        expect(ttfjs.Table.getLongName('head')).toEqual('FontHeader');
      });

      it('has hhea that value is "HorizontalHeader"', function() {
        expect(ttfjs.Table.getLongName('hhea')).toEqual('HorizontalHeader');
      });

      it('has hmtx that value is "HorizontalMetrics"', function() {
        expect(ttfjs.Table.getLongName('hmtx')).toEqual('HorizontalMetrics');
      });

      it('has loca that value is "IndexToLocation"', function() {
        expect(ttfjs.Table.getLongName('loca')).toEqual('IndexToLocation');
      });

      it('has maxp that value is "MaximumProfile"', function() {
        expect(ttfjs.Table.getLongName('maxp')).toEqual('MaximumProfile');
      });

      it('has name that value is "Naming"', function() {
        expect(ttfjs.Table.getLongName('name')).toEqual('Naming');
      });

      it('has post that value is "PostScriptInformation"', function() {
        expect(ttfjs.Table.getLongName('post')).toEqual('PostScriptInformation');
      });

      it('has OS/2 that value is "OS2SpecificMetrics"', function() {
        expect(ttfjs.Table.getLongName('OS/2')).toEqual('OS2SpecificMetrics');
      });

      it('has cvt that value is "ControlValue"', function() {
        expect(ttfjs.Table.getLongName('cvt ')).toEqual('ControlValue');
      });

      it('has EBDT that value is "EmbeddedBitmapData"', function() {
        expect(ttfjs.Table.getLongName('EBDT')).toEqual('EmbeddedBitmapData');
      });

      it('has EBLC that value is "EmbeddedBitmapLocation"', function() {
        expect(ttfjs.Table.getLongName('EBLC')).toEqual('EmbeddedBitmapLocation');
      });

      it('has EBSC that value is "EmbeddedBitmapScaling"', function() {
        expect(ttfjs.Table.getLongName('EBSC')).toEqual('EmbeddedBitmapScaling');
      });

      it('has fpgm that value is "FontProgram"', function() {
        expect(ttfjs.Table.getLongName('fpgm')).toEqual('FontProgram');
      });

      it('has gasp that value is "GridFittingScanConversion"', function() {
        expect(ttfjs.Table.getLongName('gasp')).toEqual('GridFittingScanConversion');
      });

      it('has hdmx that value is "HoriontalDeviceMetrics"', function() {
        expect(ttfjs.Table.getLongName('hdmx')).toEqual('HoriontalDeviceMetrics');
      });

      it('has kern that value is "Kerning"', function() {
        expect(ttfjs.Table.getLongName('kern')).toEqual('Kerning');
      });

      it('has LTSH that value is "LinearThresholdData"', function() {
        expect(ttfjs.Table.getLongName('LTSH')).toEqual('LinearThresholdData');
      });

      it('has prep that value is "CVTProgram"', function() {
        expect(ttfjs.Table.getLongName('prep')).toEqual('CVTProgram');
      });

      it('has PCLT that value is "PCL5Data"', function() {
        expect(ttfjs.Table.getLongName('PCLT')).toEqual('PCL5Data');
      });

      it('has VDMX that value is "VerticalDeviceMetrics"', function() {
        expect(ttfjs.Table.getLongName('VDMX')).toEqual('VerticalDeviceMetrics');
      });

      it('has vhea that value is "VerticalMetricsHeader"', function() {
        expect(ttfjs.Table.getLongName('vhea')).toEqual('VerticalMetricsHeader');
      });

      it('has vmtx that value is "VerticalMetrics"', function() {
        expect(ttfjs.Table.getLongName('vmtx')).toEqual('VerticalMetrics');
      });


    });


    describe('ttfjs.Table.getShortName', function() {

      it('is Function', function() {
        expect(ttfjs.Table.getShortName).toEqual(jasmine.any(Function));
      });

      it('has CMap that value is "cmap"', function() {
        expect(ttfjs.Table.getShortName('CMap')).toEqual('cmap');
      });

      it('has GlyphData that value is "glyf"', function() {
        expect(ttfjs.Table.getShortName('GlyphData')).toEqual('glyf');
      });

      it('has FontHeader that value is "head"', function() {
        expect(ttfjs.Table.getShortName('FontHeader')).toEqual('head');
      });

      it('has HorizontalHeader that value is "hhea"', function() {
        expect(ttfjs.Table.getShortName('HorizontalHeader')).toEqual('hhea');
      });

      it('has HorizontalMetrics that value is "hmtx"', function() {
        expect(ttfjs.Table.getShortName('HorizontalMetrics')).toEqual('hmtx');
      });

      it('has IndexToLocation that value is "loca"', function() {
        expect(ttfjs.Table.getShortName('IndexToLocation')).toEqual('loca');
      });

      it('has MaximumProfile that value is "maxp"', function() {
        expect(ttfjs.Table.getShortName('MaximumProfile')).toEqual('maxp');
      });

      it('has Naming that value is "name"', function() {
        expect(ttfjs.Table.getShortName('Naming')).toEqual('name');
      });

      it('has PostScriptInformation that value is "post"', function() {
        expect(ttfjs.Table.getShortName('PostScriptInformation')).toEqual('post');
      });

      it('has OS2SpecificMetrics that value is "OS/2"', function() {
        expect(ttfjs.Table.getShortName('OS2SpecificMetrics')).toEqual('OS/2');
      });

      it('has ControlValue that value is "cvt "', function() {
        expect(ttfjs.Table.getShortName('ControlValue')).toEqual('cvt ');
      });

      it('has EmbeddedBitmapData that value is "EBDT"', function() {
        expect(ttfjs.Table.getShortName('EmbeddedBitmapData')).toEqual('EBDT');
      });

      it('has EmbeddedBitmapLocation that value is "EBLC"', function() {
        expect(ttfjs.Table.getShortName('EmbeddedBitmapLocation')).toEqual('EBLC');
      });

      it('has EmbeddedBitmapScaling that value is "EBSC"', function() {
        expect(ttfjs.Table.getShortName('EmbeddedBitmapScaling')).toEqual('EBSC');
      });

      it('has FontProgram that value is "fpgm"', function() {
        expect(ttfjs.Table.getShortName('FontProgram')).toEqual('fpgm');
      });

      it('has GridFittingScanConversion that value is "gasp"', function() {
        expect(ttfjs.Table.getShortName('GridFittingScanConversion')).toEqual('gasp');
      });

      it('has HoriontalDeviceMetrics that value is "hdmx"', function() {
        expect(ttfjs.Table.getShortName('HoriontalDeviceMetrics')).toEqual('hdmx');
      });

      it('has Kerning that value is "kern"', function() {
        expect(ttfjs.Table.getShortName('Kerning')).toEqual('kern');
      });

      it('has LinearThresholdData that value is "LTSH"', function() {
        expect(ttfjs.Table.getShortName('LinearThresholdData')).toEqual('LTSH');
      });

      it('has CVTProgram that value is "prep"', function() {
        expect(ttfjs.Table.getShortName('CVTProgram')).toEqual('prep');
      });

      it('has PCL5Data that value is "PCLT"', function() {
        expect(ttfjs.Table.getShortName('PCL5Data')).toEqual('PCLT');
      });

      it('has VerticalDeviceMetrics that value is "VDMX"', function() {
        expect(ttfjs.Table.getShortName('VerticalDeviceMetrics')).toEqual('VDMX');
      });

      it('has VerticalMetricsHeader that value is "vhea"', function() {
        expect(ttfjs.Table.getShortName('VerticalMetricsHeader')).toEqual('vhea');
      });

      it('has VerticalMetrics that value is "vmtx"', function() {
        expect(ttfjs.Table.getShortName('VerticalMetrics')).toEqual('vmtx');
      });

    });

  });

  describe('ttfjs.Table.specs', function() {

    var table = new ttfjs.Table();

    it('is Object', function() {
      expect(table.specs).toEqual(jasmine.any(Object));
    });

  });

  describe('ttfjs.Table.spec', function() {

    var testTable = new TestTable();

    it('is Object', function() {
      expect(testTable.spec).toEqual(jasmine.any(Object));
      expect(testTable.spec).toEqual({
        dataList: ['tableVersion', 'numGlyphs', 'flags'],
        dataSpec: {
          'tableVersion': {
            type: 'FIXED',
            offset: 0,
            isFlags: false
          },
          'numGlyphs': {
            type: 'USHORT',
            offset: 4,
            isFlags: false
          },
          'flags': {
             type: 'USHORT',
             offset: 6,
             isFlags: true
          }
        }
      });
    });

  });

  describe('ttfjs.Table.getSpecByName', function() {
    
    var testTable = new TestTable();

    it('is Function', function() {
      expect(testTable.getSpecByName).toEqual(jasmine.any(Function));
    });

    it('returns the specification of the given name.', function() {
      expect(testTable.getSpecByName('v1_0')).toEqual(testTable.specs[0]);
    });


  });

  describe('ttfjs.Table.setSpec', function(){

    var testTable = new TestTable();
          
    it('is Function', function() {
      expect(testTable.setSpec).toEqual(jasmine.any(Function));
    });

    it('init and set spec data', function() {

      testTable.setSpec('v1_0');
      expect(testTable.spec.dataList).toEqual(['tableVersion', 'numGlyphs', 'flags']);
      expect(testTable.spec.dataSpec).toEqual({
        'tableVersion': {
          type: 'FIXED',
          offset: 0,
          isFlags: false
        },
        'numGlyphs': {
          type: 'USHORT',
          offset: 4,
          isFlags: false
        },
        'flags': { 
          type: 'USHORT',
          offset: 6,
          isFlags: true
        }
      });

      testTable.setSpec('v2_0');
      expect(testTable.spec.dataList).toEqual(['tableVersion', 'numGlyphs', 'flags', 'maxPoints', 'maxContours']);
      expect(testTable.spec.dataSpec).toEqual({
        'tableVersion': {
          type: 'FIXED',
          offset: 0,
          isFlags: false
        },
        'numGlyphs': {
          type: 'USHORT',
          offset: 4,
          isFlags: false
        },
        'flags': { 
          type: 'USHORT',
          offset: 6,
          isFlags: true
        },
        'maxPoints': {
          type: 'USHORT',
          offset: 8,
          isFlags: false
        },
        'maxContours': {
          type: 'USHORT',
          offset: 10,
          isFlags: false
        }
      });

    });

  });

  describe('ttfjs.Table.setDataFromDataView', function(){

    var testTable = new TestTable();
    testTable.setSpec('v2_0');

    var testData = jDataView.createBuffer(
      0x00, 0x01, 0x00, 0x00, // FIXED: 1.0
      0x0b, 0x4a, // USHORT: 2890
      0x00, 0x06, // SHORT: 00000000 00000110
      0x02, 0x9f, // USHORT: 671
      0x00, 0xb2  // USHORT: 178
    );
    var testDataView = new ttfjs.util.TTFDataView(new jDataView(testData));
    var tableOffset = 0;
          
    it('is Function', function() {
      expect(testTable.setSpec).toEqual(jasmine.any(Function));
    });

    it('set data based on the specified ttfDataView', function() {
      testTable.setDataFromDataView('tableVersion', testDataView, tableOffset);
      testTable.setDataFromDataView('numGlyphs', testDataView, tableOffset);
      testTable.setDataFromDataView('flags', testDataView, tableOffset);
      testTable.setDataFromDataView('maxPoints', testDataView, tableOffset);
      testTable.setDataFromDataView('maxContours', testDataView, tableOffset);
      expect(testTable.tableVersion).toEqual(1.0);
      expect(testTable.numGlyphs).toEqual(2890);
      expect(testTable.flags).toEqual([
        false, true, true, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
      ]);
      expect(testTable.maxPoints).toEqual(671);
      expect(testTable.maxContours).toEqual(178);
    });

  });

})(this);
