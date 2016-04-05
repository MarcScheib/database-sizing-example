"bundle";!function(){var a=System.amdDefine;a("app.html!github:systemjs/plugin-text@0.0.4.js",[],function(){return'<template> <require from="./number-format"></require> <require from="./navigation.html"></require> <header> <navigation></navigation> </header> <main> <div class="container-fluid" id="content-container"> <div class="row"> <div class="col-lg-6 col-xs-12"> <table class="table"> <thead class="thead-inverse"> <tr> <th></th> <th>Size per Day</th> <th>Size per Week</th> <th>Size per Year</th> </tr> </thead> <tbody> <tr class="table-info"> <th>Overall Size</th> <td>${sizePerDay | numberFormat}</td> <td>${sizePerWeek | numberFormat}</td> <td>${sizePerYear | numberFormat}</td> </tr> </tbody> </table> <table class="table"> <thead class="thead-inverse"> <tr> <th>Custom Time</th> <th>Non-Aggregated Size</th> <th if.bind="dataAggregation">Aggregated Size</th> </tr> </thead> <tbody> <tr class="table-info"> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="customTime" min="0"> <span class="input-group-addon input-group-addon-no-size">d</span> </div> </td> <td>${customSizeNonAggregated | numberFormat}</td> <td if.bind="dataAggregation">${customSizeAggregated | numberFormat}</td> </tr> </tbody> </table> <table class="table table-striped"> <thead class="thead-inverse"> <tr> <th>Unit Selection</th> <th style="width:180px">Unit</th> </tr> </thead> <tbody> <tr> <td><input type="range" min="0" max="4" value.bind="unitId" class="form-range-input"></td> <td>${units[unitId].string} [${units[unitId].abbr}]</td> </tr> </tbody> </table> <table class="table table-striped"> <thead class="thead-inverse"> <tr> <th>Data Aggregation Settings</th> <th>Value</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Enable/Disable Aggregation</td> <td> <div class="onoffswitch"> <input disabled type="checkbox" class="onoffswitch-checkbox" id="data-aggregation" checked.bind="dataAggregation"> <label class="onoffswitch-label" for="data-aggregation"> <span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span> </label> </div> </td> <td>Enables three-stage based data aggregation.</td> </tr> <tr if.bind="dataAggregation"> <td>Stage 1 Age</td> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="stage1age" min="0"> <span class="input-group-addon input-group-addon-no-size">d</span> </div> </td> <td>Necessary raw data age for stage 1 aggregation.</td> </tr> <tr if.bind="dataAggregation"> <td>Stage 1 Interval</td> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="stage1interval" min="0"> <span class="input-group-addon input-group-addon-no-size">h</span> </div> </td> <td>Stage 1 aggregation interval.</td> </tr> <tr if.bind="dataAggregation"> <td>Stage 2 Age</td> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="stage2age" min="0"> <span class="input-group-addon input-group-addon-no-size">d</span> </div> </td> <td>Necessary raw data age for stage 2 aggregation.</td> </tr> <tr if.bind="dataAggregation"> <td>Stage 2 Interval</td> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="stage2interval" min="0"> <span class="input-group-addon input-group-addon-no-size">h</span> </div> </td> <td>Stage 2 aggregation interval.</td> </tr> <tr if.bind="dataAggregation"> <td>Stage 3 Age</td> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="stage3age" min="0"> <span class="input-group-addon input-group-addon-no-size">d</span> </div> </td> <td>Necessary raw data age for stage 3 aggregation.</td> </tr> <tr if.bind="dataAggregation"> <td>Stage 3 Interval</td> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="stage3interval" min="0"> <span class="input-group-addon input-group-addon-no-size">h</span> </div> </td> <td>Stage 3 aggregation interval.</td> </tr> </tbody> </table> </div> <div class="col-lg-6 col-xs-12"> <table class="table table-striped"> <thead class="thead-inverse"> <tr> <th>Measurement Type</th> <th>Size per Measurement [bytes]</th> <th>Measurement Interval</th> <th>Number of Measurements</th> </tr> </thead> <tbody> <tr repeat.for="measurement of measurements"> <td>${measurement.name}</td> <td><span title="${measurement.values} value${measurement.values != 1 ? \'s\' : \'\'} à ${measurement.type.sizePerValue} bytes">${measurement.size}</span> </td> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="measurement.interval" min="0"> <span class="input-group-addon input-group-addon-no-size">s</span> </div> </td> <td> <div class="input-group"> <input type="number" class="form-control form-number-input" value.bind="measurement.number" min="0"> <span class="input-group-addon input-group-addon-no-size">#</span> </div> </td> </tr> </tbody> </table> <table class="table table-striped"> <thead class="thead-inverse"> <tr> <th>Measurement Type</th> <th>Size per Interval</th> <th>Size per Day</th> <th>Size per Week</th> <th>Size per Year</th> </tr> </thead> <tbody> <tr repeat.for="measurement of measurements"> <td>${measurement.name}</td> <td>${measurement.number * measurement.size / units[unitId].factor | numberFormat}</td> <td>${measurement.number * measurement.size * day / measurement.interval / units[unitId].factor | numberFormat} </td> <td>${measurement.number * measurement.size * week / measurement.interval / units[unitId].factor | numberFormat} </td> <td>${measurement.number * measurement.size * year / measurement.interval / units[unitId].factor | numberFormat} </td> </tr> </tbody> </table> <div class="card card-inverse" style="background-color:#333;border-color:#333"> <div class="card-block"> <h3 class="card-title">Add additional measurements</h3> <div> <div class="form-group row"> <label for="name" class="col-sm-2 form-control-label card-text">Name</label> <div class="col-sm-10"> <input class="form-control" id="name" placeholder="Enter a name..." value.bind="name"> </div> </div> <div class="form-group row"> <label for="type" class="col-sm-2 form-control-label card-text">Type</label> <div class="col-sm-10"> <select class="form-control" id="type" value.bind="type"> <option selected>Select a type...</option> <option repeat.for="type of measurementTypes" model.bind="type">${type.displayName}</option> </select> </div> </div> <div class="form-group row"> <label for="values" class="col-sm-2 form-control-label card-text">Values</label> <div class="col-sm-10"> <input type="number" class="form-control" value.bind="values" min="1" id="values"> </div> </div> </div> <button type="button" class="btn btn-primary" click.delegate="addMeasurement()">Add</button> </div> </div> </div> </div> </div> </main> </template>'})}(),System.register("measurement-types.js",[],function(a,b){var c;return{setters:[],execute:function(){a("measurementTypes",c=[{displayName:"Ping",sizePerValue:48,defaultInterval:60},{displayName:"SNMP",sizePerValue:64,defaultInterval:300},{displayName:"Business Process Script",sizePerValue:64,defaultInterval:300}]),a("measurementTypes",c)}}}),System.register("measurements.js",["./measurement-types"],function(a,b){var c,d;return{setters:[function(a){c=a.measurementTypes}],execute:function(){a("measurements",d=[{name:"Ping",type:c[0],values:1,size:c[0].sizePerValue,number:0,interval:60},{name:"SNMP Interface",type:c[1],values:12,size:12*c[1].sizePerValue,number:0,interval:300}]),a("measurements",d)}}}),System.register("units.js",[],function(a,b){var c;return{setters:[],execute:function(){a("units",c=[{id:0,string:"Byte",abbr:"B",factor:1},{id:1,string:"Kilobyte",abbr:"kB",factor:1e3},{id:2,string:"Megabyte",abbr:"MB",factor:1e6},{id:3,string:"Gigabyte",abbr:"GB",factor:1e9},{id:4,string:"Terabyte",abbr:"TB",factor:1e12}]),a("units",c)}}}),System.register("app.js",["jquery","bootstrap","./measurement-types","./measurements","./units"],function(a,b){function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e,f,g,h;return{setters:[function(a){},function(a){},function(a){d=a.measurementTypes},function(a){e=a.measurements},function(a){f=a.units}],execute:function(){g=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),a("App",h=function(){function a(){c(this,a),this.units=[],this.measurements=[],this.day=86400,this.week=604800,this.year=31536e3,this.customTime=0,this.unitId=2,this.dataAggregation=!1,this.stage1age=14,this.stage1interval=1,this.stage2age=60,this.stage2interval=8,this.stage3age=180,this.stage3interval=24,this.name="",this.values=1,this.type=void 0,this.units=f,this.measurementTypes=d,this.measurements=e}return a.prototype.getDaysInSeconds=function(a){return 24*a*60*60},a.prototype.addMeasurement=function(){if(""!==this.name&&"Select a type..."!==this.type){var a={name:this.name,type:this.type,values:this.values,size:this.values*this.type.sizePerValue,number:0,interval:this.type.defaultInterval};this.measurements.push(a),this.name="",this.type=void 0,this.values=1}},g(a,[{key:"sizePerDay",get:function(){for(var a=0,b=0;b<this.measurements.length;b++)a+=this.measurements[b].size*this.measurements[b].number*this.day/this.measurements[b].interval;return a/this.units[this.unitId].factor}},{key:"sizePerWeek",get:function(){for(var a=0,b=0;b<this.measurements.length;b++)a+=this.measurements[b].size*this.measurements[b].number*this.week/this.measurements[b].interval;return a/this.units[this.unitId].factor}},{key:"sizePerYear",get:function(){for(var a=0,b=0;b<this.measurements.length;b++)a+=this.measurements[b].size*this.measurements[b].number*this.year/this.measurements[b].interval;return a/this.units[this.unitId].factor}},{key:"customSizeNonAggregated",get:function(){for(var a=0,b=0;b<this.measurements.length;b++)a+=this.measurements[b].size*this.measurements[b].number*this.getDaysInSeconds(this.customTime)/this.measurements[b].interval;return a/this.units[this.unitId].factor}},{key:"customSizeAggregated",get:function(){var a=0;return a/this.units[this.unitId].factor}}]),a}()),a("App",h)}}}),System.register("main.js",["aurelia-framework","aurelia-logging-console"],function(a,b){var c,d;return{setters:[function(a){c=a.LogManager},function(a){d=a.ConsoleAppender}],execute:function(){function b(a){a.use.defaultBindingLanguage().defaultResources(),a.start().then(function(a){return a.setRoot("app",document.body)})}c.addAppender(new d),c.setLevel(c.logLevel.debug),a("configure",b)}}}),function(){var a=System.amdDefine;a("navigation.html!github:systemjs/plugin-text@0.0.4.js",[],function(){return'<template> <nav class="navbar navbar-fixed-top navbar-dark bg-inverse"> <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navigation-top-collapse"> &#9776; </button> <div class="collapse navbar-toggleable-xs" id="navigation-top-collapse"> <a class="navbar-brand" href="#">Database Sizing</a> </div> </nav> </template>'})}(),System.register("number-format.js",[],function(a,b){function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d;return{setters:[],execute:function(){a("NumberFormatValueConverter",d=function(){function a(){c(this,a)}return a.prototype.toView=function(a){var b=a.toLocaleString("value",{minimumFractionDigits:0});return a>0&&"0"===b?"> 0":b},a}()),a("NumberFormatValueConverter",d)}}});