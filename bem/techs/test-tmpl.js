var PATH = require('path'),
    bemUtil = require('bem/lib/util'),
    tmpl = require('bem/lib/template');

exports.API_VER = 2;

exports.techMixin = {

    getCreateResult : function(path, suffix, vars) {
        var envProps = JSON.parse(process.env.__tests || '{}')[PATH.dirname(path)] || {};

        return tmpl.process([
            '([',
            '"<!DOCTYPE html>",',
            '{ "tag": "html", "content": [',
            '  { "tag": "head", "content": [',
            '    { "tag": "title", "content": "" },',
            '    { "tag": "meta", "attrs": { "charset": "utf-8" } },',
            '    { "tag": "link", "attrs": { "href": "_{{bemBundleName}}.css", "rel": "stylesheet" } },',
            '    { "tag": "script", "attrs": { "src": "_{{bemBundleName}}.test.js" } }',
            '  ] },',
            '  { "tag": "body", "content":',
            '    {',
            '      "block": "test",',
            '      "decl": {{bemTmplDecl}},',
            '      "content": {{bemTmplContent}}',
            '    }',
            '  }',
            '] }',
            '])'
        ], {
            BundleName : envProps.BundleName || vars.BlockName,
            TmplDecl : envProps.TmplDecl || "",
            TmplContent : envProps.TmplContent || ""
        });
    },

    storeCreateResult: function(path, suffix, res, force) {
        bemUtil.mkdirs(PATH.dirname(path));
        return force?
            bemUtil.writeFile(path, res) :
            bemUtil.writeFileIfDiffers(path, res);
    },

    getCreateSuffixes : function() {
        return ['bemjson.js'];
    }

};
