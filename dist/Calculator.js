'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var MyFormulaVisitor = require('./MyFormula').MyFormulaVisitor;
var FormulaLexer = require('../token_parse/FormulaLexer');
var antlr4 = require('antlr4');
var FormulaParser = require('../token_parse/FormulaParser');
var QfErr = require('./FormulaError').FormulaError;

function calculate(input) {
  var chars = new antlr4.InputStream(input);
  var lexer = new FormulaLexer.FormulaLexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new FormulaParser.FormulaParser(tokens);
  var visitor = new MyFormulaVisitor();
  var result = visitor.visit(parser.formula());
  // 计算出答案超过一个，答案为undefined，答案为object都会报错
  if (result.length !== 1 || result[0] === undefined || _typeof(result[0]) === 'object') {
    var err = new QfErr({
      errCode: 3
    });
    throw err;
  }
  return result[0];
}

module.exports.calculate = calculate;